import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { useImagesContext } from "../../pages/index/imagesContext";
import styles from "./index.module.scss";
import ExifInfo from "./ExifInfo";
import TemplateOptions from "./TemplateOptions";
import { Placehoders, TemplateInfo, templates } from "@shared";
import TemplateSelect from "./templateSelect";

export function Panel() {
  const { current, setTemplateOptions, setExifInfo, templateName } =
    useImagesContext();
  const exifInfo = current.image?.exifInfo || null;
  const template: TemplateInfo = templates[templateName];

  const handlePlacehodersChange = (value: any) => {
    setTemplateOptions(templateName, {
      placeholders: value as Placehoders<any>,
    });
  };
  const handleOptionsChange = (value: any) => {
    setTemplateOptions(templateName, {
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
              <ExifInfo exifInfo={exifInfo} onChange={setExifInfo} />
            </CardBody>
          </Card>
        </Tab>
        {template.schemas?.placeholderSchemas && (
          <Tab key="字段配置" title="字段配置">
            <Card className={styles.panelItem}>
              <CardBody>
                <TemplateOptions
                  key={current.image?.url}
                  optionsSchema={template.schemas?.placeholderSchemas}
                  onChange={handlePlacehodersChange}
                  options={current.image?.templateOptions?.base?.placeholders}
                />
              </CardBody>
            </Card>
          </Tab>
        )}
        {template.schemas?.optionSchemas && (
          <Tab key="模板配置" title="模板配置">
            <Card className={styles.panelItem}>
              <CardBody>
                <TemplateOptions
                  key={current.image?.url}
                  optionsSchema={template.schemas?.optionSchemas}
                  onChange={handleOptionsChange}
                  options={current.image?.templateOptions?.base?.options}
                />
              </CardBody>
            </Card>
          </Tab>
        )}
        <Tab key="模板选择" title="模板选择">
          <Card className={styles.panelItem}>
            <CardBody>
              <TemplateSelect />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
