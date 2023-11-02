import React, { useEffect, useMemo, useState } from "react";
import { ImageFile, keyofExifInfo } from "../../type";
import styles from "./index.module.scss";
import { ExifKey } from "@shared/constants";
import { logo } from "@shared/imgs/logo";

export type Placehoder = keyofExifInfo[];

export interface BaseTemplateProps {
  image: ImageFile;
  placehoders?: Placehoder;
  onLoad?: () => void;
}

const defalutPlacehoders: Placehoder = [
  ExifKey.ISO,
  ExifKey.FNumber,
  ExifKey.ExposureTime,
  ExifKey.CreateDate,
  ExifKey.Model,
  ExifKey.LensModel,
];

function _BaseTemplate(
  props: BaseTemplateProps,
  ref: React.Ref<HTMLDivElement>
) {
  const { image, placehoders = defalutPlacehoders, onLoad } = props;
  const imgRef = React.useRef<HTMLImageElement>(null);
  const { exifInfo, rawFile } = image;
  const [baseHeight, setBaseHeight] = useState<number>(0);
  const [baseFontSize, setBaseFontSize] = useState<number>(0);

  const renderInfo = (key: keyofExifInfo) => {
    switch (key) {
      case ExifKey.ISO:
        return (
          <span
            className={styles.boldFont}
            style={{
              fontSize: baseFontSize,
            }}
          >
            ISO{exifInfo[key]}
          </span>
        );
      case ExifKey.FNumber:
        return (
          <span
            className={styles.boldFont}
            style={{
              fontSize: baseFontSize,
            }}
          >
            f{exifInfo[key]}
          </span>
        );
      case ExifKey.ExposureTime:
        return (
          <span
            className={styles.boldFont}
            style={{
              fontSize: baseFontSize,
            }}
          >
            1/{1 / exifInfo[key]}s
          </span>
        );
      case ExifKey.CreateDate:
        return (
          <span
            className={styles.boldFont}
            style={{
              fontSize: baseFontSize,
            }}
          >
            {exifInfo[key].toLocaleString()}
          </span>
        );
      case ExifKey.Model:
        return (
          <span
            className={styles.boldFont}
            style={{
              fontSize: baseFontSize,
            }}
          >
            {exifInfo[key]}
          </span>
        );
      case ExifKey.LensModel:
        return (
          <span
            className={styles.secondFont}
            style={{
              fontSize: baseFontSize,
            }}
          >
            {exifInfo[key]}
          </span>
        );
      default:
        "";
    }
  };

  const imgOnload = () => {
    const { height } = imgRef.current!;
    const baseHeight = height / 7;
    setBaseHeight(baseHeight);
    setBaseFontSize(baseHeight / 7);
    setTimeout(() => {
      onLoad?.();
    }, 0);
  };

  return (
    <div ref={ref}>
      <img
        style={{
          maxWidth: "none",
        }}
        ref={imgRef}
        src={image.url}
        alt={rawFile.name}
        onLoad={imgOnload}
      />
      <div
        className={styles.infoBar}
        style={{
          height: baseHeight,
          padding: `${baseHeight / 8}px ${baseHeight / 6}px`,
        }}
      >
        <div className={styles.left}>
          <div
            style={{
              fontSize: baseFontSize + "px",
            }}
          >
            {renderInfo(placehoders[0])}
            &nbsp;
            {renderInfo(placehoders[1])}
            &nbsp;
            {renderInfo(placehoders[2])}
          </div>
          <div>{renderInfo(placehoders[3])}</div>
        </div>
        <div className={styles.right}>
          <img src={logo.panasonic} alt="" />
          <div
            style={{
              width: "3px",
              height: "60%",
              background: "#000",
              margin: `0 ${baseHeight / 6}px`,
            }}
          ></div>
          <div>
            <div>{renderInfo(placehoders[4])}</div>
            <div>{renderInfo(placehoders[5])}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const BaseTemplate: any = React.forwardRef<HTMLDivElement, BaseTemplateProps>(
  _BaseTemplate
);

BaseTemplate.canUsePlacehoder = [ExifKey.ISO];

export default BaseTemplate;
