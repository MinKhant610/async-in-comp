import { database } from "@/firebase/config";

const dbRef = database.ref();

let getImage = (userId, defalut_image) => {

    dbRef.child('users').child(userId).get().then((snapshot) => {
        if (snapshot.exists()){
          let container = document.querySelector('.profile_img');
          let imgElement = document.createElement('img');
          imgElement.src = snapshot.val().profile_picture;
          imgElement.style.width = '100px'
          imgElement.style.height = '100px'
          container.appendChild(imgElement);
          console.log('hello');
        }else{
          let container = document.querySelector('.profile_img');
          let imgElement = document.createElement('img');
          imgElement.src = defalut_image;
          imgElement.style.width = '100px'
          imgElement.style.height = '100px'
          container.appendChild(imgElement)
          console.log('No data available');
        }
      }).catch((error) => {
        console.log(error);
      });
}

export default getImage;