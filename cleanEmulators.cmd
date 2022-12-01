
export FIRESTORE_EMULATOR_HOST="localhost:8083"

firebase emulators:exec "node cleanEmulators.js"

REM start the emulators since the command above shuts them down
REM firebase emulators:start
REM checkout http://localhost:4000