pipeline {
    agent any

    environment {
        AWS_S3_BUCKET = "s3://triptransfertrade.shop"  // S3 버킷 이름
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
                sh 'npm ci'  // CI/CD 환경에서는 npm install 대신 npm ci 사용
            }
        }

        stage('Build React App') {
            steps {
                sh 'npm run build || echo "Build failed" && exit 1'  // 빌드 실패 시 종료
                sh 'ls -l'  // 어떤 파일이 생성되었는지 확인
            }
        }
        
        stage('Upload to S3') {
            steps {
                withCredentials([aws(credentialsId: 'aws-credentials', region: 'ap-northeast-2')]) {
                    sh "aws s3 sync build/ ${AWS_S3_BUCKET} --delete"
                }
            }
        }
    }
}
