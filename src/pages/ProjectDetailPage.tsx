import { useState } from 'react';
import { MapPin, Calendar, Maximize2, User, ChevronLeft } from 'lucide-react';
import { projects } from '../data/staticData';
import { useNavigate, useParams } from 'react-router-dom';

export function ProjectDetailPage() {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();
  const project = projects.find((p) => p.id === projectId);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

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
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-7xl mx-auto">
            <span
              className={`inline-block px-4 py-2 text-xs tracking-widest uppercase mb-6 ${
                project.status === 'ongoing'
                  ? 'bg-amber-600 text-white'
                  : 'bg-zinc-800 text-gray-300'
              }`}
            >
              {project.status === 'ongoing' ? 'Devam Eden' : 'Tamamlanan'}
            </span>

            <h1 className="font-serif text-4xl md:text-6xl text-white mb-6">
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

          <div className="relative aspect-video bg-zinc-900 overflow-hidden mb-8">
            <img
              src={project.hero_image}
              alt={`${project.title} - Proje galeri görseli`}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="text-center text-gray-400 text-sm">
            <p>Daha fazla proje görseli yakında eklenecektir</p>
          </div>
        </div>
      </div>
    </div>
  );
}
