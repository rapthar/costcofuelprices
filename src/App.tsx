import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { HelmetProvider } from 'react-helmet-async';
import AppRoutes from './routes';
import Header from './components/Header';
import Footer from './components/Footer';
import MetaManager from './components/MetaManager';

function App() {
  return (
    <Router>
      <HelmetProvider>
        <MetaManager>
          <div className="min-h-screen bg-white">
            <Header />
            <main>
              <AppRoutes />
            </main>
            <Footer />
            <Analytics />
          </div>
        </MetaManager>
      </HelmetProvider>
    </Router>
  );
}

export default App;