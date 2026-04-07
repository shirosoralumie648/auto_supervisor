export function EventTimeline(input: { events: string[] }) {
  return (
    <section>
      {input.events.map((event) => (
        <p key={event}>{event}</p>
      ))}
    </section>
  );
}
