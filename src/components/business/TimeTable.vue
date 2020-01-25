<template>
  <!--<form enctype="multipart/form-data" @submit.prevent="send">-->
  <div :class="{'spinner-wrap':waitResponse}">
    <div v-if="waitResponse" >

      <svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
        <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
      </svg>

    </div>
    <div v-else class="registrStep3">
      <h1>Реєстрація об’єкту</h1>
      <div class="registrStep3__workingWrapp">
        <div  class="registrStep3__name">
            <span>Режим роботи</span>
        </div>
        <div class="registrStep3__modeWrapp">
          <div class="registrStep3__mode">
            <label for="always"><input type="radio" name="mode" id="always" value="always" v-model="picked"><span>Цілодобово</span></label>
            <label for="onTime"><input type="radio" name="mode" id="onTime" value="onTime" v-model="picked"><span>По годинах</span></label>
          </div>
          <div class="registrStep3__schedule" ref="sheduleBlock">
            <div class="registrStep3__workDays">
              <p class = "days">Робочі дні</p>

              <div class="registrStep3__day" v-for="item in week.slice(0, 5)" :key="item.id">
                  <label :for="item.name">
                    <input type="checkbox" name="" :id="item.name" :value="item.selected" v-model="item.selected">
                    <p>{{item.name}}</p>
                  </label>
                  <div ><!--v-if="picked=='onTime' && item.selected"-->
                    <input type="time" name=""  value="08:00" v-model="item.from">
                    <p>до</p>
                    <input type="time" name=""  value="18:00" v-model="item.to">
                  </div>
              </div>

            </div>
            <div class="registrStep3__daysOff">
              <p class = "days">Вихідні дні</p>

                <div class="registrStep3__day" v-for="item in week.slice(5)" :key="item.id">
                    <label :for="item.name">
                      <input type="checkbox" name="" :id="item.name" :value="item.selected" v-model="item.selected">
                      <p>{{item.name}}</p>
                    </label>
                    <div >
                      <input type="time" name="" value="08:00" v-model="item.from">
                      <p>до</p>
                      <input type="time" name="" value="18:00" v-model="item.to">
                    </div>
                </div>

            </div>
          </div>
        </div>
      </div>
      <hr>
      <div class="registrStep3__services" :class="{'opened': komfort}" >
        <div  class="registrStep3__servicename" @click="komfort=!komfort">
            <span>Комфорт</span>
            <img :src="require('../../assets/arrow drop down.png')" class="registrStep3__icon" :class="{'transform': komfort}">
        </div>
      </div>
      <hr>
      <div class="registrStep3__services" :class="{'opened': more}" >
        <div  class="registrStep3__servicename" @click="more=!more">
            <span>Додатково</span>
            <img :src="require('../../assets/arrow drop down.png')" class="registrStep3__icon" :class="{'transform': more}">
        </div>
      </div>
      <hr>
      <!-- <form  method="post" enctype="multipart/form-data" @submit.prevent="send"> -->
        <div class="registrStep3__Foto">
          <p class = "registrStep3__ft">Фото об’єкта</p>
          <div>
            <label class= "registrStep3__addFile" for="file">
              <input  type="file" id="file" accept="image/*" @change="uploadPhoto">
              <span>+ Фото</span>
            </label>
            <!-- <label class= "registrStep3__addFile">
              <input type="file" accept="image/*">
              <span>+ Фото</span>
            </label> -->
          </div>
          <p class = "registrStep3__fp">* розмір файлу до 500 Кб</p>        
        </div>
        <div class="registrStep3__Info">
          <p>Інформація о станціі</p>
          <textarea placeholder ="Опишите ваш бизнес"></textarea>       
        </div>
        <div class="registrStep3__buttons">
            <input type="reset" value="Отмена" class="registrStep3__secondaryButton"/>
            <button type="submit" v-on:click="send()" value="Продолжить 3/3"  class="registrStep3__primaryButton" > Продолжить 3/3</button>  
        </div>
      <!-- </form> -->
    </div> 
  </div>
</template>

<script>
export default {
    name: 'TimeTable',
    components: {
    },
    data() {
        return {
            komfort: false,
            more: false,
            picked: null,
            week: [
              { id: 1, name: 'Понеділок', from: null, to: null, selected: false },
              { id: 2, name: 'Вівторок', from: null, to: null, selected: false },
              { id: 3, name: 'Середа', from: null, to: null, selected: false },
              { id: 4, name: 'Четвер', from: null, to: null, selected: false },
              { id: 5, name: 'П`ятниця', from: null, to: null, selected: false },
              { id: 6, name: 'Субота', from: null, to: null, selected: false },
              { id: 7, name: 'Неділя', from: null, to: null, selected: false }
            ],
            images:[],
            waitResponse: false,
        }
    },
    computed: {
      prepend () {
        return this.$store.state.create.businessPrepend
      }
    },
    watch: {
      picked(newVal, oldVal){
        if(newVal == 'always') {
          this.week.forEach(item=>{
            item.selected = true;
            item.from = "00:00";
            item.to = "23:59";
            this.$refs.sheduleBlock.style.pointerEvents = "none"
          })
        } else {
            this.$refs.sheduleBlock.style.pointerEvents = "auto"
        }
      },
      prepend(newVal, oldVal) {
          if(newVal) {
            this.waitResponse = true
            setTimeout(()=>{
              this.$emit('switchView', 'preview-page');
            },2000)
          }
      }
    },
    methods: {
      async send(e) {
        console.dir(e)
        let arr = this.week;
        let sheduleWeek = []; 
        for(let i=0; i<arr.length; i++) {
          let shaduleDay={};
          if(arr[i].selected) { shaduleDay.day = arr[i].id }
          if(arr[i].from) { shaduleDay.fromTime = arr[i].from }//arr[i].from.split(':')
          if(arr[i].to) { shaduleDay.toTime = arr[i].to }
          if(arr[i].selected) { sheduleWeek.push(shaduleDay) }
        }
        console.log(sheduleWeek);
        await this.$store.dispatch('create/GET_TIME', sheduleWeek)
        await this.$store.dispatch('create/SEND_MULTIPART_BUSINESS', this.images)
        
      },
      uploadPhoto(e) {
        this.images.push(e.target.files[0])
        console.log(typeof e.target.files[0])
        console.log(this.images)
        console.dir(this.images)
      },
      waitFunc() {
        this.waitResponse = true
        // setTimeout(()=>{
        //   this.$emit('switchView', 'PreviewPage');
        // },2000)
        // this.$store.dispatch('create/GET_BUSINESS_DATA')
      },
    }
}
</script>

<style lang="scss">
.registrStep3 {
  width: 100%;
  padding: 64px 48px 64px 48px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.registrStep3 h1 {
  margin-bottom: 64px;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
}

.registrStep3 hr {
  width: 100%;
  color: #E4E7EB;
  size: 1px;
  margin: 0px;

}
.registrStep3__buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 379px;
  margin-top: 56px;
}
.registrStep3__buttons input {
  display: inline-block;
  text-align: center;
  padding: 19px 0 19px 0;
  font-size: 16px;
  line-height: 18px;
  text-transform: uppercase;
}
.registrStep3__buttons .registrStep3__secondaryButton {
  width: 125px;
  background-color: white;
  color: #6F7E95;
  border: 1px solid #6F7E95;
  border-radius: 4px;
}
.registrStep3__buttons .registrStep3__primaryButton {
  width: 238px;
  background-color: #FFC700;
  color: #000000;
  border: none;
  border-radius: 4px;
  height:57px;
}

.registrStep3__services {
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
.registrStep3__servicename {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 28px 0px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
}
.registrStep3__workingWrapp {
  width:100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}
.registrStep3__modeWrapp {
  width: 82%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: 16px;
  line-height: 22px;
}
.registrStep3__mode {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom:18px;
}

input[type="radio"], input[type=file], input[type=checkbox] {
 display:none;
}
.registrStep3__mode span:before {
  content:"";
  box-sizing: border-box;
  display:inline-block;
  position:absolute;
  top:0;
  left: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid #6F7E95;
  background-color: #fff;
}
input[type="radio"]:checked ~ span:before{
  border: none;
  background-color: #FFC700;
}
.registrStep3__mode span:after {
  content:"";
  box-sizing: border-box;
  display:none;
  position:absolute;
  top:4px;
  left: 4px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #0E1E2E;
}
input[type="radio"]:checked ~ span:after{
  display:block;
}
.registrStep3__mode label {
  position:relative;
  padding-left: 44px;
  text-align:center;
  color: #0E1E2E;
  padding-bottom: 20px;
}
input[type="time"] {
  width:85px;
  height:36px;
  font-size: 16px;
  line-height: 22px;
  padding-left: 10px;
  border: 1px solid #6F7E95;
  border-radius: 4px;
}
input[type="time"]:active {
  border: 1px solid #00BCD4;
}
.registrStep3__schedule {
  width:100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom:27px;
}
.registrStep3__name {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
}
.registrStep3__workDays, .registrStep3__daysOff {
  width: 46%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.registrStep3__workDays .days, .registrStep3__daysOff .days {
  margin-bottom: 31px;
}
.registrStep3__day {
  width:100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: #0E1E2E;
  margin-bottom: 16px;
}

.registrStep3__day label {
  position:relative;
  padding-left: 60px;
  text-align:center;
  color: #0E1E2E;
}
.registrStep3__day label p:before {
  content:"";
  box-sizing: border-box;
  display:inline-block;
  position:absolute;
  top:0;
  left: 0;
  width: 32px;
  height: 16px;
  border-radius: 8px;
  background-color: #C9CFD7;
}
input[type="checkbox"]:checked ~ p:before{

  background-color: #FFC700;
}
.registrStep3__day label p:after {
  content:"";
  box-sizing: border-box;
  position:absolute;
  top:2px;
  left: 2px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #6F7E95;
}
input[type="checkbox"]:checked ~ p:after{
  top:2px;
  left: 18px;
  background-color: #0E1E2E;
}


.registrStep3__day p{
 padding: 0px 8px;
}
.registrStep3__day div{
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
.registrStep3__day label {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.registrStep3__Foto {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 64px 0px;
}
.registrStep3__ft, .registrStep3__Info p {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  margin-bottom:16px;
}
.registrStep3__addFile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 103px;
  height: 103px;
  margin-right: 20px;
  border: 1px dashed #6F7E95;
  border-radius: 4px;
}
.registrStep3__fp {
  font-size: 16px;
  line-height: 22px;
  color: #6F7E95;
}
.registrStep3__Foto div{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom:8px;

}
.registrStep3__addFile span {
  font-size: 16px;
  line-height: 18px;
  color: #A5AEBC
}
.registrStep3__Info textarea {
  width: 810px;
  height: 104px;
  resize: none;
  border: 1px solid #6F7E95;
  border-radius: 4px;
  padding: 18px 33px;
}
// html, body { height: 100%; }

// body {
//    display: flex;
//    align-items: center;
//    justify-content: center;
// }

// Here is where the magic happens

$offset: 187;
$duration: 1.2s;

.spinner {
  animation: rotator $duration linear infinite;
}

@keyframes rotator {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(270deg); }
}

.path {
  stroke-dasharray: $offset;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation:
    dash $duration ease-in-out infinite, 
    colors ($duration*4) ease-in-out infinite;
}

@keyframes colors {
	0% { stroke: rgb(35, 50, 73); }
	// 25% { stroke: #DE3E35; }
	50% { stroke: #F7C223; }
	// 75% { stroke: #1B9A59; }
  100% { stroke: rgb(35, 50, 73); }
}

@keyframes dash {
 0% { stroke-dashoffset: $offset; }
 50% {
   stroke-dashoffset: $offset/4;
   transform:rotate(135deg);
 }
 100% {
   stroke-dashoffset: $offset;
   transform:rotate(450deg);
 }
}
.spinner-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: calc(100% - 100px);
    height: 100%;
}
</style>