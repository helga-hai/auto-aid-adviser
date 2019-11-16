<template>
  <div class="app">
    <div class="wrapper">       
      <h2>Driving routes</h2>
        <h4>Add a new driving route:</h4>
        <section class="new">
          <div class="form">
              <form action="">
                  <label for="" class="name">Starting point:</label>
                    <vue-google-autocomplete
                      country="ua"
                      type="(cities)"
                      ref="address"
                      id="start"
                      classname="form-control"
                      placeholder="Starting point"
                      v-on:placechanged="getAddressDataOne"
                    ><!-- enable-geolocation="true" @input="setAddress"-->
                    </vue-google-autocomplete>
                  
                    <label for="" class="name">End point:</label>
                    <vue-google-autocomplete
                      country="ua"
                      ref="address2"
                      id="end"
                      classname="form-control"
                      placeholder="End point"
                      v-on:placechanged="getAddressDataTwo"
                    ><!-- enable-geolocation="true" -->
                    </vue-google-autocomplete>

                    <div class="button" type="" @click.prevent="saveRoute">Save route</div>
              </form>
          </div>

          <gmap-map
              :center="center"
              :zoom="8"
              style="width: 100%; height: 450px"
              ref="xyz"
          >
          <gmap-marker
              :key="index"
              v-for="(m, index) in markers"
              :position="m.position"
              :clickable="true"
              @click="center=m.position"
          ></gmap-marker> 
          </gmap-map>  
           
          <!-- <div v-for="index in address">
            <div @click.prevent="getRoute">Route {{ index.locality }}</div>
          </div> -->

          <div class="routeList">
            <div v-for="(index, key) in route" :key="index.id" class="route-holder">
              <div>
                <div @click.prevent="getRoute" class="route"></div>
                <span>Route {{ key }}</span>
              </div>
            </div>
          </div>
      </section>
    </div>
  </div>
</template>

<script>
import * as VueGoogleMaps from 'vue2-google-maps'
  import VueGoogleAutocomplete from 'vue-google-autocomplete'
  export default {
    name:'autocomplete',
    components: { VueGoogleAutocomplete },
    data () {
      return {
        address: [],
        route: [],
        center: {lat: 45.0, lng: 20.4},
        markers: [{
          position: {lat: 0, lng: 0}  
        },{
          position: {lat: 0, lng: 0}
        }]
      }
    }, 
    created () {
          console.log('created map loaded')
          // VueGoogleMaps.loaded.then(() => {
          //   console.log('map loaded')
          //   //const options = { legWeight: 3 }
          //   //const Spiderfier = require('overlapping-marker-spiderfier')
          //   //const oms = new Spiderfier(this.$refs.xyz.$mapObject, options)
          //   //console.log(oms)
          // })
          // this.$refs.xyz.$mapCreated.then(() => {
          //   console.log('map created!')
          // });
          // console.log('this.$refs.xyz')
          // console.dir(this.$refs.xyz)
    },
    mounted () {
      console.log('this.$refs.xyz')
          console.dir(this.$refs.xyz)
      //console.dir(DirectionsRenderer)
      // this.$refs.xyz.$mapPromise.then((map) => {
      //   console.dir(map)
      //   this.$refs.address.focus();
      //   //map.panTo({lat: this.mylatitude, lng: this.myLongitude})
      // })
        // To demonstrate functionality of exposed component functions
        // Here we make focus on the user input
        
        //
        //console.log(google)
        // let initializeWhenGoogleIsAvailable = () => {
        //     if (google) { // test if google is available
        //     this.initialize(); // if it is, then initalize
        //     } else {
        //     setTimeout(initializeWhenGoogleIsAvailable, 100) // if it isn't, wait a bit and retry
        //     }
        // };
        // initializeWhenGoogleIsAvailable();
    },
    methods: {
      getAddressDataOne: function (addressData, placeResultData) {
        this.address.push(addressData);
            
        localStorage.setItem('positionLat', addressData.latitude);
        localStorage.setItem('positionLng', addressData.longitude);
        var latt = JSON.parse(localStorage.getItem('positionLat'));
        var lngg = JSON.parse(localStorage.getItem('positionLng'));
        // this.markers[0].position.lat = latt;
        // this.markers[0].position.lng = lngg;    
        
        var ad = this.address;
        var mark = this.markers;
        for(let i=0;i<ad.length;i++) {
          // console.log(ad[i].longitude + ',' + ad[i].latitude)
          for(let a=0;a<mark.length;a++) {
            mark[a].position.lat = ad[i].latitude;
            mark[a].position.lng = ad[i].longitude;
          }
        }
      },
      getAddressDataTwo: function (addressData, placeResultData) {
        this.address.push(addressData);
            
        localStorage.setItem('position1Lat', addressData.latitude);
        localStorage.setItem('position1Lng', addressData.longitude);
        var latt1 = JSON.parse(localStorage.getItem('position1Lat'));
        var lngg1 = JSON.parse(localStorage.getItem('position1Lng'));
        // this.markers[1].position.lat = latt1;
        // this.markers[1].position.lng = lngg1;    
        var ad = this.address;
        var mark = this.markers;
        for(let i=1;i<ad.length;i++) {
          // console.log(ad[i].longitude + ',' + ad[i].latitude)
          for(let a=1;a<mark.length;a++) {
            mark[a].position.lat = ad[i].latitude;
            mark[a].position.lng = ad[i].longitude;
          }
        }
      },
      saveRoute: function() {
        var save = this.address;
        var routes = this.route;
        for (var i=0;i<save.length;i++) {
            save.splice(1);
            routes.push(save);
        }
      },
      getRoute: function () {
        loaded.then(() => {
            console.log('loaded')
        })
            this.directionsService = new google.maps.DirectionsService();
            this.directionsDisplay = new google.maps.DirectionsRenderer();
            this.directionsDisplay.setMap(this.$refs.xyz.$mapObject);
            var vm = this;
            vm.directionsService.route({
                origin: this.markers[0].position,
                destination: this.markers[1].position,
                travelMode: 'DRIVING'
            }, function (response, status) {
                if (status === 'OK') {
                    vm.directionsDisplay.setDirections(response)
                } else {
                    console.log('Directions request failed due to ' + status)
                }
                })
            }
        
    }
  };
</script>

<style>
html, body {
  font-size: 16px;
}
h2 {
  padding: 20px 0 0 30px;
}
h4 {
  text-align: center;
}
textarea:focus, input:focus{
    outline: none;
}
.new {
  width: 100%;
  max-width: 1200px;
  display: block;
  margin: 0 auto;
}  
.form {
  margin: 20px 0 15px;
  text-align: center;
}   
label {
  margin-left: 30px;
}
input {
  width: 100%;
  max-width: 300px;
  border: 2px solid #e67e22;
  padding: 5px;
}
.button {
  width: 100%;
  max-width: 200px;
  padding: 8px;
  background: #e67e22;
  border: none;
  color: #fff;
  display: inline-block;
  transition: 0.7s ease;
  margin-left: 30px;
}
.button:hover {
  background: #ff9328;
  transition: 0.7s ease;
  cursor: pointer;
}
.routeList {
  text-align: center;
}
.route-holder {
  display: inline-block;
  width: 100%;
  max-width: 200px;
  height: 200px;
  margin: 25px 10px 25px 0;
  cursor: pointer;
}
.route-holder div {
  height: 100%;
}
.route-holder span {
  clear: both;
  display: block;
}
.route {
  /* background: url('assets/route.jpg') no-repeat; */
  width: 100%;
  height: 100%;
}
@media (max-width: 1160px) {
  
  * {
    text-align: center;
  }
  h2 {
    padding: 0;
  }
  input, .button {
    display: block;
    margin: 0 auto;
  }
  label {
    margin-left: 0!important;
  }
  input {
    margin: 0 auto 20px;
  }
}
</style>