
<template>
    <div>
        <div class='home wrap' :class="{'res__login': loginShow}" :style="{'background-image': 'url(' + require('../assets/background_image.png') + ')'}">
            <div :class="{'blur-content': loginShow}">
                <nav-component :loginShow="loginShow" @loginShowFunc="loginShowFunc" :isRole="isRoleFunc()"/>
                <div class="settingsWrapper center">
                    <div class="center">
                        <h3>
                            {{title}}
                        </h3>
                        <div>
                            {{error}}
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
import NavComponent from '../components/NavComponent';

export default {
    name:"NotFound",
            components: {
        NavComponent,
    },
    data(){
        return{
            loginShow: false,
            oginShow: false,
            title: "The page you are looking for can`t be found",
            error: "404",
        }
    },
    methods: {
        loginShowFunc() {
            this.loginShow = true
        },
        loginHideFunc() {
            this.loginShow = false
        },
        isRoleFunc(){
            let role = localStorage.getItem('role');
            if(role=="ROLE_USER"){
                return "user";
            }
            else if(role=="ROLE_BUSINESS"){
                return "business";
            }
        },
    }
}
</script>

<style>
    .center {
        text-align: center;      
        margin-top: 15%
        
        
    }

    h3+div {
        margin-top: 20px;
        font-size: 140px;
    }
</style>