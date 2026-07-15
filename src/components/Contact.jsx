import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoUrl = `mailto:Kashyapnasit12345@gmail.com?subject=Portfolio Contact from ${formData.name}&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${formData.email}`;
    window.open(mailtoUrl, '_blank');
  };

  return (
    <section id="contact" className="relative py-32 border-t border-surface-border bg-primary-darker" ref={ref}>
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Left: Big Type */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-start"
          >
            <div className="mb-16">
              <h2 className="heading-massive text-white mb-6">
                GET IN <br /> TOUCH.
              </h2>
            </div>

            <div className="flex gap-8 items-center border-t border-surface-border pt-8 mt-auto">
              <div>
                <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest block mb-1">Location</span>
                <span className="font-sans font-bold text-lg text-white uppercase tracking-wider">India</span>
              </div>
              <div className="w-px h-8 bg-surface-border"></div>
              <div>
                <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest block mb-1">Status</span>
                <span className="font-sans font-bold text-lg text-accent uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                  Available
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right: Brutalist Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-8 bg-surface p-8 md:p-12 border border-surface-border">
              <div>
                <label className="font-mono text-[10px] text-text-muted uppercase tracking-widest block mb-4">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border-b border-surface-border pb-4 text-white font-sans text-lg focus:outline-none focus:border-accent transition-colors"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="font-mono text-[10px] text-text-muted uppercase tracking-widest block mb-4">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-b border-surface-border pb-4 text-white font-sans text-lg focus:outline-none focus:border-accent transition-colors"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label className="font-mono text-[10px] text-text-muted uppercase tracking-widest block mb-4">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full bg-transparent border-b border-surface-border pb-4 text-white font-sans text-lg focus:outline-none focus:border-accent transition-colors resize-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              <div className="flex justify-end pt-4">
                <button type="submit" className="group flex items-center gap-4 bg-transparent border border-surface-border text-white font-mono text-xs uppercase tracking-widest py-4 px-8 hover:bg-accent hover:text-primary-dark hover:border-accent transition-all">
                  Send Transmission
                  <span className="text-accent group-hover:text-primary-dark transition-colors">→</span>
                </button>
              </div>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
