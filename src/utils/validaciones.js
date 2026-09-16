const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REGEX_URL = /^https?:\/\/.+\..+/i;

export const esTextoVacio = (valor) => !valor || valor.trim().length === 0;

export const validarCorreo = (correo) => {
  if (esTextoVacio(correo)) return 'El correo es obligatorio';
  if (!REGEX_CORREO.test(correo.trim())) return 'Ingresa un correo válido';
  return null;
};

export const validarPassword = (password) => {
  if (esTextoVacio(password)) return 'La contraseña es obligatoria';
  if (password.length < 6) return 'Debe tener al menos 6 caracteres';
  return null;
};

export const validarNombre = (nombre) => {
  if (esTextoVacio(nombre)) return 'El nombre completo es obligatorio';
  if (nombre.trim().length < 5) return 'Escribe tu nombre completo';
  return null;
};

export const validarCarnet = (carnet) => {
  if (esTextoVacio(carnet)) return 'El carnet es obligatorio';
  if (!/^\d{8}$/.test(carnet.trim())) return 'El carnet debe tener 8 dígitos';
  return null;
};

export const validarUrlImagen = (url) => {
  if (esTextoVacio(url)) return 'La URL de imagen es obligatoria';
  if (!REGEX_URL.test(url.trim())) return 'Debe iniciar con http:// o https://';
  return null;
};

// Inserta las barras mientras se escribe para no depender de un date picker nativo.
export const formatearFecha = (valor) => {
  const digitos = valor.replace(/\D/g, '').slice(0, 8);
  const partes = [digitos.slice(0, 2), digitos.slice(2, 4), digitos.slice(4, 8)];
  return partes.filter((parte) => parte.length > 0).join('/');
};

export const validarFechaNacimiento = (fecha) => {
  if (esTextoVacio(fecha)) return 'La fecha de nacimiento es obligatoria';
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(fecha)) return 'Usa el formato DD/MM/AAAA';

  const [dia, mes, anio] = fecha.split('/').map(Number);
  const propuesta = new Date(anio, mes - 1, dia);
  const esFechaReal =
    propuesta.getDate() === dia &&
    propuesta.getMonth() === mes - 1 &&
    propuesta.getFullYear() === anio;

  if (!esFechaReal) return 'Esa fecha no existe';
  if (propuesta > new Date()) return 'La fecha no puede ser futura';
  if (anio < 1900) return 'Verifica el año de nacimiento';
  return null;
};

// Devuelve el primer error encontrado o null si el formulario es válido.
export const primerError = (errores) =>
  Object.values(errores).find((error) => error !== null) ?? null;
