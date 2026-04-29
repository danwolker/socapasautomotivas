import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const Videos: React.FC = () => {
  const testimonials = [
    { id: 1, title: 'Depoimento #1', duration: '0:45' },
    { id: 2, title: 'Depoimento #2', duration: '1:12' },
    { id: 3, title: 'Depoimento #3', duration: '0:58' },
  ];

  return (
    <section className="py-24 bg-black/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between align-items-end gap-6 mb-12">
          <div>
            <span className="text-gold font-black uppercase tracking-[0.2em] text-xs mb-4 block">Prova social</span>
            <h2 className="text-4xl font-black text-white uppercase">O que nossos clientes dizem</h2>
            <p className="text-text-main/50 mt-2">Depoimentos em vídeo — reais, diretos e sem roteiro.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative aspect-[9/16] md:aspect-video rounded-[32px] overflow-hidden border border-white/10 bg-white/5 cursor-pointer shadow-premium"
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
              
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="w-16 h-16 rounded-full bg-gold text-[#131313] flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110">
                  <Play className="w-6 h-6 fill-current ml-1" />
                </div>
              </div>

              {/* Info */}
              <div className="absolute bottom-8 left-8 z-20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="px-2 py-1 rounded bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-black text-white">
                    {video.duration}
                  </div>
                </div>
                <h4 className="text-white font-black text-xl uppercase tracking-tight">{video.title}</h4>
              </div>

              {/* Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Videos;
