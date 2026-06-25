@echo off
title Marsof Outreach
cd /d "%~dp0"
color 0B

:menu
cls
echo.
echo  ============================================================
echo                  MARSOF OUTREACH - Gestorias
echo  ============================================================
echo.
echo   1. BUSCAR EMAILS DE UNA CIUDAD (scraper generico, 51 sectores)
echo   2. Buscar emails de gestorias del CSV (manual)
echo   3. Crear borradores en Zoho (REST API)
echo   4. Generar Word con plantilla en escritorio
echo   5. Abrir dashboard HTML manual
echo   6. Ver CSV de gestorias en Excel
echo   7. Abrir carpeta Borradores en Zoho
echo   8. Anadir gestorias nuevas (editar CSV)
echo.
echo   0. Salir
echo  ------------------------------------------------------------
set /p choice="  Elige opcion: "

if "%choice%"=="1" goto scrape_city
if "%choice%"=="2" goto find_emails
if "%choice%"=="3" goto create_drafts
if "%choice%"=="4" goto docx
if "%choice%"=="5" goto dashboard
if "%choice%"=="6" goto edit_csv
if "%choice%"=="7" goto zoho_drafts
if "%choice%"=="8" goto edit_csv
if "%choice%"=="0" exit
goto menu

:scrape_city
echo.
echo  Buscador generico de emails por ciudad.
echo  Tarda ~30 min y devuelve 200-500 emails de pymes/autonomos.
echo.
set /p ciudad="  Ciudad (ej: Huelva, Sevilla, Cadiz y pueblos): "
if "%ciudad%"=="" goto menu
set /p sectores="  Cuantos sectores (Enter = todos los 51): "
if "%sectores%"=="" (
  python find_business_emails.py --ciudad "%ciudad%"
) else (
  python find_business_emails.py --ciudad "%ciudad%" --sectores %sectores%
)
echo.
pause
goto menu

:docx
echo.
python generate_docx.py
start "" "%USERPROFILE%\Desktop\Marsof - Email outreach.docx"
goto menu

:find_emails
echo.
echo  Buscando emails de gestorias sin email...
echo.
python 1_find_emails.py
echo.
pause
goto menu

:create_drafts
echo.
set /p limit="  Cuantos borradores crear (Enter = todos los pendientes): "
if "%limit%"=="" (
  python 3_api_drafts.py
) else (
  python 3_api_drafts.py --limit %limit%
)
echo.
pause
goto menu

:dashboard
echo.
echo  Regenerando dashboard HTML...
python 2_create_dashboard.py
start "" "outreach-dashboard.html"
goto menu

:edit_csv
start "" "gestorias.csv"
goto menu

:zoho_drafts
start "" "https://mail.zoho.eu/zm/#mail/folder/drafts"
goto menu
