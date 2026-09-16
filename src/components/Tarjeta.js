import { StyleSheet, View } from 'react-native';

import { colors, radius, sombra, spacing } from '../config/theme';

/**
 * Contenedor de superficie elevada. Con `destacada` dibuja el filete
 * de oro superior que identifica al carné.
 */
const Tarjeta = ({ children, destacada = false, style }) => (
  <View style={[styles.tarjeta, style]}>
    {destacada && <View style={styles.filete} />}
    <View style={styles.cuerpo}>{children}</View>
  </View>
);

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: colors.blanco,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.borde,
    overflow: 'hidden',
    ...sombra,
  },
  filete: {
    height: 5,
    backgroundColor: colors.rosa,
  },
  cuerpo: {
    padding: spacing.lg,
  },
});

export default Tarjeta;
