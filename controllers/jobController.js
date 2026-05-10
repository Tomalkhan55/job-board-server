import Job from "../models/Job.js";

export const getJobs = async (req, res) => {
  const { category, type, search } = req.query;
  const filter = { isActive: true };

  if (category && category !== "All") filter.category = category;
  if (type && type !== "All") filter.type = type;
  if (search) filter.title = { $regex: search, $options: "i" };

  const jobs = await Job.find(filter)
    .populate("postedBy", "name email")
    .sort({ createdAt: -1 });

  res.json(jobs);
};

export const getJob = async (req, res) => {
  const job = await Job.findById(req.params.id).populate("postedBy", "name email");
  if (!job) return res.status(404).json({ message: "Job not found" });
  res.json(job);
};

export const createJob = async (req, res) => {
  const { title, company, location, type, category, salary, description, requirements } = req.body;

  const job = await Job.create({
    title, company, location, type, category,
    salary, description, requirements,
    postedBy: req.user._id,
  });

  res.status(201).json(job);
};

export const updateJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ message: "Job not found" });
  if (job.postedBy.toString() !== req.user._id.toString())
    return res.status(403).json({ message: "Not authorized" });

  const updated = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ message: "Job not found" });
  if (job.postedBy.toString() !== req.user._id.toString())
    return res.status(403).json({ message: "Not authorized" });

  await job.deleteOne();
  res.json({ message: "Job deleted" });
};

export const getMyJobs = async (req, res) => {
  const jobs = await Job.find({ postedBy: req.user._id }).sort({ createdAt: -1 });
  res.json(jobs);
};
