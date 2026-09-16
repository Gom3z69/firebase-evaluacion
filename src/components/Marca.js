import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '../config/theme';

/**
 * Mascota original de la app: carita de gatita dibujada con Views.
 * Las orejas usan el truco de bordes transparentes para formar triángulos.
 */
const Ojo = () => (
  <View style={styles.ojo}>
    <View style={styles.brillo} />
  </View>
);

const Gatita = () => (
  <View style={styles.mascota}>
    <View style={[styles.oreja, styles.orejaIzquierda]} />
    <View style={[styles.oreja, styles.orejaDerecha]} />
    <View style={[styles.orejaInterior, styles.orejaInteriorIzquierda]} />
    <View style={[styles.orejaInterior, styles.orejaInteriorDerecha]} />

    <View style={styles.cara}>
      <View style={[styles.rubor, styles.ruborIzquierdo]} />
      <View style={[styles.rubor, styles.ruborDerecho]} />

      <View style={styles.ojos}>
        <Ojo />
        <Ojo />
      </View>
      <View style={styles.nariz} />
    </View>

    <View style={[styles.bigote, styles.bigoteIzquierdo]} />
    <View style={[styles.bigote, styles.bigoteDerecho]} />
  </View>
);

const Marca = ({ titulo, descripcion }) => (
  <View style={styles.contenedor}>
    <Gatita />

    <Text style={styles.titulo}>{titulo}</Text>
    <View style={styles.filete} />
    <Text style={styles.descripcion}>{descripcion}</Text>
  </View>
);

const TAMANO_CARA = 76;

const styles = StyleSheet.create({
  contenedor: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  mascota: {
    width: TAMANO_CARA + 44,
    height: TAMANO_CARA + 18,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: spacing.lg,
  },
  cara: {
    width: TAMANO_CARA,
    height: TAMANO_CARA,
    borderRadius: radius.redondo,
    backgroundColor: colors.rosa,
    alignItems: 'center',
    justifyContent: 'center',
  },
  oreja: {
    position: 'absolute',
    top: 0,
    width: 0,
    height: 0,
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderBottomWidth: 26,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.rosa,
  },
  orejaIzquierda: {
    left: 26,
    transform: [{ rotate: '-18deg' }],
  },
  orejaDerecha: {
    right: 26,
    transform: [{ rotate: '18deg' }],
  },
  orejaInterior: {
    position: 'absolute',
    top: 9,
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 14,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.petalo,
  },
  orejaInteriorIzquierda: {
    left: 33,
    transform: [{ rotate: '-18deg' }],
  },
  orejaInteriorDerecha: {
    right: 33,
    transform: [{ rotate: '18deg' }],
  },
  ojos: {
    flexDirection: 'row',
    gap: 20,
  },
  ojo: {
    width: 12,
    height: 16,
    borderRadius: radius.redondo,
    backgroundColor: colors.cereza,
    alignItems: 'center',
  },
  brillo: {
    width: 4,
    height: 5,
    borderRadius: radius.redondo,
    backgroundColor: colors.blanco,
    marginTop: 3,
    marginRight: 3,
  },
  nariz: {
    width: 11,
    height: 8,
    borderRadius: radius.redondo,
    backgroundColor: colors.blanco,
    marginTop: 8,
  },
  rubor: {
    position: 'absolute',
    bottom: 14,
    width: 15,
    height: 11,
    borderRadius: radius.redondo,
    backgroundColor: colors.petalo,
    opacity: 0.85,
  },
  ruborIzquierdo: {
    left: 8,
  },
  ruborDerecho: {
    right: 8,
  },
  bigote: {
    position: 'absolute',
    bottom: 30,
    width: 22,
    height: 2,
    borderRadius: radius.redondo,
    backgroundColor: colors.rosa,
  },
  bigoteIzquierdo: {
    left: 0,
  },
  bigoteDerecho: {
    right: 0,
  },
  titulo: {
    ...typography.titulo,
    textAlign: 'center',
  },
  filete: {
    width: 40,
    height: 3,
    borderRadius: radius.redondo,
    backgroundColor: colors.rosa,
    marginVertical: spacing.md,
  },
  descripcion: {
    ...typography.apoyo,
    textAlign: 'center',
    maxWidth: 280,
    lineHeight: 20,
  },
});

export default Marca;
