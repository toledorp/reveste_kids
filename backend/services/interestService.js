import Interest from "../models/Interest.js";
import Clothing from "../models/Clothing.js";
import Match from "../models/Match.js";
import User from "../models/Users.js";

import emailService from "./emailService.js";

class InterestService {
  async like(userId, clothingId) {
    const existing = await Interest.findOne({ userId, clothingId });

    if (existing) {
      return {
        interest: existing,
        matchCreated: false,
        message: "Like já existia",
      };
    }

    const newInterest = await Interest.create({ userId, clothingId });

    const likedClothing = await Clothing.findById(clothingId).populate(
      "userId",
      "name email",
    );

    if (!likedClothing) {
      return {
        interest: newInterest,
        matchCreated: false,
        message: "Peça curtida não encontrada",
      };
    }

    const likedClothingOwnerId = likedClothing.userId;

    const interestedUser = await User.findById(userId).select("name email");

    if (
      String(likedClothingOwnerId._id || likedClothingOwnerId) !==
      String(userId)
    ) {
      try {
        await emailService.sendLikeNotificationEmail({
          ownerEmail: likedClothing.userId?.email,
          ownerName: likedClothing.userId?.name,
          interestedUserName:
            interestedUser?.name ||
            interestedUser?.email ||
            "Usuário interessado",
          clothingTitle: likedClothing.title,
        });

        console.log("E-mail de notificação enviado para:", likedClothing.userId?.email);
      } catch (emailError) {
        console.log("Erro ao enviar e-mail de notificação:", emailError);
      }
    }

    const currentUserClothes = await Clothing.find({ userId });
    const currentUserClothingIds = currentUserClothes.map((item) => item._id);

    const reciprocalInterest = await Interest.findOne({
      userId: likedClothingOwnerId,
      clothingId: { $in: currentUserClothingIds },
    });

    if (!reciprocalInterest) {
      return {
        interest: newInterest,
        matchCreated: false,
        message: "Like registrado sem match",
      };
    }

    const existingMatch = await Match.findOne({
      $or: [
        {
          ownerId: likedClothingOwnerId,
          interestedUserId: userId,
          ownerClothingId: clothingId,
          interestedClothingId: reciprocalInterest.clothingId,
        },
        {
          ownerId: userId,
          interestedUserId: likedClothingOwnerId,
          ownerClothingId: reciprocalInterest.clothingId,
          interestedClothingId: clothingId,
        },
      ],
    });

    if (existingMatch) {
      return {
        interest: newInterest,
        matchCreated: false,
        match: existingMatch,
        message: "Match já existia",
      };
    }

    const match = await Match.create({
      ownerId: likedClothingOwnerId,
      interestedUserId: userId,
      ownerClothingId: clothingId,
      interestedClothingId: reciprocalInterest.clothingId,
      status: "MATCHED",
    });

    return {
      interest: newInterest,
      matchCreated: true,
      match,
      message: "Match criado automaticamente",
    };
  }

  async unlike(userId, clothingId) {
    return await Interest.findOneAndDelete({ userId, clothingId });
  }

  async getUserLikes(userId) {
    return await Interest.find({ userId }).populate("clothingId");
  }

  async getMatches(userId) {
    try {
      const myLikes = await Interest.find({ userId }).populate("clothingId");

      const myClothes = await Clothing.find({ userId });
      const myClothingIds = myClothes.map((item) => item._id.toString());

      const receivedLikes = await Interest.find({
        clothingId: { $in: myClothingIds },
      }).populate("clothingId userId");

      const matches = [];

      for (const myLike of myLikes) {
        const likedClothing = myLike.clothingId;

        if (!likedClothing || !likedClothing.userId) continue;

        const otherUserId = likedClothing.userId.toString();

        const mutualLike = receivedLikes.find(
          (receivedLike) =>
            receivedLike.userId &&
            receivedLike.userId._id.toString() === otherUserId,
        );

        if (mutualLike) {
          matches.push({
            user: mutualLike.userId,
            myLikedClothing: likedClothing,
            likedMyClothing: mutualLike.clothingId,
          });
        }
      }

      const uniqueMatches = matches.filter(
        (match, index, self) =>
          index ===
          self.findIndex(
            (item) => item.user._id.toString() === match.user._id.toString(),
          ),
      );

      return uniqueMatches;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new InterestService();