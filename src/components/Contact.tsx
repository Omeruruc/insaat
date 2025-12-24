import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="bg-zinc-950 py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-5xl md:text-6xl text-white mb-6">
            Let's Create Together
          </h2>
          <div className="w-24 h-px bg-amber-600 mx-auto mb-8" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
            Start your journey to architectural excellence with us
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h3 className="font-serif text-3xl text-white mb-8">
              Get In Touch
            </h3>

            <div className="space-y-8 mb-12">
              <div className="flex items-start space-x-4">
                <div className="bg-amber-600 p-3 mt-1">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">Address</h4>
                  <p className="text-gray-400 font-light">
                    Peyas, Mahabad Blv
                    <br />
                    21070 Kayapinar / Diyarbakir, Türkiye
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-amber-600 p-3 mt-1">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">Phone</h4>
                  <p className="text-gray-400 font-light">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-amber-600 p-3 mt-1">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">Email</h4>
                  <p className="text-gray-400 font-light">
                    contact@mbm-architects.com
                  </p>
                </div>
              </div>
            </div>

            <div className="aspect-video bg-zinc-900 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d196.69687850281997!2d40.15215952182289!3d37.9269247560349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40751ee32073baa9%3A0xf7c59c44b0f6abf1!2sMEGAARSLAN%20YAPI%20CADDE%20OFF%C4%B0CE%2075!5e0!3m2!1str!2str!4v1766408236427!5m2!1str!2str"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm text-gray-400 mb-2 tracking-wider uppercase"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-zinc-900 border border-zinc-800 px-6 py-4 text-white focus:border-amber-600 focus:outline-none transition-colors duration-300"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm text-gray-400 mb-2 tracking-wider uppercase"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-zinc-900 border border-zinc-800 px-6 py-4 text-white focus:border-amber-600 focus:outline-none transition-colors duration-300"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm text-gray-400 mb-2 tracking-wider uppercase"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-zinc-900 border border-zinc-800 px-6 py-4 text-white focus:border-amber-600 focus:outline-none transition-colors duration-300"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm text-gray-400 mb-2 tracking-wider uppercase"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full bg-zinc-900 border border-zinc-800 px-6 py-4 text-white focus:border-amber-600 focus:outline-none transition-colors duration-300 resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="group w-full bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 text-sm tracking-widest uppercase transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50"
              >
                {submitted ? (
                  <span>Message Sent!</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
