import './App.css';
import * as faceapi from '@vladmandic/face-api';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import { getFaceDetectorOptions, isFaceDetectionModelLoaded } from './recognition/face-detection-control';
import initModels from './recognition/face-detection';

import mask8 from './media/eye-mask-svgrepo-com.svg';
import mask0 from './media/mask.svg';
import mask1 from './media/mask1.svg';
import mask2 from './media/mask2.svg';
import mask3 from './media/mask3.svg';
import mask4 from './media/mask4.svg';
import mask5 from './media/mask5.svg';
import mask6 from './media/mask6.svg';
import mask7 from './media/mask7.svg';

import rendererMask0 from './renderer/renderer-mask-0';
import rendererMask1 from './renderer/renderer-mask-1';
import rendererMask2 from './renderer/renderer-mask-2';
import rendererMask3 from './renderer/renderer-mask-3';
import rendererMask4 from './renderer/renderer-mask-4';
import rendererMask5 from './renderer/renderer-mask-5';
import rendererMask6 from './renderer/renderer-mask-6';
import rendererMask7 from './renderer/renderer-mask-7';
import rendererMask8 from './renderer/renderer-mask-8';

function App() {
  (async function () {
    await initModels();
    const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
    const videoEl = document.getElementById('inputVideo');
    videoEl.srcObject = stream;
  }());

  const maskList = [mask0, mask1, mask2, mask3, mask4, mask5, mask6, mask7, mask8];
  const maskListSvg = maskList.map((el, index) => ({ key: index, img: el }));

  let selectedMask;

  const maskRendererList = [rendererMask0, rendererMask1, rendererMask2, rendererMask3,
    rendererMask4, rendererMask5, rendererMask6, rendererMask7, rendererMask8]
  const renderers = new Map(
    maskRendererList.map((el, index) => [index, el]),
  );

  function drawMask(canvas, resizedResult) {
    const { landmarks } = resizedResult;
    const leftEye = landmarks.getLeftEye();
    const rightEye = landmarks.getRightEye();
    let maxY = -1;
    let minY = 1000000;
    let maxX = -1;
    const eyes = leftEye.concat(rightEye);
    for (let i = 0; i < eyes.length; i += 1) {
      if (eyes[i].y > maxY) {
        maxY = eyes[i].y;
      }
      if (eyes[i].y < minY) {
        minY = eyes[i].y;
      }
      if (eyes[i].x > maxX) {
        maxX = eyes[i].x;
      }
    }

    const selectedMaskRenderer = renderers.get(selectedMask);
    if (selectedMaskRenderer) {
      selectedMaskRenderer(canvas, leftEye[0].x, minY, maxX, maxY);
    }
  }

  async function reDraw(videoEl, canvas) {
    const options = getFaceDetectorOptions();
    const result = await faceapi.detectAllFaces(videoEl, options)
      .withFaceLandmarks();
    canvas.setAttribute('width', videoEl.clientWidth);
    canvas.setAttribute('height', videoEl.clientHeight);
    for (let i = 0; i < result.length; i += 1) {
      const resizedResult = faceapi.resizeResults(result[i], canvas);
      drawMask(canvas, resizedResult);
    }
    return setTimeout(() => reDraw(videoEl, canvas));
  }

  async function onPlay() {
    const videoEl = document.getElementById('inputVideo');
    const canvas = document.getElementById('overlay');

    if (videoEl.paused || videoEl.ended || !isFaceDetectionModelLoaded()) {
      return setTimeout(onPlay);
    }

    return setTimeout(() => reDraw(videoEl, canvas));
  }

  function setMask(key) {
    selectedMask = key;
  }

  return (
    <div className="App">
      <header className="App-header" />
      <div className="Video-container">
        <video onLoadedMetadata={onPlay} id="inputVideo" autoPlay muted playsInline />
        <canvas id="overlay" />
      </div>
      <div className="Mask-container">
        <ImageList sx={{ height: 550 }} cols={9} rowHeight={80}>
          {maskListSvg.map((item) => (
            <ImageListItem key={item.img} onClick={() => setMask(item.key)}>
              <img
                className="item"
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.key}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    </div>
  );
}

export default App;
