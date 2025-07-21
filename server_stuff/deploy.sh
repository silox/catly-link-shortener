#!/bin/bash
systemctl stop short_server.service
cd /data/gitclone || exit 1
rm -r "$(ls)" || exit 1
git clone https://gitlab-ci-token:"${1}"@gitlab.fi.muni.cz/xadamove/pb138-link-shortener.git || exit 1

cd pb138-link-shortener || exit 1

echo "NEXT_PUBLIC_SUPABASE_URL=${2}" > .env || exit 1
echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=${3}" >> .env || exit 1
echo "NEXT_PUBLIC_SUPABASE_SERVICE_KEY=${4}" >> .env || exit 1

yarn install || exit 1
yarn build || exit 1
systemctl start short_server.service
