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
    data() {
        return {
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