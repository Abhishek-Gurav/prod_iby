import { FaceMesh } from "@mediapipe/face_mesh";
import React, { useRef, useEffect } from "react";
import * as Facemesh from "@mediapipe/face_mesh";
import * as cam from "@mediapipe/camera_utils";   
import Webcam from "react-webcam";
import { isTablet } from "react-device-detect";
import lipstick from "../Images/Lipstick.png";
function Lips() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  var connect =  window.drawConnectors;
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
          canvasCtx.moveTo(point.X+7, point.Y);   // point 1

          for (var i = 1; i < points.length; ++i) {
              point = points[i];

              canvasCtx.lineTo(point.X+7, point.Y);
          }
          canvasCtx.closePath();      // go back to point 1
          canvasCtx.fill();
      }
  }

    if (results.multiFaceLandmarks) {
      for (const landmarks of results.multiFaceLandmarks) {
        const points = [];
        // console.log(Facemesh.FACEMESH_LEFT_EYE);
        for(const a of Facemesh.FACEMESH_LIPS){
          points.push({X: landmarks[a[0]].x * videoWidth, Y: landmarks[a[1]].y * videoHeight});
        }
        fillPolygon(points, "#9f1f19");
      }
    }
    canvasCtx.restore();
  }
  const w = isTablet ? "70vw" : "45vw";
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
  return (
    <center>
      <div className="face__div" style={{position:"relative"}}>
      <div className="face__text">
        <h1 className="face__head">
          Lipstick
        </h1>
        <p className="face__para">
          Try on different shades of Lipstick on your face.
        </p>
        <img width="90%" style={{marginLeft:"-20px"}} src={lipstick} alt="ghost"></img>
      </div>
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
            width: w,
            height:"auto",
            borderRadius:"10%",
            border:"10px solid black"
          }}
        ></canvas>
      </div>
    </center>
  );
}

export default Lips;