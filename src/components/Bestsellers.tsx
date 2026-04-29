import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Bestsellers: React.FC = () => {
  const { addToCart } = useCart();

  const products = [
    {
      id: 'tradicional',
      name: 'Capa Tradicional',
      price: 395.90,
      badge: 'Custo Benefício',
      desc: 'Proteção sob medida para uso diário.',
    },
    {
      id: 'premium300',
      name: 'Capa Premium 300',
      price: 630.00,
      badge: 'Mais Vendido',
      desc: 'Robustez e ventilação estruturada.',
    },
    {
      id: 'peluciada',
      name: 'Capa Premium Peluciada',
      price: 630.00,
      badge: 'Top de Linha',
      desc: 'Interior aveludado para máxima proteção.',
    },
  ];

  return (
    <section className="py-24 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between align-items-end gap-6 mb-12">
          <div>
            <span className="text-gold font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Destaques</span>
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter">As Melhores Linhas</h2>
            <p className="text-text-main/50 mt-2 font-medium">Qualidade técnica superior para cada necessidade.</p>
          </div>
          <Link to="/capas" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/40 hover:text-gold transition-colors group">
            Ver catálogo completo
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="card-dark p-8 flex flex-col group"
            >
              <div className="flex justify-between items-start mb-8">
                <span className="px-3 py-1 bg-white/5 border border-white/10 text-[10px] font-black text-white/40 uppercase tracking-widest">
                  {product.badge}
                </span>
                <Star className="w-4 h-4 text-gold fill-gold" />
              </div>
              
              <div className="aspect-video bg-white/[0.02] border border-white/5 mb-8 flex items-center justify-center relative overflow-hidden group-hover:bg-white/[0.04] transition-colors">
                <div className="text-white/[0.03] font-black text-4xl select-none uppercase tracking-tighter">
                  Pelé das Capas
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>

              <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tight">{product.name}</h3>
              <p className="text-text-main/50 text-sm mb-10 flex-grow font-medium leading-relaxed">{product.desc}</p>
              
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                <div>
                  <p className="text-[10px] font-black text-text-main/30 uppercase tracking-widest mb-1">Preço</p>
                  <p className="text-2xl font-black text-white tracking-tighter">
                    {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </p>
                </div>
                <button 
                  onClick={() => addToCart({ id: product.id, name: product.name, price: product.price })}
                  className="w-12 h-12 bg-gold text-[#131313] flex items-center justify-center hover:brightness-110 active:scale-95 transition-all shadow-lg"
                >
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Bestsellers;
