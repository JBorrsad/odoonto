# ===============================================
# ODOONTO - Setup Environment Variables
# ===============================================

param(
    [string]$Environment = "development"
)

Write-Host "🔧 Configurando variables de entorno para: $Environment" -ForegroundColor Green

# Crear .env desde environment.config
if (Test-Path "environment.config") {
    Copy-Item "environment.config" ".env"
    Write-Host "✅ Archivo .env creado desde environment.config" -ForegroundColor Green
} else {
    Write-Host "❌ No se encontró environment.config" -ForegroundColor Red
    exit 1
}

# Ajustar para producción si es necesario
if ($Environment -eq "production") {
    Write-Host "🔒 Configurando para producción..." -ForegroundColor Yellow
    
    # Cambiar NODE_ENV a production
    (Get-Content .env) -replace 'development', 'production' | Set-Content .env
    
    Write-Host "✅ Variables ajustadas para producción" -ForegroundColor Green
}

Write-Host "🚀 Configuración completada. Archivo .env listo para usar." -ForegroundColor Green
Write-Host "💡 Recuerda: No subas el archivo .env a Git" -ForegroundColor Yellow 