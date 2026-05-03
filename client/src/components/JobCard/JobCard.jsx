import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useJobs } from "../../context/JobContext";

export default function JobCard({ job }) {
  const { removeJob } = useJobs();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: job._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const fmt = (d) => {
    if (!d) return "";
    const dt = new Date(Number(d));
    if (isNaN(dt)) return "";
    return dt.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  };

  return (
    <div ref={setNodeRef} style={style} className="card" {...attributes} {...listeners}>

      <button
        className="card-del"
        onClick={(e) => { e.stopPropagation(); removeJob(job._id); }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>

      <div className="card-company">{job.company}</div>
      <div className="card-role">{job.role}</div>

      {job.jdLink && (
        <a className="card-link" href={job.jdLink} target="_blank" rel="noreferrer">
          JD link
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ marginLeft: 3, verticalAlign: "middle" }}>
            <path d="M1 9L9 1M9 1H3M9 1v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      )}

      {job.notes && <div className="card-notes">{job.notes}</div>}
      <div className="card-date">{fmt(job.appliedDate)}</div>
    </div>
  );
}