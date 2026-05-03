import { gql } from "@apollo/client";

export const GET_JOBS = gql`
  query GetJobs {
    jobs {
      _id
      company
      role
      status
      jdLink
      notes
      appliedDate
    }
  }
`;

export const ADD_JOB = gql`
  mutation AddJob(
    $company: String!
    $role: String!
    $status: String!
    $jdLink: String
    $notes: String
  ) {
    addJob(
      company: $company
      role: $role
      status: $status
      jdLink: $jdLink
      notes: $notes
    ) {
      _id
      company
      role
      status
      jdLink
      notes
      appliedDate
    }
  }
`;

export const UPDATE_JOB = gql`
  mutation UpdateJob(
    $id: ID!
    $company: String
    $role: String
    $status: String
    $jdLink: String
    $notes: String
  ) {
    updateJob(
      id: $id
      company: $company
      role: $role
      status: $status
      jdLink: $jdLink
      notes: $notes
    ) {
      _id
      company
      role
      status
      jdLink
      notes
      appliedDate
    }
  }
`;

export const DELETE_JOB = gql`
  mutation DeleteJob($id: ID!) {
    deleteJob(id: $id)
  }
`;
