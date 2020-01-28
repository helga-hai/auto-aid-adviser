<template>
    <div>
        <div class="services">
            <img class="services_img1" src = "../../assets/027-checklist.png">
            <img class="services_img2" src = "../../assets/Group 133.png">
            <h1>Реєстрація об’єкту <span>2/3</span></h1>

                <h4>Выберите из списка типы обслуживаемых автомобилей</h4>
                
                <ul class="carType">
                 <li
                    v-for="t in types"
                    :key="t.id"
                    :id="t.id"
                    >{{t.name}}</li>
                 </ul>

                <h4>Выберите из списка основные услуги, которые оказывает обьект</h4>
                <hr>
                <details v-for="item in category" :key="item.id" class="services__services opened" >
                    <summary class="services__servicename">
                        <span>{{item.name}}</span>
                    </summary> 
                    <div class="services__checkwrapp">
                        <div class="services__checkAll">    
                            <label :for="'all_'+item.id">
                                <input type="checkbox" :id="'all_'+item.id" value="Обрати все">
                                <p>Обрати все</p>
                                </label>
                        </div>
                        <div class="services__autocontent" >
                            <label  v-for="elem in item.list" :key="elem.id" :for="elem.id">
                                <div>
                                    <input type="checkbox" :id="elem.id" :value="elem.id" v-model="checkedServicesID">
                                    <p>{{elem.name}}</p>
                                </div>
                            </label>
                        </div>
                    </div>
                </details>
                
                <details class="services__services opened" >
                    <summary class="services__servicename">
                        <span>Дополнительно</span>
                        <img :src="require('../../assets/arrow drop down.png')" class="services__icon">
                    </summary>
                </details>
                <div class="services__buttons">
                    <input type="reset" value="Назад" @click="switchView('register-object')" class="services__secondaryButton">
                    <input type="submit" value="Продолжить 2/3" class="services__primaryButton" @click="switchView('time-table')">    
                </div>

        </div>  
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
    name: 'Services',
    components: {
    },
    computed: {
        ...mapGetters({
            category: 'templateB/CATEGORYLIST',
            types: 'userdataservice/TYPES',
         }),
    },
    data() {
        return {
            checkedServicesID: [],
        }
    },
    methods: {
        // createStepThree() {
        //     this.$emit('stepThreeFunction');        
        // },
        serviceShow(e){
            console.dir(e.target)

        },
        switchView(val){
            this.$emit('switchView', val);
            this.$store.commit('create/getServiceForBusinesses',this.checkedServicesID)
        }
    },
}
</script>

<style lang="scss">
/* step02.css */
.services {
    width: 100%;
    padding: 64px 48px 64px 48px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}
.services h1 {
    margin-bottom: 64px;
    font-weight: 500;
    font-size: 24px;
    line-height: 28px;
}
.services p {
    margin-left: 43px;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    font-family: 'Roboto', sans-serif; 
    border: none;
    color: #4B5E7A;
}
.services hr {
    width: 100%;
    color: #E4E7EB;
    size: 1px;
    margin: 0px;

}
.services__buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    width: 379px;
    margin-top: 56px;
}
.services__buttons input {
    display: inline-block;
    text-align: center;
    padding: 19px 0 19px 0;
    font-size: 16px;
    line-height: 18px;
    text-transform: uppercase;
}
.services__buttons .services__secondaryButton {
    width: 125px;
    background-color: white;
    color: #6F7E95;
    border: 1px solid #6F7E95;
    border-radius: 4px;
  cursor:pointer;
}
.services__buttons .services__secondaryButton:hover {
  background-color: rgb(241, 241, 241);
}
.services__buttons .services__primaryButton {
    width: 238px;
    background-color: #FFC700;
    color: #000000;
    border: none;
    border-radius: 4px;
  cursor:pointer;
}
.services__buttons .services__primaryButton:hover {
  background-color: rgb(219, 173, 6);
}
.services_img1 {
    position: absolute;
    top: 143px;
    right: 156px;
}
.services_img2 {
    position: absolute;
    top: 135px;
    right: 90px;
}
.services__types, .services__services {
    width: 100%;
    height: 80px;
    overflow: hidden;
}
.opened {
    height: 100%;
}
.transform {
    transform: scale(1, -1); 
}
.services__typename, .services__servicename {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 28px 0px;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
}
.services__checkwrapp {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    color: #0E1E2E;
}
.services__checkAll {
    width: 210px;
}
.services__check {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding-bottom: 10px;
}
.services__check label {
    font-size: 16px;
    line-height: 117%;
    padding-bottom: 18px;
}
.services__column1 {
    padding-right: 80px;
}
.services__column1, .services__column2 {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}
.services__item {
    display: inline-block;
    width: 400px;
    height: 100px;
    background-color: rebeccapurple;
}
.services__autocontent {
  column-count: 2;
  column-gap: 10px;
      width: 100%;
}
.services__autocontent label {
    display:block;
    font-size: 16px;
    line-height: 22px;
}
summary, details {
    &:focus {
        outline: -webkit-focus-ring-color auto 0px;
    }
}
summary {
    cursor: pointer;
}
summary::-webkit-details-marker {
  display: none
}
summary:after {
    border-radius: 5px;
    content: "▴";
    color: #00BCD4;
    float: left;
    font-size: 1.5em;
    font-weight: bold;
    margin: -5px 10px 0 0;
    padding: 0;
    text-align: center;
    width: 20px;
    transition: transform .4s ease;
    transform: scale(1, .7);
    position: relative;
    top: 4px;
    left: 4px;
}
details[open] summary:after {
    transform: scale(1, -.7);
}
///

.services label {
  position:relative;
  //padding-left: 60px;
  text-align:left;
  color: #0E1E2E;
  display: flex;
  padding: 6px 0;
}
.services label p:before {
  content:"";
  box-sizing: border-box;
  display:inline-block;
  position:absolute;
  top:10px;
  left: 0;
  width: 32px;
  height: 16px;
  border-radius: 8px;
  background-color: #C9CFD7;
  transition: transform .4s ease;
}
.services input[type="checkbox"]:checked ~ p:before{
  background-color: #FFC700;
  transition: transform .4s ease;
}
.services label p:after {
  content:"";
  box-sizing: border-box;
  position:absolute;
  top:12px;
  transform: matrix(1,0,0,1,0,0);
  left: 2px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #6F7E95;
  transition: transform .2s  cubic-bezier(0.39, 0.58, 0.57, 1);
}
.services input[type="checkbox"]:checked ~ p:after{
  top:12px;
  transform: matrix(1,0,0,1,16,0);
  transition: transform .2s  cubic-bezier(0.39, 0.58, 0.57, 1);
  //left: 18px;
  left: 2px;
  background-color: #0E1E2E;
}
.services .services__autocontent label {
    //padding: 4px 0;
}
.services__services {
    border-bottom:  1px solid #E4E7EB;
}
.services__services.opened[open] {
    padding-bottom:50px;
}
label:focus, div:focus, p:focus {
    outline: -webkit-focus-ring-color auto 0px;
}
h4 {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    color: #6F7E95;
    margin-bottom:14px;
}
hr { border: 0;
    height: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    //border-bottom: 1px solid #E4E7EB
}
.services ul.carType{
    margin: 20px 0 60px 0;
    display: inline-block;

}
.services ul.carType>li{
    background-color: #6F7E95;
    border-radius: 15px 15px;
    padding: 5px 10px 5px 10px;
    color: #000000;
    margin-left: 5px;
    display: inline;
}
.services ul.carType>li:hover{
    cursor: pointer;
}
.services ul.carType>li:focus,
.services ul.carType>li:active{
    background-color: #FFC700;
}
.services ul.carType>li.active {
    background-color: #FFC700;
}
.services ul.carType>li:active{
    cursor: pointer;
    background-color: #FFC700;
}
</style>