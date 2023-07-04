import{ Hands} from "@mediapipe/hands";
import React, { useRef, useEffect } from "react";
import * as Hand from "@mediapipe/hands";
import * as cam from "@mediapipe/camera_utils";   
import Webcam from "react-webcam";
import { isTablet } from "react-device-detect"; 
import "./facemask.css"
import tattoo from "../Images/Tattoo.png";
function App() {
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
    if (results.multiHandLandmarks) {
      var img = new Image();
      // img.src = "https://www.svgrepo.com/show/62101/sword.svg";
      img.src = "https://www.onlygfx.com/wp-content/uploads/2022/04/spider-and-web-tattoo-2611.svg"
      // console.log(results.multiHandLandmarks.x);
      for (const landmarks of results.multiHandLandmarks) {
            var l = 0
            var k = 0
            for(const landmark of landmarks){
              l += landmark.x;
              k += landmark.y;
            }
            l = l/(landmarks.length);
            k = k/(landmarks.length);
            canvasCtx.drawImage(img, Math.round(l*640)-50, Math.round(k*480),100, 100);
            // canvasCtx.drawImage(img, Math.round(((landmarks[5].x))*640)-150, Math.round((landmarks[5].y)*480)-150,100, 100);

            // console.log(landmarks);
      }
    }
    canvasCtx.restore();
  }
  const w = isTablet ? "70vw" : "45vw";
  useEffect(() => {
    // Face mesh 
    const hand = new Hands({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      },
    });

    hand.setOptions({
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
      });

    hand.onResults(onResults);

    // face mesh end
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null
    ) {
      var camera = new cam.Camera(webcamRef.current.video, {
        onFrame: async () => {
          await hand.send({ image: webcamRef.current.video });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }
  }, []);
  return (
    <center>
      <div className="face__div" style={{position:"relative"}}>
      <div className="face__text">
        <h1 className="face__head">
          Hand Tattoo
        </h1>
        <p className="face__para">
          Move your hand in front of the camera and see the spider tattoo floating.
        </p>
        <img width="90%" style={{marginLeft:"-20px"}} src={tattoo} alt="ghost"></img>
      </div>
      <div className="face__canvas">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            right: "5vw",
            textAlign: "center",
            zindex: 9,
            marginTop:"8vw",
            width: w,
            height:"auto",
            borderRadius:"10%",
            border:"10px solid black"
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            right: "5vw",
            textAlign: "center",
            zindex: 9,
            marginTop:"8vw",
            width:w,
            height:"auto",
            borderRadius:"10%",
            border:"10px solid black"
          }}
        ></canvas>
        </div>
      </div>
    </center>
  );
}

export default App;