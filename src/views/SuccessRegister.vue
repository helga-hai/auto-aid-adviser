<template>
  <div class="success">
      <h1>
          Check your e-mail!
      </h1>
  </div>
</template>

<script>
export default {
    name: 'SuccessRegister',
}
</script>

<style lang="scss" scoped>
.success {
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;
    h1 {
        margin: 0 auto;
        text-transform: uppercase;
        width: 200px;
    }
}
</style>