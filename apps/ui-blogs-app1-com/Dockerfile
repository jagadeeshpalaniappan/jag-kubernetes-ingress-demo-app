FROM node:12-slim

WORKDIR /server


# ::: backend :::
# install: 'backend' dependecies
COPY ./backend/package*.json ./
RUN npm install
# copy: 'backend' code to 'workDir'
COPY ./backend .


# ::: frontend :::
# createDir: tmp/ui // TODO
RUN mkdir -p tmp/ui
# install: 'frontend' dependecies
COPY ./frontend/package*.json ./tmp/ui
COPY ./frontend/yarn.lock ./tmp/ui
RUN cd ./tmp/ui && yarn install

# copy: 'frontend' code to 'workDir/tmp/ui'
COPY ./frontend ./tmp/ui
RUN cd ./tmp/ui && yarn build

# copy: frontend 'build' to 'workDir'
RUN cp -r ./tmp/ui/build ./

EXPOSE 8080

# RUN npm run build
CMD npm run serve