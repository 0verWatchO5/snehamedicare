import mongoose, { Schema, Document, Model } from "mongoose";

export interface IGalleryItem extends Document {
  title: string;
  description?: string;
  category: string;
  imageUrl: string;
  publicId: string;
  width?: number;
  height?: number;
  featured?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const GalleryItemSchema = new Schema<IGalleryItem>(
  {
    title: {
      type: String,
      required: [true, "Please provide an image title"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    category: {
      type: String,
      default: "Awards & Honors",
      trim: true,
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
    },
    publicId: {
      type: String,
      required: [true, "Cloudinary public ID is required"],
      trim: true,
    },
    width: {
      type: Number,
      default: 0,
    },
    height: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const GalleryItem: Model<IGalleryItem> =
  mongoose.models.GalleryItem ||
  mongoose.model<IGalleryItem>("GalleryItem", GalleryItemSchema);

export default GalleryItem;
