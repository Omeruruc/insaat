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

        <div className="space-y-16">
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
                  Değerlerimiz
                </h2>
                <ul className="text-gray-300 text-lg leading-relaxed font-light space-y-3">
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <span><strong className="text-white">Şeffaflık:</strong> Tüm iş süreçlerinde açıklık ve dürüstlük.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <span><strong className="text-white">İş Güvenliği:</strong> "Sıfır İş Kazası" hedefiyle çalışmak.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <span><strong className="text-white">Mühendislik Etiği:</strong> Bilimin ve tekniğin doğrularından sapmamak.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <span><strong className="text-white">Zamanında Teslim:</strong> Taahhüt edilen sürede projeyi bitirmek.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* İSG ve Çevre Politikamız */}
          <div className="border-t border-zinc-800 pt-12">
            <div className="group">
              <h2 className="text-amber-600 text-sm tracking-widest uppercase mb-4">
                İSG (İş Sağlığı ve Güvenliği) ve Çevre Politikamız
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed font-light">
                MBM İnşaat olarak, en değerli sermayemizin insan kaynağımız olduğuna inanıyoruz. Tüm şantiyelerimizde yasal mevzuatların ötesinde, uluslararası standartlarda güvenlik önlemleri alıyor; 'Önce İş Güvenliği' ilkesiyle çalışanlarımıza güvenli bir çalışma ortamı, çevremize ise minimum karbon ayak izi taahhüt ediyoruz.
              </p>
            </div>
          </div>

          {/* Makine Parkı ve Teknik Altyapımız */}
          <div className="border-t border-zinc-800 pt-12">
            <div className="group">
              <h2 className="text-amber-600 text-sm tracking-widest uppercase mb-4">
                Makine Parkı ve Teknik Altyapımız
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed font-light mb-6">
                MBM Elektrik İnşaat olarak; projelerimizi taahhüt ettiğimiz sürede ve en yüksek kalitede teslim etmek için teknolojinin gücünü sahaya yansıtıyoruz. Modern, bakımlı ve yüksek kapasiteli makine parkımızla, şantiyelerimizde kesintisiz bir iş akışı sağlıyoruz.
              </p>
              <p className="text-white text-base font-medium mb-4">
                Filomuzun temel gücünü oluşturan ekipmanlarımız:
              </p>
              <ul className="text-gray-300 text-lg leading-relaxed font-light space-y-3">
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span><strong className="text-white">Kule Vinçler:</strong> Yüksek katlı yapılarda güvenli ve hızlı dikey taşıma operasyonları.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span><strong className="text-white">Ekskavatörler:</strong> Zorlu zemin koşullarında derin kazı, kırım ve büyük ölçekli hafriyat operasyonlarının ana gücü.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span><strong className="text-white">Hafriyat Kamyonları:</strong> Güçlü lojistik ağı ile malzeme tedariği ve hafriyat tahliyesi.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span><strong className="text-white">Manitou (Teleskopik Yükleyiciler):</strong> Şantiye içinde esnek, yüksek erişimli yükleme ve istifleme.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span><strong className="text-white">JCB (Beko Loderler):</strong> Altyapı, çevre düzenleme ve hassas kazı işlerinde çevik çözümler.</span>
                </li>
              </ul>
              <p className="text-gray-300 text-lg leading-relaxed font-light mt-6">
                Geniş araç parkımız ve uzman operatörlerimizle, en zorlu proje koşullarında bile "kesintisiz güç" sunuyoruz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
