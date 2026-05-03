import { useState } from "react";
import { useJobs } from "../../context/JobContext";

export default function JobModal({ defaultStatus, onClose }) {
  const { addJob } = useJobs();
  const [form, setForm] = useState({
    company: "",
    role: "",
    jdLink: "",
    notes: "",
    status: defaultStatus,
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.company.trim() || !form.role.trim()) return;
    setSaving(true);
    try {
      await addJob(form);
      onClose();
    } catch {
      setSaving(false);
    }
  };

  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Add application</h2>

        <div className="field">
          <label>Company *</label>
          <input name="company" value={form.company} onChange={handleChange} placeholder="e.g. Google" autoFocus />
        </div>
        <div className="field">
          <label>Role *</label>
          <input name="role" value={form.role} onChange={handleChange} placeholder="e.g. Full Stack Developer" />
        </div>
        <div className="field">
          <label>JD Link</label>
          <input name="jdLink" value={form.jdLink} onChange={handleChange} placeholder="https://..." />
        </div>
        <div className="field">
          <label>Notes</label>
          <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="HR name, salary, etc." />
        </div>
        <div className="field">
          <label>Status</label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleSubmit} disabled={saving}>
            {saving ? "Saving..." : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
