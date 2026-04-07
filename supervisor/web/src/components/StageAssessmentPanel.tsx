export function StageAssessmentPanel(input: {
  stages: Array<{ stageId: string; status: string }>;
}) {
  return (
    <section>
      {input.stages.map((stage) => (
        <p key={stage.stageId}>{stage.stageId}\t{stage.status}</p>
      ))}
    </section>
  );
}
