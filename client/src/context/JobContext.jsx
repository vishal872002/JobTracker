import { createContext, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_JOBS, ADD_JOB, UPDATE_JOB, DELETE_JOB } from "../services/queries";

const JobContext = createContext();

export function JobProvider({ children }) {
  // Fetch all jobs
  const { data, loading, error } = useQuery(GET_JOBS);

  // Mutations — refetchQueries keeps the UI in sync automatically
  const [addJobMutation] = useMutation(ADD_JOB, {
    refetchQueries: [{ query: GET_JOBS }],
  });

  const [updateJobMutation] = useMutation(UPDATE_JOB, {
    refetchQueries: [{ query: GET_JOBS }],
  });

  const [deleteJobMutation] = useMutation(DELETE_JOB, {
    refetchQueries: [{ query: GET_JOBS }],
  });

  const addJob = (variables) => addJobMutation({ variables });

  // Used for drag-drop status change
  const moveJob = (id, status) => updateJobMutation({ variables: { id, status } });

  const editJob = (id, fields) => updateJobMutation({ variables: { id, ...fields } });

  const removeJob = (id) => deleteJobMutation({ variables: { id } });

  return (
    <JobContext.Provider
      value={{
        jobs: data?.jobs || [],
        loading,
        error,
        addJob,
        moveJob,
        editJob,
        removeJob,
      }}
    >
      {children}
    </JobContext.Provider>
  );
}

export const useJobs = () => useContext(JobContext);
