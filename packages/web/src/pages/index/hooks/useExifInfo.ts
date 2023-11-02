import { ImageFile } from "@shared";
import { useMemo } from "react";
import EXIF from "exif-js";

export default function useExifInfo(file: ImageFile) {
  const exifInfo = useMemo(() => {
    return EXIF.readFromBinaryFile(file);
  }, [file]);
  return exifInfo;
}
