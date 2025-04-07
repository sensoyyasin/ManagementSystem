pipeline {
    agent any

    environment {
        GITHUB_TOKEN = credentials('Jenkins') 
    }

    stages {
        stage('Checkout') {
            steps {
                git credentialsId: 'Jenkins', url: 'https://github.com/sensoyyasin/ManagementSystem.git'
            }
        }

        stage('Build') {
            steps {
                sh 'mvn clean install'
            }
        }

        stage('Test') {
            steps {
                sh 'mvn test'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploy işlemi başlatılıyor...'
            }
        }
    }

    post {
        always {
            echo 'Pipeline işlemi tamamlandı.'
        }
    }
}
