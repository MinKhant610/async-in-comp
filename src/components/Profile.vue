<template>
    <div class="name" v-if="user && user.displayName">
        <input type="file" accept="image/*" 
        @change="uploadHandler" 
        ref="fileInput" style="display: none;">
        <div class="profile_img"></div> <!-- profile will show in this div-->
        <h3>
          {{ user.displayName }} 
          <i class="fa-solid fa-camera" style="color: #ff8800;"
          @click="$refs.fileInput.click()"></i>
        </h3>
    </div>
</template>

<script>
import getUser from '@/composables/getUser';
import imageUpload from '@/composables/imageUpload';
import getImage from '@/composables/getImage'
import { onMounted, onUpdated } from 'vue';
    export default {
        setup(){
          let {user} = getUser();
          let userId = user.value.uid;
          let defalut_image = "https://images.pexels.com/photos/14823949/pexels-photo-14823949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"

          // write data
          let uploadHandler = (event)=>{
            imageUpload(event, user);
            localStorage.removeItem('imgurl');
            }

          // read data 
          onMounted(()=>{
            getImage(userId, defalut_image);
          })

          return {uploadHandler, user}
        }
    }
</script>

<style>
.fa-camera{
  cursor: pointer;
}
.name{
  margin-top: 20px;
}

</style>