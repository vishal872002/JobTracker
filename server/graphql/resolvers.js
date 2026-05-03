const Job = require("../models/Job");

const resolvers = {
  Query: {
    jobs: async () => await Job.find().sort({ appliedDate: -1 }),
    job: async (_, { id }) => await Job.findById(id),
  },
  Mutation: {
    addJob: async (_, args) => await Job.create(args),
    updateJob: async (_, { id, ...updates }) => {
      const job = await Job.findByIdAndUpdate(
        id,
        { $set: updates },
        { returnDocument: "after", runValidators: true }
      );
      if (!job) throw new Error("Job not found");
      return job;
    },
    deleteJob: async (_, { id }) => {
      const job = await Job.findByIdAndDelete(id);
      if (!job) throw new Error("Job not found");
      return "Job deleted successfully";
    },
  },
};

module.exports = { resolvers };