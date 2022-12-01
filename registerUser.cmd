SET FIREBASE_AUTH_EMULATOR_HOST="localhost:9099"

REM mind that 'demo-' is a configurated prefix
SET GCLOUD_PROJECT="demo-project-id"

firebase emulators:start

node registerUser.js

REM checkout http://localhost:4000

REM return user id back