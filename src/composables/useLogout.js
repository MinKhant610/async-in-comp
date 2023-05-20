import { auth } from "@/firebase/config";
import { ref } from "vue";


let error = ref(null);

let logoutAcc = async()=>{
    try{
        await auth.signOut();
        await auth.signInWithEmailAndPassword('guest@gmail.com', 'guest123');
    }catch(err){
        error.value = err.message;
    }
}

let useLogout = () =>{
    return {error, logoutAcc};
}

export default useLogout;