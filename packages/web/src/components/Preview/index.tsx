/* eslint-disable react-refresh/only-export-components */
import { ImageFile } from "@shared";
import { templates } from "@shared";
import styles from "./index.module.scss";
import { forwardRef, useLayoutEffect, useRef, useState } from "react";
import classnames from "classnames";
import { Spinner } from "@nextui-org/react";
import Draggable from "react-draggable";
export interface PreviewProps {
  image: ImageFile | null;
  onLoad: () => void;
}

function Preview({ image, onLoad }: PreviewProps) {
  const BaseTemplate = templates["base"];
  const [loaded, setLoaded] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const onLoadPreview = () => {
    // 获取预览图的尺寸
    if (!ref.current) {
      return;
    }
    const { width, height } = ref.current!.getBoundingClientRect();
    const { width: wrapperWidth, height: wrapperHeight } =
      wrapperRef.current!.getBoundingClientRect();
    console.log("width", width, "height", height);
    console.log("wrapperWidth", wrapperWidth, "wrapperHeight", wrapperHeight);

    const scale = Math.min(wrapperWidth / width, wrapperHeight / height) - 0.01;
    ref.current.style.transform = `scale(${scale})`;
    // 鼠标穿透
    ref.current.style.pointerEvents = "none";

    setLoaded(true);
    onLoad();
  };

  useLayoutEffect(() => {
    setLoaded(false);
  }, [image]);

  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.stopPropagation();
    console.log(e);
    const { deltaY } = e;
    const scaleStep = 0.01;
    const scale = deltaY < 0 ? scaleStep : -scaleStep;
    const transform = ref.current!.style.transform;
    const currentScale = parseFloat(
      transform.substring(transform.indexOf("(") + 1, transform.indexOf(")"))
    );
    console.log(currentScale);

    const nextScale = currentScale + scale;
    console.log("nextScale", nextScale);

    if (nextScale < 0.01) {
      return;
    }
    ref.current!.style.transition = "transform 0.2s";
    ref.current!.style.transform = `scale(${nextScale})`;
  };

  console.log(image?.templateOptions["base"]);

  return (
    <>
      {image && !loaded && (
        <div
          className={classnames(styles.loading, {
            [styles.loadingEnd]: loaded,
          })}
        >
          <Spinner color="default" label="Loading……" />
        </div>
      )}
      {image && (
        <div
          className={classnames(styles.previewItem, {
            [styles.loaded]: loaded,
          })}
          ref={wrapperRef}
        >
          <Draggable scale={1}>
            <div onWheel={onWheel}>
              <div>
                <BaseTemplate
                  image={image}
                  ref={ref}
                  key={image.rawFile.name}
                  onLoad={onLoadPreview}
                  preview={true}
                  placehoders={image.templateOptions["base"]?.placeholders}
                  options={image.templateOptions["base"]?.options}
                />
              </div>
            </div>
          </Draggable>
        </div>
      )}
    </>
  );
}

export default forwardRef<HTMLDivElement, PreviewProps>(Preview);
