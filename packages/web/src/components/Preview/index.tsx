/* eslint-disable react-refresh/only-export-components */
import { ImageFile } from "@shared";
import { templates } from "@shared";
import styles from "./index.module.scss";
import { forwardRef, useLayoutEffect, useState } from "react";
import classnames from "classnames";
import { Spinner } from "@nextui-org/react";

export interface PreviewProps {
  image: ImageFile | null;
  onLoad: () => void;
}

function Preview(
  { image, onLoad }: PreviewProps,
  ref: React.Ref<HTMLDivElement>
) {
  const BaseTemplate = templates["base"];
  const [loaded, setLoaded] = useState<boolean>(false);
  const onLoadPreview = () => {
    setLoaded(true);
    onLoad();
  };

  useLayoutEffect(() => {
    setLoaded(false);
  }, [image]);

  return (
    <>
      {image && !loaded && (
        <div
          className={classnames(styles.loading, {
            [styles.loadingEnd]: loaded,
          })}
        >
          <Spinner color="default" label="Loading……" />
        </div>
      )}
      {image && (
        <div
          className={classnames(styles.previewItem, {
            [styles.loaded]: loaded,
          })}
        >
          <BaseTemplate
            image={image}
            ref={ref}
            onLoad={onLoadPreview}
            preview={true}
          />
        </div>
      )}
    </>
  );
}

export default forwardRef<HTMLDivElement, PreviewProps>(Preview);
