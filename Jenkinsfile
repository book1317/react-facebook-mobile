pipeline {
    agent any
 
    tools {nodejs "nodeJs"}
 
    stages {
        stage('Cloning Git') {
            steps {
                git branch: 'master', url: 'https://github.com/book1317/react-facebook-mobile.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
                sh 'npm run report'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Archive') {
            steps {
                sh 'tar -cvzf latest.tar.gz ./build ./docker'
            }
        }
        stage('Upload') {
            steps {
                sh 'scp -i ~/.ssh/hello_world ./latest.tar.gz raweewat.n@35.247.128.88:./react-facebook'
            }
        }
        stage('Deploy') {
            steps {
                sh '''
                    ssh -i hello_world 35.247.128.88 '
                        cd ./react-facebook
                        tar xvzf latest.tar.gz
                        cd ./docker
                        docker-compose down
                        docker rmi bot-hr-web
                        docker image prune -f
                        docker-compose -f docker-compose.yml -f docker-compose-dev.yml up -d
                    '
                '''
            }
        }
    }
    post {
        always {
            publishHTML target: [
                allowMissing: false,
                alwaysLinkToLastBuild: false,
                keepAll: true,
                reportDir: 'coverage/lcov-report',
                reportFiles: 'index.html',
                reportName: 'Code Coverage Report'
            ]
            cobertura coberturaReportFile: '**/coverage/cobertura-coverage.xml'
        }
        success {
            notifyLINE('SUCCESS', false)
        }
        failure {
            notifyLINE('FAILED', false)
        }
    }
}

def notifyLINE(msg, isManual) {
    def token = 'yVtW69qYXVplTaUE0oVyrYJEt5vHO1VJxABaOzTMfu7'
    def url = 'https://notify-api.line.me/api/notify'
    def message = isManual == true ? msg : "Build cupid-web, result is ${msg}. \n${env.BUILD_URL}"
    def imageThumbnail = msg == 'FAILED' ? 'https://img.devrant.com/devrant/rant/r_166932_RE8p1.jpg' : ''
    def imageFullsize = msg == 'FAILED' ? 'https://img.devrant.com/devrant/rant/r_166932_RE8p1.jpg' : ''

    sh "curl ${url} -H 'Authorization: Bearer ${token}' -F 'message=${message}' -F 'imageThumbnail=${imageThumbnail}' -F 'imageFullsize=${imageFullsize}'"
}