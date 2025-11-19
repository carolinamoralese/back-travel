# Travels API

## Descripción del proyecto y objetivo

Travels API es una plataforma backend desarrollada para agencias de viajes que gestionan múltiples usuarios y sus destinos de venta. Cada usuario tiene asignadas ciudades o lugares turísticos específicos que puede administrar, mientras que los administradores (rol **admin**) tienen control completo sobre todos los usuarios, roles y lugares.

El objetivo de esta API es centralizar la gestión de usuarios, roles y lugares, asegurando que cada recurso esté correctamente asignado, protegido y controlado, optimizando la administración de destinos turísticos y la operación de la agencia.

**Esta solución permite:**

- Administrar usuarios y sus roles con permisos claros.
- Asignar lugares específicos a cada usuario para la venta o gestión de servicios turísticos.
- Garantizar la seguridad de la plataforma mediante autenticación JWT y control de acceso basado en roles.
- Facilitar la integración con aplicaciones frontend o sistemas internos de la agencia.

---

## Roles de cada integrante

- **Carolina Morales Echeverry:** Desarrollo backend, implementación de servicios, integración de endpoints, pruebas unitarias, configuración de la base de datos, control de autenticación JWT, documentación y soporte en pruebas de Postman.

---

## Instrucciones para ejecutar la API localmente

1. Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
cd travels
```

## Variables de entorno requeridas

El archivo .env debe contener lo siguiente:
### Puerto donde se ejecuta la aplicacion 
PORT=

### Nombre de la aplicacion
APP_NAME=

### Configuracion de la base de datos MySQL 
BD_HOST=
BD_PORT=
BD_USERNAME=
BD_PASSWORD=
BD_NAME=

### Configuracion del sistema de autenticacion JWT 
JWT_SECRET_KEY=


## Ejemplos de endpoints principales
### Usuarios (users)

| Método | Ruta           | Descripción                               | Roles permitidos |
| ------ | -------------- | ----------------------------------------- | ---------------- |
| GET    | /users         | Listar todos los usuarios                 | Admin            |
| POST   | /users         | Registrar un nuevo usuario                | Admin            |
| PUT    | /users/{id}    | Actualizar un usuario existente           | Admin            |
| DELETE | /users/{id}    | Eliminar un usuario                       | Admin            |
| GET    | /users/profile | Obtener el perfil del usuario autenticado | User/Admin       |

## Lugares (places)

| Método | Ruta         | Descripción                   | Roles permitidos |
| ------ | ------------ | ----------------------------- | ---------------- |
| POST   | /places      | Agregar un lugar a un usuario | Admin/User       |
| GET    | /places      | Obtener todos los lugares     | Admin/User       |
| GET    | /places/{id} | Obtener un lugar por ID       | Admin            |
| PUT    | /places/{id} | Actualizar un lugar           | Admin            |
| DELETE | /places/{id} | Eliminar un lugar             | Admin            |

## Roles (roles)

| Método | Ruta        | Descripción                 | Roles permitidos |
| ------ | ----------- | --------------------------- | ---------------- |
| POST   | /roles      | Crear un nuevo rol          | Admin            |
| GET    | /roles      | Listar todos los roles      | Admin            |
| GET    | /roles/{id} | Obtener un rol por ID       | Admin            |
| PUT    | /roles/{id} | Actualizar un rol existente | Admin            |
| DELETE | /roles/{id} | Eliminar un rol             | Admin            |

## Autenticación (auth)

| Método | Ruta           | Descripción                          |
| ------ | -------------- | ------------------------------------ |
| POST   | /auth/login    | Inicia sesión con email y contraseña |
| POST   | /auth/register | Registro de nuevo usuario            |


## Pruebas Unitarias y Evidencias
### Pruebas implementadas

- Usuarios: Validación de creación, actualización, eliminación y consulta de usuarios.

- Roles: Creación, actualización, eliminación y consulta de roles.

- Lugares: Asociar lugares a usuarios, obtener lugares por ID y listar todos los lugares.

- Auth: Validación de usuario, login con JWT, registro con roles.

## Resultado de la ejecución

Cobertura de código general: ~80%


## Evidencias
<img width="1440" height="775" alt="image" src="https://github.com/user-attachments/assets/f602bd15-9acf-4cb3-85e9-62e9ee433105" />



