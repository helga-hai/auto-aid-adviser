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
            steps{
                sh 'aws s3 cp --recursive ~/workspace/adviser-front-pipeline/dist s3://auto-aid-adviser-front/'
            }
        }
   }
}