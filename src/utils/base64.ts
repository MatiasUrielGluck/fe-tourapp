export function imageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (!reader.result) throw new Error('Error when encoding the image');
      resolve(<string>reader.result);
    };
    reader.onerror = (error) => reject(error);
  });
}
