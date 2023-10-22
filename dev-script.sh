#!/bin/sh
#Run in developement
echo "running migrations....."
npm run migrate
echo "done"

echo "starting server....."
npm run dev 
