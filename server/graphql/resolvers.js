import Job from "../models/Job.js";

export const resolvers = {
  Query: {
    // Get all jobs, newest first
    jobs: async () => {
      return await Job.find().sort({ appliedDate: -1 });
    },

    // Get single job by id
    job: async (_, { id }) => {
      return await Job.findById(id);
    },
  },

  Mutation: {
    // Add a new job application
    addJob: async (_, args) => {
      const job = await Job.create(args);
      return job;
    },

    // Update job — used for status change (drag/drop) and editing
    updateJob: async (_, { id, ...updates }) => {
      const job = await Job.findByIdAndUpdate(
        id,
        { $set: updates },
        { returnDocument: "after", runValidators: true }
      );
      if (!job) throw new Error("Job not found");
      return job;
    },

    // Delete a job
    deleteJob: async (_, { id }) => {
      const job = await Job.findByIdAndDelete(id);
      if (!job) throw new Error("Job not found");
      return "Job deleted successfully";
    },
  },
};
