<template>

    <!-- <user-layout :email = email()> -->

        <div class="registerAuto" >
            <h1>Реєстрація автомобіля</h1>
            <div class="registerAuto__car">
                <p><span>Оберіть тип транспортного засобу</span></p>

                <ul class="carType">
                 <li
                    v-for="t in types()"
                    :key="t.id"
                    @click='selectType'
                    :id="t.id"
                    tabindex = 1
                    :class="{'active': t.id==selectedTypeId}"
                    >{{t.name}}</li>
                 </ul>


            </div>
                <span>Выбрано: {{ selectedType }} {{selectedTypeId}}</span>
            <form @submit.prevent='saveAuto'>


                <!-- <div class="registerAuto__car">
                    <p><span>Оберіть тип транспортного засобу</span></p>

                <ul class="carType">

                    <li
                    v-for="t in types()" :key="t.id"
                    @click='selectType'
                    :id="t.id"
                    tabindex = 1
                    :class="{'active': t.id==selectedTypeId}"
                    >{{t.name}}</li>
                 
                </ul>



//////////////////////work in Firefox only!!!!!//////////////////////////////////
                </div>
                <span>Выбрано: {{ selectedType }} {{selectedTypeId}}</span> -->
                <!-- <span>Выбрано: {{ selected }}</span> -->
                <!-- <select type="text" name="brand" id="brand" placeholder="Марка" v-model='selectedBrand' required >
                <select type="text" name="brand" id="brand" placeholder="Марка" v-model='selectedBrand' @change="changeBrandFunc" required >
                    <option disabled value="" >Марка</option>
                    <option v-for="b in brands()"
                    :key="b.id"
                    :id="b.id"
                    >
                    {{b.name}}
                    </option>
                </select>
                <span>Выбрано: 
                    {{ selectedBrand }} 
                    {{selectedBrandId}}
                </span>
                ///////////////////////////////////////////////////////////////////////
                -->


                

                <select type="text" name="brand" id="brand" placeholder="Марка" v-model='selectedBrand' @change='select([brands(), "selectedBrandId"] ,$event)' required >
                    <option disabled value="" >Марка</option>
                    <option 
                    v-for="b in brands()"
                    :key="b.id"
                    :id="b.id"
                    >
                    {{b.name}}
                    </option>
                </select>
                <span>Выбрано: 
                    {{ selectedBrand }} 
                    {{selectedBrandId}}
                </span>


                <!-- 
                    //////////////////////work in Firefox only!!!!!//////////////////////////////////
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
                ///////////////////////////////////////////////////////////////////////////////////
                -->

                <div class="modelShowMsg">
                    <span v-if='formCheck.check===true'>{{formCheck.msg}}</span>
                </div>
                <select @click='getModel' type="text" name="model" id="model" placeholder="Модель" v-model="modelType" required>
                    <option disabled value="" >Модель</option>
                    <option 
                    v-for="m in models"
                    :key="m.id"
                    :id="m.id"
                    >
                    {{m.name}}
                    </option>
                </select>
                <!-- <p>{{currentIndex}}</p> -->
                <p>{{selectedModelIdVal||selectedModelId()}}</p>




                <!-- <input type="text" name="fuelType" id="fuelType" placeholder="Тип палива" v-model="fuelType" required> -->

                <input type="text" name="individualCarNaming" id="individualCarNaming" placeholder="індивідуальна назва авто" v-model="individualCarNaming">
                <input type="textarea" name="description" id="description" placeholder="Пару слів про авто..." v-model="description">


                <select type="text" name="releaseYear" id="releaseYear" placeholder="Рік випуску" v-model="year" required>
                    <option disabled value="" >Рік випуску</option>
                    <option 
                    v-for="y in releaseYear"
                    :key="y.index"

                    >
                    {{y.year}}
                    </option>
                </select>
                    <div class="registrStep3__Foto">
                        <p class = "registrStep3__ft">Додайте фотографії автомобілю</p>


                        <div id="photoForm" class="formPhoto">

                            <PhotoFieldLoad/>

                        </div>
                        <!-- <div>
                        <label class= "registrStep3__addFile">
                            <input id="carphoto"
                             @change='uploadPhoto' 
                             type="file"
                             accept="image/*">
                            <span>+ Фото</span>
                        </label>
                        </div> -->
                        <p class = "registrStep3__fp">* розмір файлу до 500 Кб</p>        
                    </div>
                <p><span>*максимум п`яти фото, до 500Кб кожна </span></p>



               
                <!-- <ul v-for="t in test"><li>{{t.name}}</li></ul> -->
                

                <div class="registerAuto__buttons" ref="foo">
                    <input type="submit" value="Назад" class="registerAuto__secondaryButton" @click="back">
                    <input type="submit" value="Зберегти" class="registerAuto__primaryButton" > 
                </div>
            </form>
        </div>

    <!-- </user-layout> -->
</template>

<script>

import userdataservice from '../_store/userdataservice.module';
import { userService } from '../_services';
import PhotoFieldLoad from '../components/PhotoFieldLoad';



export default {
    name: 'UserAutoCreatePage2',

    components: {

        userService,
        PhotoFieldLoad,
    },
    data() {
        return {
            // types:{
            //     type1: 'Мотоцикл',
            //     type2: 'Легкове',
            //     type3: 'Вантажівка',
            //     type4: 'Автобус',
            // },
            
            // models(selectedTypeId,selectedBrandId) {return this.$store.state.userdataservice.models},
            // models: models(),
            modelType:'',
            // selectedModelId:'',
            selectedModelIdVal:'',
            selectedModelId: function() {
            if(this.currentIndex<0||!this.currentIndex){
                return '';
            }else{
            return this.$store.state.userdataservice.models[this.currentIndex-1].id;}
            },
            currentIndex:''||this.$store.state.userdataservice.currentIndex,
            year:"",
            types() {return this.$store.state.userdataservice.types},
            selectedType:'',
            selectedTypeId:'',
            brands() {return this.$store.state.userdataservice.brands},
            selectedBrand:'',
            selectedBrandId:'',
            formCheck:{
                check: false,
                msg:'Спочатку оберить тип та марку авто!!!',
            },
            individualCarNaming:'',
            description:'',
            car: '',
            images:[],

        }
    },
    watch: {


    },
    computed: {

        releaseYear: function(){ 
                let yearArr = [];
                let yearStart = 1910;
                let yearCurrent = 2020;
                let keyCounter = 0;
                for(let i = yearStart;i<=yearCurrent;i++){
                    let year = {};
                    year.index = keyCounter++;
                    year.year = i;
                    yearArr.push(year);
                    console.log(year)
                }
                return yearArr;
            },
        models: function(selectedTypeId ,selectedBrandId) {return this.$store.state.userdataservice.models},
        
    },


    created() {

        {{this.getTypeAndBrand()}}

    },

    methods: {

        getTypeAndBrand(){

            console.log('FOOOOOO');

            userService.getAllUserData('api/catalog/car/types')
            .then(function(result){return result})
            .then(result=>this.$store.dispatch('userdataservice/fieldsVal',[result,'types']))

            userService.getAllUserData('api/catalog/car/brands')
            .then(function(result){return result})
            .then(result=>this.$store.dispatch('userdataservice/fieldsVal',[result,'brands']))

        },

        back(){
            this.$emit('switchView','user-auto-create-page');
        },
        selectType(e){
            console.log(e.target.id);
            console.log(e.target);
            this.selectedType = e.target.textContent;
            this.selectedTypeId = e.target.id;
            this.clearField('modelType', 'models','currentIndex');
            return e.target.textContent;
        },
        select(currentFieldWithID,$event){
            console.log('work');
            // console.log($event.target.selectedIndex);
            let index = $event.target.selectedIndex;
            let currentIDField = currentFieldWithID[1];
            let currentIDValue = currentFieldWithID[0][index-1].id;
            this.clearField('modelType', 'models','currentIndex');
            // currentIDField=currentIDValue;
            console.log(currentIDField);
            switch(currentIDField){
                case "selectedBrandId":
                    console.log('switch ' +currentIDValue);
                    this.selectedBrandId=currentIDValue;
                break;
            }

        },
        getModel(e){
            
            let select = document.querySelector("select#model")
            let mySetAttr = select.setAttribute
            if(!this.selectedTypeId||!this.selectedBrandId){
                this.formCheck.check = true;
                let checkMsg = document.querySelector("div.modelShowMsg");
                console.dir(checkMsg);
                checkMsg.style.color='red'
                let self = this
                
                select.onblur = function(){
                    console.log("blur "+self.formCheck.check);
                    self.formCheck.check=false;
                    this.modelType="";
                    console.log("blur "+self.formCheck.check);
                    };
                return;
            }else{
                
                    console.log('Search results .....');

                    let
                    typeID = this.selectedTypeId,
                    brandID = this.selectedBrandId;

                    this.formCheck.check=false;

                    console.log(typeID,brandID);

                    let requestString = `api/catalog/car/model/type/${typeID}/brand/${brandID}`;

                    console.log(requestString);
                    
                    userService.getAllUserData(requestString)
                    .then(function(result){
                        console.log("resulTTTTT "+result);
                        return result})
                    .then(result=>this.$store.dispatch('userdataservice/fieldsVal',[result,'models']));
                    
                    console.log('ID '+e.target.id);
                    console.log('ID '+e.target.options);
                    let index = e.target.selectedIndex;
                    console.log(index + '????????????????????????????????????');

                    if(index==0){
                    this.currentIndex = '';
                    }else{
                        this.$store.dispatch('userdataservice/fieldsVal',[index,'currentIndex']);
                        this.currentIndex = index;
                    ;}

                    if(e.target.id!='model'){
                    this.selectedModelIdVal = e.target.id
                    }

            }

        },
        // uploadPhoto(e){
            
        //     console.dir(e.srcElement.files[0])
            //let photo = e.srcElement.files[0]
            //let photo = {};
            //photo.img = e.srcElement.files[0];
            //var _n = e.srcElement.value.split("\\").pop();
            //photo.name = _n;
            // this.images[0] = e.srcElement.files[ 0 ];

            //console.log("consoleLOG"+this.images[0],e.srcElement.files[0]);

        //     console.dir(this.images[0]);

        // },
        saveAuto() {

            let photos = document.getElementById('photoForm');
            console.log(photos.childNodes[0].elements);
            
            let auto = {
                releaseYear: parseInt(this.year) || 1910, /* 1900 Не работает, доступные данные лучше чтоб приходили с сервера */
                individualCarNaming: this.individualCarNaming || 'мойа ластіука', 
                description: this.description || 'спиздив у діда',
                carModel:
                {
                    id: parseInt( this.selectedModelIdVal || this.selectedModelId() ) || 1  /* null || 0  то сервер выпадает в 500 */
                }
                
            };

            	for( var arr = [], i = 0; i < photos.childNodes[0].elements.length; i++ ){

		        if('file' == photos.childNodes[0].elements[ i ].type && photos.childNodes[0].elements[ i ].files[ 0 ] ) {


			    arr.push( photos.childNodes[0].elements[ i ].files[ 0 ] );
			    console.log( )
		        }	
            }
            
            console.log( arr )
            
            let images = arr;

            console.log(images);

            
            // let autoInfo = JSON.stringify(auto);
            this.$store.dispatch('userdataservice/GET_MULTIPART', { auto, images })

            this.$emit('switchView','user-auto-complite-car-cards-page');
            


            // console.log(auto)
            // userService.postAllUserData(`api/user/profile/car`,auto)
            // .then(function(result){return result})
            // .then(result=>this.$store.dispatch('userdataservice/fieldsVal',[result,'car']))
            // console.log(this.$store.state.userdataservice.car)
        },

        clearField(dataField, stateField, index){
            this[dataField] = '';
            this.$store.dispatch('userdataservice/fieldsVal',[null, stateField]);
            this[index] = '';
        },
    },

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
    display: inline;
}
ul.carType>li:hover{
    cursor: pointer;
}
ul.carType>li:focus,
ul.carType>li:active{
    background-color: #FFC700;
}
ul.carType>li.active {
    background-color: #FFC700;
}
ul.carType>li:active{
    cursor: pointer;
    background-color: #FFC700;
}

	.form			{}
	.form label,
	.form span		{width:100px; height:100px;}
	.form label		{display:inline-block; border:1px #777 solid; overflow:hidden; margin:4px; position:relative;}
	.form input		{visibility:hidden;}
	.form span		{display:table-cell; text-align:center; vertical-align:middle; font-weight:bold; font-size:50px;}

	.form label		{transition:background ease-out 0.2s;}
	.form label:hover	{background:#ffa;}

	.form a			{position:absolute; display:block; top:4px; right:4px; width:16px; height:16px; background:#f00; border-radius:50%; line-height:16px; text-decoration:none; color:#fff; text-align:center;}

	.form img		{max-width:96%; max-heigth:96%;}

</style>