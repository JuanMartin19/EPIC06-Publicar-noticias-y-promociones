import ContactInfo from '../../components/contacto/ContactInfo';
import ContactForm from '../../components/contacto/ContactForm';
import './Contacto.css';

export default function Contacto() {
  return (
    <section className="contacto-page py-5 bg-light">
      <div className="container py-4">
        <div className="row g-5 align-items-center">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </section>
  );
}