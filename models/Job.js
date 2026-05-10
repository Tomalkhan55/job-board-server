import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    location: { type: String, required: true },
    type: { type: String, enum: ["Full-time", "Part-time", "Remote", "Contract", "Internship"], default: "Full-time" },
    category: { type: String, enum: ["Engineering", "Design", "Marketing", "Sales", "Finance", "HR", "Other"], default: "Engineering" },
    salary: { type: String, default: "Negotiable" },
    description: { type: String, required: true },
    requirements: [{ type: String }],
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
