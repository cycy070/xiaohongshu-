@echo off
cd /d "D:\360MoveData\Users\admin1\Documents\New project"
start "Yujian Local Server" cmd /k npm run dev
timeout /t 2 /nobreak >nul
start "" "http://127.0.0.1:4173"
