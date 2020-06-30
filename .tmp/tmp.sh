# Build Docker Images (locally)
eval $(minikube docker-env)

# ------------------------------------------------

# Microservice Apps: (Node.js)
docker build ./apps/api-auth -t api-auth-img:v1.0.0
docker build ./apps/api-photo -t api-photo-img:v1.0.0
docker build ./apps/api-post -t api-post-img:v1.0.0
docker build ./apps/api-user -t api-user-img:v1.0.0

# UI Apps: (Node.js) // TODO: modify to React
docker build ./apps/ui-app1-com -t ui-app1-com-img:v1.0.0
docker build ./apps/ui-blogs-app1-com -t ui-blogs-app1-com-img:v1.0.0
docker build ./apps/ui-photos-app1-com -t ui-photos-app1-com-img:v1.0.0

# ------------------------------------------------

# set: namespace `book-store-ns` for the current context
kubectl config set-context --current --namespace=app1-ns

# check: namespace is set properly for the currentContext
kubectl config get-contexts

# create: all kubernetes objects (reqd for this project)
# [ deployments, pods, services ]
############################################
kubectl apply -f ./kubernetes-setup/
############################################

# check: all pods are running
kubectl get pods

# check: all objects
kubectl get all -n book-store-ns



# ------------------------------------------------

# List: All Services (NodePort urls)
minikube service list
# minikube service jag-api-gateway-service --url --namespace=book-store-ns



# Open the URL in browser
# sample: http://127.0.0.1:51517/hello
http://127.0.0.1:<YOUR-PORT>/hello


# ------------------------------------------------



kubectl logs xxxxxx
kubectl logs api-user-dep-9744f989b-pcrhb

kubectl apply -f ./kubernetes-setup/


# -------------------- Build & Run (Docker Images)----------------------------
docker build -t testdocker-img:v1.0.0 ./
docker run -it -p 9002:8080 testdocker-img:v1.0.0


# ------------------------------------------------

# Cleanup: Stop and remove all docker containers and images
# List all containers (only IDs)
docker ps -aq
# Stop all running containers
docker stop $(docker ps -aq)
# Remove all containers
docker rm $(docker ps -aq)
# Remove all images
docker rmi $(docker images -q)

# Remove <none> images
docker rmi $(docker images --filter "dangling=true" -q --no-trunc)




