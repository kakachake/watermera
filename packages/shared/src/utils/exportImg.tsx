import { createRoot } from "react-dom/client";
import { ImageFile, TemplateComponent } from "..";
import React from "react";
import html2canvas from "html2canvas";

const getRootDiv = (() => {
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

export function exportImgByTemp(imageFile: ImageFile, Comp: TemplateComponent) {
  const div = getRootDiv();
  const node = createRoot(div);
  const onLoad = () => {
    exportImgByDiv(div).then(() => {
      node.unmount();
    });
  };
  node.render(<Comp image={imageFile} onLoad={onLoad} />);
}

export function exportImgByDiv(div: HTMLDivElement) {
  return new Promise((resolve) => {
    html2canvas(div as HTMLElement, {}).then((canvas: HTMLCanvasElement) => {
      canvas.toBlob((blob) => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob!);
        a.download = "image.png";
        a.click();
        resolve(true);
      });
    });
  });
}
