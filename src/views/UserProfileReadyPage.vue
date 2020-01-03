<template>
<div class="ready">
    <div class="profileReady">
      <h1>Особисті данні</h1>
      <div class="info">  
        <div class="info__img" :style="{backgroundImage: 'url('+require('../assets/Rectangle142.svg')+')'}"></div>
        <div class="info__text" > 
          <h2>Уик{{surname}} Джoн{{name}}</h2>
          <p class = "info__phone">093 7859898{{phone}}</p>
          <p class = "info__email">jwick@gmail.com{{email}}</p>
          <button class = "info__logoChange"  @click="toggler=!toggler">Змінити пароль</button>
        </div>
      </div>
    </div>
    <div class="redactWrapp">
      <button class = "redactWrapp__del">
        <img :src="require('../assets/icoDelete.png')"> 
        Видалити
      </button>
      <button  class = "redactWrapp__edit" @click="togglerData=!togglerData">
        <img :src="require('../assets/icoEdit.png')"> 
        Редагувати
      </button>
    </div>
    <div class = "change" :class="{'on': toggler, 'done': toggler2}">
      <div class = "changeWrapp">
        <button class="close-x" @click="toggler=!toggler, toggler2=false"></button>
        <form>
          <label>Змінити пароль</label>
          <input type="password" name="oldPassword" id="oldPassword" placeholder="Існуючий пароль" v-model="oldPassword">
          <input type="password" name="newPassword" id="newPassword" placeholder="Новий пароль" v-model="newPassword">
          <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Підтвердження нового паролю" v-model="confirmPassword">

          <div class="changeWrapp__buttons">

            <input  value="Зберегти" class="changeWrapp__primaryButton" @click="toggler2=!toggler2">    
          </div>
        </form>
        <div class="changeWrapp__done">
          <img :src="require('../assets/illustration.png')"> 
          <p>Ваш пароль успішно змінено!</p>
        </div>
      </div>
    </div>
    <div class = "changeData" :class="{'onData': togglerData}">
      <div class = "changeDataWrapp">
        <button class="close-x" @click="togglerData=!togglerData"></button>
         <form @submit.prevent='saveUserData'>
                <label class = "long">Змінити дані</label>
                <div class = "filds">
                  <input type="text" name="surname" id="surname" placeholder="Прізвище" v-model="surname" required>
                  <input type="text" name="name" id="name" placeholder="Ім'я" v-model="name" required>
                  <input type="text" name="phone" id="phone" placeholder="Телефон" v-model="phone">
                </div>
                <div class="changeDataWrapp__img" :style="{backgroundImage: 'url('+require('../assets/Rectangle142.svg')+')'}"></div>
                <div class="changeDataWrapp__buttons">

                    <input type="submit" value="Зберегти" class="changeDataWrapp__primaryButton">    
                </div>
            </form>
      </div>
    </div>
  </div> 
</template>

<script>

  import passChange from '../components/passChange';

  export default {

  name:"UserProfileReadyPage",
  components: {

      passChange,
  },
  data(){
      return{
          toggler: false,
          toggler2: false,
          togglerData: false,
          oldPassword:"",
          newPassword:"",
          confirmPassword:"",
          surname:this.$store.state.userdataservice.personalPageData.surname,
          name:this.$store.state.userdataservice.personalPageData.name,
          phone:this.$store.state.userdataservice.personalPageData.phone,
          email:this.$store.state.userdataservice.personalPageData.email,

          }
      
      },

  }
</script>

<style>
  div.ready {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width:100%;
  height:100%;
  }

  /* смена данных*/

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
    height:479px;
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
    width:50%
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
.changeWrapp input {
    width: 100%;
    height: 56px;
    margin-bottom: 16px;
    border: 1px solid #6F7E95;
    border-radius: 4px;
}
.changeWrapp__buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    margin-top: 32px;
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
.profileReady{
  margin-left: 48px;

}
.profileReady h1 {
  margin-bottom: 60px;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
}
.info {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;

}
.info__img {
  width:260px;
  height: 260px;
}
.info__text {
  margin-left:24px;
}
.info__text h2 {
  margin-bottom: 20px;
  font-size: 32px;
  line-height: 37px;
  color: #0E1E2E;
}
.info__phone {
  margin-bottom: 15px;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
}
.info__phone::before {
  content:"";
  display:inline-block;
  position: relative;
  top: 5px;
  width: 24px;
  height: 24px;
  margin-right: 8px;
  background-image: url(../assets/ico-phone.png);
}
.info__email {
  margin-bottom: 62px;
  font-size: 16px;
  line-height: 22px;
}
.info__email::before {
  content:"";
  display:inline-block;
  position: relative;
  top: 5px;
  width: 24px;
  height: 24px;
  margin-right: 8px;
  background-image: url(../assets/ico-internet.png);
}
.info__logoChange {
  color: #00BCD4;
}
.redactWrapp{
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
</style>