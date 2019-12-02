<template>
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
                <li><a href="#">Особистий кабінет</a></li>
            </ul>
        </nav>
    </header>
</template>

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

</style>