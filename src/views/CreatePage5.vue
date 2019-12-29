<template>
    <business-layout>
      <h1>CreatePage5<br>CardMax</h1>
      <input type="reset" value="Отмена" class="registrStep2__secondaryButton">
      <input type="submit" value="Опубликовать" class="registrStep2__primaryButton" @click="createStepFive">
    </business-layout>
</template>

<script>
import BusinessLayout from "@/layouts/BusinessLayout";
import CardMax from "../components/cardMax";
export default {
    name: 'CreatePage5',
    components: {
        BusinessLayout,
        // CardMax
    },
    methods: {
      createStepFive() {
          this.$emit('stepFiveFunction')
      }
    }
}
</script>

<style>

</style>