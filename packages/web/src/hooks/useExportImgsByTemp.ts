import {
  BaseTemplateProps,
  ImageFile,
  exportImgsByTemp,
  templates,
} from "@shared";
import { useCallback, useState } from "react";

export default function useExportImgsByTemp(
  images: ImageFile[],
  props: Partial<BaseTemplateProps> = {}
) {
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState({
    percent: 0,
    idx: 0,
    total: images.length,
  });

  const initProgress = useCallback(() => {
    setProgress({
      percent: 0,
      idx: 0,
      total: images.length,
    });
  }, [images]);

  const handleExport = useCallback(async () => {
    if (!images.length) return;
    initProgress();
    setIsExporting(true);
    await exportImgsByTemp(images, templates["base"], props, (idx, total) => {
      setProgress({
        percent: Math.round((idx / total) * 100),
        idx,
        total,
      });
    });

    setIsExporting(false);
  }, [images]);

  return {
    handleExport,
    isExporting,
    progress,
  };
}
