## FF Banking App Front

Control your features through Harness FF GUI.



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

