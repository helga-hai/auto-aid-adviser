<template>

    <!-- <user-layout :email = email()> -->

        <div class="registrStep1">
            <h1>Особисті дані</h1>
            <form @submit.prevent='saveUserData'>
                <label>Контактні дані</label>
                <input type="text" name="surname" id="surname" placeholder="Прізвище" v-model="surname" required>
                <input type="text" name="name" id="name" placeholder="Ім'я" v-model="name" required>
                <input type="text" name="phone" id="phone" placeholder="Телефон" v-model="phone">
                <input type="e-mail" name="e-mail" id="e-mail" placeholder="e-mail" :value='email' disabled="disabled">
                <div class="avatar">

                    {{user}}
                    <div>{{data()}}</div>
                    <!-- <div class="registrStep3__Foto">
                        <p class = "registrStep3__ft">Додати аватар</p>
                        <div>
                        <label class= "registrStep3__addFile">
                            <input type="file" accept="image/*">
                            <span>+ Фото</span>
                        </label>
                        </div>
                        <p class = "registrStep3__fp">* розмір файлу до 500 Кб</p>        
                    </div> -->
                </div>
                <!-- <label>Змінити пароль</label>
                <input type="password" name="oldPassword" id="oldPassword" placeholder="Існуючий пароль" v-model="oldPassword">
                <input type="password" name="newPassword" id="newPassword" placeholder="Новий пароль" v-model="newPassword">
                <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Підтвердження нового паролю" v-model="confirmPassword">-->

                <div class="registrStep1__buttons">

                    <input type="submit" value="Зберегти" class="registrStep1__primaryButton" @click="saveUserData">    
                </div>
            </form>
        </div>

    <!-- </user-layout> -->
</template>

<script>

// import UserLayout from "@/layouts/UserLayout";

import { userService } from '../_services';

export default {
    name: 'UserCreatePage1',

    // components: {
    //     UserLayout,
    // },
    data() {
        return {
            surname:"",
            name:"",
            phone:"",
            oldPassword:"",
            newPassword:"",
            confirmPassword:"",

            data: function(){return this.$store.state.userdataservice.personalPageData}
        }
    },
    watch: {


    },
    computed: {



        email: function(){ return this.$store.state.authentication.email||localStorage.getItem('email') },

        user: function(){ return this.$store.state.userdataservice.personalPageData; },
   
    },
    update() {

    },
    created() {



    },
    methods: {

        saveUserData: function(){

            console.log("click work");
            console.log(this.user);

            this.user.lastName = this.surname;
            this.user.firstName = this.name;
            this.user.phone = this.phone;

            let editUser = this.user;


            this.$store.dispatch( "userdataservice/EDIT_USER", editUser ); 
            this.$emit('switchView','user-profile-ready-page');  
        },
        createStepOne() {
            console.log("work");
            return this.$emit('switchView','user-profile-ready-page');
        }
        
    },
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
.photo{
    height: 120px;
    width: 100px;
    border: 3px dashed #6F7E95;
    border-radius: 4px;
    margin: 15px 0px
}
div.avatar{
    margin: 15px 0 15px 0;
}
.registrStep3__Foto {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 64px 0px;
}
.registrStep3__ft  {
  font-size: 16px;
  line-height: 22px;
  margin-bottom:24px;
}
.registrStep3__Foto .registrStep3__addFile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  margin: 0px;
  border: 1px dashed #6F7E95;
  border-radius: 4px;
}
.registrStep3__addFile input {
    margin: 0px;
}

.registrStep3__Foto div{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;


}
.registrStep3__addFile span {
  font-size: 16px;
  line-height: 18px;
  text-transform: uppercase;
  color: #A5AEBC;
}

</style>