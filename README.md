# site-words
Site Words Practice


## NGINX

```
server {
    server_name sw.nretnil.com;

    root /var/www/site-words;
    index index.html;

    location / {
            try_files $uri $uri/ =404;
    }
}
```