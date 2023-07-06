import * as cam from "@mediapipe/camera_utils";
import * as Facemesh from "@mediapipe/face_mesh";
import { FaceMesh } from "@mediapipe/face_mesh";
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import ghostMask from "../Images/Ghostmask.png";
import "./facemask.css";

// import canvasContext from "canvas-context";
function Facemask() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [windowDimention, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  });
  const [isTab, setTab] = React.useState(false);
  var connect = window.drawConnectors;
  function onResults(results) {
    var img = new Image();
    img.src = "https://www.svgrepo.com/show/62101/sword.svg";
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

    if (results.multiFaceLandmarks) {
      for (const landmarks of results.multiFaceLandmarks) {
        connect(canvasCtx, landmarks, Facemesh.FACEMESH_TESSELATION, {
          color: "black",
          lineWidth: 15,
        });
        connect(canvasCtx, landmarks, Facemesh.FACEMESH_RIGHT_EYE, {
          color: "#30FF30",
          lineWidth: 2,
        });
        connect(canvasCtx, landmarks, Facemesh.FACEMESH_RIGHT_EYEBROW, {
          color: "red",
          lineWidth: 2,
        });
        connect(canvasCtx, landmarks, Facemesh.FACEMESH_LEFT_EYE, {
          color: "#30FF30",
          lineWidth: 2,
        });
        connect(canvasCtx, landmarks, Facemesh.FACEMESH_LEFT_EYEBROW, {
          color: "red",
          lineWidth: 2,
        });
        connect(canvasCtx, landmarks, Facemesh.FACEMESH_FACE_OVAL, {
          color: "aqua",
          lineWidth: 2,
        });
      }
    }
    canvasCtx.restore();
  }
  useEffect(() => {
    // console.log(isTablet);
    // Face mesh
    const faceMesh = new FaceMesh({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
      },
    });

    faceMesh.setOptions({
      maxNumFaces: 4,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
      refineLandmarks: true,
    });

    faceMesh.onResults(onResults);

    // face mesh end
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null
    ) {
      var camera = new cam.Camera(webcamRef.current.video, {
        onFrame: async () => {
          await faceMesh.send({ image: webcamRef.current.video });
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

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowDimention]);

  return (
    <div
      className="d-flex flex-wrap face__div"
      style={{
        position: "relative",
        justifyContent: "space-around",
      }}
    >
      <div className="face__text">
        <h1 className="face__head">Ghost Mask</h1>
        <p className="face__para">
          Have fun with friends by adding ghost mask to your face and take
          snaps.
          <br></br>
          (Wait for some time to load the model)
        </p>
        <img
          width="100%"
          style={{ marginLeft: "-20px", marginTop: "-20px" }}
          src={ghostMask}
          alt="ghost"
        ></img>
      </div>
      <div
        className="face__canvas"
        style={{
          position: "relative",
        }}
      >
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

export default Facemask;
