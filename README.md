# Carné Kawaii

Aplicación móvil desarrollada con **React Native (Expo)** y **Firebase** que funciona como
carné estudiantil digital. El usuario se registra con su correo institucional, sus datos
quedan guardados en Cloud Firestore y al iniciar sesión accede a un panel donde puede
consultar y actualizar su información.

**Estudiante:** Diego Vladimir Gómez Escamilla
**Carnet:** 20240197

## Funcionalidades

- **Registro de usuarios** con Firebase Authentication (correo y contraseña). Los datos del
  perfil se guardan en la colección `usuarios` de Firestore usando el `uid` como identificador.
- **Inicio de sesión** con validación de campos y mensajes de error traducidos al español.
- **Dashboard / perfil** que muestra el carné del usuario autenticado, permite editar sus
  datos y cerrar sesión.
- **Sesión persistente**: la sesión se conserva con AsyncStorage al cerrar y abrir la app.
- **Sincronización en tiempo real** del perfil mediante `onSnapshot`.

## Estructura de datos

Cada documento de la colección `usuarios` contiene:

| Campo | Tipo | Descripción |
|---|---|---|
| `nombreCompleto` | string | Nombre completo del estudiante |
| `fechaNacimiento` | string | Fecha en formato `DD/MM/AAAA` |
| `carnet` | string | Carnet institucional (8 dígitos) |
| `urlImagen` | string | URL de la foto de perfil |
| `correo` | string | Correo con el que se registró |
| `creado` / `actualizado` | timestamp | Fechas de registro y última edición |

## Paleta de colores

Paleta *Rosa Pastel Kawaii*, definida en `src/config/theme.js`.

| Color | Hex | Uso |
|---|---|---|
| Rosa Nube | `#FFF5F8` | Fondo de todas las pantallas |
| Blanco | `#FFFFFF` | Tarjetas y superficies |
| Rosa Pétalo | `#FFEDF3` | Fondo de los campos de texto |
| Borde Rosado | `#F7D4E0` | Bordes y divisores |
| Rosa Kawaii | `#FF6F91` | Acento principal, mascota y detalles |
| Cereza | `#D62246` | Botones principales, enlaces y errores |
| Ciruela | `#3D2B33` | Texto principal |
| Malva | `#8A7480` | Texto secundario y etiquetas |
| Menta | `#3FA37A` | Estados de éxito |

## Estructura del proyecto

```
src/
├── components/     Componentes reutilizables (Boton, CampoTexto, Tarjeta, Avatar, ...)
├── config/         Configuración de Firebase y tema visual
├── hooks/          Hooks personalizados (useAuth, usePerfilUsuario)
├── navigation/     Stack de navegación y control de sesión
├── screens/        Login, Registro y Dashboard
└── utils/          Validaciones de formularios y traducción de errores
```

## Dependencias

| Dependencia | Versión | Uso |
|---|---|---|
| expo | ~57.0.23 | Framework base |
| react / react-native | 19.2.3 / 0.86.3 | Librería y runtime móvil |
| firebase | ^12.19.0 | Authentication y Cloud Firestore |
| @react-navigation/native | ^7.4.1 | Navegación entre pantallas |
| @react-navigation/native-stack | ^7.19.1 | Stack nativo de navegación |
| react-native-screens | ~4.26.0 | Optimización de pantallas nativas |
| react-native-safe-area-context | ~5.7.0 | Manejo de áreas seguras |
| react-native-gesture-handler | ~2.32.0 | Gestos nativos |
| @react-native-async-storage/async-storage | 2.2.0 | Persistencia de la sesión |
| react-native-dotenv | ^4.1.1 | Variables de entorno desde `.env` |
| babel-preset-expo | ~57.0.0 | Preset de Babel |
| expo-constants | ~57.0.18 | Constantes del proyecto |
| expo-splash-screen | ~57.0.9 | Pantalla de carga personalizada |
| expo-status-bar | ~57.0.1 | Barra de estado |

## Configuración e instalación

1. Clonar el repositorio e instalar dependencias:

   ```bash
   npm install
   ```

2. Crear el archivo `.env` en la raíz tomando como referencia `.env.example` y colocar las
   credenciales del proyecto de Firebase (sin comillas):

   ```
   API_KEY=...
   AUTH_DOMAIN=...
   PROJECT_ID=...
   STORAGE_BUCKET=...
   MESSAGING_SENDER_ID=...
   APP_ID=...
   ```

3. En la consola de Firebase habilitar **Authentication → Sign-in method → Correo
   electrónico/contraseña**.

4. Publicar las reglas de Firestore para que cada usuario administre solo su documento:

   ```
   rules_version = '2';

   service cloud.firestore {
     match /databases/{database}/documents {
       match /usuarios/{uid} {
         allow read, write: if request.auth != null && request.auth.uid == uid;
       }
     }
   }
   ```

5. Iniciar la aplicación:

   ```bash
   npx expo start
   ```

> El archivo `.env` está incluido en `.gitignore`, por lo que las credenciales nunca se
> suben al repositorio.
