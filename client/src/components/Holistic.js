import { Holistic } from "@mediapipe/holistic";
import React, { useRef, useEffect } from "react";
import * as HoliStic from "@mediapipe/holistic";
import * as cam from "@mediapipe/camera_utils";   
import Webcam from "react-webcam";
function Hlstic() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  var connect =  window.drawConnectors;
  function onResults(results) {
    // const video = webcamRef.current.video;
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    // Set canvas width
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );


  // Only overwrite missing pixels.
  canvasCtx.globalCompositeOperation = 'destination-atop';
  canvasCtx.drawImage(
      results.image, 0, 0, canvasElement.width, canvasElement.height);

  canvasCtx.globalCompositeOperation = 'source-over';
  connect(canvasCtx, results.poseLandmarks, HoliStic.POSE_CONNECTIONS,
                 {color: '#00FF00', lineWidth: 4});
connect(canvasCtx, results.poseLandmarks,
                {color: '#FF0000', lineWidth: 2});
  connect(canvasCtx, results.faceLandmarks, HoliStic.FACEMESH_TESSELATION,
                 {color: '#C0C0C070', lineWidth: 1});
  connect(canvasCtx, results.leftHandLandmarks, HoliStic.HAND_CONNECTIONS,
                 {color: '#CC0000', lineWidth: 5});
connect(canvasCtx, results.leftHandLandmarks,
                {color: '#00FF00', lineWidth: 2});
  connect(canvasCtx, results.rightHandLandmarks, HoliStic.HAND_CONNECTIONS,
                 {color: '#00CC00', lineWidth: 5});
connect(canvasCtx, results.rightHandLandmarks,
                {color: '#FF0000', lineWidth: 2});
  canvasCtx.restore();
  }
  // setInterval(())
  useEffect(() => {
    // Holistic mesh 
    const holistic = new Holistic({locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
      }});
      holistic.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: true,
        smoothSegmentation: true,
        refineFaceLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
      });
      holistic.onResults(onResults);

    // Holistic end
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null
    ) {
      var camera = new cam.Camera(webcamRef.current.video, {
        onFrame: async () => {
          await holistic.send({ image: webcamRef.current.video });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }
  }, []);
  return (
    <center>
      <div className="App">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        ></canvas>
      </div>
    </center>
  );
}

export default Hlstic;