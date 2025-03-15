pipeline {
    agent any

    environment {
        S3_ENV_FILE = "s3://my-ttt-env/.env"  // S3 환경 변수 파일 경로
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
        stage('Download and Apply Environment Variables') {
            steps {
                withCredentials([aws(credentialsId: 'aws-credentials')]) {
                    sh "aws s3 cp ${S3_ENV_FILE} .env"
                    sh "export $(grep -v '^#' .env | xargs)"
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
                sh 'npm run build'
            }
        }

        stage('Deploy to EC2') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'ec2-ssh-key', keyFileVariable: 'SSH_KEY', usernameVariable: 'EC2_SSH_USER')]) {
                    sh """
                    scp -r -i $SSH_KEY build/* $EC2_SSH_USER@${env.EC2_HOST}:${env.EC2_APP_PATH}/
                    """
                }
            }
        }

        stage('Restart Nginx') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'ec2-ssh-key', keyFileVariable: 'SSH_KEY', usernameVariable: 'EC2_SSH_USER')]) {
                    sh """
                    ssh -i $SSH_KEY $EC2_SSH_USER@${env.EC2_HOST} "sudo systemctl restart nginx"
                    """
                }
            }
        }
    }
}
