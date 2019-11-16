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
                DIST = "./dist"
            }
            
            steps{
                sh 'aws s3 rm --recursive ${BUCKET}'
                sh 'aws s3 cp --recursive ${DIST} ${BUCKET}'
            }
        }
   }
}