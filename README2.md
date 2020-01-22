# this is required statement for having the sudo permissions
sudo: required


#before_install we basically need to run the test suit for the fe-client and to do this 
we need to make usage of the Dockerfile.dev because in the production we are just being provided with the build folder
So the necessary dependencies and all could not be got in the production Dockerfile as we do only
"npm run build" in production

# here the second argument in before_install specifies the file context
* prathap-react:fe-client-v1 is the prathap-react image with the version fe-client-v1
* ./client/Dockerfile.dev ---> specifies the dockerfile
* ./client/ ---> specifies the dockerfile context.
In .travis.yml
```
before_install:
  - docker build -t prathap-react:fe-client-v1 -f ./client/Dockefile.dev ./client/ 
```

> In .travis.yml
- Here if the scripts exit with a status code of other than 0 
- then after_success block wont be made to run
```
script:
# In this way the building of the images after the build of the test coverage is possible
  - docker run prathap-react:fe-client-v1 npm test -- --coverage
after_success:
  - docker build -t prathap/multi-client ./client
  - docker build -t prathap/multi-worker ./worker
  - docker build -t prathap/multi-server ./server
  - docker build -t prathap/multi-nginx  ./nginx
```







