<template>
  <div id="app">
    <div v-show=" userName == '' " class="confirm">
      <label for="name">login</label>
      <input id="name" class="confirm__input" type="text" v-model="logName" placeholder="請輸入姓名">
      <button class="confirm__send" @click="setName(logName)">send</button>
    </div>
    <nav v-if="userName" class="navbar navbar-expand-sm navbar-dark bg-dark">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#goto" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="goto">
        <ul class="navbar-nav  mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/todo">Todo</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/chatroom">Chatroom</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/photo">Photo</router-link>
          </li>
        </ul>        
      </div>
      <div id="Text">
          <h5 class="navbar-text mr-3">
            Hi,{{userName}}
          </h5>
          <button v-show=" userName " class="logout" @click="logOut">logout</button>
      </div>
    </nav>
    
    <router-view v-if="userName"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: "App",
  data() {
    return {
      logName: '',
    };
  },
  methods: {
    ...mapActions(['setUsername','logOut']),
    setName(name){
      this.setUsername(name);
      this.logName = '';
    },
  },
  computed: {
    ...mapGetters({userName:'getUsername'})
  }
};
</script>

<style lang="scss">
html,body,#app {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
.confirm {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 500px;
  height: 300px;
  text-align: center;
  font-size: 2rem;
  font-family: cursive;
  border: 1px solid #ccc;
  border-radius: 20px;
  box-shadow: 2px 2px 5px #888;
  z-index: 999;
  color: black;
}
.confirm__input{
  display: block;
  width: 90%;
}
.confirm__send {
  display: block;
  border: none;
  border-radius: 10px;
  box-shadow: 2px 2px 10px #a3a3a3;
  background-color: #3894df;
  margin-left: 5px;
}
.confirm__send:hover {
  color: white;
}
.logout{
  background-color: #343a40;
  color: #3dacf7;
  border: 1px solid #3dacf7;
  border-radius: 8px;
  &:hover{
    color: white;
  }
}
</style>
