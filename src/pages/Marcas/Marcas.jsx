import { marcas } from '../../data/vehiculos';
import BrandGrid from '../../components/marcas/BrandGrid';
import './Marcas.css';

export default function Marcas() {
  return (
    <div className="marcas-page bg-white text-dark">
      <section className="py-5 border-bottom border-light">
        <div className="container text-center py-3">
          <h1 className="fw-extrabold text-black mb-2">Nuestras Marcas</h1>
          <p className="text-secondary opacity-75">
            Trabajamos con las marcas más confiables del mercado
          </p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <BrandGrid marcas={marcas} />
        </div>
      </section>
    </div>
  );
}