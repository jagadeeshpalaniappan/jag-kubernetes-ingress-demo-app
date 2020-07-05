# Kubernetes (Node.js) Demo App (using Ingress)

This is a sample Kubernetes Demo App (using Ingress).

## Apps Summary:

### API Gateway:

- **Ingress** (nginx)

### UI Apps: (Frontend)

- app1.com (Node.js App)
- photos.app1.com (Node.js App)
- blogs.app1.com (Node.js App)

### MicroServices: (Backend)

- Auth API (Node.js App)
- Photo API (Node.js App)
- Post API (Node.js App)
- User API (Node.js App)

## Local Setup

### Step1: Machine Setup

```shell
# Install `minikube` (for Mac OS)
brew install minikube

# Start Minikube
minikube start --driver=hyperkit
```

### Step2: Build 'App' Docker Images

```shell
# Point to Local Docker Registry
###############################
eval $(minikube docker-env)
###############################

# Microservice Apps: (Node.js)
docker build ./apps/api-auth -t api-auth-img:v1.0.0
docker build ./apps/api-photo -t api-photo-img:v1.0.0
docker build ./apps/api-post -t api-post-img:v1.0.0
docker build ./apps/api-user -t api-user-img:v1.0.0

# UI Apps: (Node.js) // TODO: modify to React
docker build ./apps/ui-app1-com -t ui-app1-com-img:v1.0.0
docker build ./apps/ui-blogs-app1-com -t ui-blogs-app1-com-img:v1.0.0
docker build ./apps/ui-photos-app1-com -t ui-photos-app1-com-img:v1.0.0

# verify: docker images listed
docker images
```

### Step3: App Setup (Deploy docker images - in Kubernetes)

```shell
# create: nameSpace
kubectl create namespace app1-ns

# set: namespace `app1-ns` for the current context
kubectl config set-context --current --namespace=app1-ns

# check: namespace is set properly for the currentContext
kubectl config get-contexts

# create: all kubernetes objects (reqd for this project)
# [ deployments, pods, services ]
##########################################################################################################

# 1. setup: PersistentVolume
kubectl apply --force -f ./kube-cluster-setup/1-setup-pv/

# 2. setup: Database [Deployments & Services]
kubectl apply --force -f ./kube-cluster-setup/2-setup-db/

# 3. setup: App [Deployments & Services]
kubectl apply --force -f ./kube-cluster-setup/3-setup-apps/

# 4. setup: Traefik [Ingress Controller]
kubectl apply --force -f ./kube-cluster-setup/4-setup-ingress/1-setup-ingress-ctrl/traefik

# 5. setup: Traefik Admin App [Service & Ingress]
kubectl apply --force -f ./kube-cluster-setup/4-setup-ingress/1-setup-ingress-ctrl/traefik/setup-traefik-adminui-app

# 6. setup: HTTPS TLS Secret [Secret]
kubectl apply --force -f ./kube-cluster-setup/4-setup-ingress/2-setup-https-secret

# 7. setup: App [Ingress]
kubectl apply --force -f ./kube-cluster-setup/4-setup-ingress/3-setup-apps-ingress

##########################################################################################################

# check: all pods are running
kubectl get pods

# check: all objects
kubectl get all -n app1-ns

```

### Map `Ingress` service to `local` domain name (app1.com):

```shell
# copy: IP address (Note: if you dont see any address, wait for sometime and try again)
kubectl get ingress

#### Register 'app1.com' domain (locally)
# add domain names in host file (for local testing) & paste: ingress IP address
sudo vi /etc/hosts

# add host entires (paste your own IP)
192.168.64.2 app1.com
192.168.64.2 blogs.app1.com
192.168.64.2 photos.app1.com

# verify: your domain names added properly
cat /etc/hosts

# Open Browser
# verify: ingress 'subdomain' based routing
https://blogs.app1.com
https://blogs.app1.com/blogs
https://photos.app1.com
https://photos.app1.com/photos

# verify: ingress 'path' based routing
https://app1.com
https://app1.com/photos
https://app1.com/blogs

```

### How to generate to TLS certificate in Local ?

```shell
# DEMO-PURPOSE-ONLY: This is sefl-signed certificate, get your own 'TLS certificate' -from 3rd party - to use it in production
# generate: sample 'tls.key' and 'tls.crt' file
openssl req -newkey rsa:4096 -x509 -sha256 -days 365 -nodes -subj "/CN=app1.com" -keyout tls.key -out tls.crt

# copy & paste: the results to ui-app1--tls-secret.yaml
cat tls.crt | base64
cat tls.key | base64
```

### Build & Run (Docker Images) --without Kubernetes

```shell
# open: new terminal (dont run on the same minikube terminal)
# check: Docker Desktop is Running

# build: docker image
docker build -t testdocker-img:v1.0.0 ./

# view: docker image content
docker run -it testdocker-img:v1.0.0 sh
ls -l
exit

# run: docker image
docker run -it -p 9002:8080 testdocker-img:v1.0.0
# open: http://localhost:9002

# run: docker image (in detached mode)
docker run -d -p 9002:8080 testdocker-img:v1.0.0
# open: http://localhost:9002

# List All Process running
$ docker ps

# Print app output
$ docker logs <containerId>

```
