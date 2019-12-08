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

    <form class="login-form active-form" @submit='checkPass'>


      <!-- <label for="name">Name</label>
      <div>
          <input id="name" type="text" v-model="name" required autofocus>
      </div> -->

      <label for="email" >E-Mail Address</label>
      <div class="form-input">
          <input id="email" type="email" v-model="email" required>
      </div>

      <label for="password">Password</label>
      <div class="form-input">
          <input id="password" type="password" v-model="password" required >
          <span id='checkPass'></span>
      </div>

      

      <label for="password-confirm">Confirm Password</label>
      <div class="form-input">
          <input id="password-confirm" type="password" v-model="password_confirmation" required>
          <span id='checkPass_Conf'></span>
      </div>
      <checkbox-component title="if Business owner" id="role" true-value="ROLE_BUSINESS" false-value="ROLE_USER" @toggleFunc='toggleFunc' />
      <div>
          <button class="form-input submit-button" type="submit">Register</button>
      </div>
      <div class="lost-password">
          <a href="#">Забули пароль?</a>
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

button{
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
  /* left: auto; */
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
}
.login-form {
  margin-top: 26px;
}
.login-form .form-input {
  margin-bottom: 36px;
}
.login-form .form-input input {
  width: 300px;
  height: 56px;
  padding-left: 16px;
  border: 1px solid #6F7E95;
  border-radius: 4px;
}
.login-form .submit-button {
  background: #FFC700;
  border-radius: 4px;
  padding-left: 0px;
  text-align: center;
  width: 300px;
  height: 56px;
  border: 0;
}
.lost-password {
  margin-bottom: 36px;
  text-align: center;
}
.media-login {
  margin-bottom: 36px;
  text-align: center;
}
.social-providers {
  margin: 0px;
  padding: 0px;
}
</style>