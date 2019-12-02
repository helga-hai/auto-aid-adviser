<template>
<div>
  <Header />
    <main>
        <sideBar />
        <section class="registrStep1">
            <div class="registrStep1__formWrapp">
                <h1>Реєстрація об’єкту</h1>
                <p> test<p>
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
import Header from "@/components/Header";
import Header from "@/components/sideBar";
export default {
    name: 'CreatePage',
    components: {
        Header,
        sideBar,
    },
}
</script>

<style scoped>
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