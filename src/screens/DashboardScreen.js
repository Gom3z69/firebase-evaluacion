import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';

import Avatar from '../components/Avatar';
import Boton from '../components/Boton';
import CampoTexto from '../components/CampoTexto';
import FilaDato from '../components/FilaDato';
import PantallaBase from '../components/PantallaBase';
import Tarjeta from '../components/Tarjeta';
import { colors, spacing, typography } from '../config/theme';
import { useAuth } from '../hooks/useAuth';
import { usePerfilUsuario } from '../hooks/usePerfilUsuario';
import {
  formatearFecha,
  validarCarnet,
  validarFechaNacimiento,
  validarNombre,
  validarUrlImagen,
} from '../utils/validaciones';

const formatearMarcaTiempo = (marca) => {
  if (!marca?.toDate) return '—';

  return marca.toDate().toLocaleDateString('es-SV', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

const DashboardScreen = () => {
  const { usuario, cerrarSesion } = useAuth();
  const { perfil, cargando, error, actualizarPerfil } = usePerfilUsuario(usuario?.uid);

  const [editando, setEditando] = useState(false);
  const [formulario, setFormulario] = useState(null);
  const [errores, setErrores] = useState({});
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    if (!perfil) return;

    setFormulario({
      nombreCompleto: perfil.nombreCompleto ?? '',
      fechaNacimiento: perfil.fechaNacimiento ?? '',
      carnet: perfil.carnet ?? '',
      urlImagen: perfil.urlImagen ?? '',
    });
  }, [perfil]);

  const actualizarCampo = (campo, valor) =>
    setFormulario((previo) => ({ ...previo, [campo]: valor }));

  const cancelarEdicion = () => {
    setFormulario({
      nombreCompleto: perfil.nombreCompleto ?? '',
      fechaNacimiento: perfil.fechaNacimiento ?? '',
      carnet: perfil.carnet ?? '',
      urlImagen: perfil.urlImagen ?? '',
    });
    setErrores({});
    setEditando(false);
  };

  const guardarCambios = async () => {
    const erroresDetectados = {
      nombreCompleto: validarNombre(formulario.nombreCompleto),
      fechaNacimiento: validarFechaNacimiento(formulario.fechaNacimiento),
      carnet: validarCarnet(formulario.carnet),
      urlImagen: validarUrlImagen(formulario.urlImagen),
    };

    setErrores(erroresDetectados);

    if (Object.values(erroresDetectados).some(Boolean)) return;

    setGuardando(true);
    const resultado = await actualizarPerfil(formulario);
    setGuardando(false);

    if (resultado.exito) {
      setEditando(false);
      Alert.alert('Carné actualizado', 'Tus datos se guardaron correctamente.');
      return;
    }

    Alert.alert('No se pudo guardar', resultado.mensaje);
  };

  const confirmarCierreSesion = () =>
    Alert.alert('Cerrar sesión', '¿Deseas salir de tu carné digital?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Salir', style: 'destructive', onPress: cerrarSesion },
    ]);

  if (cargando || !formulario) {
    return (
      <PantallaBase desplazable={false} contentStyle={styles.centrado}>
        <ActivityIndicator color={colors.cereza} size="large" />
        <Text style={styles.textoCarga}>
          {error ?? 'Cargando tu carné…'}
        </Text>
      </PantallaBase>
    );
  }

  return (
    <PantallaBase>
      <View style={styles.encabezado}>
        <Text style={styles.saludo}>Hola,</Text>
        <Text style={styles.nombre}>{perfil.nombreCompleto}</Text>
      </View>

      <Tarjeta destacada>
        <View style={styles.identidad}>
          <Avatar url={perfil.urlImagen} nombre={perfil.nombreCompleto} />

          <View style={styles.identidadTexto}>
            <Text style={styles.etiquetaCarnet}>Carnet</Text>
            <Text style={styles.carnet}>{perfil.carnet}</Text>
            <Text style={styles.institucion}>Instituto Técnico Ricaldone</Text>
          </View>
        </View>

        <View style={styles.divisor} />

        <FilaDato etiqueta="Nombre completo" valor={perfil.nombreCompleto} />
        <FilaDato etiqueta="Fecha de nacimiento" valor={perfil.fechaNacimiento} />
        <FilaDato etiqueta="Correo" valor={perfil.correo} />
        <FilaDato etiqueta="Registrado el" valor={formatearMarcaTiempo(perfil.creado)} ultima />
      </Tarjeta>

      {editando ? (
        <Tarjeta style={styles.bloque}>
          <Text style={styles.tituloBloque}>Editar información</Text>

          <CampoTexto
            etiqueta="Nombre completo"
            valor={formulario.nombreCompleto}
            onChangeText={(valor) => actualizarCampo('nombreCompleto', valor)}
            error={errores.nombreCompleto}
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

          <Boton titulo="Guardar cambios" onPress={guardarCambios} cargando={guardando} />
          <Boton
            titulo="Cancelar"
            variante="contorno"
            onPress={cancelarEdicion}
            style={styles.bloque}
          />
        </Tarjeta>
      ) : (
        <Boton
          titulo="Editar información"
          variante="contorno"
          onPress={() => setEditando(true)}
          style={styles.bloque}
        />
      )}

      <Boton
        titulo="Cerrar sesión"
        variante="peligro"
        onPress={confirmarCierreSesion}
        style={styles.bloque}
      />
    </PantallaBase>
  );
};

const styles = StyleSheet.create({
  centrado: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoCarga: {
    ...typography.apoyo,
    marginTop: spacing.md,
    textAlign: 'center',
  },
  encabezado: {
    marginBottom: spacing.lg,
  },
  saludo: {
    ...typography.etiqueta,
    marginBottom: spacing.xs + 2,
  },
  nombre: {
    ...typography.titulo,
    fontSize: 26,
  },
  identidad: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  identidadTexto: {
    flex: 1,
    marginLeft: spacing.lg,
  },
  etiquetaCarnet: {
    ...typography.etiqueta,
    marginBottom: spacing.xs,
  },
  carnet: {
    fontSize: 24,
    fontWeight: '300',
    color: colors.cereza,
    letterSpacing: 3,
  },
  institucion: {
    ...typography.apoyo,
    marginTop: spacing.xs + 2,
  },
  divisor: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.borde,
    marginVertical: spacing.lg,
  },
  bloque: {
    marginTop: spacing.md,
  },
  tituloBloque: {
    ...typography.subtitulo,
    marginBottom: spacing.lg,
  },
});

export default DashboardScreen;
