import React from 'react';
import Layout from '../layouts/Layout';
import { motion } from 'framer-motion';

interface LegalPageProps {
  title: string;
  content: React.ReactNode;
}

const LegalPage: React.FC<LegalPageProps> = ({ title, content }) => {
  return (
    <Layout>
      <section className="pt-40 pb-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-dark p-12"
          >
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-12 border-b border-white/10 pb-6">
              {title}
            </h1>
            <div className="text-text-main/70 space-y-6 leading-relaxed font-medium">
              {content}
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default LegalPage;
