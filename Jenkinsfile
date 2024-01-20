pipeline{
    agent any
    environment{
        NAME = 'OneShootUI'
        VERSION = '1.0.0'
        IMAGE = 'oneshootui'
        BRANCH = "${env.BRANCH_NAME}"
        TAG    = ""
        MAJOR_VERSION = 1
        MINOR_VERSION = 0
        PATCH_VERSION = 0
    }

    stages{
        stage('Get Current Version') {
            steps {
                script {
                    TAG  = env.GIT_BRANCH =~ /refs\/tags\/(.*)/ ? env.GIT_BRANCH[0][1] : null
                    echo "Current Tag: ${TAG}"
                    MAJOR_VERSION = TAG =~ /([0-9]*)\.([0-9]*)\.([0-9]*)/ ? TAG[0][1] : 1
                    MINOR_VERSION = TAG =~ /([0-9]*)\.([0-9]*)\.([0-9]*)/ ? TAG[0][2] : 0
                    PATCH_VERSION = TAG =~ /([0-9]*)\.([0-9]*)\.([0-9]*)/ ? TAG[0][3] : 0
                    echo "Current Version: ${MAJOR_VERSION}.${MINOR_VERSION}.${PATCH_VERSION}"
                }
            }
        }
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
        stage('push git tag'){
            steps{
                script{
                    def releaseType = determineReleaseType()
                    echo "Release Type: ${releaseType}"
                    updateVersion(releaseType)
                    bat "git push origin ${env.GIT_BRANCH}"
                }
            }
        }
        stage('Building and Pushing Docker Image'){
            stages{
                stage("MAJOR RELEASE"){
                    when {
                        expression { BRANCH =~ /(major-release)/}
                    }
                    environment {
                        registry = 'https://hub.docker.com'
                        registryCredential = 'docker-hub-up'
                    }
                    steps{
                        script{
                            // Build your Docker image
                            def app = docker.build("mounirelbakkali/myapp:${TAG}")
                            docker.withRegistry("", registryCredential) {
                                app.push()
                            }
                        }
                    }
                }
                stage("RELEASE"){
                    when {
                        expression { BRANCH =~ /(release)/}
                    }
                    environment {
                        registryCredential = 'docker-hub-up'
                    }
                    steps{
                        script{
                            // Build your Docker image
                            def app = docker.build("mounirelbakkali/myapp:${TAG}")

                            docker.withRegistry("", registryCredential) {
                                app.push()
                            }
                        }
                    }
                }
                stage('BUG Fix'){
                    when{
                        expression {BRANCH =~ /(bugfix)-*([a-z0-9]*)/}
                    }
                    environment {
                        registryCredential = 'docker-hub-up'
                    }
                    steps{
                        script{
                            // Build your Docker image
                            def app = docker.build("mounirelbakkali/myapp:${TAG}")

                            docker.withRegistry("", registryCredential) {
                                app.push()
                            }
                        }
                    }
                }
            }
            
        }
        stage('Deploy'){
            when {
                expression { BRANCH =~ /(release)/}
            }
            steps{
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
def determineReleaseType() {
        if (env.BRANCH_NAME.endsWith('major-release')) {
            return 'MAJOR'
        } else if (env.BRANCH_NAME.endsWith('release')) {
            return 'RELEASE'
        } else if (env.BRANCH_NAME =~ /(bugfix)-*([a-z0-9]*)/ ) {
            return 'BUGFIX'
        } else {
            return 'UNKNOWN'
        }
    }

    def updateVersion(releaseType) {
        script {
            if (releaseType == 'MAJOR') {
                MAJOR_VERSION += 1
                MINOR_VERSION = 0
                PATCH_VERSION = 0
            } else if (releaseType == 'RELEASE') {
                MINOR_VERSION += 1
                PATCH_VERSION = 0
            } else if (releaseType == 'BUGFIX') {
                PATCH_VERSION += 1
            }
            TAG =  "${MAJOR_VERSION}.${MINOR_VERSION}.${PATCH_VERSION}"                
        }
    }
