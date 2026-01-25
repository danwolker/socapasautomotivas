// assets/js/catalog/peluciada.js
// Linha: Capa Premium Peluciada (categorias de card)

const brl = (v) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

export const CATALOG_PELUCIADA = {
  line: "peluciada",
  title: "CAPA PREMIUM PELUCIADA",
  kicker: "Camada interna macia",
  subtitle:
    "Cuidado extra para a pintura: interior suave, acabamento premium e caimento impecável.",
  categories: [
    {
      id: "hatch",
      name: "Capa Premium Peluciada — Hatch",
      desc: "Interior macio e caimento firme para proteção com toque superior.",
      fromPrice: 499.9,
      tag: "Premium",
      image: "/assets/img/products/peluciada-hatch.jpg"
    },
    {
      id: "sedan",
      name: "Capa Premium Peluciada — Sedan",
      desc: "Cobertura completa com camada interna suave e acabamento refinado.",
      fromPrice: 539.9,
      tag: "Proteção",
      image: "/assets/img/products/peluciada-sedan.jpg"
    },
    {
      id: "suv",
      name: "Capa Premium Peluciada — SUV",
      desc: "Para SUVs com interior macio e ajuste estável, sem comprometer o visual.",
      fromPrice: 579.9,
      tag: "Versátil",
      image: "/assets/img/products/peluciada-suv.jpg"
    },
    {
      id: "picapes-longos",
      name: "Peluciada — Picapes/Longos",
      desc: "Modelo reforçado para maior comprimento com interior suave e caimento consistente.",
      fromPrice: 639.9,
      tag: "Reforçada",
      image: "/assets/img/products/peluciada-picapes-longos.jpg"
    },
    {
      id: "picapes-grandes",
      name: "Peluciada — Picapes Grandes",
      desc: "Proteção premium para grandes dimensões com interior macio e estabilidade.",
      fromPrice: 699.9,
      tag: "Premium",
      image: "/assets/img/products/peluciada-picapes-grandes.jpg"
    },
    {
      id: "showroom-eventos",
      name: "Peluciada — Showroom/Eventos",
      desc: "Acabamento premium e apresentação impecável, com cuidado extra no contato.",
      fromPrice: 749.9,
      tag: "Exposição",
      image: "/assets/img/products/peluciada-showroom.jpg"
    },
    {
      id: "universal",
      name: "Peluciada — Universal (Hatch até SUV)",
      desc: "Opção prática com interior suave e ajuste inteligente para vários tamanhos.",
      fromPrice: 449.9,
      tag: "Universal",
      image: "/assets/img/products/peluciada-universal.jpg"
    },
    {
      id: "motos",
      name: "Peluciada — Motos",
      desc: "Interior macio para proteger partes sensíveis com praticidade no uso.",
      fromPrice: 279.9,
      tag: "Compacta",
      image: "/assets/img/products/peluciada-motos.jpg"
    },
    {
      id: "quadriciclos",
      name: "Peluciada — Quadriciclos",
      desc: "Proteção robusta com interior macio para evitar micro-riscos no uso externo.",
      fromPrice: 449.9,
      tag: "Off-road",
      image: "/assets/img/products/peluciada-quadriciclos.jpg"
    },
    {
      id: "jetskis",
      name: "Peluciada — Jet Skis",
      desc: "Acabamento premium e interior suave para armazenamento e transporte.",
      fromPrice: 469.9,
      tag: "Náutico",
      image: "/assets/img/products/peluciada-jetskis.jpg"
    },
    {
      id: "super-personalizada",
      name: "Peluciada — Super Personalizada",
      desc: "Personalização avançada com interior macio e acabamento no nível máximo.",
      fromPrice: 999.9,
      tag: "Personalizada",
      image: "/assets/img/products/peluciada-super.jpg"
    }
  ],
  format: {
    brl
  }
};
