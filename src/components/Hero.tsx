import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Hero: React.FC = () => {
  const [index, setIndex] = useState(0);
  
  const slides = [
    {
      title: "Proteção que Preserva.",
      subtitle: "Especialistas em capas automotivas premium. Qualidade que você sente, segurança que você confia."
    },
    {
      title: "Design sob Medida.",
      subtitle: "Cada capa é desenvolvida especificamente para o seu modelo, garantindo o caimento perfeito."
    },
    {
      title: "Máxima Durabilidade.",
      subtitle: "Materiais de alta performance testados para resistir ao sol intenso e chuvas fortes."
    }
  ];

  const next = () => setIndex((prev) => (prev + 1) % slides.length);
  const prev = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
      {/* Navigation Arrows */}
      <div className="absolute inset-0 flex items-center justify-between px-4 md:px-12 pointer-events-none z-20">
        <button 
          onClick={prev}
          className="w-14 h-14 bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold/30 hover:bg-white/10 transition-all pointer-events-auto active:scale-90"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button 
          onClick={next}
          className="w-14 h-14 bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold/30 hover:bg-white/10 transition-all pointer-events-auto active:scale-90"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-[10px] font-black text-gold tracking-[0.6em] uppercase mb-12">
            Pelé das Capas
          </div>
          
          <div className="relative h-[250px] md:h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.6, ease: "circOut" }}
                className="absolute inset-0"
              >
                <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none uppercase">
                  {slides[index].title.split(" ").slice(0, -1).join(" ")} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
                    {slides[index].title.split(" ").slice(-1)}
                  </span>
                </h1>
                
                <p className="text-text-main/50 text-base md:text-lg mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                  {slides[index].subtitle}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <button className="btn-gold w-full sm:w-auto min-w-[240px]">
              Ver Catálogo
            </button>
            <button className="btn-ghost w-full sm:w-auto min-w-[240px]">
              Saiba Mais
            </button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-4 mt-16">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className="group py-4 px-2"
              >
                <div className={`h-1 transition-all duration-300 ${
                  index === i ? 'w-16 bg-gold' : 'w-8 bg-white/10 group-hover:bg-white/30'
                }`} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-gold/5 blur-[120px] -z-10 rounded-full"></div>
    </section>
  );
};

export default Hero;
