$token = "vcp_83kFFYlZiPPs42h1xEDmJwzrtxKJ7x2oZa7KmiZHEW2aBNadtZ3xdYmg"
$projectId = "prj_rWJ0S9vbrqKUXMKqXDXVb71CZPen"
$teamId = "team_IBqo9DcnNN37nX4xIo2OcSkI"

$envVars = @(
  @{ key = "NEXT_PUBLIC_SUPABASE_URL"; value = "https://fqrlagpreazuuuwravbi.supabase.co"; type = "encrypted" },
  @{ key = "NEXT_PUBLIC_SUPABASE_ANON_KEY"; value = "sb_publishable_UlzpRkv54ugTVI-JCNl0ZA_ZlQkeaNM"; type = "encrypted" },
  @{ key = "SUPABASE_SERVICE_ROLE_KEY"; value = "sb_secret_YdxxQBBCc8cnQVUzFFiZHg_N7of4uZh"; type = "encrypted" },
  @{ key = "CLAUDE_KEY"; value = "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"; type = "encrypted" },
  @{ key = "RESEND_API_KEY"; value = "re_WGAnjhqD_34kMSuG8rgxnWy9ZVVdx9WW4"; type = "encrypted" },
  @{ key = "CRON_SECRET"; value = "tBc8NEbqnUsLjyNZ1Xlpynv4J562KmBKgUWeDDrk"; type = "encrypted" }
)

$headers = @{
  "Authorization" = "Bearer $token"
  "Content-Type"  = "application/json"
}

foreach ($var in $envVars) {
  $body = @{
    key    = $var.key
    value  = $var.value
    type   = $var.type
    target = @("production", "preview", "development")
  } | ConvertTo-Json

  try {
    $response = Invoke-RestMethod -Method Post `
      -Uri "https://api.vercel.com/v10/projects/$projectId/env?teamId=$teamId" `
      -Headers $headers -Body $body
    Write-Output "Added: $($var.key)"
  } catch {
    $errMsg = $_.Exception.Message
    if ($_.ErrorDetails.Message) { $errMsg = $_.ErrorDetails.Message }
    Write-Output "Error with $($var.key): $errMsg"
  }
}
