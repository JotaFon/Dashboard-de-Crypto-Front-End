import { useRef, useEffect } from "react";

export const useCardTilt = (maxTilt: number = 5) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const rotateX = ((y - centerY) / centerY) * maxTilt;
      const rotateY = ((centerX - x) / centerX) * maxTilt;

      card.style.transform = `perspective(4000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);

      if (card) {
        card.style.transform =
          "perspective(4000px) rotateX(0deg) rotateY(0deg)";
      }
    };
  }, [maxTilt]);

  return cardRef;
};
