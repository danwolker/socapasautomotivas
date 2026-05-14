import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, ChevronRight, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { fetchProducts } from '../services/api';

import hatchImg from '../assets/capas/Capa para Carros Hatch.png';
import suvImg from '../assets/capas/Capa para SUVs.png';
import premiumPeluciadaImg from '../assets/capas/Capa Premium Peluciada.png';
import windbannerImg from '../assets/capas/windbanner.png';

const Bestsellers: React.FC = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchProducts();
      
      // Pega até 3 produtos para os destaques
      const highlights: any[] = [];
      const images = [hatchImg, premiumPeluciadaImg, suvImg, windbannerImg];
      
      data.slice(0, 3).forEach((p: any, index: number) => {
        // Encontra o menor preço dentre as variações
        let basePrice = 0;
        let baseVarName = '';
        let baseVarId = null;
        if (p.variations && p.variations.length > 0) {
           basePrice = parseFloat(p.variations[0].price);
           baseVarName = p.variations[0].variation_name;
           baseVarId = p.variations[0].id;
        }

        highlights.push({
          id: `${p.slug}-${baseVarName}`,
          variation_id: baseVarId,
          productId: p.slug,
          name: p.name,
          price: basePrice,
          badge: index === 0 ? 'Custo Benefício' : (index === 1 ? 'Top de Linha' : 'Mais Vendido'),
          desc: p.description || 'Proteção sob medida para o seu veículo.',
          image: images[index] || premiumPeluciadaImg,
          type: baseVarName
        });
      });

      setProducts(highlights);
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <section className="py-24 border-t border-white/5 flex justify-center items-center">
        <Loader2 className="w-10 h-10 text-gold animate-spin" />
      </section>
    );
  }

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
              className="card-dark p-8 flex flex-col group relative"
            >
              <Link to={`/produto/${product.productId}?type=${product.type}`} className="absolute inset-0 z-20" />
              
              <div className="flex justify-between items-start mb-8 relative z-30">
                <span className="px-3 py-1 bg-white/5 border border-white/10 text-[10px] font-black text-white/40 uppercase tracking-widest">
                  {product.badge}
                </span>
                <Star className="w-4 h-4 text-gold fill-gold" />
              </div>
              
              <div className="aspect-square bg-white/[0.02] border border-white/5 mb-8 flex items-center justify-center relative overflow-hidden group-hover:bg-white/[0.04] transition-colors">
                <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity">
                  <div className="w-1/2 h-1/2 bg-gold/20 rounded-full blur-[60px]"></div>
                </div>

                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-contain p-6 relative z-10 drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform duration-700"
                />
                
                <div className="absolute inset-0 bg-gradient-to-tr from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>

              <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tight relative z-30">{product.name}</h3>
              <p className="text-text-main/50 text-[10px] uppercase font-black mb-10 flex-grow leading-relaxed relative z-30">{product.desc}</p>
              
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5 relative z-30">
                <div>
                  <p className="text-[10px] font-black text-text-main/30 uppercase tracking-widest mb-1">A partir de</p>
                  <p className="text-2xl font-black text-white tracking-tighter">
                    {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </p>
                </div>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart({ 
                      id: `best-${product.variation_id}`,
                      variation_id: product.variation_id,
                      name: `${product.name} - ${product.type}`, 
                      price: product.price,
                      image: product.image,
                    });
                  }}
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
