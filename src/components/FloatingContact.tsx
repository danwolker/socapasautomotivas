import React, { useState } from 'react';
import { FaWhatsapp, FaEnvelope, FaTimes, FaCommentDots } from 'react-icons/fa';

const FloatingContact: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappNumber = "5551983229979";
  const emailAddress = "danewolker@gmail.com";

  return (
    <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 9999 }}>
      {/* Modal/Popover */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          bottom: '80px',
          right: '0',
          width: '300px',
          backgroundColor: '#1a1a1a',
          borderRadius: '15px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          border: '1px solid #333',
          padding: '20px',
          animation: 'fadeInUp 0.3s ease-out',
          color: '#fff'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold', color: '#ed3237' }}>Fale Conosco</h3>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}>
              <FaTimes size={18} />
            </button>
          </div>
          
          <p style={{ fontSize: '0.9rem', color: '#ccc', marginBottom: '20px' }}>Como podemos te ajudar hoje?</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* WhatsApp Button */}
            <a 
              href={`https://wa.me/${whatsappNumber}`} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                backgroundColor: '#25D366',
                color: '#fff',
                padding: '12px 15px',
                borderRadius: '10px',
                textDecoration: 'none',
                fontWeight: 'bold',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <FaWhatsapp size={22} />
              <span>Conversar no WhatsApp</span>
            </a>

            {/* Email Button */}
            <a 
              href={`mailto:${emailAddress}`} 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                backgroundColor: '#ed3237',
                color: '#fff',
                padding: '12px 15px',
                borderRadius: '10px',
                textDecoration: 'none',
                fontWeight: 'bold',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <FaEnvelope size={20} />
              <span>Enviar um E-mail</span>
            </a>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '30px',
          backgroundColor: isOpen ? '#333' : '#ed3237',
          color: '#fff',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 5px 15px rgba(237, 50, 55, 0.4)',
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        {isOpen ? <FaTimes size={24} /> : <FaCommentDots size={28} className="pulse-animation" />}
      </button>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .pulse-animation {
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default FloatingContact;
