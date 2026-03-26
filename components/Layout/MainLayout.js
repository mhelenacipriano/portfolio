"use client";

import { useState, useEffect, useCallback } from "react";
import TopMenu from "./TopMenu";
import Sidebar from "./Sidebar";
import Home from "../Pages/Home";
import Projects from "../Pages/Projects";
import Game from "../Pages/Game";
import Links from "../Pages/Links";

const pages = {
  home: Home,
  projects: Projects,
  game: Game,
  links: Links,
};

const pageKeys = Object.keys(pages);

export default function MainLayout() {
  const [activePage, setActivePage] = useState("home");

  const handleNavigate = useCallback((page) => {
    setActivePage(page);
  }, []);

  useEffect(() => {
    function handleKeyDown(e) {
      const idx = pageKeys.indexOf(activePage);
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setActivePage(pageKeys[(idx + 1) % pageKeys.length]);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setActivePage(pageKeys[(idx - 1 + pageKeys.length) % pageKeys.length]);
      }
    }
    // Only add keyboard nav when game is not active
    if (activePage !== "game") {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [activePage]);

  const PageComponent = pages[activePage];

  return (
    <div style={styles.container}>
      <TopMenu activePage={activePage} onNavigate={handleNavigate} />
      <div style={styles.body}>
        <Sidebar />
        <main style={styles.content}>
          <PageComponent onNavigate={handleNavigate} />
        </main>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  body: {
    display: "flex",
    flex: 1,
    overflow: "hidden",
  },
  content: {
    flex: 1,
    overflowY: "auto",
    padding: "12px 20px",
  },
};
