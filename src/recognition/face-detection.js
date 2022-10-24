import * as faceapi from '@vladmandic/face-api';

export default async function initModels() {
  const MODEL_URL = '/weights'
  await faceapi.loadSsdMobilenetv1Model(MODEL_URL)
  await faceapi.loadFaceLandmarkModel(MODEL_URL)
  await faceapi.loadFaceRecognitionModel(MODEL_URL)
  await faceapi.loadFaceLandmarkTinyModel(MODEL_URL)
  await faceapi.loadTinyFaceDetectorModel(MODEL_URL)
}
