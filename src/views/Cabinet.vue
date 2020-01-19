<template>
    <business-layout>
        <span class="role">
            {{info()}}
        </span>
        <keep-alive><!-- Неактивные компоненты будут закэшированы -->
            <component :is="currentView" @switchView='switchView'></component>
        </keep-alive>
    </business-layout>
</template>

<script>
import BusinessLayout from "@/layouts/BusinessLayout";
import AddObject from '../components/business/AddObject.vue';
import RegisterObjet from '../components/business/RegisterObjet.vue';
import Services from '../components/business/Services.vue';
import TimeTable from '../components/business/TimeTable.vue';
console.log(RegisterObjet)
export default {
    name:'Cabinet',
    components: {
      BusinessLayout, 
      'add-object': AddObject,
      'register-object' :RegisterObjet,
      'services': Services,
      'time-table': TimeTable,
    },
    data(){
        return {
            role: this.$store.state.authentication.role,
            email: function(){return this.$store.state.authentication.email||localStorage.getItem('email')},
            info: function(){
                // let role = this.$store.state.authentication.role;
                let role = localStorage.getItem('role');
                let email = this.$store.state.authentication.email||localStorage.getItem('email');
                return {role, email};
                // return this.$store.state.authentication.role, this.$store.state.authentication.email;
            },
           currentView:'add-object',
        }
    },
    methods:{
        switchView(view) {
          this.currentView = view;
        },
    },
}
</script>

<style>

</style>