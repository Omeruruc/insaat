import { useEffect, useState } from 'react';
import { X, MapPin, Calendar, Maximize2, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Project, ProjectMedia } from '../types/database';

interface ProjectDetailProps {
  projectId: string;
  onClose: () => void;
}

export function ProjectDetail({ projectId, onClose }: ProjectDetailProps) {
  const [project, setProject] = useState<Project | null>(null);
  const [media, setMedia] = useState<ProjectMedia[]>([]);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjectDetails() {
      const [projectResult, mediaResult] = await Promise.all([
        supabase.from('projects').select('*').eq('id', projectId).maybeSingle(),
        supabase
          .from('project_media')
          .select('*')
          .eq('project_id', projectId)
          .order('display_order', { ascending: true }),
      ]);

      if (projectResult.data) setProject(projectResult.data);
      if (mediaResult.data) setMedia(mediaResult.data);
      setLoading(false);
    }

    fetchProjectDetails();
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [projectId]);

  const nextMedia = () => {
    setCurrentMediaIndex((prev) =>
      prev === media.length - 1 ? 0 : prev + 1
    );
  };

  const prevMedia = () => {
    setCurrentMediaIndex((prev) =>
      prev === 0 ? media.length - 1 : prev - 1
    );
  };

  if (loading || !project) {
    return (
      <div className="fixed inset-0 bg-zinc-950 z-50 flex items-center justify-center">
        <div className="text-amber-600 text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-zinc-950 z-50 overflow-y-auto">
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-50 bg-zinc-900/90 backdrop-blur-sm p-3 text-white hover:bg-amber-600 transition-all duration-300 group"
      >
        <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
      </button>

      <div className="min-h-screen">
        <div className="relative h-screen">
          <img
            src={project.hero_image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-12">
            <div className="max-w-7xl mx-auto">
              <span
                className={`inline-block px-4 py-2 text-xs tracking-widest uppercase mb-6 ${
                  project.status === 'ongoing'
                    ? 'bg-amber-600 text-white'
                    : 'bg-zinc-800 text-gray-300'
                }`}
              >
                {project.status}
              </span>

              <h1 className="font-serif text-5xl md:text-7xl text-white mb-6">
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
              Project Overview
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed font-light">
              {project.description}
            </p>
          </div>

          {media.length > 0 && (
            <div className="mt-20">
              <h2 className="font-serif text-3xl text-white mb-12 text-center">
                Project Gallery
              </h2>

              <div className="relative aspect-video bg-zinc-900 overflow-hidden group">
                <img
                  src={media[currentMediaIndex].url}
                  alt={media[currentMediaIndex].caption}
                  className="w-full h-full object-cover"
                />

                {media.length > 1 && (
                  <>
                    <button
                      onClick={prevMedia}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-zinc-900/80 backdrop-blur-sm p-3 text-white hover:bg-amber-600 transition-all duration-300 opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                      onClick={nextMedia}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-zinc-900/80 backdrop-blur-sm p-3 text-white hover:bg-amber-600 transition-all duration-300 opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                      {media.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentMediaIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentMediaIndex
                              ? 'bg-amber-600 w-8'
                              : 'bg-white/50 hover:bg-white/80'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}

                {media[currentMediaIndex].caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-zinc-950 to-transparent p-6">
                    <p className="text-gray-300 text-sm">
                      {media[currentMediaIndex].caption}
                    </p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {media.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentMediaIndex(index)}
                    className={`aspect-square overflow-hidden transition-all duration-300 ${
                      index === currentMediaIndex
                        ? 'ring-2 ring-amber-600'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={item.url}
                      alt={item.caption}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
