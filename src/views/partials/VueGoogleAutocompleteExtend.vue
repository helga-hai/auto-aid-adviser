<template>
    <div class="form-row">
        <div class="col-md-12 mb-3">
            <vue-google-autocomplete 
                ref="address"
                id="map"
                classname="form-control"
                placeholder="Please type your address"
                @input="$emit('input', $event.target.value)"
                v-on:placechanged="getAddressData"
                ></vue-google-autocomplete>
        </div>
    </div>
</template>

<script>
import VueGoogleAutocomplete from 'vue-google-autocomplete'
export default {
    components: {
        VueGoogleAutocomplete
    },
    data: {
        return() {
        }
    },
    methods: {
        getAddressData: function (addressData, placeResultData, id) {
            this.$parent.$emit('address', addressData)
        },
    }
}
</script>