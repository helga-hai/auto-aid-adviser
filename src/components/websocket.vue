<template>
    <div>
        <div id="main-content" class="container">
            <div class="row">
                <div class="col-md-6">
                    <form class="form-inline">
                        <div class="form-group">
                            <label for="connect">WebSocket connection:</label>
                            <button id="connect" class="btn btn-default" type="submit" :disabled="connected == true" @click.prevent="connect">Connect</button>
                            <button id="disconnect" class="btn btn-default" type="submit" :disabled="connected == false" @click.prevent="disconnect">Disconnect
                            </button>
                        </div>
                    </form>
                </div>
                <div class="col-md-6">
                    <form class="form-inline">
                        <div class="form-group">
                            <label for="content">ServiseType</label>
                            <input type="text" id="content" class="form-control"  placeholder="Your name here..." @focus="isFocus" @input="fillMessage1"><!--v-model="send_message.content"-->
                        </div>
                        <button id="send" class="btn btn-default" type="submit" @click.prevent="send">Send</button>
                    </form>
                    <form class="form-inline">
                        <div class="form-group">
                            <label for="content">BusinessType</label>
                            <input type="text" id="content" class="form-control"  placeholder="Your name here..." @focus="isFocus" @input="fillMessage2"><!--v-model="send_message.content"-->
                        </div>
                        <button id="send" class="btn btn-default" type="submit" @click.prevent="send">Send</button>
                    </form>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <table id="conversation" class="table table-striped">
                        <thead>
                            <tr>
                                <th>Greetings</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in received_messages" :key="item">
                                <td>{{ item }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

export default {
  name: "websocket",
  data() {
    return {
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
  methods: {
    fillMessage1(e) {
      console.log(this.send_message1)
      this.send_message1.searchType = 'BusinessType';
      this.send_message1.content = e.target.value;
      console.log(this.send_message1)
      // this.send_message.inputDTO.searchType = 'BusinessType';
      // this.send_message.inputDTO.content = e.target.value;
      console.dir(e)
    },
    fillMessage2(e) {
      // this.send_message2.inputDTO.searchType = 'ServiceType';
      // this.send_message2.inputDTO.content = e.target.value;
      this.send_message2.searchType = 'BusinessType';
      this.send_message2.content = e.target.value;
      console.dir(e)
    },
    isFocus(){
      console.log('focus true')
    },
    send() {
      console.log("Send message.conten:" + this.send_message1.content);
      if (this.stompClient && this.stompClient.connected) {
        //const msg = { content: this.send_message };
        const msg = this.send_message1 ;
        this.stompClient.send("/app/socket/message", JSON.stringify(msg), {});// /app/hello
      }
    },
    connect() {
      this.socket = new SockJS("http://localhost:8080/api/socket");
      this.stompClient = Stomp.over(this.socket);
      this.stompClient.connect(
        {},
        frame => {
          this.connected = true;
          console.log('frame',frame);
          this.stompClient.subscribe("/list/result", tick => {
            console.log('tick',tick);
            this.received_messages.push(JSON.parse(tick.body).content);
          });
        },
        error => {
          console.log('error=',error);
          this.connected = false;
        }
      );
    },
    disconnect() {
      if (this.stompClient) {
        this.stompClient.disconnect();
      }
      this.connected = false;
    },
    tickleConnection() {
      this.connected ? this.disconnect() : this.connect();
    }
  },
  mounted() {
    // this.connect();
  }
};
</script>

<style scoped>
button, input {
  padding: 5px 20px;
  background: #cccccc;
  margin: 3px 5px;
}
input {
  background:#fff;
  border: 1px solid #666;
}
</style>