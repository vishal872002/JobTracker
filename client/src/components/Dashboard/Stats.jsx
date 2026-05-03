import { useJobs } from "../../context/JobContext";

export default function Stats() {
  const { jobs } = useJobs();

  const count = (status) => jobs.filter((j) => j.status === status).length;
  const responseRate = jobs.length
    ? Math.round(((count("interview") + count("offer")) / jobs.length) * 100)
    : 0;

  return (
    <div className="stats">
      <div className="stat">
        <div className="stat-label">Total applied</div>
        <div className="stat-num">{jobs.length}</div>
      </div>
      <div className="stat">
        <div className="stat-label">Interview</div>
        <div className="stat-num">{count("interview")}</div>
      </div>
      <div className="stat">
        <div className="stat-label">Offer</div>
        <div className="stat-num">{count("offer")}</div>
      </div>
      <div className="stat">
        <div className="stat-label">Response rate</div>
        <div className="stat-num">{responseRate}%</div>
      </div>
    </div>
  );
}