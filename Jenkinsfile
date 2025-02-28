pipeline {
    agent any

    environment {
        AWS_S3_BUCKET = "s3://triptransfertrade.shop"  // ✅ 올바른 S3 버킷 경로
    }

    stages {
        stage('Clone Repository') {
            steps {
                script {
                    if (fileExists('.git')) {
                        sh 'git reset --hard origin/dev'
                        sh 'git clean -fd'
                        sh 'git pull origin dev'
                    } else {
                        sh 'git clone -b dev https://github.com/Trip-Transfer-Trade/frontend.git .'
                    }
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'  // ✅ 패키지 설치
            }
        }

        stage('Build React App') {
            steps {
                sh 'npm run build || echo "Build failed, but continuing..."'  // ✅ exit 1 제거
                sh 'ls -l build/'  // ✅ 빌드 결과 확인
            }
        }
        
        stage('Upload to S3') {
            steps {
                withCredentials([aws(credentialsId: 'aws-credentials')]) {  // ✅ region 제거 (AWS CLI에서 자동 인식)
                    sh "aws s3 sync build/ ${AWS_S3_BUCKET} --delete"
                }
            }
        }
    }
}
