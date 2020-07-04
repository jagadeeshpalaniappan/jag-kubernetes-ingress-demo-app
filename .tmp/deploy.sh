# Build Docker Images (locally)
# eval $(minikube docker-env)

# set: namespace `book-store-ns` for the current context
# kubectl config set-context --current --namespace=app1-ns

# ------------------Upload: Latest Code to docker------------------------------

# Microservice Apps: (Node.js)
docker build ./apps/api-auth -t api-auth-img:v1.0.0
docker build ./apps/api-photo -t api-photo-img:v1.0.0
docker build ./apps/api-post -t api-post-img:v1.0.0
docker build ./apps/api-user -t api-user-img:v1.0.0

docker build ./apps/ui-app1-com -t ui-app1-com-img:v1.0.0
docker build ./apps/ui-blogs-app1-com -t ui-blogs-app1-com-img:v1.0.0
docker build ./apps/ui-photos-app1-com -t ui-photos-app1-com-img:v1.0.0


## NO-CACHE:
# docker build ./apps/ui-photos-app1-com -t ui-photos-app1-com-img:v1.0.0  --no-cache

# ------------------------------------------------

########################################################################################
kubectl apply --force -f ./kube-cluster-setup/1-setup-pv/
kubectl apply --force -f ./kube-cluster-setup/2-setup-db/
kubectl apply --force -f ./kube-cluster-setup/3-setup-apps/

# kubectl apply --force -f ./kube-cluster-setup/4-setup-ingress/1-setup-ingress-ctrl/traefik
# kubectl apply --force -f ./kube-cluster-setup/4-setup-ingress/1-setup-ingress-ctrl/traefik/setup-traefik-adminui-app

kubectl apply --force -f ./kube-cluster-setup/4-setup-ingress/2-setup-apps-ingress

########################################################################################


# ------------------Restart: Kube Pods------------------------------
# kubectl set image 
# deployment/api-user-dep api-user-pod-cont=api-user-img:v1.0.0 --record

kubectl rollout restart deployment/db-mongo-dep
kubectl rollout restart deployment/db-photo-mongo-dep
kubectl rollout restart deployment/db-post-mongo-dep
kubectl rollout restart deployment/db-user-mongo-dep

kubectl rollout restart deployment/api-auth-dep
kubectl rollout restart deployment/api-photo-dep
kubectl rollout restart deployment/api-post-dep
kubectl rollout restart deployment/api-user-dep

kubectl rollout restart deployment/ui-app1-com-dep
kubectl rollout restart deployment/ui-blogs-app1-com-dep
kubectl rollout restart deployment/ui-photos-app1-com-dep

echo "kubectl get pods"
kubectl get pods