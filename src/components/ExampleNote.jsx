/* Illustrative-data disclaimer for the flight/route example pages, shown until
   the ten-flight validation test confirms the model. The costs/windows on these
   pages ARE real (published charts); it's the clearance *prediction* that isn't
   live — keep that distinction honest. */
export default function ExampleNote() {
  return (
    <div className="ex-note">
      <span className="ex-ico" aria-hidden="true">&#9432;</span>
      <div>
        <b>Example page.</b> The eUpgrade costs and clearance windows below come straight from
        Air Canada's published charts — those are real. What isn't live yet is the clearance
        <i> prediction</i> (the odds a specific flight clears) — that model is still in testing.
        Aircraft assignments are a schedule snapshot and can change; always confirm in the Air Canada app.
      </div>
    </div>
  );
}
