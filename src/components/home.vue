<template>
  <div class="hello">
    <div class="content">
      <h1>Welcome Back!<br>
      </h1>
      <h4>This is your exclusive website.</h4>
      <h4>Have a nice day!</h4>
    </div>
  </div>
    
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello{
    width: 100%;
    height: 100%;
    background-image: url('https://images.unsplash.com/photo-1483401757487-2ced3fa77952?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2c0a59ff4145f5888ea06e173f67fc73&auto=format&fit=crop&w=1052&q=80');
    background-size: cover;
    text-align: center;
    color: white;
    padding-top: 20%;
    box-sizing: border-box;
  }
  h1{
    font-size: 5rem;
    margin-bottom: 80px;
  }
  h4{
    font-size: 2rem;
  }
  @media (max-width:576px) {
    .hello{
      text-align: center;
      padding-top: 30%;
    }
    h1{
      font-size: 4rem;
    }
    h4{
      font-size: 2rem;
    }
  }
</style>
