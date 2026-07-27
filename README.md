# Novena

Sitio web para Estudio Novena, estudio de grabación independiente en Colonia Cuauhtémoc, Ciudad de México.

## Estructura del repositorio

```
novena/
├── web/          # App Next.js (lo que se despliega en Vercel)
├── context/      # Brand assets: logos, íconos, tipografías, imágenes
└── DESIGN.md     # Guía de diseño del proyecto
```

## Desarrollo local

```bash
cd web
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Estilos:** Tailwind CSS v4
- **Lenguaje:** TypeScript
- **Deploy:** Vercel

## Deploy en Vercel

El proyecto está desplegado en Vercel en el proyecto `novena-soda-wip` del team `daniel-pliegos-projects` (cuenta `hola@casasoda.com`).

| | |
|---|---|
| **Root directory** | `web/` |
| **Build command** | `next build` |
| **Install command** | `npm install` |
| **Production** | https://www.estudionovena.com |
| **URL de Vercel** | https://novena-soda-wip.vercel.app |

> ⚠️ Los proyectos viejos `novena-pied.vercel.app` (org `srshadids-projects`) y `novena-soda.vercel.app` están abandonados — no usarlos.

Al conectar este repo a Vercel, asegurarse de configurar **Root Directory → `web/`** en el proyecto.

No se requieren variables de entorno para el build.
