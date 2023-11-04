import { Button, Progress } from "@nextui-org/react";
import { ChangeEvent, useState } from "react";
import { ImageFile, mergeFiles } from "@shared";
import classNames from "classnames";
import styles from "./index.module.scss";

export interface ImageUploadProps {
  onChange?: (files: ImageFile[]) => void;
  onProgress?: (progress: number) => void;
}

export default function ImageUpload(props: ImageUploadProps) {
  const { onChange } = props;
  const [progress, setProgress] = useState(0);

  const onProgress = (idx: number, total: number) => {
    console.log(idx, total);

    setProgress((idx / total) * 100 || 0);
  };

  const handleOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files;
    if (files && files.length > 0) {
      onChange && onChange(await mergeFiles([...files], onProgress));
    }
  };
  return (
    <>
      <Button
        size="sm"
        fullWidth
        color="primary"
        variant="flat"
        as={"label"}
        htmlFor="imageUpload"
      >
        导入
        <Progress
          className={classNames(styles.progress, {
            [styles.hidden]: progress === 0 || progress === 100,
          })}
          size="sm"
          aria-label="Loading..."
          value={progress}
          classNames={{
            track: styles.progressTrack,
          }}
        />
      </Button>

      <input
        style={{ display: "none" }}
        type="file"
        multiple
        id="imageUpload"
        onChange={handleOnChange}
      ></input>
    </>
  );
}
