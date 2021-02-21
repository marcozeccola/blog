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
    let input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');

    input.onchange = function () {
      let file = this.files[0];

      let reader = new FileReader();
      reader.onload = function () {

        let id = 'id' + (new Date()).getTime();
        let blobCache = tinymce.activeEditor.editorUpload.blobCache;
        let base64 = reader.result.split(',')[1];
        let blobInfo = blobCache.create(id, file, base64);
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