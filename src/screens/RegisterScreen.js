import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import Avatar from '../components/Avatar';
import Boton from '../components/Boton';
import CampoTexto from '../components/CampoTexto';
import Marca from '../components/Marca';
import PantallaBase from '../components/PantallaBase';
import Tarjeta from '../components/Tarjeta';
import { colors, spacing, typography } from '../config/theme';
import { useAuth } from '../hooks/useAuth';
import {
  formatearFecha,
  validarCarnet,
  validarCorreo,
  validarFechaNacimiento,
  validarNombre,
  validarPassword,
  validarUrlImagen,
} from '../utils/validaciones';

const FORMULARIO_INICIAL = {
  nombreCompleto: '',
  fechaNacimiento: '',
  carnet: '',
  urlImagen: '',
  correo: '',
  password: '',
};

const RegisterScreen = ({ navigation }) => {
  const { registrar } = useAuth();

  const [formulario, setFormulario] = useState(FORMULARIO_INICIAL);
  const [errores, setErrores] = useState({});
  const [mensajeGeneral, setMensajeGeneral] = useState(null);
  const [cargando, setCargando] = useState(false);

  const actualizarCampo = (campo, valor) =>
    setFormulario((previo) => ({ ...previo, [campo]: valor }));

  const manejarRegistro = async () => {
    const erroresDetectados = {
      nombreCompleto: validarNombre(formulario.nombreCompleto),
      fechaNacimiento: validarFechaNacimiento(formulario.fechaNacimiento),
      carnet: validarCarnet(formulario.carnet),
      urlImagen: validarUrlImagen(formulario.urlImagen),
      correo: validarCorreo(formulario.correo),
      password: validarPassword(formulario.password),
    };

    setErrores(erroresDetectados);
    setMensajeGeneral(null);

    if (Object.values(erroresDetectados).some(Boolean)) return;

    setCargando(true);
    const resultado = await registrar(formulario);
    setCargando(false);

    // Si el registro es correcto, el listener de sesión abre el dashboard solo.
    if (!resultado.exito) {
      setMensajeGeneral(resultado.mensaje);
    }
  };

  return (
    <PantallaBase>
      <Marca
        titulo="Crear cuenta"
        descripcion="Registra los datos que aparecerán en tu carné kawaii."
      />

      <Tarjeta>
        <View style={styles.previa}>
          <Avatar url={formulario.urlImagen} nombre={formulario.nombreCompleto} tamano={80} />
          <Text style={styles.textoPrevia}>Vista previa de tu foto</Text>
        </View>

        <CampoTexto
          etiqueta="Nombre completo"
          valor={formulario.nombreCompleto}
          onChangeText={(valor) => actualizarCampo('nombreCompleto', valor)}
          error={errores.nombreCompleto}
          placeholder="Nombres y apellidos"
          autoCapitalize="words"
        />

        <CampoTexto
          etiqueta="Fecha de nacimiento"
          valor={formulario.fechaNacimiento}
          onChangeText={(valor) => actualizarCampo('fechaNacimiento', formatearFecha(valor))}
          error={errores.fechaNacimiento}
          placeholder="DD/MM/AAAA"
          keyboardType="number-pad"
          maxLength={10}
        />

        <CampoTexto
          etiqueta="Carnet institucional"
          valor={formulario.carnet}
          onChangeText={(valor) => actualizarCampo('carnet', valor.replace(/\D/g, ''))}
          error={errores.carnet}
          placeholder="20240197"
          keyboardType="number-pad"
          maxLength={8}
        />

        <CampoTexto
          etiqueta="URL de imagen"
          valor={formulario.urlImagen}
          onChangeText={(valor) => actualizarCampo('urlImagen', valor)}
          error={errores.urlImagen}
          placeholder="https://..."
          keyboardType="url"
        />

        <View style={styles.divisor} />

        <CampoTexto
          etiqueta="Correo institucional"
          valor={formulario.correo}
          onChangeText={(valor) => actualizarCampo('correo', valor)}
          error={errores.correo}
          placeholder="nombre@ricaldone.edu.sv"
          keyboardType="email-address"
        />

        <CampoTexto
          etiqueta="Contraseña"
          valor={formulario.password}
          onChangeText={(valor) => actualizarCampo('password', valor)}
          error={errores.password}
          placeholder="Mínimo 6 caracteres"
          esPassword
        />

        {mensajeGeneral && <Text style={styles.mensajeGeneral}>{mensajeGeneral}</Text>}

        <Boton
          titulo="Registrarme"
          onPress={manejarRegistro}
          cargando={cargando}
          style={styles.boton}
        />
      </Tarjeta>

      <View style={styles.pie}>
        <Text style={styles.textoPie}>¿Ya tienes cuenta?</Text>
        <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
          <Text style={styles.enlace}>Volver al inicio de sesión</Text>
        </Pressable>
      </View>
    </PantallaBase>
  );
};

const styles = StyleSheet.create({
  previa: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  textoPrevia: {
    ...typography.apoyo,
    marginTop: spacing.sm,
  },
  divisor: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.borde,
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

export default RegisterScreen;
