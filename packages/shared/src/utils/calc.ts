// 根据图片的宽高，计算合适的字体大小
export const calcSizeByImageSize = (
  width: number,
  height: number,
  standardFontSize = 30
) => {
  // 按照标准分辨率 1920 * 1080 计算
  const standardWidth = 1920;
  const standardHeight = 1080;

  if (width < height) {
    [width, height] = [height, width];
  }

  const fontSzie = Math.round(
    standardFontSize * Math.min(width / standardWidth, height / standardHeight)
  );
  return fontSzie;
};
