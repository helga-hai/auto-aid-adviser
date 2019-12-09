 <template>
    <business-layout>
        <div class="registrStep2">
            <img class="registrStep2_img1" src = "../assets/027-checklist.png">
            <img class="registrStep2_img2" src = "../assets/Group 133.png">
            <h1>Реєстрація об’єкту</h1>
                <p>Выберите из списка типы обслуживаемых автомобилей</p>
                <div class="registrStep2__types":class="{'opened': typesShow}" >
                    <div  class="registrStep2__typename" @click = "typesShow = !typesShow">
                        <span>Типы авто</span>
                        <img :src="require('../assets/arrow drop down.png')" class="registrStep2__icon":class="{'transform': typesShow}">
                    </div>
                    <div class="registrStep2__item"></div>
                    <div class="registrStep2__item"></div>
                    <div class="registrStep2__item"></div>
                    <div class="registrStep2__item"></div>
                    <div class="registrStep2__item"></div>
                </div>
                <hr>
                <p>Выберите из списка основные услуги, которые оказывает обьект</p>
                <div class="registrStep2__services":class="{'opened': serviceShow}" >
                    <div  class="registrStep2__servicename" @click = "serviceShow = !serviceShow">
                        <span>Сервисное ТО</span>
                        <img :src="require('../assets/arrow drop down.png')" class="registrStep2__icon":class="{'transform': serviceShow}">
                    </div>
                        <div class="registrStep2__checkAll">
                            <input type="checkbox" id="All" value="Обрати все">
                            <label for="All">Обрати все</label>
                        </div>
                        <div class="registrStep2__check">
                            <input type="checkbox" id="oil" value="Замена масла в двигателе">
                            <label for="oil">Замена масла в двигателе</label>
                        </div>

                </div>
                <hr>
                
                <div class="registrStep2__buttons">
                    <input type="reset" value="Отмена" class="registrStep2__secondaryButton">
                    <input type="submit" value="Продолжить 1/3" class="registrStep2__primaryButton">    
                </div>

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
    data() {
        return {
            typesShow: false,
            serviceShow: false,
            business_types: this.$store.dispatch("data/getData", '/api/catalog/business_types'),//this.$store.state.authentication.user;// [{"id":1,"name":"CTO"},{"id":2,"name":"shinomantazh"},{"id":3,"name":"shop"},{"id":4,"name":"test"}], //   http://localhost:8080/api/catalog/business_types   GET
            // service_types_2: [{"id":4,"name":"gum","businessType":{"id":2,"name":"shinomantazh"}},{"id":5,"name":"disk","businessType":{"id":2,"name":"shinomantazh"}},{"id":6,"name":"test","businessType":{"id":2,"name":"shinomantazh"}}], //   http://localhost:8080/api/catalog/business_types/2/service_types   GET
            // services_3: [{"id":30,"name":"balancing 8","serviceType":{"id":2,"name":"run","businessType":{"id":1,"name":"CTO"}}},{"id":2,"name":"balancing 1","serviceType":{"id":2,"name":"run","businessType":{"id":1,"name":"CTO"}}},{"id":14,"name":"balancing 4","serviceType":{"id":2,"name":"run","businessType":{"id":1,"name":"CTO"}}},{"id":26,"name":"balancing 7","serviceType":{"id":2,"name":"run","businessType":{"id":1,"name":"CTO"}}},{"id":10,"name":"balancing 3","serviceType":{"id":2,"name":"run","businessType":{"id":1,"name":"CTO"}}},{"id":22,"name":"balancing 6","serviceType":{"id":2,"name":"run","businessType":{"id":1,"name":"CTO"}}},{"id":6,"name":"balancing 2","serviceType":{"id":2,"name":"run","businessType":{"id":1,"name":"CTO"}}},{"id":18,"name":"balancing 5","serviceType":{"id":2,"name":"run","businessType":{"id":1,"name":"CTO"}}}], //   http://localhost:8080/api/catalog/service_types/2/services   GET
            // service_types_byid: {"id":3,"name":"engine","businessType":{"id":1,"name":"CTO"}}, //   http://localhost:8080/api/catalog/service_types/3   GET
            // services_3: [{"id":7,"name":"oil change 2","serviceType":{"id":3,"name":"engine","businessType":{"id":1,"name":"CTO"}}},{"id":19,"name":"oil change 5","serviceType":{"id":3,"name":"engine","businessType":{"id":1,"name":"CTO"}}},{"id":31,"name":"oil change 8","serviceType":{"id":3,"name":"engine","businessType":{"id":1,"name":"CTO"}}},{"id":3,"name":"oil change 1","serviceType":{"id":3,"name":"engine","businessType":{"id":1,"name":"CTO"}}},{"id":15,"name":"oil change 4","serviceType":{"id":3,"name":"engine","businessType":{"id":1,"name":"CTO"}}},{"id":27,"name":"oil change 7","serviceType":{"id":3,"name":"engine","businessType":{"id":1,"name":"CTO"}}},{"id":11,"name":"oil change 3","serviceType":{"id":3,"name":"engine","businessType":{"id":1,"name":"CTO"}}},{"id":23,"name":"oil change 6","serviceType":{"id":3,"name":"engine","businessType":{"id":1,"name":"CTO"}}}], //   http://localhost:8080/api/catalog/service_types/3/services   GET
        }
    }
}
</script>

<style>
/* step02.css */
.registrStep2 {
    width: 100%;
    padding: 56px 48px 56px 48px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}
.registrStep2 h1 {
    margin-bottom: 34px;
    font-weight: 500;
    font-size: 24px;
    line-height: 36px;
}
.registrStep2 p {
    padding: 28px 0px;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    font-family: 'Roboto', sans-serif; 
    border: none;
    color: #4B5E7A;
}
.registrStep2 hr {
    width: 100%;
    color: #E4E7EB;
    size: 1px;
    margin: 0px;

}
.registrStep2__buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    width: 379px;
    margin-top: 56px;
}
.registrStep2__buttons input {
    display: inline-block;
    text-align: center;
    padding: 19px 0 19px 0;
    font-size: 16px;
    line-height: 18px;
    text-transform: uppercase;
}
.registrStep2__buttons .registrStep2__secondaryButton {
    width: 125px;
    background-color: white;
    color: #6F7E95;
    border: 1px solid #6F7E95;
    border-radius: 4px;
}
.registrStep2__buttons .registrStep2__primaryButton {
    width: 238px;
    background-color: #FFC700;
    color: #000000;
    border: none;
    border-radius: 4px;
}
.registrStep2_img1 {
    position: absolute;
    top: 143px;
    right: 156px;
}
.registrStep2_img2 {
    position: absolute;
    top: 135px;
    right: 90px;
}
.registrStep2__types, .registrStep2__services {
    width: 100%;
    height: 80px;
    overflow: hidden;
}
.opened {
    height: 100%;
}
.transform {
    transform: scale(1, -1); 
}
.registrStep2__typename, .registrStep2__servicename {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 28px 0px;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
}
.registrStep2__item {
    display: inline-block;
    width: 400px;
    height: 100px;
    background-color: rebeccapurple;
}
</style>