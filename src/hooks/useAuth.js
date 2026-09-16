import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

import { auth, database } from '../config/firebase';
import { traducirErrorFirebase } from '../utils/erroresFirebase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargandoSesion, setCargandoSesion] = useState(true);

  useEffect(() => {
    const cancelarSuscripcion = onAuthStateChanged(auth, (usuarioFirebase) => {
      setUsuario(usuarioFirebase);
      setCargandoSesion(false);
    });

    return cancelarSuscripcion;
  }, []);

  const valor = useMemo(() => {
    const registrar = async ({
      correo,
      password,
      nombreCompleto,
      fechaNacimiento,
      carnet,
      urlImagen,
    }) => {
      try {
        const credencial = await createUserWithEmailAndPassword(
          auth,
          correo.trim(),
          password
        );

        await updateProfile(credencial.user, {
          displayName: nombreCompleto.trim(),
          photoURL: urlImagen.trim(),
        });

        // El documento usa el uid como id para poder leerlo sin consultas extra.
        await setDoc(doc(database, 'usuarios', credencial.user.uid), {
          nombreCompleto: nombreCompleto.trim(),
          fechaNacimiento: fechaNacimiento.trim(),
          carnet: carnet.trim(),
          urlImagen: urlImagen.trim(),
          correo: correo.trim(),
          creado: serverTimestamp(),
          actualizado: serverTimestamp(),
        });

        return { exito: true };
      } catch (error) {
        return { exito: false, mensaje: traducirErrorFirebase(error) };
      }
    };

    const iniciarSesion = async (correo, password) => {
      try {
        await signInWithEmailAndPassword(auth, correo.trim(), password);
        return { exito: true };
      } catch (error) {
        return { exito: false, mensaje: traducirErrorFirebase(error) };
      }
    };

    const cerrarSesion = async () => {
      try {
        await signOut(auth);
        return { exito: true };
      } catch (error) {
        return { exito: false, mensaje: traducirErrorFirebase(error) };
      }
    };

    return {
      usuario,
      cargandoSesion,
      estaAutenticado: Boolean(usuario),
      registrar,
      iniciarSesion,
      cerrarSesion,
    };
  }, [usuario, cargandoSesion]);

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const contexto = useContext(AuthContext);

  if (!contexto) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }

  return contexto;
};
