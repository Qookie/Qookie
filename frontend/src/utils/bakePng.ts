import html2canvas from 'html2canvas';
import { Options } from 'pretty-format';
import { saveAs } from 'file-saver';

type DownloadOptions = {
  fileName: string;
  imgQuality?: number;
  canvasOptions?: Partial<Options>;
};

const defaultOptions: DownloadOptions = {
  fileName: 'default',
  imgQuality: 1,
  canvasOptions: {},
};
const ImgType = 'image/png';

export const bakePng = async (
  element: React.RefObject<HTMLElement> | null,
  options: DownloadOptions,
) => {
  if (!element || !element.current) return null;
  const { fileName, imgQuality, canvasOptions } = options;
  try {
    const canvas = await html2canvas(element.current, {
      ...defaultOptions,
      ...canvasOptions,
      proxy: '/html2canvas-proxy',
      useCORS: true,
    });
    saveAs(canvas.toDataURL(ImgType, imgQuality), fileName);
  } catch (err) {
    console.log('img download fail error', err);
  }
};
