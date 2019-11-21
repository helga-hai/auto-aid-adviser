<template>
    <div class="header" :class="{'header__privat':privat, 'header__grey':grey}">
        <div class="header__logo">
            <img src="../assets/aaa_logo.svg"/> 
        </div>   
        <div class="header__nav">
            <router-link to="/">Пошук</router-link>
            <router-link to="/about">Про нас</router-link>
            <span class="header__lang">Укр </span> 
            <router-link to="/authorization">Вхід / Реєстрація</router-link>
            <router-link to="#">Особистий кабінет</router-link>
        </div>
    </div>
</template>

<script>
export default {
    props:['privat','grey'],
    data() {
        return {
        }
    }
}
</script>

<style scoped lang="scss">
.header {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    align-items: center;
    &__privat {
        background: #0E1E2E;
        color: #0E1E2E;
        text-transform: uppercase;
        margin:0;
        .block__nav{
            background: #FFC700;
        }
    }
    &__privat {
        background: #F6F7F8;
        color: #0E1E2E;
        text-transform: uppercase;
        margin:0;
    }
}
.header__logo {
    //width: 13.5%;
    width: 96px;
    height: 26px;
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
    height: 56px;
    font-size: 16px;
    line-height: 56px;
}
.header__nav a {
    text-decoration: none;
}
.header__nav a.router-link-exact-active {
  color: #42b983;
}
</style>