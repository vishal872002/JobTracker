import { useState } from "react";
import {
  DndContext,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useJobs } from "../../context/JobContext";
import Column from "../Column/Column";
import JobModal from "../JobModal/JobModal";

const COLUMNS = [
  { id: "applied", label: "Applied" },
  { id: "interview", label: "Interview" },
  { id: "offer", label: "Offer" },
  { id: "rejected", label: "Rejected" },
];

export default function Board() {
  const { jobs, moveJob, loading } = useJobs();
  const [modalOpen, setModalOpen] = useState(false);
  const [defaultStatus, setDefaultStatus] = useState("applied");

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;
    const newStatus = over.id;
    if (COLUMNS.find((c) => c.id === newStatus)) {
      moveJob(active.id, newStatus);
    }
  };

  const openModal = (status) => {
    setDefaultStatus(status);
    setModalOpen(true);
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <>
      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <div className="board">
          {COLUMNS.map((col) => (
            <Column
              key={col.id}
              id={col.id}
              label={col.label}
              jobs={jobs.filter((j) => j.status === col.id)}
              onAdd={openModal}
            />
          ))}
        </div>
      </DndContext>

      {modalOpen && (
        <JobModal
          defaultStatus={defaultStatus}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
