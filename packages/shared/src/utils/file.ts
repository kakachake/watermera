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

export const getExifInfo = (file: File): Promise<ExifInfo> => {
  return exifr.parse(file);
};

export const mergeFiles = (
  files: File[],
  callback: (idx: number, total: number) => void
): Promise<ImageFile[]> => {
  let cun = 0;
  return Promise.all(
    files.map(async (file, idx) => {
      console.log("正在处理第" + idx + "张图片");

      console.time("fileToUrl" + idx);
      const url = fileToUrl(file);
      console.timeEnd("fileToUrl" + idx);
      callback(++cun, files.length * 3);
      console.time("fileToBase64" + idx);
      const base64 = await fileToBase64(file);
      console.timeEnd("fileToBase64" + idx);
      callback(++cun, files.length * 3);
      console.time("getExifInfo" + idx);
      const exifInfo = await getExifInfo(file);
      console.timeEnd("getExifInfo" + idx);

      callback(++cun, files.length * 3);
      return {
        rawFile: file,
        url,
        base64,
        exifInfo,
        templateOptions: {},
      } as ImageFile;
    })
  );
};
