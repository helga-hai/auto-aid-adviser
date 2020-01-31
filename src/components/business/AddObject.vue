<template>
<div>
    <div class="flex">
        <div class="objects">
            <h1>Мої об’єкти</h1>
            <div v-if="!myObjects || !myObjects.length">
                <p>Наразі у вас немає об’єктів.</p>
                <p>Якщо бажаєте, то можемо створити новий об’єкт саме зараз.</p>
                <!-- <card-min/> -->
            </div>
            <button v-else class="services-prev detail" v-for="cur in myObjects" :key="cur.id" @click="goToDetail(cur.id)" :isPreview="false">
                <div class="services-prev-img small" :style="{backgroundImage: 'url('+require('../../assets/serevice.svg')+')'}">
                </div>
                <div class="services-prev-info">
                    <div class='name-prev'>{{cur.name}}</div>
                    <p class="loc" v-if="cur.location.address">{{cur.location.address}}</p>
                    <p class="time" v-if="cur.workTimes.length">
                        <span v-for="d in cur.workTimes" :key="d.id">
                            {{dayList[d.day - 1]}} <br> 
                            {{d.fromTime.slice(0,-3)}} <br>
                            {{d.toTime.slice(0,-3)}} <br>
                        </span>
                    </p>
                    <!-- <p class="phone" v-if="cur.contact.phone">{{cur.contact.phone}}</p>
                    <p class="internet" v-if="cur.contact.url">{{cur.contact.url}}</p> -->
                </div>
            </button>         
            <span><a href="#" class="objects__button" @click="switchView('register-object')" >Додати об'єкт</a></span>
        </div>
        <div>
        </div>
        <div class="Image">
            <div class="Image__labe" :style="{backgroundImage: 'url('+require('../../assets/serevice.svg')+')'}"></div>
        </div>
    </div>
    <div v-if="myObjects"  class="flex">
        <div  class="objects">
            <!-- <div class="my-objects" v-for="obj in myObjects" :key="obj.id">
            </div> -->
        </div>
    </div>
</div>
</template>

<script>
import CardMin from "../../components/cardMin";
import {userService} from "../../_services";
import {mapGetters} from 'vuex';
export default {
    name: 'AddObject',
    components: {
        CardMin,
    },
    data() {
        return {
           dayList: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'] ,
        } 
    },
    async created () {
        await this.$store.dispatch('templateB/GET_CATTEGORY_LIST')
        await this.$store.dispatch('templateB/GET_SERVICE_LIST',this.category.map(item=>item.id))
    },
    mounted() {
        this.$store.dispatch('userdataservice/GET_TYPES')
        this.$store.dispatch('selfLocation/getLocation');
    },
    computed: {
        ...mapGetters({
            category: 'templateB/CATEGORYLIST',
            myObjects: 'create/MY_OBJECTS',
         }),
    },
    methods: {
        switchView(val){
            this.$emit('switchView', val);
        },
        goToDetail(id) {
            this.$store.dispatch('create/GET_BUSINESS_DATA', id);
            this.$emit('switchView', 'preview-page');
        }
    }
}
</script>

<style lang="scss">
.flex {
    display: flex;
}
.objects {
    padding: 56px 30px 56px 48px;//56px 92px 56px 48px;
    width: 685px;
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
.Image {
    padding: 56px 50px 0px 0px;
}
.Image__labe {
    width: 409px;
    height: 250px;
    background-repeat: no-repeat;
  
}
.services-prev-img.small {
    width:200px;
    background-size: cover;
    height: 155px;
}
.services-prev.detail {
    border: 2px solid #E5E5E5;
    border-radius: 5px;
        height: 160px;
    .name-prev {
        padding-left:0px
    }
    .services-prev-info {
        padding-left:20px;
    }
    p.time span {
        padding-right: 4px;
    }
    p.loc {
        text-overflow: ellipsis;
        overflow: hidden;
        width: 331px;
        white-space: nowrap;
    }
}
</style>
