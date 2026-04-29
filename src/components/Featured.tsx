import React from 'react';
import { motion } from 'framer-motion';

const Featured: React.FC = () => {
  return (
    <section className="py-24 overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <span className="text-gold font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">
              Linha Exclusive
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter leading-none">
              LINHA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-2">TRADICIONAL</span>
            </h2>
            <p className="text-text-main/50 text-base leading-relaxed mb-10 max-w-xl font-medium">
              A união perfeita entre proteção básica e durabilidade. Desenvolvida para quem busca o essencial com o selo de qualidade Pelé das Capas.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="btn-gold">Comprar Agora</button>
              <button className="btn-ghost">Especificações</button>
            </div>
          </motion.div>

          {/* Featured Image/Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative"
          >
            <div className="aspect-video bg-white/[0.02] border border-white/10 flex items-center justify-center relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center text-white/[0.03] font-black text-[12rem] select-none">
                PELÉ
              </div>
              <div className="w-2/3 h-2/3 bg-white/[0.05] border border-white/10 shadow-2xl relative z-10 flex flex-col items-center justify-center p-8 text-center">
                 <div className="text-[10px] font-black text-gold uppercase tracking-[0.3em] mb-4">Material Premium</div>
                 <div className="text-2xl font-black text-white uppercase tracking-tight">Polietileno Reforçado</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
