<template>
    <div>
    <header>
        <a href="#" class ="logo">
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
                <li><a href="#" >{{email}}</a></li>
                <li><a href="#">Вийти</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <section class="sideBar">
            <p>Особистий кабінет</p>
            <ul>
                <li class="sideBar__list "><a href="#" class="sideBar__button">Особисті данні</a></li>
                <li class="sideBar__list "><a href="#" class="sideBar__button">Мої автомобілі</a></li>
                <li class="sideBar__list "><a href="#" class="sideBar__button">записи до станції</a></li>
                <li class="sideBar__list "><a href="#" class="sideBar__button">Налаштування</a></li>
            </ul>
        </section>
        <section class="objectsWrapp">
            <slot></slot>
        </section>
    </main>
    <footer>
        <p class="footerTitle">2019 Hillel EVO project. Auto Aid Adviser</p>
    </footer>
    </div>
</template>


<script>
export default {
    props:['email'],
    data(){
        return{

        }
    }

}

</script>

<style>
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
body, 
#app {
  width: 100%;
  margin: 0;}
body,
#app {
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
.logo {
    width: 113.23px;
    height: 32px;
}
.topMenu {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;  
    font-size: 16px;
    line-height: 19px;
}
.topMenu a, .topMenu .topMenu__selected {
    color: #6F7E95;
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
    text-align: left;
}
.sideBar p {
    color: #0E1E2E;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    margin: 0;
    padding-left: 48px;
    padding-right: 10px;
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
    line-height: 22px;
    padding-bottom: 26px;
}
.sideBar__button:hover {
    color: black;
}
/*content*/
.objectsWrapp {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    width: calc(100% - 216px);
    min-height: calc(100vh - 80px - 79.6px);
    text-align: left;
}
/*  footer  */
footer {
    width: 100%;
    padding: 29px 50px;
    text-align: right;
    background-color: #0E1E2E;
}
.footerTitle {
    font-size: 16px;
    line-height: 22px;
    color: #FFFFFF;
}
</style>