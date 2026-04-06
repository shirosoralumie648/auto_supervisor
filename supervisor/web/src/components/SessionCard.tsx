export function SessionCard(input: { session: { sessionId: string; status: string; agentType: string } }) {
  return (<article><h2>{input.session.sessionId}</h2><p>{input.session.agentType}</p><p>{input.session.status}</p></article>);
}
