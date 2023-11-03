// 根据图片的宽高，计算合适的字体大小
export const calcSizeByImageSize = (width: number, height: number) => {
  const size = Math.min(width, height);
  const fontSize = size / 10;
  return fontSize;
};
