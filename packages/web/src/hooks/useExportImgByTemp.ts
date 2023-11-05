import { ImageFile, exportImgByTemp, templates } from "@shared";
import { useCallback, useState } from "react";

export default function useExportImgByTemp(image: ImageFile) {
  const [isExporting, setIsExporting] = useState(false);
  const handleExport = useCallback(() => {
    const props = {
      placehoders: image?.templateOptions["base"]?.placeholders,
      options: image?.templateOptions["base"]?.options,
    };
    if (!image) return;
    setIsExporting(true);
    exportImgByTemp(image, templates["base"], props).finally(() => {
      setIsExporting(false);
    });
  }, [image]);

  return {
    handleExport,
    isExporting,
  };
}
