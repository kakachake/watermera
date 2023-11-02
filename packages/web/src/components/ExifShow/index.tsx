import { ExifInfo } from "@shared";

export interface ExifShowProps {
  exifInfo: ExifInfo;
}

export default function ExifShow(props: ExifShowProps) {
  const { exifInfo } = props;
  return (
    <div>
      <div>文件名：{exifInfo.fileName}</div>
      <div>文件大小：{exifInfo.fileSize}</div>
      <div>文件类型：{exifInfo.fileType}</div>
      <div>图片宽度：{exifInfo.imageWidth}</div>
      <div>图片高度：{exifInfo.imageHeight}</div>
      <div>拍摄时间：{exifInfo.dateTime}</div>
      <div>相机品牌：{exifInfo.cameraBrand}</div>
      <div>相机型号：{exifInfo.cameraModel}</div>
      <div>光圈：{exifInfo.aperture}</div>
      <div>曝光时间：{exifInfo.exposureTime}</div>
      <div>ISO：{exifInfo.iso}</div>
      <div>焦距：{exifInfo.focalLength}</div>
      <div>GPS：{exifInfo.gps}</div>
    </div>
  );
}
