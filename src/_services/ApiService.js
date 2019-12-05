const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

const apiConfig = IS_DEVELOPMENT ? {
    protocol: 'http',
    host: 'localhost',
    port: 8080
} : {
    protocol: 'http',
    host: 'ec2-34-247-199-110.eu-west-1.compute.amazonaws.com',
    port: ''
}

// const apiConfig = {
//     protocol: 'http',
//     host: 'ec2-34-247-199-110.eu-west-1.compute.amazonaws.com',
//     port: ''
// }

const getPath = () => IS_DEVELOPMENT ? `${apiConfig.protocol}://${apiConfig.host}:${apiConfig.port}` : '';

export default class {
    static fetch(url, options = { headers: {} }) {
        if (!url) return;
        if (options.body) {
            options.body = JSON.stringify(options.body)
        }

        options.headers = options.headers || {};
        options.headers['Content-Type'] = 'application/json';
        //options.mode = 'no-cors';

        let token = window.localStorage.getItem('jwt');
        console.log('options.headers.authorization', options.headers)
        if (!options.headers.authorization) {
            //options.headers.authorization = token ? `Play ${token}`: '';
        }

        return fetch(`${getPath() + url}`, options).then(resp => resp.json()).catch(console.warn);
    }

    static loadConfigs() {
        if (IS_DEVELOPMENT) return;
        fetch('/configs')
            .then(resp => resp.json())
            .then(value => {
                apiConfig.port = value && value.PORT;
            })
            .catch(err => console.warn(err))
    }

    // static setToken(value) {
    //     value ? window.localStorage.setItem("jwt", value) : window.localStorage.removeItem("jwt")
    // }
}