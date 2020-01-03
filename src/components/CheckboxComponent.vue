<template>
    <div>
        <label :for="id">
          <input
          type="checkbox"
          v-bind:id="id"
          v-model = "toggle"
          @change = "someFunc"
          v-bind:true-value="trueValue"
          v-bind:false-value="falseValue"/>
          <span class="accept__span"></span>
          {{title}}
        </label>
    </div>
</template>

<script>
export default {
  name: 'CheckboxComponent',
  data() {
        return {
          toggle: this.falseValue,

          w: console.log(this),
    }
  },
  props: {
    id: [String,Number],
    title: String,
    trueValue: String,
    falseValue: String,
  },
  model: {
    prop: 'toggle',
  },

  computed: {
  },

  methods: {
    someFunc(e) {
      console.log(e)
      this.$emit('toggleFunc', this.toggle)
    }
  }
}

</script>

<style lang="scss">
input[type=checkbox]#role {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
input[type=checkbox]#role+span+label {
  padding-left:25px;
}

label {
  cursor: pointer;
}
// input:checked + .accept__span {
//   background-color: #2196F3;
// }
// .accept__span:after {
//   content: "";
//   position: absolute;
//   display: none;
// }
// input:checked + .accept__span:after {
//   display: block;
// }
// .accept__span:after {
//   left: 9px;
//   top: 5px;
//   width: 5px;
//   height: 10px;
//   border: solid white;
//   border-width: 0 3px 3px 0;
//   -webkit-transform: rotate(45deg);
//   -ms-transform: rotate(45deg);
//   transform: rotate(45deg);
// }

// input[type=checkbox]#role {
//   position: absolute;
//   opacity: 0;
//   cursor: pointer;
//   height: 0;
//   width: 0;
// }
/////////////
.accept {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

input[type=checkbox]#role + .accept__span {
  position: absolute;
  top: 0;
  left: 0;
  height: 17px;
  width: 17px;
  background-color: #eee;
}

.accept:hover input[type=checkbox]#role + .accept__span  {
  background-color: #ccc;
}

.accept input[type=checkbox]#role:checked + .accept__span  {
  background-color: #2196F3;
  background-image: url('/src/assets/checked-svgrepo-com.svg')
}
/////////
.accept {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.accept input[type=checkbox]#role {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.accept__span {
  position: absolute;
  top: 0;
  left: 0;
  height: 17px;
  width: 17px;
  background-color: #eee;
  border: 1px solid #ccc;
}

/* On mouse-over, add a grey background color */
.accept:hover input[type=checkbox]#role + .accept__span {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.accept input[type=checkbox]#role:checked + .accept__span {
  background-color: #fff;
  background-image: url('/src/assets/checked-svgrepo-com.svg')
}

/* Create the checkmark/indicator (hidden when not checked) */
.accept__span:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.accept input[type=checkbox]#role:checked + .accept__span:after {
  display: block;
}


/* Style the checkmark/indicator */
.accept .accept__span:after {
  left: 5px;
  top: 3px;
  width: 5px;
  height: 7px;
  border: solid #0e0e0e;
  border-width: 0 1px 1px 0px;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>