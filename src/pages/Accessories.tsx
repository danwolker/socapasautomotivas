import React, { useState, useEffect } from 'react';
import Layout from '../layouts/Layout';
import { motion } from 'framer-motion';
import { ShoppingCart, Package, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../services/api';

import windbannerImg from '../assets/capas/windbanner.png';

const imageMap: Record<string, string> = {
  'Windbanner': windbannerImg,
  'default': windbannerImg
};

const Accessories: React.FC = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchProducts();
      
      const accessories: any[] = [];
      data.forEach((p: any) => {
        if (p.category_slug === 'acessorios') {
          p.variations.forEach((v: any) => {
            accessories.push({
              id: `${p.slug}-${v.variation_name}`,
              variation_id: v.id,
              productId: p.slug,
              name: `${p.name} - ${v.variation_name}`,
              price: parseFloat(v.price),
              desc: p.description || 'Acessório original Pelé das Capas.',
              image: imageMap[v.variation_name] || imageMap['default'],
              type: v.variation_name
            });
          });
        }
      });
      
      setProducts(accessories);
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
                <Link to={`/produto/${product.productId}?type=${product.type}`} className="absolute inset-0 z-20" />
                
                <div className="aspect-square bg-white/[0.02] border border-white/5 mb-6 flex items-center justify-center relative overflow-hidden group-hover:bg-white/[0.05] transition-all duration-500">
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
                <p className="text-text-main/50 text-[10px] uppercase font-black mb-6 flex-grow">{product.desc}</p>
                
                <div className="flex items-center justify-between mt-auto z-30">
                  <p className="text-xl font-black text-white">
                    {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </p>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart({ 
                        id: `acc-${product.variation_id}`,
                        variation_id: product.variation_id,
                        name: product.name, 
                        price: product.price,
                        image: product.image,
                      });
                    }}
                    className="w-10 h-10 bg-gold text-[#131313] flex items-center justify-center hover:brightness-110 active:scale-95 transition-all shadow-lg"
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
