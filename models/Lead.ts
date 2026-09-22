import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILead extends Document {
  name: string;
  mobile: string;
  city: string;
  insuranceType: "health" | "car" | "travel" | "life" | "senior" | "audit";
  sumInsured?: string;
  planName?: string;
  monthlyPremium?: number;
  members?: string;
  hasPED: "yes" | "no";
  status: "NEW" | "CONTACTED" | "CLOSED" | "ARCHIVED";
  notes?: string;
  source: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    name: {
      type: String,
      required: [true, "Please provide full name"],
      trim: true,
    },
    mobile: {
      type: String,
      required: [true, "Please provide contact phone number"],
      trim: true,
    },
    city: {
      type: String,
      default: "Mumbai",
      trim: true,
    },
    insuranceType: {
      type: String,
      enum: ["health", "car", "travel", "life", "senior", "audit"],
      default: "health",
    },
    sumInsured: {
      type: String,
      default: "₹25 Lakh",
    },
    planName: {
      type: String,
      default: "General Consultation",
    },
    monthlyPremium: {
      type: Number,
      default: 0,
    },
    members: {
      type: String,
      default: "Family Floater",
    },
    hasPED: {
      type: String,
      enum: ["yes", "no"],
      default: "no",
    },
    status: {
      type: String,
      enum: ["NEW", "CONTACTED", "CLOSED", "ARCHIVED"],
      default: "NEW",
    },
    notes: {
      type: String,
      default: "",
    },
    source: {
      type: String,
      default: "Website Quote Modal",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent re-compiling model in hot-reload
export const Lead: Model<ILead> =
  mongoose.models.Lead || mongoose.model<ILead>("Lead", LeadSchema);

export default Lead;
