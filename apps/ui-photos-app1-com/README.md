# React App (without Express)

## Local Setup

```shell
npm install
npm start
```

## Docker Image (Local Setup)

```shell
# build: local image
docker build -f Dockerfile.local -t react-app-img:local ./

# run: local image
docker run -it --rm -p 3001:3000 react-app-img:local

# run: local image (with ***Live Reload***)
docker run -it --rm -p 3001:3000 -v ${PWD}:/app -v /app/node_modules -e CHOKIDAR_USEPOLLING=true react-app-img:local

# view: docker image content
docker run -it --rm react-app-img:local sh
cd /usr/share/nginx/html
ls
exit
```

## Docker Image (Production Setup)

```shell
# build: prod image
docker build -t react-app-img:prod .

# ----- verify: the prod image --------
# run: prod image and see app is running
docker run -it --rm -p 1337:80 react-app-img:prod

# view: docker image content
docker run -it --rm react-app-img:prod sh
cd /usr/share/nginx/html
ls
exit

```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
If we need more details about the docker setup [Visit](https://mherman.org/blog/dockerizing-a-react-app/).
