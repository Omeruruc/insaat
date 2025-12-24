import { ChevronDown, ChevronLeft, ChevronRight, Building2, Hammer } from 'lucide-react';
import { useEffect, useState } from 'react';
import { heroSliderImages } from '../data/staticData';
import { useNavigate } from 'react-router-dom';

export function HomePage() {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroSliderImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % heroSliderImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + heroSliderImages.length) % heroSliderImages.length
    );
  };

  return (
    <div className="bg-zinc-950">
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          {heroSliderImages.map((image, index) => (
            <img
              key={image}
              src={image}
              alt={`MBM Elektrik İnşaat proje görseli ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
                index === currentImageIndex
                  ? 'opacity-100 animate-zoom-in'
                  : 'opacity-0'
              }`}
              loading="lazy"
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      <button
        onClick={prevImage}
        aria-label="Önceki görsel"
        className="absolute left-8 top-1/2 -translate-y-1/2 z-20 bg-black/30 backdrop-blur-md hover:bg-amber-500 text-white p-4 rounded-full transition-all duration-300 border border-white/20 hover:border-amber-500 hover:scale-110 shadow-xl"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextImage}
        aria-label="Sonraki görsel"
        className="absolute right-8 top-1/2 -translate-y-1/2 z-20 bg-black/30 backdrop-blur-md hover:bg-amber-500 text-white p-4 rounded-full transition-all duration-300 border border-white/20 hover:border-amber-500 hover:scale-110 shadow-xl"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3 bg-black/30 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
        {heroSliderImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            aria-label={`Görsel ${index + 1}'e geç`}
            className={`rounded-full transition-all duration-300 ${
              index === currentImageIndex
                ? 'bg-amber-500 w-10 h-3 shadow-lg shadow-amber-500/50'
                : 'bg-white/40 hover:bg-white/70 w-3 h-3'
            }`}
          />
        ))}
        </div>

        <div className="relative h-full flex flex-col items-center justify-center px-6 text-center z-10">
          <div className="max-w-5xl mx-auto space-y-8 animate-fade-in-up">
            {/* Modern glassmorphism container */}
            <div className="backdrop-blur-md bg-black/15 border border-white/12 rounded-2xl p-8 md:p-12 shadow-2xl">
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white tracking-tight leading-tight drop-shadow-2xl">
                Ölümsüz
                <span className="block text-amber-500 mt-4 drop-shadow-lg">Şıklık Yaratmak</span>
              </h1>

              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto my-8"></div>

              <p className="text-white text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light tracking-wide drop-shadow-lg">
                Mimarî vizyonun yapısal ustalıkla buluştuğu yer.
                <span className="block mt-3 text-gray-200">
                  Mekanları olağanüstü deneyimlere dönüştürme.
                </span>
              </p>

              <button
                onClick={() => navigate('/projeler')}
                className="group relative inline-flex items-center space-x-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-12 py-5 text-sm tracking-widest uppercase transition-all duration-500 overflow-hidden mt-10 rounded-full shadow-xl hover:shadow-2xl hover:scale-105"
              >
                <span className="relative z-10 font-semibold">Projeleri Keşfet</span>
                <ChevronDown className="w-5 h-5 relative z-10 group-hover:translate-y-1 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Üst Yapı ve Taahhüt Hizmetleri sütunları */}
      <section className="relative py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/70 backdrop-blur-md p-8 shadow-[0_14px_50px_rgba(0,0,0,0.55)]">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-amber-500/5" />
            <div className="relative flex items-start space-x-4">
              <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/30">
                <Building2 className="w-7 h-7 text-amber-400" />
              </div>
              <div className="space-y-3">
                <h3 className="text-white text-2xl font-semibold">Üst Yapı Hizmetleri</h3>
                <p className="text-gray-300 leading-relaxed">
                  Konut, ofis, ticari ve endüstriyel projelerde modern mühendislik çözümleri; tasarımdan
                  uygulamaya tüm süreçleri uçtan uca yönetiyoruz.
                </p>
                <ul className="text-gray-400 text-sm space-y-1 list-disc list-inside">
                  <li>Mimari & statik uygulama projeleri</li>
                  <li>MEP/elektrik altyapı tasarımı ve devreye alma</li>
                  <li>Kalite, güvenlik ve sürdürülebilirlik entegrasyonu</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/70 backdrop-blur-md p-8 shadow-[0_14px_50px_rgba(0,0,0,0.55)]">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-amber-500/5" />
            <div className="relative flex items-start space-x-4">
              <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/30">
                <Hammer className="w-7 h-7 text-amber-400" />
              </div>
              <div className="space-y-3">
                <h3 className="text-white text-2xl font-semibold">Taahhüt İşleri</h3>
                <p className="text-gray-300 leading-relaxed">
                  Elektrik ve inşaat taahhütlerinde proje planlama, saha koordinasyonu ve zaman/bütçe
                  optimizasyonuyla yüksek standartlarda teslimat sağlıyoruz.
                </p>
                <ul className="text-gray-400 text-sm space-y-1 list-disc list-inside">
                  <li>Altyapı & üstyapı elektrik sistemleri kurulumu</li>
                  <li>Enerji verimliliği ve otomasyon çözümleri</li>
                  <li>Anahtar teslim proje yönetimi ve raporlama</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
