import { db } from "@/firebase/config";

let savedPost = (save_toggle, Id)=>{
    // to change save post color
    let icon = document.querySelector('.fa-bookmark');
    save_toggle.value = !save_toggle.value
    if (save_toggle.value){
    icon.style.color = "#ff8800";
    console.log('update orange')
    }else{
    icon.style.color = 'gray';
    console.log('update gray')
    }
    // to update db save_post value
    let dbRef = db.collection("posts").doc(Id)
    let updateDb = db.collection("posts").doc(Id).onSnapshot(()=>{
    dbRef.update({
        save_post : save_toggle.value
        })
    })
    console.log(save_toggle.value)
}

export default savedPost;