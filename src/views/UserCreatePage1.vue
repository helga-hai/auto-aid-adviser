<template>
    <user-layout :email = email()>
        <div class="registrStep1">
            <h1>Особисті дані</h1>
            <form>
                <div class="registrStep1__address">
                    
                    <div class="auto-complete-input" slot="acompl" v-if="isDone">
                        <vue-google-autocomplete 
                            ref="vAutoComplete"
                            :country="['ua']"
                            id="autocompletePannel"
                            classname="search-input home-input"
                            placeholder="enter the address"
                            :enableGeolocation="enableGeolocation"
                            v-on:placechanged="getAddressData"
                        ></vue-google-autocomplete>
                        {{sendObject}}<br><br>
                    </div>
                    <!-- <h3 class="title is-4">Start typing an address and below you will see found result,
                        <a v-on:click="$refs.vAutoComplete.geolocate()">or force current location</a>
                    </h3> -->

                </div>
                    <label>Контактні дані</label>
                    <input type="text" name="surname" id="surname" placeholder="Прізвище">
                    <input type="text" name="name" id="name" placeholder="Ім'я">
                    <input type="text" name="phone" id="phone" placeholder="Телефон">
                    <input type="e-mail" name="e-mail" id="e-mail" placeholder="e-mail" :value='email()'>
                    <div class="photo">
                    <label>Додати аватар</label>
                </div>

                <label>Змінити пароль</label>
                <input type="password" name="oldPassword" id="oldPassword" placeholder="Існуючий пароль">
                <input type="password" name="newPassword" id="newPassword" placeholder="Новий пароль">
                <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Підтвердження нового паролю">

                <div class="registrStep1__buttons">

                    <input type="submit" value="Зберегти" class="registrStep1__primaryButton">    
                </div>
            </form>
        </div>

    </user-layout>
</template>

<script>
import UserLayout from "@/layouts/UserLayout";


// import TravelMap from '@/components/TravelMap.vue';
// import GoogleMapLoader from "../components/GoogleMapLoader";
// import GoogleMapMarker from "../components/GoogleMapMarker";
// import { mapSettings } from "@/constants/mapSettings";
// import VueGoogleAutocomplete from 'vue-google-autocomplete';

export default {
    name: 'UserCreatePage1',

    components: {
        UserLayout,
        // TravelMap,
        // GoogleMapLoader,
        // GoogleMapMarker,
        // GoogleMapLine,
        // VueGoogleAutocomplete,
    },
    data() {
        return {

            
            isDone: false,

            email: function(){return this.$store.state.authentication.email||localStorage.getItem('email')},
        }
    },
    watch: {


    },
    computed: {
   
    },
    update() {

    },
    created() {

    },
    methods: {

    }
}
</script>

<style>
/* step01.css */
.Step1Image {
    height: 100%;
}
.Step1Image__labe {
    width: 673px;
    height: 100%;
}
.registrStep1 {
    padding: 56px 48px 56px 48px;
}
.registrStep1 form {
    width: 379px;
}
.registrStep1 h1 {
    margin-top: 0px;
    margin-bottom: 40px;
    font-weight: 500;
    font-size: 24px;
    line-height: 36px;
}
.registrStep1 label {
    display: inline-block;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 24px;
}
.registrStep1 input {
    width: 100%;
    height: 56px;
    margin-bottom: 16px;
    border: 1px solid #6F7E95;
    border-radius: 4px;
}
.registrStep1__buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    margin-top: 32px;
}
.registrStep1__buttons input {
    display: inline-block;
    text-align: center;
    padding: 19px 0 19px 0;
    font-size: 16px;
    line-height: 18px;
    text-transform: uppercase;
}
.registrStep1__buttons .registrStep1__secondaryButton {
    width: 125px;
    background-color: white;
    color: #6F7E95;
    border: 1px solid #6F7E95;
    border-radius: 4px;
}
.registrStep1__buttons .registrStep1__primaryButton {
    width: 238px;
    background-color: #FFC700;
    color: #000000;
    border: none;
    border-radius: 4px;
}
</style>