import mask from '../media/mask4.svg';
import rendererMask from './common-mask-renderer';

const img = new Image();
img.src = mask;

export default function rendererMask4(canvas, minEyeX, minEyeY, maxEyeX) {
  rendererMask(img, canvas, minEyeX, minEyeY, maxEyeX, 0.45, 0.45 * 0.8, 0.5, 1.4);
}
