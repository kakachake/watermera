/* eslint-disable react-hooks/rules-of-hooks */
import { ImageFile, templates } from "@shared";

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
  templateName: keyof typeof templates;
  setImages: (images: ImageFile[]) => void;
  setCurrent: (current: ImagesContextType["current"]) => void;
  setCurrentIdx: (idx: number) => void;
  setTemplateOptions: (
    templateName: keyof typeof templates,
    templateOptions: ImageFile["templateOptions"][keyof typeof templates]
  ) => void;
  setExifInfo: (exifInfo: ImageFile["exifInfo"]) => void;
  setTemplateName: (templateName: keyof typeof templates) => void;
}

const ImagesContext = createContext<ImagesContextType>({
  images: [],
  current: {
    image: null,
    index: 0,
  },
  templateName: Object.keys(templates)[0] as keyof typeof templates,
  setImages: () => {
    throw new Error("setImages not implemented");
  },
  setCurrent: () => {
    throw new Error("setCurrent not implemented");
  },
  setCurrentIdx: () => {
    throw new Error("setCurrentIdx not implemented");
  },
  setTemplateOptions: () => {
    throw new Error("setTemplateOptions not implemented");
  },
  setExifInfo: () => {
    throw new Error("setExifInfo not implemented");
  },
  setTemplateName: () => {
    throw new Error("setTemplateName not implemented");
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
    const [templateName, setTemplateName] = useState<keyof typeof templates>(
      Object.keys(templates)[0] as keyof typeof templates
    );

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

    const setTemplateOptions = (
      templateName: keyof typeof templates,
      templateOptions: ImageFile["templateOptions"][keyof typeof templates]
    ) => {
      const image = current.image;
      if (!image) {
        return;
      }
      image.templateOptions[templateName] = {
        ...image.templateOptions[templateName],
        ...templateOptions,
      };

      setCurrent({
        image,
        index: current.index,
      });
    };

    const setExifInfo = (exifInfo: ImageFile["exifInfo"]) => {
      const image = current.image;
      if (!image) {
        return;
      }
      image.exifInfo = exifInfo;

      setCurrent({
        image,
        index: current.index,
      });
    };

    return (
      <ImagesContext.Provider
        value={{
          templateName,
          setTemplateName,
          images,
          current,
          setImages,
          setCurrent,
          setCurrentIdx,
          setTemplateOptions,
          setExifInfo,
        }}
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
