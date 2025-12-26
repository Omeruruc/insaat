import { useState, useEffect } from 'react';
import { MapPin, Calendar, Maximize2, User, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { projects } from '../data/staticData';
import { useNavigate, useParams } from 'react-router-dom';

export function ProjectDetailPage() {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();
  const project = projects.find((p) => p.id === projectId);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const galleryImages = project?.gallery || [project?.hero_image].filter(Boolean);

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [lightboxOpen]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

  if (!project) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center pt-20">
        <div className="text-amber-600 text-xl">Proje bulunamadı</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 pt-20">
      <button
        onClick={() => navigate(-1)}
        aria-label="Projeler sayfasına geri dön"
        className="fixed top-24 left-6 z-40 flex items-center space-x-2 bg-zinc-900/90 backdrop-blur-sm px-4 py-2 text-white hover:bg-amber-600 transition-all duration-300"
      >
        <ChevronLeft className="w-5 h-5" />
        <span>Geri Dön</span>
      </button>

      <div className="relative h-96 md:h-[500px]">
        <img
          src={project.hero_image}
          alt={project.title}
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 lg:p-12">
          <div className="max-w-7xl mx-auto">
            <span
              className={`inline-block px-4 py-2 text-xs tracking-widest uppercase mb-4 md:mb-6 ${
                project.status === 'ongoing'
                  ? 'bg-amber-600 text-white'
                  : 'bg-zinc-800 text-gray-300'
              }`}
            >
              {project.status === 'ongoing' ? 'Devam Eden' : 'Tamamlanan'}
            </span>

            <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl text-white mb-4 md:mb-6 leading-tight">
              {project.title}
            </h1>

            <div className="flex flex-wrap gap-6 text-gray-400 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-amber-600" />
                <span>{project.location}</span>
              </div>
              {project.year && (
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-amber-600" />
                  <span>{project.year}</span>
                </div>
              )}
              {project.area && (
                <div className="flex items-center space-x-2">
                  <Maximize2 className="w-4 h-4 text-amber-600" />
                  <span>{project.area}</span>
                </div>
              )}
              {project.client && (
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-amber-600" />
                  <span>{project.client}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          <h2 className="font-serif text-3xl text-white mb-6">
            Proje Özeti
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed font-light">
            {project.description}
          </p>
        </div>

        <div className="mt-20">
          <h2 className="font-serif text-3xl text-white mb-12 text-center">
            Proje Galerisi
          </h2>

          {galleryImages.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryImages.map((image: string, index: number) => (
                <div
                  key={index}
                  className="relative aspect-video bg-zinc-900 overflow-hidden rounded-lg cursor-pointer group"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={image}
                    alt={`${project.title} - Galeri görseli ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg">
                      <span className="text-white text-sm">Büyüt</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 text-sm">
              <p>Daha fazla proje görseli yakında eklenecektir</p>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 text-white hover:text-amber-500 transition-colors duration-300 p-2"
            aria-label="Kapat"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 z-10 text-white hover:text-amber-500 transition-colors duration-300 p-4 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70"
            aria-label="Önceki görsel"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 z-10 text-white hover:text-amber-500 transition-colors duration-300 p-4 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70"
            aria-label="Sonraki görsel"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div
            className="max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[lightboxIndex]}
              alt={`${project.title} - Galeri görseli ${lightboxIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="text-white text-sm">
              {lightboxIndex + 1} / {galleryImages.length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
