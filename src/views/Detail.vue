<template>
    <div v-if="post" class="post">
        <h2>{{ post.title }}</h2>
        <p>{{ post.body }}</p>
        <div v-if="admin">
          <button class="delete" @click="deletePost">Delete Post</button>
        </div>
        <div v-if=" user && user.displayName != 'guest' ">
          <i class="fa-solid fa-bookmark" 
          :class="{active : save_post_val}"
           @click="savePostHandle">
          </i>
          <div class="hide">Save Post</div>
        </div>
    </div>
    <div v-else>
        <Spinner></Spinner>
    </div>
</template>

<script>
import Spinner from '../components/Spinner'
import getPost from "../composables/getPost"
// when we need to use this.$route.params.id
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { db} from '@/firebase/config';
import getUser from '@/composables/getUser';
import { computed, ref, watch } from 'vue';
import savedPost from '@/composables/savePost'
import saveOrNot from '@/composables/checkSavePost'

    export default {
  components: { Spinner },
        props : ['id'],
        setup(props){
            let {user} = getUser();
            let userId = user.value.uid;
            let admin = ref(false);
            if (user.value.displayName === 'minkhant'){
              admin = true
            }
            // when to use this.$route.params.id
            let route = useRoute(); // same => this.$route
            let router = useRouter();
            let save_toggle = ref(false);
            
            let {post, error, load} = getPost(route.params.id);
            load(); // show post detail

            let deletePost = async()=>{
                let id = props.id
                await db.collection("posts").doc(id).delete();
                router.push({name:'home'})
            }

            let savePostHandle = ()=>{
              savedPost(save_toggle, props.id, userId)
            }
            let save_or_not = ref(null);
            const save_post = async()=>{
              const save = await saveOrNot(props.id, userId);
              save_or_not.value = save
            }
            save_post();
            let save_post_val = ref(null);
            watch(save_or_not, (newValue) => {
              if (newValue){
                save_post_val.value = newValue.value.save_post;
              }else{
                save_post_val.value = false;
              }
              console.log('Save Post Value:', newValue.value.save_post);
            });
            
            return {post, error, load, deletePost, admin, savePostHandle, save_toggle, user, save_post_val}
        }
    }
</script>

<style>
    .post {
        margin: 0 40px 30px;
        padding-bottom: 30px;
        border-bottom: 1px dashed #e7e7e7;
      }
      .post i {
        position: fixed;
        left: 90%;
        top: 19%;
        font-size: 30px;
        cursor: pointer;
      }
      .post h2 {
        display: inline-block;
        position: relative;
        font-size: 26px;
        color: white;
        margin-bottom: 10px;
        max-width: 400px;
      }
      .post h2::before {
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        background: #ff8800;
        position: absolute;
        z-index: -1;
        padding-right: 40px;
        left: -30px;
        transform: rotateZ(-1deg);
      }
      button.delete{
        margin: 0 auto;
      }
      .hide {
        display: none;
      }
      .post i:hover + .hide {
        display: block;
        color: gray;
        position: fixed;
        left: 83%;
        top: 19%;
        z-index: 1;
      }
      .fa-bookmark{
        color: gray;
      }
      .active {
        color: #ff8800;
      }
</style>