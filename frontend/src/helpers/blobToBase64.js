function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      var base64data = reader.result;
      resolve(base64data);
    };
  });
}

export default blobToBase64;
