import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Items from './Items';
import ItemDetail from './ItemDetail';
import { DataProvider } from '../state/DataContext';

function Navigation() {
  const location = useLocation();
  
  return (
    <nav style={{
      padding: '0 24px',
      borderBottom: '1px solid #e1e5e9',
      backgroundColor: 'white',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px'
      }}>
        {/* Logo/Brand */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            backgroundColor: '#007bff',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '16px'
          }}>
            🛍️
          </div>
          <span style={{
            fontSize: '20px',
            fontWeight: '700',
            color: '#1a1a1a',
            background: 'linear-gradient(135deg, #007bff, #0056b3)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            ItemCatalog
          </span>
        </div>

        {/* Navigation Links */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Link 
            to="/" 
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '600',
              color: location.pathname === '/' ? '#007bff' : '#6b7280',
              backgroundColor: location.pathname === '/' ? '#e3f2fd' : 'transparent',
              border: location.pathname === '/' ? '1px solid #007bff' : '1px solid transparent',
              transition: 'all 0.2s ease-in-out',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            onMouseOver={(e) => {
              if (location.pathname !== '/') {
                e.target.style.backgroundColor = '#f8f9fa';
                e.target.style.color = '#374151';
              }
            }}
            onMouseOut={(e) => {
              if (location.pathname !== '/') {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#6b7280';
              }
            }}
          >
            <span>📦</span>
            All Items
          </Link>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <DataProvider>
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f8f9fa'
      }}>
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Items />} />
            <Route path="/items/:id" element={<ItemDetail />} />
          </Routes>
        </main>
        
        {/* Footer */}
        <footer style={{
          marginTop: 'auto',
          padding: '32px 24px',
          borderTop: '1px solid #e1e5e9',
          backgroundColor: 'white'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '16px'
            }}>
              <div style={{
                width: '24px',
                height: '24px',
                backgroundColor: '#007bff',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '12px'
              }}>
                🛍️
              </div>
              <span style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#1a1a1a'
              }}>
                ItemCatalog
              </span>
            </div>
         
          </div>
        </footer>
      </div>
    </DataProvider>
  );
}

export default App;