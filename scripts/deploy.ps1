# Optional DreamHost deploy. Credentials stay in the environment — never in git.
#
#   $env:GG_DEPLOY_HOST = "iad1-shared-b7-08.dreamhost.com"
#   $env:GG_DEPLOY_USER = "your-user"
#   $env:GG_DEPLOY_PATH = "/home/your-user/gourmetgastronomer.com"
#   npm run build
#   scp -r dist/* "${env:GG_DEPLOY_USER}@${env:GG_DEPLOY_HOST}:${env:GG_DEPLOY_PATH}/"
#
# Do not force HTTPS redirects until the certificate is valid.

Write-Host "This script does not store passwords. Use scp/rsync with your own keys or an env-provided session."
if (-not $env:GG_DEPLOY_HOST -or -not $env:GG_DEPLOY_USER -or -not $env:GG_DEPLOY_PATH) {
  Write-Error "Set GG_DEPLOY_HOST, GG_DEPLOY_USER, and GG_DEPLOY_PATH."
  exit 1
}
if (-not (Test-Path "dist")) {
  Write-Error "dist/ is missing. Run npm run build first."
  exit 1
}
Write-Host "Ready to copy dist/ to $env:GG_DEPLOY_USER@$env:GG_DEPLOY_HOST:$env:GG_DEPLOY_PATH"
Write-Host "Run your preferred scp/rsync command. This helper will not prompt for a password."
