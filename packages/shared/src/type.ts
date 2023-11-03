import {
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from "react";

export interface ImageFile {
  rawFile: File;
  url: string;
  base64: string;
  exifInfo: ExifInfo;
}

export type ExifInfo = {
  Make: string;
  Model: string;
  XResolution: number;
  YResolution: number;
  ResolutionUnit: string;
  Software: string;
  ModifyDate: Date;
  ExposureTime: number;
  FNumber: number;
  ExposureProgram: string;
  ISO: number;
  ExifVersion: string;
  DateTimeOriginal: Date;
  CreateDate: Date;
  OffsetTime: string;
  OffsetTimeOriginal: string;
  OffsetTimeDigitized: string;
  ShutterSpeedValue: number;
  ApertureValue: number;
  ExposureCompensation: number;
  MaxApertureValue: number;
  MeteringMode: string;
  LightSource: string;
  Flash: string;
  FocalLength: number;
  SubSecTimeOriginal: string;
  SubSecTimeDigitized: string;
  ColorSpace: number;
  FocalPlaneXResolution: number;
  FocalPlaneYResolution: number;
  FocalPlaneResolutionUnit: string;
  SensingMethod: string;
  FileSource: string;
  SceneType: string;
  CustomRendered: string;
  ExposureMode: string;
  WhiteBalance: string;
  DigitalZoomRatio: number;
  FocalLengthIn35mmFormat: number;
  SceneCaptureType: string;
  GainControl: string;
  Contrast: string;
  Saturation: string;
  Sharpness: string;
  SerialNumber: string;
  LensModel: string;
  LensSerialNumber: string;
};

export type keyofExifInfo = keyof ExifInfo;

export type TemplateComponent = ForwardRefExoticComponent<
  PropsWithoutRef<BaseTemplateProps> & RefAttributes<any>
> & {
  canUsePlacehoder?: string[];
};

export type Placehoder = keyofExifInfo[];

export interface BaseTemplateProps {
  image: ImageFile;
  placehoders?: Placehoder;
  preview?: boolean;
  onLoad?: () => void;
}
