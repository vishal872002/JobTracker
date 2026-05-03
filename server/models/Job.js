import mongoose  from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    company: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["applied", "interview", "offer", "rejected"],
      default: "applied",
    },
    jdLink: { type: String, trim: true, default: "" },
    notes: { type: String, trim: true, default: "" },
    appliedDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;