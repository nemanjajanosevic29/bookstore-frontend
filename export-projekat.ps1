$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$outFile = Join-Path $root "frontend_kod.txt"

if (Test-Path $outFile) { Remove-Item $outFile }

# Dodati .jsx i .tsx za React fajlove
Get-ChildItem -Path $root -Recurse -Include *.html,*.ts,*.js,*.scss,*.css,*.jsx,*.tsx |
    Where-Object {
        $_.FullName -notmatch "\\node_modules\\" -and
        $_.FullName -notmatch "\\.git\\" -and
        $_.FullName -notmatch "\\dist\\" -and
        $_.FullName -notmatch "\\build\\" # Preskačemo build foldere specifične za React
    } |
    Sort-Object FullName |
    ForEach-Object {
        "--------------------------------------------------------------" | Out-File $outFile -Append -Encoding UTF8
        "FILE: $($_.FullName.Replace($root, ''))"                      | Out-File $outFile -Append -Encoding UTF8
        "--------------------------------------------------------------" | Out-File $outFile -Append -Encoding UTF8
        Get-Content $_.FullName                                          | Out-File $outFile -Append -Encoding UTF8
        "`n"                                                             | Out-File $outFile -Append -Encoding UTF8
    }