import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import Cart from './pages/Cart';
import Accessories from './pages/Accessories';
import Covers from './pages/Covers';
import LegalPage from './pages/LegalPage';

import ScrollToTop from './components/ScrollToTop';
import FloatingContact from './components/FloatingContact';

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
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

          {/* Rota dinâmica para produtos */}
          <Route path="/produto/:id" element={<ProductPage />} />

        </Routes>
        <FloatingContact />
      </Router>
    </CartProvider>
  );
}

export default App;
