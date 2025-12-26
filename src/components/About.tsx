import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { TeamMember, CompanyInfo } from '../types/database';

export function About() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [companyInfo, setCompanyInfo] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [teamResult, infoResult] = await Promise.all([
        supabase
          .from('team_members')
          .select('*')
          .order('display_order', { ascending: true }),
        supabase.from('company_info').select('*'),
      ]);

      if (teamResult.data) setTeamMembers(teamResult.data);
      if (infoResult.data) {
        const infoMap: Record<string, string> = {};
        (infoResult.data as CompanyInfo[]).forEach((item) => {
          infoMap[item.section] = item.content;
        });
        setCompanyInfo(infoMap);
      }

      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-amber-600 text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <section id="about" className="bg-zinc-950 py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="font-serif text-5xl md:text-6xl text-white mb-6">
            About <span className="text-amber-600">MBM</span>
          </h2>
          <div className="w-24 h-px bg-amber-600 mx-auto mb-8" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 mb-24">
          <div className="space-y-8">
            <div className="group">
              <h3 className="text-amber-600 text-sm tracking-widest uppercase mb-4">
                Our Story
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed font-light">
                {companyInfo.story}
              </p>
            </div>

            <div className="group">
              <h3 className="text-amber-600 text-sm tracking-widest uppercase mb-4">
                Vision
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed font-light italic">
                {companyInfo.vision}
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="group">
              <h3 className="text-amber-600 text-sm tracking-widest uppercase mb-4">
                Mission
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed font-light">
                {companyInfo.mission}
              </p>
            </div>

            <div className="group">
              <h3 className="text-amber-600 text-sm tracking-widest uppercase mb-4">
                Core Values
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed font-light">
                {companyInfo.values}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-20">
          <h3 className="font-serif text-4xl text-white text-center mb-16">
            Leadership Team
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className="group relative overflow-hidden"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className="aspect-[3/4] overflow-hidden mb-6 bg-zinc-900">
                  <img
                    src={member.image_url}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
                </div>

                <h4 className="text-white text-xl font-serif mb-2">
                  {member.name}
                </h4>
                <p className="text-amber-600 text-sm tracking-wider uppercase mb-3">
                  {member.position}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed font-light">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
