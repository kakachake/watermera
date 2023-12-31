import React, { useImperativeHandle, useState } from "react";
import {
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
        return <span style={{}}>ISO{exifInfo?.[key]}</span>;
      case ExifKey.FNumber:
        return <span style={{}}>f{exifInfo?.[key]}</span>;
      case ExifKey.ExposureTime:
        return <span style={{}}>1/{1 / exifInfo?.[key]}s</span>;
      case ExifKey.CreateDate:
        return <span style={{}}>{exifInfo?.[key]?.toLocaleString()}</span>;
      case ExifKey.Model:
        return <span style={{}}>{exifInfo?.[key]}</span>;
      case ExifKey.LensModel:
        return <span style={{}}>{exifInfo?.[key]}</span>;
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
      className={styles.wrap}
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
          <div className={styles.boldFont}>
            {renderInfo(placehoders["leftTop1"] as keyofExifInfo)}
            &nbsp;
            {renderInfo(placehoders["leftTop2"] as keyofExifInfo)}
            &nbsp;
            {renderInfo(placehoders["leftTop3"] as keyofExifInfo)}
          </div>
          <div className={styles.boldFont}>
            {renderInfo(placehoders["leftBottom"] as keyofExifInfo)}
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
              {renderInfo(placehoders["rightTop"] as keyofExifInfo)}
            </div>
            <div className={styles.secondFont}>
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

export const placeholderSchemas = {
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
    default: 2,
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
