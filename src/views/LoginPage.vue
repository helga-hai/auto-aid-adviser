<template>
    <div>
        <div class="alert alert-info">
            <!-- email: test<br />
            Password: test -->
        </div>
        <!-- <h2>Login</h2> -->



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





        <form @submit.prevent="handleSubmit" class="login-form active-form">
            <div class="form-input email " :class="{ 'is-invalid': submitted && !email}">
                <input type="text" v-model="email" name="email" placeholder="E-mail" class="form-control" :class="{ 'is-invalid': submitted && !email}" @focus = "FocusEmail" @blur = " FinishedEmail"/>
            </div>
            <div class="form-input pass" :class="{ 'is-invalid': submitted && !password }">
                <input type="password" v-model="password" name="password" placeholder="Введіть пароль" class="form-control" :class="{ 'is-invalid': submitted && !password }" @focus = "FocusPass" @blur = " FinishedPass"/>
            </div>
            <div class="form-group">
                <button class="form-input submit-button" :class="{ 'disabled': !password || !email }" :disabled="loggingIn">увійти</button>
                <img v-show="loggingIn" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            </div>
        </form>
        <div class = "passRecovery"><p>Забули пароль?</p></div>
    </div>
</template>

<script>
export default {
    name: 'LoginPage',
    data () {
        return {
            email: '',
            password: '',
            submitted: false
        }
    },
    computed: {
        loggingIn () {
            return this.$store.state.authentication.status.loggingIn;
        }
    },
    created () {
        // reset login status
        this.$store.dispatch('authentication/logout');
    },
    methods: {
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
        handleSubmit (e) {
            this.submitted = true;
            const { email, password } = this;
            const { dispatch } = this.$store;
            console.log("BeforeIfAuthMod "+email, password );
            if (email && password) {
              console.log("AuthMod "+email, password );
                dispatch('authentication/login', { email, password });
            }
        }
    }
};
</script>

<style scoped>

  /*button{
  border: 1px solid #000;
  border-radius: 4px;

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
body{
  width: 800px;
  border: 1px solid;
  height: 100%;
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
.login-form input.is-invalid {
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
.passRecovery p {
  font-size: 16px;
  line-height: 22px;
  text-decoration-line: underline;
  margin-bottom: 36px;
  text-align: center;
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
</style>