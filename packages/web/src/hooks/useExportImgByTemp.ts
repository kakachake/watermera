import { ImageFile, exportImgByTemp, templates } from "@shared";
import { useCallback, useState } from "react";

export default function useExportImgByTemp(
  image: ImageFile,
  templateName: keyof typeof templates
) {
  const [isExporting, setIsExporting] = useState(false);
  const handleExport = useCallback(() => {
    const props = {
      placehoders: image?.templateOptions[templateName]?.placeholders,
      options: image?.templateOptions[templateName]?.options,
    };
    if (!image) return;
    setIsExporting(true);
    exportImgByTemp(image, templates[templateName].Comp, props).finally(() => {
      setIsExporting(false);
    });
  }, [image, templateName]);

  return {
    handleExport,
    isExporting,
  };
}
