# Script para compactar apenas os arquivos de código (ignora vídeos e imagens pesados)
# Para executar, clique com o botão direito e selecione "Executar com o PowerShell" ou rode no terminal: .\compactar_codigo.ps1

Write-Host "Iniciando a compactação do código..." -ForegroundColor Cyan

# Definir os arquivos a serem incluídos
$filesToCompress = @("index.html", "styles.css", "script.js", "CODIGO_COMPLETO.md")
$zipName = "codigo_projeto_sem_midias.zip"

# Verificar se os arquivos existem antes de compactar
$validFiles = @()
foreach ($file in $filesToCompress) {
    if (Test-Path $file) {
        $validFiles += $file
    }
}

if ($validFiles.Count -gt 0) {
    # Remover o zip anterior se existir
    if (Test-Path $zipName) {
        Remove-Item $zipName -Force
    }

    # Compactar os arquivos
    Compress-Archive -Path $validFiles -DestinationPath $zipName -Force
    Write-Host "Sucesso! O arquivo '$zipName' foi criado contendo apenas o código legível." -ForegroundColor Green
    Write-Host "Agora você pode enviar esse arquivo zip diretamente no chat com o Gemini!" -ForegroundColor Yellow
} else {
    Write-Host "Erro: Nenhum arquivo de código foi encontrado para compactar." -ForegroundColor Red
}
