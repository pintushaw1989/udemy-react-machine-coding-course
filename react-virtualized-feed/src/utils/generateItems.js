// --- Data Generation ---
export const ESTIMATED_ITEM_HEIGHT = 140;
export const TOPICS = [
  "Engineering",
  "Design",
  "Product",
  "Marketing",
  "Research",
  "Legal",
  "Finance",
];
export const AVATARS = [
  "🦊",
  "🐺",
  "🦁",
  "🐻",
  "🐼",
  "🦋",
  "🦅",
  "🐙",
  "🦄",
  "🐬",
];

export function generateItems(count) {
  return Array.from({ length: count }, (_, i) => {
    const paragraphs = Math.floor(Math.random() * 3) + 1;
    const hasCode = Math.random() > 0.7;
    const hasTags = Math.random() > 0.5;
    return {
      id: i,
      author: `User ${String(i + 1).padStart(3, "0")}`,
      avatar: AVATARS[i % AVATARS.length],
      topic: TOPICS[i % TOPICS.length],
      timestamp: new Date(Date.now() - Math.random() * 1e10).toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "numeric",
          year: "numeric",
        },
      ),
      paragraphs,
      hasCode,
      hasTags,
      text: Array.from({ length: paragraphs }, () =>
        [
          "The system architecture relies on event-driven microservices communicating via a message broker.",
          "Instrumentation and observability tooling was introduced to reduce mean time to recovery.",
          "We refactored the onboarding flow based on usability testing with twelve participants.",
          "Latency dropped significantly after moving to edge-cached static assets.",
          "The API contract was versioned and documented before the public beta release.",
          "A/B testing revealed that inline validation improved form completion by 22%.",
          "Stakeholders approved the revised roadmap following the Q2 planning session.",
        ]
          .sort(() => Math.random() - 0.5)
          .slice(0, 2 + Math.floor(Math.random() * 2))
          .join(" "),
      ),
      code: hasCode
        ? `// Handler example\nasync function handle${i}(req, res) {\n  const data = await fetchData(req.params.id);\n  res.json({ ok: true, data });\n}`
        : null,
      tags: hasTags
        ? TOPICS.sort(() => Math.random() - 0.5).slice(
            0,
            2 + Math.floor(Math.random() * 3),
          )
        : [],
    };
  });
}
