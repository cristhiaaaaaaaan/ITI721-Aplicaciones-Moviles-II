# ITI-721 - Desarrollo de Aplicaciones para Dispositivos Móviles II

**Universidad Técnica Nacional — Campus Pacífico (JRMP)**
**Carrera:** Ingeniería en Tecnologías de Información
**Período:** 1C-2026
**Profesor:** Jorge Ruiz (york)

---

## Contenido del repositorio

| Carpeta | Tema |
|---|---|
| [Class_01](./Class_01) | Configuración del entorno y primera aplicación React Native con Expo |
| [Class_02](./Class_02) | Componentes y navegación básica en React Native |
| [Class_03](./Class_03) | Expo: componentes avanzados y estilos |
| [Class_04](./Class_04) | Listas, FlatList y manejo de datos |
| [Class_05](./Class_05) | Formularios y validación de datos |
| [Class_06](./Class_06) | Consumo de APIs REST con Axios |
| [Class_07](./Class_07) | Base de datos local con SQLite — App Sticky Notes |
| [Class_08](./Class_08) | Conexión con Firebase (Auth, Firestore, Storage) |
| [Class_09](./Class_09) | WebSockets: servidor en Rust + cliente React Native |

---

## Requisitos generales

- Node.js v24+
- npm / yarn
- React Native CLI
- Android Studio (AVD) o dispositivo físico con Developer Options activado
- Expo Go (para clases con Expo)

## Cómo ejecutar cada proyecto

```bash
# Entrar a la carpeta del proyecto
cd Class_XX

# Instalar dependencias
npm install

# Correr en Android
npx react-native run-android
# o si es Expo
npm run android
```

## Class_09 — WebSockets

El proyecto Class_09 tiene dos partes:

- **`server/`** — Servidor WebSocket escrito en Rust. Requiere Ubuntu Server 24.04 con Rust instalado.
  ```bash
  cd Class_09/server
  cargo run
  ```
- **`client/`** — App React Native. Antes de correr, actualizar la IP del servidor en `App.tsx`.
