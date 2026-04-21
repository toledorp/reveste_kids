import Interest from "../models/Interest.js";
import Clothing from "../models/Clothing.js";

class InterestService {
  async like(userId, clothingId) {
    const existing = await Interest.findOne({ userId, clothingId });

    if (existing) {
      return existing;
    }

    return await Interest.create({ userId, clothingId });
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