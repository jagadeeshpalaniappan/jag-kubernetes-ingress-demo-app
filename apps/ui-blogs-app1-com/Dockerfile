# ----------- 'build' environment (will be discarded) -----------
FROM node:13.12.0-alpine as build
WORKDIR /app
# ENV PATH /app/node_modules/.bin:$PATH
COPY ./frontend/package*.json ./
RUN npm install --silent
# do we need this step?
RUN npm install react-scripts@3.4.1 -g --silent
COPY ./frontend/ ./
RUN npm run build

# ----------- 'production' environment -----------
FROM node:8-slim
WORKDIR /server

# we only need 'build' directory
COPY --from=build /app/build ./public

COPY ./backend/package*.json ./
RUN npm install

COPY ./backend/ ./

EXPOSE 8080
CMD npm run serve