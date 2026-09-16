import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { colors, radius, spacing, typography } from '../config/theme';

/**
 * Campo de texto reutilizable con etiqueta en versalitas, estado de foco
 * en oro, mensaje de error y alternador opcional para contraseñas.
 */
const CampoTexto = ({
  etiqueta,
  valor,
  onChangeText,
  error,
  esPassword = false,
  editable = true,
  ...props
}) => {
  const [enfocado, setEnfocado] = useState(false);
  const [oculto, setOculto] = useState(esPassword);

  const colorBorde = error ? colors.cereza : enfocado ? colors.rosa : colors.borde;

  return (
    <View style={styles.contenedor}>
      <Text style={styles.etiqueta}>{etiqueta}</Text>

      <View style={[styles.marco, { borderColor: colorBorde }, !editable && styles.deshabilitado]}>
        <TextInput
          style={styles.entrada}
          value={valor}
          onChangeText={onChangeText}
          onFocus={() => setEnfocado(true)}
          onBlur={() => setEnfocado(false)}
          secureTextEntry={oculto}
          editable={editable}
          placeholderTextColor={colors.malva}
          selectionColor={colors.rosa}
          autoCapitalize="none"
          {...props}
        />

        {esPassword && (
          <Pressable onPress={() => setOculto((previo) => !previo)} hitSlop={10}>
            <Text style={styles.alternador}>{oculto ? 'Ver' : 'Ocultar'}</Text>
          </Pressable>
        )}
      </View>

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    marginBottom: spacing.md,
  },
  etiqueta: {
    ...typography.etiqueta,
    marginBottom: spacing.sm,
  },
  marco: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.petalo,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
  },
  deshabilitado: {
    opacity: 0.6,
  },
  entrada: {
    flex: 1,
    paddingVertical: spacing.md - 2,
    fontSize: 15,
    color: colors.ciruela,
    letterSpacing: 0.2,
  },
  alternador: {
    ...typography.etiqueta,
    color: colors.cereza,
    letterSpacing: 1,
  },
  error: {
    marginTop: spacing.xs + 2,
    fontSize: 12,
    color: colors.cereza,
    letterSpacing: 0.2,
  },
});

export default CampoTexto;
