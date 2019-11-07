<template>
    <div>
        <input
        type="checkbox"
        id="checkbox"
        v-bind:checked="checked"
         v-on:change="$emit('change', $event.target.checked)"/>
        <label for="checkbox">{{title}}</label>
    </div>
</template>

<script>
export default {
    name: 'CheckboxComponent',
    data() {
        return {
        }
    },
      props: {
    checked: Boolean,
    title: String
  },
      model: {
    prop: 'checked',
    event: 'change'
  },
}

</script>

