<template>
  <div class="container">
    <div v-if="show_login_form">
      <Login></Login>
      <p>Not a member? <span @click="show_login_form = !show_login_form">create account</span></p>
    </div>
    <div v-else>
      <Singup></Singup>
      <p>Already member? <span @click="show_login_form = !show_login_form">Login Account</span></p>
    </div>
  </div>
</template>

<script>
  import Singup from '../components/Singup'
import Login from '../components/Login'
import { ref } from 'vue'
export default {
  components: {
    Singup, Login },
    setup(){
      let show_login_form = ref(true)
      return {show_login_form};
    }
  }
</script>

<style scoped>
  button {
    margin: 20px auto;
  }

  button:active {
    background: #aa702e ;
  }
  form{
    width: 300px;
    margin: 20px auto;
    padding: 20px 20px 0px 20px;
  }
  .container {
    width: 90%;
    max-width: 460px;
    margin: 80px auto;
    border-radius: 20px;
    background: white;
    border-radius: 20px;
    box-shadow: 2px 4px 6px 4px rgba(28, 6, 49, 0.1);
  }
  input {
    width: 100%;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid #eee;
    outline: none;
    color: #999;
    margin: 10px auto;
   }
   .container p{
    text-align: center;
    padding-bottom: 30px;
   }
   span{
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer;
   }
</style>
