import { companyInfo } from '../data/staticData';

export function AboutPage() {
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
        <div className="text-center mb-20">
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-6">
            Hakkımızda
          </h1>
          <div className="w-24 h-px bg-amber-600 mx-auto mb-8" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div className="group">
              <h2 className="text-amber-600 text-sm tracking-widest uppercase mb-4">
                Hikayemiz
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed font-light">
                {companyInfo.story}
              </p>
            </div>

            <div className="group">
              <h2 className="text-amber-600 text-sm tracking-widest uppercase mb-4">
                Vizyonumuz
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed font-light italic">
                {companyInfo.vision}
              </p>
            </div>
          </div>

          <div className="space-y-12">
            <div className="group">
              <h2 className="text-amber-600 text-sm tracking-widest uppercase mb-4">
                Misyonumuz
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed font-light">
                {companyInfo.mission}
              </p>
            </div>

            <div className="group">
              <h2 className="text-amber-600 text-sm tracking-widest uppercase mb-4">
                Temel Değerlerimiz
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed font-light">
                {companyInfo.values}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
