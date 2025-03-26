
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";

const FlyingClothes = () => {
  const clothesRef = useRef();
  useFrame(() => {
    if (clothesRef.current) {
      clothesRef.current.position.y += 0.02;
      clothesRef.current.rotation.x += 0.02;
      clothesRef.current.rotation.y += 0.02;
    }
  });
  return (
    <mesh ref={clothesRef} position={[0, 0, 0]}>
      <planeGeometry args={[0.3, 0.3]} />
      <meshStandardMaterial color="pink" />
    </mesh>
  );
};

const AnimeGirl = ({ onOpenHand }) => {
  const girlRef = useRef();
  const [handOpened, setHandOpened] = useState(false);

  useFrame(() => {
    if (girlRef.current) {
      girlRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={girlRef} position={[0, -1, 0]}>
      <mesh onClick={() => { setHandOpened(true); onOpenHand(); }}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="white" />
      </mesh>
      {handOpened && <FlyingClothes />}
    </group>
  );
};

const NamePopup = () => {
  return (
    <Html position={[0, 1, 0]}>
      <div style={{ fontSize: "2em", fontWeight: "bold", color: "white" }}>
        Jush
      </div>
    </Html>
  );
};

const Portfolio = () => {
  const [showName, setShowName] = useState(false);

  return (
    <Canvas>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <AnimeGirl onOpenHand={() => setShowName(true)} />
      {showName && <NamePopup />}
    </Canvas>
  );
};

export default Portfolio;
