export const encodeFileToBase64 = (fileBlob: File, callback: (result: string) => void) => {
  const reader = new FileReader();
  reader.readAsDataURL(fileBlob);
  reader.onload = () => {
    callback(reader.result as string);
  };
};

export const encodeBase64ToMultipartFile = (imageFile: File) => {
  const formData = new FormData();

  formData.append('image', imageFile);
  return formData;
};

export function dataURLtoFile(dataurl: string, filename: string) {
  let arr = dataurl.split(',');
  let mime = arr[0].match(/:(.*?);/)![1];
  let bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}
