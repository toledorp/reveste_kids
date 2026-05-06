import Clothing from "../models/Clothing.js";
import mongoose from "mongoose";

class ClothingService {
  async create(data) {
    try {
      const newClothing = new Clothing(data);
      await newClothing.save();
      return newClothing;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getAll() {
    try {
      const clothes = await Clothing.find().populate("userId", "name email");
      return clothes;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const clothing = await Clothing.findById(id).populate("userId", "name email");
      return clothing;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update(id, data) {
    try {
      const clothing = await Clothing.findByIdAndUpdate(
        id,
        data,
        { new: true }
      );
      return clothing;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const clothing = await Clothing.findByIdAndDelete(id);
      return clothing;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getByUserId(userId) {
    try {
      const clothes = await Clothing.find({ userId }).populate("userId", "name email");
      return clothes;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Closet com busca
  async getUserCloset(userId, search) {
    try {
      const filter = {
        userId: new mongoose.Types.ObjectId(userId)
      };

      if (search) {
        filter.title = {
          $regex: search,
          $options: "i"
        };
      }

      const clothes = await Clothing.find(filter).populate("userId", "name email");
      return clothes;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new ClothingService();