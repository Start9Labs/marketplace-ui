#!/bin/bash
set -e

echo "FILTER: build prod"
npm run build

echo "FILTER: git hash"
touch git-hash.txt
git log | head -n1 > git-hash.txt
mv git-hash.txt www

echo "FILTER: turn off mocks"
tmp=$(mktemp)
jq '.useMocks = false' config.json > "$tmp" && mv "$tmp" config.json

echo "FILTER: scp www"
scp www/*.js root@staging.start9labs.com:/var/www/html/marketplace.start9.com/
scp www/*.txt root@staging.start9labs.com:/var/www/html/marketplace.start9.com/
scp www/*.html root@staging.start9labs.com:/var/www/html/marketplace.start9.com/
scp www/*.css root@staging.start9labs.com:/var/www/html/marketplace.start9.com/
scp www/*.ttf root@staging.start9labs.com:/var/www/html/marketplace.start9.com/
# scp -r www/svg root@staging.start9labs.com:/var/www/html/marketplace.start9.com/

echo "FILTER: ssh restart nginx and tor"
ssh root@staging.start9labs.com "systemctl reload nginx && systemctl reload tor"

echo "FILTER: fin"
