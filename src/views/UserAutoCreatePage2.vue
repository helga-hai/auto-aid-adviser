<template>

    <!-- <user-layout :email = email()> -->

        <div class="registerAuto" >
            <h1>Реєстрація автомобіля</h1>
            <form>
                <div class="registerAuto__car">
                    <p><span>Оберіть тип транспортного засобу</span></p>

                <ul class="carType">
                 <li
                 
                 v-for="t in types()"
                :key="t.id"
                @click='selectType'
                :id="t.id"
                tabindex = 1
                 >{{t.name}}</li>
                 </ul>


                </div>
                <span>Выбрано: {{ selectedType }} {{selectedTypeId}}</span>
                <!-- <span>Выбрано: {{ selected }}</span> -->
                <select type="text" name="brand" id="brand" placeholder="Марка" v-model='selectedBrand' required >
                    <option disabled value="" >Марка</option>
                    <option 
                    v-for="b in brands()"
                    :key="b.id"
                    @click='selectBrand'
                    :id="b.id"
                    >
                    {{b.name}}
                    </option>
                </select>
                <span>Выбрано: 
                    {{ selectedBrand }} 
                    {{selectedBrandId}}
                </span>


                <div class="modelShowMsg">
                    <span v-if='formCheck.check===true'>{{formCheck.msg}}</span>
                </div>
                <select @click="getModel" type="text" name="model" id="model" placeholder="Модель" v-model="modelType" required>
                    <option disabled value="" >Модель</option>
                    <option 
                    v-for="m in models()"
                    :key="m.id"
                    @click='select'
                    :id="m.id"
                    >
                    {{m.name}}
                    </option>
                </select>
                <span>{{modelId}}</span>




                <input type="text" name="fuelType" id="fuelType" placeholder="Тип палива" v-model="fuelType" required>
                <input type="text" name="year" id="year" placeholder="Рік випуску" v-model="year" required>
                    <div class="registrStep3__Foto">
                        <p class = "registrStep3__ft">Додайте фотографії автомобілю</p>
                        <div>
                        <label class= "registrStep3__addFile">
                            <input type="file" accept="image/*">
                            <span>+ Фото</span>
                        </label>
                        </div>
                        <p class = "registrStep3__fp">* розмір файлу до 500 Кб</p>        
                    </div>
                <p><span>*максимум п`яти фото, до 500Кб кожна </span></p>

                <!-- <ul v-for="t in test"><li>{{t.name}}</li></ul> -->


                <div class="registerAuto__buttons">
                    <input type="submit" value="Назад" class="registerAuto__secondaryButton" @click="back">
                    <input type="submit" value="Зберегти" class="registerAuto__primaryButton">    
                </div>
            </form>
        </div>

    <!-- </user-layout> -->
</template>

<script>

import userdataservice from '../_store/userdataservice.module';
import { userService } from '../_services';



export default {
    name: 'UserAutoCreatePage2',

    // components: {

    //     userService,
    // },
    data() {
        return {
            // types:{
            //     type1: 'Мотоцикл',
            //     type2: 'Легкове',
            //     type3: 'Вантажівка',
            //     type4: 'Автобус',
            // },

            models(selectedTypeId,selectedBrandId) {return this.$store.state.userdataservice.models},
            // models: models(),
            modelType:'',
            modelId:'',
            fuelType:"",
            year:"",
            types() {return this.$store.state.userdataservice.types},
            selectedType:'',
            selectedTypeId:'',
            brands(){return this.$store.state.userdataservice.brands},
            selectedBrand:'',
            selectedBrandId:'',
            formCheck:{
                check: false,
                msg:'Спочатку оберить тип та марку авто!!!',
            },
            
            
        }
    },
    watch: {


    },
    computed: {
//    models(selectedTypeId ,selectedBrandId) {return this.$store.state.userdataservice.models},
    },
    update() {

    },
    created() {

    },
    methods: {
        back(){
            this.$emit('switchView','user-auto-create-page');
        },
        selectType(e){
            console.log(e.target.id);
            console.log(e.target);
            this.selectedType = e.target.textContent;
            this.selectedTypeId = e.target.id;
            // this.getModel();
            return e.target.textContent;
        },
        selectBrand(e){
            console.log('work');
            console.log(e.target.id);
            // this.getModel();
            return this.selectedBrandId = e.target.id
        },
        select(e,property){
            console.log('work');
            console.log(e.target.id);

            return this.modelId= e.target.id
        },
        getModel(typeId,modelId){

            if(!this.selectedTypeId||!this.selectedBrandId){
                this.formCheck.check = true;
                let checkMsg = document.querySelector("div.modelShowMsg");
                console.log(checkMsg);
                checkMsg.style.color='red'
                let self = this
                let select = document.querySelector("select#model")
                select.onblur = function(){
                    console.log("blur "+self.formCheck.check);
                    self.formCheck.check=false;
                    console.log("blur "+self.formCheck.check);
                    };
                return;
            }else{
                this.formCheck.check=false;
                console.log('Search results .....');
                let typeID = this.selectedTypeId;
                let brandID = this.selectedBrandId;
                console.log(typeID,brandID);
                let requestString = `api/catalog/car/model/type/${typeID}/brand/${brandID}`;
                console.log(requestString);
            userService.getAllUserData('requestString')
            .then(function(result){return result})
            .then(result=>this.$store.dispatch('userdataservice/fieldsVal',[result,'models']))
            }

        },

        // beforeCreate(){
        //     getTypes();
        // },
    }
}
</script>

<style>
/* step01.css */
.Step1Image {
    height: 100%;
}
.Step1Image__labe {
    width: 673px;
    height: 100%;
}
.registerAuto {
    padding: 56px 48px 56px 48px;
}
.registerAuto form {
    width: 379px;
}
.registerAuto h1 {
    margin-top: 0px;
    margin-bottom: 40px;
    font-weight: 500;
    font-size: 24px;
    line-height: 36px;
}
.registerAuto label {
    display: inline-block;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 24px;
}
.registerAuto input,select {
    width: 100%;
    height: 56px;
    margin-bottom: 16px;
    border: 1px solid #6F7E95;
    border-radius: 4px;
}

.registerAuto__buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    margin-top: 32px;
}
.registerAuto__buttons input {
    display: inline-block;
    text-align: center;
    padding: 19px 0 19px 0;
    font-size: 16px;
    line-height: 18px;
    text-transform: uppercase;
}
.registerAuto__buttons .registerAuto__secondaryButton {
    width: 125px;
    background-color: white;
    color: #6F7E95;
    border: 1px solid #6F7E95;
    border-radius: 4px;
}
.registerAuto__buttons .registerAuto__primaryButton {
    width: 238px;
    background-color: #FFC700;
    color: #000000;
    border: none;
    border-radius: 4px;
}
.photo{
    height: 120px;
    width: 100px;
    border: 3px dashed #6F7E95;
    border-radius: 4px;
    margin: 15px 0px
}
ul.carType{
    margin: 20px 0 20px 0;
    display: inline-block;

}
ul.carType>li{
    background-color: #6F7E95;
    border-radius: 15px 15px;
    padding: 5px 10px 5px 10px;
    color: #000000;
    margin-left: 5px;
    display: list-item inline;
}
ul.carType>li:hover{
    cursor: pointer;
}
ul.carType>li:focus{

    background-color: #FFC700;
}
ul.carType>li:active{
    cursor: pointer;
    background-color: #FFC700;
}


</style>