<template>
    <user-layout :email = email()>
        <div class="objects">
            <h1>Мої автомобілі</h1>
            <p>Наразі у вас немає автомобілів.</p>
            <p>Якщо бажаєте, то можемо додати Ваш автомобіль саме зараз.</p>
            <div class="banner">
                <span>Додайте</span>
                <img src="" alt="car img" class="banner_img">
                <span class="promise">ТА ОТРИМАЙТЕ</span>
                <img src="" alt="gift img" class="banner_img">
                <span>від компаній партнерів</span>

            </div>
            <span><a href="#" class="objects__button" @click="createStepOne">Додати автомобіль</a></span>
        </div>
        <div class="Image">
            <div class="Image__labe" :style="{backgroundImage: 'url('+require('../assets/illustration1.jpg')+')'}"></div>
        </div>
    </user-layout>
</template>

<script>
import UserLayout from "@/layouts/UserLayout";
export default {
    name: 'UserAutoCreatePage',
    components: {
        UserLayout,
    },
    data(){
        return{
            email: function(){return this.$store.state.authentication.email||localStorage.getItem('email')},
        }
    },

    methods: {
        createStepOne() {
            this.$emit('stepOneFunction')
        },
    },
}
</script>

<style>
.objects {
    padding: 56px 92px 56px 48px;
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
}
.Image__labe {
    width: 516px;
    height: 377px;
  
}
div.banner{
    border: 2px solid #FFC700;
    display: flex;
    flex-direction:row;
    justify-content: space-around;
    padding: 36px 20px 36px 20px;
    margin: 20px 0 0 0
}
img.banner_img{
    padding: 20px 15px 20px 15px;
}
</style>