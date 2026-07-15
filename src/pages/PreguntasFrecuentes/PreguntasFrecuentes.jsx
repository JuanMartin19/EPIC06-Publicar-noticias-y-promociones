import { faqs } from '../../data/faqs';
import { useFaqAccordion } from '../../hooks/useFaqAccordion';
import FaqList from '../../components/faq/FaqList';
import './PreguntasFrecuentes.css';

export default function PreguntasFrecuentes() {
  const { abiertoIndex, toggle } = useFaqAccordion();

  return (
    <div className="faq-page bg-white text-dark">
      <section className="py-5 border-bottom border-light">
        <div className="container text-center py-3">
          <h1 className="fw-extrabold text-black mb-2">Preguntas Frecuentes</h1>
          <p className="text-secondary opacity-75">
            Resolvemos las dudas más comunes sobre nuestros servicios
          </p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-8">
              <FaqList faqs={faqs} abiertoIndex={abiertoIndex} onToggle={toggle} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}