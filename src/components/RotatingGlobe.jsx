import React, { useRef } from "react";
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
  
  return <primitive ref={globeRef} object={scene} scale={1.2} />;
}

export default function RotatingGlobe() {
  return (
    <div
      className="relative rounded-2xl bg-black/30 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.6)] backdrop-blur-md"
      style={{
        width: "100%",
        height: "480px",
        overflow: "hidden",
        cursor: "grab", 
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 2, 2]} intensity={1.2} />

        {/* Globe model */}
        <GlobeModel />

        {/* OrbitControls configured for auto-spin with manual override and momentum */}
        <OrbitControls
          enableZoom={false} 
          enablePan={false}  
          rotateSpeed={0.8}  
          
          // CRITICAL: Damping allows momentum (inertia) to fade. Lower is less friction/slower fade.
          // The default is 0.05. Setting it lower (e.g., 0.01) gives a longer, slower fade effect.
          dampingFactor={0.02} 
          
          minPolarAngle={0}
          maxPolarAngle={Math.PI}
          
          // --- FIX for default auto-spin with drag momentum ---
          // 1. Enable continuous automatic spinning
          autoRotate={true} 
          // 2. Set the desired spin rate for the default spin
          // A positive value spins right (default). A negative value spins left.
          autoRotateSpeed={1.5} 
          
          // Controls must be enabled to allow manual drag rotation
          enabled={true} 
        />
      </Canvas>
    </div>
  );
}