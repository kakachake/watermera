import { templates } from "@shared";
import { useImagesContext } from "../../../pages/index/imagesContext";
import classNames from "classnames";

export default function TemplateSelect() {
  const { setTemplateName, templateName } = useImagesContext();
  return (
    <div
      className="
      flex flex-wrap gap-4
    "
    >
      {Object.entries(templates).map(([key, template]) => {
        const previewSrc = template.preview;
        return (
          <div
            onClick={() => {
              setTemplateName(key as keyof typeof templates);
            }}
            className={classNames(
              "flex flex-col items-center justify-center cursor-pointer rounded-lg box-border",
              {
                "border-3 border-blue-500": key === templateName,
              }
            )}
          >
            <img src={previewSrc} alt="" />
            <span>{template.name}</span>
          </div>
        );
      })}
    </div>
  );
}
