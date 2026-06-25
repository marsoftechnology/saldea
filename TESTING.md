# Testing Autónomo — Saldea

## Contexto
- App en producción: https://www.marsof.es
- Cuenta de prueba: carlosgc90personal@gmail.com
- Supabase proyecto: fqrlagpreazuuuwravbi
- Supabase URL: https://fqrlagpreazuuuwravbi.supabase.co

## Pestañas del navegador disponibles (Chrome MCP)
- Tab Gmail: https://mail.google.com (carlosgc90personal@gmail.com)
- Tab Supabase: https://supabase.com/dashboard/project/fqrlagpreazuuuwravbi
- Tab Cloudflare: https://dash.cloudflare.com
- Tab Saldea: https://www.marsof.es (sesión iniciada con cuenta de prueba)

## Instrucciones
Ejecuta el guión de testing completo del archivo `Guion_Testing_Saldea.docx` (en el Escritorio).
Sigue los 12 bloques en orden. Para cada test:
1. Navega a la página correspondiente en la pestaña de Saldea
2. Ejecuta los pasos indicados
3. Verifica el resultado esperado
4. Anota el resultado: OK, ERROR o PARCIAL

## Reglas importantes
- USA SIEMPRE la cuenta de prueba carlosgc90personal@gmail.com, NUNCA la cuenta principal
- NO completes ningún pago real en Stripe (solo verifica que la página carga)
- Para verificar emails: comprueba la pestaña de Gmail
- Para verificar datos en BD: usa la pestaña de Supabase → Table Editor
- Si algo falla, anota el error exacto que aparece en pantalla
- NO modifiques el código fuente durante el testing

## Al terminar
Genera un informe en `TESTING_RESULTS.md` con:
- Resultado de cada test (OK/ERROR/PARCIAL)
- Descripción de cada error encontrado
- Captura del estado de la app al final
- Resumen ejecutivo de qué funciona y qué no
