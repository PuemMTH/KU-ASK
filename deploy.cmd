@REM paramiter --pord or --dev

@echo off
setlocal
@REM Ex: deploy.cmd --prod 
@REM Ex: deploy.cmd --dev

set env=%1

if "%env%"=="" (
    set env=--dev
)

if "%env%"=="--prod" (
    @REM input Message
    echo "Deploy to Production"
    set /p Message=Enter Message Git: 
    git add .
    git commit -m "%Message%"
    git push origin main

    set env=--prod
)



echo %env%