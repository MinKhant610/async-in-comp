<template>
    <form @submit.prevent="signUp">
        <h2>Sign Up</h2>
        <input type="text" placeholder="Username" required v-model="name">
        <input type="email" placeholder="Email" required v-model="email">
        <input type="password" placeholder="Password" required v-model="password">
        <div v-if="error" class="error"> {{ error }}</div>
        <button>Sign Up</button>
    </form>
</template>

<script>
import { ref } from 'vue'
import useSignup from '@/composables/useSignup';
import { useRouter } from 'vue-router';

    export default {
        setup(props, context){
            let name = ref("");
            let email = ref("");
            let password = ref("");
            let router = useRouter();

            let {error, createAccount} = useSignup()

            let signUp = async()=>{
                let response = await createAccount(email.value, password.value, name.value);
                if (response){
                    router.push("/");
                }
            }

            return {name, email, password, signUp, error}
        }
    }
</script>