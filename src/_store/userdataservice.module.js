//Experemental Module

import { authHeader, router } from '../_helpers';
import { userService } from '../_services';
import axios from 'axios';

export const userdataservice = {
    namespaced: true,
    state: {
        personalPageData: {
            surname: null,
            name: null,
            phone: null,
        },
        types: null,
        brands: null,
        models: null,
        selectedModelId: null,
        currentIndex: null,
        car: null,
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

        GET_MULTIPART: async(context, carInfo ) => {
            // let customHeader = authHeader();
            // console.log(customHeader);
            // //customHeader['Content-Type'] = undefined;
            // console.log("THIS " + customHeader['Content-Type']);
            // console.log("THIS " + customHeader['Authorization']);
            // console.log(customHeader);
            // let formData = new FormData();
            // formData.append("test", '1');

            // formData.append("file", carPhoto);
            // formData.append("json", JSON.stringify(carInfo));
            // formData.append('properties', new Blob(JSON.stringify({
            //     "name": "root",
            //     "password": "root"                    
            // }), {
            //     type: "application/json"
            // }));

/*
            const config = {
                method: 'POST',
                url: userService.config.apiUrl + '/api/user/profile/car',
                headers: customHeader,
                data: 'a'//formData,
            };


            let { data } = await axios(config);
            context.commit('SET_MULTIPART', data);

*/


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

/*
            var
            carInfo = {

                "releaseYear": 2008,
                "individualCarNaming": "ljhvljhvlkhgvkl",
                "description": ".kjb.jn .j ,bj ",
                "carModel": {
                    "id": 2
                }

            };
*/






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

            console.log( resp );

            console.log( this.statusText );

            context.commit( 'setData' , [ 'car' , this.responseText ] );

            console.log( "RESP " + resp );

                }
            }
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
        getData(val) {
            return val;
        },
        // getAll({ commit }) {
        //     commit('getAllRequest');

        //     userService.getAll()
        //         .then(
        //             users => commit('getAllSuccess', users),
        //             error => commit('getAllFailure', error)
        //         );
        // }
        fieldsVal({ commit }, val) {
            // console.log(data);
            commit('setData', val);
        }
    },

    mutations: {
        SET_TYPES: (state, payload) => {
            state.types = payload;
        },
        SET_MULTIPART: (state, payload)=>{

            state.car = payload;
            console.log(payload)

        },
        setData( state, data ) {
            console.log( "DATA " + data[1] );
            console.log( data );
            let toState = data[1];
            state[toState] = data[0];
            console.log(state[toState]);
        },

        // setData(state, resp){
        //     return state.user_data.role.resp.role = resp.role;
        // {
        //     id: resp.id,
        //     role: resp.role,
        //     email: resp.email,
        // }

    },
    // getAllRequest(state) {
    //     state.all = { loading: true };
    // },
    // getAllSuccess(state, users) {
    //     state.all = { items: users };
    // },
    // getAllFailure(state, error) {
    //     state.all = { error };
    // }
    // }
};