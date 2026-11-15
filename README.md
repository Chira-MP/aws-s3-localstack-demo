# AWS S3 LocalStack Demo

## 1. Descrierea proiectului

Acest proiect demonstreaza integrarea si utilizarea serviciului Amazon S3 folosind LocalStack, Docker si JavaScript (Node.js).

Aplicatia permite gestionarea fisierelor prin intermediul unui serviciu S3 simulat local.

Operatiile implementate sunt:

- Crearea unui bucket.
- Incarcarea fisierelor.
- Listarea fisierelor.
- Descarcarea fisierelor.
- Stergerea fisierelor.
- Stergerea bucket-ului.

## 2. Tehnologii utilizate

- JavaScript
- Node.js
- npm
- Docker
- Docker Compose
- LocalStack
- Amazon S3
- AWS SDK for JavaScript v3

## 3. Cerinte preliminare

Pentru rularea proiectului sunt necesare:

- Node.js
- npm
- Docker Desktop
- Docker Compose

## 4. Instalarea proiectului

Clonati repository-ul:

    git clone ADRESA_REPOSITORY

Intrati in folderul proiectului:

    cd aws-s3-localstack-demo

Instalati dependentele:

    npm install

## 5. Pornirea LocalStack

Porniti containerul Docker:

    docker compose up -d

Verificati containerul:

    docker ps

Verificati starea LocalStack:

    Invoke-RestMethod http://localhost:4566/_localstack/health

## 6. Configurarea conexiunii S3

Aplicatia comunica cu LocalStack folosind endpoint-ul:

    http://localhost:4566

Configuratia utilizata:

- Region: us-east-1
- Access key: test
- Secret key: test
- Endpoint: http://localhost:4566

Aceste credentiale sunt utilizate exclusiv pentru mediul local de testare.

## 7. Utilizarea aplicatiei

### 7.1 Crearea unui bucket

    node src/index.js create

### 7.2 Incarcarea unui fisier

    node src/index.js upload uploads/document.txt

### 7.3 Listarea fisierelor

    node src/index.js list

### 7.4 Descarcarea unui fisier

    node src/index.js download document.txt

Fisierul descarcat va fi salvat in folderul downloads.

### 7.5 Stergerea unui fisier

    node src/index.js delete document.txt

### 7.6 Stergerea bucket-ului

Bucket-ul trebuie sa fie gol inainte de stergere.

    node src/index.js delete-bucket

## 8. Oprirea LocalStack

Pentru oprirea containerului:

    docker compose down

Datele persistente sunt pastrate in volumul Docker definit in configuratia Compose.

Pentru stergerea definitiva a volumului si a datelor persistente se poate utiliza:

    docker compose down -v

ATENTIE: ultima comanda sterge si datele persistente ale LocalStack.

## 9. Structura proiectului

    aws-s3-localstack-demo/
    |
    |-- src/
    |   |-- s3.js
    |   |-- index.js
    |
    |-- uploads/
    |   |-- document.txt
    |
    |-- docker-compose.yml
    |-- package.json
    |-- package-lock.json
    |-- README.md
    |-- .gitignore

## 10. Concluzii

Proiectul demonstreaza utilizarea serviciului Amazon S3 intr-un mediu local, prin intermediul LocalStack.

Prin implementarea aplicatiei au fost demonstrate operatiunile de creare, incarcare, citire, descarcare si stergere a obiectelor dintr-un bucket S3.

Utilizarea Docker si LocalStack permite testarea functionalitatilor AWS fara a necesita conectarea la infrastructura AWS reala.
