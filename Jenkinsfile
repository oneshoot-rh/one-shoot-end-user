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
        // stage('Build Docker Image'){
        //     when {
        //         expression { BRANCH =~ /(develop)-*([a-z0-9]*)/}
        //     }
        //     steps{
        //         bat "docker build -t ${IMAGE}:${VERSION} ."
        //     }
        // }
        stage('Building and Pushing Docker Image'){
            when {
                expression { BRANCH =~ /(develop)-*([a-z0-9]*)/}
            }
             environment {
                registry = 'https://hub.docker.com'
                registryCredential = 'dockerhub'
            }
            steps{
              script{
                 // Build your Docker image
                def app = docker.build("mounirelbakkali/myapp:${env.BUILD_NUMBER}")

                docker.withRegistry(registry, registryCredential) {
                    app.push()
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