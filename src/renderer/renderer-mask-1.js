import mask from '../media/mask1.svg';
import rendererMask from './common-mask-renderer';

const img = new Image();
img.src = mask;

export default function rendererMask1(canvas, minEyeX, minEyeY, maxEyeX) {
  rendererMask(img, canvas, minEyeX, minEyeY, maxEyeX, 0.5, 0.5, 0.4, 1.5);
}
