pipeline{
    agent any
    environment{
        NAME = 'OneShootUI'
        VERSION = '1.0.0'
        SERVICE_NAME = 'one-shoot-ui'
        BRANCH = "${env.BRANCH_NAME}"
        TAG    = ""
        MAJOR_VERSION = 1
        MINOR_VERSION = 0
        PATCH_VERSION = 0
        REGISTRY_CREDENTIALS = 'docker-hub-up'
        REGISTRY_REPO_NAME = "mounirelbakkali"
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
        stage('Building and Pushing Docker Image'){
                    when {
                        expression { BRANCH =~ /(major-release)/ || BRANCH =~ /(release)/ || BRANCH =~ /(bugfix)-*([a-z0-9]*)/}
                    }
                    steps{
                        script{
                            def releaseType = determineReleaseType()
                            echo "Release Type: ${releaseType}"
                            updateVersion(releaseType)
                            def app = docker.build("${REGISTRY_REPO_NAME}/myapp:${TAG}")
                            docker.withRegistry("", REGISTRY_CREDENTIALS) {
                                app.push()
                            }
                            bat """git tag -a v${TAG} -m "New Release" """
                            bat "git push origin v${TAG}"
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
                        bat "docker service update --image ${REGISTRY_REPO_NAME}/myapp:${TAG} ${SERVICE_NAME}"
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
