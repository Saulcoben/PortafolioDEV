"use client";

import { useEffect, useRef, useState } from "react";
import { Play, RotateCcw } from "lucide-react";

export default function RunnerGame() {
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

    let gameLoop: number;
    
    let isJumping = false;
    let playerY = 0;
    let playerVelocityY = 0;
    const gravity = 0.8;
    const jumpStrength = -14;
    
    let obstacles: {x: number, width: number, height: number, type: string}[] = [];
    let gameSpeed = 6;
    let frameCount = 0;
    let actualScore = 0;
    let lastEmittedScore = 0;

    const groundY = canvas.height - 40;
    
    let backgroundParticles = Array.from({length: 30}).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * groundY,
      speed: Math.random() * 2 + 1,
      size: Math.random() * 2 + 1
    }));

    const resetGame = () => {
      isJumping = false;
      playerY = 0;
      playerVelocityY = 0;
      obstacles = [];
      gameSpeed = 6;
      frameCount = 0;
      actualScore = 0;
      lastEmittedScore = 0;
      setScore(0);
    };

    if (gameOver) {
      drawGame(ctx);
      return;
    }

    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.key === "ArrowUp") {
        e.preventDefault();
        jump();
      }
    };
    
    const mouseDownHandler = (e: Event) => {
      e.preventDefault();
      jump();
    };

    const jump = () => {
      if (!isJumping && !gameOver && isPlaying) {
        isJumping = true;
        playerVelocityY = jumpStrength;
      }
    };

    window.addEventListener("keydown", keyDownHandler, { passive: false });
    canvas.addEventListener("mousedown", mouseDownHandler, { passive: false });
    canvas.addEventListener("touchstart", mouseDownHandler, { passive: false });

    function update() {
      playerVelocityY += gravity;
      playerY += playerVelocityY;

      if (playerY > 0) {
        playerY = 0;
        isJumping = false;
        playerVelocityY = 0;
      }

      if (frameCount % Math.floor(Math.random() * 60 + 50) === 0) {
         obstacles.push({
           x: canvas!.width,
           width: 20 + Math.random() * 15,
           height: 30 + Math.random() * 25,
           type: 'box'
         });
      }

      for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].x -= gameSpeed;
        
        const pLeft = 50;
        const pRight = 50 + 30;
        const pTop = groundY + playerY - 40;
        const pBottom = groundY + playerY;

        const oLeft = obstacles[i].x;
        const oRight = obstacles[i].x + obstacles[i].width;
        const oTop = groundY - obstacles[i].height;
        const oBottom = groundY;

        if (pRight > oLeft + 5 && pLeft < oRight - 5 && pBottom > oTop + 5 && pTop < oBottom - 5) {
          setGameOver(true);
          setIsPlaying(false);
        }

        if (obstacles[i].x + obstacles[i].width < 0) {
          obstacles.splice(i, 1);
        }
      }

      frameCount++;
      actualScore += 0.1;
      const flooredScore = Math.floor(actualScore);
      if (flooredScore > lastEmittedScore) {
        lastEmittedScore = flooredScore;
        setScore(flooredScore);
      }
      
      if (frameCount % 500 === 0) {
        gameSpeed += 0.5;
      }
      
      backgroundParticles.forEach(p => {
         p.x -= p.speed;
         if (p.x < 0) p.x = canvas!.width;
      });
    }

    function drawGame(ctx: CanvasRenderingContext2D) {
      ctx.fillStyle = "#09090b";
      ctx.fillRect(0, 0, canvas!.width, canvas!.height);

      ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
      backgroundParticles.forEach(p => {
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });

      ctx.fillStyle = "#18181b"; // zinc-900
      ctx.fillRect(0, groundY, canvas!.width, canvas!.height - groundY);
      
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#a855f7"; // purple-500
      ctx.strokeStyle = "#a855f7";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(canvas!.width, groundY);
      ctx.stroke();
      ctx.shadowBlur = 0;

      const pX = 50;
      const pY = groundY + playerY - 40;
      
      ctx.shadowBlur = 20;
      ctx.shadowColor = "#3b82f6"; // blue-500
      ctx.fillStyle = "#3b82f6";
      ctx.fillRect(pX, pY, 30, 40);
      
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#ef4444"; // red-500
      ctx.fillStyle = "#ef4444";
      obstacles.forEach(obs => {
        ctx.fillRect(obs.x, groundY - obs.height, obs.width, obs.height);
      });
      ctx.shadowBlur = 0;
    }

    function main() {
      if (gameOver || !isPlaying) return;
      update();
      drawGame(ctx!);
      gameLoop = requestAnimationFrame(main);
    }

    if (isPlaying && !gameOver) {
       if (actualScore === 0 && obstacles.length === 0) resetGame();
       gameLoop = requestAnimationFrame(main);
    }

    return () => {
      cancelAnimationFrame(gameLoop);
      window.removeEventListener("keydown", keyDownHandler);
      canvas!.removeEventListener("mousedown", mouseDownHandler);
      canvas!.removeEventListener("touchstart", mouseDownHandler);
    };
  }, [isPlaying, gameOver]);

  return (
    <div className="relative group bg-[#09090b] rounded-3xl overflow-hidden border border-zinc-800/80 shadow-2xl flex flex-col items-center p-6 lg:p-8">
      <div className="flex justify-between w-full mb-6 items-center">
        <div>
          <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
            Endless <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Runner</span>
          </h3>
          <p className="text-zinc-500 text-xs uppercase tracking-wider font-semibold mt-1">Espacio o Clic para saltar</p>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-zinc-500 uppercase font-extrabold tracking-wider mb-1">Distancia</div>
          <div className="text-3xl font-mono font-bold text-blue-400 leading-none">{score}m</div>
        </div>
      </div>

      <div className="relative w-full flex justify-center h-[400px]">
        <canvas 
          ref={canvasRef} 
          width={600} 
          height={400} 
          className="w-full h-full object-cover bg-[#09090b] rounded-2xl ring-1 ring-zinc-800 shadow-[0_0_40px_rgba(59,130,246,0.15)] max-w-full"
        />

        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-zinc-800/50">
            <button 
              onClick={() => setIsPlaying(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white rounded-full p-5 hover:scale-110 active:scale-95 transition-all shadow-lg shadow-blue-500/25 border border-white/10"
            >
              <Play className="w-8 h-8 ml-1" />
            </button>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center border border-zinc-800/50">
            <h4 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Has Chocado</h4>
            <p className="text-blue-400 font-mono text-xl mb-8">Distancia: {score}m</p>
            <button 
              onClick={() => {
                setGameOver(false);
                setScore(0);
                setIsPlaying(true);
              }}
              className="bg-white text-black hover:bg-zinc-200 px-6 py-3 rounded-full font-bold flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 shadow-xl"
            >
              <RotateCcw className="w-5 h-5" /> Intentar de Nuevo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
