<template>
  <div class="board container-fluid">
    <input class="uploadImg" type="file" accept="image*" @change="upload($event)">
    <p v-show="uploading">{{progress}}</p>
    <div class="row">
      <div class="picture col-sm-3 mt-5" v-for="img in imgs" v-show="img.name == userName">
        <img class="img-fluid" :src="img.imgurl">
      </div>
    </div>    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
var storageRef = firebase.storage().ref();
var imgRef = firebase.database().ref('/images/');
export default {
  data () {
    return {
      uploading: 'false',
      progress: '',
      imgs: {},
    }
  },
  mounted () {
    const vm = this;
    imgRef.on("value", function(snapshot){
      vm.imgs = snapshot.val()
    })
  },
  methods:{
    upload (e) {
      const vm = this;
      const file = e.target.files[0];
      const filename = Math.floor(Date.now() / 1000);
      const uploadImg = storageRef.child(vm.userName+'/'+filename).put(file)
      uploadImg.on('state_changed', 
        function(snapshot){
          vm.progress = Math.floor(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if(vm.prgress < 100){
            vm.uploading = true;
            console.log(vm.uploading)
          }
        },
        function(error){
          vm.progress = '上傳失敗';
        },
        function () {
          uploadImg.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            const timestamp = Math.floor(Date.now() / 1000);
            imgRef.child(timestamp).set({
              filename: timestamp,
              name: vm.userName,
              imgurl: downloadURL,
            })  
          });
          vm.uploading = false;
          vm.prgress = '';
        }      
      )}
  },
  computed: {
  ...mapGetters({
    userName: 'getUsername',
    }),
  },
  updated () {

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.borad
  width: 100%
  height: 80%
</style>
