export function esCorreoValido(correo) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(correo);
}

export function esTelefonoValido(telefono) {
  const regex = /^\d{10}$/;
  return regex.test(telefono);
}

export function esPasswordValida(password) {
  // mínimo 8 caracteres, al menos una mayúscula, una minúscula y un número
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
  return regex.test(password);
}

export function validarFormularioUsuario(formData) {
  const errores = {};

  if (!formData.nombre.trim()) {
    errores.nombre = "El nombre es obligatorio";
  }

  if (!formData.username.trim()) {
    errores.username = "El usuario es obligatorio";
  }

  if (!esCorreoValido(formData.correo)) {
    errores.correo = "Ingresa un correo válido (ej. nombre@dominio.com)";
  }

  if (!esTelefonoValido(formData.telefono)) {
    errores.telefono = "El teléfono debe tener exactamente 10 dígitos";
  }

  if (!esPasswordValida(formData.password)) {
    errores.password = "Mínimo 8 caracteres, con mayúscula, minúscula y número";
  }

  return errores;
}