import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';

const FaceRecognition = () => {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [labeledFaceDescriptors, setLabeledFaceDescriptors] = useState(null);
  const [faceMatcher, setFaceMatcher] = useState(null);
  const [userName, setUserName] = useState('');
  const [recognizedName, setRecognizedName] = useState('');

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
      await faceapi.nets.faceExpressionNet.loadFromUri('/models');
      startVideo();
    };

    const startVideo = () => {
      navigator.mediaDevices.getUserMedia({ video: {} }).then((stream) => {
        videoRef.current.srcObject = stream;
      });
    };

    loadModels();
  }, []);

  const handleVideoPlay = async () => {
    const canvas = canvasRef.current;
    const displaySize = {
      width: videoRef.current.videoWidth,
      height: videoRef.current.videoHeight,
    };
    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptors();

      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

      if (faceMatcher) {
        const results = resizedDetections.map((d) =>
          faceMatcher.findBestMatch(d.descriptor)
        );
        results.forEach((result, i) => {
          const box = resizedDetections[i].detection.box;
          const drawBox = new faceapi.draw.DrawBox(box, {
            label: result.toString(),
          });
          drawBox.draw(canvas);

          if (result.label !== 'unknown') {
            setRecognizedName(result.label); // Show recognized name
          }
        });
      }
    }, 100);
  };

  const handleUserRegistration = async () => {
    const detections = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (detections) {
      const descriptor = detections.descriptor;
      const newFace = new faceapi.LabeledFaceDescriptors(userName, [descriptor]);
      setLabeledFaceDescriptors([...(labeledFaceDescriptors || []), newFace]);
      setUserName('');
    }
  };

  useEffect(() => {
    if (labeledFaceDescriptors) {
      setFaceMatcher(new faceapi.FaceMatcher(labeledFaceDescriptors));
    }
  }, [labeledFaceDescriptors]);

  return (
    <div className="flex flex-col items-center">
      <video
        ref={videoRef}
        autoPlay
        muted
        onPlay={handleVideoPlay}
        className="rounded-md border-2 border-gray-400"
      />
      <canvas ref={canvasRef} className="absolute" />
      <div className="mt-4">
        <input
          type="text"
          placeholder="Enter your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="border-2 p-2"
        />
        <button
          onClick={handleUserRegistration}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Register Face
        </button>
      </div>
      <div className="mt-4 text-xl">
        {recognizedName && `Recognized: ${recognizedName}`}
      </div>
    </div>
  );
};

export default FaceRecognition;
