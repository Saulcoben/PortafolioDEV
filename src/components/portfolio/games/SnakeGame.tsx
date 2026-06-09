"use client";

import { useEffect, useRef, useState } from "react";
import { Play, RotateCcw } from "lucide-react";

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (!isPlaying && !gameOver) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Game config
    const gridSize = 20;
    const tileCountX = canvas.width / gridSize;
    const tileCountY = canvas.height / gridSize;
    
    let snake = [
      { x: 10, y: 10 },
    ];
    let dx = 0;
    let dy = 0;
    let foodX = 15;
    let foodY = 15;
    let particles: any[] = [];
    
    let gameLoop: number;
    let lastRenderTime = 0;
    const SNAKE_SPEED = 12; // updates per second

    const resetGame = () => {
      snake = [{ x: 10, y: 10 }];
      dx = 1;
      dy = 0;
      setScore(0);
      setGameOver(false);
      spawnFood();
      particles = [];
    };

    if (gameOver) {
      drawGame(ctx);
      return;
    } else if (isPlaying && snake.length === 1 && dx === 0 && dy === 0) {
      dx = 1;
      spawnFood();
    }

    function spawnFood() {
      foodX = Math.floor(Math.random() * tileCountX);
      foodY = Math.floor(Math.random() * tileCountY);
      for (let part of snake) {
        if (part.x === foodX && part.y === foodY) spawnFood();
      }
    }

    function createParticles(x: number, y: number) {
      for (let i = 0; i < 15; i++) {
        particles.push({
          x: x * gridSize + gridSize / 2,
          y: y * gridSize + gridSize / 2,
          vx: (Math.random() - 0.5) * 10,
          vy: (Math.random() - 0.5) * 10,
          life: 1,
          color: `hsl(${Math.random() * 60 + 100}, 100%, 50%)`
        });
      }
    }

    const keyDownHandler = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
        e.preventDefault();
      }
      
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          if (dy === 1) break;
          dx = 0; dy = -1;
          break;
        case "ArrowDown":
        case "s":
        case "S":
          if (dy === -1) break;
          dx = 0; dy = 1;
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          if (dx === 1) break;
          dx = -1; dy = 0;
          break;
        case "ArrowRight":
        case "d":
        case "D":
          if (dx === -1) break;
          dx = 1; dy = 0;
          break;
      }
    };

    window.addEventListener("keydown", keyDownHandler, { passive: false });

    function main(currentTime: number) {
      if (gameOver || !isPlaying) return;
      gameLoop = requestAnimationFrame(main);

      const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
      if (secondsSinceLastRender < 1 / SNAKE_SPEED) {
         drawGame(ctx!);
         return;
      }
      
      lastRenderTime = currentTime;
      update();
      drawGame(ctx!);
    }

    function update() {
      const head = { x: snake[0].x + dx, y: snake[0].y + dy };
      snake.unshift(head);

      if (head.x === foodX && head.y === foodY) {
        setScore(s => s + 10);
        createParticles(foodX, foodY);
        spawnFood();
      } else {
        snake.pop();
      }

      if (head.x < 0 || head.x >= tileCountX || head.y < 0 || head.y >= tileCountY) {
        setGameOver(true);
        setIsPlaying(false);
      }

      for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
          setGameOver(true);
          setIsPlaying(false);
        }
      }
    }

    function drawGame(ctx: CanvasRenderingContext2D) {
      ctx.fillStyle = "#09090b";
      ctx.fillRect(0, 0, canvas!.width, canvas!.height);

      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      for (let i = 0; i < canvas!.width; i += gridSize) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas!.height); ctx.stroke();
      }
      for (let i = 0; i < canvas!.height; i += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas!.width, i); ctx.stroke();
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.05;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.shadowBlur = 15;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      ctx.shadowBlur = 20;
      ctx.shadowColor = "#f43f5e";
      ctx.fillStyle = "#f43f5e";
      ctx.fillRect(foodX * gridSize + 2, foodY * gridSize + 2, gridSize - 4, gridSize - 4);

      snake.forEach((part, index) => {
        const isHead = index === 0;
        ctx.shadowBlur = isHead ? 25 : 10;
        ctx.shadowColor = isHead ? "#22d3ee" : "#34d399";
        ctx.fillStyle = isHead ? "#22d3ee" : "#34d399";
        ctx.fillRect(part.x * gridSize + 1, part.y * gridSize + 1, gridSize - 2, gridSize - 2);
      });
      
      ctx.shadowBlur = 0;
    }

    if (isPlaying && !gameOver) {
       gameLoop = requestAnimationFrame(main);
    }

    return () => {
      cancelAnimationFrame(gameLoop);
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, [isPlaying, gameOver]);

  return (
    <div className="relative group bg-[#09090b] rounded-3xl overflow-hidden border border-zinc-800/80 shadow-2xl flex flex-col items-center p-6 lg:p-8">
      <div className="flex justify-between w-full mb-6 items-center">
        <div>
          <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
            Neon <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Snake</span>
          </h3>
          <p className="text-zinc-500 text-xs uppercase tracking-wider font-semibold mt-1">W A S D o Flechas para mover</p>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-zinc-500 uppercase font-extrabold tracking-wider mb-1">Puntuación</div>
          <div className="text-3xl font-mono font-bold text-emerald-400 leading-none">{score}</div>
        </div>
      </div>

      <div className="relative w-full flex justify-center">
        <canvas 
          ref={canvasRef} 
          width={400} 
          height={400} 
          className="bg-[#09090b] rounded-2xl ring-1 ring-zinc-800 shadow-[0_0_40px_rgba(52,211,153,0.15)] max-w-full aspect-square w-auto h-auto"
        />

        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-zinc-800/50">
            <button 
              onClick={() => setIsPlaying(true)}
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white rounded-full p-5 hover:scale-110 active:scale-95 transition-all shadow-lg shadow-emerald-500/25 border border-white/10"
            >
              <Play className="w-8 h-8 ml-1" />
            </button>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center border border-zinc-800/50">
            <h4 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Game Over</h4>
            <p className="text-emerald-400 font-mono text-xl mb-8">Score: {score}</p>
            <button 
              onClick={() => {
                setGameOver(false);
                setScore(0);
                setIsPlaying(true);
              }}
              className="bg-white text-black hover:bg-zinc-200 px-6 py-3 rounded-full font-bold flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 shadow-xl"
            >
              <RotateCcw className="w-5 h-5" /> Jugar de Nuevo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
