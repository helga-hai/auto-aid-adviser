<template>
  <div >

        <div class = "CarCardsContent">
            <div class = "CarCardWrapper">
                <div class = "CarCards"
                @click='lookAuto'
                v-for="c of cars"
                :key="c.id"
                :id="c.id"
                >
                    <img alt='' :src = "c.images[0].urlImage"/>
                    <div class = "info">
                        <!-- <h5>{{c.carModel.carBrand.name}}</h5> -->
                        <p>{{c.carModel.name}}/{{c.releaseYear}}</p>
                        <p>{{c.individualCarNaming}}</p>
                    </div>              
                </div>
            </div>
            <div class="Image__labe" :style="{backgroundImage: 'url('+require('../assets/illustration_Car.svg')+')'}"></div>
      </div>
    
      <span><a href="#" class="objects__button" @click="createStepOne">Додати автомобіль</a></span>
  </div>
</template>

<script>

import userdataservice from '../_store/userdataservice.module';
import { userService } from '../_services';

export default {

    name: 'UserAutoCompliteCarCardsPage',

    data(){

        return {
            cars: this.$store.state.userdataservice.cars,

        }

    },
    methods:{

        getCars(){
            console.log('GET_CARS')

            userService.getAllUserData( 'api/user/profile/cars' )

                .then(function(result){

                    console.log("CARS "+result);

                    return result })

                .then(result=>this.$store.dispatch('userdataservice/fieldsVal',[ result ,'cars' ]))

                .then( ()=>{
                    let _cars = this.$store.state.userdataservice.cars;

                    console.log("CARS _CARS!!!!!!!!!!!!!!!!! "+_cars );

                    this.cars = _cars;})

        },
        lookAuto(e){

            var
            currentCarID = e.target.id;
            console.log(currentCarID);

            userService.getAllUserData(`api/user/profile/car/${currentCarID}`)
            .then(function(result){return result})
            .then(result=>this.$store.dispatch('userdataservice/fieldsVal',[ result ,'currentCar' ]))
            // .(this.$emit('switchView','user-auto-complite'));


        },

        createStepOne() {
            console.log("work");
            return this.$emit('switchView','user-auto-create-page2');
            // return this.$emit('switchView','user-auto-complite-car-cards-page')
        },
    },

    mounted(){

        {{this.getCars()}}

    }


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