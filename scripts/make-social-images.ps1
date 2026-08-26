# One-shot social images. Requires Windows System.Drawing. Not part of the site build.
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
if (-not (Test-Path (Join-Path $root "public"))) {
  $root = Get-Location
}
$public = Join-Path $root "public"
New-Item -ItemType Directory -Force -Path $public | Out-Null

Add-Type -AssemblyName System.Drawing

function Save-Png([System.Drawing.Bitmap]$bitmap, [string]$path) {
  $bitmap.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
}

$cream = [System.Drawing.Color]::FromArgb(255, 246, 241, 232)
$ink = [System.Drawing.Color]::FromArgb(255, 43, 34, 24)
$muted = [System.Drawing.Color]::FromArgb(255, 107, 92, 74)
$accent = [System.Drawing.Color]::FromArgb(255, 140, 59, 24)
$accentDark = [System.Drawing.Color]::FromArgb(255, 93, 38, 15)

# Open Graph 1200x630
$og = New-Object System.Drawing.Bitmap 1200, 630
$g = [System.Drawing.Graphics]::FromImage($og)
$g.Clear($cream)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$pen = New-Object System.Drawing.Pen $accent, 8
$g.DrawEllipse($pen, 72, 195, 240, 240)
$loaf = New-Object System.Drawing.SolidBrush $accent
$path = New-Object System.Drawing.Drawing2D.GraphicsPath
$path.AddEllipse(110, 268, 164, 110)
$g.FillPath($loaf, $path)
$inkBrush = New-Object System.Drawing.SolidBrush $ink
$mutedBrush = New-Object System.Drawing.SolidBrush $muted
$titleFont = New-Object System.Drawing.Font "Georgia", 52
$subFont = New-Object System.Drawing.Font "Georgia", 22
$g.DrawString("Gourmet Gastronomer", $titleFont, $inkBrush, 360, 230)
$g.DrawString("A food encyclopedia", $subFont, $mutedBrush, 360, 318)
$rule = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(255, 216, 203, 184)), 2
$g.DrawLine($rule, 360, 400, 1080, 400)
Save-Png $og (Join-Path $public "og.png")
$g.Dispose()
$og.Dispose()

# Apple touch 180x180
$icon = New-Object System.Drawing.Bitmap 180, 180
$ig = [System.Drawing.Graphics]::FromImage($icon)
$ig.Clear($cream)
$ig.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$ipen = New-Object System.Drawing.Pen $accent, 6
$ig.DrawEllipse($ipen, 18, 18, 144, 144)
$iloaf = New-Object System.Drawing.SolidBrush $accentDark
$ipath = New-Object System.Drawing.Drawing2D.GraphicsPath
$ipath.AddEllipse(48, 72, 84, 56)
$ig.FillPath($iloaf, $ipath)
Save-Png $icon (Join-Path $public "apple-touch-icon.png")
$ig.Dispose()
$icon.Dispose()

Write-Host "Wrote public/og.png and public/apple-touch-icon.png"
