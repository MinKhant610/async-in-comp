import { auth } from "@/firebase/config"
import { ref } from "vue";

let reset_error = ref(null);

let resetPass = async(email)=>{
    try{
        let response = await auth.sendPasswordResetEmail(email);
        if (!response){
            throw new Error('Cannot reset password');
        }
    }catch(err){
        reset_error.value = err.message;
    }
    
}

let useReset = ()=>{
    return {reset_error, resetPass}
}

export default useReset