import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

import { colors, radius, sombra, spacing } from '../config/theme';

/**
 * Botón reutilizable con tres variantes: 'principal' (cereza),
 * 'contorno' (borde rosado) y 'peligro' (cierre de sesión).
 */
const Boton = ({
  titulo,
  onPress,
  variante = 'principal',
  cargando = false,
  deshabilitado = false,
  style,
}) => {
  const inactivo = cargando || deshabilitado;

  return (
    <Pressable
      onPress={onPress}
      disabled={inactivo}
      style={({ pressed }) => [
        styles.base,
        styles[variante],
        pressed && !inactivo && styles.presionado,
        inactivo && styles.inactivo,
        style,
      ]}>
      {cargando ? (
        <ActivityIndicator
          color={variante === 'principal' ? colors.blanco : colors.cereza}
          size="small"
        />
      ) : (
        <Text style={[styles.texto, styles[`texto_${variante}`]]}>{titulo}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    height: 52,
    borderRadius: radius.redondo,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  principal: {
    backgroundColor: colors.cereza,
    ...sombra,
  },
  contorno: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.borde,
  },
  peligro: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.cereza,
  },
  presionado: {
    opacity: 0.82,
  },
  inactivo: {
    opacity: 0.5,
  },
  texto: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  texto_principal: {
    color: colors.blanco,
  },
  texto_contorno: {
    color: colors.ciruela,
  },
  texto_peligro: {
    color: colors.cereza,
  },
});

export default Boton;
