// assets/js/catalog/tradicional.js
// Linha: Capa Tradicional (categorias de card)

// helper simples (sem depender de outros arquivos)
const brl = (v) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

export const CATALOG_TRADICIONAL = {
  line: "tradicional",
  title: "CAPA TRADICIONAL",
  kicker: "Linha clássica",
  subtitle:
    "Proteção consistente com ótimo custo-benefício e acabamento limpo para o uso real.",
  // categorias exibidas como cards (não são os “produtos finais” ainda)
  categories: [
    {
      id: "hatch",
      name: "Capa para Carros Hatch",
      desc: "Caimento ajustado e proteção diária com visual discreto e firme.",
      fromPrice: 380.0,
      tag: "Mais procurada",
      image: "/assets/img/products/tradicional-hatch.jpg"
    },
    {
      id: "sedan",
      name: "Capa para Carros Sedan",
      desc: "Cobertura completa para sedans com encaixe estável e acabamento uniforme.",
      fromPrice: 419.9,
      tag: "Proteção",
      image: "/assets/img/products/tradicional-sedan.jpg"
    },
    {
      id: "suv",
      name: "Capa para SUVs",
      desc: "Para maior porte, com caimento reforçado e proteção consistente.",
      fromPrice: 469.9,
      tag: "Versátil",
      image: "/assets/img/products/tradicional-suv.jpg"
    },
    {
      id: "picapes-longos",
      name: "Capa para Picapes e Carros Longos",
      desc: "Cobertura estendida com foco em ajuste e proteção em áreas críticas.",
      fromPrice: 499.9,
      tag: "Sob medida",
      image: "/assets/img/products/tradicional-picapes-longos.jpg"
    },
    {
      id: "picapes-grandes",
      name: "Capa para Picapes Grandes",
      desc: "Projetada para dimensões maiores, mantendo caimento e estabilidade.",
      fromPrice: 549.9,
      tag: "Reforçada",
      image: "/assets/img/products/tradicional-picapes-grandes.jpg"
    },
    {
      id: "showroom-eventos",
      name: "Capa para Showroom e Eventos",
      desc: "Apresentação premium com acabamento visual para exposição e destaque.",
      fromPrice: 599.9,
      tag: "Exposição",
      image: "/assets/img/products/tradicional-showroom.jpg"
    },
    {
      id: "universal",
      name: "Capa Universal para Hatch até SUV",
      desc: "Opção prática com ajuste inteligente para diferentes tamanhos.",
      fromPrice: 299.9,
      tag: "Universal",
      image: "/assets/img/products/tradicional-universal.jpg"
    },
    {
      id: "motos",
      name: "Capa para Motos",
      desc: "Proteção leve e prática, fácil de colocar e tirar no dia a dia.",
      fromPrice: 179.9,
      tag: "Compacta",
      image: "/assets/img/products/tradicional-motos.jpg"
    },
    {
      id: "quadriciclos",
      name: "Capa para Quadriciclos",
      desc: "Cobertura robusta para uso externo e proteção contra poeira e sol.",
      fromPrice: 329.9,
      tag: "Off-road",
      image: "/assets/img/products/tradicional-quadriciclos.jpg"
    },
    {
      id: "jetskis",
      name: "Capa para Jet Skis",
      desc: "Proteção para armazenamento e transporte com acabamento firme.",
      fromPrice: 349.9,
      tag: "Náutico",
      image: "/assets/img/products/tradicional-jetskis.jpg"
    },
    {
      id: "super-personalizada",
      name: "Capa Super Personalizada",
      desc: "Para projetos únicos: ajuste, detalhes e personalização sob demanda.",
      fromPrice: 799.9,
      tag: "Personalizada",
      image: "/assets/img/products/tradicional-super.jpg"
    }
  ],
  format: {
    brl
  }
};
