import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { useImagesContext } from "../../pages/index/imagesContext";
import styles from "./index.module.scss";
import ExifInfo from "./ExifInfo";

export function Panel() {
  const { current } = useImagesContext();
  const exifInfo = current.image?.exifInfo || null;

  return (
    <div className={styles.panelWrap}>
      <Tabs
        size="sm"
        fullWidth
        aria-label="Options"
        classNames={{
          panel: styles.panel,
        }}
      >
        <Tab key="基础信息" title="基础信息">
          <Card className={styles.panelItem}>
            <CardBody>
              <ExifInfo exifInfo={exifInfo} />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="模板配置" title="模板配置">
          <Card className={styles.panelItem}>
            <CardBody></CardBody>
          </Card>
        </Tab>
        <Tab key="模板选择" title="模板选择">
          <Card className={styles.panelItem}>
            <CardBody></CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
