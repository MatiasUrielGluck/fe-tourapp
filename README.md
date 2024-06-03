# Tour App (fe-tourapp)

Desarrollo del trabajo práctico de la materia Proceso de Desarrollo de Software, de la carrera Ingeniería Informática, UADE.

El desarrollo de este proyecto consistió de las siguientes etapas:

1. Obtención y priorización de los requerimientos.
2. Iteración 1 sobre el diagrama de clases del sistema.
3. Iteración 2 aplicando patrones de diseño al sistema.
4. Iteración 3 desarrollo del sistema.

## Elección de tecnologías a utilizar

### Backend

Decidimos utilizar Java con Spring Boot.

Java ya que buscamos un lenguaje orientado a objetos y Spring Boot por la seguridad, robustez y simplicidad.

Entre las principales características se encuentran:

- Utilización de Spring Security.
- Creación de filtro JWT.
- Base de datos MySQL.
- Utilización de Spring Data JPA.

### Frontend

Un front con tecnología de punta: Vue 3, con TypeScript, Pinia y Quasar.

La elección de este stack tecnológico se debe a los siguientes factores:

- Máxima eficiencia y fluidez, manteniendo una excelente escalabilidad.
- TypeScript = robustez, robustez = estabilidad, estabilidad = mejor UX.
- Componentes hermosos. Quasar lleva Material 3 a otro nivel.
- Pinia, ya que el manejo del Store es más simplificado y eficiente.

## Instalar las dependencias

```bash
yarn
# o
npm install
```

### Ejecutar el proyecto en modo desarrollo

```bash
quasar dev
```

### Pasar los archivos por lint

```bash
yarn lint
# or
npm run lint
```

### Darle formato a los archivos

```bash
yarn format
# or
npm run format
```

### Crear build de la app para producción

```bash
quasar build
```

### Información externa

#### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
