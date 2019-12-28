<template>    
    <business-layout>
      <h1>CreatePage4</h1>
      <input type="reset" value="Отмена" class="registrStep2__secondaryButton">
      <input type="submit" value="Продолжить 3/3" class="registrStep2__primaryButton" @click="createStepFour">
    </business-layout>
</template>

<script>
import BusinessLayout from "@/layouts/BusinessLayout";
export default {
    name: 'CreatePage4',
    components: {
        BusinessLayout,
    },
    methods: {
      createStepFour() {
          this.$emit('stepFourFunction')
      }
    },
}
</script>

<style>

</style>