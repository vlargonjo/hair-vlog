@echo off
echo Installing dependencies...
set NODE_PATH=E:\Node\node-v24.11.1-win-x64
set PATH=%NODE_PATH%;%PATH%
cd /d E:\hair-vlog
call "%NODE_PATH%\npm.cmd" install
pause

