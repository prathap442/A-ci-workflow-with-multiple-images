# Making Use of the Dockerfile.dev 

In this project under server folder

* When the dockerfile exists then in that we see a command called ["npm","run","dev"]. By doing this what happens is that we are running a development script in package.json under scripts key we have a json objecty with dev key which says to run nodemon .

* As we know that nodemon gives a autostart when something is being changed in the backend application to have a immediate reflection on the front face of the Backend App.




Here there is one important point to be noted as we have seperated react to interact from the frontend and get the hit requests from the nginx server . In nginx default.conf
we have to write something that prevents the application from loading .


```
upstream feclient {
  server feclient:3000;
}

upstream expressserver {
  server expressserver:5000;
}


server {
  listen 80;
  location / {
    proxy_pass http://feclient;
  }
  location /api {
    # here we rewrtie the request that comes to resolve /api/values/all to values/all
    # using the following regex
    rewrite /api/(.*) /$1 break;
    # the meaning to the above statement is that when the request comes with /api/v1 being prefixed
    # the request is boiled down to become /v1 to the upstream named beserver
    proxy_pass http://expressserver;
  }

  # this is the socket connection that brings the changes when the volumes are changed locally they get reflected immediately in the front page of the react .
  location /sockjs-node {
    proxy_pass http://feclient;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "Upgrade";
  }
}



```