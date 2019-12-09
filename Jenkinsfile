pipeline {

   agent any

   tools {nodejs "node"}

   stages {

        stage('Install') {
            steps{
                sh 'npm install'
            }
        }
        
        stage('Build') {
            steps{
                sh 'npm run build'
            }
        }
        
        stage('Deploy') {
            environment {
                BUCKET = "s3://auto-aid-adviser-front/"
                BUCKET_WITH_DNS = "s3://auto-aid-adviser.co.uk/"
                DIST = "./dist"
            }
            
            steps{
                sh 'aws s3 rm --recursive ${BUCKET}'
                sh 'aws s3 cp --recursive ${DIST} ${BUCKET}'

                sh 'aws s3 rm --recursive ${BUCKET_WITH_DNS}'
                sh 'aws s3 cp --recursive ${DIST} ${BUCKET_WITH_DNS}'
            }
        }
    }

    post {

        success {
            slackSend (color: '#00FF00', 
                       message: "SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})", 
                       channel: 'auto-aid-adviser-frontend')
        }

        failure {
            slackSend (color: '#FF0000', 
                       message: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})", 
                       channel: 'auto-aid-adviser-frontend')
        }
    }
}