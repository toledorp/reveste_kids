import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },

    interestedUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },

    // 👇 NOVO (duas peças)
    ownerClothingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clothing",
      required: true,
    },

    interestedClothingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clothing",
      required: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "MATCHED"],
      default: "MATCHED",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Match", matchSchema);