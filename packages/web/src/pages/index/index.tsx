import { ImageFile, templates } from "@shared";
import ImageUpload from "../../components/ImageUpload";
import styles from "./index.module.scss";
import { Button, Card, CardBody } from "@nextui-org/react";
import { Panel } from "../../components/Panel";
import { ImagesProviderHOC, useImagesContext } from "./imagesContext";
import Preview from "../../components/Preview";
import { exportImgByTemp } from "@shared";

function Index() {
  const { setImages, current } = useImagesContext();
  const handleOnChange = (files: ImageFile[]) => {
    setImages(files);
  };

  const onLoad = () => {};
  const handleExport = () => {
    exportImgByTemp(current.image!, templates["base"]);
  };

  return (
    <div className={styles.container}>
      <Card className={styles.previewCard}>
        <CardBody className={styles.previewBody}>
          <Preview image={current.image} onLoad={onLoad} />
        </CardBody>
      </Card>
      <div className={styles.panel}>
        <div>
          <ImageUpload onChange={handleOnChange} />
          <Button color="primary" onClick={handleExport}>
            导出
          </Button>
        </div>
        <Panel />
      </div>
    </div>
  );
}

const IndexWrap = ImagesProviderHOC(Index);

export default IndexWrap;
