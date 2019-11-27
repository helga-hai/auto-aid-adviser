//import config from 'config';
import { authHeader, router } from '../_helpers';




const config = {
    apiUrl: 'http://localhost:8080'
};
export const userService = {
    regist,
    login,
    logout,
    getAll,
    successRegist,
};
///   REGISTRATION   /////

function regist(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    console.log('regist')
    console.log(user)
    return fetch(`${config.apiUrl}/api/user/register`, requestOptions)
        .then(handleResponse)
        .then(resolve => {
            console.log('requestOptions');
            console.log(requestOptions); //email password role
                // login successful if there's a jwt token in the response
                //if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                // localStorage.setItem('user', JSON.stringify(user));
                //}
            return resolve;
        });
}

function successRegist(){
    console.log("success:-)");
    router.push('/successRegister');
}

///   AUTHENTIFICATION   /////
function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`${config.apiUrl}/api/users/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            console.log('requestOptions')
            console.log(requestOptions) //email password
                // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    //console.dir(JSON.parse(response))
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            } else {
                //console.log('response.status', response.status)
                //if (response.status == 404) {
                // dispatch('alert/error', error, { root: true });
                console.log('data', data)
                const error = (data && data.message) || response.statusText;
                const errorStatus = (data && data.status) || response.status;
                console.log('error, errorStatus', error, errorStatus);
                
                return Promise.reject([error, errorStatus]);
                //}
            }

            // const error = (data && data.message) || response.statusText;
            // return Promise.reject(error);
        }

        return data;
    });
}