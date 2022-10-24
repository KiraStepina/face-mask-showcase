import mask from '../media/mask.svg';
import rendererMask from './common-mask-renderer';

const img = new Image();
img.src = mask;

export default function rendererMask0(canvas, minEyeX, minEyeY, maxEyeX) {
  rendererMask(img, canvas, minEyeX, minEyeY, maxEyeX, 0.38, 0.38 * 0.909090909, 0.87, 1.57);
}
