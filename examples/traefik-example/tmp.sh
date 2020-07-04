# https://medium.com/kubernetes-tutorials/deploying-traefik-as-ingress-controller-for-your-kubernetes-cluster-b03a0672ae0c

# Build Docker Images (locally)
###############################
eval $(minikube docker-env)
###############################

kubectl create namespace traefik1
kubectl config set-context --current --namespace=traefik1
kubectl config get-contexts

############################################
kubectl apply -f ./examples/traefik-example
############################################

kubectl get pods -n kube-system
# make sure ingress running

echo "$(minikube ip) traefik-ui.minikube" | sudo tee -a /etc/hosts



kubectl get deployments -n kube-system

kubectl -n kube-system logs traefik-ingress-6d94b789c4-5wzjs

kubectl rollout restart deployment/traefik-ingress -n kube-system



kubectl delete svc traefik-web-ui -n kube-system