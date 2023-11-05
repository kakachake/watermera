import {
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from "react";
import { SchemaBase } from "form-render";
import { templates } from ".";

export interface templateOptions {
  placehoders?: Placehoders<any>;
}
export interface ImageFile {
  rawFile: File;
  url: string;
  base64: string;
  exifInfo: ExifInfo;
  templateOptions: {
    [key in keyof typeof templates]?: {
      placeholders?: Placehoders<any>;
    };
  };
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

export type PlacehoderSchema = SchemaBase & {
  default: string;
};

export type Placehoders<T extends (string | number)[]> = Record<
  T[number],
  string
>;

export type TemplateComponent<T extends (string | number)[]> =
  ForwardRefExoticComponent<
    PropsWithoutRef<BaseTemplateProps<T>> & RefAttributes<any>
  > & {
    placehoderSchemas?: Record<T[number], PlacehoderSchema>;
    optionSchemas?: Record<string, any>;
  };

export interface BaseTemplateProps<T extends (string | number)[] = []> {
  image: ImageFile;
  placehoders?: Placehoders<T>;
  preview?: boolean;
  onLoad?: () => void;
}
