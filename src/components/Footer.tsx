import { Building2, Linkedin, Instagram, Facebook } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <Building2 className="w-8 h-8 text-amber-600" />
              <span className="text-xl font-serif text-white tracking-wider">
                MBM
              </span>
            </div>
            <p className="text-gray-400 font-light leading-relaxed">
              Redefining architectural excellence through innovation, precision,
              and timeless design.
            </p>
          </div>

          <div>
            <h4 className="text-white text-sm tracking-widest uppercase mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Projects', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(' ', '')}`}
                    className="text-gray-400 hover:text-amber-600 transition-colors duration-300 font-light"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm tracking-widest uppercase mb-6">
              Connect With Us
            </h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-zinc-900 p-3 text-gray-400 hover:bg-amber-600 hover:text-white transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-zinc-900 p-3 text-gray-400 hover:bg-amber-600 hover:text-white transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-zinc-900 p-3 text-gray-400 hover:bg-amber-600 hover:text-white transition-all duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-900 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm font-light">
              © {currentYear} MBM Architects. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-500">
              <a
                href="#"
                className="hover:text-amber-600 transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:text-amber-600 transition-colors duration-300"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
