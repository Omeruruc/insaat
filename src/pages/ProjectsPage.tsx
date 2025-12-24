import { useState } from 'react';
import { MapPin, Calendar, Maximize2, ChevronRight } from 'lucide-react';
import { projects } from '../data/staticData';
import { useNavigate } from 'react-router-dom';

export function ProjectsPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'ongoing' | 'completed'>('all');

  const filteredProjects = projects.filter((project) =>
    filter === 'all' ? true : project.status === filter
  );

  return (
    <section className="relative overflow-hidden min-h-screen bg-zinc-950 py-24 md:py-32">
      {/* Animasyonlu arka plan */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70 animate-bg-pan"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(245, 158, 11, 0.14), transparent 30%), radial-gradient(circle at 80% 25%, rgba(217, 119, 6, 0.12), transparent 28%), radial-gradient(circle at 50% 80%, rgba(255, 195, 99, 0.1), transparent 30%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-6">
            Portföyümüz
          </h1>
          <div className="w-24 h-px bg-amber-600 mx-auto mb-8" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
            Mimarlık mükemmelliğini tanımlayan saygın projelerimizi keşfedin
          </p>
        </div>

        <div className="flex justify-center space-x-6 mb-16">
          {[
            { id: 'all', label: 'Tüm Projeler' },
            { id: 'ongoing', label: 'Devam Eden' },
            { id: 'completed', label: 'Tamamlanan' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as typeof filter)}
              className={`px-6 py-3 text-sm tracking-widest uppercase transition-all duration-300 ${
                filter === tab.id
                  ? 'bg-amber-600 text-white'
                  : 'bg-zinc-800 text-gray-400 hover:bg-zinc-700 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project: any, index) => (
            <div
              key={project.id}
              className="group relative overflow-hidden bg-zinc-950 cursor-pointer"
              onClick={() => navigate(`/projeler/${project.id}`)}
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={project.hero_image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
              </div>

              <div className="absolute top-6 right-6">
                <span
                  className={`px-4 py-2 text-xs tracking-widest uppercase ${
                    project.status === 'ongoing'
                      ? 'bg-amber-600 text-white'
                      : 'bg-zinc-800 text-gray-300'
                  }`}
                >
                  {project.status === 'ongoing' ? 'Devam Eden' : 'Tamamlanan'}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h2 className="text-white text-3xl font-serif mb-3 group-hover:text-amber-600 transition-colors duration-300">
                  {project.title}
                </h2>

                <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2 font-light">
                  {project.description}
                </p>

                <div className="flex items-center space-x-6 text-xs text-gray-500 mb-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-3 h-3" />
                    <span>{project.location}</span>
                  </div>
                  {project.year && (
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-3 h-3" />
                      <span>{project.year}</span>
                    </div>
                  )}
                  {project.area && (
                    <div className="flex items-center space-x-2">
                      <Maximize2 className="w-3 h-3" />
                      <span>{project.area}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center text-amber-600 text-sm group-hover:translate-x-2 transition-transform duration-300">
                  <span className="tracking-wider uppercase">Projeyi Gör</span>
                  <ChevronRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              Proje bulunamadı.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
