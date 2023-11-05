import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { useImagesContext } from "../../pages/index/imagesContext";
import styles from "./index.module.scss";
import ExifInfo from "./ExifInfo";
import TemplateOptions from "./TemplateOptions";
import { Placehoders, templates } from "@shared";

export function Panel() {
  const { current, setTemplateOptions } = useImagesContext();
  const exifInfo = current.image?.exifInfo || null;
  const handlePlacehodersChange = (value: any) => {
    setTemplateOptions("base", {
      placeholders: value as Placehoders<any>,
    });
  };
  const handleOptionsChange = (value: any) => {
    setTemplateOptions("base", {
      options: value as Placehoders<any>,
    });
  };

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
        {templates["base"].placehoderSchemas && (
          <Tab key="字段配置" title="字段配置">
            <Card className={styles.panelItem}>
              <CardBody>
                <TemplateOptions
                  optionsSchema={templates["base"].placehoderSchemas}
                  onChange={handlePlacehodersChange}
                />
              </CardBody>
            </Card>
          </Tab>
        )}
        {templates["base"].optionSchemas && (
          <Tab key="模板配置" title="模板配置">
            <Card className={styles.panelItem}>
              <CardBody>
                <TemplateOptions
                  optionsSchema={templates["base"].optionSchemas}
                  onChange={handleOptionsChange}
                />
              </CardBody>
            </Card>
          </Tab>
        )}
        <Tab key="模板选择" title="模板选择">
          <Card className={styles.panelItem}>
            <CardBody></CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
