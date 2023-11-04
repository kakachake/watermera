import { ImageFile, exportImgByTemp, templates } from "@shared";
import { useCallback, useState } from "react";

export default function useExportImgByTemp(image: ImageFile) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = useCallback(() => {
    if (!image) return;
    setIsExporting(true);
    exportImgByTemp(image, templates["base"]).finally(() => {
      setIsExporting(false);
    });
  }, [image]);

  return {
    handleExport,
    isExporting,
  };
}
