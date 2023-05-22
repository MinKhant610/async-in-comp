<template>
        <form @submit.prevent="login">
            <h2>Login</h2>
            <input type="email" placeholder="Email" required v-model="email">
            <input type="password" placeholder="Password" required v-model="password">
            <div v-if="error" class="error">
                {{ error }}
                <span class="forgot" @click="resetPassWithMail">forgot password?</span>
            </div>
            <button>Login</button>
        </form>
</template>

<script>
import Singup from '../components/Singup'
import { ref } from 'vue'
import useLogin from '@/composables/useLogin';
import { useRouter } from 'vue-router';
import useReset from '@/composables/useReset'


    export default {
  components: { Singup },
        setup(props, context){
            let email = ref("");
            let password = ref("");
            let router = useRouter();

            let {error, signIn} = useLogin();
            let {reset_error, resetPass} = useReset();

            let login = async()=>{
                let response = await signIn(email.value, password.value);
                if (response){
                    router.push({name:'create'})
                }
            };
            let resetPassWithMail = async ()=>{
                let mail_response = await resetPass(email.value)
                if (!mail_response){
                    alert("Password reset mail send successfully")
                }else{
                    alert("Cannot reset password")
                }
            }
            return{email, password, login, error, resetPassWithMail}
        }
    }
</script>

<style>
.error {
    color: #ff3f80;
    font-size: 14px;
  }
  .forgot{
    color: black;
    font-weight: bold;
    cursor: pointer;
    text-decoration: underline;
  }
</style>