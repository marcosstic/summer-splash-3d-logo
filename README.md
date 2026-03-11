# Summer Splash 3D Logo

Un logo 3D interactivo creado con CSS 3D puro y JavaScript Vanilla, sin dependencias externas.

## 🎨 Características

- **Motor 3D CSS**: Extrusión de texto con 15 capas para efecto 3D real
- **Interactividad Mouse**: Seguimiento 3D basado en la posición del cursor
- **Efectos Visuales**: Brillo plástico con filtros SVG y neón glow
- **Animaciones Fluidas**: Gradiente animado de fondo y parallax
- **Responsive**: Optimizado para desktop y móvil
- **Zero Dependencies**: HTML5, CSS3 y JavaScript Vanilla puro

## 🚀 Tecnologías Utilizadas

- **HTML5 Semántico**
- **CSS3 Advanced**: `transform-style: preserve-3d`, filtros SVG, animaciones
- **ES6 Modules**: JavaScript modular y moderno
- **CSS Variables**: Sistema de diseño dinámico
- **SVG Filters**: Efectos de iluminación profesional

## 📁 Estructura del Proyecto

```
summer-splash2/
├── index.html              # Estructura principal con filtros SVG
├── src/
│   ├── styles/
│   │   ├── variables.css   # Variables CSS y paleta de colores
│   │   ├── layout.css      # Grids y layout responsive
│   │   └── 3d-engine.css   # Motor 3D y extrusión de capas
│   └── js/
│       ├── App.js          # Controlador principal
│       ├── MouseTracker.js # Módulo de seguimiento 3D
│       └── Parallax.js     # Efectos parallax y burbujas
├── vercel.json             # Configuración de despliegue
├── package.json            # Metadatos del proyecto
└── README.md               # Documentación
```

## 🎮 Controles

- **Mouse Movement**: Rotación 3D del logo
- **R Key**: Resetear posición
- **↑↓ Arrow Keys**: Ajustar sensibilidad
- **Space**: Rotación aleatoria
- **Click**: Resetear suavemente

## 🌈 Paleta de Colores

- **Rosa Neón**: `#f42ab6` (Letras principales)
- **Amarillo Eléctrico**: `#ecde13` (Acentos)
- **Cian Vibrante**: `#5ae7f5` (Detalles)
- **Turquesa Profundo**: `#00afb9` (Fondo)
- **Púrpura Neón**: `#9d50bb` (Sombras 3D)

## 🔧 Desarrollo

### Iniciar servidor local:
```bash
npm run dev
# o
python3 -m http.server 8080
```

### Despliegue en Vercel:
```bash
npm run deploy
```

## 🎯 Técnica Principal: Layered Text Extrusion

El efecto 3D se logra mediante:

1. **15 capas de texto** superpuestas con `translateZ()`
2. **Degradado de color** de rosa a púrpura en profundidad
3. **Filtros SVG** para brillo plástico `feSpecularLighting`
4. **Perspectiva CSS** con `transform-style: preserve-3d`
5. **Tracking en tiempo real** con variables CSS dinámicas

## 📱 Optimización

- **Performance monitoring** integrado
- **Responsive design** con breakpoints
- **Touch support** para dispositivos móviles
- **CSS containment** para mejor rendimiento
- **Lazy loading** de animaciones

## 🚀 Despliegue

Listo para despliegue estático en:
- Vercel (recomendado)
- Netlify
- GitHub Pages
- Cualquier hosting estático

## 📄 Licencia

MIT License - Código abierto para uso comercial y personal.

---

**Creado con ❤️ usando ingeniería CSS 3D avanzada**
