<template>
    <div class="header">
        <div class="header__logo">
            <img src="../assets/aaa-logo.svg"/> 
        </div>   
        <div class="header__nav">
            <router-link to="/about">Про нас</router-link>
            <span class="header__lang">Укр </span> 
            <router-link to="/authorization">Вхід / Реєстрація</router-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    }
}
</script>

<style scoped>
.header {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin-top: 41px;
    margin-left: 24px;
}
.header__logo {
    width: 13.5%;
    display: inline-block;
}
.header__logo img {
    width: 100%;
    height: auto;
}
.header__nav {
    margin-left: auto;
    display: inline-block;
    align-self: flex-start;
}

.header__nav a {
    padding: 0 30px;
    display:inline-block;
    height: 30px;
    font-size: 16px;
    line-height: 30px;
}
.header__nav a {
    text-decoration: none;
}
.header__nav a.router-link-exact-active {
  color: #42b983;
}
</style>