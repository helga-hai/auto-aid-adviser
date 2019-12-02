<template>
     <section class="objects">
            <div class="objects__text">
                <h1>Мої об’єкти</h1>
                <p>Наразі у вас немає об’єктів.</p>
                <p>Якщо бажаєте, то можемо створити новий об’єкт саме зараз.</p>         
                <span><a href="#" class="objects__button">Создать сейчас</a></span>
            </div>
            <div class="objects__image" :style="{backgroundImage: 'url('+require('../assets/illustration1.jpg')+')'}"></div>
        </section>
</template>

<style>
.objects {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    width: calc(100% - 216px);
    height: calc(100vh - 80px - 79.6px);
    padding: 56px 92px 56px 48px;
}
.objects h1 {
    margin-top: 0;
    margin-bottom: 40px;
    font-weight: 500;
    font-size: 24px;
    line-height: 36px;
}
.objects p {
    margin: 0;
    font-size: 16px;
    line-height: 22px;
}
.objects__button {
    display: inline-block;
    margin-top: 48px;
    width: 240px;
    height: 56px;
    text-align: center;
    padding: 19px 0 19px 0;
    background-color: #0E1E2E;
    border-radius: 4px;
    color: rgb(255, 255, 255);
    font-size: 16px;
    line-height: 18px;
    text-transform: uppercase;
}
.objects__button:hover {
    background-color: #0E1E41;
}
.objects__image {
    width: 477px;
    height: 426px;
}
</style>