"use client";

import { useRef, useEffect, useState, useCallback } from "react";

const CANVAS_W = 480;
const CANVAS_H = 400;
const PLAYER_W = 20;
const PLAYER_H = 16;
const BULLET_SIZE = 3;
const ENEMY_W = 18;
const ENEMY_H = 12;
const STAR_COUNT = 60;

export default function SpaceShooter() {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);

  const initGame = useCallback(() => {
    return {
      player: { x: CANVAS_W / 2 - PLAYER_W / 2, y: CANVAS_H - 30 },
      bullets: [],
      enemies: [],
      stars: Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random() * CANVAS_W,
        y: Math.random() * CANVAS_H,
        speed: 0.3 + Math.random() * 1.5,
        size: Math.random() > 0.7 ? 2 : 1,
      })),
      particles: [],
      keys: {},
      score: 0,
      lives: 3,
      enemyTimer: 0,
      shootTimer: 0,
      gameOver: false,
      frame: 0,
    };
  }, []);

  const startGame = useCallback(() => {
    gameRef.current = initGame();
    setScore(0);
    setLives(3);
    setGameOver(false);
    setStarted(true);
  }, [initGame]);

  useEffect(() => {
    if (!started) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

    function handleKeyDown(e) {
      if (["ArrowLeft", "ArrowRight", " ", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
      }
      if (gameRef.current) gameRef.current.keys[e.key] = true;
    }
    function handleKeyUp(e) {
      if (gameRef.current) gameRef.current.keys[e.key] = false;
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    function spawnEnemy(g) {
      g.enemies.push({
        x: 20 + Math.random() * (CANVAS_W - 40),
        y: -ENEMY_H,
        speed: 1 + Math.random() * 1.5,
        dir: Math.random() > 0.5 ? 1 : -1,
        wobble: Math.random() * 0.5,
      });
    }

    function spawnParticles(x, y) {
      for (let i = 0; i < 8; i++) {
        gameRef.current.particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          life: 15 + Math.random() * 10,
        });
      }
    }

    function drawShip(ctx, x, y) {
      ctx.fillStyle = "#fff";
      // Body
      ctx.fillRect(x + 8, y, 4, 16);
      // Wings
      ctx.fillRect(x, y + 10, 20, 4);
      // Nose
      ctx.fillRect(x + 7, y - 2, 6, 4);
      // Thrusters
      if (gameRef.current.frame % 4 < 2) {
        ctx.fillRect(x + 2, y + 14, 2, 3);
        ctx.fillRect(x + 16, y + 14, 2, 3);
      }
    }

    function drawEnemy(ctx, x, y, frame) {
      ctx.fillStyle = "#fff";
      // Body
      ctx.fillRect(x + 2, y + 2, 14, 8);
      // Wings/arms
      ctx.fillRect(x, y + 4, 18, 4);
      // Eyes
      ctx.fillStyle = "#000";
      ctx.fillRect(x + 5, y + 4, 2, 2);
      ctx.fillRect(x + 11, y + 4, 2, 2);
      // Antenna
      ctx.fillStyle = "#fff";
      if (frame % 20 < 10) {
        ctx.fillRect(x + 4, y, 2, 3);
        ctx.fillRect(x + 12, y, 2, 3);
      } else {
        ctx.fillRect(x + 3, y, 2, 3);
        ctx.fillRect(x + 13, y, 2, 3);
      }
    }

    function update() {
      const g = gameRef.current;
      if (!g || g.gameOver) return;

      g.frame++;

      // Player movement
      const speed = 4;
      if (g.keys["ArrowLeft"] && g.player.x > 0) g.player.x -= speed;
      if (g.keys["ArrowRight"] && g.player.x < CANVAS_W - PLAYER_W) g.player.x += speed;

      // Shooting
      g.shootTimer++;
      if (g.keys[" "] && g.shootTimer > 8) {
        g.bullets.push({ x: g.player.x + PLAYER_W / 2 - 1, y: g.player.y - 4 });
        g.shootTimer = 0;
      }

      // Move bullets
      g.bullets = g.bullets.filter((b) => {
        b.y -= 6;
        return b.y > -10;
      });

      // Spawn enemies
      g.enemyTimer++;
      const spawnRate = Math.max(30, 80 - Math.floor(g.score / 5));
      if (g.enemyTimer > spawnRate) {
        spawnEnemy(g);
        g.enemyTimer = 0;
      }

      // Move enemies
      g.enemies = g.enemies.filter((e) => {
        e.y += e.speed;
        e.x += Math.sin(e.y * 0.03) * e.wobble * e.dir;
        if (e.y > CANVAS_H + 10) {
          return false;
        }
        return true;
      });

      // Bullet-enemy collision
      g.bullets = g.bullets.filter((b) => {
        let hit = false;
        g.enemies = g.enemies.filter((e) => {
          if (
            b.x > e.x && b.x < e.x + ENEMY_W &&
            b.y > e.y && b.y < e.y + ENEMY_H
          ) {
            hit = true;
            g.score++;
            setScore(g.score);
            spawnParticles(e.x + ENEMY_W / 2, e.y + ENEMY_H / 2);
            return false;
          }
          return true;
        });
        return !hit;
      });

      // Player-enemy collision
      g.enemies = g.enemies.filter((e) => {
        if (
          e.x < g.player.x + PLAYER_W &&
          e.x + ENEMY_W > g.player.x &&
          e.y < g.player.y + PLAYER_H &&
          e.y + ENEMY_H > g.player.y
        ) {
          g.lives--;
          setLives(g.lives);
          spawnParticles(g.player.x + PLAYER_W / 2, g.player.y + PLAYER_H / 2);
          if (g.lives <= 0) {
            g.gameOver = true;
            setGameOver(true);
          }
          return false;
        }
        return true;
      });

      // Update stars
      g.stars.forEach((s) => {
        s.y += s.speed;
        if (s.y > CANVAS_H) {
          s.y = 0;
          s.x = Math.random() * CANVAS_W;
        }
      });

      // Update particles
      g.particles = g.particles.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        return p.life > 0;
      });
    }

    function draw() {
      const g = gameRef.current;
      if (!g) return;

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      // Stars
      g.stars.forEach((s) => {
        ctx.fillStyle = s.size > 1 ? "#888" : "#444";
        ctx.fillRect(s.x, s.y, s.size, s.size);
      });

      // Particles
      g.particles.forEach((p) => {
        ctx.fillStyle = p.life > 10 ? "#fff" : "#888";
        ctx.fillRect(p.x, p.y, 2, 2);
      });

      if (!g.gameOver) {
        // Player
        drawShip(ctx, g.player.x, g.player.y);

        // Bullets
        ctx.fillStyle = "#fff";
        g.bullets.forEach((b) => {
          ctx.fillRect(b.x, b.y, BULLET_SIZE, BULLET_SIZE + 3);
        });
      }

      // Enemies
      g.enemies.forEach((e) => {
        drawEnemy(ctx, e.x, e.y, g.frame);
      });

      // Game over text
      if (g.gameOver) {
        ctx.fillStyle = "#fff";
        ctx.font = '20px "Courier New", monospace';
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", CANVAS_W / 2, CANVAS_H / 2 - 10);
        ctx.font = '12px "Courier New", monospace';
        ctx.fillText(`FINAL SCORE: ${String(g.score).padStart(6, "0")}`, CANVAS_W / 2, CANVAS_H / 2 + 15);
        ctx.fillText("PRESS [R] TO RESTART", CANVAS_W / 2, CANVAS_H / 2 + 35);
        ctx.textAlign = "left";
      }
    }

    function loop() {
      update();
      draw();
      animId = requestAnimationFrame(loop);
    }

    function handleRestart(e) {
      if (e.key === "r" || e.key === "R") {
        if (gameRef.current?.gameOver) {
          startGame();
        }
      }
    }
    window.addEventListener("keydown", handleRestart);

    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("keydown", handleRestart);
    };
  }, [started, startGame]);

  return (
    <div>
      <div>{`+${"-".repeat(40)}+`}</div>
      <div>{`| ${"SPACE SHOOTER".padEnd(39)}|`}</div>
      <div>{`+${"-".repeat(40)}+`}</div>

      <div style={{ padding: "12px 0" }}>
        {!started ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div style={{ marginBottom: "20px" }}>
              {"  /\\\n /  \\\n/    \\\n|    |\n| .. |\n\\    /\n \\  /\n  \\/".split("\n").map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
            <div style={{ marginBottom: "12px" }}>Ready to launch?</div>
            <button
              onClick={startGame}
              style={styles.startBtn}
              onMouseEnter={(e) => {
                e.target.style.background = "#fff";
                e.target.style.color = "#000";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = "#fff";
              }}
            >
              [ START GAME ]
            </button>
          </div>
        ) : (
          <>
            <canvas
              ref={canvasRef}
              width={CANVAS_W}
              height={CANVAS_H}
              style={{
                border: "1px solid #555",
                display: "block",
                imageRendering: "pixelated",
              }}
              tabIndex={0}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "8px 0",
                borderBottom: "1px solid #333",
              }}
            >
              <span>SCORE: {String(score).padStart(6, "0")}</span>
              <span>
                LIVES: {Array.from({ length: lives }, () => "\u2665").join(" ")}
                {lives === 0 && "---"}
              </span>
            </div>
          </>
        )}

        <div style={{ marginTop: "12px", color: "#888", fontSize: "12px" }}>
          <div>Controls:</div>
          <div>  LEFT/RIGHT .. Move ship</div>
          <div>  SPACE ....... Shoot</div>
          {gameOver && <div>  R ........... Restart</div>}
        </div>
      </div>
    </div>
  );
}

const styles = {
  startBtn: {
    background: "transparent",
    border: "1px solid #fff",
    color: "#fff",
    fontFamily: "'Courier New', Courier, monospace",
    fontSize: "16px",
    padding: "8px 24px",
    cursor: "pointer",
  },
};
