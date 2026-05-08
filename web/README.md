# Novena — Web

App Next.js del sitio de Estudio Novena. Ver el README raíz del repo para contexto general del proyecto.

## Desarrollo local

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo con Turbopack |
| `npm run build` | Build de producción |
| `npm run start` | Servidor de producción local |
| `npm run lint` | ESLint |

## Estructura

```
web/
├── app/          # Rutas (App Router)
├── components/   # Componentes reutilizables
├── public/       # Assets estáticos (íconos, logos, texturas, galería)
└── fonts/        # Tipografías locales
```

## Vercel

Este directorio (`web/`) es el **root directory** configurado en el proyecto de Vercel.

- **Producción:** https://novena-pied.vercel.app
- **Preview WIP:** https://novena-wip.vercel.app
