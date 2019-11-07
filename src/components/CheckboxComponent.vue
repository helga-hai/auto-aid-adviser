<template>
    <div>
        <input
        type="checkbox"
        v-bind:id="id"
        v-model = "toggle"
        v-bind:true-value="trueValue"
        v-bind:false-value="falseValue"/>
        <label for="checkbox">{{title}}{{toggle}}</label>
    </div>
</template>

<script>
export default {
  name: 'CheckboxComponent',
  data() {
        return {
          toggle: 'User',
          res: this.toggle,
          w: console.log(this),
    }
  },
  props: {
    id: [String,Number],
    title: String,
    trueValue: String,
    falseValue: String,
  },
  model: {
    prop: 'toggle',
  },
  computed: {

    get: function() {
      let role = this.res;
      console.log(role);
      return role;
    },
  }
}

</script>

