<template>
  <div class="borad container-fluid">
    <h1>{{userName}}'s todoList</h1>
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
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
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
 mounted () {
   const vm = this;
     vm.getRef('todos');
     vm.userref.on('value', function(snapshot) {
       vm.todoList = snapshot.val()
     })
  },
  methods: {
    ...mapActions(['userRef']),
    getRef (postid) {
      this.userRef(postid);
    },
    addItem () {
      const vm = this
      const username = vm.userName
      const timestamp = Math.floor(Date.now() / 1000)
      vm.userref.child(timestamp).set({
        timestamp: timestamp,
        item: vm.newItem,
        status: false,
        })
      vm.newItem = '';
    },
    removeItem (todo_id) {
      const vm = this
      const username = vm.userName
      vm.userref.child(todo_id).remove()
    },
    change (page) {
      this.page = page
    },
    changeStatus (todo_id) {
      const vm = this
      const username = vm.userName
      const itemStatus = vm.userref.child(todo_id)
      itemStatus.once('value').then(function(snapshot) {
        var val = snapshot.val().status;
        if(val){
          itemStatus.update({
            status: false
          })
        }else{
          itemStatus.update({
            status: true
          })
        }
      });
    },    
  },
  computed: {
    ...mapGetters({
      userName: 'getUsername',
      userref: 'getUserref',
      })
  }
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
.borad{
  @extend %level_center;
  position: relative;
  width: 100%;
  height: calc(100% - 64px);
  box-sizing: border-box;
  background: linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url("https://images.unsplash.com/photo-1470790376778-a9fbc86d70e2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e480962c9c0c092d7b006c04a9e2ab24&auto=format&fit=crop&w=2149&q=80");
  overflow-y: auto;
  h1{
    padding-top: 30px;
    text-align: center;
    font-family: sans-serif;
    font-size: 2.5rem;
  }
}
.main{
  margin: 0 auto;
  width: 80%;
  height: 70%;
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
  width: 90%;
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
@media (max-width:768px) {
  .main{
  }
  .main__input{
    font-size: 1.5rem;
  }
  .main__tab{
    li{
      font-size: 1.2rem;
    }
  }
}
</style>
