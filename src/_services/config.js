function getConfig() {
    if (process.env.NODE_ENV === 'development') {
        return {
            apiUrl: 'http://localhost:8080'
        }
    } else if (process.env.NODE_ENV === 'production') {
        return {
            apiUrl: 'https://ec2-34-243-67-208.eu-west-1.compute.amazonaws.com'
        }
    }
}
export const config = getConfig()