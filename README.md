# Kubernetes Microservice (Sample Node.js App)

This is a sample Book Store (Microservices) Application, This has

### API Gateway

- Ingress (nginx)

### MicroServices

- (**Ingress**)
- Auth API (Node.js App)
- Microservice: Photo API (Node.js App)
- Microservice: Post API (Node.js App)
- Microservice: User API (Node.js App)

### UI Apps

## Local Setup

### Step1: Machine Setup

```s
# Install `minikube` (for Mac OS)
brew install minikube

# Start Minikube
minikube start --driver=hyperkit

# Enable Ingress Controller in Minikube
minikube addons enable ingress

# check: Ingress Controller is enabled
minikube addons list

# check: Ingress Controller is running
# look: someting like this 'ingress-nginx-controller-xxx-yyy'
kubectl get pods -n kube-system

```

### Step2: App Setup (Build Docker Images)

```s
# Point to Local Docker Registry (VERY IMP)
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

```s
# create: nameSpace
kubectl create namespace app1-ns

# set: namespace `app1-ns` for the current context
kubectl config set-context --current --namespace=app1-ns

# check: namespace is set properly for the currentContext
kubectl config get-contexts

# create: all kubernetes objects (reqd for this project)
# [ deployments, pods, services ]
#####################################
kubectl apply -f ./kubernetes-setup/
#####################################

# check: all pods are running
kubectl get pods

# check: all objects
kubectl get all -n app1-ns

# check: all services
minikube service list

```

### Map `Ingress` service to `local` domain name (app1.com):

```s
# copy: IP address (Note: if you dont see any address, wait for sometime and try again)
kubectl get ingress

# add domain names in host file (for local testing) & paste: IP address
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

```s
# DEMO-PURPOSE-ONLY: This is sefl-signed certificate, get your own 'TLS certificate' -from 3rd party - to use it in production
# generate: sample 'tls.key' and 'tls.crt' file
openssl req -newkey rsa:4096 -x509 -sha256 -days 365 -nodes -subj "/CN=app1.com" -keyout tls.key -out tls.crt

# copy & paste: the results to ui-app1--tls-secret.yaml
cat tls.crt | base64
cat tls.key | base64
```
