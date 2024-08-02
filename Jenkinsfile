pipeline {
    agent any

    environment {
        DOCKER_IMAGE_NAME = 'h2t-coffee'
        DOCKER_TAG = 'latest'
    }

    stages {
        stage('Clone'){
            steps {
                git branch: 'main', credentialsId: 'github', url: 'https://github.com/tien00113/h2t-coffee-g6.git'
            }
        }

        stage('Build') {
            steps {
                script {
                    sh 'docker build -t ${DOCKER_IMAGE_NAME}:${DOCKER_TAG} .'
                }
            }
        }

        stage('Push image to dockerhub') {
            steps {
                withDockerRegistry(credentialsId: 'dockerhub', url: '') {
                    sh label: '', script: 'docker tag h2t-coffee:latest tien00113/h2t-coffee:latest'
                    sh label: '', script: 'docker push tien00113/h2t-coffee:latest'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh 'docker-compose up -d'
                }
            }
        }
    }

    post {
        always {
            mail bcc: '', 
                body: "Build pipeline đã hoàn tất.\n\n" +
                    "Dự án: ${env.JOB_NAME}\n" +
                    "Build số: ${env.BUILD_NUMBER}\n" +
                    "Kết quả: ${currentBuild.currentResult}\n" +
                    "Xem chi tiết: ${env.BUILD_URL}",
                cc: '', 
                from: '', 
                replyTo: '', 
                subject: "Jenkins Build Report: ${env.JOB_NAME} #${env.BUILD_NUMBER}", 
                to: 'tiennguyenhienvx@gmail.com'
        }
    }
}
