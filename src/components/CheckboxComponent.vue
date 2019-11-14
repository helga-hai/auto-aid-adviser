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
  },

  methods: {
    someFunc(e) {
      console.log(e)
      this.$emit('toggleFunc', this.toggle)
    }
  }
}

</script>

