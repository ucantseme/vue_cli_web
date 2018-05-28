<template>
  <div class="borad container">
    <h1>Let's chat</h1>
    <hr>
    <div class="borad__content">
      <div v-show="text.username != userName" class="media mb-3" v-for="text in messages" >
        <img class="align-self-start ml-3" src="http://lorempixel.com/80/90">
        <div class="media-body other">
            <h3>{{text.username}}</h3>
            <p>{{text.message}}</p>
        </div>
      </div>
      <div v-show="text.username == userName" class="media mb-3" v-for="text in messages" >
        <div class="media-body self">
            <h4>{{text.username}}</h4>
            <p>{{text.message}}</p>
        </div>
        <img v-if="text.username == userName" class="align-self-start mr-3" src="http://lorempixel.com/60/60">
      </div>  
    </div>
    <div class="input-group content">
      <input type="text" class="form-control" placeholder="請輸入留言內容" v-model="message">
      <div class="input-group-append">
        <button class="btn btn-outline-primary" @click="sendMessage" type="button">Enter</button>
      </div>
    </div>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
var messagesRef = firebase.database().ref('/messages/')
export default {
  data () {
    return {
      message: '',
      messages: {},
    }
  },
  mounted () {
    const vm = this;
      messagesRef.orderByChild("timestamp").on("value",function(snapshot){
        vm.messages = snapshot.val()
      });
  },
  methods:{
    sendMessage () {
      const vm = this;
      const timestamp = Math.floor(Date.now() / 1000);
      messagesRef.child(timestamp).set({
        timestamp: timestamp,
        username: vm.userName,
        message: vm.message,
      })
      vm.message = '';
    },
  },
  computed: {
  ...mapGetters({
    userName: 'getUsername',
    }),
  },
  updated () {
    const divH = document.querySelector('.borad__content');
    if(divH.scrollHeight>divH.scrollTop){
      divH.scrollTop = divH.scrollHeight
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.borad
  height: calc(100vh - 94px);
  width: 80%;
  border: 1px solid #585858;
  margin-top: 15px;
  padding: 0;
  text-align: center;
  background-image: url('https://images.unsplash.com/photo-1515549832467-8783363e19b6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6d90809d92f0fff3219b075d0a119ee4&auto=format&fit=crop&w=564&q=80');
  h1
    margin: 0 auto;
    padding: 10px;
    white-space: nowrap;
  hr
    width: 10%;
    height: 3px;
    background-color: #68d1ff;
.borad__content
  height: calc(100% - 170px);
  overflow-y: auto;
  margin-bottom: 10px;
.self
  margin-right: 10px;
  text-align: right;
  p
    font-size: 1.2rem;
.other
  margin-left: 10px;
  text-align: left;
  p
    font-size: 1.2rem;
.content
  padding: 0 10px;
  input
    width: 80%;
    height: 40px;
    font-size: 1.2rem;
@media (max-width:768px)
  .borad  
    h1
      font-size: 2rem
</style>
