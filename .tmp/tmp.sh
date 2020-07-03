# Build Docker Images (locally)
eval $(minikube docker-env)

# set: namespace `book-store-ns` for the current context
kubectl config set-context --current --namespace=app1-ns

# check: namespace is set properly for the currentContext
kubectl config get-contexts



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

docker build ./apps/ui-photos-app1-com -t ui-photos-app1-com-img:v1.0.0  --no-cache

# ------------------------------------------------

# create: all kubernetes objects (reqd for this project)
# [ deployments, pods, services ]
############################################
kubectl apply -f ./k8s-cluster-setup/
############################################

# check: all pods are running
kubectl get pods

# check: all objects
kubectl get all -n book-store-ns


kubectl set image deployment/ui-photos-app1-com-dep www=ui-photos-app1-com-img:v1.0.0
docker run -it --rm ui-photos-app1-com-img:v1.0.0 sh

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

kubectl apply -f ./k8s-cluster-setup/


# -------------------- Build & Run (Docker Images)----------------------------
docker build -t testdocker-img:v1.0.0 ./
docker run -it -p 9002:8080 testdocker-img:v1.0.0

# Dockerizing Create React App
https://mherman.org/blog/dockerizing-a-react-app/

# build: prod image
docker build -t react-app-img:prod .
# run: prod image
docker run -it --rm -p 1337:80 react-app-img:prod


# build: local image
docker build -f Dockerfile.local -t react-app-img:local .

# view: docker image content
docker run -it react-app-img:prod sh

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




# Delete All
kubectl delete --all deployments --namespace=app1-ns
kubectl delete --all pods --namespace=foo
for each in $(kubectl get ns -o jsonpath="{.items[*].metadata.name}" | grep -v kube-system);
do
  kubectl delete ns $each
done


# Delete PV (not terminating)
kubectl delete --all pv
kubectl delete --all pvc

kubectl get pv | tail -n+2 | awk '{print $1}' | xargs -I{} kubectl patch pv {} -p '{"metadata":{"finalizers": null}}'
kubectl get pvc | tail -n+2 | awk '{print $1}' | xargs -I{} kubectl patch pvc {} -p '{"metadata":{"finalizers": null}}'