<template>
  <div id="app">
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
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
          </h5>
          <button class="logout">logout</button>
      </div>
    </nav>
    
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      logName: ""
    };
  },
};
</script>

<style lang="scss">
html,body,#app {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
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
