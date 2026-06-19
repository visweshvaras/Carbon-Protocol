@echo off
title G.A.I.A. Carbon Footprint Simulation
echo ===================================================
echo   G.A.I.A. PROJECT // CARBON LEDGER SIMULATION
echo ===================================================
echo.
echo [1/2] Launching Tactical Link in browser...
echo.

:: Start a temporary minimized command runner that waits 4 seconds for the server to spin up, opens the site, and exits
start /min cmd /c "timeout /t 4 /nobreak >nul && start http://localhost:3000"

echo [2/2] Starting Next.js Dev Server...
echo.
echo ---------------------------------------------------
echo  Server is starting! 
echo  Press Ctrl+C inside this window to exit.
echo ---------------------------------------------------
echo.

npm run dev
