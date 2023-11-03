import React, { useLayoutEffect, useState } from "react";
import {
  BaseTemplateProps,
  Placehoder,
  TemplateComponent,
  keyofExifInfo,
} from "../../type";
import styles from "./index.module.scss";
import { ExifKey } from "../../constants";
import { logo } from "../../imgs/logo";
import { calcSizeByImageSize } from "../../utils/calc";

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
  const {
    image,
    placehoders = defalutPlacehoders,
    onLoad,
    preview = false,
  } = props;
  const imgRef = React.useRef<HTMLImageElement>(null);
  const { exifInfo, rawFile } = image;
  const [baseHeight, setBaseHeight] = useState<number>(0);
  const [baseWidth, setBaseWidth] = useState<number>(0);
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
            ISO{exifInfo?.[key]}
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
            f{exifInfo?.[key]}
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
            1/{1 / exifInfo?.[key]}s
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
            {exifInfo?.[key]?.toLocaleString()}
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
            {exifInfo?.[key]}
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
            {exifInfo?.[key]}
          </span>
        );
      default:
        "";
    }
  };

  const renderLogo = () => {
    const logoName = exifInfo?.Make?.toLocaleLowerCase();
    if (logoName in logo) {
      return (
        <img
          src={logo[logoName as keyof typeof logo]}
          alt={logoName}
          style={{ width: "100%" }}
        />
      );
    } else {
      return (
        <span
          className={styles.logoName}
          style={{
            fontSize: baseFontSize + 5 + "px",
          }}
        >
          {logoName?.toUpperCase()}
        </span>
      );
    }
  };

  useLayoutEffect(() => {
    setBaseWidth(0);
  }, [image]);

  const imgOnload = () => {
    const { height, width } = imgRef.current!;
    const baseHeight = calcSizeByImageSize(width, height);
    const baseWidth = width;
    setBaseHeight(baseHeight);
    setBaseWidth(baseWidth);
    setBaseFontSize(baseHeight / 6);
    setTimeout(() => {
      onLoad?.();
    }, 0);
  };

  return (
    <div
      ref={ref}
      style={{
        width: baseWidth ? baseWidth + "px" : "fit-content",
        height: baseWidth ? "auto" : "100%",
      }}
    >
      <img
        style={{
          maxWidth: preview ? "100%" : "none",
          maxHeight: preview ? "85%" : "none",
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
          fontSize: baseFontSize + "px",
        }}
      >
        <div className={styles.left}>
          <div style={{}}>
            {renderInfo(placehoders[0])}
            &nbsp;
            {renderInfo(placehoders[1])}
            &nbsp;
            {renderInfo(placehoders[2])}
          </div>
          <div>{renderInfo(placehoders[3])}</div>
        </div>
        <div className={styles.right}>
          {renderLogo()}
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

const BaseTemplate: TemplateComponent = React.forwardRef<
  HTMLDivElement,
  BaseTemplateProps
>(_BaseTemplate);

BaseTemplate.canUsePlacehoder = [ExifKey.ISO];

export default BaseTemplate;
