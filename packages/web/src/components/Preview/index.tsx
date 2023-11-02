/* eslint-disable react-refresh/only-export-components */
import { ImageFile } from "@shared/index";
import { templates } from "@shared/index";
import styles from "./index.module.scss";
import { forwardRef } from "react";
import { createPortal } from "react-dom";

export interface PreviewProps {
  image: ImageFile | null;
  onLoad: () => void;
}

function Preview(
  { image, onLoad }: PreviewProps,
  ref: React.Ref<HTMLDivElement>
) {
  const BaseTemplate = templates["base"];
  return (
    <>
      {image &&
        createPortal(
          <div className={styles.previewDiv}>
            <BaseTemplate image={image} ref={ref} onLoad={onLoad} />
          </div>,
          document.body
        )}
    </>
  );
}

export default forwardRef<HTMLDivElement, PreviewProps>(Preview);
