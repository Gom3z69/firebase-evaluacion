import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import Boton from '../components/Boton';
import CampoTexto from '../components/CampoTexto';
import Marca from '../components/Marca';
import PantallaBase from '../components/PantallaBase';
import Tarjeta from '../components/Tarjeta';
import { colors, spacing, typography } from '../config/theme';
import { useAuth } from '../hooks/useAuth';
import { validarCorreo, validarPassword } from '../utils/validaciones';

const LoginScreen = ({ navigation }) => {
  const { iniciarSesion } = useAuth();

  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [errores, setErrores] = useState({});
  const [mensajeGeneral, setMensajeGeneral] = useState(null);
  const [cargando, setCargando] = useState(false);

  const manejarIngreso = async () => {
    const erroresDetectados = {
      correo: validarCorreo(correo),
      password: validarPassword(password),
    };

    setErrores(erroresDetectados);
    setMensajeGeneral(null);

    if (erroresDetectados.correo || erroresDetectados.password) return;

    setCargando(true);
    const resultado = await iniciarSesion(correo, password);
    setCargando(false);

    if (!resultado.exito) {
      setMensajeGeneral(resultado.mensaje);
    }
  };

  return (
    <PantallaBase contentStyle={styles.contenido}>
      <Marca
        titulo="Carné Kawaii"
        descripcion="Tu identificación institucional, siempre contigo."
      />

      <Tarjeta>
        <Text style={styles.tituloTarjeta}>Iniciar sesión</Text>

        <CampoTexto
          etiqueta="Correo institucional"
          valor={correo}
          onChangeText={setCorreo}
          error={errores.correo}
          placeholder="nombre@ricaldone.edu.sv"
          keyboardType="email-address"
          autoComplete="email"
        />

        <CampoTexto
          etiqueta="Contraseña"
          valor={password}
          onChangeText={setPassword}
          error={errores.password}
          placeholder="••••••••"
          esPassword
        />

        {mensajeGeneral && <Text style={styles.mensajeGeneral}>{mensajeGeneral}</Text>}

        <Boton
          titulo="Ingresar"
          onPress={manejarIngreso}
          cargando={cargando}
          style={styles.boton}
        />
      </Tarjeta>

      <View style={styles.pie}>
        <Text style={styles.textoPie}>¿Aún no tienes cuenta?</Text>
        <Pressable onPress={() => navigation.navigate('Registro')} hitSlop={10}>
          <Text style={styles.enlace}>Crear una cuenta</Text>
        </Pressable>
      </View>
    </PantallaBase>
  );
};

const styles = StyleSheet.create({
  contenido: {
    justifyContent: 'center',
  },
  tituloTarjeta: {
    ...typography.subtitulo,
    marginBottom: spacing.lg,
  },
  mensajeGeneral: {
    color: colors.cereza,
    fontSize: 13,
    marginBottom: spacing.md,
    letterSpacing: 0.2,
  },
  boton: {
    marginTop: spacing.sm,
  },
  pie: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  textoPie: {
    ...typography.apoyo,
    marginBottom: spacing.sm,
  },
  enlace: {
    ...typography.etiqueta,
    color: colors.cereza,
  },
});

export default LoginScreen;
