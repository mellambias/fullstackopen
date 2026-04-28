# Query Builder

Proyecto de pruebas end-to-end (E2E) con Playwright.

## Descripción

Este proyecto contiene pruebas de extremo a extremo utilizando Playwright para automatizar y validar el comportamiento de aplicaciones web.

## Configuración

El proyecto ya está configurado con:
- Playwright Test
- Configuración para múltiples navegadores (Chromium, Firefox, WebKit)
- Scripts de prueba predefinidos

## Scripts disponibles

```bash
# Ejecutar pruebas solo en Chromium
npm test

# Ejecutar pruebas en todos los navegadores
npm run test:allBrowser

# Ver el reporte de las pruebas
npm run test:report

# Ejecutar pruebas en modo UI interactivo
npm run test:ui

# Ejecutar pruebas en modo debug
npm run test:debug

# Ejecutar pruebas con trace activado
npm run test:trace

# Generar código de prueba usando codegen
npm run test:gen
```

## Estructura del proyecto

- `tests/` - Directorio con las pruebas E2E
- `tests-examples/` - Ejemplos de pruebas de demostración
- `playwright.config.js` - Configuración de Playwright

## Uso

1. Asegúrate de que tu aplicación esté corriendo (por defecto en `http://localhost:5173`)
2. Ejecuta las pruebas con `npm test`
3. Revisa los resultados con `npm run test:report`

## Documentación

Para más información sobre Playwright:
- [Documentación oficial de Playwright](https://playwright.dev/)
- [API Reference](https://playwright.dev/docs/api/class-playwright)
