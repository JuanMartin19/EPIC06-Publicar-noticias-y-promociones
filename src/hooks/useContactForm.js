import { useState } from 'react';

export function useContactForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    mensaje: '',
  });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí después conectamos con el backend (endpoint /contacto)
    console.log('Formulario enviado:', formData);
    setEnviado(true);
    setFormData({ nombre: '', correo: '', mensaje: '' });
  };

  return { formData, enviado, handleChange, handleSubmit };
}