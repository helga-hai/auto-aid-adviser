<template>
  <div >
        <div class="redactWrapp">
            <button class = "redactWrapp__del" @click="deleteCar">
                <img :src="require('../assets/icoDelete.png')"> 
                Видалити
            </button>
            <button  class = "redactWrapp__edit" @click="togglerData=!togglerData">
                <img :src="require('../assets/icoEdit.png')"> 
                Редагувати
            </button>
        </div>

        <div class = "CurrentCarWrapper">
            <div class = "Car">
                    <div class="slideshow-container">
                        <div 
                            v-for="car in filterCarsImages()" 
                            :key="car.id" 
                            class="mySlides fade"
                            >
                                <img alt='' :src="car" >
                        </div>
                        <div v-if="filterCarsImages().length >1">
                            <a class="prev" @click="plusSlides(-1)">&#10094;</a>
                            <a class="next" @click="plusSlides(1)">&#10095;</a>
                        </div>
                    </div>
                    <div  style="text-align:center" v-if="filterCarsImages().length >1 ">
                        <span 
                            v-for="n in filterCarsImages().length" 
                            :key="n.id" 
                            class="dot" 
                            @click="currentSlide(n)"                            
                        >
                        </span>
                    </div>
                <!-- <img alt='' :src = "currentCar.images[0].urlImage"/> -->
                <div class = "info">
                    
                    <h5>{{currentCar.carModel.carBrand.name}}</h5>
                    <p>{{currentCar.carModel.name}}/{{currentCar.releaseYear}}</P>
                    <p>{{currentCar.individualCarNaming}}</p>
                    <p>{{currentCar.description}}</p>


                </div>
            </div>
            <div class="currentCar__buttons">
                <input type="submit" value="Назад" class="backButton" @click="back">
            </div>
        </div>

        <div class = "changeData" :class="{'onData': togglerData}">
            <div class = "changeDataWrapp">
                <button class="close-x" @click="togglerData=!togglerData"></button>




                <form @submit.prevent='saveUserData'>
                        <label class = "long">Змінити дані</label>
                            <div class = "filds">

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
                                <span>Выбрано: {{ selectedType }} {{ selectedTypeId }}</span>




                                <form @submit.prevent='saveAuto'>
                                    <select type="text" name="brand" id="brand" placeholder="Марка" v-model='selectedBrand' @change='select([brands(), "selectedBrandId"] ,$event)' required >
                                        <option disabled value="">Марка</option>
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

                                    <!-- <p>{{selectedModelIdVal||selectedModelId()}}</p> -->

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
                                </form>

                                
                            </div>
                        <div class="changeDataWrapp__buttons">
                            <input type="submit" value="Зберегти" class="changeDataWrapp__primaryButton">    
                        </div>
                    </form>
            </div>
        </div>

            

            


    

  </div>
</template>

<script>

import userdataservice from '../_store/userdataservice.module';
import { userService } from '../_services';
import { data } from '../_store/data.module';

export default {

    name: 'UserAutoComplite',

    data(){

        return {
            togglerData: false,

            slideIndex : 1,
            

            modelType:'',

            selectedModelIdVal:'',

            selectedModelId: function() {

                if(this.currentIndex<0||!this.currentIndex){
                    return ' ';
                }else if(this.$store.state.userdataservice.models[this.currentIndex-1].id == null){

                return ' ';}

                else{
                    return this.$store.state.userdataservice.models[this.currentIndex-1].id;
                }
                },

            currentIndex: this.$store.state.userdataservice.currentIndex || -1 ,

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

        }

    },

    created() {

        {{this.getTypeAndBrand()}}
        // {{var slideIndex = 1;
        // console.log(this.showSlides)}}
        {{
            console.log("wwerr")
            this.showSlides(this.slideIndex)}}


    },
    computed:{

        currentCar: function(){
            var car = this.$store.state.userdataservice.currentCar;
            return car
        },

        currentCarIMG: function(){
            var carIMG = this.$store.state.userdataservice.currentCar.images;
            return carIMG;
        },
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

        currentBrand(){return this.$store.state.userdataservice.currentCar.carModel.carBrand},


    },
    mounted() {
        // {{this.caruselLogic()}}
        //         {{var slideIndex = 1;}}
        // {{this.showSlides(this.slideIndex);}}
    },

    methods:{

        filterCarsImages(){
            let сarsImages = []
            let CarIMG = this.$store.state.userdataservice.currentCar.images;
            CarIMG.forEach(item => {
                if (сarsImages.indexOf(item.urlImage) < 0) {
                    сarsImages.push(item.urlImage)
                }
            })
            return сarsImages

        },

        plusSlides(n) {
        this.showSlides(this.slideIndex += n);
        },

        currentSlide(n) {
        this.showSlides(this.slideIndex = n);
        },

        showSlides(n) {
            var i;
            var slides = document.getElementsByClassName("mySlides");
            var dots = document.getElementsByClassName("dot");
            if (n > slides.length) {this.slideIndex = 1}    
            if (n < 1) {this.slideIndex = slides.length}
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";  
            }
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
            }
            slides[this.slideIndex-1].style.display = "block";  
            dots[this.slideIndex-1].className += " active";
            },

        getPath(file){
            return '/images/' + file
        },

        back(){
            this.$emit( 'switchView','user-auto-complite-car-cards-page' );
        },

        getTypeAndBrand(){

            console.log('FOOOOOO');

            userService.getAllUserData('api/catalog/car/types')
            .then(function(result){return result})
            .then(result=>this.$store.dispatch('userdataservice/fieldsVal',[result,'types']))

            userService.getAllUserData('api/catalog/car/brands')
            .then(function(result){return result})
            .then(result=>this.$store.dispatch('userdataservice/fieldsVal',[result,'brands']))

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
            let
            index = $event.target.selectedIndex,
            currentIDField = currentFieldWithID[1],
            currentIDValue = currentFieldWithID[0][index-1].id;

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

        clearField(dataField, stateField, index){

            this[dataField] = '';
            this.$store.dispatch('userdataservice/fieldsVal',[null, stateField]);
            this[index] = '';

        },

        editCar(){

        },

        deleteCar(){

            console.log(this.$store.state.userdataservice.currentCar.id);

            let deleteCarID = this.$store.state.userdataservice.currentCar.id;

            this.$store.dispatch( 'userdataservice/DELETE_USER_CAR', deleteCarID );

            if( (this.$store.state.userdataservice.cars.length - 1 > 0 ) ){

                console.log( this.$store.state.userdataservice.cars.length);

                this.back();

            }else{

                this.$emit( 'switchView' , 'user-auto-create-page' )

            }

            

        },
    },

}
</script>

<style scoped>

    .CurrentCarWrapper{
        display: block;
        margin: 0 auto;
    }

    .Car{
        display: inline-block;
        background: #FFFFFF;
        border: 1px solid #C9CFD7;
        box-sizing: border-box;
        box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.15), 0px 2px 4px rgba(0, 0, 0, 0.16);
        border-radius: 4px;
        margin: 5px;
        position: relative;
    }

    .Car img{
        display: block;
        width:640px;
        height: 480px;
        margin: 0 auto;
    }

    .Car .info{
        display: inline-block;
        padding: 10px;
        box-sizing: border-box;
        bottom:40px;
    }

    .Car .info p{
        padding: 20px 0px 20px 0px;
    }

    span .objects__button{
        margin-bottom: 20px;
    }

    .currentCar__buttons input {
        display: inline-block;
        text-align: center;
        padding: 19px 0 19px 0;
        font-size: 16px;
        line-height: 18px;
        text-transform: uppercase;
    }

    .currentCar__buttons {
        margin: 20px 0 20px 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        width: 100%;
        margin-top: 32px;
    }

    .currentCar__buttons .backButton {
        width: 125px;
        background-color: white;
        color: #6F7E95;
        border: 1px solid #6F7E95;
        border-radius: 4px;
    }

    .currentCar__buttons .backButton {
        width: 238px;
        background-color: #FFC700;
        color: #000000;
        border: none;
        border-radius: 4px;
    }

    .changeWrapp__buttons input {
    display: inline-block;
    text-align: center;
    padding: 19px 0 19px 0;
    font-size: 16px;
    line-height: 18px;
    text-transform: uppercase;
    }

    .changeWrapp__buttons .changeWrapp__primaryButton {
        width: 100%;
        background-color: #FFC700;
        color: #000000;
        border: none;
        border-radius: 4px;
    }
    .close-x  {
        position: absolute;
        right: 45px;
        top: 27px;
        width: 14px;
        height: 14px;
        border: none;
        cursor: pointer;
        z-index: 10px;
    }
    .close-x:before, .close-x:after {
        position: absolute;
        top: 0px;
        right: 6px;
        content: ' ';
        height: 16px;
        width: 2px;
        background-color: #6F7E95;
    }
    .close-x:before {
        transform: rotate(45deg);
    }
    .close-x:after {
        transform: rotate(-45deg);
    }
    /* основная часть*/
    .profileReady, .redactWrapp {
    margin-top: 60px;
    }
    .profileReady button, .redactWrapp button {
    border: none;
    text-transform: uppercase;
    font-size: 16px;
    line-height: 18px;
    }

    .redactWrapp{
        position: relative;
        top: 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-right: 54px;
        width: 300px;
    }

    .redactWrapp button {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }

    .redactWrapp button img {
        margin-right:10px;
    }

    .redactWrapp__del {
        color: #FF1744;
    }

    .redactWrapp__edit {
        color: #00BCD4;
    }





    .changeData {
    display: none;
    position: absolute;
    top:0;
    left: 0;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width:100%;
    height:100%;
    background-color:rgba(0, 0, 0, 0.6);
    z-index:5;
    }
  .onData {
    display: flex;
  }

  .changeDataWrapp {
    position: relative;
    width:630px;
    height:750px;
    padding: 87px 50px 64px 50px;
    background-color:rgb(255, 255, 255);
    border-radius: 8px;
  }
  .changeDataWrapp form {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
  }
  .changeDataWrapp form .long {
    width: 100%;
  }
  .changeDataWrapp .filds {
    width:100%
  }
  .changeDataWrapp__img {
    width:180px;
    height: 180px;
  }
  .changeDataWrapp label {
    display: inline-block;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 28px;
}
.changeDataWrapp input {
    width: 100%;
    height: 56px;
    margin-bottom: 16px;
    border: 1px solid #6F7E95;
    border-radius: 4px;
}
.changeDataWrapp__buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    margin-top: 32px;
}
.changeDataWrapp__buttons input {
    display: inline-block;
    text-align: center;
    padding: 19px 0 19px 0;
    font-size: 16px;
    line-height: 18px;
    text-transform: uppercase;
}

.changeDataWrapp__buttons .changeDataWrapp__primaryButton {
    width: 100%;
    background-color: #FFC700;
    color: #000000;
    border: none;
    border-radius: 4px;
}
  

 /* смена пароля*/

  .change {
    display: none;
    position: absolute;
    top:0;
    left: 0;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width:100%;
    height:100%;
    background-color:rgba(0, 0, 0, 0.6);
    z-index:5;
    }
  .on {
    display: flex;
  }
  .done {
    background-color:rgba(0, 0, 0, 0);
  }
  .changeWrapp {
    position: relative;
    width:400px;
    height:490px;
    padding: 87px 50px 64px 50px;
    background-color:rgb(255, 255, 255);
    border-radius: 8px;
  }
  .changeWrapp__done {
    width:100%;
    height:100%;
    display: none;
    flex-direction: row;
    justify-content: center;
    align-items: center;

  }
  .changeWrapp__done img {
    margin-right: 32px;
  }
  .changeWrapp__done p {
    font-size: 16px;
    line-height: 22px;
    color: #0E1E2E;
  }
  .done  .changeWrapp {
    width: 462px;
    height: 153px;
    padding: 0

  }
   .done  .changeWrapp form {
     display: none;
   }
 .done  .changeWrapp__done {
   display: flex;
 }
  .changeWrapp label {
    display: inline-block;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 28px;
}

   .done  .changeWrapp form {
     display: none;
   }
 .done  .changeWrapp__done {
   display: flex;
 }


/* carusel */

.mySlides {display: none}

img {vertical-align: middle;}

.slideshow-container {
  max-width: 1000px;
  position: relative;
  margin: auto;
}

.prev, .next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  padding: 16px;
  margin-top: -22px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
}


.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}


.prev:hover, .next:hover {
  background-color: rgba(0,0,0,0.8);
}


.dot {
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 10px 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}

.active, .dot:hover {
  background-color: #717171;
}


.fade {
  -webkit-animation-name: fade;
  -webkit-animation-duration: 1.5s;
  animation-name: fade;
  animation-duration: 1.5s;
}

@-webkit-keyframes fade {
  from {opacity: .4} 
  to {opacity: 1}
}

@keyframes fade {
  from {opacity: .4} 
  to {opacity: 1}
}

@media only screen and (max-width: 300px) {
  .prev, .next,.text {font-size: 11px}
}

</style>