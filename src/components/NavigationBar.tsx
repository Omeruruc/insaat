import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

export function NavigationBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectsDropdownOpen, setProjectsDropdownOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'home', label: 'Anasayfa', path: '/' },
    { 
      id: 'projects', 
      label: 'Projeler', 
      path: '/projeler',
      dropdown: [
        { label: 'Tamamlanan', path: '/projeler/tamamlanan' },
        { label: 'Devam Eden', path: '/projeler/devam-eden' },
      ]
    },
    { 
      id: 'about', 
      label: 'Hakkımızda', 
      path: '/hakkimizda',
      dropdown: [
        { label: 'Hakkımızda', path: '/hakkimizda' },
        { label: 'Yönetim Kurulu Mesajı', path: '/yonetim-kurulu-mesaji' },
      ]
    },
    { id: 'contact', label: 'İletişim', path: '/iletisim' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0d0d0d] backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.35)] border-b border-white/5">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-20">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-3 group"
          >
            <img
              src="/mbm-header-logo.png"
              alt="MBM Elektrik İnşaat - Ana Sayfa"
              className="h-12 md:h-14 w-auto object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
            />
            <span className="text-base md:text-lg font-semibold text-white tracking-[0.2em] leading-none drop-shadow-lg">
              MBM <span className="text-amber-500">Elektrik İnşaat</span>
            </span>
          </button>

          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => {
              const active = isActive(item.path);
              const isProjects = item.id === 'projects';
              const isAbout = item.id === 'about';
              const dropdownOpen = isProjects ? projectsDropdownOpen : isAbout ? aboutDropdownOpen : false;
              
              if (item.dropdown) {
                return (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => {
                      if (isProjects) setProjectsDropdownOpen(true);
                      if (isAbout) setAboutDropdownOpen(true);
                    }}
                    onMouseLeave={() => {
                      if (isProjects) setProjectsDropdownOpen(false);
                      if (isAbout) setAboutDropdownOpen(false);
                    }}
                  >
                    <button
                      onClick={() => navigate(item.path)}
                      className={`relative px-3 py-2 rounded-lg text-sm tracking-[0.18em] uppercase transition-all duration-300 group flex items-center space-x-1 ${
                        active
                          ? 'text-amber-500 bg-amber-500/10 shadow-[0_0_20px_rgba(217,119,6,0.25)]'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
                      <span
                        className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2px] bg-amber-500/80 rounded-full transition-all duration-300 ${
                          active ? 'w-8 opacity-100' : 'w-0 opacity-0 group-hover:w-8 group-hover:opacity-100'
                        }`}
                      />
                    </button>
                    
                    {dropdownOpen && (
                      <div className="absolute top-full left-0 pt-2 w-56">
                        <div className="bg-zinc-900/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                          {item.dropdown.map((dropdownItem) => (
                            <button
                              key={dropdownItem.path}
                              onClick={() => {
                                navigate(dropdownItem.path);
                                setProjectsDropdownOpen(false);
                                setAboutDropdownOpen(false);
                              }}
                              className="block w-full text-left px-4 py-3 text-sm tracking-widest uppercase transition-colors duration-300 text-gray-300 hover:text-amber-500 hover:bg-white/5"
                            >
                              {dropdownItem.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
              
              return (
              <button
                key={item.id}
                  onClick={() => navigate(item.path)}
                  className={`relative px-3 py-2 rounded-lg text-sm tracking-[0.18em] uppercase transition-all duration-300 group ${
                    active
                      ? 'text-amber-500 bg-amber-500/10 shadow-[0_0_20px_rgba(217,119,6,0.25)]'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
                <span
                    className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2px] bg-amber-500/80 rounded-full transition-all duration-300 ${
                      active ? 'w-8 opacity-100' : 'w-0 opacity-0 group-hover:w-8 group-hover:opacity-100'
                  }`}
                />
              </button>
              );
            })}
          </div>

          <button
            className="md:hidden text-white"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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

        <div
          className={`md:hidden px-1 transition-all duration-300 origin-top ${
            mobileMenuOpen
              ? 'max-h-80 opacity-100 scale-y-100 pb-4'
              : 'max-h-0 opacity-0 scale-y-95 pb-0 pointer-events-none'
          }`}
        >
          <div className="overflow-hidden rounded-xl border border-white/10 bg-zinc-900/95 backdrop-blur-md shadow-2xl divide-y divide-white/5">
            {navItems.map((item) => {
              const active = isActive(item.path);
              if (item.dropdown) {
                return (
                  <div key={item.id}>
                    <button
                      onClick={() => {
                        navigate(item.path);
                        setMobileMenuOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-3 text-sm tracking-widest uppercase transition-colors duration-300 ${
                        active ? 'text-amber-500 bg-white/5' : 'text-gray-200 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {item.label}
                    </button>
                    <div className="pl-4 space-y-1">
                      {item.dropdown.map((dropdownItem) => (
                        <button
                          key={dropdownItem.path}
                          onClick={() => {
                            navigate(dropdownItem.path);
                            setMobileMenuOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-xs tracking-widest uppercase transition-colors duration-300 text-gray-400 hover:text-amber-500"
                        >
                          {dropdownItem.label}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              }
              return (
              <button
                key={item.id}
                onClick={() => {
                    navigate(item.path);
                  setMobileMenuOpen(false);
                }}
                  className={`block w-full text-left px-4 py-3 text-sm tracking-widest uppercase transition-colors duration-300 ${
                    active ? 'text-amber-500 bg-white/5' : 'text-gray-200 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
