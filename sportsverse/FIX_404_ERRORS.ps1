#!/usr/bin/env pwsh

# SportsVerse - Fix 404 JavaScript Bundle Errors
# This script clears the Next.js cache and rebuilds the project

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "SportsVerse: Fixing 404 JavaScript Bundle Errors" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Kill any running Next.js processes
Write-Host "[1] Stopping any running Next.js servers..." -ForegroundColor Yellow
Get-Process | Where-Object { $_.ProcessName -like "*node*" } | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 1
Write-Host "✓ Done" -ForegroundColor Green
Write-Host ""

# Step 2: Clear .next cache
Write-Host "[2] Clearing .next cache..." -ForegroundColor Yellow
if (Test-Path ".\.next") {
    Remove-Item -Recurse -Force ".\.next" -ErrorAction SilentlyContinue
    Write-Host "✓ .next directory removed" -ForegroundColor Green
} else {
    Write-Host "ℹ .next directory not found (already clean)" -ForegroundColor Gray
}
Write-Host ""

# Step 3: Clear node_modules cache (optional but recommended)
Write-Host "[3] Clearing npm cache..." -ForegroundColor Yellow
npm cache clean --force | Out-Null
Write-Host "✓ npm cache cleared" -ForegroundColor Green
Write-Host ""

# Step 4: Reinstall dependencies
Write-Host "[4] Reinstalling dependencies..." -ForegroundColor Yellow
if (Test-Path ".\package-lock.json") {
    Remove-Item ".\package-lock.json" -Force
}
npm install
Write-Host "✓ Dependencies reinstalled" -ForegroundColor Green
Write-Host ""

# Step 5: Rebuild the project
Write-Host "[5] Building Next.js project..." -ForegroundColor Yellow
npm run build
Write-Host "✓ Build complete" -ForegroundColor Green
Write-Host ""

# Step 6: Start development server
Write-Host "[6] Starting development server..." -ForegroundColor Yellow
Write-Host "Running: npm run dev" -ForegroundColor Cyan
Write-Host ""
npm run dev
