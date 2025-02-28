pipeline {
    agent any

    environment {
        AWS_S3_BUCKET = "triptransfertrade.shop "  // S3 버킷 이름
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'dev, credentialsId: 'github-signin', url: 'https://github.com/Trip-Transfer-Trade/frontend.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build React App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Upload to S3') {
            steps {
                withAWS(credentials: 'aws-credentials') {
                    sh "aws s3 sync build/ s3://${AWS_S3_BUCKET} --delete"
                }
            }
        }
    }
}
