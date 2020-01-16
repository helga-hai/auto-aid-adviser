<template>
    <business-layout>
        <div class="services">
            <img class="services_img1" src = "../assets/027-checklist.png">
            <img class="services_img2" src = "../assets/Group 133.png">
            <h1>Реєстрація об’єкту</h1>
                        {{services}}
                <p>Выберите из списка типы обслуживаемых автомобилей</p>
                <div class="services__types" :class="{'opened': typesShow}" >
                    <div  class="services__typename" @click = "typesShow = !typesShow">
                        <span>Типы авто</span>
                        <img :src="require('../assets/arrow drop down.png')" class="services__icon" :class="{'transform': typesShow}">
                    </div>
                    <div class="services__item"></div>
                </div>
                <hr>
                

                <p>Выберите из списка основные услуги, которые оказывает обьект</p>
                <div v-for="item in category" :key="item.id">
                    <div class="services__services" :class="{'opened': serviceShow}" ><!--@click="toggleOpen[item.id]-->
                        <div class="services__servicename">
                            <span>{{item.name}}</span>
                            <img :src="require('../assets/arrow drop down.png')" class="services__icon" :class="{'transform': serviceShow}">
                        </div> 
                        <div class="services__checkwrapp">
                            <div class="services__checkAll">    
                                <label :for="'all_'+item.id"><input type="checkbox" :id="'all_'+item.id" value="Обрати все">Обрати все</label>
                            </div>
                            <div class="services__autocontent" >
                                <label  v-for="elem in item.list" :key="elem.id" :for="elem.id">
                                    <input type="checkbox" :id="elem.id" :value="elem.name" checked>{{elem.name}}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="services__services" :class="{'opened': serviceShow}" >
                    <div  class="services__servicename" @click = "serviceShow = !serviceShow">
                        <span>Сервисное ТО</span>
                        <img :src="require('../assets/arrow drop down.png')" class="services__icon" :class="{'transform': serviceShow}">
                    </div> 
                    <div class="services__checkwrapp">
                        <div class="services__checkAll">
                            <label for="All"><input type="checkbox" id="All" value="Обрати все">Обрати все</label>
                        </div>
                        <div class="services__check" >
                            <div class ="services__column1">
                                <label for="oil"><input type="checkbox" id="oil" value="Замена масла в двигателе" checked>Замена масла в двигателе</label>
                                <label for="diagnostics"><input type="checkbox" id="diagnostics" value="Компьютерная диагностика" >Компьютерная диагностика</label>
                                <label for="engineFilter"><input type="checkbox" id="engineFilter" value="Замена воздушного фильтра двигателя" checked>Замена воздушного фильтра двигателя</label>
                                <label for="cabinFilter"><input type="checkbox" id="cabinFilter" value="Замена воздушного фильтра салона" >Замена воздушного фильтра салона</label>
                                <label for="oil2"><input type="checkbox" id="oil2" value="Замена масла в КПП" >Замена масла в КПП</label>
                                <label for="coolant"><input type="checkbox" id="coolant" value="Замена охлаждающей жидкости" >Замена охлаждающей жидкости</label>
                            </div>
                            <div class ="services__column2">
                                <label for="belt"><input type="checkbox" id="belt" value="Замена ремня ГРМ" >Замена ремня ГРМ</label>
                                <label for="driveBelt"><input type="checkbox" id="driveBelt" value="Замена приводного ремня" >Замена приводного ремня</label>
                                <label for="driveRollers"><input type="checkbox" id="driveRollers" value="Замена роликов привода" >Замена роликов привода</label>
                                <label for="engineFlushing"><input type="checkbox" id="engineFlushing" value="Промывка двигателя" >Промывка двигателя</label>
                                <label for="replacement"><input type="checkbox" id="replacement" value="Замена комплекта ремня ГРМ с роликами и водяной помпой" >Замена комплекта ремня ГРМ с роликами и водяной помпой</label>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="services__services" :class="{'opened': brakeSystShow}" >
                    <div  class="services__servicename" @click = "brakeSystShow = !brakeSystShow">
                        <span>Тормозная система</span>
                        <img :src="require('../assets/arrow drop down.png')" class="services__icon" :class="{'transform': brakeSystShow}">
                    </div>
                </div>
                <hr>
                <div class="services__services" :class="{'opened': suspensionShow}" >
                    <div  class="services__servicename" @click = "suspensionShow = !suspensionShow">
                        <span>Подвеска</span>
                        <img :src="require('../assets/arrow drop down.png')" class="services__icon" :class="{'transform': suspensionShow}">
                    </div>
                </div>
                <hr>
                <div class="services__services" :class="{'opened': steerageShow}" >
                    <div  class="services__servicename" @click = "steerageShow = !steerageShow">
                        <span>Рулевое управление</span>
                        <img :src="require('../assets/arrow drop down.png')" class="services__icon" :class="{'transform': steerageShow}">
                    </div>
                </div>
                <hr>
                <div class="services__services" :class="{'opened': enginegeShow}" >
                    <div  class="services__servicename" @click = "enginegeShow = !enginegeShow">
                        <span>Двигатель</span>
                        <img :src="require('../assets/arrow drop down.png')" class="services__icon" :class="{'transform': enginegeShow}">
                    </div>
                </div>
                <hr>
                <div class="services__services" :class="{'opened': wiringShow}" >
                    <div  class="services__servicename" @click = "wiringShow = !wiringShow">
                        <span>Электрика</span>
                        <img :src="require('../assets/arrow drop down.png')" class="services__icon" :class="{'transform': wiringShow}">
                    </div>
                </div>
                <hr>
                <div class="services__services" :class="{'opened': exhaustShow}" >
                    <div  class="services__servicename" @click = "exhaustShow = !exhaustShow">
                        <span>Выхлопная система</span>
                        <img :src="require('../assets/arrow drop down.png')" class="services__icon" :class="{'transform': exhaustShow}">
                    </div>
                </div>
                <hr>
                <div class="services__services" :class="{'opened': clutchShow}" >
                    <div  class="services__servicename" @click = "clutchShow = !clutchShow">
                        <span>Сцепление</span>
                        <img :src="require('../assets/arrow drop down.png')" class="services__icon" :class="{'transform': clutchShow}">
                    </div>
                </div>
                <hr>
                <div class="services__services" :class="{'opened': transmissionShow}" >
                    <div  class="services__servicename" @click = "transmissionShow = !transmissionShow">
                        <span>Трансмиссия</span>
                        <img :src="require('../assets/arrow drop down.png')" class="services__icon" :class="{'transform': transmissionShow}">
                    </div>
                </div>
                <hr>
                <div class="services__services" :class="{'opened': climateShow}" >
                    <div  class="services__servicename" @click = "climateShow = !climateShow">
                        <span>Климат-контроль</span>
                        <img :src="require('../assets/arrow drop down.png')" class="services__icon" :class="{'transform': climateShow}">
                    </div>
                </div>
                <hr>
                <div class="services__services" :class="{'opened': carcassShow}" >
                    <div  class="services__servicename" @click = "carcassShow = !carcassShow">
                        <span>Кузов</span>
                        <img :src="require('../assets/arrow drop down.png')" class="services__icon" :class="{'transform': carcassShow}">
                    </div>
                </div>
                <hr>
                <div class="services__services" :class="{'opened': gasShow}" >
                    <div  class="services__servicename" @click = "gasShow = !gasShow">
                        <span>ГБО</span>
                        <img :src="require('../assets/arrow drop down.png')" class="services__icon" :class="{'transform': gasShow}">
                    </div>
                </div> -->
                <hr>
                <div class="services__services" :class="{'opened': extraShow}" >
                    <div  class="services__servicename" @click = "extraShow = !extraShow">
                        <span>Дополнительно</span>
                        <img :src="require('../assets/arrow drop down.png')" class="services__icon" :class="{'transform': extraShow}">
                    </div>
                </div>
                <hr>
                <div class="services__buttons">
                    <input type="reset" value="Отмена" class="services__secondaryButton">
                    <input type="submit" value="Продолжить 2/3" class="services__primaryButton" @click="createStepThree">    
                </div>

        </div>  
    </business-layout>
</template>

<script>
import BusinessLayout from "@/layouts/BusinessLayout";
//import { data } from '../_store/data.module';
import {mapGetters} from 'vuex';
export default {
    name: 'CreatePage3',
    components: {
        BusinessLayout,
    },
    computed: {
        ...mapGetters({
            category: 'templateB/CATEGORYLIST',
         }),
    },
    data() {
        return {
            typeBusiness: "",
            filtreTemplate: "",
            services: this.$store.state.templateB.serviceTypesList,
            sendServices: '',
            typesShow: false,
            //serviceShow: false,
            brakeSystShow: false,
            suspensionShow: false,
            steerageShow: false,
            enginegeShow: false,
            wiringShow: false,
            exhaustShow: false,
            clutchShow: false,
            transmissionShow: false,
            climateShow: false,
            carcassShow: false,
            gasShow: false,
            extraShow: false,
            // business_types: this.$store.dispatch("data/getData", '/api/catalog/business_types'),//this.$store.state.authentication.user;// [{"id":1,"name":"CTO"},{"id":2,"name":"shinomantazh"},{"id":3,"name":"shop"},{"id":4,"name":"test"}], //   http://localhost:8080/api/catalog/business_types   GET
            // service_types_2: [{"id":4,"name":"gum","businessType":{"id":2,"name":"shinomantazh"}},{"id":5,"name":"disk","businessType":{"id":2,"name":"shinomantazh"}},{"id":6,"name":"test","businessType":{"id":2,"name":"shinomantazh"}}], //   http://localhost:8080/api/catalog/business_types/2/service_types   GET
            // services_3: [{"id":30,"name":"balancing 8","serviceType":{"id":2,"name":"run","businessType":{"id":1,"name":"CTO"}}},{"id":2,"name":"balancing 1","serviceType":{"id":2,"name":"run","businessType":{"id":1,"name":"CTO"}}},{"id":14,"name":"balancing 4","serviceType":{"id":2,"name":"run","businessType":{"id":1,"name":"CTO"}}},{"id":26,"name":"balancing 7","serviceType":{"id":2,"name":"run","businessType":{"id":1,"name":"CTO"}}},{"id":10,"name":"balancing 3","serviceType":{"id":2,"name":"run","businessType":{"id":1,"name":"CTO"}}},{"id":22,"name":"balancing 6","serviceType":{"id":2,"name":"run","businessType":{"id":1,"name":"CTO"}}},{"id":6,"name":"balancing 2","serviceType":{"id":2,"name":"run","businessType":{"id":1,"name":"CTO"}}},{"id":18,"name":"balancing 5","serviceType":{"id":2,"name":"run","businessType":{"id":1,"name":"CTO"}}}], //   http://localhost:8080/api/catalog/service_types/2/services   GET
            // service_types_byid: {"id":3,"name":"engine","businessType":{"id":1,"name":"CTO"}}, //   http://localhost:8080/api/catalog/service_types/3   GET
            // services_3: [{"id":7,"name":"oil change 2","serviceType":{"id":3,"name":"engine","businessType":{"id":1,"name":"CTO"}}},{"id":19,"name":"oil change 5","serviceType":{"id":3,"name":"engine","businessType":{"id":1,"name":"CTO"}}},{"id":31,"name":"oil change 8","serviceType":{"id":3,"name":"engine","businessType":{"id":1,"name":"CTO"}}},{"id":3,"name":"oil change 1","serviceType":{"id":3,"name":"engine","businessType":{"id":1,"name":"CTO"}}},{"id":15,"name":"oil change 4","serviceType":{"id":3,"name":"engine","businessType":{"id":1,"name":"CTO"}}},{"id":27,"name":"oil change 7","serviceType":{"id":3,"name":"engine","businessType":{"id":1,"name":"CTO"}}},{"id":11,"name":"oil change 3","serviceType":{"id":3,"name":"engine","businessType":{"id":1,"name":"CTO"}}},{"id":23,"name":"oil change 6","serviceType":{"id":3,"name":"engine","businessType":{"id":1,"name":"CTO"}}}], //   http://localhost:8080/api/catalog/service_types/3/services   GET
        }
    },
    methods: {
        createStepThree() {
            this.$emit('stepThreeFunction');        
        },
        serviceShow(e){
            console.dir(e.target)

        }
    },
}
</script>

<style>
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
    padding: 28px 0px;
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
}
.services__buttons .services__primaryButton {
    width: 238px;
    background-color: #FFC700;
    color: #000000;
    border: none;
    border-radius: 4px;
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
  column-gap: 40px;
      width: 100%;
}
.services__autocontent label {
    display:block;
    font-size: 16px;
    line-height: 22px;
}
</style>