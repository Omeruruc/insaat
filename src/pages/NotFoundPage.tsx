import { Link } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';

export function NotFoundPage() {
  return (
    <section className="min-h-screen bg-zinc-950 flex items-center justify-center px-6 py-24">
      <div className="relative max-w-xl w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/70 backdrop-blur-md shadow-[0_18px_60px_rgba(0,0,0,0.45)] p-10 text-center space-y-6">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-amber-500/8" />
        <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400">
          <Compass className="w-8 h-8" />
        </div>
        <h1 className="relative text-4xl md:text-5xl font-serif text-white">404</h1>
        <p className="relative text-gray-300 leading-relaxed">
          Aradığınız sayfa bulunamadı. Ana sayfaya dönerek devam edebilirsiniz.
        </p>
        <Link
          to="/"
          className="relative inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-[0.18em] text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-[0_10px_30px_rgba(217,119,6,0.35)] hover:shadow-[0_12px_36px_rgba(217,119,6,0.45)] hover:scale-105"
        >
          <Home className="w-4 h-4" />
          <span>Ana Sayfa</span>
        </Link>
      </div>
    </section>
  );
}

