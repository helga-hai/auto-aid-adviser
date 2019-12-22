<template>
  <div>
    <!-- <h4>Register</h4> -->

      <!-- <form class="login-form active-form" method="post">
        <div class="form-input">
          <input type="email" placeholder="E-mail">
          <div class="error-message">
            <span>Невірний формат e-mail</span>
          </div>
        </div>
        <div class="form-input">
          <input type="password" placeholder="Введіть пароль">
          <div class="error-message">
            <span>Невірний формат e-mail</span>
          </div>
        </div>
        <button class="form-input submit-button">
          Увійти
        </button>
      </form>
      <div class="lost-password">
          <a href="#">Забули пароль?</a>
      </div>
      <div class="media-login">  -->



    <!-- <form class="login-form active-form"
    @submit.prevent="register"

    > -->

    <form class="login-form active-form" @submit.prevent='checkPass'>


      <!-- <label for="name">Name</label>
      <div>
          <input id="name" type="text" v-model="name" required autofocus>
      </div> -->

      <!--<label for="email" >E-Mail Address</label>-->
      <div class="form-input email" >
          <input id="email" placeholder="E-mail" type="email" v-model="email" @focus = "FocusEmail" @blur = " FinishedEmail"  required>
      </div>

     <!-- <label for="password">Password</label>-->
      <div class="form-input pass">
          <input id="password" placeholder="Введіть пароль" type="password" v-model="password" @focus = "FocusPass" @blur = " FinishedPass" required >
          <span id='checkPass'></span>
      </div>

      

      <!--<label for="password-confirm">Confirm Password</label>-->
      <div class="form-input pass2">
          <input id="password-confirm" placeholder="Повторіть пароль" type="password" v-model="password_confirmation"  @focus = "FocusPass2" @blur = " FinishedPass2" required>
          <span id='checkPass_Conf'></span>
      </div>
      <checkbox-component class="accept" title="Я власник бизнесу" id="role" true-value="ROLE_BUSINESS" false-value="ROLE_USER" @toggleFunc='toggleFunc' />
      <p class="acceptText">Натискаючи кнопку ви погоджуєтесь з
        <router-link to="/">Умовами використання</router-link>
      </p>
      <div>
          <button class="form-input submit-button disabled" type="submit">зареєструватися</button>
      </div>
    </form>
  </div>
</template>




<script>
import CheckboxComponent from "@/components/CheckboxComponent.vue"
export default {
  name: 'RegisterPage',

  data() {
    return {
      //name: "",
      email: "",
      password: "",
      password_confirmation: "",
      role: "ROLE_USER",
      invEmail: false,
    };
  },

  methods: {


    // register: function() {
    //   return data = {
    //     email: this.email,
    //     password: this.password,
    //     role: this.role,
    //   };
      
      // this.$store.dispatch("registration/register", data)

        //.then(() => this.$router.push("/"))
        //.catch(err => console.log(err));
    // },

        FinishedEmail() {
        let email = document.querySelector(".email")
        email.className = "form-input email"
        email.classList.add("finished")
      },
        FocusEmail() {
        let email = document.querySelector(".email")
        email.className = "form-input email"
        email.classList.add("focus")
      },
    
        FinishedPass() {
        let pass = document.querySelector(".pass")
        pass.className = "form-input pass"
        pass.classList.add("finished")
      },
        FocusPass() {
        let pass= document.querySelector(".pass")
        pass.className = "form-input pass"
        pass.classList.add("focus")
      }, 
        FinishedPass2() {
        let pass = document.querySelector(".pass2")
        pass.className = "form-input pass2"
        pass.classList.add("finished")
      },
        FocusPass2() {
        let pass= document.querySelector(".pass2")
        pass.className = "form-input pass2"
        pass.classList.add("focus")
      },

    toggleFunc(val) {
      console.log('emited value', val)
      return this.role = val;
    },


    
    checkPass(){
      console.log(this.password)
      let numRE = /[0-9]/;
      let bigL = /[A-Z]/;
      let letter = /[a-z]/;
      let msg = document.getElementById('checkPass');
      msg.style.backgroundColor = 'red';
      let msg2 = document.getElementById('checkPass_Conf');
      msg2.style.backgroundColor = 'red';

      if(this.password.length<8||this.password.search(numRE)<0||this.password.search(bigL)<0||this.password.search(letter)<0){
        console.log(this.password.search(numRE));
        console.log(this.password.search(bigL));
        console.log(this.password.search(letter));
        return msg.innerText = 'Пароль має складатись мінімум з 8-и символів містити принаймні одну велику літеру та одну цифру';
        
      }else if(this.password!==this.password_confirmation){
        msg.innerText = '';
        return msg2.innerText = 'Паролі не співпадають';


      }else{
      let data = {
        email: this.email,
        password: this.password,
        role: this.role,
      };
      msg.innerText = '';
      msg2.innerText = '';
      this.$store.dispatch("registration/register", data)
      };
    },


  },
  components:{
    CheckboxComponent,
  },
};
</script>

<style scoped>

/*button{
  border: 1px solid #000;
  border-radius: 4px;

}






.btn{
  width: 180px;
  height: 55px;
  position: relative;
  top: 26px;
}
a.button.orange {
  font-size: 11px;
  text-decoration: none;
  text-transform: uppercase;
  width: 180px;
  height: 55px;
  display: block;
  text-align: center;
  line-height: 60px;
  font-family: Roboto;
  border-radius: 4px;
  background-color: #FFC700;
}

div,input {
  box-sizing: border-box;
}
.modal-login-registration {
  padding: 32px 50px;
  width: 400px;
  position: absolute;
  /* left: auto; 
  right: -400px;
  top: 0;
  bottom: 0px;
  background-color: #FFFFFF;
  transition: right 1s;

}
.modal-login-registration.active-modal {
  right: 0;
}
.close-x {
  display: flex;
  justify-content: flex-end;
}
.close-x .close {
  display: block;
  width: 15px;
  height: 15px;
}
.close:hover {
  cursor: pointer;
}
.entrance {
  margin-top: 43px;
  display: flex;
  justify-content: flex-start;
  align-content: center;
}
.entrance .mode, .entrance .divider {
  display: flex;
  align-content: center;
}
.entrance .mode span {
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  color: #0E1E2E;
  opacity: 0.5;
}
.entrance .mode.active {
  opacity: 1;
} */
.login-form {
  margin-top: 38px;
}
/*.login-form label {
  display: none;
}*/
.login-form .form-input {
  position:relative;
  margin-bottom: 36px;
  width: 300px;
  height: 56px;
}
.login-form .form-input input {
  width: 100%;
  height: 100%;
  padding-left: 16px;
  border: 1px solid #6F7E95;
  border-radius: 4px;
  font-size: 16px;
  line-height: 22px;
  color: #0E1E2E;
}

/* форматирование полей ввода при валидации*/
.login-form .form-input.focus input {
  padding: 28px 16px 6px 16px;
  border: 1px solid #00BCD4;
}

 .login-form .form-input::before {
  display:none;
  position:absolute;
  top:9px;
  left:16px;
  font-size: 12px;
  line-height: 12px;
  color: #00BCD4;
}
 .login-form .form-input.email::before {
  content:"E-mail";
}
.login-form .form-input.pass::before {
  content:"Пароль";
}
.login-form .form-input.pass2::before {
  content:"Пароль";
}
.login-form .form-input.finished input {
  padding: 28px 16px 6px 16px;
  border: 1px solid #A5AEBC;
}
.login-form .form-input.finished::before {
  display:block;
  color: #A5AEBC;
}
 .login-form .form-input.focus::before {
  display:block;
}
.login-form .form-input.is-invalid input {
  padding: 28px 16px 6px 16px;
  border: 1px solid #FF1744;
}
.login-form .form-input.is-invalid::before {
  display:block;
  color: #FF1744;
}
.login-form .form-input.email.is-invalid::after {
  content:"Невірний формат e-mail ";
  position:absolute;
  top:60px;
  left:16px;
  font-size: 12px;
  line-height: 12px;
  color: #FF1744;
}
.login-form .form-input.pass.is-invalid::after {
  content:"Невірний пароль";
  position:absolute;
  top:60px;
  left:16px;
  font-size: 12px;
  line-height: 12px;
  color: #FF1744;
}


::-webkit-input-placeholder {
  font-size: 16px;
  line-height: 18px;
  color:#A5AEBC;
}
::-moz-placeholder {
  font-size: 16px;
  line-height: 18px;
  color:#A5AEBC;
}/* Firefox 19+ */
:-moz-placeholder {
  font-size: 16px;
  line-height: 18px;
  color:#A5AEBC;
}/* Firefox 18- */
:-ms-input-placeholder {
  font-size: 16px;
  line-height: 18px;
  color:#A5AEBC;
}
.login-form .submit-button {
  background: #FFC700;
  border-radius: 4px;
  padding-left: 0px;
  text-align: center;
  width: 300px;
  height: 56px;
  border: 0;
  text-transform: uppercase;
}
.login-form .submit-button.disabled {
  background: #E4E7EB;
  color: #A5AEBC;
}
.media-login {
  margin-bottom: 36px;
  text-align: center;
}
.social-providers {
  margin: 0px;
  padding: 0px;
}
.accept {
  text-align: left;
  font-size: 16px;
  line-height: 19px;
  margin-bottom: 38px;
}
.acceptText {
  text-align: left;
  font-size: 16px;
  line-height: 22px;
  margin-bottom: 28px;
}
.acceptText a{
  text-decoration-line: underline;
  color: #3cccde;
}
</style>