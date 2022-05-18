# FF Banking App Front - GITFLOW DEMO + FF

## GITFLOW DEMO

1 - Open the file [ff.js](https://github.com/diegopereiraeng/gitflow-ff-demo/edit/master/html/js/ff.js)

2 - Make any changes like add a space into the code. (Simulate that a dev gonna change the code - adding a new feature or fixing or enhancing an existing one)

3 - Instead of commit direct to dev, please click in "Create a new branch for this commit and start a pull request"

4 - Fill the branch name with this name pattern "feature-<your git user>"

5 - Open a PR to dev using the link below. (dev branch should be selected in the left side as target branch, and your feature branch in the right as source branch)

[Open PR](https://github.com/diegopereiraeng/gitflow-ff-demo/compare) 

Wait for the deployment and access your app on http://ff.harness-demo.site/[YourGitUser]/index.html


## FF SETUP

1 - Go to Harness Software Delivery Demo Account

2 - Select the project GIT FLOW DEMO

3 - Go to Feature Flags Module

4 - Click in Environments

5 - Create an env with your github user name (ex: diegopereiraeng)

6 - Click on the env, create a key, and them create Client-Side token

7 - Save in a safe place this token, We gonna use in the demo at least for the first time...

8 - You are ready to run the demo.


## FF DEMO DEPLOY


1 - Open the file [ff.js](https://github.com/diegopereiraeng/gitflow-ff-demo/edit/master/html/js/ff.js)

2 - Change the key with your ff key created in the Setup Section.

3 - Instead of commit direct to dev, please click in "Create a new branch for this commit and start a pull request"

4 - Fill the branch name with this name pattern "feature-<your git user>"

5 - Open a PR to dev using the link below. (dev branch should be selected in the left side as target branch, and your feature branch in the right as source branch)

[Open PR](https://github.com/diegopereiraeng/gitflow-ff-demo/compare) 


Wait for the deployment and access your app on http://ff.harness-demo.site/<yourGitUser>/index.html

Build and run:
```
BUILD=230
docker build -t us.gcr.io/playground-243019/cv-demo-ui:$BUILD -f Dockerfile .
docker run -it -p 8000:80 -e STABLE_ENDPOINT=http://localhost:8080 -e CANARY_ENDPOINT=http://127.0.0.1:8081 us.gcr.io/playground-243019/cv-demo-ui:$BUILD
```

Push:
```
docker push us.gcr.io/playground-243019/cv-demo-ui:$BUILD
```

  
Demo
