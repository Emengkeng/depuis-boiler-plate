#!/bin/sh
echo "running migrations....."
npm run migrate
echo "done"

echo "starting server....."
npm run pm2-dev 
