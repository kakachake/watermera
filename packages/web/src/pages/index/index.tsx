import { ImageFile } from "@shared/index";
import ImageUpload from "../../components/ImageUpload";
import styles from "./index.module.scss";
import { Card } from "@nextui-org/react";
import { Panel } from "../../components/Panel";
import { ImagesProviderHOC, useImagesContext } from "./imagesContext";
import Preview from "../../components/Preview";
import html2canvas from "html2canvas";
import { useRef } from "react";

function Index() {
  const { setImages, current } = useImagesContext();
  const templateRef = useRef<HTMLDivElement>(null);
  const handleOnChange = (files: ImageFile[]) => {
    setImages(files);
  };
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onLoad = () => {
    html2canvas(templateRef.current as HTMLElement, {
      scale: 0.5,
      canvas: canvasRef.current as HTMLCanvasElement,
    });
  };

  return (
    <div className={styles.container}>
      <Card className={styles.preview}>
        <Preview image={current.image} ref={templateRef} onLoad={onLoad} />
        <canvas ref={canvasRef} className={styles.canvas}></canvas>
      </Card>
      <div className={styles.panel}>
        <ImageUpload onChange={handleOnChange} />
        <Panel />
      </div>
    </div>
  );
}

const IndexWrap = ImagesProviderHOC(Index);

export default IndexWrap;
