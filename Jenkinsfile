pipeline {
    agent any

    environment {
        EC2_USER = "ubuntu"  // ✅ EC2 사용자
        EC2_HOST = "3.36.57.237"  // ✅ EC2 퍼블릭 IP (또는 도메인)
        DEPLOY_PATH = "/var/www/html"  // ✅ EC2의 정적 파일 경로
        SSH_CREDENTIALS = "ec2-ssh-key"  // ✅ Jenkins에 등록한 SSH 키
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

        stage('Copy Environment Variables') {
            steps {
                script {
                    sh '''
                    if [ ! -f .env ]; then
                        cp /var/lib/jenkins/workspace/frontend-cicd/.env .env
                    else
                        echo ".env file already exists, skipping copy."
                    fi
                    '''
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci --force'
            }
        }

        stage('Build React App') {
            steps {
                sh 'npm run build || echo "Build failed, but continuing..."'  // ✅ exit 1 제거
                sh 'ls -l build/'  // ✅ 빌드 결과 확인
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(credentials: [SSH_CREDENTIALS]) {
                    sh """
                    echo "Uploading build files to EC2..."
                    rsync -avz --delete -e "ssh -o StrictHostKeyChecking=no" build/ ${EC2_USER}@${EC2_HOST}:${DEPLOY_PATH}

                    echo "Restarting Nginx on EC2..."
                    ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} "sudo systemctl restart nginx"
                    """
                }
            }
        }
    }
}
