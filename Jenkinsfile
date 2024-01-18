pipeline{
    agent any
    environment{
        NAME = 'OneShootUI'
        VERSION = '1.0.0'
        IMAGE = 'oneshootui'
        BRANCH = "${env.BRANCH_NAME}"
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
                expression { BRANCH =~ /(develop)-*([a-z0-9]*)/}
            }
            steps{
                bat "docker build -t ${IMAGE}:${VERSION} ."
            }
        }
        stage('Push Docker Image'){
            when {
                expression { BRANCH =~ /(develop)-*([a-z0-9]*)/}
            }
            steps{
              script{
                 docker.withRegistry('https://hub.docker.com', 'dockerhub') {
                    app.push("${env.BUILD_NUMBER}")
                }   
              }
            }
        }
        stage('Deploy'){
            when {
                expression { BRANCH =~ /(develop)-*([a-z0-9]*)/}
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