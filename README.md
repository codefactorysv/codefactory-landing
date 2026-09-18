# CodeFactory · Landing

Sitio institucional de CodeFactory: implementación de Odoo ERP, facturación
electrónica DTE y desarrollo a la medida para empresas de El Salvador.

Construido con [Astro](https://astro.build) en modo estático. Sin framework de
UI ni dependencias de runtime: el resultado es HTML, CSS y un poco de JS.

## Requisitos

Node.js 22.12 o superior.

## Comandos

| Comando           | Qué hace                                      |
| :---------------- | :-------------------------------------------- |
| `npm install`     | Instala las dependencias                      |
| `npm run dev`     | Servidor de desarrollo en `localhost:4321`    |
| `npm run build`   | Compila el sitio a `./dist/`                  |
| `npm run preview` | Sirve `./dist/` para revisar antes de publicar |

## Estructura

```
src/
├── config/site.ts     Correo, teléfono, dominio y cifras compartidas
├── layouts/           Layout base: <head>, SEO, estilos globales
├── components/        Secciones del home + componentes compartidos
├── pages/             Una ruta por archivo (incluye 404.astro)
└── scripts/main.ts    Navegación y animaciones de entrada
public/                Assets servidos tal cual (imágenes, robots.txt)
```

**`src/config/site.ts` es el punto único de verdad** para el correo, el
teléfono, el dominio y las cifras que se repiten entre páginas. Cambiarlas ahí
las actualiza en todo el sitio.

## Formulario de contacto

El formulario de `#contacto` funciona en dos modos:

- **Sin configurar**: arma el mensaje con los datos del visitante y lo entrega
  por WhatsApp al número de `src/config/site.ts`.
- **Con `PUBLIC_WEB3FORMS_KEY`**: envía el lead por correo a la dirección de
  `site.email`, con reply-to al correo de quien escribe. Si el envío falla,
  ofrece el enlace de WhatsApp como respaldo.

Para activar el envío por correo:

1. Creá una clave gratis en [web3forms.com](https://web3forms.com) usando el
   correo de soporte.
2. En local: copiá `.env.example` a `.env` y pegá la clave.
3. En Netlify: **Site configuration → Environment variables →**
   `PUBLIC_WEB3FORMS_KEY`. Al ser una variable `PUBLIC_`, se incrusta en el
   build, así que hay que volver a desplegar para que tome efecto.

## Despliegue

El sitio se publica en Netlify. La configuración vive en `netlify.toml`:
compila con `npm run build` y publica `dist/`.

Para conectarlo la primera vez: en Netlify, **Add new site → Import an existing
project → GitHub → `codefactorysv/codefactory-landing`**. Netlify lee
`netlify.toml`, así que no hay que llenar los campos de build a mano. Cada push
a `main` publica; cada pull request genera una preview.

Después de conectar el dominio, verificá que estas tres referencias apunten al
mismo lugar:

- `site` en `astro.config.mjs` (lo usan canonical, Open Graph y el sitemap)
- `url` en `src/config/site.ts` (lo usan los datos estructurados)
- la línea `Sitemap:` en `public/robots.txt`

## SEO

Cada página emite canonical, Open Graph y Twitter Card desde `Layout.astro`. La
imagen que se muestra al compartir es `public/img/og-codefactory.jpg`; se puede
sobreescribir por página con la prop `image`. El sitemap se genera solo en cada
build.
