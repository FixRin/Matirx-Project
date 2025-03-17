import { Canvas } from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";

import Shirt from "./Shirt";
import Backdrop from "./Backdrop";
import CameraRig from "./CameraRig";
import { three } from "maath";

const Index = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 0], fov:25 }}
      gl={{ shadowMap: { type: three.PCFSoftShadowMap } }}
      className={`w-full max-w-full    transition-all ease-in ${window.document.URL=='http://localhost:5173/customizer'?'Customizer':'Model'} `}
     
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