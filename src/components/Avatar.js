import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { colors, radius } from '../config/theme';

const obtenerIniciales = (nombre = '') =>
  nombre
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((palabra) => palabra.charAt(0).toUpperCase())
    .join('') || '♡';

/**
 * Foto circular con anillo de oro. Si la URL falla o está vacía
 * muestra las iniciales del usuario.
 */
const Avatar = ({ url, nombre, tamano = 88 }) => {
  const [fallo, setFallo] = useState(false);

  useEffect(() => {
    setFallo(false);
  }, [url]);

  const dimension = {
    width: tamano,
    height: tamano,
    borderRadius: radius.redondo,
  };

  if (!url || fallo) {
    return (
      <View style={[styles.marco, dimension, styles.respaldo]}>
        <Text style={[styles.iniciales, { fontSize: tamano * 0.32 }]}>
          {obtenerIniciales(nombre)}
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.marco, dimension]}>
      <Image
        source={{ uri: url }}
        style={[dimension, styles.imagen]}
        onError={() => setFallo(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  marco: {
    borderWidth: 2,
    borderColor: colors.rosa,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  respaldo: {
    backgroundColor: colors.petalo,
  },
  imagen: {
    resizeMode: 'cover',
  },
  iniciales: {
    color: colors.cereza,
    fontWeight: '600',
    letterSpacing: 1,
  },
});

export default Avatar;
