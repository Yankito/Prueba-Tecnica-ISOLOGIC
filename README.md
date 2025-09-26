# Prueba Técnica ISOLOGIC: Gestión de Tareas (Fullstack)

Este proyecto implementa una aplicación Fullstack para la **Gestión de Tareas** que incluye autenticación de usuarios mediante **JWT (JSON Web Tokens)** y operaciones **CRUD completas** sobre las tareas.

El proyecto está dividido en dos servicios principales:

- **Backend (API):** Desarrollada con **NestJS** y **TypeORM** (para PostgreSQL).  
- **Frontend (Cliente):** Desarrollada con **React/Vite**.

---

## 1. Requisitos Previos
Necesitarás tener instalado lo siguiente:

- **Node.js** (versión 18 o superior)  
- **npm** (incluido con Node.js)  
- **PostgreSQL**

---

## 2. Configuración y Ejecución del Backend (NestJS)

El servidor expone todos los endpoints de autenticación y tareas requeridos, protegidos con **JWT**.

### 2.1. Instalación de Dependencias
Navega a la carpeta backend e instala las dependencias:

```bash
cd backend
npm install
```

### 2.2. Configuración de Variables de Entorno
Crea un archivo llamado .env en la raíz de la carpeta backend/ y configura las credenciales de tu base de datos y la clave de seguridad.

```env
# ==================================
# CONFIGURACIÓN DE BASE DE DATOS (PostgreSQL)
# ==================================
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_DATABASE=isologic_db

# ==================================
# CONFIGURACIÓN DE SEGURIDAD
# ==================================
JWT_SECRET=clave_secreta
PORT=3000

# ==================================
# CONFIGURACIÓN DE CORS
# ==================================
# Debe coincidir con la URL de tu frontend de React
FRONTEND_URL=http://localhost:5173
```


### 2.3. Inicialización de la Base de Datos
El proyecto está configurado para la **sincronización automática** de TypeORM (`synchronize: true`).

- **Método Automático (Recomendado):** Al ejecutar el servidor por primera vez (`npm run start:dev`), las tablas `user` y `task` serán creadas automáticamente en la base de datos configurada.
- **Método Manual (Opcional):** El *script* SQL para la creación manual se encuentra en la carpeta **`base de datos/`**.

### 2.4. Ejecución del Servidor
Ejecuta el servidor en modo desarrollo:

```bash
npm run start:dev
```
La API estará disponible en http://localhost:3000


## 3. Configuración y Ejecución del Frontend (React)

El frontend incluye las páginas de Login/Registro y el Dashboard de Tareas

### 3.1. Instalación de Dependencias
Navega a la carpeta `frontend` e instala las dependencias:

```bash
cd frontend
npm install
```

### 3.2. Configuración de Variables de Entorno
Crea un archivo llamado .env en la raíz de la carpeta frontend/ para indicarle a la aplicación dónde encontrar la API.

```env
VITE_API_URL=http://localhost:3000
```

### 3.3. Ejecución del Cliente

Ejecuta el cliente de React:
```bash
npm run dev
```
La aplicación estará disponible en http://localhost:5173

## 4. Credenciales de Prueba
Puedes usar el formulario de registro para crear una nueva cuenta o usar las credenciales generadas automáticamente:

| Usuario | Contraseña |
| :--- | :--- |
| admin | 1234 |