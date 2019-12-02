<template>
    <section class="sideBar">
        <p>Особистий кабінет</p>
        <ul>
            <li class="sideBar__list "><a href="#" class="sideBar__button">Особисті данні</a></li>
            <li class="sideBar__list "><a href="#" class="sideBar__button">Мої об‘єкти</a></li>
            <li class="sideBar__list "><a href="#" class="sideBar__button">Заявки клієнтів</a></li>
            <li class="sideBar__list "><a href="#" class="sideBar__button">Налаштування</a></li>
        </ul>
    </section>
</template>

<style scoped>
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
</style>