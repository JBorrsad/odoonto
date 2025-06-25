# Script para probar endpoints del microservicio User
param(
    [string]$BaseUrl = "http://localhost:3001"
)

$Green = "Green"
$Red = "Red"
$Yellow = "Yellow"
$Blue = "Blue"
$Cyan = "Cyan"

function Write-Color {
    param([string]$Message, [string]$Color = "White")
    Write-Host $Message -ForegroundColor $Color
}

function Test-Service {
    Write-Color "Verificando servicio en $BaseUrl..." $Cyan
    try {
        $response = Invoke-WebRequest -Uri "$BaseUrl/health" -UseBasicParsing -TimeoutSec 5
        if ($response.StatusCode -eq 200) {
            Write-Color "Servicio disponible" $Green
            return $true
        } else {
            Write-Color "Servicio no disponible (status: $($response.StatusCode))" $Red
            return $false
        }
    } catch {
        Write-Color "Error conectando al servicio" $Red
        return $false
    }
}

function Test-Endpoint {
    param(
        [string]$Name,
        [string]$Method,
        [string]$Url,
        [string]$Body = $null,
        [int]$Expected = 200
    )
    
    Write-Color "`n=== $Name ===" $Blue
    Write-Color "$Method $Url" $Yellow
    
    try {
        $params = @{
            Uri = $Url
            Method = $Method
            UseBasicParsing = $true
            TimeoutSec = 10
        }
        
        if ($Body) {
            $params.Body = $Body
            $params.ContentType = "application/json"
            Write-Color "Body: $Body" $Cyan
        }
        
        $response = Invoke-WebRequest @params
        $status = $response.StatusCode
        $content = $response.Content
        
        if ($status -eq $Expected) {
            Write-Color "EXITO - Status: $status" $Green
            if ($content) {
                Write-Color "Respuesta: $content" $Cyan
            }
            return $content
        } else {
            Write-Color "FALLO - Esperado: $Expected, Recibido: $status" $Red
            if ($content) {
                Write-Color "Respuesta: $content" $Yellow
            }
            return $null
        }
    } catch {
        $status = $_.Exception.Response.StatusCode.value__
        $content = ""
        
        if ($_.Exception.Response) {
            try {
                $stream = $_.Exception.Response.GetResponseStream()
                $reader = New-Object System.IO.StreamReader($stream)
                $content = $reader.ReadToEnd()
                $reader.Close()
                $stream.Close()
            } catch {
                $content = $_.Exception.Message
            }
        }
        
        if ($status -eq $Expected) {
            Write-Color "EXITO - Status: $status" $Green
            if ($content) {
                Write-Color "Respuesta: $content" $Cyan
            }
            return $content
        } else {
            Write-Color "ERROR - Status: $status" $Red
            Write-Color "Mensaje: $($_.Exception.Message)" $Red
            if ($content) {
                Write-Color "Respuesta: $content" $Yellow
            }
            return $null
        }
    }
}

# Verificaciones iniciales
Write-Color "=== PRUEBAS DEL MICROSERVICIO USER ===" $Blue

if (-not (Test-Service)) {
    exit 1
}

# Pruebas
Write-Color "`nIniciando pruebas..." $Cyan

# 1. Health check
Test-Endpoint -Name "Health Check" -Method "GET" -Url "$BaseUrl/health"

# 2. Obtener usuarios
$users = Test-Endpoint -Name "Obtener Usuarios" -Method "GET" -Url "$BaseUrl/v1/users"

# 3. Crear usuario
$userData = @{
    email = "test-$(Get-Date -Format 'yyyyMMddHHmmss')@example.com"
    country = "Spain"
    postalCode = "28001"
    street = "Test Street"
} | ConvertTo-Json -Compress

$newUser = Test-Endpoint -Name "Crear Usuario" -Method "POST" -Url "$BaseUrl/v1/users" -Body $userData -Expected 201

if ($newUser) {
    $userObj = $newUser | ConvertFrom-Json
    $userId = $userObj.id
    Write-Color "Usuario creado con ID: $userId" $Green
    
    # 4. Obtener usuario por ID
    Test-Endpoint -Name "Obtener Usuario por ID" -Method "GET" -Url "$BaseUrl/v1/users/$userId"
    
    # 5. Actualizar usuario
    $updateData = @{
        country = "France"
        postalCode = "75001"
        street = "Updated Street"
    } | ConvertTo-Json -Compress
    
    Test-Endpoint -Name "Actualizar Usuario" -Method "PUT" -Url "$BaseUrl/v1/users/$userId" -Body $updateData
    
    # 6. Eliminar usuario
    Test-Endpoint -Name "Eliminar Usuario" -Method "DELETE" -Url "$BaseUrl/v1/users/$userId" -Expected 204
}

# 7. Probar errores
Test-Endpoint -Name "Usuario Inexistente" -Method "GET" -Url "$BaseUrl/v1/users/00000000-0000-0000-0000-000000000000" -Expected 404

# 8. Swagger docs
Test-Endpoint -Name "Swagger Docs" -Method "GET" -Url "$BaseUrl/api/docs"

Write-Color "`nPruebas completadas!" $Green 