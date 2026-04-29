import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const questions = [
    {
      q: 'As capas são sob medida?',
      a: 'Sim. As capas são desenvolvidas por categoria e tipo de veículo, garantindo melhor caimento e acabamento para cada modelo.'
    },
    {
      q: 'A capa pode riscar a pintura?',
      a: 'Não. Os materiais são pensados especificamente para proteger a pintura, com toque macio e acabamento interno aveludado ou suave que evita atritos.'
    },
    {
      q: 'Como funciona o envio?',
      a: 'Enviamos para todo o Brasil via transportadora ou Correios. O rastreio é enviado automaticamente após a postagem para seu e-mail.'
    }
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-gold font-black uppercase tracking-[0.2em] text-xs mb-4 block">Dúvidas</span>
            <h2 className="text-4xl font-black text-white uppercase">Perguntas frequentes</h2>
            <p className="text-text-main/50 mt-2">O essencial, respondido de forma clara.</p>
          </div>

          <div className="space-y-4">
            {questions.map((item, i) => (
              <div 
                key={i} 
                className={`rounded-2xl border transition-all duration-300 ${
                  openIndex === i ? 'bg-white/5 border-gold/30 shadow-lg' : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  className="w-full px-8 py-6 flex items-center justify-between text-left"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <span className={`font-bold text-lg ${openIndex === i ? 'text-gold-2' : 'text-text-main'}`}>
                    {item.q}
                  </span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openIndex === i ? 'rotate-180 text-gold-2' : 'text-text-main/30'}`} />
                </button>
                
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-8 text-text-main/60 leading-relaxed">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
