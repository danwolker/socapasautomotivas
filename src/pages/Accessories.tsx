import React from 'react';
import Layout from '../layouts/Layout';
import { motion } from 'framer-motion';
import { ShoppingCart, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

import windbannerImg from '../assets/capas/windbanner.png';

const Accessories: React.FC = () => {
  const { addToCart } = useCart();

  const products = [
    {
      id: 'windbanner-medio',
      name: 'Windbanner Médio (2,10m)',
      price: 179.90,
      desc: 'Tamanho 2,10 x 0,70m. Ideal para calçadas e entradas de lojas.',
      image: windbannerImg
    },
    {
      id: 'windbanner-grande',
      name: 'Windbanner Grande (2,60m)',
      price: 209.90,
      desc: 'Tamanho 2,60 x 0,70m. Maior visibilidade para sua marca.',
      image: windbannerImg
    },
    {
      id: 'windbanner-gigante',
      name: 'Windbanner Gigante (3,00m)',
      price: 239.90,
      desc: 'Tamanho 3,00 x 0,70m. Destaque total para eventos e pátios.',
      image: windbannerImg
    },
    {
      id: 'windbanner-kit-3',
      name: 'Kit 3 Windbanners (5% OFF)',
      price: 512.71,
      desc: 'Leve 3 unidades do tamanho médio com desconto especial.',
      image: windbannerImg
    },
    {
      id: 'windbanner-kit-5',
      name: 'Kit 5 Windbanners (10% OFF)',
      price: 809.55,
      desc: 'Leve 5 unidades do tamanho médio com 10% de desconto.',
      image: windbannerImg
    },
    {
      id: 'windbanner-kit-10',
      name: 'Kit 10 Windbanners (15% OFF)',
      price: 1529.15,
      desc: 'A melhor oferta! 10 unidades com 15% de desconto real.',
      image: windbannerImg
    },
  ];

  return (
    <Layout>
      <section className="pt-40 pb-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-gold font-black uppercase tracking-[0.2em] text-xs mb-4 block">Linha de Cuidado</span>
            <h1 className="text-5xl font-black text-white uppercase tracking-tight mb-4">Acessórios</h1>
            <p className="text-text-main/50 max-w-2xl mx-auto">
              Complementos essenciais para maximizar a durabilidade e segurança da sua capa automotiva.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="card-dark p-6 flex flex-col group relative overflow-hidden"
              >
                <Link to={product.id.startsWith('windbanner') ? '/acessorios/windbanner' : `/accessories/${product.id}`} className="absolute inset-0 z-20" />
                
                <div className="aspect-square bg-white/[0.02] border border-white/5 mb-6 flex items-center justify-center relative overflow-hidden group-hover:bg-white/[0.05] transition-all duration-500">
                    {/* Glow de fundo */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-60 transition-opacity duration-700">
                      <div className="w-1/2 h-1/2 bg-gold/20 rounded-full blur-[60px]"></div>
                    </div>

                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-contain p-6 opacity-90 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700 z-10 relative drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]" 
                      />
                    ) : (
                      <Package className="w-12 h-12 text-white/10 group-hover:text-gold/20 transition-colors z-10" />
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-tr from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                <h3 className="text-lg font-black text-white mb-2 uppercase tracking-tight">{product.name}</h3>
                <p className="text-text-main/50 text-xs mb-6 flex-grow leading-relaxed">{product.desc}</p>
                
                <div className="flex items-center justify-between mt-auto z-30">
                  <p className="text-xl font-black text-white">
                    {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </p>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart({ id: product.id, name: product.name, price: product.price });
                    }}
                    className="w-10 h-10 rounded-xl bg-gold text-[#131313] flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Accessories;
