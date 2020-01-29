<template>
    <!-- <user-layout :email = email()> -->
    <div>    
        <div class="objects" 
        @click.prevent="getTypeAndBrand"
        >
            <h1>Мої автомобілі</h1>
            <p>Наразі у вас немає автомобілів.</p>
            <p>Якщо бажаєте, то можемо додати Ваш автомобіль саме зараз.</p>
            <div class="banner">
                <span>Додайте</span>
                <img src="../assets/ico-car-36.svg" alt="car img" class="banner_img">
                <span class="promise">ТА ОТРИМАЙТЕ</span>
                <img src="../assets/present.svg" alt="gift img" class="banner_img">
                <span>від компаній партнерів</span>

            </div>
            <span><a href="#" class="objects__button" @click="createStepOne">Додати автомобіль</a></span>
        </div>
        <div class="Image">
            <div class="Image__labe" :style="{backgroundImage: 'url('+require('../assets/illustration_Car.svg')+')'}"></div>
        </div>
    </div>    
    <!-- </user-layout> -->
</template>

<script>
import { userdataservice } from '../_store/userdataservice.module';
import {userService} from '../_services/user.service'
export default {

    name: 'UserAutoCreatePage',
    data(){
        return{

            visible: false,
        }
    },

    methods: {
        createStepOne() {
            console.log("work");
            return this.$emit('switchView','user-auto-create-page2');
        },
        getTypeAndBrand(){
            console.log('FOOOOOO');
            userService.getAllUserData('api/catalog/car/types')
            .then(function(result){return result})
            .then(result=>this.$store.dispatch('userdataservice/fieldsVal',[result,'types']))
            userService.getAllUserData('api/catalog/car/brands')
            .then(function(result){return result})
            .then(result=>this.$store.dispatch('userdataservice/fieldsVal',[result,'brands']))

        },
        // getTypes(){
        //         console.log("Foo bar");
        //         // let data = userService.getAllUserData('api/catalog/car/types');
        //         // return data;
        //         return userService.getAllUserData('api/catalog/car/types');
        // },
        // destroy(){
        //     Foo();
        // }
    },
}
</script>

<style>
.objects {
    padding: 56px 5px 56px 48px;
    display: inline-block;
    width:720px;
}   
.objects h1 {
    margin-top: 0;
    margin-bottom: 40px;
    font-weight: 500;
    font-size: 24px;
    line-height: 36px;
}
.objects p {
    margin: 0;
    font-size: 16px;
    line-height: 22px;
}
.objects__button {
    display: inline-block;
    margin-top: 48px;
    width: 240px;
    height: 56px;
    text-align: center;
    padding: 19px 0 19px 0;
    background-color: #0E1E2E;
    border-radius: 4px;
    color: rgb(255, 255, 255);
    font-size: 16px;
    line-height: 18px;
    text-transform: uppercase;
}
.objects__button:hover {
    background-color: #0E1E41;
}
.Image {
    padding: 56px 50px 0px 0px;
    display: inline-block;
}
.Image__labe {
    width: 360px;
    height: 377px;
  
}
div.banner{
    border: 2px solid #FFC700;
    display: flex;
    flex-direction:row;
    justify-content: space-around;
    padding: 20px 10px 20px 10px;
    margin: 20px 0 0 0;
    width: 666px;

}
img.banner_img{
    padding: 20px 15px 20px 15px;
}

.promise{
    font-family: 'Roboto';
    font-weight: 500;
    font-size: 24px;
    line-height: 28px;
    align-self: center;

}
</style>