<template>
    <div>
        <div class="objects">
            <h1>Мої об’єкти</h1>
            <p>Наразі у вас немає об’єктів.</p>
            <p>Якщо бажаєте, то можемо створити новий об’єкт саме зараз.</p>         
            <span><a href="#" class="objects__button" @click="switchView('register-object')" >Додати об'єкт</a></span>
            <card-min/>
        </div>
        <div class="Image">
            <div class="Image__labe" :style="{backgroundImage: 'url('+require('../../assets/serevice.svg')+')'}"></div>
        </div>
    </div>
</template>

<script>
import CardMin from "../../components/cardMin";
import {userService} from "../../_services";
import {mapGetters} from 'vuex';
export default {
    name: 'AddObject',
    components: {
        CardMin,
    },
    data() {
        return {
        } 
    },
    async created () {
        await this.$store.dispatch('templateB/GET_CATTEGORY_LIST')
        await this.$store.dispatch('templateB/GET_SERVICE_LIST',this.category.map(item=>item.id))
    },
    mounted() {
        this.$store.dispatch('userdataservice/GET_TYPES')
        this.$store.dispatch('selfLocation/getLocation');
    },
    computed: {
        ...mapGetters({
            category: 'templateB/CATEGORYLIST',
         }),
    },
    methods: {
        createStepOne() {
            // this.$emit('stepOneFunction');

            // userService.getAllBusinessDate('api/catalog/services')
            //     .then(function(result) {
            //         console.log("content"+result)
            //         return result
            //     }).then(result=>this.$store.dispatch('templateB/fillallBusinesServises', result)
            // );
            //  userService.getAllBusinessDate('api/businesses/templates')
            //     .then(function(result) {
            //         console.log("content"+result)
            //         return result
            //     }).then(result=>this.$store.commit('create/fillBusinesTemplate', result)
            // );
        },
        switchView(val){
            this.$emit('switchView', val);
            this.createStepOne();
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
