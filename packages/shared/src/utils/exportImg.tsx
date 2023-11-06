import { createRoot } from "react-dom/client";
import { BaseTemplateProps, ImageFile, TemplateComponent } from "..";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import JSZip from "jszip";

const getRootDiv: () => HTMLDivElement = (() => {
  const exportWrap = document.createElement("div");
  exportWrap.id = "exportWrap";
  exportWrap.style.position = "absolute";
  exportWrap.style.width = "0";
  exportWrap.style.height = "0";
  exportWrap.style.overflow = "hidden";
  document.body.appendChild(exportWrap);
  return () => {
    exportWrap.innerHTML = "";
    const exportDiv = document.createElement("div");
    exportDiv.id = "exportDiv";
    exportDiv.style.position = "absolute";
    exportDiv.style.width = "fit-content";
    exportDiv.style.height = "fit-content";
    exportWrap.appendChild(exportDiv);
    return exportDiv;
  };
})();

export function exportImgByTemp(
  imageFile: ImageFile,
  Comp: TemplateComponent,
  props: Partial<BaseTemplateProps> = {},
  download = true
) {
  return new Promise<Blob>((resolve) => {
    const div = getRootDiv();
    const node = createRoot(div);
    const fileName = imageFile.rawFile.name;
    const onLoad = () => {
      getImgByDiv(div).then((blob: Blob) => {
        if (download) {
          saveAs(blob!, fileName);
        }
        node.unmount();
        resolve(blob);
      });
    };
    node.render(<Comp image={imageFile} onLoad={onLoad} {...props} />);
  });
}

export function getImgByDiv(div: HTMLDivElement) {
  return new Promise<Blob>((resolve) => {
    html2canvas(div, {
      scale: 1,
    }).then((canvas: HTMLCanvasElement) => {
      canvas.toBlob((blob) => {
        resolve(blob!);
      });
    });
  });
}

// TODO: 批量导出有问题
export async function exportImgsByTemp(
  images: ImageFile[],
  Comp: TemplateComponent,
  props: Partial<BaseTemplateProps> = {},
  onProgress: (idx: number, total: number) => void
) {
  return new Promise<void>(async (resolve) => {
    const jszip = new JSZip();
    for (let i = 0; i < images.length; i++) {
      await exportImgByTemp(images[i], Comp, props, false)
        .then((blob: Blob) => {
          jszip.file(images[i].rawFile.name, blob);
        })
        .finally(() => {
          onProgress(i + 1, images.length);
        });
    }
    jszip.generateAsync({ type: "blob" }).then((blob) => {
      saveAs(blob, "images.zip");
      resolve();
    });
  });
}
