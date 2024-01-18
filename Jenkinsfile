pipeline{
    agent any
    environment{
        NAME = 'OneShootUI'
        VERSION = '1.0.0'
        IMAGE = 'oneshootui'
    }

    stages{
        stage('Build'){
            steps{
                bat 'npm install'
            }
        }
        stage('Test'){
            steps{
                bat 'npm run test'
            }
        }
        stage('Build Docker Image'){
            steps{
                bat "docker build -t ${IMAGE}:${VERSION} ."
            }
        }
        stage('Push Docker Image'){
            steps{
                withCredentials([string(credentialsId: 'dockerhub', variable: 'DOCKERHUB')]){
                    bat "docker login -u ${DOCKERHUB}"
                    bat "docker push ${IMAGE}:${VERSION}"
                }
            }
        }
        stage('Deploy'){
            steps{
                //sh 'kubectl apply -f k8s/deployment.yaml'
                echo 'Deploying...[TODO]'
            }
        }
    }
}