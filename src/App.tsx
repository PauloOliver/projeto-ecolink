import './App.css';
import logoImg from './assets/logo.png';

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <img src={logoImg} alt="EcoLink" />
          <strong>EcoLink</strong>
        </div>

        <nav className="nav">
          <a href="#about">Sobre</a>
          <a href="#projects">joao gabriel</a>
          <a href="#contact">Contato</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-text">
          <h1>
            Conectando <br /> Pessoas a Natureza
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <a href="#projects" className="btn">
            Saiba mais
          </a>
        </div>

        <div className="hero-img">
          {/* Aqui você pode substituir por um SVG ou imagem */}
          <div className="circle-plant"></div>
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <div className="icon">🌍</div>
          <h3>Nossa missão</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>

        <div className="feature">
          <div className="icon">🌱</div>
          <h3>Nossos incentivos</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>

        <div className="feature">
          <div className="icon">🤝</div>
          <h3>Se envolva</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 EcoLink. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;