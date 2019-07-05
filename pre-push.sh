#!/bin/sh
echo 'Pre-push task is starting'
make build
echo 'tavira-rss-reader.surge.sh' > dist/CNAME
cd dist && npx surge


