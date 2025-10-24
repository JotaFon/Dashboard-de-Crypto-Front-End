import { useEffect, useRef } from "react";
import styles from "./ParticleBackground.module.css";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
}

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 1000;
    canvas.height = 1000;

    const particles: Particle[] = [];

    for (let i = 0; i < 20; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 0.5 + 0.3;

      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        size: Math.random() * 3 + 1,
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.05,
        opacity: 1,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.rotation += particle.rotationSpeed;

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const distanceFromCenter = Math.sqrt(
          Math.pow(particle.x - centerX, 2) + Math.pow(particle.y - centerY, 2)
        );

        particle.opacity = Math.max(0, 1 - distanceFromCenter / 500);

        if (
          particle.x < 0 ||
          particle.x > canvas.width ||
          particle.y < 0 ||
          particle.y > canvas.height ||
          particle.opacity <= 0
        ) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 0.5 + 0.3;

          particle.x = canvas.width / 2;
          particle.y = canvas.height / 2;
          particle.speedX = Math.cos(angle) * speed;
          particle.speedY = Math.sin(angle) * speed;
          particle.opacity = 1;
        }

        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);

        ctx.fillStyle = `rgba(230, 225, 194, ${particle.opacity})`;
        ctx.fillRect(
          -particle.size * 10,
          -particle.size * 10,
          particle.size,
          particle.size
        );

        ctx.restore();
      });

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
    />
  );
}

export default ParticleBackground;
