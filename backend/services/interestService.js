import Interest from "../models/Interest.js";
import Clothing from "../models/Clothing.js";
import Match from "../models/Match.js";

class InterestService {
  async like(userId, clothingId) {
    const existing = await Interest.findOne({ userId, clothingId });

    if (existing) {
      return existing;
    }

    const newInterest = await Interest.create({ userId, clothingId });

    const likedClothing = await Clothing.findById(clothingId);

    if (!likedClothing) {
      return newInterest;
    }

    const likedClothingOwnerId = likedClothing.userId;

    if (String(likedClothingOwnerId) === String(userId)) {
      return newInterest;
    }

    const currentUserClothes = await Clothing.find({ userId });
    const currentUserClothingIds = currentUserClothes.map((item) => item._id);

    const reciprocalInterest = await Interest.findOne({
      userId: likedClothingOwnerId,
      clothingId: { $in: currentUserClothingIds },
    });

    if (reciprocalInterest) {
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

      if (!existingMatch) {
        await Match.create({
          ownerId: likedClothingOwnerId,
          interestedUserId: userId,
          ownerClothingId: clothingId,
          interestedClothingId: reciprocalInterest.clothingId,
          status: "MATCHED",
        });

        console.log("🔥 Match criado automaticamente");
      }
    }

    return newInterest;
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
            receivedLike.userId._id.toString() === otherUserId
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
            (item) => item.user._id.toString() === match.user._id.toString()
          )
      );

      return uniqueMatches;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new InterestService();