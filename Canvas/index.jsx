import { Canvas } from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";

import Shirt from "./Shirt";
import Backdrop from "./Backdrop";
import CameraRig from "./CameraRig";
import { three } from "maath";
import { useLocation } from "react-router-dom";

const Index = () => {
  const location = useLocation();
  console.log(location);
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 0], fov: 25 }}
      gl={{ shadowMap: { type: three.PCFSoftShadowMap } }}
      className={`w-full max-w-full    transition-all ease-in ${
        location.pathname === "/customizer"
          ? "Customizer"
          : location.pathname.includes("/product/") 
          ? "Store"
          : "Model"
      }`}
    >
      <ambientLight intensity={0.5} />
      <Environment preset="city" />

      <CameraRig>
        <Backdrop />
        <Center>
          <Shirt />
        </Center>
      </CameraRig>
    </Canvas>
  );
};

export default Index;
