<template>

    <!-- <user-layout :email = email()> -->

        <div class="registerAuto">
            <h1>Реєстрація автомобіля</h1>
            <form>
                <div class="registerAuto__car">
                    <p><span>Оберіть тип транспортного засобу</span></p>
                    <!-- <div class="carType"
                    v-for= 'type in types'
                    :key='type'>
                        <span>{{type}}</span> -->
                        <!-- <span>Легкове</span>
                        <span>Вантажівка</span>
                        <span>Автобус</span> -->
                <ul class="carType">
                 <li
                 v-for="t in types()"
                :key="t.id"
                 >{{t.name}}</li> </ul>
<!-- 
                    </div> -->

                </div>

                <!-- <span>Выбрано: {{ selected }}</span> -->
                <select type="text" name="brand" id="brand" placeholder="Марка" v-model='selectedBrand' required>
                    <option disabled value="">Марка</option>
                    <option 
                   
                    v-for="b in brands()"
                    :key="b.id">
                    {{b.name}}
                    </option>

                </select><span>Выбрано: {{ selectedBrand }}</span>
                <input type="text" name="model" id="model" placeholder="Модель" v-model="model" required>
                <input type="text" name="fuelType" id="fuelType" placeholder="Тип палива" v-model="fuelType" required>
                <input type="text" name="year" id="year" placeholder="Рік випуску" v-model="year" required>
                <p><span>Додайте фотографії автомобілю</span></p>
                <div class="photo">
                    <span>+ фото</span>
                </div>
                <p><span>*максимум п`яти фото, до 500Кб кожна </span></p>

                <!-- <ul v-for="t in test"><li>{{t.name}}</li></ul> -->


                <div class="registerAuto__buttons">
                    <input type="submit" value="Назад" class="registerAuto__secondaryButton" @click="back">
                    <input type="submit" value="Зберегти" class="registerAuto__primaryButton">    
                </div>
            </form>
        </div>

    <!-- </user-layout> -->
</template>

<script>

import userdataservice from '../_store/userdataservice.module';
import { userService } from '../_services';


export default {
    name: 'UserAutoCreatePage2',

    // components: {

    //     userService,
    // },
    data() {
        return {
            // types:{
            //     type1: 'Мотоцикл',
            //     type2: 'Легкове',
            //     type3: 'Вантажівка',
            //     type4: 'Автобус',
            // },
            selectedBrand:"",
            model:"",
            fuelType:"",
            year:"",
            types() {return this.$store.state.userdataservice.types},
            selectedType:'',
            brands(){return this.$store.state.userdataservice.brands},
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
        back(){
            this.$emit('switchView','user-auto-create-page');
        },
        selectType(){

        }

        // beforeCreate(){
        //     getTypes();
        // },
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
.registerAuto {
    padding: 56px 48px 56px 48px;
}
.registerAuto form {
    width: 379px;
}
.registerAuto h1 {
    margin-top: 0px;
    margin-bottom: 40px;
    font-weight: 500;
    font-size: 24px;
    line-height: 36px;
}
.registerAuto label {
    display: inline-block;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 24px;
}
.registerAuto input,select {
    width: 100%;
    height: 56px;
    margin-bottom: 16px;
    border: 1px solid #6F7E95;
    border-radius: 4px;
}

.registerAuto__buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    margin-top: 32px;
}
.registerAuto__buttons input {
    display: inline-block;
    text-align: center;
    padding: 19px 0 19px 0;
    font-size: 16px;
    line-height: 18px;
    text-transform: uppercase;
}
.registerAuto__buttons .registerAuto__secondaryButton {
    width: 125px;
    background-color: white;
    color: #6F7E95;
    border: 1px solid #6F7E95;
    border-radius: 4px;
}
.registerAuto__buttons .registerAuto__primaryButton {
    width: 238px;
    background-color: #FFC700;
    color: #000000;
    border: none;
    border-radius: 4px;
}
.photo{
    height: 120px;
    width: 100px;
    border: 3px dashed #6F7E95;
    border-radius: 4px;
    margin: 15px 0px
}
ul.carType{
    margin: 20px 0 20px 0;

}
ul.carType>li{
    background-color: #6F7E95;
    border-radius: 15px 15px;
    padding: 5px 10px 5px 10px;
    color: #000000;
    margin-left: 5px;
    display: inline;
}
ul.carType>li:hover{
    cursor: pointer;
}

</style>