@echo off
cd /d "%~dp0"
where py >nul 2>nul
if %errorlevel%==0 (
  py -3 scripts\install-fonts.py
) else (
  python scripts\install-fonts.py
)
if errorlevel 1 (echo Font installation failed. Check the network and try again.) else (echo Fonts ready in assets\fonts.)
pause
