# prototipo-gestion-entrega-de-medicamentos

Prototipo creado para la Gestión de Entrega de Medicamentos a pacientes con enfermedades crónicas de la Comunidad Santos Luzardo.

## Extras

- [Bot de Telegram Asistente (GEMA)](https://github.com/JoseXP7/bot-GEMA-prototipo-hackathon-cccb)
- [Ver proyecto desplegado en Netlify](https://sistema-gem-hackathon-cccb.netlify.app)

## Tecnologías y Librerías usadas

- VueJS & Vite
- Vue Router
- Bootstrap 5
- SweetAlert2
- Supabase

## Variables de Entorno

Para ejecutar este proyecto, es necesario las variables de entorno que contienen los accesos de la base de datos de Supabase. Para esto se debe crear un archivo .env con las siguientes variables:

`VITE_SUPA_URL`

`VITE_SUPA_KEY`

Los valores de las variables deben consultarse con el equipo de desarrollo.

## Diagrama de la base de datos

![Diagrama](https://i.imgur.com/mLZm8ZU.png)

## Instalacion del Proyecto

```sh
npm install
```

### Compilar y recarga instantanea para desarrollo

```sh
npm run dev
```

### Compilar y minificar para produccion

```sh
npm run build
```

En caso de algun error, eliminar la carpeta **/node_modules** y ejecutar el primer comando (**npm install**).

### Password supabase of db

Hackathon2024
