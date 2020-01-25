<template>
    <div>
      <input type="text" id="content" class="servise__input" placeholder="Service..." ref="wsRef"
      @focus="connect" 
      @blur="disconnect"
      @input="fillMessageAndSend1" 
      v-model="current"
      autocomplete="off"
      
      ><!--v-model="send_message.content" @click.once="fillMessageAndSend1" :value ="current"-->
      <div class="servise__autocomplete"> <!-- v-for="(item,index) in received_messages" :key="index"-->
        <div class="servise__block">
          <div class="servise__autocomplete_item" v-for="(el, index) in received_messages[received_messages.length-1]" :key="index"> 
            <button class="servise__btn" @click="getCurVal" :value="el" > {{ el }} </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import { userService } from '../_services';
//console.dir(userService.config.apiUrl)
export default {
  name: "websocket",
  data() {
    return {
      current:'',
      currentChoosen: '',
      received_messages: [],
      send_message1: {
        searchType: String,
        content: String,
      },
      send_message2: {
        searchType: String,
        content: String,
      },
      connected: false
    }
  },
  watch: {
    current(newVal, oldVal){
      if(newVal) {
        this.$store.dispatch('search/GET_SERVICE', newVal)
        this.received_messages = []
      }
    }
  },
  methods: {
    curFunc() {
      return current 
    },
    getCurVal(e) {
      // console.dir(e);
      // console.log('!!!!!!!!! getCurVal',e.target.value)
      this.current = e.target.value;//e.srcElement.innerText;
      this.disconnect()
    },
    fillMessageAndSend1(e) {
      console.log('fillMessageAndSend1')
      console.dir(this.$refs.wsRef)
      console.dir(e)
      console.log(this.send_message1)
      this.send_message1.searchType = 'service';
      this.send_message1.content = e.target.value;
      console.log(this.send_message1)
      console.log('this.stompClient=',this.stompClient)
      //console.dir(e)
      // SEND //
      console.log("Send message.content1:" + this.send_message1.content);
      if (this.stompClient && this.stompClient.connected) {
        //const msg = { content: this.send_message };
        const msg = this.send_message1 ;
        //this.stompClient.send("/app/socket/message", JSON.stringify(msg), {});// /app/hello
        this.stompClient.send("/app/socket/message", JSON.stringify(msg), {});// /app/hello
      }
    },
    fillMessage2(e) {
      // // this.send_message2.inputDTO.searchType = 'ServiceType';
      // // this.send_message2.inputDTO.content = e.target.value;
      // this.send_message2.searchType = 'BusinessType';
      // this.send_message2.content = e.target.value;
      // console.dir(e)
    },
    isFocus(){
      console.log('focus true')
    },
    send1() {
      console.log("Send message.content1:" + this.send_message1.content);
      if (this.stompClient && this.stompClient.connected) {
        //const msg = { content: this.send_message };
        const msg = this.send_message1 ;
        //this.stompClient.send("/app/socket/message", JSON.stringify(msg), {});// /app/hello
        this.stompClient.send("/app/socket/message", JSON.stringify(msg), {});// /app/hello
      }
    },
    send2() {
      // console.log("Send message.content2:" + this.send_message2.content);
      // if (this.stompClient && this.stompClient.connected) {
      //   //const msg = { content: this.send_message };
      //   const msg = this.send_message1 ;
      //   //this.stompClient.send("/app/socket/message", JSON.stringify(msg), {});// /app/hello
      //   this.stompClient.send("/app/socket/message", JSON.stringify(msg), {});// /app/hello
      // }
    },
    connect(e) {
      //this.socket = new SockJS("http://localhost:8080/api/socket");
      this.socket = new SockJS(userService.config.apiUrl+"/api/socket");
      this.stompClient = Stomp.over(this.socket);
      this.stompClient.connect(
        {},
        frame => {
          this.connected = true;
          console.log('frame=');
          console.dir(frame);
          this.stompClient.subscribe("/list/result", tick => {
            console.log('tick=');
            console.dir(tick);
            //this.received_messages.push(JSON.parse(tick.body).result);
            this.received_messages.push(JSON.parse(tick.body).result);
          });
        },
        error => {
          console.log('error=',error);
          this.connected = false;
        }
      );
      this.fillMessageAndSend1(e)
    },
    disconnect() {
      if (this.stompClient) {
        this.stompClient.disconnect();
        //this.received_messages = []
      }
      this.connected = false;
      
    },
    tickleConnection() {
      this.connected ? this.disconnect() : this.connect();
    }
  },
  mounted() {
    //console.dir(userService)
    // this.connect();
  }
};
</script>

<style lang="scss" scoped>
// button, input {
//   padding: 5px 20px;
//   background: #cccccc;
//   margin: 3px 5px;
// }
// input {
//   background:#fff;
//   border: 1px solid #666;
// }
.servise {
  &__input {
    border: 1px solid #000;
    border-radius: 4px;
    width: 100%;
    height: 56px;
    position: relative;
    padding-left: 16px;
    background-color: #fff;
    border-color: rgba(10, 5, 23, 0.6);
  }
  &__autocomplete {
    //margin: 0 5px 3px;
    width: calc(100% - 6px);
    margin: 0 3px;
    text-align: left;
    position: absolute;
    background: white;
    box-shadow: 1px 1px 3px #ccc;
    // __langposition: relative;
    &_item {
      padding: 6px 17px;
      width: 100%;
      &:hover {
        background:#FFF5C0;
      }
    }
  }
}
.servise__input {
}
.home .one .servise__btn {
width: 100%;
    height: auto;
    position: relative;
    padding: 0;
    border: none;
    background-color: transparent;
    text-align:left;
}
</style>