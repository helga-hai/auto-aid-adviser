<template>
    <div>
        <!-- <nav-component/> -->
        <h1>
            Hello, my role is: {{role()}}
        </h1>
        <create-page2 v-if="step1" @stepOneFunction="stepOneFunction"/>
        <create-page v-if="step2" @stepTwoFunction="stepTwoFunction"/>
        <create-page3 v-if="step3" @stepThreeFunction="stepThreeFunction"/>
        <create-page4 v-if="step4" @stepFourFunction="stepFourFunction"/>
        <create-page5 v-if="step5" @stepFiveFunction="stepFiveFunction"/>
    </div>
</template>

<script>

import Activation from '../components/Activation';
import NavComponent from '../components/NavComponent';
import CreatePage2 from '../views/CreatePage2';
import CreatePage from '../views/CreatePage';
import CreatePage3 from '../views/CreatePage3';
import CreatePage4 from '../views/CreatePage4';
import CreatePage5 from '../views/CreatePage5';

export default {
    name: 'BusinessCabPage',
    components: {
        NavComponent,
        CreatePage2,
        CreatePage,
        CreatePage3,
        CreatePage4,
        CreatePage5
    },
    data(){
        return {
            role: function(){return "Business"},
            step1: true,
            step2: false,
            step3: false,
            step4: false,
            step5: false,
        }
    },
    methods: {
        stepOneFunction() {
            this.step1 = false;
            this.step2 = true;
        },
        stepTwoFunction() {
            this.step2 = false
            this.step3 = true;
        },
        stepThreeFunction() {
            this.step3 = false;
            this.step4 = true;
        },
        stepFourFunction() {
            this.step4 = false;
            this.step5 = true;
        },
        stepFiveFunction(){

        }
    }
}
</script>

<style>

</style>