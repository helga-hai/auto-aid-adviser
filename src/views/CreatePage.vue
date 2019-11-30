<template>
<div>
  <header>
        <a href="#">
            <img :src="require('../assets/aaa_logo.svg')">
        </a>
        <nav>
            <ul class="topMenu">
                <li><a href="#">Пошук</a></li>
                <li><a href="#">Про нас</a></li>
                <li class="topMenu__language">
                    <div class="topMenu__selected">
                        <span class="topMenu__langLabel selLabel">Укр</span>
                        <img :src="require('../assets/arrow drop down.png')" class="topMenu__icon">
                    </div>
                    <div class="topMenu__langSwitch">
                        <a>
                            <span class="topMenu__langLabel">Укр</span>
                        </a>
                        <a>
                            <span class="topMenu__langLabel">Рус</span>
                        </a>
                    </div>
                </li>
                <li><a href="#">Особистий кабінет</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <section class="sideBar">
            <p>Особистий кабінет</p>
            <ul>
                <li class="sideBar__list "><a href="#" class="sideBar__button">Особисті данні</a></li>
                <li class="sideBar__list "><a href="#" class="sideBar__button">Мої об‘єкти</a></li>
                <li class="sideBar__list "><a href="#" class="sideBar__button">Заявки клієнтів</a></li>
                <li class="sideBar__list "><a href="#" class="sideBar__button">Налаштування</a></li>
            </ul>
        </section>
        <section class="registrStep1">
            <div class="registrStep1__formWrapp">
                <h1>Реєстрація об’єкту</h1>
                <form>
                    <div class="registrStep1__address">
                        <label for="name">Вкажіть місцезнаходження об’єкту на карті або введіть адресу</label>
                        <input type="text" name="address" id="address">
                    </div>
                    <label>Данные обьекта</label>
                    <input type="text" name="title" id="title">
                    <input type="text" name="phone" id="phone">
                    <input type="text" name="site" id="site">
                    <div class="registrStep1__buttons">
                        <input type="reset" value="Отмена" class="registrStep1__secondaryButton">
                        <input type="submit" value="Продолжить 1/3" class="registrStep1__primaryButton">    
                    </div>
                </form>
            </div>
            <div class="registrStep1__image" :style="{backgroundImage: 'url('+require('../assets/mapa.jpg')+')'}"></div>
        </section>
    </main>
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
/*  TOP MENU  */
* {
    box-sizing: border-box;
}
ul {
    list-style-type: none; 
    margin: 0;
    padding: 0;
} 
a {
    text-decoration: none;
    cursor: pointer; 
    color: #4B5E7A; }
html,
body {
  width: 100%;
  margin: 0;}
body {
    font-family: 'Roboto', sans-serif; 
    background-color:  rgb(255, 255, 255);
    color: #4B5E7A;}
input {
    font-family: 'Roboto', sans-serif; 
    color: #4B5E7A;
}
header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 24px 50px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.16);
    background-color:  rgb(255, 255, 255);
    z-index: 3;
}
.topMenu {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;  
    font-size: 16px;
    line-height: 19px;
}
.topMenu li {
    margin-left: 40px;
}
.topMenu li :hover {
    color: black;
}
.topMenu__language {
    position: relative;
}
.topMenu__selected {
    cursor: pointer;
}
.topMenu__icon {
    width: 20px;
    height: 15px;
}
.topMenu__langSwitch {
    position: absolute;
    visibility: hidden;
    opacity: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;  
}

/*  sideBar.css  */
main {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
    width: 100%;
    z-index: 2;
}
.sideBar {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 216px;
    padding-top: 56px;
    background-color: #F6F7F8;
}
.sideBar p {
    color: #0E1E2E;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    margin: 0;
    padding: 0px 28px;
}
.sideBar ul {
    padding: 36px 0px 0px 16px;
}
.sideBar__list ::before {
    content: '';
    display: inline-block;
    width: 16px;
    height: 8px;
    background-color: #E4E7EB;
    margin-right: 16px ;
}
.sideBar__button {
    display: inline-block;
    font-size: 16px;
    padding-bottom: 26px;
}
.sideBar__button:hover {
    color: black;
}

/* step01.css */
.registrStep1 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    width: calc(100% - 216px);
}
.registrStep1__image {
    width: 673px;
    height: 687px;
    /* background-image: url(img/mapa.jpg); */
}
.registrStep1__formWrapp {
    padding: 56px 48px 0px 48px;
}
.registrStep1__formWrapp form {
    width: 379px;
}
.registrStep1__formWrapp h1 {
    margin-top: 0px;
    margin-bottom: 40px;
    font-weight: 500;
    font-size: 24px;
    line-height: 36px;
}
.registrStep1__formWrapp label {
    display: inline-block;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 24px;
}
.registrStep1__formWrapp input {
    width: 100%;
    height: 56px;
    margin-bottom: 16px;
    border: 1px solid #6F7E95;
    border-radius: 4px;
}
.registrStep1__buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    margin-top: 32px;
}
.registrStep1__buttons input {
    display: inline-block;
    text-align: center;
    padding: 19px 0 19px 0;
    font-size: 16px;
    line-height: 18px;
    text-transform: uppercase;
}
.registrStep1__buttons .registrStep1__secondaryButton {
    width: 125px;
    background-color: white;
    color: #6F7E95;
    border: 1px solid #6F7E95;
    border-radius: 4px;
}
.registrStep1__buttons .registrStep1__primaryButton {
    width: 238px;
    background-color: #FFC700;
    color: #000000;
    border: none;
    border-radius: 4px;
}

</style>