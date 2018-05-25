<template>
  <div class="container">
    <h1>{{userName}}'s todoList</h1>
    <div v-show=" userName == '' " class="confirm">
      <input class="confirm__input" type="text" v-model="logName" placeholder="請輸入姓名">
      <button class="confirm__send" @click="setName();start(userName)">send</button>
    </div>
    <div class="main">
      <input class="main__input" type="text" v-model="newItem" @keyup.enter="addItem(newItem)" placeholder="輸入代辦事項">
      <div class="main__content">
        <ul v-show="page=='all'">
          <li v-for="todo in todoList">
            <input class="check" type="checkbox"  v-model="todo.status" @click="changeStatus(todo.timestamp)">
            <div :class="{active:todo.status}">{{todo.item}}</div>            
            <div class="delete" @click="removeItem(todo.timestamp)">x</div>
          </li>
        </ul>
        <ul v-show="page=='active'">
          <li v-for="todo in todoList" v-if="!todo.status">
            <input class="check" type="checkbox"  v-model="todo.status">
            <div :class="{active:todo.status}">{{todo.item}}</div>            
            <div class="delete" @click="removeItem(todo.timestamp)">x</div>
          </li>
        </ul>
        <ul v-show="page=='completed'">
          <li v-for="todo in todoList" v-if="todo.status">
            <input class="check" type="checkbox"  v-model="todo.status">
            <div :class="{active:todo.status}">{{todo.item}}</div>            
            <div class="delete" @click="removeItem(todo.timestamp)">x</div>
          </li>
        </ul>
      </div>
        <ul class="main__tab">
          <li :class="{click: page=='all'}" @click="change('all')">All</li>
          <li :class="{click: page=='active'}" @click="change('active')">Active</li>
          <li :class="{click: page=='completed'}" @click="change('completed')">Completed</li>
        </ul>
    </div>
  </div>
</template>

<script>
const todosRef = firebase.database().ref('/todos/')
export default {
  data () {
    return {
      userName: '',
      newItem: '',
      page: 'all',
      logName: '',
      show: '',
      todoList: {
          // item: 'vue practice',
          // status: 'false',
      },
    }
  },
  methods: {
    start (logName) {
      const vm = this
      if(vm.userName!=''){
        const todoRef = firebase.database().ref('/todos/' + logName)
        todoRef.on('value', function(snapshot) {
          vm.todoList = snapshot.val()
        })
      }
    },
    setName () {
      const vm = this;
      vm.userName = vm.logName;
      vm.logName = '';
      console.log(vm.userName)
    },
    addItem () {
      const vm = this
      const username = vm.userName
      const timestamp = Math.floor(Date.now() / 1000)
      todosRef.child(username).child(timestamp).set({
        timestamp: timestamp,
        item: vm.newItem,
        status: false,
        })
      vm.newItem = '';
    },
    removeItem (todo_id) {
      const vm = this
      const username = vm.userName
      todosRef.child(username).child(todo_id).remove()
    },
    change (page) {
      this.page = page
    },
    changeStatus (todo_id) {
      const vm = this
      const username = vm.userName
      const todoRef = firebase.database().ref('/todos/' + username + '/' + todo_id)
      todoRef.once('value').then(function(snapshot) {
        var val = snapshot.val().status;
        if(val){
          todoRef.update({
            status: false
          })
        }else{
          todoRef.update({
            status: true
          })
        }
      });
    },    
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
%flex_center{
  display: flex;
  justify-content: center;
  align-items: center;
}
%level_center{
  margin: 0 auto;
}
.container{
  @extend %level_center;
  position: relative;
  width: 800px;
  height: 700px;
  box-sizing: border-box;
  h1{
    margin: 20px 0 0 30px;
    font-family: sans-serif;
    font-size: 2.5rem;
  }
}
.confirm {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 500px;
  height: 300px;
  background-color: #2b2b2b;
  text-align: center;
  font-size: 2rem;
  border-radius: 20px;
  z-index: 999;
}
.confirm__send {
  border: none;
  border-radius: 5px;
  background-color: #3dacf7;
  margin-left: 5px;
}
.confirm__send:hover {
  color: white;
}
.main{
  height: 80%;
  padding-top: 20px;
}
.main__input{
  @extend %level_center;
  width: 80%;
  display: block;
  font-size: 2rem;
  outline: none;
  border: 2px solid #a6bfdd;
  border-radius: 10px;
}
.main__content{
  margin: 30px 30px 0 30px;
  border: 1px solid #aaa;
  border-radius: 10px;
  height: 80%;
  overflow-y: auto;
  ul{
    list-style: none;
    margin: 0;
    padding: 0;
    li{
      position: relative;
      @extend %level_center;
      padding: 5px;
      width: 95%;
      border-bottom: 1px dotted #aaa;
      font-size: 2rem;
      display: flex;
      font-family: Arial, sans-serif;
      &:hover{
        background-color: #eeeeee;
        .delete{
          opacity: 1;
          transition: .5s;
        }
      } 
    }
  }
}
.check{
  display: block;
  margin: 10px 20px 0 0;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
}
.delete{
  position: absolute;
  right: 30px;
  font-size: 1rem;
  border: none;
  margin: 10px 0 0 150px;
  opacity: 0;
  cursor: pointer;
}
.active{
  text-decoration: line-through;
  text-decoration-color: #ad403e;
  font-style: italic;
}
.main__tab{
  margin: 0;
  width: 85%;
  display: flex;
  list-style: none;
  
  li{
    width: 150px;
    height: 40px;
    border: 1px solid #aaa;
    font-size: 1.3rem;
    text-align: center;
    border-radius: 0 0 10px 10px;
    cursor: pointer;
    &:hover{
      background-color: #e4e2e2;
    }
    &.click{
      border: 1px solid #aaa;
      background-color: #9c9c9c;
    }
  }  
}
</style>
