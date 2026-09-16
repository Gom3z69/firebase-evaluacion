import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing } from '../config/theme';

/**
 * Contenedor común de las pantallas: fondo obsidiana, área segura
 * y manejo del teclado para los formularios.
 */
const PantallaBase = ({ children, desplazable = true, contentStyle }) => {
  const contenido = desplazable ? (
    <ScrollView
      contentContainerStyle={[styles.contenido, contentStyle]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.contenido, contentStyle]}>{children}</View>
  );

  return (
    <SafeAreaView style={styles.area} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.flexible}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {contenido}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: colors.nube,
  },
  flexible: {
    flex: 1,
  },
  contenido: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
});

export default PantallaBase;
