const isString = (value) => {
     return value != '';
}

document.querySelector('#blog-submit').onclick = (e) => {

     let titleError = document.querySelector('#titleError');
     let snippetError = document.querySelector('#snippetError');
     let checkboxError=document.querySelector('#checkboxError');
     let imgError =document.querySelector('#fileError');
     const form = document.querySelector('form');
     const title = form.querySelector('#title').value;
     const snippet = form.querySelector('#snippet').value;
     const checkbox = form.querySelector('#checkImgBody');
     const uploaded = document.querySelector('#uploadedFiles').innerHTML.split(' ').sort().filter(isString);
     const toupload = document.querySelector('#toUploadFiles').innerHTML.split(' ').sort().filter(isString);
     const imgsArray = document.querySelector('iframe').contentDocument.querySelectorAll('img');

     titleError.innerHTML = " ";
     checkboxError.innerHTML = " ";
     snippetError.innerHTML = " ";
     imgError.innerHTML = " ";
     
     if (title != '' && snippet != ''  && checkbox.checked && uploaded.join().includes(toupload.join()) ) {

          imgsArray.forEach((img) => {
               img.src = img.title;
               img.alt = img.title;
               img.title = " "
          });

          form.submit();
     } else {
          if(title==''){
               titleError.innerHTML = 'Obbligatorio inserire il titolo';
          }
          if(snippet ==''){
               snippetError.innerHTML = 'Obbligatorio inserire il riassunto dell articolo';

          }
          if(!checkbox.checked){
               checkboxError.innerHTML= 'Obbligatorio fare la verifica dei file inseriti nel body';

          }
          if(uploaded.join().includes(toupload.join())){
               imgError.innerHTML = 'Obbligatorio fare l upload di almeno un immagine e delle immagini inserite nel body. Ricorda che devono avere lo stesso nome e devi inserirli tutti in un colpo solo.';

          }
     }

}