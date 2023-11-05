import { ImageFile } from "@shared";
import ImageUpload from "../../components/ImageUpload";
import styles from "./index.module.scss";
import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { Panel } from "../../components/Panel";
import { ImagesProviderHOC, useImagesContext } from "./imagesContext";
import Preview from "../../components/Preview";
import useExportImgByTemp from "../../hooks/useExportImgByTemp";
import LeftImgList from "../../components/LeftImgList";
import useExportImgsByTemp from "../../hooks/useExportImgsByTemp";
import ProgressButton from "../../components/ProgressButton";

function Index() {
  const { images, setImages, current, setCurrentIdx } = useImagesContext();
  const handleOnChange = (files: ImageFile[]) => {
    setImages(files);
  };

  const onLoad = () => {};

  const { isExporting, handleExport } = useExportImgByTemp(current.image!);

  const {
    isExporting: isExportingAll,
    progress,
    handleExport: handleExportAll,
  } = useExportImgsByTemp(images, {
    placehoders: current.image?.templateOptions["base"]?.placeholders,
    options: current.image?.templateOptions["base"]?.options,
  });

  const handleImageChange = (idx: number) => {
    setCurrentIdx(idx);
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftCard}>
        <ImageUpload onChange={handleOnChange} />
        <Card className={styles.imageListWrap}>
          <CardHeader className="p-0 sticky top-0 backdrop-blur-xl bg-white/70 z-10 flex flex-col dark:bg-zinc-900">
            <div className="p-2">图片列表</div>
            <Divider />
          </CardHeader>
          <CardBody className="p-4 overflow-y-visible	">
            <LeftImgList
              images={images}
              currentIdx={current.index}
              onClick={handleImageChange}
            />
          </CardBody>
        </Card>
      </div>
      <Card className={styles.previewCard}>
        <CardBody className={styles.previewBody}>
          <Preview image={current.image} onLoad={onLoad} />
        </CardBody>
      </Card>
      <div className={styles.panel}>
        <Panel />
        <div className="flex flex-row gap-1">
          <Button
            isLoading={isExporting}
            disabled={!current.image}
            size="sm"
            fullWidth
            color="primary"
            onClick={handleExport}
          >
            导出
          </Button>
          <ProgressButton
            isLoading={isExportingAll}
            disabled={!current.image}
            size="sm"
            progress={progress.percent}
            fullWidth
            color="primary"
            onClick={handleExportAll}
          >
            批量导出
            {isExportingAll && `（${progress.idx} / ${progress.total}）`}
          </ProgressButton>
        </div>
      </div>
    </div>
  );
}

const IndexWrap = ImagesProviderHOC(Index);

export default IndexWrap;
