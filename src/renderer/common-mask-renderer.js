export default function rendererMask(
  img,
  canvas,
  minEyeX,
  minEyeY,
  maxEyeX,
  width,
  height,
  coeffX,
  coeffY,
) {
  const ctx = canvas.getContext('2d');
  const offset = maxEyeX - minEyeX;

  ctx.drawImage(
    img,
    minEyeX - offset * coeffX,
    minEyeY - offset * coeffY,
    (maxEyeX - minEyeX) / width,
    (maxEyeX - minEyeX) / height,
  );
}
