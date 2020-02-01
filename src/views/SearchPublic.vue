<template>
    <div>
        <nav-component class="dark" />
        <div class="search-wrap">
            <div class="search-dashboard">
                <div class="controls">
                    <input type='text' placeholder="Оберіть послугу">
                    <div class="btn">
                        <a href="#" class="btn__button orange" >застосувати</a>
                    </div>
                </div>
                <div class="filter">
                    <div class="filter-label">
                        <img :src="require('../assets/filter-img.png')" >
                        <span>Додати фільтри</span>
                    </div>
                </div>
                <div class="chips">
                    <span>Знайдено {{count}} варіанта</span>
                    <span class="chips-sort">Відсортовано за </span> <span>Рейтингом</span>
                </div>
                <!-- @click="goToDetail(cur.id)" -->
                <div v-if="markers">
                    <button class="services-prev detail" v-for="cur in markers" :key="cur.id"  :isPreview="false">
                        <div class="services-prev-img small" :style="{backgroundImage: 'url('+require('../assets/serevice.svg')+')'}"><!--:style="{backgroundImage: 'url('+require('')+')'}"-->
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
                            <p class="phone" v-if="cur.contact.phone">{{cur.contact.phone}}</p>
                            <p class="internet" v-if="cur.contact.url">{{cur.contact.url}}</p>
                        </div>
                    </button>  
                </div> 
            </div>
            <div class="search-map"></div>
        </div>
    </div> 
    <!-- <business-layout> -->
        <!-- <span class="role">
            {{info()}}
        </span> -->
        <!-- <keep-alive>Неактивные компоненты будут закэшированы -->
            <!-- <component :is="currentView" @switchView='switchView'></component> -->
        <!-- </keep-alive> -->
    <!-- </business-layout> -->
</template>

<script>
// import BusinessLayout from "@/layouts/BusinessLayout";
import BusinessLayout from "../layouts/BusinessLayout";
import NavComponent from '../components/NavComponent';

export default {
    name:'Search',
    components: {
      NavComponent, 
    },
    props:['markers'],
    // {
    //     markers: {
    //         type: Object,
    //         default: null
    //     }
    // },
    data() {
        return {
            count: 23,
            markerList: null
        }
    },
    // computed: {
    //     markerList() {
    //         return this.$route.params.markers || ''
    //     }
    // }
}
</script>

<style lang="scss">
.search-wrap{
    display: flex;
    height:100vh;
}
.search-dashboard {
    width: 50vw;
    // min-height: calc(100vh - 80px);
    background: #F6F7F8;
    padding: 40px 50px 20px;
    input {
        flex-grow: 2;
        margin-right: 20px;
        padding: 12px 16px 12px
    }
    .controls {
        display: flex;
        width: 100%;
    }
    .filter {
        padding-top: 20px;
        padding-bottom:22px;
        img {
            vertical-align: middle;
        }
    }
    .filter-label {
        font-size: 16px;
        text-transform: uppercase;
        color: #00BCD4;
        text-align:left;
        vertical-align:middle;
        span {
            padding-left: 11px;
            padding-top: 6px;
        }
    }
    .chips {
        font-size: 16px;
        line-height: 16px;
        color: #A5AEBC;
        margin-top:25px;
        text-align:left;
        &-sort {
            margin-left: 40px;
        }
    }
}
.search-map {
    width: 50vw;
    // min-height: calc(100vh - 80px)
}
</style>