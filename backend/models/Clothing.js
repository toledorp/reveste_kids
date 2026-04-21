import mongoose from "mongoose";

const clothingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    media: {
      type: [
        {
          type: {
            type: String,
            enum: ["image", "video"],
            required: true,
          },
          url: {
            type: String,
            required: true,
          },
        },
      ],
      default: [],
    },
    condition: {
      type: String,
      default: "Usada",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Clothing", clothingSchema);
