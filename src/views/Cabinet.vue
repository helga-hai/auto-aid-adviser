<template>
    <business-layout>
        <!-- <span class="role">
            {{info()}}
        </span> -->
        <keep-alive><!--Неактивные компоненты будут закэшированы-->
            <component :is="currentView" @switchView='switchView' @nextChange="nextChange"></component>
        </keep-alive>
    </business-layout>
</template>

<script>
import {mapGetters} from 'vuex';
import BusinessLayout from "@/layouts/BusinessLayout";
import AddObject from '../components/business/AddObject.vue';
import RegisterObjet from '../components/business/RegisterObjet.vue';
import Services from '../components/business/Services.vue';
import TimeTable from '../components/business/TimeTable.vue';
import PreviewPage from '../components/business/PreviewPage.vue';

export default {
    name:'Cabinet',
    components: {
      BusinessLayout, 
      'add-object': AddObject,
      'register-object' :RegisterObjet,
      'services': Services,
      'time-table': TimeTable,
      'preview-page': PreviewPage,
    },
    data(){
        return {
            role: this.$store.state.authentication.role,
            email: function(){return this.$store.state.authentication.email||localStorage.getItem('email')},
            info: function(){

                let role = localStorage.getItem('role');
                let email = this.$store.state.authentication.email||localStorage.getItem('email');
                return {role, email};

            },
           currentView:'add-object',
           next: false
           
        }
    },
    watch: {
        currentView(newVal, oldVal) {
            this.$store.dispatch('create/GET_MY_BUSINESS_DATA')
        }
    },
    computed: {
        ...mapGetters({
            myObjects: 'create/MY_OBJECTS',
         }),
    },
    mounted(){
        this.$store.dispatch('templateB/GET_DATALIST')
        this.$store.dispatch('create/GET_MY_BUSINESS_DATA')
    },
    methods:{
        switchView(view) {
          this.currentView = view;
        },
        nextChange(val){ // next or prev button was clicked
            this.next = val
        }
    },
}
</script>

<style>

</style>