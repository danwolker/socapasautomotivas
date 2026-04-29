import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems, totalPrice } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Capas', path: '/capas' },
    { name: 'Acessórios', path: '/acessorios' },
  ];

  return (
    <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      scrolled ? 'bg-bg-0/80 backdrop-blur-xl border-b border-white/10 py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-white/15 to-white/5 border border-white/15 shadow-2xl flex items-center justify-center transition-transform group-hover:scale-105">
               <div className="w-5 h-5 bg-gold blur-[8px] opacity-40 absolute"></div>
               <div className="w-3 h-3 bg-gold relative z-10"></div>
            </div>
            <span className="text-xl font-black tracking-tight text-white uppercase">Pelé das Capas</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 text-xs font-black uppercase tracking-widest transition-all hover:text-gold-2 relative ${
                  location.pathname === link.path ? 'text-gold-2' : 'text-text-main/50'
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gold" />
                )}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link 
              to="/cart" 
              className="flex items-center gap-3 px-4 py-2 rounded-none border border-white/10 hover:border-gold/30 hover:bg-white/5 transition-all group relative"
            >
              <span className="font-black text-xs hidden sm:inline tracking-tighter">
                {totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
              <ShoppingCart className="w-4 h-4 text-text-main group-hover:text-gold-2 transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-gold text-[#131313] text-[10px] font-black flex items-center justify-center shadow-lg border border-bg-0">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden p-2.5 rounded-none bg-white/5 border border-white/10"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="lg:hidden mt-4 p-4 bg-bg-1 border border-white/10 shadow-2xl flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-5 py-4 font-black uppercase text-xs tracking-widest transition-all ${
                  location.pathname === link.path 
                    ? 'bg-gold text-[#131313]' 
                    : 'text-text-main/70 hover:bg-white/5'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
