import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DashboardScreen from '../screens/DashboardScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { colors } from '../config/theme';
import { useAuth } from '../hooks/useAuth';

const Stack = createNativeStackNavigator();

const temaKawaii = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.nube,
    card: colors.nube,
    text: colors.ciruela,
    border: colors.borde,
    primary: colors.cereza,
  },
};

const Navigation = () => {
  const { estaAutenticado, cargandoSesion } = useAuth();

  // Evita el parpadeo del login mientras Firebase restaura la sesión guardada.
  if (cargandoSesion) {
    return (
      <View style={styles.cargando}>
        <ActivityIndicator color={colors.cereza} size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer theme={temaKawaii}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {estaAutenticado ? (
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen
              name="Registro"
              component={RegisterScreen}
              options={{ animation: 'slide_from_right' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  cargando: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.nube,
  },
});

export default Navigation;
