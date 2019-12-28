<template>
    <business-layout>
        <div class="objects">
            <h1>Мої об’єкти</h1>
            <p>Наразі у вас немає об’єктів.</p>
            <p>Якщо бажаєте, то можемо створити новий об’єкт саме зараз.</p>         
            <span><a href="#" class="objects__button" @click="createStepOne">Додати об'єкт</a></span>
            <card-min/>
        </div>
        <div class="Image">
            <div class="Image__labe" :style="{backgroundImage: 'url('+require('../assets/serevice.svg')+')'}"></div>
        </div>
    </business-layout>
</template>

<script>
import BusinessLayout from "@/layouts/BusinessLayout";
import CardMin from "../components/cardMin";
export default {
    name: 'CreatePage2',
    components: {
        BusinessLayout,
        CardMin
    },
    methods: {
        createStepOne() {
            this.$emit('stepOneFunction')
        }
    }
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
    width: 409px;
    height: 250px;
    background-repeat: no-repeat;
  
}
</style>
