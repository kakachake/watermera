import { ImageFile } from "@shared";
import classnames from "classnames";
import styles from "./index.module.scss";
import { Image } from "@nextui-org/react";

export interface LeftImgListProps {
  images: ImageFile[];
  currentIdx: number;
  onClick: (idx: number) => void;
}

export default function LeftImgList(props: LeftImgListProps) {
  const { images, currentIdx, onClick } = props;
  return (
    <div className={styles.imagesWrap}>
      {images.map((image, idx) => {
        const { url, rawFile } = image;
        return (
          <div
            key={rawFile.name}
            className={classnames(styles.imageItem, {
              [styles.leftCardItemActive]: idx === currentIdx,
            })}
            onClick={() => onClick(idx)}
          >
            <Image isZoomed isBlurred className="z-0" src={url} alt="" />
          </div>
        );
      })}
    </div>
  );
}
