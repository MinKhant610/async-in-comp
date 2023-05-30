import { db } from "@/firebase/config";

let savedPost = (save_toggle, Id, userId)=>{
    // to change save post color
    let icon = document.querySelector('.fa-bookmark');
    save_toggle.value = !save_toggle.value
    if (save_toggle.value){
        icon.style.color = "#ff8800";
    }else{
        icon.style.color = 'gray';
    }
    // to update db save_post value in the db per user
    let dbRef = db.collection("posts").doc(Id).collection("users").doc(userId);
    dbRef.set({
        save_post : save_toggle.value
    }, {merge : true});

    dbRef.onSnapshot((doc)=>{
        const data = doc.data();
        const saved = data && data.save_post;
        save_toggle.value = saved;

        if (saved){
            icon.style.color = "#ff8800";
        }else{
            icon.style.color = 'gray';
        }
    })
}

export default savedPost;