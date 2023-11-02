import { Button } from "@nextui-org/react";
import { ChangeEvent } from "react";
import { ImageFile, mergeFiles } from "@shared";

export interface ImageUploadProps {
  onChange?: (files: ImageFile[]) => void;
}

export default function ImageUpload(props: ImageUploadProps) {
  const { onChange } = props;
  const handleOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files;
    if (files && files.length > 0) {
      onChange && onChange(await mergeFiles([...files]));
    }
  };
  return (
    <>
      <Button color="primary" as={"label"} htmlFor="imageUpload">
        上传
      </Button>
      <input
        style={{ display: "none" }}
        type="file"
        id="imageUpload"
        onChange={handleOnChange}
      ></input>
    </>
  );
}
