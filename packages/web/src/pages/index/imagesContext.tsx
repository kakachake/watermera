/* eslint-disable react-hooks/rules-of-hooks */
import { ImageFile } from "@shared";

import {
  FunctionComponent,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export interface ImagesContextType {
  images: ImageFile[];
  current: {
    image: ImageFile | null;
    index: number;
  };
  setImages: (images: ImageFile[]) => void;
  setCurrent: (current: ImagesContextType["current"]) => void;
  setCurrentIdx: (idx: number) => void;
}

const ImagesContext = createContext<ImagesContextType>({
  images: [],
  current: {
    image: null,
    index: 0,
  },
  setImages: () => {
    throw new Error("setImages not implemented");
  },
  setCurrent: () => {
    throw new Error("setCurrent not implemented");
  },
  setCurrentIdx: () => {
    throw new Error("setCurrentIdx not implemented");
  },
});

export default ImagesContext;

export const ImagesProviderHOC = (
  Comp: FunctionComponent
): FunctionComponent => {
  return (props: any) => {
    const [images, setImages] = useState<ImageFile[]>([]);
    const [current, setCurrent] = useState<ImagesContextType["current"]>({
      image: null,
      index: 0,
    });

    useEffect(() => {
      if (images.length <= 0) {
        setCurrent({
          image: null,
          index: 0,
        });
        return;
      }
      const currentIndex = current.index >= images.length ? 0 : current.index;
      setCurrent({
        image: images[currentIndex],
        index: currentIndex,
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [images]);

    const setCurrentIdx = (idx: number) => {
      setCurrent({
        image: images[idx],
        index: idx,
      });
    };

    return (
      <ImagesContext.Provider
        value={{ images, current, setImages, setCurrent, setCurrentIdx }}
      >
        <Comp {...props} />
      </ImagesContext.Provider>
    );
  };
};

// eslint-disable-next-line react-refresh/only-export-components
export const useImagesContext = () => {
  return useContext(ImagesContext);
};
