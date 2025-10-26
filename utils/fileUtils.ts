
export interface Base64File {
  base64: string;
  mimeType: string;
  dataUrl: string;
}

export const fileToBase64 = (file: File): Promise<Base64File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const dataUrl = reader.result as string;
      // The dataUrl is in the format: "data:[<mediatype>];base64,[<data>]"
      // We need to extract just the base64 data part for the API.
      const base64 = dataUrl.split(',')[1];
      if (!base64) {
          reject(new Error("Could not extract base64 string from file."));
          return;
      }
      resolve({
        base64,
        mimeType: file.type,
        dataUrl,
      });
    };
    reader.onerror = (error) => reject(error);
  });
};
