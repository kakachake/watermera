import React, { useImperativeHandle } from "react";
import {
  BaseTemplateProps,
  TemplateComponent,
  keyofExifInfo,
} from "../../type";
import styles from "./index.module.scss";
import { ExifKey, ExifKeyName } from "../../constants";
import { logo } from "../../imgs/logo";
import { calcSizeByImageSize } from "../../utils/calc";
import {
  getDefalutPlacehoders,
  parseOptionsByKeyValue,
} from "../../utils/template";

export type PlacehoderKeys = [
  "leftTop1",
  "leftTop2",
  "leftTop3",
  "leftBottom",
  "rightTop",
  "rightBottom"
];

function _BaseTemplate(
  props: BaseTemplateProps<PlacehoderKeys>,
  ref: React.Ref<HTMLDivElement>
) {
  const {
    image,
    placehoders = getDefalutPlacehoders(BaseTemplate),
    onLoad,
    // preview = false,
    ...rest
  } = props;
  console.log("placehoders", placehoders);

  const imgRef = React.useRef<HTMLImageElement>(null);
  const { exifInfo, rawFile } = image;
  const divRef = React.useRef<HTMLDivElement>(null);

  if (!placehoders) {
    throw Error("placeholder为空，请检查");
  }

  useImperativeHandle(ref, () => divRef.current!);

  const renderInfo = (key: keyofExifInfo) => {
    switch (key) {
      case ExifKey.ISO:
        return (
          <span className={styles.boldFont} style={{}}>
            ISO{exifInfo?.[key]}
          </span>
        );
      case ExifKey.FNumber:
        return (
          <span className={styles.boldFont} style={{}}>
            f{exifInfo?.[key]}
          </span>
        );
      case ExifKey.ExposureTime:
        return (
          <span className={styles.boldFont} style={{}}>
            1/{1 / exifInfo?.[key]}s
          </span>
        );
      case ExifKey.CreateDate:
        return (
          <span className={styles.boldFont} style={{}}>
            {exifInfo?.[key]?.toLocaleString()}
          </span>
        );
      case ExifKey.Model:
        return (
          <span className={styles.boldFont} style={{}}>
            {exifInfo?.[key]}
          </span>
        );
      case ExifKey.LensModel:
        return (
          <span className={styles.secondFont} style={{}}>
            {exifInfo?.[key]}
          </span>
        );
      default:
        return exifInfo?.[key].toString() || "";
    }
  };

  const renderLogo = () => {
    const logoName = exifInfo?.Make?.toLocaleLowerCase();
    if (logoName in logo) {
      return (
        <img
          src={logo[logoName as keyof typeof logo]}
          alt={logoName}
          style={{
            height: "2em",
          }}
        />
      );
    } else {
      return (
        <span className={styles.logoName} style={{}}>
          {logoName?.toUpperCase()}
        </span>
      );
    }
  };

  const imgOnload = () => {
    const { height, width } = imgRef.current!;
    const baseSize = calcSizeByImageSize(width, height);
    divRef.current!.style.fontSize = baseSize + "px";
    setTimeout(() => {
      onLoad?.();
    }, 100);
  };

  return (
    <div ref={divRef} style={{}} className={styles.wrap} {...rest}>
      <img
        style={{
          maxWidth: "none",
          maxHeight: "none",
        }}
        ref={imgRef}
        src={image.url}
        alt={rawFile.name}
        onLoad={imgOnload}
      />
      <div className={styles.infoBar}>
        <div className={styles.left}>
          <div style={{}}>
            {renderInfo(placehoders["leftTop1"] as keyofExifInfo)}
            &nbsp;
            {renderInfo(placehoders["leftTop2"] as keyofExifInfo)}
            &nbsp;
            {renderInfo(placehoders["leftTop3"] as keyofExifInfo)}
          </div>
          <div>{renderInfo(placehoders["leftBottom"] as keyofExifInfo)}</div>
        </div>
        <div className={styles.right}>
          {renderLogo()}
          <div
            style={{
              width: "0.1em",
              height: "2em",
              background: "#000",
              margin: "0 0.5em",
            }}
          ></div>
          <div>
            <div>{renderInfo(placehoders["rightTop"] as keyofExifInfo)}</div>
            <div>{renderInfo(placehoders["rightBottom"] as keyofExifInfo)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const BaseTemplate: TemplateComponent<PlacehoderKeys> = React.forwardRef<
  HTMLDivElement,
  BaseTemplateProps<PlacehoderKeys>
>(_BaseTemplate);

BaseTemplate.placehoderSchemas = {
  leftTop1: {
    title: "左上1",
    default: ExifKey.ISO,
    type: "string",
    props: {
      options: parseOptionsByKeyValue(ExifKeyName),
    },
  },
  leftTop2: {
    title: "左上2",
    default: ExifKey.FNumber,
    type: "string",
    props: {
      options: parseOptionsByKeyValue(ExifKeyName),
    },
  },
  leftTop3: {
    title: "左上3",
    default: ExifKey.ExposureTime,
    type: "string",
    props: {
      options: parseOptionsByKeyValue(ExifKeyName),
    },
  },
  leftBottom: {
    default: ExifKey.CreateDate,
    type: "string",
    props: {
      options: parseOptionsByKeyValue(ExifKeyName),
    },
  },
  rightTop: {
    default: ExifKey.Model,
    type: "string",
    props: {
      options: parseOptionsByKeyValue(ExifKeyName),
    },
  },
  rightBottom: {
    default: ExifKey.LensModel,
    type: "string",
    props: {
      options: parseOptionsByKeyValue(ExifKeyName),
    },
  },
} as const;

BaseTemplate.optionSchemas = {};

export default BaseTemplate;
