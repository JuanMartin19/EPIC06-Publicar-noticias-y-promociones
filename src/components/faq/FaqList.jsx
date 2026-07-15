import FaqItem from './FaqItem';

export default function FaqList({ faqs, abiertoIndex, onToggle }) {
  return (
    <div className="faq-list bg-black rounded-4 p-4 p-md-5 shadow-lg">
      {faqs.map((faq, index) => (
        <FaqItem
          key={index}
          pregunta={faq.pregunta}
          respuesta={faq.respuesta}
          abierto={abiertoIndex === index}
          onToggle={() => onToggle(index)}
        />
      ))}
    </div>
  );
}