import { ExifInfo, ImageFile } from "../type";
import exifr from "exifr";

export const fileToUrl = (file: File) => {
  return URL.createObjectURL(file);
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const fileToArrayBuffer = (file: File): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = (error) => reject(error);
  });
};

export const getExifInfo = (file: ArrayBuffer): Promise<ExifInfo> => {
  return exifr.parse(file);
};

export const mergeFiles = (files: File[]): Promise<ImageFile[]> => {
  return Promise.all(
    files.map(async (file) => {
      const url = fileToUrl(file);
      const base64 = await fileToBase64(file);
      const buffer = await fileToArrayBuffer(file);

      const exifInfo = await getExifInfo(buffer);
      console.log(file);
      return {
        rawFile: file,
        url,
        base64,
        exifInfo,
      } as ImageFile;
    })
  );
};
