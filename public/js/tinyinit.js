//tiny editor init
tinymce.init({
     selector: 'textarea',
     plugins: 'lists code image',
     toolbar: 'numlist bullist code | undo redo | link image ',
     lists_indent_on_tab: false,   
     image_title: true,
     automatic_uploads: true,
     _types: 'image',

     file_picker_callback: function (cb, value, meta) {
       var input = document.createElement('input');
       input.setAttribute('type', 'file');
       input.setAttribute('accept', 'image/*');

       input.onchange = function () {
         var file = this.files[0];

         var reader = new FileReader();
         reader.onload = function () {

           var id = 'id' + (new Date()).getTime();
           var blobCache = tinymce.activeEditor.editorUpload.blobCache;
           var base64 = reader.result.split(',')[1];
           var blobInfo = blobCache.create(id, file, base64);
           blobCache.add(blobInfo);
           cb(blobInfo.blobUri(), {
             title: file.name
           });
         };
         reader.readAsDataURL(file);
       };
       input.click();
     },
     content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'


   });