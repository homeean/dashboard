# homeean Dashboard

customize the original homee dashboard

## requirements
to serve the custom dashboard you need a webserver with php and composer installed

## installation

```bash
git clone https://github.com/homeean/dashboard.git
cd dashboard
composer install
mv example-config.json config.json
mv example-script.js script.js
mv example-style.css style.css
```

**update your webserver config**

```bash
// example for a new nginx site config on port 8022
// file /etc/nginx/sites-available/homeean_dashboard

server {
    listen 8022;

    root /var/www/html/dashboard;

    index index.html index.htm index.php;

    server_name homeean_dashboard;

    location / {
        try_files $uri $uri/ /index.php$is_args$args;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php7.0-fpm.sock;
    }
}
```

**update your config.json**
```json
{
  "homee_url": "http://...:7681/webapp",
  "netatmo_url": "http://...index.m3u8"
}
```
*the homee_url is required*

Open `http://yoururl` for your custom homee dashboard. Reload the page after your first login

## customizing
The homeean dashboard comes with a simple example. By changing the `script.js` and the `style.css` you can customize the view.

