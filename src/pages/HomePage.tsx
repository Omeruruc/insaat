import { ChevronDown, ChevronLeft, ChevronRight, Building2, Zap, FileText, Truck } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { heroSliderImages } from '../data/staticData';
import { useNavigate } from 'react-router-dom';

function HeroContent() {
  const navigate = useNavigate();
  const [showText, setShowText] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Component mount olduğunda animasyonu başlat
    // Küçük bir gecikme ekleyerek transition'ın çalışmasını garantiye alıyoruz
    const timer = setTimeout(() => {
      setShowText(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Intersection Observer ile görünürlük değişikliklerini takip et
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Görünür hale geldiğinde animasyonu tekrar başlat
            setShowText(false);
            const timer = setTimeout(() => {
              setShowText(true);
            }, 100);
            // Timer'ı temizlemek için return etmiyoruz, çünkü bu bir callback içinde
            // Timer otomatik olarak çalışacak ve temizlenecek
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="max-w-5xl mx-auto space-y-8">
      {/* Tek container içinde birleşik metin */}
      <div
        className={`inline-block backdrop-blur-md bg-black/20 rounded-2xl border border-white/10 px-6 py-6 md:px-10 md:py-8 transition-all duration-1000 ${
          showText
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-8 scale-95'
        }`}
      >
        <h1
          className={`font-serif text-5xl md:text-7xl lg:text-8xl text-white tracking-tight leading-tight drop-shadow-2xl transition-all duration-1000 delay-200 ${
            showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Sağlam Adım
          <span
            className={`block text-amber-500 mt-4 drop-shadow-lg transition-all duration-1000 delay-400 ${
              showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Güçlü İnşaat
          </span>
        </h1>

        <div
          className={`w-24 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto my-6 transition-all duration-1000 delay-600 ${
            showText ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`}
        ></div>

        <p
          className={`text-white text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light tracking-wide drop-shadow-lg transition-all duration-1000 delay-700 ${
            showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          MBM Elektrik İnşaat olarak TOKİ projeleri, üst yapı inşaatları ve elektrik taahhüt işlerinde anahtar teslim mühendislik çözümleri sunuyoruz.
        </p>
      </div>

      <div
        className={`pt-4 transition-all duration-1000 delay-900 ${
          showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <button
          onClick={() => navigate('/projeler')}
          className="group relative inline-flex items-center space-x-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-12 py-5 text-sm tracking-widest uppercase transition-all duration-500 overflow-hidden rounded-full shadow-xl hover:shadow-2xl hover:scale-105"
        >
          <span className="relative z-10 font-semibold">Projeleri Keşfet</span>
          <ChevronDown className="w-5 h-5 relative z-10 group-hover:translate-y-1 transition-transform duration-300" />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full" />
        </button>
      </div>
    </div>
  );
}

export function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0]));


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroSliderImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Preload next image
  useEffect(() => {
    const nextIndex = (currentImageIndex + 1) % heroSliderImages.length;
    if (!loadedImages.has(nextIndex)) {
      const img = new Image();
      img.src = heroSliderImages[nextIndex];
      img.onload = () => {
        setLoadedImages((prev) => new Set([...prev, nextIndex]));
      };
    }
  }, [currentImageIndex, loadedImages]);

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
          {heroSliderImages.map((image, index) => {
            const isCurrent = index === currentImageIndex;
            const shouldRender = loadedImages.has(index) || index === 0;
            
            if (!shouldRender) return null;
            
            return (
              <img
                key={`${image}-${index}`}
                src={image}
                alt={`TOKİ projeleri ve inşaat hizmetleri görsel ${index + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
                  isCurrent
                    ? 'opacity-100 animate-zoom-in'
                    : 'opacity-0'
                }`}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                {...({ fetchpriority: index === 0 ? 'high' : 'auto' } as any)}
              />
            );
          })}
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      <button
        onClick={prevImage}
        aria-label="Önceki görsel"
        className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-black/30 backdrop-blur-md hover:bg-amber-500 text-white p-2 md:p-4 rounded-full transition-all duration-300 border border-white/20 hover:border-amber-500 hover:scale-110 shadow-xl"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      <button
        onClick={nextImage}
        aria-label="Sonraki görsel"
        className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-black/30 backdrop-blur-md hover:bg-amber-500 text-white p-2 md:p-4 rounded-full transition-all duration-300 border border-white/20 hover:border-amber-500 hover:scale-110 shadow-xl"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

        <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-3 bg-black/30 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
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
          <HeroContent key={currentImageIndex} />
        </div>
      </section>

      {/* Faaliyet Alanlarımız */}
      <section className="relative py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">
              Faaliyet Alanlarımız
            </h2>
            <div className="w-24 h-px bg-amber-600 mx-auto" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Üst Yapı İnşaatları */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/70 backdrop-blur-md p-8 shadow-[0_14px_50px_rgba(0,0,0,0.55)]">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-amber-500/5" />
              <div className="relative flex items-start space-x-4">
                <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/30">
                  <Building2 className="w-7 h-7 text-amber-400" />
                </div>
                <div className="space-y-3 flex-1">
                  <h3 className="text-white text-2xl font-semibold">Üst Yapı İnşaatları</h3>
                  <ul className="text-gray-400 text-sm space-y-2 list-disc list-inside">
                    <li>Toplu konutlar (TOKİ)</li>
                    <li>Ticari binalar</li>
                    <li>Sosyal tesisler</li>
                    <li>Taahhüt işleri</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Elektrik Taahhüt İşleri */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/70 backdrop-blur-md p-8 shadow-[0_14px_50px_rgba(0,0,0,0.55)]">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-amber-500/5" />
              <div className="relative flex items-start space-x-4">
                <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/30">
                  <Zap className="w-7 h-7 text-amber-400" />
                </div>
                <div className="space-y-3 flex-1">
                  <h3 className="text-white text-2xl font-semibold">Elektrik Taahhüt İşleri</h3>
                  <ul className="text-gray-400 text-sm space-y-2 list-disc list-inside">
                    <li>OG/AG enerji nakil hatları</li>
                    <li>Trafo merkezleri</li>
                    <li>Bina içi elektrik tesisatları</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Mühendislik & Projelendirme */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/70 backdrop-blur-md p-8 shadow-[0_14px_50px_rgba(0,0,0,0.55)]">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-amber-500/5" />
              <div className="relative flex items-start space-x-4">
                <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/30">
                  <FileText className="w-7 h-7 text-amber-400" />
                </div>
                <div className="space-y-3 flex-1">
                  <h3 className="text-white text-2xl font-semibold">Mühendislik & Projelendirme</h3>
                  <ul className="text-gray-400 text-sm space-y-2 list-disc list-inside">
                    <li>Statik, mekanik ve elektrik proje çizimleri</li>
                    <li>Teknik danışmanlık</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Lojistik ve Nakliyat */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/70 backdrop-blur-md p-8 shadow-[0_14px_50px_rgba(0,0,0,0.55)]">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-amber-500/5" />
              <div className="relative flex items-start space-x-4">
                <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/30">
                  <Truck className="w-7 h-7 text-amber-400" />
                </div>
                <div className="space-y-3 flex-1">
                  <h3 className="text-white text-2xl font-semibold">Lojistik ve Nakliyat</h3>
                  <ul className="text-gray-400 text-sm space-y-2 list-disc list-inside">
                    <li>İnşaat malzemesi tedariği</li>
                    <li>Hafriyat nakliyesi</li>
                    <li>Ağır yük taşımacılığı</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
