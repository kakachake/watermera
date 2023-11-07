import React, { useImperativeHandle, useState } from "react";
import {
  BaseSchema,
  BaseTemplateProps,
  Options,
  Placehoders,
  TemplateComponent,
  keyofExifInfo,
} from "../../type";
import styles from "./index.module.scss";
import { ExifKey, ExifKeyName } from "../../constants";
import { calcSizeByImageSize } from "../../utils/calc";
import {
  getDefalutBySchemas,
  parseOptionsByKeyValue,
} from "../../utils/template";
import RenderLogo from "../../imgs/renderLogo";
import classNames from "classnames";

export type PlacehoderKeys = [
  "rightTop1",
  "rightTop2",
  "rightTop3",
  "rightTop4",
  "left",
  "rightBottom",
  "left2"
];

function _BaseTemplate(
  props: BaseTemplateProps<PlacehoderKeys>,
  ref: React.Ref<HTMLDivElement>
) {
  const {
    image,
    placehoders = getDefalutBySchemas(
      placeholderSchemas
    ) as Placehoders<PlacehoderKeys>,
    onLoad,
    options = getDefalutBySchemas(optionSchemas) as Options<any>,
    // preview = false,
    ...rest
  } = props;

  const imgRef = React.useRef<HTMLImageElement>(null);
  const { exifInfo, rawFile } = image;
  const divRef = React.useRef<HTMLDivElement>(null);

  const [baseSize, setBaseSize] = useState(16);

  if (!placehoders) {
    throw Error("placeholder为空，请检查");
  }

  useImperativeHandle(ref, () => divRef.current!);

  const renderInfo = (key: keyofExifInfo) => {
    switch (key) {
      case ExifKey.ISO:
        return <>ISO{exifInfo?.[key]}</>;
      case ExifKey.FNumber:
        return <>f{exifInfo?.[key]}</>;
      case ExifKey.ExposureTime:
        return <>1/{1 / exifInfo?.[key]}s</>;
      case ExifKey.CreateDate:
        return <>{exifInfo?.[key]?.toLocaleString()}</>;
      case ExifKey.Model:
        return <>{exifInfo?.[key]}</>;
      case ExifKey.LensModel:
        return <>{exifInfo?.[key]}</>;
      case ExifKey.FocalLength:
        return <>{exifInfo?.[key]}mm</>;
      default:
        return exifInfo?.[key].toString() || "";
    }
  };

  const imgOnload = () => {
    const { height, width } = imgRef.current!;
    const baseSize = calcSizeByImageSize(width, height);
    divRef.current!.style.fontSize = baseSize + "px";
    setBaseSize(baseSize);
    setTimeout(() => {
      onLoad?.();
    }, 100);
  };

  return (
    <div
      ref={divRef}
      style={{
        padding: options.padding * baseSize + "px",
        backgroundColor: options.backgroundColor,
      }}
      className={classNames(styles.wrap, "font-serif")}
      {...rest}
    >
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
          <div>
            <div
              className={"text-slate-950 font-semibold	"}
              style={{
                fontSize: "1.2em",
              }}
            >
              {renderInfo(placehoders["left2"] as keyofExifInfo)}
              {renderInfo(placehoders["left"] as keyofExifInfo)}
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <RenderLogo
            logoName={exifInfo.Make}
            styles={{
              img: {
                height: options.logoSize + "em",
              },
            }}
          />
          <div
            style={{
              width: "0.1em",
              height: "2em",
              background: "#000",
              margin: "0 0.5em",
            }}
          ></div>
          <div>
            <div className={styles.boldFont}>
              {renderInfo(placehoders["rightTop1"] as keyofExifInfo)}
              &nbsp;
              {renderInfo(placehoders["rightTop2"] as keyofExifInfo)}
              &nbsp;
              {renderInfo(placehoders["rightTop3"] as keyofExifInfo)}
              &nbsp;
              {renderInfo(placehoders["rightTop4"] as keyofExifInfo)}
            </div>
            <div className={"text-slate-500"}>
              {renderInfo(placehoders["rightBottom"] as keyofExifInfo)}
            </div>
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

export const placeholderSchemas: BaseSchema<PlacehoderKeys> = {
  rightTop1: {
    title: "右上1",
    default: ExifKey.FocalLength,
    type: "string",
    props: {
      options: parseOptionsByKeyValue(ExifKeyName),
    },
  },
  rightTop2: {
    title: "右上2",
    default: ExifKey.FNumber,
    type: "string",
    props: {
      options: parseOptionsByKeyValue(ExifKeyName),
    },
  },
  rightTop3: {
    title: "右上3",
    default: ExifKey.ExposureTime,
    type: "string",
    props: {
      options: parseOptionsByKeyValue(ExifKeyName),
    },
  },
  rightTop4: {
    title: "右上4",
    default: ExifKey.ISO,
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
  left: {
    default: ExifKey.Model,
    type: "string",
    props: {
      options: parseOptionsByKeyValue(ExifKeyName),
    },
  },
  left2: {
    default: ExifKey.Make,
    type: "string",
    props: {
      options: parseOptionsByKeyValue(ExifKeyName),
    },
  },
} as const;

export const optionSchemas = {
  padding: {
    default: 2,
    type: "number",
    widget: "slider",
    min: 0,
    max: 15,
    props: {
      step: 0.1,
    },
  },
  backgroundColor: {
    default: "#fff",
    title: "背景颜色选择",
    type: "string",
    widget: "color",
  },
  logoSize: {
    default: 1,
    title: "logo大小",
    type: "number",
    widget: "slider",
    min: 0,
    max: 2,
    props: {
      step: 0.1,
    },
  },
};

export const schemas = {
  placeholderSchemas,
  optionSchemas,
};

export default BaseTemplate;
