import React, { useState, useEffect } from 'react';
import Layout from '../layouts/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../services/api';

// Imports de imagens para mapeamento
import hatchImg from '../assets/capas/Capa para Carros Hatch.png';
import sedanImg from '../assets/capas/Capa para Carros Sedan.png';
import suvImg from '../assets/capas/Capa para SUVs.png';
import caminhoneteImg from '../assets/capas/Capa para Picapes Grandes.png';
import jetSkiImg from '../assets/capas/Capa para Jet Skis.png';
import motoImg from '../assets/capas/Capa para Motos.png'; 
import quadricicloImg from '../assets/capas/Capa para Quadriciclos.png';
import capaPersonalizadaImg from '../assets/capas/Capa Super Personalizada.png';
import showroomImg from '../assets/capas/Capa para Showroom e Eventos.png';
import carrosLongosImg from '../assets/capas/Capa para Picapes e Carros Longos.png';
import premiumPeluciadaImg from '../assets/capas/Capa Premium Peluciada.png';

const imageMap: Record<string, string> = {
  'Hatch': hatchImg,
  'Sedan': sedanImg,
  'SUV': suvImg,
  'Caminhonete': caminhoneteImg,
  'Caminhonetes e Carros Longos': carrosLongosImg,
  'Moto': motoImg,
  'Jet Ski': jetSkiImg,
  'Quadriciclo': quadricicloImg,
  'Capa Personalizada': capaPersonalizadaImg,
  'Showroom e Eventos': showroomImg,
  'default': premiumPeluciadaImg
};

const Covers: React.FC = () => {
  const [activeTab, setActiveTab] = useState('');
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const products = await fetchProducts();
      
      // Agrupa produtos por categoria
      const grouped: any = {};
      products.forEach((p: any) => {
        // Ignorar acessórios na página de Capas
        if (p.category_slug === 'acessorios') return;

        const catSlug = p.category_slug || 'outros';
        
        if (!grouped[catSlug]) {
          grouped[catSlug] = {
            name: p.category,
            products: []
          };
        }
        
        // Mapeia variações
        p.variations.forEach((v: any) => {
           grouped[catSlug].products.push({
             id: p.slug,
             variation_id: v.id,
             type: v.variation_name,
             price: parseFloat(v.price),
             image: imageMap[v.variation_name] || imageMap['default']
           });
        });
      });

      setData(grouped);
      const keys = Object.keys(grouped);
      if (keys.length > 0) setActiveTab(keys[0]);
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-12 h-12 text-gold animate-spin" />
        </div>
      </Layout>
    );
  }

  const tabs = Object.keys(data);

  return (
    <Layout>
      <section className="pt-40 pb-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-gold font-black uppercase tracking-[0.2em] text-xs mb-4 block">Catálogo</span>
            <h1 className="text-5xl font-black text-white uppercase tracking-tight mb-4">Escolha sua Capa</h1>
            
            {/* Tabs Dinâmicas */}
            <div className="flex flex-wrap justify-center gap-1 mt-12 p-1 bg-white/[0.03] border border-white/10 rounded-none max-w-fit mx-auto">
              {tabs.map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-8 py-4 rounded-none font-black uppercase text-[10px] tracking-widest transition-all ${
                    activeTab === key 
                      ? 'bg-gold text-[#131313]' 
                      : 'text-text-main/40 hover:text-text-main hover:bg-white/5'
                  }`}
                >
                  {data[key].name}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab && (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
              >
                {data[activeTab].products.map((product: any, i: number) => (
                  <div
                    key={i}
                    className="card-dark p-6 flex flex-col group relative overflow-hidden"
                  >
                    <Link to={`/produto/${product.id}?type=${product.type}`} className="absolute inset-0 z-20" />
                    
                    <div className="aspect-square bg-white/[0.02] border border-white/5 mb-6 flex items-center justify-center relative overflow-hidden group-hover:bg-white/[0.05] transition-all duration-500">
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
                    </div>

                    <h3 className="text-lg font-black text-white mb-1 uppercase tracking-tight">{product.type}</h3>
                    <p className="text-text-main/30 text-[10px] font-black uppercase mb-6 tracking-widest">{data[activeTab].name}</p>
                    
                    <div className="flex items-center justify-between mt-auto z-30">
                      <p className="text-xl font-black text-white tracking-tighter">
                        {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </p>
                      <Link 
                        to={`/produto/${product.id}?type=${product.type}`}
                        className="w-10 h-10 bg-gold text-[#131313] flex items-center justify-center hover:brightness-110 active:scale-95 transition-all"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </Layout>
  );
};

export default Covers;

