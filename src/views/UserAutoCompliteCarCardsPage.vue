<template>
  <div >
      <ul v-for="c of cars"
        :key="c.id"
        :id="c.id">
      <li >
            <p>Рік випуску: {{c.releaseYear}}</p>
      </li>
      </ul>
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

<style>

</style>