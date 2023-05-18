<template>
    <header>
        <nav>
          <img src="@/assets/logo.jpg" alt="mechatronic logo" class="logo" @click="goHome">
            <h1>Only focous what you want</h1>
        </nav>
    </header>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
    export default {
        setup(){
          let router = useRouter();
          let search_key = ref(null);
          // this function will rediret home page
          let goHome = ()=>{
            router.push("/");
          }
          return {goHome, search_key};
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
  nav{
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 10px;
  }
  header h1 {
    color: #dfdfdf;
    font-size: 48px;
  }
  /* header a {
    color: #bbb;
    text-decoration: none;
    margin-left: 20px;
  }
  header a.router-link-active {
    color: #444;
    font-weight: bold;
  } */
</style>