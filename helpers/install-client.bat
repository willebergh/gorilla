@echo off

cd ..\client
npm link | more
echo Installation Complete
cd ..\helpers
pause