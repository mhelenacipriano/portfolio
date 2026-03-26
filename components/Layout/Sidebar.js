"use client";

function AsciiBox({ title, children }) {
  return (
    <div style={{ marginBottom: "12px" }}>
      <div>{`+${"-".repeat(30)}+`}</div>
      {title && (
        <>
          <div>{`| ${title.padEnd(29)}|`}</div>
          <div>{`+${"-".repeat(30)}+`}</div>
        </>
      )}
      <div style={{ padding: "2px 0" }}>{children}</div>
      <div>{`+${"-".repeat(30)}+`}</div>
    </div>
  );
}

function SidebarLine({ text }) {
  return <div>{`| ${(text || "").padEnd(29)}|`}</div>;
}

export default function Sidebar() {
  return (
    <aside style={styles.sidebar}>
      <AsciiBox title="WELCOME!">
        <SidebarLine text="MARIA HELENA DE ARAUJO" />
        <SidebarLine text="" />
        <SidebarLine text="Frontend Engineer" />
        <SidebarLine text="React | TypeScript" />
        <SidebarLine text="Next.js | Tiptap" />
      </AsciiBox>

      <AsciiBox title="LOCATION">
        <SidebarLine text="Joao Pessoa, BR" />
        <SidebarLine text="mharaujo.dev@gmail.com" />
      </AsciiBox>

      <AsciiBox title="EXPERIENCE">
        <SidebarLine text="GoFasti / PlanetBids" />
        <SidebarLine text="GovTech / Procurement" />
        <SidebarLine text="5+ Years" />
      </AsciiBox>

      <AsciiBox title="STACK">
        <SidebarLine text="React, TS, Next.js" />
        <SidebarLine text="Node.js, APIs" />
        <SidebarLine text="Testing (Jest, RTL)" />
        <SidebarLine text="Tiptap, Yjs" />
      </AsciiBox>

      <div style={{ marginTop: "auto", color: "#555", fontSize: "11px" }}>
        <span className="cursor">_</span> System ready.
      </div>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: "320px",
    minWidth: "320px",
    height: "calc(100vh - 40px)",
    overflowY: "auto",
    padding: "12px 16px",
    borderRight: "1px solid #555",
    display: "flex",
    flexDirection: "column",
  },
};
