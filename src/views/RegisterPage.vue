<template>
  <div>
    <h4>Register</h4>
    <form @submit.prevent="register">
      <!-- <label for="name">Name</label>
      <div>
          <input id="name" type="text" v-model="name" required autofocus>
      </div> -->

      <label for="email" >E-Mail Address</label>
      <div>
          <input id="email" type="email" v-model="email" required>
      </div>

      <label for="password">Password</label>
      <div>
          <input id="password" type="password" v-model="password" required>
      </div>

      <label for="password-confirm">Confirm Password</label>
      <div>
          <input id="password-confirm" type="password" v-model="password_confirmation" required>
      </div>
      <checkbox-component title="if Business owner" id="role" true-value="ROLE_BUSINESS" false-value="ROLE_USER" @toggleFunc='toggleFunc' />
      <div>
          <button type="submit">Register</button>
      </div>
    </form>
    <slot></slot>
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
    register: function() {
      let data = {
        email: this.email,
        password: this.password,
        role: this.role,
      };
      this.$store.dispatch("registration/register", data)
        //.then(() => this.$router.push("/"))
        //.catch(err => console.log(err));
    },

    toggleFunc(val) {
      console.log('emited value', val)
      return this.role = val;
    },


  },
  components:{
    CheckboxComponent,
  },
};
</script>