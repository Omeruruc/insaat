import { useEffect, useState } from 'react';
import { MapPin, Calendar, Maximize2, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Project } from '../types/database';

interface ProjectsProps {
  onProjectClick: (projectId: string) => void;
}

export function Projects({ onProjectClick }: ProjectsProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState<'all' | 'ongoing' | 'completed'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const { data } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true });

      if (data) setProjects(data);
      setLoading(false);
    }

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((project) =>
    filter === 'all' ? true : project.status === filter
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-black flex items-center justify-center">
        <div className="text-amber-500 text-xl tracking-widest uppercase">
          Loading projects...
        </div>
      </div>
    );
  }

  return (
    <section
      id="projects"
      className="relative bg-gradient-to-b from-zinc-950 via-zinc-900 to-black py-24 md:py-32 overflow-hidden"
    >
      {/* Arka planda modern ışık efektleri */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-40 -left-32 w-80 h-80 md:w-96 md:h-96 bg-amber-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-[-8rem] right-[-4rem] w-[22rem] h-[22rem] md:w-[28rem] md:h-[28rem] bg-amber-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-5xl md:text-6xl text-white mb-6 drop-shadow-xl">
            Our <span className="text-amber-500">Portfolio</span>
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-8" />
          <p className="text-gray-300 text-lg max-w-2xl mx-auto font-light">
            Explore our collection of prestigious projects that define
            architectural excellence
          </p>
        </div>

        <div className="flex justify-center space-x-6 mb-16">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'ongoing', label: 'Ongoing' },
            { id: 'completed', label: 'Completed' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as typeof filter)}
              className={`px-6 py-3 text-sm tracking-widest uppercase transition-all duration-300 rounded-full ${
                filter === tab.id
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/40'
                  : 'bg-zinc-800/70 text-gray-300 hover:bg-zinc-700 hover:text-white border border-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group relative overflow-hidden bg-zinc-900/70 backdrop-blur-md cursor-pointer rounded-2xl border border-white/5 shadow-[0_18px_60px_rgba(0,0,0,0.7)]"
              onClick={() => onProjectClick(project.id)}
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img
                  src={project.hero_image}
                  alt={`${project.title} proje görseli`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
              </div>

              <div className="absolute top-6 right-6">
                <span
                  className={`px-4 py-2 text-xs tracking-widest uppercase ${
                    project.status === 'ongoing'
                      ? 'bg-amber-600 text-white'
                      : 'bg-zinc-800 text-gray-300'
                  }`}
                >
                  {project.status}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-white text-3xl font-serif mb-3 group-hover:text-amber-600 transition-colors duration-300">
                  {project.title}
                </h3>

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
                  <span className="tracking-wider uppercase">View Project</span>
                  <ChevronRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No {filter !== 'all' && filter} projects found.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
