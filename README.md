# RepairTrack

Frontend web para clientes de un taller de reparación de celulares.

El objetivo de este proyecto es ofrecer una interfaz sencilla donde el cliente pueda consultar el **estado de reparación de su dispositivo utilizando el folio que recibió al dejar su teléfono en el taller**.

El sistema no requiere que el cliente cree una cuenta ni que inicie sesión.

## 🛠️ Descripción

RepairTrack funciona como la interfaz pública del módulo de reparaciones del sistema de punto de venta.

El flujo principal es:

```text
Cliente
   │
   ▼
Ingresa su folio
   │
   ▼
RepairTrack
   │
   ▼
API de reparaciones
   │
   ▼
Consulta del folio
   │
   ▼
Estado de la reparación
```

El cliente solamente necesita su **folio de reparación** para consultar la información disponible sobre su equipo.

## 🎯 Objetivo

Proporcionar al cliente una forma rápida de conocer el estado de su reparación sin necesidad de:

* Crear una cuenta.
* Iniciar sesión.
* Contactar directamente al taller.
* Tener acceso al sistema interno del punto de venta.

## 👤 Flujo del cliente

1. El cliente entrega su teléfono al taller.
2. El taller registra la reparación en el sistema.
3. El sistema genera un folio.
4. El cliente recibe su folio.
5. El cliente entra a RepairTrack.
6. Introduce su folio.
7. El frontend consulta la API.
8. Se muestra el estado actual de la reparación.

Ejemplo:

```text
┌──────────────────────────────────────┐
│          CONSULTA TU REPARACIÓN     │
│                                      │
│  Ingresa tu folio                    │
│                                      │
│  ┌──────────────────────────────┐    │
│  │ REP-2026-00125               │    │
│  └──────────────────────────────┘    │
│                                      │
│        [ Consultar reparación ]      │
│                                      │
└──────────────────────────────────────┘
```

## 📱 Información mostrada

La información que se mostrará al cliente dependerá de los datos proporcionados por la API.

Como mínimo, la interfaz estará preparada para mostrar:

* Folio de reparación.
* Estado actual.
* Información básica del dispositivo.
* Fecha de recepción.
* Fecha de actualización.
* Descripción general de la reparación.

Ejemplo de estados:

```text
Recibido
   ↓
En diagnóstico
   ↓
Esperando autorización
   ↓
En reparación
   ↓
Reparación terminada
   ↓
Listo para entregar
   ↓
Entregado
```

Los estados definitivos serán determinados por la API del sistema de reparaciones.

## 🔌 Backend

Este frontend consume la API correspondiente al módulo de reparaciones del sistema de punto de venta.

Backend:

**punto-venta-modulo-reparaciones**

Repositorio:

`https://github.com/muqui/punto-venta-modulo-reparaciones`

El frontend debe mantenerse desacoplado del sistema interno del punto de venta.

La comunicación seguirá principalmente el siguiente esquema:

```text
RepairTrack
     │
     │ HTTP
     ▼
API de reparaciones
     │
     ▼
Base de datos
```

## 🔐 Seguridad

El cliente no tendrá acceso al sistema administrativo.

La consulta pública deberá limitarse a la información necesaria para identificar el estado de una reparación.

El frontend no debe exponer:

* Credenciales de la API.
* Tokens privados.
* Información administrativa.
* Datos internos del taller.
* Información de otros clientes.
* Información innecesaria de la reparación.

La consulta debe realizarse utilizando únicamente el folio proporcionado al cliente.

## 🚀 Funcionalidades iniciales

### Cliente

* [ ] Página principal.
* [ ] Campo para ingresar folio.
* [ ] Consulta de reparación.
* [ ] Indicador de carga.
* [ ] Mensaje cuando el folio no existe.
* [ ] Visualización del estado.
* [ ] Visualización de información básica del equipo.
* [ ] Diseño responsive para celulares.
* [ ] Manejo de errores de conexión con la API.

### Futuras funcionalidades

* [ ] Código QR asociado al folio.
* [ ] Consulta mediante QR.
* [ ] Historial de estados.
* [ ] Fecha estimada de entrega.
* [ ] Información de contacto del taller.
* [ ] Botón para contactar al taller.
* [ ] Notificaciones de cambio de estado.

## 🧱 Arquitectura

El frontend será una aplicación independiente del sistema administrativo.

```text
                    ┌─────────────────────┐
                    │       Cliente       │
                    │      Smartphone     │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │     RepairTrack     │
                    │       Frontend      │
                    └──────────┬──────────┘
                               │
                         HTTP / HTTPS
                               │
                               ▼
                    ┌─────────────────────┐
                    │   API Reparaciones  │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      Database       │
                    └─────────────────────┘
```

## 💻 Tecnologías

> Las tecnologías definitivas se definirán durante la implementación.

Propuesta inicial:

* React
* Vite
* TypeScript
* Tailwind CSS
* API REST
* Git / GitHub

## 📁 Estructura propuesta

```text
src/
├── components/
│   ├── RepairStatus.tsx
│   ├── SearchRepair.tsx
│   └── Header.tsx
│
├── pages/
│   ├── Home.tsx
│   └── Repair.tsx
│
├── services/
│   └── repairsApi.ts
│
├── types/
│   └── repair.ts
│
├── hooks/
│   └── useRepair.ts
│
├── App.tsx
└── main.tsx
```

## 🌐 Variables de entorno

La URL de la API deberá configurarse mediante variables de entorno.

Ejemplo:

```env
VITE_API_URL=http://localhost:3000
```

En producción se utilizará la URL correspondiente al backend desplegado.

## 🧪 Desarrollo local

Clonar el proyecto:

```bash
git clone <REPOSITORY_URL>
cd reparaciones-front
```

Instalar dependencias:

```bash
npm install
```

Crear el archivo `.env`:

```env
VITE_API_URL=http://localhost:3000
```

Ejecutar el proyecto:

```bash
npm run dev
```

La aplicación estará disponible en:

```text
http://localhost:5173
```

## 📦 Build

Para generar la versión de producción:

```bash
npm run build
```

Para comprobar localmente el build:

```bash
npm run preview
```

## 🔄 Relación con el sistema de punto de venta

Este proyecto **no reemplaza el sistema de punto de venta**.

Su propósito es funcionar como una interfaz pública y limitada para los clientes.

El sistema interno continúa siendo responsable de:

* Registrar clientes.
* Registrar dispositivos.
* Crear reparaciones.
* Administrar diagnósticos.
* Actualizar estados.
* Gestionar reparaciones.
* Administrar información interna del taller.

RepairTrack únicamente consume la información necesaria para que el cliente pueda conocer el estado de su reparación.

## 📌 Estado del proyecto

**En desarrollo**

Actualmente se encuentra en etapa de planificación y construcción del frontend.

## 👨‍💻 Autor

**Alberto Corona**

Proyecto desarrollado como frontend público para el módulo de reparaciones del sistema de punto de venta.
