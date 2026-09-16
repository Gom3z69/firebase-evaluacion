import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '../config/theme';

/** Par etiqueta / valor usado para listar los datos del carné. */
const FilaDato = ({ etiqueta, valor, ultima = false }) => (
  <View style={[styles.fila, !ultima && styles.conDivisor]}>
    <Text style={styles.etiqueta}>{etiqueta}</Text>
    <Text style={styles.valor} numberOfLines={2}>
      {valor || '—'}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  fila: {
    paddingVertical: spacing.md - 2,
  },
  conDivisor: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borde,
  },
  etiqueta: {
    ...typography.etiqueta,
    marginBottom: spacing.xs + 2,
  },
  valor: {
    ...typography.cuerpo,
  },
});

export default FilaDato;
