pipeline{
    agent any
    environment{
        NAME = 'OneShootUI'
        VERSION = '1.0.0'
        IMAGE = 'oneshootui'
        BRANCH = 'none'
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
            when {
                expression { BRANCH =~ /(devlop)-*([a-z0-9]*)/}
            }
            steps{
                bat "docker build -t ${IMAGE}:${VERSION} ."
            }
        }
        stage('Push Docker Image'){
            when {
                expression { BRANCH =~ /(devlop)-*([a-z0-9]*)/}
            }
            steps{
                withCredentials([string(credentialsId: 'dockerhub', variable: 'DOCKERHUB')]){
                    bat "docker login -u ${DOCKERHUB}"
                    bat "docker push ${IMAGE}:${VERSION}"
                }
            }
        }
        stage('Deploy'){
            when {
                expression { BRANCH =~ /(devlop)-*([a-z0-9]*)/}
            }
            steps{
                //sh 'kubectl apply -f k8s/deployment.yaml'
                echo 'Deploying...[TODO]'
            }
        }
    }
    post{
        always{
            cleanWs()
        }
    }
}