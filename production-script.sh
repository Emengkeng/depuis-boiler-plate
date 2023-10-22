#!/bin/sh
#Run in production
echo "running migrations....."
npm run migrate
echo "done"

echo "starting server....."
npm run pm2  