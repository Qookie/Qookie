import html2canvas from 'html2canvas';

type DownloadOptions = {
  fileName: string;
  imgQuality?: number;
};

const defaultOptions: DownloadOptions = {
  fileName: 'default',
  imgQuality: 1,
};
const ImgType = 'image/png';

export const bakePng = async (
  element: React.RefObject<HTMLElement> | null,
) => {
  if (!element || !element.current) return null;
  try {
    const canvas = await html2canvas(element.current, {
      ...defaultOptions,
      useCORS: true,
    });
    return canvas.toDataURL(ImgType, 1);
  } catch (err) {
    console.log('img download fail error', err);
  }
};
