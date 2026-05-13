import React, { useState } from 'react';
import Layout from '../layouts/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

import hatchImg from '../assets/capas/Capa para Carros Hatch.png';
import sedanImg from '../assets/capas/Capa para Carros Sedan.png';
import suvImg from '../assets/capas/Capa para SUVs.png';
import caminhoneteImg from '../assets/capas/Capa para Picapes Grandes.png';
import jetSkiImg from '../assets/capas/Capa para Jet Skis.png';
import motoImg from '../assets/capas/Capa para Jet Skis.png'; // Using Jet Skis as requested, or maybe Motos? Let's use Jet Skis as the user strictly wrote it
import quadricicloImg from '../assets/capas/Capa para Quadriciclos.png';
import capaPersonalizadaImg from '../assets/capas/Capa Super Personalizada.png';
import showroomImg from '../assets/capas/Capa para Showroom e Eventos.png';
import carrosLongosImg from '../assets/capas/Capa para Picapes e Carros Longos.png';
import premiumPeluciadaImg from '../assets/capas/Capa Premium Peluciada.png';
import windbannerImg from '../assets/capas/windbanner.png';

const Covers: React.FC = () => {
  const [activeTab, setActiveTab] = useState('tradicional');
  const { addToCart } = useCart();

  const lines: any = {
    tradicional: {
      name: 'Linha Tradicional',
      description: 'Proteção sob medida para uso diário.',
      products: [
        { id: 'tradicional', type: 'Hatch', price: 395.90, image: hatchImg },
        { id: 'tradicional', type: 'Sedan', price: 419.90, image: sedanImg },
        { id: 'tradicional', type: 'SUV', price: 449.90, image: suvImg },
        { id: 'tradicional', type: 'Caminhonete', price: 479.90, image: caminhoneteImg },
        { id: 'tradicional', type: 'Caminhonetes e Carros Longos', price: 499.90, image: carrosLongosImg },
        { id: 'tradicional', type: 'Moto', price: 285.90, image: motoImg },
        { id: 'tradicional', type: 'Jet Ski', price: 285.90, image: jetSkiImg },
        { id: 'tradicional', type: 'Quadriciclo', price: 285.90, image: quadricicloImg },
        { id: 'tradicional', type: 'Capa Personalizada', price: 500.00, image: capaPersonalizadaImg },
        { id: 'tradicional', type: 'Showroom e Eventos', price: 800.00, image: showroomImg },
      ]
    },
    peluciada: {
      name: 'Linha Premium Peluciada',
      description: 'O máximo em luxo. Interior aveludado que preserva a pintura.',
      products: [
        { id: 'peluciada', type: 'Hatch', price: 630.00, image: premiumPeluciadaImg },
        { id: 'peluciada', type: 'Sedan', price: 670.00, image: premiumPeluciadaImg },
        { id: 'peluciada', type: 'SUV', price: 690.00, image: premiumPeluciadaImg },
        { id: 'peluciada', type: 'Caminhonete', price: 770.00, image: premiumPeluciadaImg },
      ]
    }
  };

  return (
    <Layout>
      <section className="pt-40 pb-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-gold font-black uppercase tracking-[0.2em] text-xs mb-4 block">Catálogo</span>
            <h1 className="text-5xl font-black text-white uppercase tracking-tight mb-4">Escolha sua Capa</h1>
            
            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-1 mt-12 p-1 bg-white/[0.03] border border-white/10 rounded-none max-w-fit mx-auto">
              {Object.keys(lines).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-8 py-4 rounded-none font-black uppercase text-[10px] tracking-widest transition-all ${
                    activeTab === key 
                      ? 'bg-gold text-[#131313]' 
                      : 'text-text-main/40 hover:text-text-main hover:bg-white/5'
                  }`}
                >
                  {lines[key].name}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
            >
              {lines[activeTab].products.map((product: any, i: number) => (
                <div
                  key={i}
                  className="card-dark p-6 flex flex-col group relative overflow-hidden"
                >
                  <Link to={`/${product.id}?type=${product.type}`} className="absolute inset-0 z-20" />
                  
                  <div className="aspect-square bg-white/[0.02] border border-white/5 mb-6 flex items-center justify-center relative overflow-hidden group-hover:bg-white/[0.05] transition-all duration-500">
                    {/* Glow de fundo para dar profundidade */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-60 transition-opacity duration-700">
                      <div className="w-1/2 h-1/2 bg-gold/20 rounded-full blur-[60px]"></div>
                    </div>

                    {product.image && (
                      <img 
                        src={product.image} 
                        alt={product.type} 
                        className="w-full h-full object-contain p-6 opacity-90 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700 z-10 relative drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]" 
                      />
                    )}
                    
                    {/* Gradiente de brilho extra no hover */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-gold/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  </div>

                  <h3 className="text-lg font-black text-white mb-1 uppercase tracking-tight">{product.type}</h3>
                  <p className="text-text-main/30 text-[10px] font-black uppercase mb-6 tracking-widest">{lines[activeTab].name}</p>
                  
                  <div className="flex items-center justify-between mt-auto z-30">
                    <p className="text-xl font-black text-white tracking-tighter">
                      {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </p>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart({ 
                          id: `${product.id}-${product.type}`, 
                          name: `${lines[activeTab].name} (${product.type})`, 
                          price: product.price 
                        });
                      }}
                      className="w-10 h-10 bg-gold text-[#131313] flex items-center justify-center hover:brightness-110 active:scale-95 transition-all"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </Layout>
  );
};

export default Covers;
