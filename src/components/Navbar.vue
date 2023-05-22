<template>
    <header>
      <img src="@/assets/logo.jpg" alt="mechatronic logo" class="logo" @click="goHome">
        <nav>
          <router-link :to="{name:'home'}">Home</router-link>
          <span v-if="admin">
            <router-link :to="{name:'create'}">Create Post</router-link>
          </span>
          <span v-if="not_guest || admin ">
            <router-link :to="{name :'info'}">Profile</router-link>
          </span>
          <span v-else>
            <router-link :to="{name:'login'}">Login / Sign up</router-link>
          </span>
        </nav>
    </header>
</template>

<script>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import getUser from '@/composables/getUser';
import { auth } from '@/firebase/config';

    export default {
        setup(props){
          let router = useRouter();
          let {user} = getUser();
          let admin = ref(false);
          let not_guest = ref(false);
 
          if (user.value.displayName === 'minkhant'){
            admin.value = true;
            }
            
            if(user.value.displayName != 'guest'){
              not_guest.value = true;
            }

          watch(user,()=>{
            if (user.value === null){
                console.log('user null')
            }
            if(user.value.displayName != 'guest'){
              not_guest.value = true;
            }
            console.log('Name :',user.value.displayName)
            if (user.value.displayName === 'minkhant'){
              admin.value = true;
            }
            console.log('work2')
          })
  
          // this function will rediret home page
          let goHome = ()=>{
            router.push("/");
          }
          return {goHome, admin, not_guest, user};
        }
    }
</script>

<style scoped>

  .logo{
    height: 150px;
    width: 150px;
    display: inline-block;
    border-radius: 50%;
    margin-right: 20px;
    height: 100px;
    width: 100px;
    cursor: pointer;
  }
  header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 10px;
  }
  header h1 {
    color: #dfdfdf;
    font-size: 48px;
  }
  header a {
    color: #bbb;
    text-decoration: none;
    margin-left: 20px;
  }
  header a.router-link-active {
    color: #444;
    font-weight: bold;
  }
</style>