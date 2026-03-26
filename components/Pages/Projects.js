"use client";

const projects = [
  {
    name: "PlanetBids Platform",
    description: "GovTech procurement system for bid management",
    tech: "React, TypeScript, APIs, Redux",
    links: [{ label: "Live", href: "#" }],
  },
  {
    name: "AI Editor",
    description: "Tiptap-based collaborative AI editor",
    tech: "React, Tiptap, Yjs, WebSocket",
    links: [{ label: "Code", href: "#" }],
  },
  {
    name: "Requisition System",
    description: "Complex workflow + approvals engine",
    tech: "React, Node.js, MSSQL",
    links: [{ label: "Code", href: "#" }],
  },
  {
    name: "Retro Portfolio",
    description: "This DOS-style portfolio site",
    tech: "Next.js, React, Canvas API",
    links: [{ label: "Code", href: "#" }],
  },
];

export default function Projects() {
  return (
    <div>
      <div>{`+${"-".repeat(40)}+`}</div>
      <div>{`| ${"PROJECTS".padEnd(39)}|`}</div>
      <div>{`+${"-".repeat(40)}+`}</div>

      <div style={{ padding: "12px 0" }}>
        {projects.map((project, i) => (
          <div key={i} style={{ marginBottom: "20px" }}>
            <div style={{ color: "#fff" }}>{`> ${project.name}`}</div>
            <div style={{ color: "#aaa", paddingLeft: "16px" }}>
              {project.description}
            </div>
            <div style={{ color: "#888", paddingLeft: "16px" }}>
              Tech: {project.tech}
            </div>
            <div style={{ paddingLeft: "16px", marginTop: "4px" }}>
              {project.links.map((link, j) => (
                <a
                  key={j}
                  href={link.href}
                  style={{
                    border: "1px solid #555",
                    padding: "1px 8px",
                    marginRight: "8px",
                    fontSize: "12px",
                  }}
                >
                  [{link.label}]
                </a>
              ))}
            </div>
            {i < projects.length - 1 && (
              <div style={{ color: "#333", marginTop: "8px" }}>
                {"-".repeat(42)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
