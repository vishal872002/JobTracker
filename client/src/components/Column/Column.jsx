import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import JobCard from "../JobCard/JobCard";

const DOT_COLORS = {
  applied: "#378ADD",
  interview: "#EF9F27",
  offer: "#639922",
  rejected: "#E24B4A",
};

export default function Column({ id, label, jobs, onAdd }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div className={`col${isOver ? " col--over" : ""}`}>
      <div className="col-header">
        <span className="col-dot" style={{ background: DOT_COLORS[id] }} />
        <span className="col-title">{label}</span>
        <span className="col-count">{jobs.length}</span>
        <button className="add-icon-btn" onClick={() => onAdd(id)}>+</button>
      </div>

      <SortableContext items={jobs.map((j) => j._id)} strategy={verticalListSortingStrategy}>
        <div ref={setNodeRef} style={{ minHeight: "80px", flexGrow: 1 }}>
          {jobs.length === 0 && (
            <div className="col-empty">No applications</div>
          )}
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}