<template>
  <div >
            <div class = "CurrentCarWrapper">
                <div class = "Car">
                    <img alt='' :src = "currentCar.images[0].urlImage"/>
                    <div class = "info">
                        <h5>{{currentCar.carModel.carBrand.name}}</h5>
                        <p>{{currentCar.carModel.name}}/{{currentCar.releaseYear}}</P>
                        <p>{{currentCar.individualCarNaming}}</p>
                        <p>{{currentCar.description}}</p>
                        <!-- <p>{{currentCarIMG}}</p> -->
                    </div>
                </div>
            <div class="currentCar__buttons">
                <input type="submit" value="Назад" class="backButton" @click="back">
            </div>
            
            </div>
            <!-- {{currentCar}} -->


    

  </div>
</template>

<script>

import userdataservice from '../_store/userdataservice.module';
import { userService } from '../_services';

export default {

    name: 'UserAutoComplite',

    data(){

        return {
            

        }

    },
    computed:{

        currentCar: function(){
            var car = this.$store.state.userdataservice.currentCar;
            return car
        },

        currentCarIMG: function(){
            var carIMG = this.$store.state.userdataservice.currentCar.images;
            return carIMG
        },
    },

    methods:{

        back(){
            this.$emit( 'switchView','user-auto-complite-car-cards-page' );
        },
    },

}
</script>

<style scoped>

    .CurrentCarWrapper{
        display: block;
        margin: 0 auto;
    }

    .Car{
        display: inline-block;
        background: #FFFFFF;
        border: 1px solid #C9CFD7;
        box-sizing: border-box;
        box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.15), 0px 2px 4px rgba(0, 0, 0, 0.16);
        border-radius: 4px;
        margin: 5px;
        position: relative;

    }
    .Car img{
        display: block;
        width:640px;
        height: 480px;
        margin: 0 auto;
    }
    .Car .info{
        display: inline-block;

        padding: 10px;

        box-sizing: border-box;
        bottom:40px;

    }

    .Car .info p{
        padding: 20px 0px 20px 0px;
    }

    span .objects__button{
        margin-bottom: 20px;
    }
    .currentCar__buttons input {
        display: inline-block;
        text-align: center;
        padding: 19px 0 19px 0;
        font-size: 16px;
        line-height: 18px;
        text-transform: uppercase;
    }

    .currentCar__buttons {
        margin: 20px 0 20px 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        width: 100%;
        margin-top: 32px;
    }

    .currentCar__buttons .backButton {
        width: 125px;
        background-color: white;
        color: #6F7E95;
        border: 1px solid #6F7E95;
        border-radius: 4px;
    }
    .currentCar__buttons .backButton {
        width: 238px;
        background-color: #FFC700;
        color: #000000;
        border: none;
        border-radius: 4px;
    }


</style>