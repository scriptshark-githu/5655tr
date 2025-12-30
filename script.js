const params = new URLSearchParams(window.location.search);
const sessionId = params.get("session");

const content = document.getElementById("content");

if (!sessionId) {
  content.innerHTML = "<p>No session ID provided.</p>";
} else {
  fetch("sessions.json")
    .then(r => r.json())
    .then(data => {
      const session = data[sessionId];
      if (!session) {
        content.innerHTML = "<p>Session not found or not analyzed yet.</p>";
        return;
      }

      content.innerHTML = `
        <h2>Steps</h2>
        <pre>${session.steps.join("\n")}</pre>

        <h2>Snapshot</h2>
        <pre>${session.snapshot}</pre>

        <h2>Verdict</h2>
        <pre>${session.verdict}</pre>
      `;
    })
    .catch(err => {
      content.innerHTML = "<p>Error loading session.</p>";
      console.error(err);
    });
}
