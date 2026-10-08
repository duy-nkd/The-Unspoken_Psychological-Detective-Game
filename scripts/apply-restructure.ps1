<#
.SYNOPSIS
  Apply restructure T-002 (one time): remove obsolete files, move new backend Java
  files from _migration/ into the Java package, then run npm install for the frontend.

.DESCRIPTION
  Why this script exists: the AI assistant can create/overwrite files in this repo
  but cannot delete or move files, and cannot write files nested deeper than
  7 folders (the Java package). New Java sources were therefore placed in
  _migration/ and this script moves them into place.

  Safe to re-run: when _migration/ no longer exists the script exits.

.PARAMETER DryRun
  Only print what would happen. Changes nothing.
.PARAMETER Force
  Skip the confirmation prompt.
.PARAMETER SkipInstall
  Do not run "npm install" in frontend/.

.EXAMPLE
  powershell -ExecutionPolicy Bypass -File scripts\apply-restructure.ps1 -DryRun
  powershell -ExecutionPolicy Bypass -File scripts\apply-restructure.ps1
#>
[CmdletBinding()]
param(
    [switch]$DryRun,
    [switch]$Force,
    [switch]$SkipInstall
)

$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root

function Write-Step([string]$Message) {
    Write-Host ''
    Write-Host "==> $Message" -ForegroundColor Cyan
}

function Remove-Obsolete([string]$RelativePath) {
    $full = Join-Path $Root $RelativePath
    if (-not (Test-Path -LiteralPath $full)) { return }
    if ($DryRun) {
        Write-Host "  [dry-run] delete $RelativePath"
    } else {
        Remove-Item -LiteralPath $full -Recurse -Force
        Write-Host "  deleted  $RelativePath"
    }
}

function Copy-Tree([string]$From, [string]$To) {
    Get-ChildItem -LiteralPath $From -Recurse -File | ForEach-Object {
        $relative = $_.FullName.Substring($From.Length).TrimStart('\', '/')
        $target = Join-Path $To $relative
        if ($DryRun) {
            Write-Host "  [dry-run] copy $relative"
        } else {
            New-Item -ItemType Directory -Force -Path (Split-Path -Parent $target) | Out-Null
            Copy-Item -LiteralPath $_.FullName -Destination $target -Force
            Write-Host "  copied   $relative"
        }
    }
}

# ---------------------------------------------------------------- checks
if (-not (Test-Path (Join-Path $Root 'PROJECT_MEMORY.md'))) {
    throw "Run this script from the repository (PROJECT_MEMORY.md not found in $Root)."
}
$Migration = Join-Path $Root '_migration'
if (-not (Test-Path $Migration)) {
    Write-Host '_migration/ not found -> restructure already applied. Nothing to do.' -ForegroundColor Green
    exit 0
}

$JavaRoot = Join-Path $Root 'backend\src\main\java\com\capstone\detectivegame'
$TestRoot = Join-Path $Root 'backend\src\test\java\com\capstone\detectivegame'

$Obsolete = @(
    # root: duplicate phaser dependency (frontend/package.json is the only one)
    'package.json',
    'package-lock.json',
    'node_modules',
    # frontend: replaced by app/, features/, shared/, styles/, game/{config,core,...}
    'frontend\src\App.jsx',
    'frontend\src\index.css',
    'frontend\src\api',
    'frontend\src\context',
    'frontend\src\pages',
    'frontend\src\components',
    'frontend\src\utils',
    'frontend\src\game\config.js',
    'frontend\src\game\entities',
    'frontend\src\game\managers',
    # backend: layer packages replaced by feature packages
    'backend\src\main\java\com\capstone\detectivegame\config',
    'backend\src\main\java\com\capstone\detectivegame\controller',
    'backend\src\main\java\com\capstone\detectivegame\dto',
    'backend\src\main\java\com\capstone\detectivegame\model',
    'backend\src\main\java\com\capstone\detectivegame\repository',
    'backend\src\main\java\com\capstone\detectivegame\service',
    # stale build output of the old packages
    'backend\target'
)

Write-Host 'Restructure T-002 will:' -ForegroundColor Yellow
Write-Host '  1. delete obsolete files/folders:'
$Obsolete | ForEach-Object { if (Test-Path (Join-Path $Root $_)) { Write-Host "       $_" } }
Write-Host '  2. move _migration\backend-main -> backend\src\main\java\com\capstone\detectivegame'
Write-Host '     move _migration\backend-test -> backend\src\test\java\com\capstone\detectivegame'
Write-Host '  3. delete _migration\'
if (-not $SkipInstall) { Write-Host '  4. npm install (frontend)' }

if (-not $DryRun -and -not $Force) {
    Write-Host ''
    Write-Host 'Tip: commit or stash your work first so you can review with "git status" / "git diff".'
    $answer = Read-Host 'Type YES to continue'
    if ($answer -ne 'YES') { Write-Host 'Cancelled.'; exit 1 }
}

# ---------------------------------------------------------------- 1. delete
Write-Step 'Removing obsolete files'
$Obsolete | ForEach-Object { Remove-Obsolete $_ }

# ---------------------------------------------------------------- 2. move Java
Write-Step 'Installing new backend sources'
Copy-Tree (Join-Path $Migration 'backend-main') $JavaRoot
if (Test-Path (Join-Path $Migration 'backend-test')) {
    Copy-Tree (Join-Path $Migration 'backend-test') $TestRoot
}

# ---------------------------------------------------------------- 3. cleanup
Write-Step 'Removing _migration'
Remove-Obsolete '_migration'

# ---------------------------------------------------------------- 4. npm install
if (-not $SkipInstall -and -not $DryRun) {
    Write-Step 'npm install (frontend)'
    Push-Location (Join-Path $Root 'frontend')
    try {
        npm install
        if ($LASTEXITCODE -ne 0) {
            Write-Warning 'npm install failed. If the error is ERESOLVE (peer dependency), retry: npm install --legacy-peer-deps'
        }
    } finally {
        Pop-Location
    }
}

# ---------------------------------------------------------------- next steps
Write-Step 'Done. Next steps:'
Write-Host '  git add --renormalize .                (apply .gitattributes line endings)'
Write-Host '  cd frontend; npm run check             (lint + format + test + build)'
Write-Host '  mysql ... < backend\src\main\resources\db\schema.sql   (see README: Khoi tao CSDL)'
Write-Host '  cd backend; mvn clean test'
