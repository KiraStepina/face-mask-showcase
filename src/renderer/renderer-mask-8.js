import mask from '../media/eye-mask-svgrepo-com.svg';

const img = new Image();
img.src = mask;

export default function rendererMask8(canvas, minEyeX, minEyeY, maxEyeX) {
  const ctx = canvas.getContext('2d');
  const offset = Math.round((maxEyeX - minEyeX) / 4);

  ctx.drawImage(
    img,
    minEyeX - offset,
    minEyeY - offset / 2,
    maxEyeX - minEyeX + 2 * offset,
    (maxEyeX - minEyeX) / 2 + offset,
  );
}
