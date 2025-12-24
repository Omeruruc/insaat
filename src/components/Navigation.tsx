import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
interface NavigationProps {
  onNavigate: (section: string) => void;
  activeSection: string;
}

export function Navigation({ onNavigate, activeSection }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0d0d0d] backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.35)] border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <img
              src="/mbm-header-logo.png"
              alt="MBM"
              className="h-12 md:h-14 w-auto object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
            />
            <span className="text-base md:text-lg font-semibold text-white tracking-[0.2em] uppercase leading-none drop-shadow-lg">
              MBM <span className="text-amber-500">Elektrik İnşaat</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative px-3 py-2 rounded-lg text-sm tracking-[0.18em] uppercase transition-all duration-300 group ${
                  activeSection === item.id
                    ? 'text-amber-500 bg-amber-500/10 shadow-[0_0_20px_rgba(217,119,6,0.25)]'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2px] bg-amber-500/80 rounded-full transition-all duration-300 ${
                    activeSection === item.id
                      ? 'w-8 opacity-100'
                      : 'w-0 opacity-0 group-hover:w-8 group-hover:opacity-100'
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="md:hidden">
            <button
              className="text-white"
              onClick={() => {
                const menu = document.getElementById('mobile-menu');
                menu?.classList.toggle('hidden');
              }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        <div id="mobile-menu" className="hidden md:hidden pb-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                document.getElementById('mobile-menu')?.classList.add('hidden');
              }}
              className={`block w-full text-left py-3 text-sm tracking-widest uppercase transition-colors duration-300 ${
                activeSection === item.id
                  ? 'text-amber-600'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
