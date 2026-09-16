import { useCallback, useEffect, useState } from 'react';
import { doc, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore';

import { database } from '../config/firebase';
import { traducirErrorFirebase } from '../utils/erroresFirebase';

export const usePerfilUsuario = (uid) => {
  const [perfil, setPerfil] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!uid) {
      setPerfil(null);
      setCargando(false);
      return undefined;
    }

    setCargando(true);

    // onSnapshot mantiene el dashboard sincronizado con Firestore en tiempo real.
    const cancelarSuscripcion = onSnapshot(
      doc(database, 'usuarios', uid),
      (documento) => {
        setPerfil(documento.exists() ? { id: documento.id, ...documento.data() } : null);
        setError(null);
        setCargando(false);
      },
      (errorFirestore) => {
        setError(traducirErrorFirebase(errorFirestore));
        setCargando(false);
      }
    );

    return cancelarSuscripcion;
  }, [uid]);

  const actualizarPerfil = useCallback(
    async (datos) => {
      try {
        await updateDoc(doc(database, 'usuarios', uid), {
          ...datos,
          actualizado: serverTimestamp(),
        });
        return { exito: true };
      } catch (errorFirestore) {
        return { exito: false, mensaje: traducirErrorFirebase(errorFirestore) };
      }
    },
    [uid]
  );

  return { perfil, cargando, error, actualizarPerfil };
};
