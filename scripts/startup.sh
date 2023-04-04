#!/bin/bash

if [ -z ${FFKEY+x} ]; then 
  echo "FF KEY is unset"; 
else 
  echo "FF KEY set to ${FFKEY}"; 
  sed -i -r "s/[a-z0-9]*-[a-z0-9]*-[a-z0-9]*-[a-z0-9]*-[a-z0-9]*/${FFKEY}/g" /usr/share/nginx/html/js/ff.js; 
fi;

cat /opt/scripts/nginxecs.conf >> /etc/nginx/nginx.conf.tmp
mv /etc/nginx/nginx.conf.tmp /etc/nginx/nginx.conf

nginx -c /etc/nginx/nginx.conf -g "daemon off;"
