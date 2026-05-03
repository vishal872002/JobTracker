const { gql } = require("graphql-tag");

const typeDefs = gql`
  type Job {
    _id: ID!
    company: String!
    role: String!
    status: String!
    jdLink: String
    notes: String
    appliedDate: String
    createdAt: String
  }

  type Query {
    jobs: [Job!]!
    job(id: ID!): Job
  }

  type Mutation {
    addJob(
      company: String!
      role: String!
      status: String!
      jdLink: String
      notes: String
    ): Job!

    updateJob(
      id: ID!
      company: String
      role: String
      status: String
      jdLink: String
      notes: String
    ): Job!

    deleteJob(id: ID!): String!
  }
`;

module.exports = { typeDefs };