import mask from '../media/mask3.svg';
import rendererMask from './common-mask-renderer';

const img = new Image();
img.src = mask;

export default function rendererMask3(canvas, minEyeX, minEyeY, maxEyeX) {
  rendererMask(img, canvas, minEyeX, minEyeY, maxEyeX, 0.55, 0.55 * 0.815967524, 0.297, 1.1);
}
