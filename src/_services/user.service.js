//import config from 'config';
import { authHeader, router } from '../_helpers';


// const config = {
//     apiUrl: 'http://localhost:8080'
// };

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
const config = getConfig();
export const userService = {
    config,
    regist,
    login,
    logout,
    getAll,
    successRegist,
    getAllBusinessDate,

    activate,
    getAllUserData,
    postAllUserData,

};

//config()
console.log(config.apiUrl);

///   REGISTRATION   /////


function regist(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    console.log('regist');
    console.log(user);
    return fetch(`${config.apiUrl}/api/user/register`, requestOptions)
        .then(handleResponse)
        .then(resolve => {
            console.log('regist (user.service) requestOptions');
            console.log(requestOptions); //email password role
            // login successful if there's a jwt token in the response
            //if (user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            // localStorage.setItem('user', JSON.stringify(user));
            //}
            return resolve;
        });
}

function successRegist() {
    console.log("success:-)");
    router.push('/successRegister');
}

///   ACTIVATION   /////

function activate(k) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer'
        },
        body: ''
    };
    return fetch(`${config.apiUrl}/api/user/activate/${k}`, requestOptions)
        .then(handleResponse => {
            console.log(response)
            return handleResponse;
        })
        .then(resolve => {
            console.log('requestOptions');
            console.log(requestOptions);
            return resolve;
        });
}

///   AUTHENTIFICATION   /////
function login(email, password) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };
    console.log(requestOptions);
    return fetch(`${config.apiUrl}/api/user/login`, requestOptions)


    .then(handleResponse)
        .then(handleResponse => {
            console.log(JSON.stringify(response));
            return handleResponse;})
        .then(user => {

            console.log('requestOptions');
            console.log('requestOptions ' + requestOptions); //email password
            // login successful if there's a jwt token in the response

            if (user) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes


                console.log("USER_SERVICE " + JSON.stringify(user));

                if (JSON.stringify(user.status) == 401) {
                    console.log( "NO_USER" );
                    console.log( JSON.stringify(user.error) ); //:"Unauthorized"
                    console.log( JSON.stringify(user.message) );
                    return user.error;
                    //"message":"Authorization failed"
                    // return router.push('/');
                } else {

                    localStorage.setItem( 'token', JSON.stringify(user.token) );
                    localStorage.setItem( 'email', JSON.stringify(user.email) ); ////email///////////////////////////
                    localStorage.setItem( 'role', JSON.stringify(user.role) ); ////role///////////////////////////

                    console.log( JSON.stringify(user.role) );
                    console.log( "router.push user" + user.role );

                    //router.push('user');//not working
                    
                    return user;
                }
            }
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out

    // localStorage.removeItem('user');
    localStorage.removeItem('token');

    localStorage.removeItem('email');

    localStorage.removeItem('role');

    console.log( 'localStor: ' + localStorage );

}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader,
    };

    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function getAllUserData(path) {

    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };

    return fetch(`${config.apiUrl}/${path}`, requestOptions)
        .then(handleResponse)
        .then(data => {

            console.log( 'getAllUserData ' + JSON.stringify(data) );

            return data
        });

}

function postAllUserData(path, data) {

    let token = localStorage.getItem('token');

    let _data = JSON.stringify(data);

    const requestOptions = {
        method: 'POST',
        headers: {
            // 'Content-Type': 'multipart/form-data boundary=' + this.boundary,
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + token,
        },
        body: {
            "multiPartFile": {
                "json": _data,
            }
        },
    };

    console.log('userData');
    console.log(body);

    return fetch(`${config.apiUrl}/${path}`, requestOptions)
        .then(handleResponse)
        .then(data => {
            // console.log('getAllUserData ' + JSON.stringify(data));
            return data
        });

}



let content = null
    // this.$store.commit('templateB/fillallBusinesServises', content)


function getBusinesTemplate(path) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    console.log('getAllBusinessDate,')

    return fetch(`${config.apiUrl}/${path}`, requestOptions)
        .then(handleResponse)
        .then(response => {
            console.log("ssssssssssssssssssssssssssssssss" + JSON.stringify(response))
            return response
        })
        // console.log('getAllBusinessDate,')

    // return fetch(`${config.apiUrl}/${path}`, requestOptions).then(handleResponseGetData);

}

async function getAllBusinessDate(path) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    console.log('getAllBusinessDate,')

    return fetch(`${config.apiUrl}/${path}`, requestOptions)
        .then(handleResponseGetData)
        .then(response => {
            response = response.content
                // console.log(JSON.stringify(response))
            return response
        })
        // console.log('getAllBusinessDate,')

    // return fetch(`${config.apiUrl}/${path}`, requestOptions).then(handleResponseGetData);

}


function handleResponseGetData(response) {
    //console.dir(JSON.parse(response))
    //var r = response.then(res=>res);
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        // console.log('date: ' +data);

        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                //logout();
                //location.reload(true);
                console.log('у вас проблеми з токеном', response);
            } else {
                //console.log('response.status', response.status)
                //if (response.status == 404) {
                // dispatch('alert/error', error, { root: true });
                console.log('data', data);
                const error = (data && data.message) || response.statusText;
                const errorStatus = (data && data.status) || response.status;
                console.log('error, errorStatus', error, errorStatus);

                return Promise.reject([error, errorStatus]);
                //}
            }
        }
        console.log(data);
        console.log(data.content);
        let serviceTypesList = [];
        data.content.forEach(item => {
            if (serviceTypesList.indexOf(item.serviceType.name) < 0) {
                serviceTypesList.push(item.serviceType.name)
            }
        })
        console.log(serviceTypesList);
        var serviceTypesList2 = serviceTypesList.map(item => {
                let t = new Object()
                t[item] = []
                    //return { t: [] }
            })
            //let serviceTypesListObj = [];
        data.content.forEach(item => {
                //if (serviceTypesList.indexOf(item.serviceType.name) < 0) {
                // var tmp = []
                //     // serviceTypesList.forEach(el=>Object.keys(serviceTypesList))
                // for (let i = 0; i < serviceTypesList.length - 1; i++) {
                //     if (tmp.indexOf(serviceTypesList[i]) < 0)
                //         tmp.push(serviceTypesList[i])
                //         //console.log(Object.keys(serviceTypesList[i]))
                // }
                // console.log(tmp)
                //console.log(Object.keys(serviceTypesList))
                if (serviceTypesList.indexOf(item.serviceType.name) < 0) {
                    //console.log('')
                    //console.log(serviceTypesList, item.serviceType.name, serviceTypesList.indexOf(item.serviceType.name) < 0)
                    let tmpKey = {}
                    tmpKey[item.serviceType.name] = []
                    serviceTypesList.push(tmpKey)
                }
            })
            // console.log(serviceTypesList2);
            // ["run":{}, "disk", "engine", "gum", "body"]
        return data;
    });
};

function handleResponse(response) {
    console.log(response)
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        console.log(data);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                console.log('location', location)
                location.reload(true);
            } else {
                //console.log('response.status', response.status)
                //if (response.status == 404) {
                // dispatch('alert/error', error, { root: true });
                console.log('!response.ok data', data);
                const error = (data && data.message) || response.statusText;
                const errorStatus = (data && data.status) || response.status;
                console.log('error, errorStatus', error, errorStatus);

                return Promise.reject([error, errorStatus]);
                //}
            }

            // const error = (data && data.message) || response.statusText;
            // return Promise.reject(error);
        }
        console.log('handleResponse response.ok', data);
        return data;
    });
};