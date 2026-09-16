const MENSAJES = {
  'auth/invalid-email': 'El correo no tiene un formato válido.',
  'auth/invalid-credential': 'Correo o contraseña incorrectos.',
  'auth/user-not-found': 'No existe una cuenta con ese correo.',
  'auth/wrong-password': 'Correo o contraseña incorrectos.',
  'auth/email-already-in-use': 'Ese correo ya está registrado.',
  'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
  'auth/too-many-requests': 'Demasiados intentos. Espera un momento.',
  'auth/network-request-failed': 'Sin conexión. Revisa tu internet.',
  'auth/operation-not-allowed':
    'Habilita el proveedor Correo/Contraseña en Firebase Authentication.',
  'permission-denied': 'No tienes permisos para esta operación en Firestore.',
  unavailable: 'No se pudo contactar con Firestore. Revisa tu conexión.',
};

export const traducirErrorFirebase = (error) =>
  MENSAJES[error?.code] ?? 'Ocurrió un error inesperado. Intenta de nuevo.';
