<template>
  <div>
    <form class="login-form active-form" @submit.prevent='sendData'>

      <div class="form-input email" >
          <input id="email" placeholder="E-mail" type="email" v-model="email" @focus = "FocusEmail" @blur="FinishedEmail"  required>
      </div>

      <div class="form-input pass">
          <input id="password" placeholder="Введіть пароль" type="password" v-model="password" @focus = "FocusPass" @blur="checkPass" required >
          <span id='checkPass'></span>
          <div class="error" v-if="errorPass.check">{{errorPass.txt}}</div>
      </div>

      <div class="form-input pass2">
          <input id="password-confirm" placeholder="Повторіть пароль" type="password" v-model="password_confirmation"  @focus="FocusPass2" @input="checkPassSame" required >
          <span id='checkPass_Conf'></span>
          <div class="error" v-if="errorPassSame.check">{{errorPassSame.txt}}</div>
      </div>
      <checkbox-component class="accept" title="Я власник бизнесу" id="role" true-value="ROLE_BUSINESS" false-value="ROLE_USER" @toggleFunc='toggleFunc' />
      <p class="acceptText">Натискаючи кнопку ви погоджуєтесь з
        <router-link to="/">Умовами використання</router-link>
      </p>
      <div>
          <button class="form-input submit-button" :disabled="disabledCheck()" type="submit" >зареєструватися</button>
      </div>
    </form>
  </div>
</template>




<script>
import CheckboxComponent from "@/components/CheckboxComponent.vue"
export default {
  name: 'RegisterPage',
  props: ['innerPreload'],
  data() {
    return {
      //name: "",
      email: "",
      password: "",
      password_confirmation: "",
      role: "ROLE_USER",
      invEmail: true,
      disabled: 'disabled',
      errorPass: {
        check: false,
        txt: 'Пароль має складатись мінімум з 8-и символів містити принаймні одну велику літеру та одну цифру'
      },
      errorPassSame: {
        check: false,
        txt: 'Паролі не співпадають'
      }
    };
  },
  methods: {
      disabledCheck() {
        return this.email && this.password && this.password_confirmation && !this.errorPass.check && !this.errorPassSame.check ? false : 'disabled';
      },
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


    checkPassSame() {
      if(this.password!==this.password_confirmation){
        this.errorPassSame.check = true
      }
      else if(this.password==this.password_confirmation){
        this.errorPassSame.check = false
      }
    },
    checkPass(){
      console.log('checkPass',this.password)
      let numRE = /[0-9]/;
      let bigL = /[A-Z]/;
      let letter = /[a-z]/;

      if(this.password.length<8||this.password.search(numRE)<0||this.password.search(bigL)<0||this.password.search(letter)<0){
        console.log(this.password.search(numRE));
        console.log(this.password.search(bigL));
        console.log(this.password.search(letter));
        this.errorPass.check = true
        
      } else if(this.password.length>=8 && this.password.search(numRE)>=0 && this.password.search(bigL)>=0 && this.password.search(letter)>=0) {
        this.errorPass.check = false
      }

      if(this.password_confirmation!=='') {
        this.checkPassSame()
      }
      
    },
    sendData() {
      this.$emit('afterPreloaderFunc')
      let data = {
        email: this.email,
        password: this.password,
        role: this.role,
      };
      this.$store.dispatch("registration/register", data)
    }


  },
  components:{
    CheckboxComponent,
  },
};
</script>

<style scoped>


.login-form {
  margin-top: 38px;
}

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
.login-form .submit-button:disabled {
  background: #E4E7EB;
  color: #A5AEBC;
  cursor:default
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
  position:relative;
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
.error {
color: #ff6464;
    font-size: 11px;
    line-height: 13px;
    text-align: left;
    margin-top: 3px;
}
</style>