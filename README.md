# GESEL

Aplicación Web destinada a la gestión de los procesos de selección en un departamento de RRHH.

## Tecnologías utilizadas

- **Spring Boot**: Framework de backend.
- **Angular**: Última versión de Angular para el frontend.
- **Chart.js**: Para la visualización de gráficos.
- **DataTables**: Para la visualización de tablas, ordenación y paginación.
- **Angular CDK**: Conjunto de herramientas de Angular, en concreto Drop y Drag para arrastrar y soltar.

## Requisitos previos

- JDK 11 o superior
- Node.js y npm
- Angular CLI

## Instalación

1. Clona el repositorio: https://github.com/Maruve8/Gesel
2. Navega al directorio del proyecto: cd Gesel
3. Instala las dependencias de angular: 
    cd frontend
    npm install
4. Instala las dependencias de Spring Boot:
    cd Gesel
    ./mvnw install

## Configuración de la base de datos

1. Descarga el archvivo de la base de datos: https://drive.google.com/drive/folders/1DIz9VI8LB23BmrQ4OanwFvaVZ7NDGnT4?usp=sharing
2. Importa la base de datos en tu sistema de gestión de bases de datos.

### Credenciales de usuario
- Usuario rol User:
    -- Username: Maruve
    -- Password: maruve
- Usuario rol Admin:
    -- Username: admin
    -- Password: adminpassword

## Ejecución del Proyecto

1. Ejecuta el backend de Spring Boot:
    cd Gesel
    ./mvnw spring-boot:run

2. Ejecuta el frontend de Angular:
    cd frontend
    ng serve

3. Accese a la aplicación en tu navegador: http://localhost:4200

