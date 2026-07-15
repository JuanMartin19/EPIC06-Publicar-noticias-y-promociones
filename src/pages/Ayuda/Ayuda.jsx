import HelpGrid from '../../components/ayuda/HelpGrid';
import './Ayuda.css';

export default function Ayuda() {
  return (
    <div className="ayuda-page bg-white text-dark">
      <section className="py-5 border-bottom border-light">
        <div className="container text-center py-3">
          <h1 className="fw-extrabold text-black mb-2">Centro de Ayuda</h1>
          <p className="text-secondary opacity-75">
            Elige por dónde quieres empezar
          </p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <HelpGrid />
        </div>
      </section>
    </div>
  );
}