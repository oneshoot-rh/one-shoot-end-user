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
            environment{
                DOCKERHUB_CREDENTIALS = credentials('dockerhub')
            }
            steps{
                bat "docker login -u ${DOCKERHUB_CREDENTIALS_USR} -p ${DOCKERHUB_CREDENTIALS_PSW}"
                bat "docker tag ${IMAGE}:${VERSION} ${DOCKERHUB_CREDENTIALS_USR}/${IMAGE}:${VERSION}"
                bat "docker push ${DOCKERHUB_CREDENTIALS_USR}/${IMAGE}:${VERSION}"
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