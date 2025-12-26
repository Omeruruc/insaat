export function BoardMessagePage() {
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

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-6">
            Yönetim Kurulu Başkanı'nın Mesajı
          </h1>
          <div className="w-24 h-px bg-amber-600 mx-auto mb-8" />
        </div>

        <div className="bg-zinc-900/70 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">
          <div className="space-y-6 text-gray-300 leading-relaxed font-light">
            <p className="text-lg">
              Değerli İş Ortaklarımız, Kıymetli Çalışanlarımız ve Saygıdeğer Dostlarımız,
            </p>
            
            <p>
              MBM Elektrik İnşaat Mühendislik olarak 2021 yılında çıktığımız bu yolda, tek bir gaye ile hareket ettik: <strong className="text-amber-500 font-semibold">"Sadece bina değil, güven inşa etmek."</strong>
            </p>
            
            <p>
              Kurulduğumuz günden bu yana, özellikle TOKİ bünyesinde üstlendiğimiz projelerle, ülkemizin sosyal konut hamlesine ve kentsel dönüşüm vizyonuna katkı sunmaktan büyük onur duyuyoruz. İnşaat sektörünü yalnızca beton ve demirden ibaret görmüyoruz. Bizim için her proje; o konutlarda yaşayacak ailelerin huzuru, o yollardan geçecek insanların güvenliği ve ülkemizin yarınlarına bırakılacak sağlam bir miras demektir.
            </p>
            
            <p>
              Şirket ismimizde yer alan "Elektrik, İnşaat, Mühendislik ve Nakliyat" disiplinlerini tek bir çatı altında entegre ederek, projelerimizi dışa bağımlılığı en aza indiren güçlü bir teknik altyapıyla yönetiyoruz. Genç, dinamik ve mühendislik etiğine sıkı sıkıya bağlı kadromuzla, en zorlu şantiye koşullarında dahi taahhütlerimizi zamanında yerine getirmenin haklı gururunu yaşıyoruz.
            </p>
            
            <p>
              Gelecek hedeflerimizde; teknolojiyi iş süreçlerimize daha fazla entegre etmek, iş sağlığı ve güvenliği standartlarımızı her geçen gün yükseltmek ve Türkiye'nin imarında <strong className="text-white font-semibold">"aranan marka"</strong> olmaya devam etmek var.
            </p>
            
            <p>
              Bu başarı hikayesini yazmamızda emeği geçen tüm çalışma arkadaşlarıma ve bize güvenen tüm paydaşlarımıza teşekkürlerimi sunuyorum.
            </p>
            
            <div className="mt-12 pt-8 border-t border-zinc-800">
              <p className="text-white font-semibold text-lg mb-2">Saygılarımla,</p>
              <p className="text-amber-500 font-serif text-xl">
                MUSTAFA DEMİRALAY
              </p>
              <p className="text-gray-400 text-sm mt-1">Yönetim Kurulu Başkanı</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

