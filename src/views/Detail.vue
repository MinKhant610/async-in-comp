<template>
    <div v-if="post" class="post">
        <h2>{{ post.title }}</h2>
        <p>{{ post.body }}</p>
        <div v-if="admin">
          <button class="delete" @click="deletePost">Delete Post</button>
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
import { ref } from 'vue';

    export default {
  components: { Spinner },
        props : ['id'],
        setup(props){
            let {user} = getUser();
            let admin = ref(false);
            if (user.value.displayName === 'minkhant'){
              admin = true
            }
            // when to use this.$route.params.id
            let route = useRoute(); // same => this.$route
            let router = useRouter();
            let {post, error, load} = getPost(route.params.id);
            load();
            let deletePost = async()=>{
                let id = props.id
                await db.collection("posts").doc(id).delete();
                router.push({name:'home'})
            }
            return {post, error, load, deletePost, admin}
        }
    }
</script>

<style>
    .post {
        margin: 0 40px 30px;
        padding-bottom: 30px;
        border-bottom: 1px dashed #e7e7e7;
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
</style>