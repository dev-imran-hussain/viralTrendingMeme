import mongoose, { Schema, models } from "mongoose";

const MemeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    mediaUrl: {
      type: String,
      required: true,
    },

    mediaType: {
      type: String,
      enum: ["image", "video"],
      required: true,
    },

    thumbnailUrl: {
      type: String,
    },

    category: {
      type: String,
      required: true,
      index: true,
    },

    tags: [
      {
        type: String,
        lowercase: true,
      },
    ],

    duration: {
      type: Number,
    },

    views: {
      type: Number,
      default: 0,
      index: true,
    },
    isApproved: {
    type: Boolean,
    default: false, // Default false matlab public upload turant live nahi hoga
  },
    description: {
      type: String,
      default: "",
    },

    fileSize: {
      type: Number,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Meme = models.Meme || mongoose.model("Meme", MemeSchema);

export default Meme;
