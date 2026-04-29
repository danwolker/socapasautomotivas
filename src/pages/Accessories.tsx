import React from 'react';
import Layout from '../layouts/Layout';
import { motion } from 'framer-motion';
import { ShoppingCart, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Accessories: React.FC = () => {
  const { addToCart } = useCart();

  const products = [
    {
      id: 'acc1',
      name: 'Cadeado de Segurança',
      price: 49.90,
      desc: 'Cabo de aço com revestimento e cadeado para fixação da capa.',
    },
    {
      id: 'acc2',
      name: 'Bolsa de Transporte',
      price: 35.00,
      desc: 'Bolsa reforçada para guardar sua capa com organização.',
    },
    {
      id: 'acc3',
      name: 'Kit de Limpeza Premium',
      price: 89.90,
      desc: 'Produtos específicos para manter sua capa sempre nova.',
    },
    {
      id: 'acc4',
      name: 'Cinta Anti-Vento',
      price: 29.90,
      desc: 'Fixação extra para regiões com ventos fortes.',
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
                <Link to={`/accessories/${product.id}`} className="absolute inset-0 z-10" />
                
                <div className="aspect-square rounded-2xl bg-white/5 border border-white/5 mb-6 flex items-center justify-center relative overflow-hidden group-hover:bg-white/10 transition-colors">
                   <Package className="w-12 h-12 text-white/10 group-hover:text-gold/20 transition-colors" />
                   <div className="absolute inset-0 bg-gradient-to-tr from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                <h3 className="text-lg font-black text-white mb-2 uppercase tracking-tight">{product.name}</h3>
                <p className="text-text-main/50 text-xs mb-6 flex-grow leading-relaxed">{product.desc}</p>
                
                <div className="flex items-center justify-between mt-auto z-20">
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
