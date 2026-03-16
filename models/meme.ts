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
      index: true,
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
      default: false,
      index: true,
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

// Compound index for the most common query pattern: approved memes sorted by date
MemeSchema.index({ isApproved: 1, createdAt: -1 });

// Compound index for approved memes filtered by mediaType
MemeSchema.index({ isApproved: 1, mediaType: 1, createdAt: -1 });

// Text index for search — replaces expensive $regex full-collection scans
MemeSchema.index(
  { title: "text", category: "text", tags: "text", description: "text" },
  { weights: { title: 10, tags: 5, category: 3, description: 1 }, name: "search_index" }
);

const Meme = models.Meme || mongoose.model("Meme", MemeSchema);

export default Meme;
