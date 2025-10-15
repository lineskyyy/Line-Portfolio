import React, { useRef } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

// The GlobeModel component loads the model and sets its initial scale.
function GlobeModel() {
  const { scene } = useGLTF("/models/globe.glb");
  const globeRef = useRef();

  // Set an initial rotation for a better starting view.
  if (globeRef.current) {
    globeRef.current.rotation.y = Math.PI / 4;
    globeRef.current.rotation.x = Math.PI / 8;
  }

  return <primitive ref={globeRef} object={scene} scale={1} />;
}

export default function RotatingGlobe() {
  const { theme } = useTheme()
  return (
    <div
      className={`relative rounded-2xl backdrop-blur-md overflow-hidden ${
        theme === "light"
          ? "bg-white/70 border border-border shadow-sm"
          : "bg-black/30 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.6)]"
      }`}
      style={{ width: "100%", height: "480px", cursor: "grab" }}
    >
      {/* FIX: 
        1. Set position to 'absolute' so it floats above the canvas.
        2. Use 'bottom-4' (or 'inset-x-0 bottom-4' if using Tailwind) to place it at the bottom.
        3. Use 'z-10' to ensure it renders on top of the Canvas (which is the default z-index).
      */}
      <p
        className={`absolute w-full text-sm text-center z-10 ${
          theme === "light" ? "text-muted-foreground" : "text-gray-400"
        }`}
        style={{ bottom: "1rem" }}
      >
        hold and drag to spin in any direction
      </p>

      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 2, 2]} intensity={1.2} />

        {/* Globe model */}
        <GlobeModel />

        {/* OrbitControls configured for auto-spin with manual override and momentum */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.8}
          dampingFactor={0.02}
          minPolarAngle={0}
          maxPolarAngle={Math.PI}
          autoRotate={true}
          autoRotateSpeed={1.5}
          enabled={true}
        />
      </Canvas>
      
    </div>
  );
}
