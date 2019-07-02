#!/bin/sh
echo 'Post-recieve task is starting'
echo 'tavira-rss-reader.surge.sh' > dist/CNAME
cd dist && npx surge


