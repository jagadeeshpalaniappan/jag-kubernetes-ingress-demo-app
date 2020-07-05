# Setup: Traefik Ingress (1.7)

## 1. Create NameSpace

```shell
eval $(minikube docker-env)

kubectl create namespace traefik1
kubectl config set-context --current --namespace=traefik1
kubectl config get-contexts

# 3. Add

```

## 2. Setup Ingress & Apps

```shell

##########################################
# 1. Create: Traefik Ingress
##########################################
# 1.1. apply: configs
kubectl apply -f ./yaml/1-setup-ingress

# 1.2 check: ingress pod is running
kubectl get pods -n kube-system

##########################################
# 2. Create: Traefik AdminUI App & All WebApps
##########################################
# 2.1. apply: configs
kubectl apply -f ./yaml/2-setup-apps

# 2.2 check: all apps pods are running
kubectl get pods



##########################################
# 3. Add 'local domain' into '/etc/hosts' file
##########################################
## 3.1 add: 'traefik-adminui.minikube'
echo "$(minikube ip) traefik-adminui.minikube" | sudo tee -a /etc/hosts

## 3.2 add: 'app1.minikube'
echo "$(minikube ip) app1.minikube" | sudo tee -a /etc/hosts
## 3.3 add: 'app2.minikube'
echo "$(minikube ip) app2.minikube" | sudo tee -a /etc/hosts
## 3.4 add: 'app3.minikube'
echo "$(minikube ip) app3.minikube" | sudo tee -a /etc/hosts

## 3.5 add: 'apphub.minikube'
echo "$(minikube ip) apphub.minikube" | sudo tee -a /etc/hosts



##########################################
# 4. Get: 'admin-port' & 'web-port'
##########################################
# 4.1 get: admin-port
kubectl describe svc traefik-ingress-svc -n kube-system
# ....
# NodePort: admin-port  32660/TCP
# ....

# 4.2 get: web-port
kubectl describe svc traefik-ingress-svc -n kube-system
# ....
# NodePort: web-port  30222/TCP
# ....

# or we can see both (admin-port & web-port) here
minikube service list

##########################################
# 4. Open: Admin UI & Apps in Browser
##########################################
# (NOTE: your port might different) // get it from 'step-3'

# 4.1 open: Traefik Admin UI
# http://traefik-adminui.minikube:<admin-port>/
http://traefik-adminui.minikube:32660/

# 4.2 open: App1
# http://app1.minikube:<web-port>/
http://app1.minikube:30222/

# 4.3 open: App2
# http://app2.minikube:<web-port>/
http://app2.minikube:30222/

# 4.4 open: App3
# http://app3.minikube:<web-port>/
http://app3.minikube:30222/


# 4.4 open: AppHub
# http://apphub.minikube:<web-port>/
# Apphub Home Page
http://apphub.minikube:30222

# Apphub (Other Sub Apps)
http://apphub.minikube:30222/app1/
http://apphub.minikube:30222/app2/
http://apphub.minikube:30222/app3/


```

For more details, Please read this link.

- [Link1](https://medium.com/kubernetes-tutorials/deploying-traefik-as-ingress-controller-for-your-kubernetes-cluster-b03a0672ae0c)
- [Link2](https://github.com/dusansusic/kubernetes-traefik) // TODO
