import React from 'react';
import { ShieldCheck, Truck, CreditCard, Headphones } from 'lucide-react';

const TrustStrip: React.FC = () => {
  const items = [
    { icon: ShieldCheck, title: 'Qualidade Premium', desc: 'Materiais selecionados' },
    { icon: Truck, title: 'Entrega Rápida', desc: 'Envio para todo Brasil' },
    { icon: CreditCard, title: 'Pagamento Seguro', desc: 'Até 12x no cartão' },
    { icon: Headphones, title: 'Suporte Especializado', desc: 'Tire suas dúvidas' },
  ];

  return (
    <section className="py-8 bg-black/10 border-y border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-gold/20 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <item.icon className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h3 className="font-bold text-text-main group-hover:text-gold-2 transition-colors">{item.title}</h3>
                <p className="text-xs text-text-main/50 font-medium uppercase tracking-wider">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
