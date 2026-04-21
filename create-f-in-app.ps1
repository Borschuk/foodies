param(
  [Parameter(Mandatory = $true)]
  [string]$Name
)

$folderPath = Join-Path "app" $Name

New-Item -ItemType Directory -Path $folderPath -Force | Out-Null
New-Item -ItemType File -Path (Join-Path $folderPath "page.module.jsx") -Force | Out-Null

$pageContent = @"
export default async function $Name() {
  return (<></>);
}
"@

Set-Content -Path (Join-Path $folderPath "page.jsx") -Value $pageContent

Write-Host "Created: $folderPath/page.jsx and $folderPath/page.module.jsx"
