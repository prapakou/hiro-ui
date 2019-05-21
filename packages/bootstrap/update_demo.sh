yarn storybook:build

ssh ubuntu@prototypes.arago-demo.com rm /usr/share/nginx/html/*
ssh ubuntu@prototypes.arago-demo.com rm -r /usr/share/nginx/html/sb_dll/
ssh ubuntu@prototypes.arago-demo.com rm -r /usr/share/nginx/html/static/

rsync -aP .out/* ubuntu@prototypes.arago-demo.com:/usr/share/nginx/html/