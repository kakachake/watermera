import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { useImagesContext } from "../../pages/index/imagesContext";

export function Panel() {
  const { current } = useImagesContext();
  console.log(current);

  return (
    <Tabs aria-label="Options">
      <Tab key="基础信息" title="基础信息">
        <Card>
          <CardBody></CardBody>
        </Card>
      </Tab>
      <Tab key="模板选择" title="模板选择">
        <Card>
          <CardBody></CardBody>
        </Card>
      </Tab>
    </Tabs>
  );
}
