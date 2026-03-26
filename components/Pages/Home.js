"use client";

import { useState, useEffect } from "react";

const lines = [
  "Hi, I'm Maria Helena.",
  "Frontend engineer focused on",
  "performance, UX and AI editors.",
  "",
  "> I build scalable UI systems",
  "> and AI-powered tools",
  "> for complex workflows",
];

export default function Home({ onNavigate }) {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines < lines.length) {
      const timer = setTimeout(() => {
        setVisibleLines((v) => v + 1);
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [visibleLines]);

  return (
    <div>
      <div>{`+${"-".repeat(40)}+`}</div>
      <div>{`| ${"WELCOME".padEnd(39)}|`}</div>
      <div>{`+${"-".repeat(40)}+`}</div>

      <div style={{ padding: "16px 0", minHeight: "180px" }}>
        {lines.slice(0, visibleLines).map((line, i) => (
          <div key={i} style={{ color: line.startsWith(">") ? "#aaa" : "#fff" }}>
            {line}
          </div>
        ))}
        {visibleLines < lines.length && (
          <span className="cursor">_</span>
        )}
      </div>

      <div style={{ marginTop: "8px" }}>
        {"-".repeat(42)}
      </div>

      <div style={{ padding: "12px 0", display: "flex", gap: "16px" }}>
        <button
          onClick={() => onNavigate("projects")}
          style={styles.button}
          onMouseEnter={(e) => {
            e.target.style.background = "#fff";
            e.target.style.color = "#000";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "transparent";
            e.target.style.color = "#fff";
          }}
        >
          [ View Projects ]
        </button>
        <button
          onClick={() => onNavigate("game")}
          style={styles.button}
          onMouseEnter={(e) => {
            e.target.style.background = "#fff";
            e.target.style.color = "#000";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "transparent";
            e.target.style.color = "#fff";
          }}
        >
          [ Play Game ]
        </button>
      </div>
    </div>
  );
}

const styles = {
  button: {
    background: "transparent",
    border: "1px solid #fff",
    color: "#fff",
    fontFamily: "'Courier New', Courier, monospace",
    fontSize: "14px",
    padding: "4px 12px",
    cursor: "pointer",
  },
};
