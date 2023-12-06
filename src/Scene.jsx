import { Canvas } from '@react-three/fiber'
import { MeshReflectorMaterial, Environment, OrbitControls } from '@react-three/drei'
import Frames from './components/Frames.jsx'
import Welcome from './components/Welcome.jsx'

export default function Scene({ images }) {

  return (
    <Canvas dpr={[1, 1.5]} camera={{ fov: 70, position: [0, 2, 15] }}>
      <color attach="background" args={['#222222']} />
      <fog attach="fog" args={['#222222', 0, 15]} />
      <group position={[0, -0.5, 0]}>
        <Welcome />
        <Frames images={images} />
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={2048}
            mixBlur={1}
            mixStrength={80}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#050505"
            metalness={0.5}
          />
        </mesh>
        {/* <OrbitControls /> */}
      </group>
      <Environment preset="city" />
    </Canvas>
  )
}

