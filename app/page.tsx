'use client';

import { type FormEvent, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const heroParticles = [
  { left: '8%', top: '18%', size: 6, duration: 10, delay: 0 },
  { left: '18%', top: '62%', size: 10, duration: 14, delay: 1.2 },
  { left: '29%', top: '38%', size: 8, duration: 12, delay: 2.1 },
  { left: '42%', top: '16%', size: 12, duration: 16, delay: 0.8 },
  { left: '55%', top: '52%', size: 7, duration: 11, delay: 1.6 },
  { left: '66%', top: '28%', size: 11, duration: 15, delay: 2.4 },
  { left: '74%', top: '70%', size: 9, duration: 13, delay: 0.4 },
  { left: '86%', top: '34%', size: 13, duration: 18, delay: 1.9 },
  { left: '92%', top: '58%', size: 6, duration: 9, delay: 2.8 },
];

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const mobileProgressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitMessage('');
    setSubmitError('');
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      nombre: String(formData.get('nombre') ?? '').trim(),
      empresa: String(formData.get('empresa') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
      telefono: String(formData.get('telefono') ?? '').trim(),
      mensaje: String(formData.get('mensaje') ?? '').trim(),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || 'No se pudo enviar el formulario.');
      }

      setSubmitMessage('Formulario enviado correctamente. Te contactaremos pronto.');
      form.reset();
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'Error inesperado al enviar el formulario.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* Header */}
      <header className="w-full py-6 px-6 md:px-12 flex justify-between items-center fixed top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#0A192F]/10">
        <div className="font-display text-xl font-bold tracking-widest uppercase text-[#0A192F]">
          AHI <span className="text-slate-500 font-medium">Promociones</span>
        </div>
        <a 
          href="#contacto" 
          className="inline-flex md:hidden shrink-0 whitespace-nowrap items-center justify-center px-3 py-1.5 text-[11px] leading-none font-display tracking-[0.14em] uppercase text-[#0A192F] border border-[#0A192F]/20 rounded-full hover:bg-[#0A192F] hover:text-white transition-colors duration-300"
        >
          Estudiar
        </a>
        <a 
          href="#contacto" 
          className="hidden md:inline-flex items-center justify-center px-6 py-2 text-xs font-display tracking-widest uppercase text-[#0A192F] border border-[#0A192F]/20 rounded-full hover:bg-[#0A192F] hover:text-white transition-colors duration-300"
        >
          Estudiar operación
        </a>
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-[#1E3A8A] z-[60] md:hidden"
          style={{ width: mobileProgressWidth }}
        />
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-20 pb-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_#F8FAFC_0%,_#FFFFFF_70%)] opacity-100 -z-10" />
          <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
            {heroParticles.map((particle, i) => (
              <motion.span
                key={i}
                className="absolute rounded-full bg-[#1E3A8A]/35 blur-[1px]"
                style={{
                  left: particle.left,
                  top: particle.top,
                  width: particle.size,
                  height: particle.size,
                  boxShadow: '0 0 24px rgba(30, 58, 138, 0.35)',
                }}
                animate={{
                  y: [0, -22, 0],
                  x: [0, 6, 0],
                  opacity: [0.25, 0.65, 0.25],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[1400px] mx-auto w-full"
          >
            <h1 className="font-display text-[12vw] md:text-[9vw] leading-[0.85] tracking-tighter uppercase font-bold flex flex-col text-[#0A192F]">
              <span>Cuando la</span>
              <span className="text-[#1E3A8A]">financiación</span>
              <span className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                <span>no llega</span>
                <span className="hidden md:block flex-1 h-2 bg-[#0A192F] mt-4 md:mt-8"></span>
              </span>
            </h1>
            
            <div className="mt-12 md:mt-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
              <p className="font-serif italic text-3xl md:text-5xl text-slate-500 max-w-2xl leading-tight">
                las promociones se quedan en el aire.
              </p>
              
              <a 
                href="#contacto" 
                className="group flex items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-full bg-[#0A192F] text-white font-display uppercase tracking-widest text-sm hover:scale-105 transition-transform duration-500 ease-out shrink-0 shadow-xl shadow-[#0A192F]/20"
              >
                <span className="flex items-center gap-2">
                  Estudiar
                  <ArrowUpRight className="w-5 h-5 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </span>
              </a>
            </div>
          </motion.div>
        </section>

        {/* Problem Section (Visible Grid) */}
        <section className="py-24 md:py-40 px-6 md:px-12 border-t border-[#0A192F]/10">
          <div className="max-w-[1400px] mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-5xl md:text-7xl uppercase tracking-tight mb-16 md:mb-24 text-[#0A192F]"
            >
              El problema <span className="text-[#1E3A8A]">.</span>
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#0A192F]/10 border border-[#0A192F]/10">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: 0.04 }}
                className="bg-white p-10 md:p-16 flex flex-col justify-between group"
              >
                <h3 className="font-display text-4xl text-slate-200 mb-12 group-hover:text-[#0A192F] transition-colors duration-500">01</h3>
                <p className="text-slate-600 text-xl md:text-2xl leading-relaxed">El banco tarda más de lo que permite la operación.</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: 0.12 }}
                className="bg-white p-10 md:p-16 flex flex-col justify-between group"
              >
                <h3 className="font-display text-4xl text-slate-200 mb-12 group-hover:text-[#0A192F] transition-colors duration-500">02</h3>
                <p className="text-slate-600 text-xl md:text-2xl leading-relaxed">El proyecto no encaja en sus criterios estándar.</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="bg-white p-10 md:p-16 flex flex-col justify-between group"
              >
                <h3 className="font-display text-4xl text-slate-200 mb-12 group-hover:text-[#0A192F] transition-colors duration-500">03</h3>
                <p className="text-slate-600 text-xl md:text-2xl leading-relaxed">La financiación aprobada no cubre todo lo necesario.</p>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-16 text-center"
            >
              <p className="font-serif text-3xl md:text-5xl text-slate-500 italic">
                El resultado: promociones viables que se pierden.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-24 md:py-40 px-6 md:px-12 bg-[#0A192F] text-white">
          <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tight mb-8">
                Aquí entra <br/> <span className="text-white">AHI Promociones</span>
              </h2>
              <p className="text-xl md:text-2xl text-slate-300 leading-relaxed mb-12">
                Trabajamos con promotoras para estructurar la financiación de sus proyectos inmobiliarios. Nuestro objetivo es simple: <strong className="text-white font-normal">que las operaciones salgan adelante.</strong>
              </p>
              <div className="space-y-6">
                {[
                  "Complementar financiación bancaria.",
                  "Estructuras financieras flexibles.",
                  "Rapidez en la financiación."
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 border-b border-white/10 pb-6">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <p className="text-lg text-slate-200">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-[#0F2547] p-10 md:p-16 rounded-[2rem] border border-white/10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 blur-[100px] rounded-full" />
              <h3 className="font-display text-3xl uppercase mb-10">Por qué nosotros</h3>
              <div className="space-y-10 relative z-10">
                <div>
                  <h4 className="text-white font-display tracking-widest uppercase text-sm mb-2">Conocimiento</h4>
                  <p className="text-slate-300 text-lg">Entendemos cómo funciona una promoción y qué necesita un promotor. Hablamos tu idioma.</p>
                </div>
                <div>
                  <h4 className="text-white font-display tracking-widest uppercase text-sm mb-2">Experiencia</h4>
                  <p className="text-slate-300 text-lg">Analizamos cada proyecto al detalle para encontrar la solución más adecuada, sin fórmulas genéricas.</p>
                </div>
                <div>
                  <h4 className="text-white font-display tracking-widest uppercase text-sm mb-2">Red alternativa</h4>
                  <p className="text-slate-300 text-lg">Fuentes de financiación que permiten estructurar operaciones que no encajan en la banca.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Marquee Filter Section */}
        <section className="py-12 bg-[#0A192F] text-white overflow-hidden flex items-center border-t border-white/10">
          <div className="flex whitespace-nowrap animate-marquee">
            {/* Duplicate content for seamless loop */}
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-12 px-6 font-display uppercase text-3xl md:text-5xl font-bold tracking-tight">
                <span>Promociones entre 1M€ y 20M€</span>
                <span className="text-white/30">✦</span>
                <span>Proyectos residenciales</span>
                <span className="text-white/30">✦</span>
                <span>Con suelo o activo</span>
                <span className="text-white/30">✦</span>
                <span>Promotores con experiencia</span>
                <span className="text-white/30">✦</span>
              </div>
            ))}
          </div>
        </section>

        {/* Operations Section (Hover Rows) */}
        <section className="py-24 md:py-40 px-6 md:px-12 bg-white">
          <div className="max-w-[1400px] mx-auto">
            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tight mb-16 md:mb-24 text-[#0A192F]">
              Operaciones
            </h2>
            
            <div className="border-b border-[#0A192F]/10">
              {[
                { title: "Financiación de promociones", desc: "Estructuración de financiación para proyectos residenciales desde cero." },
                { title: "Complemento bancario", desc: "Operaciones donde la financiación bancaria no cubre toda la inversión necesaria." },
                { title: "Valor añadido", desc: "Proyectos con alto potencial que necesitan una estructura financiera a medida." },
                { title: "Fase de desarrollo", desc: "Promociones en marcha que requieren financiación extra para avanzar." }
              ].map((op, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: i * 0.06 }}
                  className="border-t border-[#0A192F]/10 group cursor-pointer relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[#0A192F]/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                  <div className="py-12 md:py-16 flex flex-col md:flex-row justify-between items-start md:items-center transition-all duration-500 md:group-hover:px-8 relative z-10">
                    <h3 className="font-display text-3xl md:text-5xl uppercase text-[#0A192F] transition-colors duration-300 md:w-1/2">{op.title}</h3>
                    <p className="text-slate-500 text-lg md:text-xl mt-6 md:mt-0 md:w-1/3 group-hover:text-[#0A192F] transition-colors duration-300">{op.desc}</p>
                    <div className="hidden md:flex w-12 h-12 rounded-full border border-[#0A192F]/20 items-center justify-center group-hover:bg-[#0A192F] group-hover:border-[#0A192F] group-hover:text-white text-[#0A192F] transition-all duration-300 shrink-0 ml-8">
                      <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-24 md:py-40 bg-white">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-16 md:mb-24">
            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tight text-[#0A192F]">
              Cómo trabajamos
            </h2>
          </div>
          
          <div className="flex flex-col">
            {[
              { num: "01", title: "Nos presentas la operación", desc: "Analizamos la información básica del proyecto y los números principales." },
              { num: "02", title: "Evaluamos la viabilidad", desc: "Estudiamos la estructura financiera actual y las posibles soluciones." },
              { num: "03", title: "Estructuramos la financiación", desc: "Buscamos y cerramos la fórmula que permita llevar la operación a término." }
            ].map((step, i) => (
              <div key={i} className="relative isolate border-t border-[#0A192F]/10 py-20 md:py-32 overflow-hidden group">
                <div className="absolute inset-0 bg-[#0A192F] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] z-0" />
                
                <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between">
                  <h3 className="font-display text-[20vw] md:text-[12vw] leading-none font-bold text-[#0A192F]/5 group-hover:text-white/10 transition-colors duration-700 absolute -top-10 md:-top-20 left-6 md:left-12 pointer-events-none select-none">
                    {step.num}
                  </h3>
                  
                  <div className="md:w-1/2 md:ml-auto mt-12 md:mt-0 relative z-10">
                    <h4 className="font-display text-4xl md:text-5xl uppercase mb-6 text-[#0A192F] group-hover:text-white transition-colors duration-700">{step.title}</h4>
                    <p className="text-slate-500 text-xl md:text-2xl group-hover:text-white/80 transition-colors duration-700 max-w-lg">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="border-t border-[#0A192F]/10" />
          </div>
        </section>

        {/* CTA & Form Section */}
        <section id="contacto" className="py-24 md:py-40 px-6 md:px-12 bg-[#F8FAFC] text-[#0A192F]">
          <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-20">
            <div>
              <h2 className="font-display text-6xl md:text-[7vw] uppercase tracking-tighter leading-[0.85] mb-12">
                Hablemos <br/> de tu <br/> <span className="text-[#1E3A8A]">proyecto.</span>
              </h2>
              <p className="text-2xl md:text-3xl text-slate-600 font-serif italic max-w-md">
                ¿Tienes una promoción que necesita financiación?
              </p>
              
              <div className="mt-20">
                <p className="font-display uppercase tracking-widest text-sm text-slate-400 mb-2">Contacto directo</p>
                <a href="mailto:estudio@ahipromociones.com" className="text-2xl font-medium hover:text-[#1E3A8A] transition-colors">
                  estudio@ahipromociones.com
                </a>
              </div>
            </div>
            
            <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="font-display text-3xl uppercase mb-10">Estudiar operación</h3>
              <form className="space-y-8" onSubmit={handleContactSubmit}>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="relative">
                    <input type="text" id="nombre" name="nombre" required className="w-full bg-transparent border-b border-slate-300 py-3 text-lg outline-none focus:border-[#0A192F] transition-colors peer placeholder-transparent" placeholder="Nombre" />
                    <label htmlFor="nombre" className="absolute left-0 top-3 text-slate-500 text-lg transition-all peer-focus:-top-5 peer-focus:text-xs peer-focus:text-[#0A192F] peer-[&:not(:placeholder-shown)]:-top-5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-[#0A192F] uppercase font-display tracking-wider">Nombre</label>
                  </div>
                  <div className="relative">
                    <input type="text" id="empresa" name="empresa" required className="w-full bg-transparent border-b border-slate-300 py-3 text-lg outline-none focus:border-[#0A192F] transition-colors peer placeholder-transparent" placeholder="Empresa" />
                    <label htmlFor="empresa" className="absolute left-0 top-3 text-slate-500 text-lg transition-all peer-focus:-top-5 peer-focus:text-xs peer-focus:text-[#0A192F] peer-[&:not(:placeholder-shown)]:-top-5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-[#0A192F] uppercase font-display tracking-wider">Empresa</label>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="relative">
                    <input type="email" id="email" name="email" required className="w-full bg-transparent border-b border-slate-300 py-3 text-lg outline-none focus:border-[#0A192F] transition-colors peer placeholder-transparent" placeholder="Email" />
                    <label htmlFor="email" className="absolute left-0 top-3 text-slate-500 text-lg transition-all peer-focus:-top-5 peer-focus:text-xs peer-focus:text-[#0A192F] peer-[&:not(:placeholder-shown)]:-top-5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-[#0A192F] uppercase font-display tracking-wider">Email</label>
                  </div>
                  <div className="relative">
                    <input type="tel" id="telefono" name="telefono" required className="w-full bg-transparent border-b border-slate-300 py-3 text-lg outline-none focus:border-[#0A192F] transition-colors peer placeholder-transparent" placeholder="Teléfono" />
                    <label htmlFor="telefono" className="absolute left-0 top-3 text-slate-500 text-lg transition-all peer-focus:-top-5 peer-focus:text-xs peer-focus:text-[#0A192F] peer-[&:not(:placeholder-shown)]:-top-5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-[#0A192F] uppercase font-display tracking-wider">Teléfono</label>
                  </div>
                </div>
                <div className="relative pt-4">
                  <textarea 
                    id="mensaje"
                    name="mensaje"
                    required
                    rows={4} 
                    className="w-full bg-transparent border-b border-slate-300 py-3 text-lg outline-none focus:border-[#0A192F] transition-colors peer placeholder-transparent resize-none" 
                    placeholder="Cuéntanos brevemente sobre la operación..."
                  ></textarea>
                  <label htmlFor="mensaje" className="absolute left-0 top-7 text-slate-500 text-lg transition-all peer-focus:-top-1 peer-focus:text-xs peer-focus:text-[#0A192F] peer-[&:not(:placeholder-shown)]:-top-1 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-[#0A192F] uppercase font-display tracking-wider">Sobre la operación</label>
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-[#0A192F] text-white py-6 text-lg font-display uppercase tracking-widest hover:bg-[#0F2547] disabled:opacity-60 disabled:cursor-not-allowed transition-colors mt-8 flex justify-center items-center gap-3 group">
                  {isSubmitting ? 'Enviando...' : 'Enviar información'}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </button>
                {submitMessage && (
                  <p className="text-sm text-emerald-700" role="status" aria-live="polite">
                    {submitMessage}
                  </p>
                )}
                {submitError && (
                  <p className="text-sm text-red-600" role="alert">
                    {submitError}
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0A192F] text-slate-400 py-12 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-display text-2xl font-bold tracking-widest uppercase text-white">
            AHI <span className="text-slate-400 font-medium">Promociones</span>
          </div>
          <p className="text-sm uppercase tracking-widest font-display">
            &copy; {new Date().getFullYear()} Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
