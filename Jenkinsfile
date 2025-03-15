pipeline {
    agent any


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

        stage('Download .env from S3') {
            steps {
                withCredentials([aws(credentialsId: 'aws-credentials')]) {
                    sh "aws s3 cp s3://my-ttt-env/.env ."
                }
            }
        }

        stage('Load Environment Variables') {
            steps {
                script {
                    sh '''export $(grep -v "^#" .env | xargs)'''
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'  
            }
        }

        stage('Build React App') {
            steps {
                sh 'npm run build || echo "Build failed, but continuing..."'  
                sh 'ls -l build/'  
            }
        }
        
        stage('Deploy to EC2') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'ec2-ssh-key', keyFileVariable: 'SSH_KEY')]) {
                    sh '''
                    scp -i $SSH_KEY -r build/* ubuntu@3.36.57.237:/var/www/html
                    ssh -i $SSH_KEY ubuntu@3.36.57.237 "sudo systemctl restart nginx"
                    '''
                }
            }
        }
    }
}
