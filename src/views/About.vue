<template>
  <div class="about">
    <nav-component :grey="true"/>

    <div class="page">
      <aside class="aside">
        <ul class="aside__items">
          <li class="aside__item" v-for="(el, index) in groups" :key="index">{{el}}</li>
        </ul>
      </aside>
      <div class="block">
        <label class="block__label" for="search">Послуга</label>
        <input class="block__search" id="search"/>
        <div class="action">
          <div class="action__result">Знайдено 23 варіанта</div>
          <button class="action__filter">фільтрУватИ</button>
        </div>
        <div class="mark">Найближчі</div>
        <div class="point">
          <div class="point__name">Stop&Go-Шиномонтаж</div>
          <div class="point__type">Магазин шин</div>
          <div class="point__address">ул. Поперечная, 21А</div>
        </div>
        <div class="point">
          <div class="point__name">Stop&Go-Шиномонтаж</div>
          <div class="point__type">Магазин шин</div>
          <div class="point__address">ул. Поперечная, 21А</div>
        </div>
        <div class="point">
          <div class="point__name">Stop&Go-Шиномонтаж</div>
          <div class="point__type">Магазин шин</div>
          <div class="point__address">ул. Поперечная, 21А</div>
        </div>
      </div>
      <travel-map class="guide" ref="mapr" :markers="markersOut"/>
      <!-- <button @click="getDirection">get directions</button> -->
    </div>

    
    <div v-if="errorStr">
      Sorry, but the following error occurred: {{errorStr}}
    </div>
    <div v-if="gettingLocation">
      <i>Getting your location...</i>
    </div>
    <div v-if="location">
      Your location data is {{ location.coords.latitude }}, {{ location.coords.longitude}}
    </div>

  </div>
</template>

<script>
import NavComponent from '../components/NavComponent';
import TravelMap from '@/components/TravelMap.vue';
export default {
  components: {
    NavComponent,
    TravelMap,
  },
  data() {
    return {
      groups: ['СТО','Шиномонтаж','Мойка'],
      markersOut: [
          {
              id: "a",
              position: this.location
          },
          {
              id: "b",
              position: { lat: 50.455939, lng: 30.372777 }// { lat: 5, lng: 99 }
          },
          {
              id: "c",
              position: { lat: 50.452482, lng: 30.372232 }// { lat: 6, lng: 97 }
          }
      ],
    }
  },
  computed: {
    errorStr() {
      return this.$store.state.selfLocation.errorStr;
    },
    gettingLocation() {
      return this.$store.state.selfLocation.gettingLocation;
    },
    location() {
      return this.$store.state.selfLocation.location;
    }
  },
  created() {
    //do we support geolocation
    this.$store.dispatch('selfLocation/getLocation');
  },
  // methods: {
  //   getDirection: function() {
  //}
}
</script>

<style lang="scss">
.page {
  display: flex;

}
.aside {
  padding-top: 40px;
  width:104px;
  min-height: calc(100vh - 56px);
  //background: #FFC700;
  background: #F6F7F8;
  &__items {
    list-style: none;
    text-align: left;
    padding: 0;
    margin:0;
  }
  &__item {
    color: #0E1E2E;
    text-align: center;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    width:100%;
    display:block;
    padding: 15px 0;
    &:before{
      content: '';
      width: 24px;
      height: 24px;
      border: 1px solid #0E1E2E;
      border-radius: 8px;
      display:block;
      margin: 4px auto;
    }
  }
}
.block {
  text-align:left;
  padding:30px;
  width: 418px;
  background: #FFFFFF;
  &__search {
    border: 1px solid #6F7E95;
    border-radius: 4px;
    height:36px;
    width: 100%;
  }
  &__label {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 12px;
    color: #A5AEBC;
  }
}
.action {
  margin: 30px 0 10px;
  &__result {
    font-size: 14px;
    line-height: 16px;
    color: #6F7E95;
    width: 60%;
    display:inline-block;
  }
  &__filter {
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
    text-transform: uppercase;
    color: #00BCD4;
    width: 40%;
    display:inline-block;
  }
}
.mark {
  font-weight: bold;
  font-size: 12px;
  line-height: 18px;
  text-transform: uppercase;
  color: #FFB100;
}
.point {
  text-align:left;
  margin: 15px 0;
  &__name {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #0E1E2E;
  }
  &__type {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    color: #6F7E95;
  }
  &__address {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    color: #6F7E95;
  }
}
.guide {
  width: calc(100% - 104px);
  //min-height: 500px;
}
</style>