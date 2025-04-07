pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/sensoyyasin/ManagementSystem.git', branch: 'main'
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
