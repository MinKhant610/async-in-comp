<template>
    <div>
        <input type="file" accept="image/*" 
        @change="uploadHandler" 
        ref="fileInput">
        <div v-if="user && user.displayName" class="profile_img">
            <h3>{{ user.displayName }}</h3>
        </div>
    </div>
</template>

<script>
import { database } from '@/firebase/config'
import getUser from '@/composables/getUser';
import imageUpload from '@/composables/imageUpload';
import getImage from '@/composables/getImage'
    export default {
        setup(){
          let {user} = getUser();
          let userId = user.value.uid;
          let defalut_image = "https://images.pexels.com/photos/14823949/pexels-photo-14823949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"

          // write data
          let uploadHandler = (event)=>{
            imageUpload(event, user);
            }

          // read data 
          getImage(userId, defalut_image);
          
          return {uploadHandler, user}
        }
    }
</script>

<style>

</style>