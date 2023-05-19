<template>
        <form @submit.prevent="login">
            <h2>Login</h2>
            <input type="email" placeholder="Email" required v-model="email">
            <input type="password" placeholder="Password" required v-model="password">
            <div v-if="error" class="error">
                {{ error }}
            </div>
            <button>Login</button>
        </form>
</template>

<script>
import Singup from '../components/Singup'
import { ref } from 'vue'
import useLogin from '@/composables/useLogin';
import { useRouter } from 'vue-router';

    export default {
  components: { Singup },
        setup(props, context){
            let email = ref("");
            let password = ref("");
            let router = useRouter();

            let {error, signIn} = useLogin();

            let login = async()=>{
                let response = await signIn(email.value, password.value);
                if (response){
                    router.push({name:'create'})
                }
            };
            return{email, password, login, error}
        }
    }
</script>

<style>
.error {
    color: #ff3f80;
    font-size: 14px;
  }
</style>