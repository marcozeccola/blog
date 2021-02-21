//mostra nomi immagini caricate
const getFileName = (event) => {

     if (!event || !event.target || !event.target.files || event.target.files.length === 0) {
          return;
     }
     console.log(event.target);
     document.getElementById('uploadedFiles').innerHTML = ' ';
     console.log(event.target.files);
     for (let i = 0; i < event.target.files.length; i++) {
          document.getElementById('uploadedFiles').innerHTML += '<br>' + event.target.files[i].name;
     }
}

//mostra nomi file da fare upload perchè sono nel body 
const parseBody =()=>{
     const imgsArray = document.querySelector('iframe').contentDocument.querySelectorAll('img');
     document.getElementById('toUploadFiles').innerHTML = ' ';

     imgsArray.forEach((img)=>{
          document.getElementById('toUploadFiles').innerHTML += '<br>' + img.title;
     });


}