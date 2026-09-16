// Paleta "Rosa Pastel Kawaii": base clara con acentos rosa y cereza.
export const colors = {
  nube: '#FFF5F8',
  blanco: '#FFFFFF',
  petalo: '#FFEDF3',
  borde: '#F7D4E0',
  rosa: '#FF6F91',
  cereza: '#D62246',
  ciruela: '#3D2B33',
  malva: '#8A7480',
  menta: '#3FA37A',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radius = {
  sm: 10,
  md: 18,
  lg: 28,
  redondo: 999,
};

// Sombra rosada suave: da el relieve "de peluche" sin ensuciar el fondo claro.
export const sombra = {
  shadowColor: colors.cereza,
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.1,
  shadowRadius: 14,
  elevation: 3,
};

export const typography = {
  titulo: {
    fontSize: 30,
    fontWeight: '700',
    color: colors.ciruela,
    letterSpacing: 0.3,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.ciruela,
    letterSpacing: 0.2,
  },
  etiqueta: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.malva,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  cuerpo: {
    fontSize: 15,
    color: colors.ciruela,
    letterSpacing: 0.2,
  },
  apoyo: {
    fontSize: 13,
    color: colors.malva,
    letterSpacing: 0.2,
  },
};
