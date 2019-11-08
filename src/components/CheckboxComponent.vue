<template>
    <div>
        <input
        type="checkbox"
        v-bind:id="id"
        v-model = "toggle"
        @change = "someFunc"
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
          toggle: this.falseValue,
          role: function(toggle){
            let _role = this.toggle
            return _role
            },
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
      let role = this.role();
      console.log(role);
      return role;
    },
  },
  methods: {
    someFunc(e) {
      console.log(e)
      this.$emit('anotherFunc', this.toggle)
    }
  }
}

</script>

