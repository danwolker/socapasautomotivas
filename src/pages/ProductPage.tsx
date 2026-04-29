import React from 'react';
import Layout from '../layouts/Layout';
import { motion } from 'framer-motion';
import { Shield, CloudRain, Sun, Wind, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useSearchParams } from 'react-router-dom';

interface ProductPageProps {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
  variations?: { type: string; price: number }[];
}

const ProductPage: React.FC<ProductPageProps> = ({ id, name, price, description, features, specs, variations }) => {
  const { addToCart } = useCart();
  const [searchParams] = useSearchParams();
  const preSelectedType = searchParams.get('type');

  const [selectedVar, setSelectedVar] = React.useState(
    variations?.find(v => v.type === preSelectedType) || (variations ? variations[0] : null)
  );

  // Update selectedVar if preSelectedType changes
  React.useEffect(() => {
    if (preSelectedType && variations) {
      const found = variations.find(v => v.type === preSelectedType);
      if (found) setSelectedVar(found);
    }
  }, [preSelectedType, variations]);

  const currentPrice = selectedVar ? selectedVar.price : price;

  return (
    <Layout>
      <section className="pt-40 pb-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Image Gallery Placeholder */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-1/2"
            >
              <div className="sticky top-32">
                <div className="aspect-square bg-white/[0.03] border border-white/10 flex items-center justify-center relative overflow-hidden shadow-2xl">
                  <div className="text-white/5 font-black text-9xl select-none uppercase -rotate-12">Pelé das Capas</div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-gold/5 to-transparent"></div>
                  
                  {/* Badge */}
                  <div className="absolute top-0 left-0 px-4 py-2 bg-gold text-[#131313] font-black text-[10px] uppercase tracking-widest shadow-xl">
                    Premium Quality
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="aspect-square bg-white/5 border border-white/10 hover:border-gold/30 transition-all cursor-pointer"></div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-1/2"
            >
              <span className="text-gold font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Proteção Automotiva</span>
              <h1 className="text-5xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">{name}</h1>
              
              <div className="flex items-center gap-6 mb-8 pt-6 border-t border-white/5">
                <div className="text-4xl font-black text-white tracking-tighter">
                  {currentPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </div>
                <div className="px-3 py-1 bg-white/5 border border-white/10 text-white/40 text-[10px] font-black uppercase tracking-widest">
                  Em Estoque
                </div>
              </div>

              {variations && (
                <div className="mb-10">
                  <h3 className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-4">Selecione seu Veículo</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                    {variations.map((v) => (
                      <button
                        key={v.type}
                        onClick={() => setSelectedVar(v)}
                        className={`px-4 py-3 border text-[10px] font-black uppercase tracking-widest transition-all ${
                          selectedVar?.type === v.type 
                            ? 'bg-gold text-[#131313] border-gold' 
                            : 'bg-white/5 border-white/10 text-white/40 hover:border-white/30'
                        }`}
                      >
                        {v.type}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-text-main/50 text-base leading-relaxed mb-10 font-medium">
                {description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-12">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-white/[0.02] border border-white/5">
                    <div className="w-6 h-6 bg-gold/10 flex items-center justify-center">
                      <Check className="w-3 h-3 text-gold" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-text-main/80">{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => addToCart({ 
                  id: `${id}-${selectedVar?.type || 'default'}`, 
                  name: `${name} (${selectedVar?.type || 'Padrão'})`, 
                  price: currentPrice 
                })}
                className="w-full btn-gold py-6 text-base tracking-[0.2em]"
              >
                ADICIONAR AO CARRINHO
              </button>

              {/* Specs */}
              <div className="space-y-4 pt-12 border-t border-white/10">
                <h3 className="font-black text-white uppercase tracking-widest text-sm mb-6">Especificações Técnicas</h3>
                {specs.map((spec, i) => (
                  <div key={i} className="flex justify-between py-3 border-b border-white/5">
                    <span className="text-text-main/40 font-bold uppercase text-xs tracking-wider">{spec.label}</span>
                    <span className="text-text-main font-bold">{spec.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Comparison or Detail Grid */}
      <section className="py-24 bg-black/10 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
            {[
              { icon: Shield, label: 'Resistente', desc: 'Proteção contra riscos' },
              { icon: CloudRain, label: 'Impermeável', desc: '100% contra chuva' },
              { icon: Sun, label: 'Proteção UV', desc: 'Evita queimaduras' },
              { icon: Wind, label: 'Respirável', desc: 'Evita mofo e umidade' },
            ].map((item, i) => (
              <div key={i} className="space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto text-gold">
                  <item.icon className="w-8 h-8" />
                </div>
                <h4 className="font-black text-white uppercase tracking-widest text-sm">{item.label}</h4>
                <p className="text-text-main/40 text-xs font-bold uppercase">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductPage;
