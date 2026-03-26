"use client";

const links = [
  { label: "GitHub", href: "https://github.com", icon: ">>" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: ">>" },
  { label: "Resume", href: "#", icon: ">>" },
  { label: "Email", href: "mailto:mharaujo.dev@gmail.com", icon: ">>" },
];

export default function Links() {
  return (
    <div>
      <div>{`+${"-".repeat(40)}+`}</div>
      <div>{`| ${"LINKS".padEnd(39)}|`}</div>
      <div>{`+${"-".repeat(40)}+`}</div>

      <div style={{ padding: "16px 0" }}>
        {links.map((link, i) => (
          <div key={i} style={{ marginBottom: "12px" }}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.color = "#000";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#fff";
              }}
            >
              {link.icon} {link.label}
            </a>
            <div style={{ color: "#333" }}>
              {"-".repeat(42)}
            </div>
          </div>
        ))}
      </div>

      <div style={{ color: "#555", marginTop: "16px" }}>
        <span className="cursor">_</span> End of list.
      </div>
    </div>
  );
}

const styles = {
  link: {
    display: "inline-block",
    padding: "2px 8px",
    color: "#fff",
    fontSize: "14px",
    marginBottom: "4px",
  },
};
