import * as faceapi from '@vladmandic/face-api';

const SSD_MOBILENETV1 = 'ssd_mobilenetv1'
const TINY_FACE_DETECTOR = 'tiny_face_detector'

const selectedFaceDetector = TINY_FACE_DETECTOR

// ssd_mobilenetv1 options
const minConfidence = 0.5

// tiny_face_detector options
const inputSize = 512
const scoreThreshold = 0.5

export function getFaceDetectorOptions() {
  return selectedFaceDetector === SSD_MOBILENETV1
    ? new faceapi.SsdMobilenetv1Options({ minConfidence })
    : new faceapi.TinyFaceDetectorOptions({ inputSize, scoreThreshold })
}

function getCurrentFaceDetectionNet() {
  if (selectedFaceDetector === SSD_MOBILENETV1) {
    return faceapi.nets.ssdMobilenetv1
  }
  if (selectedFaceDetector === TINY_FACE_DETECTOR) {
    return faceapi.nets.tinyFaceDetector
  }
  throw Error(`Not known model used ${selectedFaceDetector}`)
}

export function isFaceDetectionModelLoaded() {
  return !!getCurrentFaceDetectionNet().params
}
