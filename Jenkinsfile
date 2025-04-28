pipeline {
    agent any

    environment {
        GITHUB_TOKEN = credentials('github-token')
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/imksvk/docker_project', credentialsId: 'github-token'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t myntra_clone .'
                }
            }
        }

        stage('Run Docker Image') {
            steps {
                script {
                    // Stop and remove the old container (if exists)
                    sh 'docker rm -f myntra_clone || true'

                    // Run the new container
                    sh 'docker run -d -p 8085:8080 --name myntra_clone myntra_clone'
                }
            }
        }
    }

    post {
        success {
            echo 'Build and deployment succeeded!'
        }
        failure {
            echo 'Build or deployment failed!'
        }
    }
}
