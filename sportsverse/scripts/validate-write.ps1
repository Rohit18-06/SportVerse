param(
  [Parameter(Mandatory = $true)]
  [string]$FilePath
)

if (-not (Test-Path -LiteralPath $FilePath)) {
  Write-Error "File not found: $FilePath"
  exit 1
}

$file = Get-Item -LiteralPath $FilePath
$extension = [System.IO.Path]::GetExtension($FilePath)

# Only validate .ts and .tsx files
if ($extension -notin '.ts', '.tsx') {
  Write-Host "Skipping non-TypeScript file: $FilePath"
  exit 0
}

$errors = @()

# Check 1: file size > 0
if ($file.Length -eq 0) {
  $errors += "ZERO_BYTES: $FilePath is 0 bytes"
}

# Check 2: ends with closing brace (optional trailing whitespace/newline)
$content = Get-Content -LiteralPath $FilePath -Raw
if ($content) {
  $trimmed = $content.TrimEnd()
  if (-not ($trimmed.EndsWith('}') -or $trimmed.EndsWith('>'))) {
    $errors += "NO_CLOSING_BRACE: $FilePath does not end with '}' or '>'"
  }
}

if ($errors.Count -gt 0) {
  Write-Warning "VALIDATION FAILED for $FilePath"
  foreach ($err in $errors) {
    Write-Warning "  $err"
  }
  exit 1
}

Write-Host "VALIDATION PASSED: $FilePath ($($file.Length) bytes)"
exit 0
