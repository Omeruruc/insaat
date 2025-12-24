import { ChevronDown } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface HeroProps {
  onExploreClick: () => void;
}

export function Hero({ onExploreClick }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;

      ctx.fillStyle = 'rgba(9, 9, 11, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(217, 119, 6, ${particle.opacity})`;
        ctx.fill();

        particles.forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(217, 119, 6, ${0.1 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-zinc-950">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/70 via-zinc-950/50 to-zinc-950/90" />

      <div className="relative h-full flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white tracking-tight leading-tight">
            Crafting
            <span className="block text-amber-600 mt-2">Timeless Elegance</span>
          </h1>

          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
            Where architectural vision meets structural mastery.
            <span className="block mt-2">Transforming spaces into extraordinary experiences.</span>
          </p>

          <button
            onClick={onExploreClick}
            className="group relative inline-flex items-center space-x-3 bg-amber-600 hover:bg-amber-700 text-white px-10 py-4 text-sm tracking-widest uppercase transition-all duration-300 overflow-hidden mt-8"
          >
            <span className="relative z-10">Explore Projects</span>
            <ChevronDown className="w-4 h-4 relative z-10 group-hover:translate-y-1 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-amber-700 to-amber-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </button>
        </div>

        <button
          onClick={onExploreClick}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce"
        >
          <ChevronDown className="w-8 h-8 text-amber-600" />
        </button>
      </div>
    </section>
  );
}
