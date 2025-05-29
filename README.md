# **🚀 Gestor de Proyectos y Tareas (API REST)**

Proyecto backend en Node.js con Express y Prisma que permite a cada usuario gestionar sus propios proyectos y, dentro de ellos, sus tareas. Arquitectura limpia con capas de servicio, controlador y validación para asegurar mantenibilidad y escalabilidad.

## **🌟 Funcionalidades**

- Registro e inicio de sesión de usuarios mediante JWT
- CRUD de proyectos (título, descripción, fechas)
- CRUD de tareas anidadas en un proyecto (título, descripción, estado)
- Validación de datos con express-validator
- Control de permisos: cada usuario sólo accede a sus propios recursos
- Manejo coherente de errores y respuestas HTTP uniformes

## **⚙️ Instalación**

🔹 Clona el repositorio:

```bash
git clone https://github.com/OrtlanDev/Project-Manager-API.git
cd Project-Manager-API
```

🔹 Instala dependencias:

```bash
npm install
```

🔹 Configura variables de entorno en archivo `.env`:

```dotenv
DATABASE_URL="postgresql://user:pass@localhost:5432/dbname"
JWT_SECRET="tu_secreto_jwt"
JWT_EXPIRES_IN="1h"
PORT=4000
```

🔹 Ejecuta migraciones de Prisma y levanta el servidor:

```bash
npx prisma migrate deploy
npm run dev
```

## **🛠 Uso**

🔹 Base URL: `http://localhost:4000/api/project-manager/`

* `POST /auth/register` – registrar usuario
* `POST /auth/login` – obtener token JWT
* `GET /projects` – listar proyectos
* `POST /projects` – crear proyecto
* `PUT /projects/:projectId` – actualizar proyecto
* `DELETE /projects/:projectId` – eliminar proyecto
* `GET /projects/:projectId/tasks` – listar tareas
* `POST /projects/:projectId/tasks` – crear tarea
* `PATCH /projects/:projectId/tasks/:id` – actualizar tarea
* `DELETE /projects/:projectId/tasks/:id` – eliminar tarea

## **🗂 Estructura del proyecto**

- `src/controllers` – definición de controladores HTTP
- `src/services` – lógica de acceso a datos con Prisma
- `src/validators` – reglas de validación con express-validator
- `src/routes` – enrutamiento y combinación de middlewares
- `src/middlewares` – autenticación y manejo de errores
- `src/errors` – clases de error personalizadas
- `prisma/schema.prisma` – modelo de datos

## **✅ Buenas prácticas aplicadas**

- Separación de responsabilidades (Single Responsibility Principle)
- Validación temprana de datos y manejo centralizado de errores
- Rutas anidadas para reflejar jerarquía de recursos
- Uso de UUID, timestamps automáticos y relaciones en Prisma
- Código modular y fácil de probar
