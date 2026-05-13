import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Shield, Lock } from 'lucide-react';
import logoImg from '../assets/Pelé das capas Logo (1).svg';

// Payment icon SVG components (inline, no external dependency)
const VisaIcon = () => (
  <svg viewBox="0 0 48 32" className="h-7 w-auto" fill="none">
    <rect width="48" height="32" rx="4" fill="#1A1F71"/>
    <text x="6" y="22" fontFamily="Arial" fontWeight="bold" fontSize="14" fill="white">VISA</text>
  </svg>
);
const MastercardIcon = () => (
  <svg viewBox="0 0 48 32" className="h-7 w-auto" fill="none">
    <rect width="48" height="32" rx="4" fill="#252525"/>
    <circle cx="18" cy="16" r="9" fill="#EB001B"/>
    <circle cx="30" cy="16" r="9" fill="#F79E1B"/>
    <path d="M24 8.5a9 9 0 0 1 0 15A9 9 0 0 1 24 8.5z" fill="#FF5F00"/>
  </svg>
);
const EloIcon = () => (
  <svg viewBox="0 0 48 32" className="h-7 w-auto" fill="none">
    <rect width="48" height="32" rx="4" fill="#FFD100"/>
    <text x="6" y="22" fontFamily="Arial" fontWeight="bold" fontSize="13" fill="#00225A">elo</text>
  </svg>
);
const AmexIcon = () => (
  <svg viewBox="0 0 48 32" className="h-7 w-auto" fill="none">
    <rect width="48" height="32" rx="4" fill="#016FD0"/>
    <text x="4" y="22" fontFamily="Arial" fontWeight="bold" fontSize="9" fill="white">AMERICAN</text>
    <text x="4" y="28" fontFamily="Arial" fontWeight="bold" fontSize="9" fill="white">EXPRESS</text>
  </svg>
);
const PixIcon = () => (
  <svg viewBox="0 0 48 32" className="h-7 w-auto" fill="none">
    <rect width="48" height="32" rx="4" fill="#32BCAD"/>
    <text x="8" y="22" fontFamily="Arial" fontWeight="bold" fontSize="13" fill="white">PIX</text>
  </svg>
);
const BoletoIcon = () => (
  <svg viewBox="0 0 48 32" className="h-7 w-auto" fill="none">
    <rect width="48" height="32" rx="4" fill="#222"/>
    <rect x="6" y="8" width="3" height="16" fill="white"/>
    <rect x="11" y="8" width="2" height="16" fill="white"/>
    <rect x="15" y="8" width="4" height="16" fill="white"/>
    <rect x="21" y="8" width="2" height="16" fill="white"/>
    <rect x="25" y="8" width="3" height="16" fill="white"/>
    <rect x="30" y="8" width="2" height="16" fill="white"/>
    <rect x="34" y="8" width="4" height="16" fill="white"/>
    <rect x="40" y="8" width="2" height="16" fill="white"/>
  </svg>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/30 border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Menu */}
          <div>
            <img src={logoImg} alt="Pelé das Capas" className="h-10 w-auto mb-8 opacity-80" />
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">Menu</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', to: '/' },
                { label: 'Capa Tradicional', to: '/tradicional' },
                { label: 'Capa Premium Peluciada', to: '/peluciada' },
                { label: 'Acessórios', to: '/acessorios' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="text-text-main/60 hover:text-gold transition-colors text-sm font-medium">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://wa.me/554899619030"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-main/60 hover:text-gold transition-colors text-sm font-medium flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-green-400" />
                  WhatsApp: +55 48 99619-1030
                </a>
              </li>
            </ul>
          </div>

          {/* Links Úteis */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">Links Úteis</h4>
            <ul className="space-y-3">
              {[
                { label: 'Políticas de Reembolso', to: '/privacidade' },
                { label: 'Políticas de Privacidade', to: '/privacidade' },
                { label: 'Prazo de Entrega', to: '/termos' },
                { label: 'Pagamento Seguro', to: '/termos' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="text-text-main/60 hover:text-gold transition-colors text-sm font-medium">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Formas de Pagamento */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">Formas de Pagamento</h4>
            <div className="grid grid-cols-3 gap-2">
              <MastercardIcon />
              <VisaIcon />
              <EloIcon />
              <AmexIcon />
              <PixIcon />
              <BoletoIcon />
            </div>
          </div>

          {/* Segurança */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">Prezamos pela Segurança</h4>
            <div className="space-y-3">
              {/* Site Blindado badge */}
              <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 hover:border-gold/20 transition-colors">
                <div className="w-10 h-10 bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-black text-xs uppercase tracking-widest">Site Blindado</p>
                  <p className="text-text-main/40 text-[10px]">Proteção Anti-Vírus</p>
                </div>
              </div>
              {/* SSL badge */}
              <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 hover:border-gold/20 transition-colors">
                <div className="w-10 h-10 bg-green-600/20 border border-green-500/30 flex items-center justify-center shrink-0">
                  <Lock className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-white font-black text-xs uppercase tracking-widest">SSL Seguro</p>
                  <p className="text-text-main/40 text-[10px]">Dados Criptografados</p>
                </div>
              </div>
              {/* Google badge */}
              <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 hover:border-gold/20 transition-colors">
                <div className="w-10 h-10 bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>
                <div>
                  <p className="text-white font-black text-xs uppercase tracking-widest">Google</p>
                  <p className="text-text-main/40 text-[10px]">Site Verificado</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-text-main/30 text-xs font-bold">
            © Sá Capas Automotivas com CNPJ: 48.546.990/0001-61 · Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <Link to="/termos" className="text-text-main/30 hover:text-text-main text-[10px] font-black uppercase tracking-tighter transition-colors">
              Termos de Uso
            </Link>
            <Link to="/privacidade" className="text-text-main/30 hover:text-text-main text-[10px] font-black uppercase tracking-tighter transition-colors">
              Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
