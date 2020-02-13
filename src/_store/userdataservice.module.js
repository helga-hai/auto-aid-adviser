//Experemental Module

import { authHeader, router } from '../_helpers';
import { userService } from '../_services';
import axios from 'axios';

export const userdataservice = {
    namespaced: true,
    state: {
        personalPageData: null,
        types: null,
        brands: null,
        models: null,
        selectedModelId: null,
        currentIndex: null,
        cars: null,
        currentCar: null,




        images: null,




        // menuItem: null,

    },
    getters: {
        TYPES: state => {
            return state.types; //let name = this.$store.getters.types
        },
    },
    actions: {
        GET_TYPES: async(context, payload) => {
            console.log('GET_TYPES')
            const config = {
                method: 'get',
                url: userService.config.apiUrl + '/api/catalog/car/types',
                headers: authHeader()
            }
            let { data } = await axios(config);
            context.commit('SET_TYPES', data);
        },

        POST_USER_DATA: async(context, payload) => {

            console.log('GET_TYPES');
            const config = {
                method: 'post',
                url: userService.config.apiUrl + '/api/catalog/car/types',
                headers: authHeader()
            }
            let { data } = await axios(config);
            context.commit('SET_TYPES', data);
        },

        DELETE_USER_CAR: async(context, payload) => { // попередній перегляд щойно створеного обєкту

            const options = authHeader() ? { headers: authHeader() } : {};

            const urlWithCarID = userService.config.apiUrl + '/api/user/profile/car/' + payload;
            
            let { data } = await axios.delete( urlWithCarID, options );
            // context.commit('', data);
            userService.getAllUserData( 'api/user/profile/cars' )        
                .then(function(result){

                    console.log("CARS "+result);

                    return result })

                .then(result=>context.commit('setData',[ result ,'cars' ]));
        },

        EDIT_USER_CAR: async(context, payload) => {

            var
            currentCarID = payload.id;

            const urlEditCar = userService.config.apiUrl + '/api/user/profile/car';
            
            var
            myAuth = (function() {

                var
                t = localStorage.getItem('token');

                return ( t ) ? ('Bearer ' + t.split('"').join(' ') ) : '';
            })();       

            const options =  {
                method: 'put',
                headers: {'Authorization': myAuth},
                url: urlEditCar,
                data: payload
            }
            
            
            let { data } = await axios(options);

            context.commit('setData', [ data ,'currentCar' ]);
            
            userService.getAllUserData( 'api/user/profile/cars' )
                .then(function(result){

                    console.log("CARS "+result);

                    return result })

                .then(result => context.commit('setData',[ result ,'cars' ]));

            userService.getAllUserData(`api/user/profile/car/${currentCarID}`)
                .then(result => context.commit('setData',[ result ,'currentCar' ]));
        },

        EDIT_USER: async(context, payload) => {

            const urlEditUser = userService.config.apiUrl + '/api/user/profile';
            
            var
            myAuth = (function() {

                var
                t = localStorage.getItem('token');

                return ( t ) ? ('Bearer ' + t.split('"').join(' ') ) : '';
            })();       

            const options =  {
                method: 'put',
                headers: {'Authorization': myAuth},
                url: urlEditUser,
                data: payload
            }
            
            
            let { data } = await axios(options);

            context.commit('setData', [ data ,'personalPageData' ]);
            
            userService.getAllUserData( 'api/user/profile' )
                .then(function(result){

                    console.log("USER "+result);

                    return result })

                .then(result => context.commit('setData',[ result ,'personalPageData' ]));

        },

        GET_MULTIPART: async(context, carInfo ) => {

/* NEVER DO LIKE THIS
window.myfunction = function() {


    var
    bm = customHeader['Authorization'].split('"')[ 1 ];

    console.log('test');
    alert( bm );
    
    var
    file = document.getElementById('myfile');

    console.log( file )


    var
    fd = new FormData();
    fd.append('json', file.files[0], file.value );

    console.log( file.value )

    var
    xhr = new XMLHttpRequest();

    xhr.open('POST', userService.config.apiUrl + '/api/user/profile/car', 1 );

//    xhr.setRequestHeader('Content-Type', 'undefined' );
    xhr.setRequestHeader('Authorization', ['Bearer', bm ].join(' ') );

    xhr.send( fd );

    xhr.onerror = function ( e ) {

        console.error( xhr.statusText );
    };


    return false;
}
*/




console.log( JSON.stringify( carInfo.auto ) );
console.log(  carInfo.images[ 0 ] );

            var
            myAuth = (function() {

                var
                t = localStorage.getItem('token');

                return ( t ) ? ('Bearer ' + t.split('"').join(' ') ) : '';
            })();


            var
            fd = new FormData();
            // console.log(carInfo.images[ 0 ]);
            console.log(carInfo.images.length);

            for(let i = 0; i<carInfo.images.length;i++){

                fd.append('files', carInfo.images[ i ] );

                console.log(carInfo.images[ i ]);

            }
            // fd.append('files', carInfo.images[ 0 ] );
            fd.append('json', new Blob( [ JSON.stringify(  carInfo.auto  ) ], { type : 'application/json' } ) );

            //fd.append('filess[]', carInfo.images[0], "jdjgfcj" );
/*
            


var
photo = document.getElementById('carphoto')

for ( var i = 0; photo.files < 0; i++ ) {

    fd.append('files', photo.files[ i ], photo.value  );
}

if ( photo.files[ 0 ] ) {

            fd.append('files', photo.files[ 0 ], photo.value  );
}
*/


            var
            xhr = new XMLHttpRequest();

            xhr.open('POST', userService.config.apiUrl + '/api/user/profile/car', true );

            xhr.setRequestHeader('Authorization', myAuth );

            // xhr.setRequestHeader('Accept', 'application/json, */*' );

            // xhr.setRequestHeader('Content-Type', 'multipart/form-data' );

            xhr.send( fd );

            // xhr.onerror = function ( e ) {

            //     console.error( this.statusText );
            // };

            xhr.onreadystatechange = function(){

                if( xhr.readyState != 4 ) { return }

                if(xhr.status>301){                    

                    console.error( xhr.status + ': ' + this.responseText );

                }

                else{

            var resp = xhr.responseText;

            console.log( this.statusText );

            console.log( "RESP " + resp );

            userService.getAllUserData( 'api/user/profile/cars' )

            .then(function(result){

                    console.log("CARS "+result);

                    return result })

                .then(result=>context.commit('setData',[ result ,'cars' ]));

            // context.commit( 'SET_MULTIPART' , JSON.parse(this.responseText) );

                }
            };
            
            return false;

        },

        // getData(path) {




        // const requestOptions = {
        //     method: 'GET',
        //     headers: authHeader(),
        // };

        // return fetch(`${userService.config.apiUrl}/${path}`, requestOptions)
        //     .then(userService.handleResponse);

        // },
        // getAll({ commit }) {
        //     commit('getAllRequest');

        //     userService.getAll()
        //         .then(
        //             users => commit('getAllSuccess', users),
        //             error => commit('getAllFailure', error)
        //         );
        // }

        
        fieldsVal({ commit }, val) {

            commit('setData', val);
        }
    },

    mutations: {

        SET_TYPES: (state, payload) => {

            state.types = payload;

        },

        SET_MULTIPART: (state, payload)=>{

            state.cars.push(payload);

            console.log(payload);

        },

        setData( state, data ) {

            console.log( "DATA " + data[1] );
            console.log( data );

            let toState = data[1];

            state[toState] = data[0];

            console.log(state[toState]);

        },

    },

};