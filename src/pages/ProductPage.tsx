import React, { useState } from 'react';
import Layout from '../layouts/Layout';
import { motion } from 'framer-motion';
import { Check, Star, ChevronLeft, ChevronRight, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useSearchParams, Link } from 'react-router-dom';

// All product images for the highlights carousel
import hatchImg from '../assets/capas/Capa para Carros Hatch.png';
import sedanImg from '../assets/capas/Capa para Carros Sedan.png';
import suvImg from '../assets/capas/Capa para SUVs.png';
import caminhoneteImg from '../assets/capas/Capa para Picapes Grandes.png';
import jetSkiImg from '../assets/capas/Capa para Jet Skis.png';
import motoImg from '../assets/capas/Capa para Motos.png';
import quadricicloImg from '../assets/capas/Capa para Quadriciclos.png';
import capaPersonalizadaImg from '../assets/capas/Capa Super Personalizada.png';
import showroomImg from '../assets/capas/Capa para Showroom e Eventos.png';
import carrosLongosImg from '../assets/capas/Capa para Picapes e Carros Longos.png';
import premiumPeluciadaImg from '../assets/capas/Capa Premium Peluciada.png';

const HIGHLIGHTS = [
  { name: 'Capa para Carros Hatch', image: hatchImg, oldPrice: 449.90, price: 395.90, link: '/tradicional?type=Hatch' },
  { name: 'Capa para SUVs', image: suvImg, oldPrice: 499.90, price: 449.90, link: '/tradicional?type=SUV' },
  { name: 'Capa para Picapes e Carros Longos', image: carrosLongosImg, oldPrice: 550.00, price: 499.90, link: '/tradicional?type=Caminhonetes e Carros Longos' },
  { name: 'Capa para Picapes Grandes', image: caminhoneteImg, oldPrice: 550.00, price: 479.90, link: '/tradicional?type=Caminhonete' },
  { name: 'Capa para Carros Sedan', image: sedanImg, oldPrice: 469.90, price: 419.90, link: '/tradicional?type=Sedan' },
  { name: 'Capa Premium Peluciada', image: premiumPeluciadaImg, oldPrice: 750.00, price: 670.00, link: '/peluciada?type=Sedan' },
  { name: 'Capa para Jet Ski', image: jetSkiImg, oldPrice: 329.90, price: 285.90, link: '/tradicional?type=Jet Ski' },
];

const MOCK_REVIEWS = [
  { name: 'Clodomir Araújo', rating: 5, text: 'Capa Azul Royal para o veículo conversível MG Cyberster.', avatar: 'C' },
  { name: 'Maria Fernanda', rating: 5, text: 'Produto excelente! Encaixe perfeito no meu Hatch. Muito satisfeita.', avatar: 'M' },
  { name: 'Roberto S.', rating: 4, text: 'Boa qualidade, entrega rápida. Recomendo!', avatar: 'R' },
];

const CORES = [
  'Azul Royal', 'Preto', 'Prata', 'Cinza', 'Branco', 'Vermelho', 'Verde', 'Bege', 'Amarelo',
];

const StarRating: React.FC<{ rating: number; size?: string }> = ({ rating, size = 'w-4 h-4' }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star key={s} className={`${size} ${s <= rating ? 'text-gold fill-gold' : 'text-white/20'}`} />
    ))}
  </div>
);

interface ProductPageProps {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
  variations?: { type: string; price: number }[];
  image?: string;
}

const ProductPage: React.FC<ProductPageProps> = ({ id, name, price, description, features, specs, variations, image }) => {
  const { addToCart } = useCart();
  const [searchParams] = useSearchParams();
  const preSelectedType = searchParams.get('type');

  const [selectedVar, setSelectedVar] = useState(
    variations?.find(v => v.type === preSelectedType) || (variations ? variations[0] : null)
  );

  // Update image dynamically if it's a vehicle variation
  const getDynamicImage = () => {
    if (id === 'tradicional' && selectedVar) {
      switch (selectedVar.type) {
        case 'Hatch': return hatchImg;
        case 'Sedan': return sedanImg;
        case 'SUV': return suvImg;
        case 'Caminhonete': return caminhoneteImg;
        case 'Caminhonetes e Carros Longos': return carrosLongosImg;
        case 'Moto': return motoImg;
        case 'Jet Ski': return jetSkiImg;
        case 'Quadriciclo': return quadricicloImg;
        case 'Capa Personalizada': return capaPersonalizadaImg;
        case 'Showroom e Eventos': return showroomImg;
        default: return image;
      }
    }
    return image;
  };

  const currentImage = getDynamicImage();

  const [vehicleModel, setVehicleModel] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [highlightOffset, setHighlightOffset] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [showReviewForm, setShowReviewForm] = useState(false);

  React.useEffect(() => {
    if (preSelectedType && variations) {
      const found = variations.find(v => v.type === preSelectedType);
      if (found) setSelectedVar(found);
    }
  }, [preSelectedType, variations]);

  const currentPrice = selectedVar ? selectedVar.price : price;

  // Highlight carousel: show 4 at a time
  const visibleHighlights = HIGHLIGHTS.slice(highlightOffset, highlightOffset + 4);
  const canPrev = highlightOffset > 0;
  const canNext = highlightOffset + 4 < HIGHLIGHTS.length;

  // Ratings mock
  const avgRating = 5.0;
  const totalReviews = MOCK_REVIEWS.length;
  const ratingDist = [0, 0, 0, 0, totalReviews]; // all 5 stars

  return (
    <Layout>
      {/* ── HERO: Image + Info ── */}
      <section className="pt-40 pb-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16">

            {/* LEFT: Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-1/2"
            >
              <div className="sticky top-32">
                <div className="aspect-square bg-white/[0.02] border border-white/10 flex items-center justify-center relative overflow-hidden shadow-2xl">
                  {/* Glow */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2/3 h-2/3 bg-gold/10 rounded-full blur-[100px]"></div>
                  </div>
                  {currentImage ? (
                    <img
                      src={currentImage}
                      alt={name}
                      className="w-full h-full object-contain p-10 relative z-10 drop-shadow-[0_30px_50px_rgba(0,0,0,0.9)]"
                    />
                  ) : (
                    <div className="text-white/5 font-black text-9xl select-none uppercase -rotate-12">Pelé das Capas</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-tr from-gold/5 to-transparent pointer-events-none"></div>
                  <div className="absolute top-0 left-0 px-4 py-2 bg-gold text-[#131313] font-black text-[10px] uppercase tracking-widest shadow-xl">
                    Premium Quality
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT: Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-1/2 flex flex-col"
            >
              <span className="text-gold font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Proteção Automotiva</span>
              <h1 className="text-5xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">
                {name} <span className="text-gold">{selectedVar?.type}</span>
              </h1>

              {/* Price */}
              <div className="flex items-center gap-6 mb-8 pt-6 border-t border-white/5">
                <div className="text-4xl font-black text-white tracking-tighter">
                  {currentPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </div>
                <div className="px-3 py-1 bg-white/5 border border-white/10 text-white/40 text-[10px] font-black uppercase tracking-widest">
                  Em Estoque
                </div>
              </div>

              {/* Selected Type Display (Static) */}
              {selectedVar && (
                <div className="mb-8">
                  <h3 className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-4">Veículo Selecionado</h3>
                  <div className="inline-block px-6 py-3 bg-gold text-[#131313] font-black uppercase text-xs tracking-widest shadow-lg">
                    {selectedVar.type}
                  </div>
                </div>
              )}

              {/* Vehicle Model + Year (Only for Covers) */}
              {id !== 'windbanner' && (
                <div className="mb-6">
                  <label className="block text-gold text-sm font-bold mb-2">Modelo e Ano do Veículo</label>
                  <input
                    type="text"
                    value={vehicleModel}
                    onChange={(e) => setVehicleModel(e.target.value)}
                    placeholder="Digite Modelo e ano do veículo"
                    className="w-full bg-white/5 border border-white/15 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold/60 transition-colors"
                  />
                </div>
              )}

              {/* Color Picker (Only for Covers) */}
              {id !== 'windbanner' && (
                <div className="mb-8">
                  <label className="block text-gold text-sm font-bold mb-2">Escolha a cor da capa</label>
                  <div className="flex gap-3 items-center">
                    <span className="text-white/50 text-sm font-bold min-w-[3rem]">Cor</span>
                    <select
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      className="flex-1 bg-[#1a1a1a] border border-white/15 px-4 py-3 text-white focus:outline-none focus:border-gold/60 transition-colors appearance-none cursor-pointer"
                      style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ffffff60' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center' }}
                    >
                      <option value="" disabled>Escolha uma opção</option>
                      {CORES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
              )}

              <p className="text-text-main/50 text-base leading-relaxed mb-8 font-medium">{description}</p>

              {/* Feature badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-10">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-white/[0.02] border border-white/5">
                    <div className="w-6 h-6 bg-gold/10 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-gold" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-text-main/80">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => addToCart({
                  id: `${id}-${selectedVar?.type || 'default'}`,
                  name: `${name} ${selectedVar?.type || ''} (${vehicleModel ? `${vehicleModel}` : 'Veículo não informado'}${selectedColor ? ` · ${selectedColor}` : ''})`,
                  price: currentPrice,
                })}
                className="w-full btn-gold py-6 text-base tracking-[0.2em] mb-10"
              >
                ADICIONAR AO CARRINHO
              </button>

              {/* Technical specs */}
              <div className="space-y-4 pt-8 border-t border-white/10">
                <h3 className="font-black text-white uppercase tracking-widest text-sm mb-6">Especificações Técnicas</h3>
                {specs.map((spec, i) => (
                  <div key={i} className="flex justify-between py-3 border-b border-white/5">
                    <span className="text-text-main/40 font-bold uppercase text-xs tracking-wider">{spec.label}</span>
                    <span className="text-text-main font-bold">{spec.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CARACTERÍSTICAS GERAIS ── */}
      <section className="py-16 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="bg-white/[0.03] border border-white/10 p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-10">
              <div className="flex-1">
                <h2 className="text-xl font-black text-white uppercase mb-6 tracking-tight">Características Gerais da Capa:</h2>
                <ul className="space-y-2 text-text-main/70 text-sm leading-relaxed mb-8">
                  {[
                    'Tecido Importado feito de lycra com elastano;',
                    'Tecido com 150gr (gramatura);',
                    'Capa de tecido macio e gostoso, com encaixe perfeito no seu veículo;',
                    'Protege de riscos e das mãos de curiosos;',
                    'Lavável na máquina;',
                    'Preserva a lataria e pintura do seu veículo evitando lavagens excessivas;',
                    'Acompanha logo da montadora estampado;',
                    'Acompanha bolsa/sacola para guardar;',
                    'Possui encaixe de retrovisor;',
                    'Elástico e costura reforçado',
                    'Acompanha logomarca da montadora até 20cm',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-gold mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-white font-bold text-sm mb-4">
                  **O tempo de fabricação do produto é em torno de 5 á 10 dias úteis.
                </p>
                <p className="text-gold font-black text-sm italic mb-6">ENVIAMOS PARA TODO BRASIL</p>
                <p className="text-text-main/60 text-sm leading-relaxed mb-4">
                  Nossas capas são feitas sob medida para o seu veículo. <strong className="text-white">Protege contra os raios solares, poeiras, arranhões e maresias.</strong> Além disso conta com encaixe de retrovisor, elástico na parte inferior da capa que cai como uma luva no seu xodó. Tecido importado que não risca e nem mancha a pintura do seu veículo.
                </p>
                <p className="text-text-main/60 text-sm leading-relaxed">
                  A Só Capas assegura a você, consumidor, <strong className="text-white">GARANTIA total de 12 meses</strong>, contados a partir da data de entrega. Caso o seu produto possua algum problema de fabricação, antes de qualquer ação, entre em contato pelos nossos canais de atendimento informados após a compra. Código de Defesa do Consumidor (Lei 8.078/1990).
                </p>
              </div>
              {/* Guarantee badge */}
              <div className="flex items-start justify-center md:justify-end shrink-0">
                <div className="w-36 h-36 rounded-full border-4 border-gold flex flex-col items-center justify-center text-center bg-black/40 shadow-[0_0_40px_rgba(201,163,64,0.3)]">
                  <Shield className="w-8 h-8 text-gold mb-1" />
                  <span className="text-gold font-black text-lg leading-none">GARANTIA</span>
                  <span className="text-white font-black text-3xl leading-none">1</span>
                  <span className="text-gold font-black text-lg leading-none">ANO</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AVALIAÇÕES ── */}
      <section className="py-16 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="bg-white/[0.03] border border-white/10 p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-10 mb-10">
              {/* Average score */}
              <div className="flex flex-col items-center justify-center min-w-[160px]">
                <span className="text-7xl font-black text-white">{avgRating.toFixed(1)}</span>
                <StarRating rating={Math.round(avgRating)} size="w-6 h-6" />
                <span className="text-text-main/40 text-sm mt-2">{totalReviews} Avaliação{totalReviews !== 1 ? 'ões' : ''}</span>
                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="mt-4 px-5 py-2 bg-gold text-[#131313] font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all"
                >
                  Escreva uma avaliação
                </button>
              </div>
              {/* Distribution bars */}
              <div className="flex-1 space-y-2">
                {[5, 4, 3, 2, 1].map((star, i) => (
                  <div key={star} className="flex items-center gap-3">
                    <span className="text-gold text-sm w-4">★</span>
                    <span className="text-white/50 text-xs w-2">{star}</span>
                    <div className="flex-1 h-3 bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-gold transition-all"
                        style={{ width: ratingDist[i] > 0 ? `${(ratingDist[i] / totalReviews) * 100}%` : '0%' }}
                      ></div>
                    </div>
                    <span className="text-white/40 text-xs w-4">{ratingDist[i]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Review form */}
            {showReviewForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-8 p-6 bg-white/5 border border-white/10"
              >
                <h4 className="text-white font-black uppercase tracking-widest text-sm mb-4">Sua Avaliação</h4>
                <div className="flex gap-2 mb-4">
                  {[1,2,3,4,5].map(s => (
                    <button key={s} onClick={() => setReviewRating(s)}>
                      <Star className={`w-6 h-6 ${s <= reviewRating ? 'text-gold fill-gold' : 'text-white/20'} transition-colors`} />
                    </button>
                  ))}
                </div>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Descreva sua experiência com o produto..."
                  rows={4}
                  className="w-full bg-white/5 border border-white/15 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold/60 transition-colors resize-none mb-4"
                />
                <button className="px-8 py-3 bg-gold text-[#131313] font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all">
                  Enviar Avaliação
                </button>
              </motion.div>
            )}

            {/* Review list */}
            <div className="border-t border-white/10 pt-8 space-y-6">
              {MOCK_REVIEWS.map((review, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center text-gold font-black shrink-0">
                    {review.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-white font-black text-sm">{review.name}</span>
                      <StarRating rating={review.rating} />
                    </div>
                    <p className="text-text-main/60 text-sm">{review.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DESTAQUES ── */}
      <section className="py-16 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="flex-1 h-px bg-gold/30"></div>
            <h2 className="text-2xl font-black text-white uppercase tracking-[0.3em]">Destaques</h2>
            <div className="flex-1 h-px bg-gold/30"></div>
          </div>

          <div className="relative">
            {/* Arrows */}
            <button
              onClick={() => setHighlightOffset(Math.max(0, highlightOffset - 1))}
              disabled={!canPrev}
              className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/10 border border-white/20 flex items-center justify-center disabled:opacity-30 hover:bg-gold/20 hover:border-gold/40 transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => setHighlightOffset(Math.min(HIGHLIGHTS.length - 4, highlightOffset + 1))}
              disabled={!canNext}
              className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/10 border border-white/20 flex items-center justify-center disabled:opacity-30 hover:bg-gold/20 hover:border-gold/40 transition-all"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {visibleHighlights.map((item, i) => (
                <motion.div
                  key={item.link + highlightOffset}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white/[0.03] border border-white/10 p-4 flex flex-col group hover:border-gold/30 transition-all"
                >
                  <div className="aspect-square bg-white/5 mb-4 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-50 transition-opacity">
                      <div className="w-2/3 h-2/3 bg-gold/20 rounded-full blur-[40px]"></div>
                    </div>
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain p-3 group-hover:scale-110 transition-transform duration-500 z-10 relative" />
                  </div>
                  <h4 className="text-white font-black text-sm uppercase tracking-tight mb-2">{item.name}</h4>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-white/30 text-xs line-through">{item.oldPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                    <span className="text-white font-black">{item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                  </div>
                  <Link
                    to={item.link}
                    className="mt-auto w-full border border-white/20 text-white/70 text-[10px] font-black uppercase tracking-widest py-3 text-center hover:bg-gold hover:text-[#131313] hover:border-gold transition-all"
                  >
                    Comprar Agora
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductPage;
