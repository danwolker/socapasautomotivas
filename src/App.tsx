import { HashRouter as Router, Routes, Route, useSearchParams } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import Cart from './pages/Cart';
import Accessories from './pages/Accessories';
import Covers from './pages/Covers';
import LegalPage from './pages/LegalPage';

import hatchImg from './assets/capas/Capa para Carros Hatch.png';
import sedanImg from './assets/capas/Capa para Carros Sedan.png';
import suvImg from './assets/capas/Capa para SUVs.png';
import caminhoneteImg from './assets/capas/Capa para Picapes Grandes.png';
import jetSkiImg from './assets/capas/Capa para Jet Skis.png';
import motoImg from './assets/capas/Capa para Motos.png';
import quadricicloImg from './assets/capas/Capa para Quadriciclos.png';
import capaPersonalizadaImg from './assets/capas/Capa Super Personalizada.png';
import showroomImg from './assets/capas/Capa para Showroom e Eventos.png';
import carrosLongosImg from './assets/capas/Capa para Picapes e Carros Longos.png';
import premiumPeluciadaImg from './assets/capas/Capa Premium Peluciada.png';
import windbannerImg from './assets/capas/windbanner.png';

const TRADICIONAL_VARIATIONS = [
  { type: 'Hatch', price: 395.90 },
  { type: 'Sedan', price: 419.90 },
  { type: 'SUV', price: 449.90 },
  { type: 'Caminhonete', price: 479.90 },
  { type: 'Caminhonetes e Carros Longos', price: 499.90 },
  { type: 'Moto', price: 285.90 },
  { type: 'Jet Ski', price: 285.90 },
  { type: 'Quadriciclo', price: 285.90 },
  { type: 'Capa Personalizada', price: 500.00 },
  { type: 'Showroom e Eventos', price: 800.00 },
];

const PELUCIADA_VARIATIONS = [
  { type: 'Hatch', price: 630.00 },
  { type: 'Sedan', price: 670.00 },
  { type: 'SUV', price: 690.00 },
  { type: 'Caminhonete', price: 770.00 },
];

const TRADICIONAL_FEATURES = ['Proteção UV', '100% Impermeável', 'Fácil de Limpar', 'Material Reforçado'];
const TRADICIONAL_SPECS = [
  { label: 'Material', value: 'Lycra com Elastano' },
  { label: 'Gramatura', value: '150gr' },
  { label: 'Garantia', value: '12 Meses' },
];

function getTradicionalImage(type: string | null): string {
  switch (type) {
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
    default: return hatchImg;
  }
}

// Wrapper component to read the ?type= param and pass the right image


function TradicionalPage() {
  const [params] = useSearchParams();
  const type = params.get('type');
  return (
    <ProductPage
      id="tradicional"
      name="Capa Tradicional"
      price={395.90}
      image={getTradicionalImage(type)}
      description="A união perfeita entre proteção básica e durabilidade. Desenvolvida para quem busca o essencial com o selo de qualidade Pelé das Capas."
      features={TRADICIONAL_FEATURES}
      specs={TRADICIONAL_SPECS}
      variations={TRADICIONAL_VARIATIONS}
    />
  );
}

function PeluciadaPage() {
  return (
    <ProductPage
      id="peluciada"
      name="Capa Premium Peluciada"
      price={630.00}
      image={premiumPeluciadaImg}
      description="O máximo em proteção e carinho com seu veículo. Interior totalmente aveludado para evitar qualquer micro-risco na pintura."
      features={['Interior Aveludado', 'Toque de Seda', 'Proteção Térmica', 'Sistema Anti-risco']}
      specs={[
        { label: 'Material', value: 'Poliéster + Pelúcia' },
        { label: 'Garantia', value: '12 Meses' },
      ]}
      variations={PELUCIADA_VARIATIONS}
    />
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/capas" element={<Covers />} />
          <Route path="/acessorios" element={<Accessories />} />

          <Route path="/termos" element={
            <LegalPage
              title="Termos de Uso"
              content={
                <>
                  <p>Bem-vindo ao Pelé das Capas. Ao acessar este site, você concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis ​​e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis.</p>
                  <h2 className="text-white font-black uppercase text-sm mt-8">1. Uso de Licença</h2>
                  <p>É concedida permissão para baixar temporariamente uma cópia dos materiais no site Pelé das Capas, apenas para visualização transitória pessoal e não comercial.</p>
                  <h2 className="text-white font-black uppercase text-sm mt-8">2. Isenção de Responsabilidade</h2>
                  <p>Os materiais no site da Pelé das Capas são fornecidos 'como estão'. Pelé das Capas não oferece garantias, expressas ou implícitas.</p>
                  <h2 className="text-white font-black uppercase text-sm mt-8">3. Limitações</h2>
                  <p>Em nenhum caso a Pelé das Capas ou seus fornecedores serão responsáveis ​​por quaisquer danos decorrentes do uso ou da incapacidade de usar os materiais em nosso site.</p>
                </>
              }
            />
          } />

          <Route path="/privacidade" element={
            <LegalPage
              title="Política de Privacidade"
              content={
                <>
                  <p>Sua privacidade é importante para nós. É política do Pelé das Capas respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site.</p>
                  <h2 className="text-white font-black uppercase text-sm mt-8">Coleta de Dados</h2>
                  <p>Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço.</p>
                  <h2 className="text-white font-black uppercase text-sm mt-8">Retenção de Dados</h2>
                  <p>Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado.</p>
                  <h2 className="text-white font-black uppercase text-sm mt-8">Cookies</h2>
                  <p>Utilizamos cookies para melhorar sua experiência em nosso site.</p>
                </>
              }
            />
          } />

          {/* Capas routes */}
          <Route path="/tradicional" element={<TradicionalPage />} />
          <Route path="/peluciada" element={<PeluciadaPage />} />

          {/* Acessórios routes */}
          <Route path="/acessorios/acc1" element={
            <ProductPage
              id="acc1" name="Cadeado de Segurança" price={49.90}
              description="Cabo de aço com revestimento e cadeado para fixação da capa. Evita furtos e garante que sua capa permaneça no lugar."
              features={['Aço Reforçado', 'Capa Protetora', 'Duas Chaves', 'Universal']}
              specs={[{ label: 'Comprimento', value: '2 metros' }, { label: 'Material', value: 'Aço / PVC' }]}
            />
          } />
          <Route path="/acessorios/acc2" element={
            <ProductPage
              id="acc2" name="Bolsa de Transporte" price={35.00}
              description="Bolsa reforçada para guardar sua capa com organização e facilidade. Protege a capa quando não está em uso."
              features={['Zíper Reforçado', 'Alça de Mão', 'Lavável', 'Compacta']}
              specs={[{ label: 'Tamanho', value: 'Universal' }, { label: 'Cor', value: 'Preto' }]}
            />
          } />
          <Route path="/acessorios/acc3" element={
            <ProductPage
              id="acc3" name="Kit de Limpeza Premium" price={89.90}
              description="Produtos específicos para manter sua capa sempre nova. Remove manchas e protege o material contra o ressecamento."
              features={['PH Neutro', 'Não Engordura', 'Fragrância Suave', 'Rende muito']}
              specs={[{ label: 'Volume', value: '500ml' }, { label: 'Aplicação', value: 'Spray' }]}
            />
          } />
          <Route path="/acessorios/acc4" element={
            <ProductPage
              id="acc4" name="Cinta Anti-Vento" price={29.90}
              description="Fixação extra para regiões com ventos fortes. Garante que a capa não saia do lugar mesmo em tempestades."
              features={['Fivela Ajustável', 'Nylon de Alta Resistência', 'Fácil de Instalar', 'Seguro']}
              specs={[{ label: 'Quantidade', value: '1 Par' }, { label: 'Ajuste', value: 'Universal' }]}
            />
          } />
          <Route path="/acessorios/windbanner" element={
            <ProductPage
              id="windbanner" 
              name="Windbanner Personalizado" 
              price={179.90}
              image={windbannerImg}
              description="Destaque sua marca com visibilidade total! O Windbanner da Pelé das Capas é produzido com materiais de alta performance, garantindo resistência ao vento e cores vibrantes que não desbotam ao sol. Ideal para calçadas, entradas de lojas e eventos ao ar livre."
              features={[
                'Impressão em Alta Resolução', 
                'Tecido Flag de Qualidade', 
                'Haste de Fibra de Vidro', 
                'Base de Alta Estabilidade',
                'Fácil de Transportar e Montar'
              ]}
              specs={[
                { label: 'Material', value: 'Poliéster 110g' }, 
                { label: 'Estrutura', value: 'Fibra e Alumínio' },
                { label: 'Resistência', value: 'Ventos até 40km/h' },
                { label: 'Personalização', value: 'Frente e Verso' }
              ]}
            />
          } />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
