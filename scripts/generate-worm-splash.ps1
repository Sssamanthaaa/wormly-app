Add-Type -AssemblyName System.Drawing

$assetsDir = Join-Path $PSScriptRoot "..\assets\images"
$assetsDir = [System.IO.Path]::GetFullPath($assetsDir)

function New-Canvas([int]$size, [System.Drawing.Color]$backgroundColor) {
  $bitmap = New-Object System.Drawing.Bitmap $size, $size
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $graphics.Clear($backgroundColor)

  return @{
    Bitmap = $bitmap
    Graphics = $graphics
  }
}

function New-RoundedRectPath(
  [float]$x,
  [float]$y,
  [float]$width,
  [float]$height,
  [float]$radius
) {
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $diameter = $radius * 2

  $path.AddArc($x, $y, $diameter, $diameter, 180, 90)
  $path.AddArc($x + $width - $diameter, $y, $diameter, $diameter, 270, 90)
  $path.AddArc($x + $width - $diameter, $y + $height - $diameter, $diameter, $diameter, 0, 90)
  $path.AddArc($x, $y + $height - $diameter, $diameter, $diameter, 90, 90)
  $path.CloseFigure()

  return $path
}

function Draw-Worm(
  [System.Drawing.Graphics]$graphics,
  [int]$canvasSize,
  [double]$wormHeight,
  [System.Drawing.Color]$outerColor,
  [System.Drawing.Color]$innerColor,
  [System.Drawing.Color]$detailColor,
  [System.Drawing.Color]$highlightColor,
  [bool]$includeInner = $true,
  [bool]$includeFace = $true
) {
  $scale = $wormHeight / 44.0
  $wormWidth = 37.0 * $scale
  $offsetX = ($canvasSize - $wormWidth) / 2.0
  $offsetY = ($canvasSize - $wormHeight) / 2.0

  function SX([double]$x) {
    return [float]($offsetX + ($x * $scale))
  }

  function SY([double]$y) {
    return [float]($offsetY + ($y * $scale))
  }

  function SS([double]$value) {
    return [float]($value * $scale)
  }

  $outerBrush = New-Object System.Drawing.SolidBrush $outerColor
  $innerBrush = New-Object System.Drawing.SolidBrush $innerColor
  $detailBrush = New-Object System.Drawing.SolidBrush $detailColor
  $highlightBrush = New-Object System.Drawing.SolidBrush $highlightColor
  $antennaPen = New-Object System.Drawing.Pen $outerColor, (SS 0.8)
  $smilePen = New-Object System.Drawing.Pen $detailColor, (SS 0.8)
  $smilePen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
  $antennaPen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
  $antennaPen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
  $smilePen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
  $smilePen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round

  $graphics.FillEllipse($outerBrush, (SX 4), (SY 7), (SS 29), (SS 37))

  if ($includeInner) {
    $graphics.FillEllipse($innerBrush, (SX 7), (SY 11), (SS 23), (SS 30))
  }

  $graphics.DrawLine($antennaPen, (SX 12.4664), (SY 9.75534), (SX 9.57847), (SY 6.11778))
  $graphics.DrawLine($antennaPen, (SX 9.57847), (SY 6.11778), (SX 1.94533), (SY 2.05428))
  $graphics.DrawLine($antennaPen, (SX 24.2489), (SY 9.40717), (SX 27.1369), (SY 5.76961))
  $graphics.DrawLine($antennaPen, (SX 27.1369), (SY 5.76961), (SX 34.77), (SY 1.7061))

  $graphics.FillEllipse($outerBrush, (SX 34.0), (SY 0.0), (SS 3.0), (SS 3.0))
  $graphics.FillEllipse($outerBrush, (SX 0.0), (SY 0.0), (SS 3.0), (SS 3.0))

  if ($includeFace) {
    $graphics.FillEllipse($detailBrush, (SX 10.0), (SY 20.0), (SS 5.0), (SS 6.0))
    $graphics.FillEllipse($detailBrush, (SX 21.0), (SY 20.0), (SS 5.0), (SS 6.0))
    $graphics.FillEllipse($highlightBrush, (SX 12.0), (SY 20.0), (SS 2.0), (SS 3.0))
    $graphics.FillEllipse($highlightBrush, (SX 23.0), (SY 20.0), (SS 2.0), (SS 3.0))

    $smilePath = New-Object System.Drawing.Drawing2D.GraphicsPath
    $smilePath.AddBezier(
      (SX 13.0), (SY 30.0),
      (SX 16.0), (SY 31.8),
      (SX 20.0), (SY 31.8),
      (SX 23.0), (SY 30.0)
    )
    $graphics.DrawPath($smilePen, $smilePath)
    $smilePath.Dispose()
  }

  $outerBrush.Dispose()
  $innerBrush.Dispose()
  $detailBrush.Dispose()
  $highlightBrush.Dispose()
  $antennaPen.Dispose()
  $smilePen.Dispose()
}

$transparent = [System.Drawing.Color]::Transparent
$white = [System.Drawing.Color]::White
$outerGreen = [System.Drawing.ColorTranslator]::FromHtml("#69BE7F")
$innerGreen = [System.Drawing.ColorTranslator]::FromHtml("#94CCA3")
$eyeHighlight = [System.Drawing.ColorTranslator]::FromHtml("#D9D9D9")
$black = [System.Drawing.Color]::Black
$softBorder = [System.Drawing.ColorTranslator]::FromHtml("#D8EAD9")

$splashCanvas = New-Canvas 1024 $transparent
Draw-Worm $splashCanvas.Graphics 1024 880 $outerGreen $innerGreen $black $eyeHighlight $true $true
$splashCanvas.Bitmap.Save((Join-Path $assetsDir "worm-splash-native.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$splashCanvas.Graphics.Dispose()
$splashCanvas.Bitmap.Dispose()

$iconCanvas = New-Canvas 1024 $white
Draw-Worm $iconCanvas.Graphics 1024 760 $outerGreen $innerGreen $black $eyeHighlight $true $true
$iconCanvas.Bitmap.Save((Join-Path $assetsDir "worm-app-icon.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$iconCanvas.Graphics.Dispose()
$iconCanvas.Bitmap.Dispose()

$foregroundCanvas = New-Canvas 1024 $transparent
Draw-Worm $foregroundCanvas.Graphics 1024 760 $outerGreen $innerGreen $black $eyeHighlight $true $true
$foregroundCanvas.Bitmap.Save((Join-Path $assetsDir "worm-android-foreground.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$foregroundCanvas.Graphics.Dispose()
$foregroundCanvas.Bitmap.Dispose()

$faviconCanvas = New-Canvas 256 $transparent
$tilePath = New-RoundedRectPath 16 16 224 224 52
$tileBrush = New-Object System.Drawing.SolidBrush $white
$tilePen = New-Object System.Drawing.Pen $softBorder, 4
$faviconCanvas.Graphics.FillPath($tileBrush, $tilePath)
$faviconCanvas.Graphics.DrawPath($tilePen, $tilePath)
Draw-Worm $faviconCanvas.Graphics 256 198 $outerGreen $innerGreen $black $eyeHighlight $true $true
$faviconCanvas.Bitmap.Save((Join-Path $assetsDir "worm-favicon.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$tileBrush.Dispose()
$tilePen.Dispose()
$tilePath.Dispose()
$faviconCanvas.Graphics.Dispose()
$faviconCanvas.Bitmap.Dispose()
