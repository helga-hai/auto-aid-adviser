import { data } from '../_store/data.module';
<template>
    <business-layout>
        <div class="registrStep2">
            <img class="registrStep2_img1" src = "../assets/027-checklist.png">
            <img class="registrStep2_img2" src = "../assets/Group 133.png">
            <h1>Реєстрація об’єкту</h1>
                        {{services}}
            <!-- <select v-model="typeBusiness">
                <option disabled value="">Выберите один из вариантов</option>
                <option >CTO</option>
                <option>shinomantazh</option>
            </select> -->
            <!-- <div v-for="service in services" :key="service.id"> {{service.serviceType.businessType.name}} </div> -->
            <!-- <div v-if="typeBusiness == 'CTO'">
                <div v-for="service in services" :key="service.id">
                    <div > {{ service | filterCTO}}</div>
                </div>
            </div> -->
            <!-- <div v-if="services.serviceType.businessType.name == 'CTO'">
                <div v-for="service in services" :key="service.id">
                    <div > {{ service}}</div>
                </div>
            </div> -->
            <!-- <div  v-if="typeBusiness == 'shinomantazh'">
                <div v-for="service in services" :key="service.id">
                    {{service | filterShinomantazh}} 
                </div>
            </div> -->
                <p>Выберите из списка типы обслуживаемых автомобилей</p>
                <div class="registrStep2__types" :class="{'opened': typesShow}" >
                    <div  class="registrStep2__typename" @click = "typesShow = !typesShow">
                        <span>Типы авто</span>
                        <img :src="require('../assets/arrow drop down.png')" class="registrStep2__icon" :class="{'transform': typesShow}">
                    </div>
                    <div class="registrStep2__item"></div>
                </div>
                <hr>
                

                <p>Выберите из списка основные услуги, которые оказывает обьект</p>
                <div  v-for="service in services">
                    <div class="registrStep2__services" :class="{'opened': serviceShow}" >
                        <div  class="registrStep2__servicename" @click = "serviceShow = !serviceShow">
                            <span>{{service}}</span>
                            <img :src="require('../assets/arrow drop down.png')" class="registrStep2__icon" :class="{'transform': serviceShow}">
                        </div> 
                        <div class="registrStep2__checkwrapp">
                            <div class="registrStep2__checkAll">    
                                <label for="All"><input type="checkbox" id="All" value="Обрати все">Обрати все</label>
                            </div>
                            <div class="registrStep2__check" >
                                <div class ="registrStep2__column1">
                                    <label for="oil"><input type="checkbox" id="oil" value="Замена масла в двигателе" checked>Замена масла в двигателе</label>
                                    <label for="diagnostics"><input type="checkbox" id="diagnostics" value="Компьютерная диагностика" >Компьютерная диагностика</label>
                                    <label for="engineFilter"><input type="checkbox" id="engineFilter" value="Замена воздушного фильтра двигателя" checked>Замена воздушного фильтра двигателя</label>
                                    <label for="cabinFilter"><input type="checkbox" id="cabinFilter" value="Замена воздушного фильтра салона" >Замена воздушного фильтра салона</label>
                                    <label for="oil2"><input type="checkbox" id="oil2" value="Замена масла в КПП" >Замена масла в КПП</label>
                                    <label for="coolant"><input type="checkbox" id="coolant" value="Замена охлаждающей жидкости" >Замена охлаждающей жидкости</label>
                                </div>
                                <div class ="registrStep2__column2">
                                    <label for="belt"><input type="checkbox" id="belt" value="Замена ремня ГРМ" >Замена ремня ГРМ</label>
                                    <label for="driveBelt"><input type="checkbox" id="driveBelt" value="Замена приводного ремня" >Замена приводного ремня</label>
                                    <label for="driveRollers"><input type="checkbox" id="driveRollers" value="Замена роликов привода" >Замена роликов привода</label>
                                    <label for="engineFlushing"><input type="checkbox" id="engineFlushing" value="Промывка двигателя" >Промывка двигателя</label>
                                    <label for="replacement"><input type="checkbox" id="replacement" value="Замена комплекта ремня ГРМ с роликами и водяной помпой" >Замена комплекта ремня ГРМ с роликами и водяной помпой</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="registrStep2__services" :class="{'opened': serviceShow}" >
                    <div  class="registrStep2__servicename" @click = "serviceShow = !serviceShow">
                        <span>Сервисное ТО</span>
                        <img :src="require('../assets/arrow drop down.png')" class="registrStep2__icon" :class="{'transform': serviceShow}">
                    </div> 
                    <div class="registrStep2__checkwrapp">
                        <div class="registrStep2__checkAll">
                            <label for="All"><input type="checkbox" id="All" value="Обрати все">Обрати все</label>
                        </div>
                        <div class="registrStep2__check" >
                            <div class ="registrStep2__column1">
                                <label for="oil"><input type="checkbox" id="oil" value="Замена масла в двигателе" checked>Замена масла в двигателе</label>
                                <label for="diagnostics"><input type="checkbox" id="diagnostics" value="Компьютерная диагностика" >Компьютерная диагностика</label>
                                <label for="engineFilter"><input type="checkbox" id="engineFilter" value="Замена воздушного фильтра двигателя" checked>Замена воздушного фильтра двигателя</label>
                                <label for="cabinFilter"><input type="checkbox" id="cabinFilter" value="Замена воздушного фильтра салона" >Замена воздушного фильтра салона</label>
                                <label for="oil2"><input type="checkbox" id="oil2" value="Замена масла в КПП" >Замена масла в КПП</label>
                                <label for="coolant"><input type="checkbox" id="coolant" value="Замена охлаждающей жидкости" >Замена охлаждающей жидкости</label>
                            </div>
                            <div class ="registrStep2__column2">
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
                <div class="registrStep2__services" :class="{'opened': brakeSystShow}" >
                    <div  class="registrStep2__servicename" @click = "brakeSystShow = !brakeSystShow">
                        <span>Тормозная система</span>
                        <img :src="require('../assets/arrow drop down.png')" class="registrStep2__icon" :class="{'transform': brakeSystShow}">
                    </div>
                </div>
                <hr>
                <div class="registrStep2__services" :class="{'opened': suspensionShow}" >
                    <div  class="registrStep2__servicename" @click = "suspensionShow = !suspensionShow">
                        <span>Подвеска</span>
                        <img :src="require('../assets/arrow drop down.png')" class="registrStep2__icon" :class="{'transform': suspensionShow}">
                    </div>
                </div>
                <hr>
                <div class="registrStep2__services" :class="{'opened': steerageShow}" >
                    <div  class="registrStep2__servicename" @click = "steerageShow = !steerageShow">
                        <span>Рулевое управление</span>
                        <img :src="require('../assets/arrow drop down.png')" class="registrStep2__icon" :class="{'transform': steerageShow}">
                    </div>
                </div>
                <hr>
                <div class="registrStep2__services" :class="{'opened': enginegeShow}" >
                    <div  class="registrStep2__servicename" @click = "enginegeShow = !enginegeShow">
                        <span>Двигатель</span>
                        <img :src="require('../assets/arrow drop down.png')" class="registrStep2__icon" :class="{'transform': enginegeShow}">
                    </div>
                </div>
                <hr>
                <div class="registrStep2__services" :class="{'opened': wiringShow}" >
                    <div  class="registrStep2__servicename" @click = "wiringShow = !wiringShow">
                        <span>Электрика</span>
                        <img :src="require('../assets/arrow drop down.png')" class="registrStep2__icon" :class="{'transform': wiringShow}">
                    </div>
                </div>
                <hr>
                <div class="registrStep2__services" :class="{'opened': exhaustShow}" >
                    <div  class="registrStep2__servicename" @click = "exhaustShow = !exhaustShow">
                        <span>Выхлопная система</span>
                        <img :src="require('../assets/arrow drop down.png')" class="registrStep2__icon" :class="{'transform': exhaustShow}">
                    </div>
                </div>
                <hr>
                <div class="registrStep2__services" :class="{'opened': clutchShow}" >
                    <div  class="registrStep2__servicename" @click = "clutchShow = !clutchShow">
                        <span>Сцепление</span>
                        <img :src="require('../assets/arrow drop down.png')" class="registrStep2__icon" :class="{'transform': clutchShow}">
                    </div>
                </div>
                <hr>
                <div class="registrStep2__services" :class="{'opened': transmissionShow}" >
                    <div  class="registrStep2__servicename" @click = "transmissionShow = !transmissionShow">
                        <span>Трансмиссия</span>
                        <img :src="require('../assets/arrow drop down.png')" class="registrStep2__icon" :class="{'transform': transmissionShow}">
                    </div>
                </div>
                <hr>
                <div class="registrStep2__services" :class="{'opened': climateShow}" >
                    <div  class="registrStep2__servicename" @click = "climateShow = !climateShow">
                        <span>Климат-контроль</span>
                        <img :src="require('../assets/arrow drop down.png')" class="registrStep2__icon" :class="{'transform': climateShow}">
                    </div>
                </div>
                <hr>
                <div class="registrStep2__services" :class="{'opened': carcassShow}" >
                    <div  class="registrStep2__servicename" @click = "carcassShow = !carcassShow">
                        <span>Кузов</span>
                        <img :src="require('../assets/arrow drop down.png')" class="registrStep2__icon" :class="{'transform': carcassShow}">
                    </div>
                </div>
                <hr>
                <div class="registrStep2__services" :class="{'opened': gasShow}" >
                    <div  class="registrStep2__servicename" @click = "gasShow = !gasShow">
                        <span>ГБО</span>
                        <img :src="require('../assets/arrow drop down.png')" class="registrStep2__icon" :class="{'transform': gasShow}">
                    </div>
                </div>
                <hr>
                <div class="registrStep2__services" :class="{'opened': extraShow}" >
                    <div  class="registrStep2__servicename" @click = "extraShow = !extraShow">
                        <span>Дополнительно</span>
                        <img :src="require('../assets/arrow drop down.png')" class="registrStep2__icon" :class="{'transform': extraShow}">
                    </div>
                </div>
                <hr>
                <div class="registrStep2__buttons">
                    <input type="reset" value="Отмена" class="registrStep2__secondaryButton">
                    <input type="submit" value="Продолжить 2/3" class="registrStep2__primaryButton" @click="createStepThree">    
                </div>

        </div>  
    </business-layout>
</template>

<script>
import BusinessLayout from "@/layouts/BusinessLayout";
export default {
    name: 'CreatePage3',
    components: {
        BusinessLayout,
    },
    data() {
        return {
            typeBusiness: "",
            filtreTemplate: "",
            services: this.$store.state.templateB.serviceTypesList,
            sendServices: '',
            typesShow: false,
            serviceShow: false,
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
        // filteredCTO(){
        //     console.log(this.services.name)
        //     if(this.services.serviceType.businessType.name == "CTO"){return this.sendServices = this.services}
            
        // }
    },
    computed: {
        
    },
    watch: {
       
    },
    filters: {
        filterCTO: function (value) {
            if (value.serviceType.businessType.name == "CTO"){
            console.log(value)
            return value
            }
        },
        filterShinomantazh: function (value) {
            if (value.serviceType.businessType.name  == "shinomantazh"){
            return value
            }
        },
    }
}
</script>

<style>
/* step02.css */
.registrStep2 {
    width: 100%;
    padding: 64px 48px 64px 48px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}
.registrStep2 h1 {
    margin-bottom: 64px;
    font-weight: 500;
    font-size: 24px;
    line-height: 28px;
}
.registrStep2 p {
    padding: 28px 0px;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    font-family: 'Roboto', sans-serif; 
    border: none;
    color: #4B5E7A;
}
.registrStep2 hr {
    width: 100%;
    color: #E4E7EB;
    size: 1px;
    margin: 0px;

}
.registrStep2__buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    width: 379px;
    margin-top: 56px;
}
.registrStep2__buttons input {
    display: inline-block;
    text-align: center;
    padding: 19px 0 19px 0;
    font-size: 16px;
    line-height: 18px;
    text-transform: uppercase;
}
.registrStep2__buttons .registrStep2__secondaryButton {
    width: 125px;
    background-color: white;
    color: #6F7E95;
    border: 1px solid #6F7E95;
    border-radius: 4px;
}
.registrStep2__buttons .registrStep2__primaryButton {
    width: 238px;
    background-color: #FFC700;
    color: #000000;
    border: none;
    border-radius: 4px;
}
.registrStep2_img1 {
    position: absolute;
    top: 143px;
    right: 156px;
}
.registrStep2_img2 {
    position: absolute;
    top: 135px;
    right: 90px;
}
.registrStep2__types, .registrStep2__services {
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
.registrStep2__typename, .registrStep2__servicename {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 28px 0px;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
}
.registrStep2__checkwrapp {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    color: #0E1E2E;
}
.registrStep2__checkAll {
    padding-right: 86px;
    padding-bottom: 28px;
}
.registrStep2__check {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding-bottom: 10px;
}
.registrStep2__check label {
    font-size: 16px;
    line-height: 117%;
    padding-bottom: 18px;
}
.registrStep2__column1 {
    padding-right: 80px;
}
.registrStep2__column1, .registrStep2__column2 {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}
.registrStep2__item {
    display: inline-block;
    width: 400px;
    height: 100px;
    background-color: rebeccapurple;
}
</style>