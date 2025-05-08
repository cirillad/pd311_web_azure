pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/cirillad/pd311_web.git'
            }
        }
        stage('Build and Run') {
            steps {
                sh 'docker compose down'
                sh 'docker compose up -d --build'
            }
        }
        stage('Check containers') {
            steps {
                sh 'docker compose ps'
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished!'
        }
    }
}
