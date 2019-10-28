export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        console.log('Authorization: Bearer user.token', user.token)
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}