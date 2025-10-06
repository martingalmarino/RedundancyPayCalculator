# Lawyer Scraper & LocalLawyers Component

Este proyecto incluye un scraper de Playwright para extraer datos de abogados especializados en Employment Law y un componente React para mostrarlos en las páginas de condados.

## PARTE 1: SCRAPER

### Archivos
- `scrapeLawyers.js` - Script principal del scraper
- `data/lawyersByCounty.json` - Dataset generado (ejemplo incluido)

### Instalación y Uso

1. **Instalar dependencias** (ya instaladas):
```bash
npm install playwright
npx playwright install chromium
```

2. **Ejecutar el scraper**:
```bash
node scrapeLawyers.js
```

### Características del Scraper

- **Respetuoso**: Incluye delays de 1-2 segundos entre requests
- **Robusto**: Manejo de errores y múltiples selectores CSS
- **Completo**: Procesa todos los 23 condados irlandeses
- **Logging**: Progreso detallado en consola

### Condados Procesados
Dublin, Kilkenny, Wexford, Meath, Louth, Kildare, Wicklow, Laois, Offaly, Westmeath, Longford, Carlow, Cork, Limerick, Waterford, Clare, Tipperary, Kerry, Galway, Roscommon, Mayo, Sligo, Leitrim

### Estructura del JSON Generado
```json
[
  {
    "county": "Dublin",
    "lawyers": [
      {
        "name": "Mason Hayes & Curran",
        "address": "Barrow Street, Dublin 4",
        "phone": "+353 1 614 5000",
        "website": "https://www.mhc.ie"
      }
    ]
  }
]
```

## PARTE 2: COMPONENTE REACT

### Archivos
- `components/LocalLawyers.tsx` - Componente React
- Integrado en `app/en/redundancy-calculator/ireland/[county]/page.tsx`

### Características del Componente

- **Responsive**: 1 columna móvil, 2-3 desktop
- **Accesible**: Links, headings semánticos, tel: links
- **SEO-friendly**: Estructura semántica correcta
- **Interactivo**: Botones de consulta (preparado para lead-gen)

### Estilos Tailwind
- Sección: `mt-12 border-t border-gray-200 pt-8`
- Grid: `grid gap-4 sm:grid-cols-2 lg:grid-cols-3`
- Cards: `rounded-xl border border-gray-200 p-4 bg-white shadow-sm hover:shadow-md`
- Links: `text-blue-700 hover:underline`

### Uso
```tsx
<LocalLawyers countySlug={county.slug} />
```

## INTEGRACIÓN COMPLETA

El componente ya está integrado en las páginas de condados y aparecerá automáticamente entre la calculadora y las FAQs.

### Flujo de Datos
1. Scraper extrae datos → `data/lawyersByCounty.json`
2. Componente lee JSON → Filtra por condado
3. Renderiza cards → Muestra en página

## NOTAS IMPORTANTES

- **Uso único**: El scraper es para construcción inicial del dataset
- **Respeto TOS**: Incluye delays y manejo respetuoso
- **Datos de ejemplo**: Incluye dataset de ejemplo para desarrollo
- **Escalable**: Fácil agregar más campos o funcionalidades

## PRÓXIMOS PASOS

1. Ejecutar scraper para obtener datos reales
2. Reemplazar dataset de ejemplo
3. Implementar funcionalidad de "Request Consultation"
4. Agregar más campos (especialidades, ratings, etc.)
