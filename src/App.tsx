import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import Cart from './pages/Cart';
import Accessories from './pages/Accessories';
import Covers from './pages/Covers';
import LegalPage from './pages/LegalPage';

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
                  <p>Os materiais no site da Pelé das Capas são fornecidos 'como estão'. Pelé das Capas não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização.</p>
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
                  <p>Sua privacidade é importante para nós. É política do Pelé das Capas respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site Pelé das Capas.</p>
                  <h2 className="text-white font-black uppercase text-sm mt-8">Coleta de Dados</h2>
                  <p>Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento.</p>
                  <h2 className="text-white font-black uppercase text-sm mt-8">Retenção de Dados</h2>
                  <p>Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos.</p>
                  <h2 className="text-white font-black uppercase text-sm mt-8">Cookies</h2>
                  <p>Utilizamos cookies para melhorar sua experiência em nosso site. Você pode optar por desativar os cookies nas configurações do seu navegador.</p>
                </>
              }
            />
          } />
          <Route path="/accessories/acc1" element={
            <ProductPage 
              id="acc1"
              name="Cadeado de Segurança"
              price={49.90}
              description="Cabo de aço com revestimento e cadeado para fixação da capa. Evita furtos e garante que sua capa permaneça no lugar."
              features={['Aço Reforçado', 'Capa Protetora', 'Duas Chaves', 'Universal']}
              specs={[
                { label: 'Comprimento', value: '2 metros' },
                { label: 'Material', value: 'Aço / PVC' }
              ]}
            />
          } />
          <Route path="/accessories/acc2" element={
            <ProductPage 
              id="acc2"
              name="Bolsa de Transporte"
              price={35.00}
              description="Bolsa reforçada para guardar sua capa com organização e facilidade. Protege a capa quando não está em uso."
              features={['Zíper Reforçado', 'Alça de Mão', 'Lavável', 'Compacta']}
              specs={[
                { label: 'Tamanho', value: 'Universal' },
                { label: 'Cor', value: 'Preto' }
              ]}
            />
          } />
          <Route path="/accessories/acc3" element={
            <ProductPage 
              id="acc3"
              name="Kit de Limpeza Premium"
              price={89.90}
              description="Produtos específicos para manter sua capa sempre nova. Remove manchas e protege o material contra o ressecamento."
              features={['PH Neutro', 'Não Engordura', 'Fragrância Suave', 'Rende muito']}
              specs={[
                { label: 'Volume', value: '500ml' },
                { label: 'Aplicação', value: 'Spray' }
              ]}
            />
          } />
          <Route path="/accessories/acc4" element={
            <ProductPage 
              id="acc4"
              name="Cinta Anti-Vento"
              price={29.90}
              description="Fixação extra para regiões com ventos fortes. Garante que a capa não saia do lugar mesmo em tempestades."
              features={['Fivela Ajustável', 'Nylon de Alta Resistência', 'Fácil de Instalar', 'Seguro']}
              specs={[
                { label: 'Quantidade', value: '1 Par' },
                { label: 'Ajuste', value: 'Universal' }
              ]}
            />
          } />
          <Route path="/tradicional" element={
            <ProductPage 
              id="tradicional"
              name="Capa Tradicional"
              price={395.90}
              description="A união perfeita entre proteção básica e durabilidade. Desenvolvida para quem busca o essencial com o selo de qualidade Pelé das Capas."
              features={['Proteção UV', '100% Impermeável', 'Fácil de Limpar', 'Material Reforçado']}
              specs={[
                { label: 'Material', value: 'Polietileno 100%' },
                { label: 'Garantia', value: '3 Meses' },
                { label: 'Cores', value: 'Prata / Cinza' }
              ]}
              variations={[
                { type: 'Hatch', price: 395.90 },
                { type: 'Sedan', price: 419.90 },
                { type: 'SUV', price: 449.90 },
                { type: 'Caminhonete', price: 479.90 },
                { type: 'Moto / Jet Ski', price: 285.90 },
              ]}
            />
          } />
          <Route path="/premium300" element={
            <ProductPage 
              id="premium300"
              name="Capa Premium 300"
              price={630.00}
              description="Nossa linha intermediária com reforço extra. Ideal para veículos que ficam expostos ao sol e chuva intensos por longos períodos."
              features={['Camada Tripla', 'Extra Resistente', 'Acabamento Premium', 'Ventilação Estruturada']}
              specs={[
                { label: 'Material', value: 'Poliéster Reforçado' },
                { label: 'Garantia', value: '6 Meses' },
                { label: 'Cores', value: 'Preto / Cinza' }
              ]}
              variations={[
                { type: 'Hatch', price: 630.00 },
                { type: 'Sedan', price: 670.00 },
                { type: 'SUV', price: 690.00 },
                { type: 'Caminhonete', price: 770.00 },
                { type: 'Moto / Jet Ski', price: 450.00 },
              ]}
            />
          } />
          <Route path="/peluciada" element={
            <ProductPage 
              id="peluciada"
              name="Capa Premium Peluciada"
              price={630.00}
              description="O máximo em proteção e carinho com seu veículo. Interior totalmente aveludado para evitar qualquer micro-risco na pintura."
              features={['Interior Aveludado', 'Toque de Seda', 'Proteção Térmica', 'Sistema Anti-risco']}
              specs={[
                { label: 'Material', value: 'Poliéster + Pelúcia' },
                { label: 'Garantia', value: '12 Meses' },
                { label: 'Cores', value: 'Ouro / Prata' }
              ]}
              variations={[
                { type: 'Hatch', price: 630.00 },
                { type: 'Sedan', price: 670.00 },
                { type: 'SUV', price: 690.00 },
                { type: 'Caminhonete', price: 770.00 },
                { type: 'Moto / Jet Ski', price: 450.00 },
              ]}
            />
          } />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
