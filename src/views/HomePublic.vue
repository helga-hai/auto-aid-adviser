<template>
    <div class="res" :class="{'res__login': loginShow}">
    <div class="one">
      <label for="">Оберіть тип объекту</label  @click="loginShow = !loginShow">
      <button type="button" name="button"  @click="loginShow = !loginShow">
        <div class="selected-option">Аргонна сварка</div>
        <div class="arrow-down"></div>
      </button>
      <ul class="submenu">
        <li class="submenu-item"><a href="#">Аргонна сварка</a></li>
        <li class="submenu-item"><a href="#">item2_2</a></li>
        <li class="submenu-item"><a href="#">item2_3</a></li>
      </ul>
    </div>

    <div class="two">
      <label for="">Де шукати</label>
      <button type="button" name="button">
        <div class="selected-option">Аргонна сварка</div>
        <div class="arrow-down"></div>
      </button>
      <ul class="sub">
        <li class="submenu"><a href="#">Аргонна сварка</a></li>
        <li class="submenu"><a href="#">item2_2</a></li>
        <li class="submenu"><a href="#">item2_3</a></li>
      </ul>
    </div>
    <div class="btn">
      <a href="#" class="button orange">Знайти</a>

    </div>

  </div>
</template>

<script>
import NavComponent from '../components/NavComponent';
export default {
    name: 'HomePublic',
    components: {
        NavComponent
    },
    data () {
      return {
        loginShow: false,
      }
    }
}
</script>

<style scoped>

button{
  border: 1px solid #000;
  border-radius: 4px;
}
.res {
  background: url(require('@/assets/backgroundimage.jpg'));
  position: absolute;
  width: 1131px;
  height: 132px;
  left: 139px;
  top: 325px;
  padding: 20px 16px 26px;
  box-sizing: border-box;
  background: rgba(10, 5, 23, 0.6);
  mix-blend-mode: normal;
  backdrop-filter: blur(20px);

display: flex;
align-content: center;



border-radius: 8px;
}
.one{
  width: 558px;
}
.two{
  width: 380px;
}
.one label {
  font-size: 16px;
  color: #fff;
  margin-bottom: 8px;
  display: block;
}
.one button {
  width: 100%;
  height: 56px;
  position: relative;
  padding-left: 16px;
  background-color: #fff;
  border-color: rgba(10, 5, 23, 0.6);
}
.one .selected-option {
  text-align: left;
  line-height: 50px;
  max-width: 200px;
}
.one .arrow-down {
  position: absolute;
  padding: 15px;
  top: -1px;
  right: 0;

}
.one .arrow-down::after {
content: '';
display: block;
margin-top: 10px;
border: 6px solid transparent;
border-top: 8px solid #000;

}
.one.open .arrow-down::after {
 border-bottom: 8px solid #000;
 border-top: none;
}
.submenu{
 display: none;
  background-color: #fff;
  margin: 0;
  width: 250px;
  padding: 0;
  list-style: none;
  margin: auto;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
}
   .one.open .submenu{
     display: block;
   }
.submenu li {
  height: 48px;
    line-height: 48px;
    padding-left: 16px;
    box-sizing: border-box;
}

.submenu li.selected, .submenu li:hover{
  background: #FFF5C0;
  cursor: pointer;
}




.two label {
  font-size: 16px;
  color: #fff;
  margin-bottom: 8px;
  display: block;
}
.two button {
  width: 100%;
  height: 56px;
  position: relative;
  padding-left: 16px;
  background-color: #fff;
  border-color: rgba(10, 5, 23, 0.6);
}
.two .selected-option {
  text-align: left;
  line-height: 50px;
  max-width: 200px;
}
.two .arrow-down {
  position: absolute;
  padding: 15px;
  top: -1px;
  right: 0;

}
.two .arrow-down::after {
content: '';
display: block;
margin-top: 10px;
border: 6px solid transparent;
border-top: 8px solid #000;

}
.two.open .arrow-down::after {
 border-bottom: 8px solid #000;
 border-top: none;
}
.sub{
 display: none;
 background-color: #fff;
 margin: 0;
 width: 250px;
 padding: 0;
 list-style: none;
 margin: auto;
 box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
}
.two.open .sub{
 display: block;
}
.sub li {
height: 48px;
line-height: 48px;
padding-left: 16px;
box-sizing: border-box;
}

.sub li.selected, .sub li:hover{
background: #FFF5C0;
cursor: pointer;
}


.btn{
  width: 180px;
  height: 55px;
  position: relative;
  top: 26px;
}
a.button.orange {
  font-size: 11px;
  text-decoration: none;
  text-transform: uppercase;
  width: 180px;
  height: 55px;
  display: block;
  text-align: center;
  line-height: 60px;
  font-family: Roboto;
  border-radius: 4px;
  background-color: #FFC700;
}
</style>
