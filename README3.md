This is the 3rd Readme.md
# Multi Container Deployments to AWS

This is the part from ci workflow section episode 3


# Why docker version is 2 In Dockerrun.aws.json?
 *  Specifies the version number as the value 2 for multicontainer Docker environments.

# containerDefinitions
  * An array of container definitions, detailed below.
  and the exampe of the container defintions is given below
  ``` 
    {
      "name": "wordpress",
      "links": [
        "mysql"
      ],
      "image": "wordpress",
      "essential": true,
      "portMappings": [
        {
          "containerPort": 80,
          "hostPort": 80
        }
      ],
      "memory": 500,
      "cpu": 10
    }
  ```


  * The task  definiation basically is nothing but giveing the dfeinations tot he container here the word press eimages is being aused and the port mapping s are being donek where the dontainer port of 80 is being passed to the hostport of 80
  
  * the essential attributes is indicating the dependency among various containers the dependency is explained in such a way that the if the container with the attribute essential is set to true then if that container shuts down then rest of all the containers to shut down. 
  





