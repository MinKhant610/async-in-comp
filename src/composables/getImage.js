import { database } from "@/firebase/config";

const dbRef = database.ref();

let style = (imgElement)=>{
  imgElement.style.width = '100px';
  imgElement.style.height = '100px';
  imgElement.style.border = '3px solid black'
  imgElement.style.borderRadius = '5px'
}

let getImage = (userId, defalut_image) => {

    dbRef.child('users').child(userId).get().then((snapshot) => {
        if (snapshot.exists()){
          // show user what they upload
          let container = document.querySelector('.profile_img');
          let imgElement = document.createElement('img');
          imgElement.src = snapshot.val().profile_picture;
          style(imgElement)
          localStorage.setItem('imgurl', snapshot.val().profile_picture);
          container.appendChild(imgElement);
        }else{
          // when new user or not upload any photo this will work 
          let container = document.querySelector('.profile_img');
          let imgElement = document.createElement('img');
          imgElement.src = defalut_image;
          style(imgElement)
          container.appendChild(imgElement);
        }
      }).catch((error) => {
        // this will work when user offline
        let container = document.querySelector('.profile_img');
        let imgElement = document.createElement('img');
        imgElement.src = localStorage.getItem('imgurl'); 
        style(imgElement);
        container.appendChild(imgElement);
        console.log(error)
      });
}

export default getImage;