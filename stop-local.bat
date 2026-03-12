@echo off
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :4173') do (
  taskkill /PID %%a /F >nul 2>nul
)
echo Local server on port 4173 has been stopped.
