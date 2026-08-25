#!/bin/bash
# =========================================================================
# Ecocalipsis - Roku Channel Packaging & Sideloading Script
# =========================================================================

echo "=========================================================="
echo "  ECOCALIPSIS - IED PÍO X: Roku Channel Packager"
echo "=========================================================="

OUTPUT_ZIP="ecocalipsis_roku_channel.zip"

# Clean previous build
rm -f "$OUTPUT_ZIP"

# Check if zip utility exists
if command -v zip >/dev/null 2>&1; then
    echo "Creating Roku OS application ZIP package..."
    zip -r "$OUTPUT_ZIP" manifest source components images
    echo "✅ Success! Package created: $OUTPUT_ZIP"
    echo ""
    echo "Para instalar en tu Roku TV mediante Developer Mode:"
    echo "1. Accede a la IP de tu Roku en el navegador (ej: http://192.168.1.50)"
    echo "2. Inicia sesión con 'rokudev' y tu contraseña de desarrollador"
    echo "3. En 'Development Application Installer', selecciona '$OUTPUT_ZIP' y presiona 'Install'"
else
    echo "❌ Error: La utilidad 'zip' no está instalada en tu sistema."
    echo "Puedes comprimir manualmente los archivos: manifest, source/, components/ e images/ en un archivo .zip."
fi
