<img src="https://travis-ci.org/prathap442/A-ci-workflow-with-multiple-images.svg?branch=master" alt="build:passed">


![Build Status](https://travis-ci.org/prathap442/A-ci-workflow-with-multiple-images.svg?branch=master" alt="build:passed)

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



* Pushing up of the multi-docker-images to the github makes the task verylate for me to figure being just one syntax error that played me to get fixed for another 5 days.

* At first i would like to place my build log that i got from the `travis` and it has been shown in the travisbuild.log.


Now let us revise on some of the things on the travis.yml file
```
before_install:
  - echo "$DOCKER_PASSWORD"
  - echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_ID" --password-stdin
  - docker build -t prathap-react/fe-client-v1 -f ./client/Dockerfile.dev ./client/
```

Now the echo "$DOCKER_PASSWORD" just tries to display the password

Command explanation
-----

```
  $ echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_ID" --password-stdin
```
Here the initialized DOCCKER_PASSWORD global variable in the environment is being used when the docker login -u <DOCKERID> is being used
Now instead of asking the password we can directly make the terminal to understand the password without asking us during the travis build

```
  $ echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_ID" --password-stdin
```
Now the last command in the before_install is also being explained as:
```
  $  docker build -t prathap-react/fe-client-v1 -f ./client/Dockerfile.dev ./client/
```
Now the image built is being using Dockerfile.dev because we need to run the test cases in the Dockerfile.dev as the reactjs is available there and then but when we push the things to the production at that time we cannot because the only build file which contains html and javascript is only available to us

Now the image build with the tag `prathap-react/fe-client-v1` is utilised for the sake of the testing and the testing can be done with the command.

```
  $ docker run prathap-react/fe-client-v1 npm test -- --coverage
```

Now once we cover the test cases then we can proceed further in building the images and then pushing all the images to the users dockerhub

```
after_success:
  - docker build -t prathapdocker442/multi-client ./client
  - docker build -t prathapdocker442/multi-worker ./worker
  - docker build -t prathapdocker442/multi-server ./server
  - docker build -t prathapdocker442/multi-nginx  ./nginx
  - docker push prathapdocker442/mutli-client
  - docker push prathapdocker442/multi-worker
  - docker push prathapdocker442/multi-server
  - docker push prathapdocker442/multi-nginx
```

