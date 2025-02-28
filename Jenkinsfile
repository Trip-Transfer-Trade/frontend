pipeline {
    agent any

    environment {
        AWS_S3_BUCKET = "triptransfertrade.shop"  // S3 버킷 이름
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'dev', credentialsId: 'github-signin', url: 'https://github.com/Trip-Transfer-Trade/frontend.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'  // CI/CD 환경에서는 npm install 대신 npm ci 사용
            }
        }

        stage('Build React App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Upload to S3') {
            steps {
                withCredentials([aws(credentialsId: 'aws-credentials', region: 'ap-northeast-2')]) {
                    sh "aws s3 sync build/ s3='${AWS_S3_BUCKET}' --delete"
                }
            }
        }
    }
}
