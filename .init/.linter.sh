#!/bin/bash
cd /home/kavia/workspace/code-generation/noteease-111353-7ff1fac4/frontend_notes_app
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

