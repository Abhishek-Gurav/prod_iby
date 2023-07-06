import * as cam from "@mediapipe/camera_utils";
import * as Facemesh from "@mediapipe/face_mesh";
import { FaceMesh } from "@mediapipe/face_mesh";
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import lipstick from "../Images/Lipstick.png";
function Lips() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [windowDimention, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  });
  const [isTab, setTab] = React.useState(false);
  function onResults(results) {
    var img = new Image();
    img.src = "https://www.svgrepo.com/show/62101/sword.svg";
    //   var k = img.width
    //   var l = img.height
    //   var ratio = k/l;
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
    function fillPolygon(points, color) {
      if (points.length > 0) {
        canvasCtx.fillStyle = color; // all css colors are accepted by this property

        var point = points[0];

        canvasCtx.beginPath();
        canvasCtx.moveTo(point.X + 7, point.Y); // point 1

        for (var i = 1; i < points.length; ++i) {
          point = points[i];

          canvasCtx.lineTo(point.X + 7, point.Y);
        }
        canvasCtx.closePath(); // go back to point 1
        canvasCtx.fill();
      }
    }

    if (results.multiFaceLandmarks) {
      for (const landmarks of results.multiFaceLandmarks) {
        const points = [];
        // console.log(Facemesh.FACEMESH_LEFT_EYE);
        for (const a of Facemesh.FACEMESH_LIPS) {
          points.push({
            X: landmarks[a[0]].x * videoWidth,
            Y: landmarks[a[1]].y * videoHeight,
          });
        }
        fillPolygon(points, "#9f1f19");
      }
    }
    canvasCtx.restore();
  }
  useEffect(() => {
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
        <h1 className="face__head">Lipstick</h1>
        <p className="face__para">
          Try on different shades of Lipstick on your face.
        </p>
        <img
          width="90%"
          style={{ marginLeft: "-20px" }}
          src={lipstick}
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
            marginTop: "10vh",
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
            marginTop: "10vh",
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

export default Lips;
