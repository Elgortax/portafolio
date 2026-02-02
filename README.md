# Portafolio de Alexis Rodríguez

Sitio personal desarrollado con Next.js 16 (App Router) y Tailwind CSS para mostrar mi perfil profesional, proyectos recientes y formas de contacto. El contenido está totalmente en español y cada sección está pensada para reclutadores TI.

## Estructura principal
- **Hero**: foto, rol, CTA hacia LinkedIn, GitHub y descarga del CV.
- **Sobre mí / Skills**: resumen profesional y chips con competencias técnicas.
- **Proyectos**: tarjetas con imagen destacada y modal con carrusel de capturas, stack y enlaces.
- **Certificaciones**: listado con botón de descarga del PDF.
- **Contacto**: canales directos (email, LinkedIn y GitHub).

## Requisitos
- Node.js 20+
- npm (incluido con Node)

## Scripts disponibles
```bash
npm install      # instala dependencias
npm run dev      # entorno local en http://localhost:3000
npm run lint     # ejecuta ESLint
npm run build    # compila para producción
npm run start    # sirve la build de producción
```

## Cómo agregar un nuevo proyecto
1. Coloca el logo y capturas dentro de `public/<nombre-proyecto>/`.
2. Edita `src/app/page.tsx` y añade un objeto al arreglo `projects` con:
   - `id`, `title`, `timeframe`, `summary`, `description` (array de párrafos)
   - `technologies` (array de badges)
   - `image` principal y `gallery` opcional
   - `linkHref` / `linkLabel`
3. Ejecuta `npm run lint` y haz commit para desplegar en Vercel.

## Deploy
Cada `git push` a la rama `main` dispara un build automático en Vercel. El sitio público vive en **https://alexis-rodriguez.vercel.app**.
