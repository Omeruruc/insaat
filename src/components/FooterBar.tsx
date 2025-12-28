import { Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function FooterBar() {
  const navigate = useNavigate();
  const currentYear = 2021;

  return (
    <footer className="bg-black py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <Building2 className="w-8 h-8 text-amber-600" />
              <span className="text-xl font-serif text-white tracking-wider">
                MBM Elektrik İnşaat
              </span>
            </div>
            <p className="text-gray-400 font-light leading-relaxed">
              Yenilik, kesinlik ve zamansız tasarım aracılığıyla mimarlık
              mükemmelliğini yeniden tanımlamak.
            </p>
          </div>

          <div>
            <h4 className="text-white text-sm tracking-widest uppercase mb-6">
              Hızlı Bağlantılar
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Anasayfa', path: '/' },
                { label: 'Hakkımızda', path: '/hakkimizda' },
                { label: 'Projeler', path: '/projeler' },
                { label: 'İletişim', path: '/iletisim' },
              ].map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-gray-400 hover:text-amber-600 transition-colors duration-300 font-light"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-900 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm font-light">
              © {currentYear} MBM ELEKTRİK İNSAAT MÜHENDİSLİK NAKLİYAT VE SANAYİ TİCARET LİMİTED SİRKETİ. Tüm hakları saklıdır.
            </p>
            <div className="flex space-x-6 text-sm text-gray-500">
              <a
                href="#"
                className="hover:text-amber-600 transition-colors duration-300"
              >
                Gizlilik Politikası
              </a>
              <a
                href="#"
                className="hover:text-amber-600 transition-colors duration-300"
              >
                Kullanım Şartları
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
