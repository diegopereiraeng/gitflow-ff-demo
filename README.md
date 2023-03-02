# FF Banking App Front - GITFLOW DEMO + FF

## GITFLOW DEMO

1 - Open the file [index.html](https://github.com/diegopereiraeng/gitflow-ff-demo/edit/dev/html/index.html) in dev branch

2 - Change the App title in line: 126 to whatever you want.

3 - Instead of commit direct to dev, please click in "Create a new branch for this commit and start a pull request"

4 - Fill the branch name with this name pattern "feature-<your git user>"

5 - Open a PR to dev using the link below. (dev branch should be selected in the left side as target branch, and your feature branch in the right as source branch)

[Open PR](https://github.com/diegopereiraeng/gitflow-ff-demo/compare) 

Wait for the deployment and access your app on http://ff.harness-demo.site/[YourGitUser]/index.html


## NEW SETUP

Go to Harness Cnfluence inside Sales Engineer search for FF Advanced Demo, inside Demo Blocks.

Yuo can find all you need.

Inside Software Delivery Demo Account, go to Banking Demo Project in Deployments.

Run the Onboarding Pipeline passing your github user.

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

