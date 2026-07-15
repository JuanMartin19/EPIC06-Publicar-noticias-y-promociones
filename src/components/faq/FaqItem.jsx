import './FaqItem.css';

export default function FaqItem({ pregunta, respuesta, abierto, onToggle }) {
  return (
    <div className="faq-item border-bottom border-secondary">
      <button
        className="faq-question d-flex justify-content-between align-items-center w-100 bg-transparent border-0 text-start py-3"
        onClick={onToggle}
        aria-expanded={abierto}
      >
        <span className="fw-semibold text-white">{pregunta}</span>
        <i className={`bi ${abierto ? 'bi-dash-circle' : 'bi-plus-circle'} text-danger fs-5`}></i>
      </button>

      {abierto && (
        <p className="faq-answer text-white-50 pb-3 mb-0">
          {respuesta}
        </p>
      )}
    </div>
  );
}