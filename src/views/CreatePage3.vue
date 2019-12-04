<template>
    <business-layout>
        <div class="registrStep2">
            <h1>Реєстрація об’єкту</h1>
            <form>
                <label>Выберите из списка типы обслуживаемых автомобилей</label>
                    <select size="1">
                        <option disabled selected>Типы авто</option>
                        <option >fdgsdg</option>    
                    </select>
                <label>Выберите из списка основные услуги, которые оказывает обьект</label>
                    <select size="1">
                        <option disabled selected>Типы авто</option>
                        <option >fdgsdg</option>    
                    </select>
                <div class="registrStep2__buttons">
                    <input type="reset" value="Отмена" class="registrStep1__secondaryButton">
                    <input type="submit" value="Продолжить 1/3" class="registrStep1__primaryButton">    
                </div>
            </form>
        </div>  
    </business-layout>
</template>

<script>
import BusinessLayout from "@/layouts/BusinessLayout";
export default {
    name: 'CreatePage3',
    components: {
        BusinessLayout,
    },
}
</script>

<style>
/* step02.css */
.registrStep2 {
    padding: 56px 48px 50px 48px;
}
.registrStep2 form {
    width: 379px;
}
.registrStep2 h1 {
    margin-top: 0px;
    margin-bottom: 40px;
    font-weight: 500;
    font-size: 24px;
    line-height: 36px;
}
.registrStep2 label {
    display: inline-block;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 24px;
}
.registrStep2__buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    margin-top: 32px;
}
.registrStep2__buttons input {
    display: inline-block;
    text-align: center;
    padding: 19px 0 19px 0;
    font-size: 16px;
    line-height: 18px;
    text-transform: uppercase;
}
.registrStep2__buttons .registrStep1__secondaryButton {
    width: 125px;
    background-color: white;
    color: #6F7E95;
    border: 1px solid #6F7E95;
    border-radius: 4px;
}
.registrStep2__buttons .registrStep1__primaryButton {
    width: 238px;
    background-color: #FFC700;
    color: #000000;
    border: none;
    border-radius: 4px;
}
</style>