pipeline{
    agent any
    environment{
        NAME = 'OneShootUI'
        VERSION = '1.0.0'
        SERVICE_NAME = 'one-shoot-ui'
        BRANCH = "${env.BRANCH_NAME}"
        TAG    = ""
        DEPLOYENV = ""
        MAJOR_VERSION = 1
        MINOR_VERSION = 0
        PATCH_VERSION = 0
        REGISTRY_CREDENTIALS = 'docker-hub-up'
        REGISTRY_REPO_NAME = "mounirelbakkali"
        VERSION_TRACKER_SERVER = 'http://localhost:1212/api/v1/versioning'
    }

    stages{
         stage('Get Current Version'){
            parallel{
                stage('DEV'){
                    when{
                        expression{
                            return BRANCH =~ /(feature)-*([a-z0-9]*)/
                        }
                    }
                    environment{
                        DEPLOYENV = 'DEV'
                    }
                    steps{
                        script{
                            DEPLOYENV = 'DEV'
                            final String response = bat(script: "curl -s ${VERSION_TRACKER_SERVER}/${SERVICE_NAME}/${DEPLOYENV}", returnStdout: true).trim()
                            TAG = response.tokenize('\n').last().trim()
                            echo "---TAG: ${TAG}"
                        }
                    }
                }
                stage('PROD'){
                    when{
                        expression{
                            return BRANCH =~ /(release|bugfix)-*([a-z0-9]*)/ || BRANCH == 'develop'
                        }
                    }
                    environment{
                        DEPLOYENV = 'PROD'
                    }
                    steps{
                        script{
                            DEPLOYENV = 'PROD'
                            final String response = bat(script: "curl -s ${VERSION_TRACKER_SERVER}/${SERVICE_NAME}/${DEPLOYENV}", returnStdout: true).trim()
                            TAG = response.tokenize('\n').last().trim()
                            echo "---TAG: ${TAG}"
                        }
                    }
                }
            }
        }
        stage('Build'){
            steps{
                bat 'npm install --legacy-peer-deps'
            }
        }
        stage('Test'){
            steps{
                bat 'npm run test'
            }
        }
        stage('Building and Pushing Docker Image'){
                    when {
                        expression { BRANCH =~ /(major-release)/ || BRANCH =~ /(release)/ || BRANCH =~ /(bugfix)-*([a-z0-9]*)/}
                    }
                    steps{
                        script{
                            def releaseType = determineReleaseType()
                            echo "Release Type: ${releaseType}"
                            def app = docker.build("${REGISTRY_REPO_NAME}/${SERVICE_NAME}:${TAG}")
                            docker.withRegistry("", REGISTRY_CREDENTIALS) {
                                app.push()
                            }
                            // bat """git tag -a v${TAG} -m "New Release" """
                            // bat "git push origin v${TAG}"
                        }
                    }         
        }
         stage("Update Version"){
            steps{
                script{
                    def releaseType = determineReleaseType()
                    bat """curl -X POST -H \"Content-Type: application/json\" -d \"{\\\"serviceName\\\":\\\"${SERVICE_NAME}\\\",\\\"deploymentEnv\\\":\\\"${DEPLOYENV}\\\",\\\"versionPart\\\":\\\"${releaseType}\\\"}\" http://localhost:1212/api/v1/versioning"""        
                }
            }
        }
        stage('Deploy'){
            when {
                expression { BRANCH =~ /(major-release)/ || BRANCH =~ /(release)/ || BRANCH =~ /(bugfix)-*([a-z0-9]*)/}
            }
            steps{
                script{
                    docker.withRegistry("", REGISTRY_CREDENTIALS) {
                        //bat "docker service update --image ${REGISTRY_REPO_NAME}/myapp:${TAG} ${SERVICE_NAME}"
                    }
                }

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
        } else if (env.BRANCH_NAME.endsWith('release') || env.BRANCH_NAME == 'develop') {
            return 'MINOR'
        } else if (env.BRANCH_NAME =~ /(bugfix)-*([a-z0-9]*)/ ) {
            return 'PATCH'
        } else {
            return 'UNKNOWN'
        }
    }
