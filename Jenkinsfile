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

        stage('Deploy') {
            steps {
                script {
                    sh 'docker-compose up -d'
                }
            }
        }
    }

    post {
        success {
            mail to: 'your-email@example.com',
                 subject: "Build Success",
                 body: "The build and deployment of ${DOCKER_IMAGE_NAME} was successful."
        }
        failure {
            mail to: 'your-email@example.com',
                 subject: "Build Failed",
                 body: "The build and deployment of ${DOCKER_IMAGE_NAME} failed."
        }
    }
}
