// assets/js/catalog/acessorios.js
// Linha: Acessórios (por enquanto: chaveiro e lixeira interna)

const brl = (v) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

export const CATALOG_ACESSORIOS = {
  line: "acessorios",
  title: "ACESSÓRIOS",
  kicker: "Complementos",
  subtitle:
    "Detalhes que completam o cuidado: itens simples, úteis e com acabamento limpo.",
  categories: [
    {
      id: "chaveiro",
      name: "Chaveiro SoCapas",
      desc: "Minimalista e resistente — um detalhe simples com cara de marca.",
      fromPrice: 19.9,
      tag: "Acessório",
      image: "/assets/img/products/acessorio-chaveiro.jpg"
    },
    {
      id: "lixeira-interna",
      name: "Lixeira Interna Automotiva",
      desc: "Organização discreta para o dia a dia: fácil de fixar e limpar.",
      fromPrice: 39.9,
      tag: "Acessório",
      image: "/assets/img/products/acessorio-lixeira.jpg"
    }
  ],
  format: {
    brl
  }
};
