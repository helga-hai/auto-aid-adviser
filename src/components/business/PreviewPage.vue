<template>
    <div>
        <div class="services">
            <img class="services_img1" src = "../../assets/027-checklist.png">
            <img class="services_img2" src = "../../assets/Group 133.png">
            <h1>Попередній перегляд</h1>
            
            <div class="services-prev">
                <div class="services-prev-img" :style="{backgroundImage: 'url('+require('../../assets/serevice.svg')+')'}">
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
            </div>
            <div v-if="dealList">
            <!-- <div class="title-prev">Основні послуги</div> -->
            <!-- <div :class="{'spinner-wrap':waitData}"> -->
                <!-- <div v-if="waitData" >
                    <svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                    <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
                    </svg>
                </div> -->
                <details v-for="(item, i) in types" :key="i" class="services__services opened" >
                    <summary class="services__servicename">
                        <span>{{item}}</span>
                    </summary> 
                    <!-- <div class="services__checkwrapp">
                        <div class="services__autocontent" >
                            <div></div>
                            <label v-for="elem in dealList" :key="elem.id" >
                                {{item}}
                                <div v-if="elem.serviceType.name==item">
                                    <p>{{elem.name}}</p>
                                </div>
                            </label>
                        </div>
                    </div> -->
                </details>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
    name: 'PreviewPage',
    data() {
        return {
           dayList: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'] ,
           types: []
        }
    },
    computed: {
        ...mapGetters({
            cur: 'create/businessPrepend',
            dealList: 'templateB/DATALIST'
         }),
    },
    mounted(){
        
        // if(!this.$store.getters.templateB.DATALIST.length) {
        if(!this.dealList) {
            this.$store.dispatch('templateB/GET_DATALIST')
            // this.cur.serviceForBusinesses
        }
        // this.$store.dispatch('templateB/GET_SERVICES_BY_ID',this.types)
        if(this.cur) {
            this.cur.serviceForBusinesses.forEach(item=>{
                let tmp = this.dealList.find(deal=>deal.id === item.id) 
                if(this.types.indexOf(tmp.name)<0){
                    this.types.push(tmp.name)
                }
            })
            // this.type.map(item=>{
            //     this.cur.serviceForBusinesses.forEach(el=>{
            //         if(el.id===)
            //     })
            //     inner.id = tmp.serviceType.id
            //     inner.name = tmp.serviceType.name
            //     this.types.push(inner)
            // })
        }
        // let serv;
        // this.types.forEach( type => {
        //     this.cur.serviceForBusinesses
        // })
    },
    methods: {
        getCategory(item){
            let val =  this.dealList.find(deal=>deal.id === item.id) 
            return val.serviceType.name
        },
        findServ(type){
            this.cur.serviceForBusinesses.forEach(item=>{
                let tmp = this.dealList.find(deal=>deal.id === item.id) 
                if(this.types.indexOf(tmp.serviceType.name)<0){
                    this.types.push(tmp.serviceType.name)
                }
            })

        }
    }
}
</script>

<style lang="scss">
.services-prev {
    min-width: 590px;
    display: flex;
    align-items: center;
    // border: 2px solid #E5E5E5;
    // border-radius: 5px;
}
.services-prev-img {
    width:413px;
    height:260px;
}
.services-prev-info {
    p {
        font-size: 16px !important;
        line-height: 22px !important;
        color: #6F7E95 !important;
        text-align: left;
        padding: 0px 0 5px 30px;
        font-weight: 400;
        &.time {
            background: url('../../assets/time-icon.svg') no-repeat;
            display: flex;
            span {
                padding-right: 10px;
                line-height: 18px;
            }
        }
        &.loc {
            background: url('../../assets/loc-icon.svg') no-repeat;
        }
        &.phone {
            background: url('../../assets/phone-icon.svg') no-repeat;
        }
        &.internet {
            background: url('../../assets/internet-icon.svg') no-repeat;
        }
    }

}
.title-prev {
    padding-left: 50px;
    background-image: '../../assets/wrench.svg'
}
.name-prev {
font-weight: 500;
font-size: 32px;
line-height: 34px;
padding-left: 50px;
padding-bottom: 20px;
/* identical to box height, or 106% */


/* Black */

color: #0E1E2E;
}
</style>