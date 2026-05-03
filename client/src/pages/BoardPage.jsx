import Stats from "../components/Dashboard/Stats";
import Board from "../components/Board/Board";

export default function BoardPage() {
  return (
    <div>
      <div className="page-header">
        <h1>V - Job tracker</h1>
        <p>Drag cards to update status</p>
      </div>
      <Stats />
      <Board />
    </div>
  );
}