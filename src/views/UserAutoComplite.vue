<template>
  <div >


            <div class = "CarWrapper">
                <div class = "Car">
                    <img alt='' :src = "currentCar.images[0].urlImage"/>
                    <div class = "info">
                        <h5>{{currentCar.carModel.carBrand.name}}</h5>
                        <p>{{currentCar.carModel.name}}/{{currentCar.releaseYear}}</p>
                        <p>{{currentCar.individualCarNaming}}</p>
                    </div>               
                </div>
            </div>
            <!-- {{currentCar}} -->
            <h5>{{currentCar.carModel.carBrand.name}}</h5>
            <p>{{currentCar.carModel.name}}/{{currentCar.releaseYear}}</P>
            <p>{{currentCar.individualCarNaming}}</p>
            <p>{{currentCar.description}}</p>
            <p>{{currentCarIMG}}</p>

            <input type="submit" value="Назад" class="registerAuto__secondaryButton" @click="back">
    

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
            return car},

        currentCarIMG: function(){
            var carIMG = this.$store.state.userdataservice.currentCar.images;
            return carIMG},
    },

    methods:{

        back(){
            this.$emit( 'switchView','user-auto-complite-car-cards-page' );
        },
    },

}
</script>

<style scoped>

    .CarCardWrapper{
        display: inline-block;
        width:595px;
    }
    .CarCards{
        display: inline-block;
        width: 590px;
        height: 160px;
        background: #FFFFFF;
        border: 1px solid #C9CFD7;
        box-sizing: border-box;
        box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.15), 0px 2px 4px rgba(0, 0, 0, 0.16);
        border-radius: 4px;
        margin: 5px;
        position: relative;

    }
    .CarCards img{
        display: inline-block;
        width:200px;
        height: 158px;
    }
    .CarCards .info{
        display: inline-block;
        height: 158px;
        padding: 10px;
        position: relative;
        box-sizing: border-box;
        bottom:40px;

    }
    .CarCards .info p{
        padding: 20px 0px 20px 0px;
    }
    span .objects__button{
        margin-bottom: 20px;
    }

    .Image__labe {
    width: 360px;
    height: 377px; 
    }



</style>