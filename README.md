# 🎮 Juegos de Lina

Una colección de juegos educativos y divertidos diseñados especialmente para **Lina** (3 años). El primer juego disponible es un **Memotest** (juego de memoria) con múltiples temáticas, navegación por teclado y un diseño colorido pensado para niños pequeños.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-blue?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-8-purple?logo=vite)

---

## ✨ Características

### 🧠 Memotest
- **Grilla 3×4** (6 pares = 12 fichas) — ideal para niños de 3 años
- **3 temas disponibles:** Mickey Mouse, Barbie, Princesas Disney
- Navegación 100% por teclado o táctil
- Feedback positivo constante con confeti y animaciones

### 👦 Rompecabezas del Cuerpo Humano
- Enseña las partes del cuerpo (cabeza, torso, brazos, piernas)
- Silueta central con auto-encaje
- Sin distracciones, piezas estéticas hechas en CSS puro
- Navegable completamente con las flechas del teclado

### 🎨 Diseño
- Fichas grandes y fáciles de ver
- Animaciones suaves (pop-in, bounce, confeti)
- 100% responsive (celular, tablet, desktop)

---

## 🛠️ Stack Tecnológico

| Tecnología | Uso |
|---|---|
| [React 19](https://react.dev/) | Framework UI |
| [TypeScript 5](https://www.typescriptlang.org/) | Tipado estático |
| [Vite 8](https://vite.dev/) | Build tool y dev server |
| [TailwindCSS 4](https://tailwindcss.com/) | Estilos utilitarios |
| [React Router 7](https://reactrouter.com/) | Navegación entre pantallas |
| [Lucide React](https://lucide.dev/) | Íconos |
| [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) | Efectos de confeti |

---

## 🚀 Instalación y Desarrollo

### Requisitos previos
- [Node.js](https://nodejs.org/) 18+
- [pnpm](https://pnpm.io/) 10+

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/martin-ratti/Juegos-Lina.git
cd Juegos-Lina

# Instalar dependencias
pnpm install
```

### Desarrollo local

```bash
pnpm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

### Build de producción

```bash
pnpm run build
```

Los archivos se generan en la carpeta `dist/`.

### Preview del build

```bash
pnpm run preview
```

---

## 🌐 Deploy en Vercel

El proyecto está preparado para deployar en [Vercel](https://vercel.com/) con un solo click:

1. Crear una cuenta en [vercel.com](https://vercel.com) (se puede vincular con GitHub)
2. Click en **"Add New Project"**
3. Importar el repositorio `martin-ratti/Juegos-Lina`
4. Configurar:
   - **Framework Preset:** Vite
   - **Install Command:** `pnpm install`
   - **Build Command:** `pnpm run build`
   - **Output Directory:** `dist`
5. Click en **Deploy** 🚀

> El archivo `vercel.json` ya está configurado con los rewrites necesarios para que React Router funcione correctamente en producción.

---

## 📁 Estructura del Proyecto

```
Juegos-Lina/
├── public/
│   └── images/
│       ├── lina.jpg              # Foto de Lina (dorso de fichas)
│       ├── mickey/1-6.png        # Imágenes tema Mickey Mouse
│       ├── barbie/1-6.png        # Imágenes tema Barbie
│       ├── princesas/1-6.png     # Imágenes tema Princesas
│       └── familia/              # Próximamente
├── src/
│   ├── components/
│   │   ├── GameSelector.tsx      # Selector principal de juegos
│   │   └── Header.tsx            # Cabecera compartida
│   ├── games/
│   │   ├── memotest/             # Todo lo relacionado al Memotest
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── pages/
│   │   └── rompecabezas/         # Todo lo relacionado al Rompecabezas
│   │       └── RompecabezasGame.tsx
│   ├── hooks/
│   │   └── useKeyboard.ts       # Navegación por flechas del teclado
│   ├── data/
│   │   └── themes.ts            # Definición de temas
│   ├── types/
│   │   └── index.ts             # Tipos TypeScript
│   ├── pages/
│   │   └── Home.tsx             # Pantalla principal
│   ├── App.tsx                  # Rutas de la app
│   ├── main.tsx                 # Entry point
│   └── index.css                # Estilos globales y animaciones
├── index.html
├── vercel.json                  # Config para deploy en Vercel
├── package.json
├── pnpm-lock.yaml
├── vite.config.ts
└── tsconfig.json
```

---

## 🎯 Cómo agregar un nuevo tema de Memotest

1. Crear una carpeta en `public/images/<nombre-del-tema>/`
2. Agregar exactamente **6 imágenes** nombradas `1.png` a `6.png` (formato cuadrado recomendado)
3. Editar `src/data/themes.ts` y agregar un nuevo objeto al array `THEMES`:

```typescript
{
  id: 'mi-tema',
  name: 'Mi Tema',
  description: '¡Descripción divertida!',
  color: 'from-blue-400 to-blue-600', // Gradiente de TailwindCSS
  images: [
    '/images/mi-tema/1.png',
    '/images/mi-tema/2.png',
    '/images/mi-tema/3.png',
    '/images/mi-tema/4.png',
    '/images/mi-tema/5.png',
    '/images/mi-tema/6.png',
  ],
},
```

4. Editar `ThemeSelector.tsx` (`src/games/memotest/components/ThemeSelector.tsx`) para agregar un ícono representativo de Lucide React si lo deseas.

---

## 🔮 Próximamente

### Nuevos temas de Memotest
- 👨‍👩‍👧 **Familia** — Memotest con fotos de la familia

### Nuevos juegos
- 🎹 **Piano de Animales** — Un teclado donde cada tecla muestra un animal y reproduce su sonido. Perfecto para aprender causa y efecto.
- 🔷 **Colores y Formas** — Relacionar objetos con su color o forma.

---

## 📝 Licencia

Proyecto personal para uso familiar.

---

Hecho con ❤️ para Lina 🎀
