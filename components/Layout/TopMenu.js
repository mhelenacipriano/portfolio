"use client";

const menuItems = [
  { key: "home", label: "Home" },
  { key: "projects", label: "Projects" },
  { key: "game", label: "Space Shooter" },
  { key: "links", label: "Links" },
];

export default function TopMenu({ activePage, onNavigate }) {
  return (
    <nav style={styles.nav}>
      <div style={styles.menu}>
        {menuItems.map((item) => (
          <button
            key={item.key}
            onClick={() => onNavigate(item.key)}
            style={{
              ...styles.item,
              ...(activePage === item.key ? styles.active : {}),
            }}
            onMouseEnter={(e) => {
              if (activePage !== item.key) {
                e.target.style.background = "#fff";
                e.target.style.color = "#000";
              }
            }}
            onMouseLeave={(e) => {
              if (activePage !== item.key) {
                e.target.style.background = "transparent";
                e.target.style.color = "#fff";
              }
            }}
          >
            {activePage === item.key ? `[ ${item.label} ]` : item.label}
          </button>
        ))}
      </div>
      <div style={styles.line}>
        {"=".repeat(80)}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    padding: "8px 16px 0",
  },
  menu: {
    display: "flex",
    gap: "24px",
    padding: "4px 0",
  },
  item: {
    background: "transparent",
    border: "none",
    color: "#fff",
    fontFamily: "'Courier New', Courier, monospace",
    fontSize: "14px",
    cursor: "pointer",
    padding: "2px 4px",
  },
  active: {
    background: "#fff",
    color: "#000",
  },
  line: {
    color: "#555",
    overflow: "hidden",
    whiteSpace: "nowrap",
    marginTop: "4px",
  },
};
