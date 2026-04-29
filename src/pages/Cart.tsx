import React from 'react';
import Layout from '../layouts/Layout';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  return (
    <Layout>
      <section className="pt-40 pb-24 min-h-[70vh]">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-black text-white mb-12 uppercase tracking-tight">Seu Carrinho</h1>

          {cart.length === 0 ? (
            <div className="text-center py-20 bg-white/[0.02] border border-white/10 rounded-[40px]">
              <ShoppingBag className="w-16 h-16 text-white/10 mx-auto mb-6" />
              <p className="text-text-main/40 font-bold uppercase tracking-widest mb-8">O carrinho está vazio</p>
              <Link to="/" className="btn-gold px-12 inline-block">
                VOLTAR ÀS COMPRAS
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Items List */}
              <div className="lg:w-2/3 space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-6 p-6 rounded-3xl bg-white/[0.03] border border-white/10 group hover:border-gold/30 transition-all">
                    <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <div className="text-white/5 font-black text-xs uppercase -rotate-12">Pelé das Capas</div>
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="text-white font-black text-lg uppercase tracking-tight mb-1">{item.name}</h3>
                      <p className="text-gold-2 font-bold">
                        {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 bg-black/20 rounded-xl p-1 border border-white/5">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-black text-white">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="p-3 rounded-xl text-red-400/50 hover:text-red-400 hover:bg-red-400/10 transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="lg:w-1/3">
                <div className="p-8 rounded-[40px] bg-white/[0.03] border border-white/10 sticky top-32">
                  <h2 className="text-xl font-black text-white uppercase tracking-widest mb-8">Resumo</h2>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between">
                      <span className="text-text-main/40 font-bold uppercase text-xs">Subtotal</span>
                      <span className="text-white font-bold">
                        {totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-main/40 font-bold uppercase text-xs">Frete</span>
                      <span className="text-green-400 font-bold uppercase text-xs">Grátis</span>
                    </div>
                    <div className="h-px bg-white/10 my-4"></div>
                    <div className="flex justify-between items-end">
                      <span className="text-text-main/40 font-black uppercase text-xs">Total</span>
                      <span className="text-3xl font-black text-white">
                        {totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </span>
                    </div>
                  </div>

                  <button className="w-full btn-gold py-5 shadow-2xl">
                    FINALIZAR PEDIDO
                  </button>
                  
                  <p className="text-center text-[10px] text-text-main/20 font-black uppercase tracking-widest mt-6">
                    Pagamento 100% Seguro
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Cart;
