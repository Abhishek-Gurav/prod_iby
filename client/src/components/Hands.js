import * as cam from "@mediapipe/camera_utils";
import { Hands } from "@mediapipe/hands";
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import tattoo from "../Images/Tattoo.png";
import "./facemask.css";
function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [windowDimention, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  });
  const [isTab, setTab] = React.useState(false);
  // var connect = window.drawConnectors;
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
      img.src =
        "https://www.onlygfx.com/wp-content/uploads/2022/04/spider-and-web-tattoo-2611.svg";
      // console.log(results.multiHandLandmarks.x);
      for (const landmarks of results.multiHandLandmarks) {
        var l = 0;
        var k = 0;
        for (const landmark of landmarks) {
          l += landmark.x;
          k += landmark.y;
        }
        l = l / landmarks.length;
        k = k / landmarks.length;
        canvasCtx.drawImage(
          img,
          Math.round(l * 640) - 50,
          Math.round(k * 480),
          100,
          100
        );
        // canvasCtx.drawImage(img, Math.round(((landmarks[5].x))*640)-150, Math.round((landmarks[5].y)*480)-150,100, 100);

        // console.log(landmarks);
      }
    }
    canvasCtx.restore();
  }
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
      minTrackingConfidence: 0.5,
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
  useEffect(() => {
    const handleResize = () => {
      detectHW({
        winWidth: window.innerWidth,
        winHeight: window.innerHeight,
      });
    };
    if (windowDimention.winWidth < 992) {
      setTab(true);
    } else {
      setTab(false);
    }
    console.log(windowDimention.winWidth);
    console.log(isTab);
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowDimention]);
  return (
      <div className="d-flex flex-wrap face__div" style={{ 
        position: "relative",
        justifyContent: "space-around",
        }}>
        <div className="face__text">
          <h1 className="face__head">Hand Tattoo</h1>
          <p className="face__para">
            Move your hand in front of the camera and see the spider tattoo
            floating.
          </p>
          <img
            width="90%"
            style={{ marginLeft: "-20px" }}
            src={tattoo}
            alt="tatoo"
          ></img>
        </div>
        <div className="face__canvas" style={{
          position : "relative",

        }}>
          <Webcam
            ref={webcamRef}
            style={{
              position: "relative",
              marginLeft: "auto",
              marginRight: "auto",
              textAlign: "center",
              zindex: 9,
              marginTop: isTab ? "5vh" : "10vh",
              width: isTab ? "80vw" : "45vw",
              height: "auto",
              borderRadius: "10%",
              border: "10px solid black",
            }}
          />
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              right: isTab ? "0vw" : "0vw",
              textAlign: "center",
              zindex: 9,
              marginTop: isTab ? "5vh" : "10vh",
              width: isTab ? "80vw" : "45vw",
              height: "auto",
              borderRadius: "10%",
              border: "10px solid black",
            }}
          ></canvas>
        </div>
      </div>
  );
}

export default App;
