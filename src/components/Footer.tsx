import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/20 border-t border-white/10 pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & Mission */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-white/15 to-white/5 border border-white/15 flex items-center justify-center">
                 <div className="w-3 h-3 rounded-full bg-gold"></div>
              </div>
              <span className="text-xl font-black text-white">Pelé das Capas</span>
            </Link>
            <p className="text-text-main/60 leading-relaxed max-w-xs">
              Especialistas em proteção automotiva premium. Qualidade, estilo e durabilidade para o seu veículo.
            </p>
            <div className="flex items-center gap-4">
              {/* Social icons will be added here */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gold-2 font-black uppercase tracking-widest text-xs mb-8">Navegação</h4>
            <ul className="space-y-4">
              {['Home', 'Capa Tradicional', 'Capa Premium 300', 'Capa Premium Peluciada', 'Acessórios'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-text-main/70 hover:text-gold transition-colors font-medium">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gold-2 font-black uppercase tracking-widest text-xs mb-8">Contato</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <p className="text-xs text-text-main/40 uppercase font-black mb-1">Telefone</p>
                  <p className="text-text-main/80 font-bold">(11) 99999-9999</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <p className="text-xs text-text-main/40 uppercase font-black mb-1">Email</p>
                  <p className="text-text-main/80 font-bold">contato@peledascapas.com.br</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-gold-2 font-black uppercase tracking-widest text-xs mb-8">Newsletter</h4>
            <p className="text-text-main/60 text-sm mb-6">Receba ofertas exclusivas e novidades.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Seu e-mail" 
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold/50 flex-1"
              />
              <button className="w-12 h-12 rounded-xl bg-gold text-[#131313] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform">
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-text-main/30 text-xs font-bold uppercase tracking-widest">
            © 2024 Pelé das Capas. Todos os direitos reservados.
          </p>
          <div className="flex gap-8">
            <Link to="/termos" className="text-text-main/30 hover:text-text-main text-[10px] font-black uppercase tracking-tighter transition-colors">Termos de Uso</Link>
            <Link to="/privacidade" className="text-text-main/30 hover:text-text-main text-[10px] font-black uppercase tracking-tighter transition-colors">Privacidade</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
