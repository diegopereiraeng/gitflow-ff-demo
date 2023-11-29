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
# Using Github Pages to host this app

1. Fork dev branch
2. Click in Settings (inside forked repo)
3. In left menu (Code and Automation), click in Pages
4. Source: Deploy from branch and Branch: dev , /(root)
5. change anything in code (could be add a space in anyfile), and commit to publish the app
6. Now you app is acessible from: https://your-git-user.github.io/gitflow-ff-demo/html/index.html

# importing Lab App Flags into your Harness Account inside a Project

insinde folder flags_json_export, run the script

install dependencies of python3 script:

```
pip3 install -r flags_json_exports/requirements.txt
```

export variables where you want to create flags:
```
export API_KEY="YOUR_API_KEY"
export ACCOUNT_IDENTIFIER="YOUR_ACCOUNT_IDENTIFIER"
export ORG_IDENTIFIER="YOUR_ORG_IDENTIFIER"
export PROJECT_IDENTIFIER="YOUR_PROJECT_IDENTIFIER"

python3 flag_creation.py
```

