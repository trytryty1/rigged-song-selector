import { createRoot } from "react-dom/client";
import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

export default function Box(props) {
  const mesh = useRef();

  useEffect(() => {
    setInterval(() => {
      if (!mesh.current) return;
      mesh.current.rotation.x += 0.01;
      mesh.current.rotation.y += 0.01;
    }, 100);
  }, []);

  // Return view, these are regular three.js elements expressed in JSX
  return (
    <>
      <iframe
        pointerEvents="none"
        className="pointer-events-none"
        title="Disco ball animated"
        allow="autoplay"
        className="w-screen h-screen fixed -z-10"
        autoplay
        src="https://sketchfab.com/models/b949297d4ecb48a89ea3544621c999c9/embed?autostart=1&dnt=1"
      ></iframe>
    </>
  );
}
