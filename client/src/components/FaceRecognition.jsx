// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';

const FaceDetection = () => {
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const imageRef = useRef();
  const canvasRef = useRef();

  // Ensure the MODEL_URL points to the correct directory inside public
  const MODEL_URL = `${window.location.origin}/models`;  // Full path to models

  // Load models asynchronously
  const loadModels = async () => {
    try {
      // Load models from the respective directories
      await faceapi.nets.tinyFaceDetector.loadFromUri(`${MODEL_URL}/tiny_face_detector`);
      await faceapi.nets.faceLandmark68Net.loadFromUri(`${MODEL_URL}/face_landmark_68`);
      await faceapi.nets.faceRecognitionNet.loadFromUri(`${MODEL_URL}/face_recognition`);
      await faceapi.nets.faceExpressionNet.loadFromUri(`${MODEL_URL}/face_expression`);  // Loading face expression model

      setModelsLoaded(true);
      console.log("Models loaded successfully.");
    } catch (err) {
      console.error("Error loading models:", err);
    }
  };

  // Handle face detection when image is loaded
  const handleImage = async () => {
    if (!modelsLoaded) return;

    const inputImage = imageRef.current;

    // Log image dimensions before processing
    console.log("Input Image Dimensions:", inputImage.width, inputImage.height);

    // Perform face detection using Tiny Face Detector, Face Landmarks, and Face Recognition
    try {
      const detections = await faceapi.detectAllFaces(inputImage, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions()  // Adding face expressions detection
        .withFaceDescriptors();

      if (detections.length === 0) {
        console.log("No faces detected.");
        return;
      }

      console.log("Detections:", detections);

      // Resize the canvas to match the image dimensions
      const displaySize = { width: inputImage.width, height: inputImage.height };
      faceapi.matchDimensions(canvasRef.current, displaySize);

      // Draw the detections
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);  // Draw detected face expressions

    } catch (error) {
      console.error("Error during face detection:", error);
    }
  };

  useEffect(() => {
    loadModels();  // Load models on component mount
  }, []);

  return (
    <div className="App">
      <h1>Face Detection</h1>
      <div>
        <img
          ref={imageRef}
          src="/images/person2.jpg"  // Image stored in public/images folder
          alt="Face"
          onLoad={handleImage}  // Trigger detection when the image loads
        />
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default FaceDetection;
