## Create Generic secrets for mysql database
kubectl create secret generic db-secret --from-literal=MYSQL_DATABASE=article --from-literal=MYSQL_USER=user  --from-literal=MYSQL_PASSWORD=password --from-literal=MYSQL_ROOT_PASSWORD=password --dry-run=client -oyaml 


kubectl create secret generic backend-api-secret --from-literal=MYSQL_DB_HOST=mysql-sts-svc --from-literal=MYSQL_DB_USER=user  --from-literal=MYSQL_DB_PASSWORD=password --from-literal=MYSQL_DB_NAME=article --dry-run=client -oyaml 


CREATE TABLE articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    body TEXT,
    date DATETIME DEFAULT CURRENT_TIMESTAMP
)

service endpoint
backendapi.default.svc.cluster.local
<servicename>.<namespace>.svc.cluster.local
backend-api-svc.default.svc.cluster.local
frontend-api-svc.default.s