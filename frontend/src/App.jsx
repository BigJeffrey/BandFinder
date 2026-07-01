import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <div className="logo">
            <span className="logo-icon">🎸</span>
            <h1>BandFinder</h1>
          </div>
          <p className="tagline">Znajdź muzyków do swojego zespołu</p>
        </header>

        <main className="main">
          <div className="status-card">
            <div className="status-icon">🚧</div>
            <h2>Frontend w budowie</h2>
            <p>
              Pracujemy nad interfejsem użytkownika. Backend API jest już
              dostępny i w pełni funkcjonalny.
            </p>
            <div className="features">
              <div className="feature">
                <span className="feature-icon">🔍</span>
                <span>Wyszukiwanie zespołów</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🎵</span>
                <span>Dodawanie ogłoszeń</span>
              </div>
              <div className="feature">
                <span className="feature-icon">👤</span>
                <span>Rejestracja i logowanie</span>
              </div>
              <div className="feature">
                <span className="feature-icon">📍</span>
                <span>Filtrowanie po mieście</span>
              </div>
            </div>
          </div>

          <div className="api-section">
            <h3>API Endpoints</h3>
            <div className="endpoint-list">
              <div className="endpoint">
                <span className="method get">GET</span>
                <span className="path">/api/health</span>
                <span className="desc">Status serwera</span>
              </div>
              <div className="endpoint">
                <span className="method post">POST</span>
                <span className="path">/api/auth/register</span>
                <span className="desc">Rejestracja</span>
              </div>
              <div className="endpoint">
                <span className="method post">POST</span>
                <span className="path">/api/auth/login</span>
                <span className="desc">Logowanie</span>
              </div>
              <div className="endpoint">
                <span className="method get">GET</span>
                <span className="path">/api/bands</span>
                <span className="desc">Lista zespołów</span>
              </div>
            </div>
          </div>
        </main>

        <footer className="footer">
          <p>BandFinder &copy; 2024 | Projekt zaliczeniowy</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
