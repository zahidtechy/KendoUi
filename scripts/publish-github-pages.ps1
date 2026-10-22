$ErrorActionPreference = 'Stop'

if ($env:GITHUB_REF -ne 'refs/heads/master') {
  throw "Refusing to publish from '$($env:GITHUB_REF)'."
}

function Invoke-Git {
  param([Parameter(ValueFromRemainingArguments = $true)][string[]]$GitArgs)
  & git @GitArgs
  if ($LASTEXITCODE -ne 0) {
    throw "git $($GitArgs -join ' ') failed with exit code $LASTEXITCODE"
  }
}

$browser = Join-Path (Join-Path 'dist' 'kendo-ui') 'browser'
$index = Join-Path $browser 'index.html'
if (-not (Test-Path $index)) {
  throw "Production build output was not found at $index"
}

$staging = Join-Path $env:RUNNER_TEMP 'github-pages'
if (Test-Path $staging) {
  Remove-Item -Recurse -Force $staging
}
New-Item -ItemType Directory -Path $staging | Out-Null
Copy-Item -Path (Join-Path $browser '*') -Destination $staging -Recurse -Force
Copy-Item -Path (Join-Path $staging 'index.html') -Destination (Join-Path $staging '404.html') -Force
New-Item -ItemType File -Path (Join-Path $staging '.nojekyll') -Force | Out-Null
Set-Content -Path (Join-Path $staging '.gitattributes') -Value '* -text' -Encoding ascii

if (Test-Path 'docs') {
  Remove-Item -Recurse -Force 'docs'
}
New-Item -ItemType Directory -Path 'docs' | Out-Null
Copy-Item -Path (Join-Path $staging '*') -Destination 'docs' -Recurse -Force
Copy-Item -Path (Join-Path $staging '.nojekyll') -Destination (Join-Path 'docs' '.nojekyll') -Force
Copy-Item -Path (Join-Path $staging '.gitattributes') -Destination (Join-Path 'docs' '.gitattributes') -Force

$env:GIT_AUTHOR_NAME = 'github-actions[bot]'
$env:GIT_AUTHOR_EMAIL = '41898282+github-actions[bot]@users.noreply.github.com'
$env:GIT_COMMITTER_NAME = $env:GIT_AUTHOR_NAME
$env:GIT_COMMITTER_EMAIL = $env:GIT_AUTHOR_EMAIL
Invoke-Git config core.autocrlf false
Invoke-Git add -A -- docs

$dirty = git status --porcelain -- docs
if ($LASTEXITCODE -ne 0) {
  throw "git status failed with exit code $LASTEXITCODE"
}
if (-not $dirty) {
  Write-Host 'GitHub Pages output is already up to date.'
  exit 0
}

$sha = if ($env:GITHUB_SHA) { $env:GITHUB_SHA } else { 'unknown' }
$messagePath = Join-Path $env:RUNNER_TEMP 'pages-commit-message.txt'
Set-Content -Path $messagePath -Value "publish github pages from $sha [skip ci]" -Encoding ascii
Invoke-Git commit -F $messagePath
Invoke-Git push origin 'HEAD:refs/heads/master'
