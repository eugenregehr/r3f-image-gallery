import { Image, Text, useCursor } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef, useState } from "react"
import { useRoute } from "wouter"
import * as THREE from 'three'
import { easing } from 'maath'


export default function Frame({ url, title, landscape, ratio, c = new THREE.Color(), ...props }) {
    const image = useRef()
    const frame = useRef()
    const [, params] = useRoute('/:id')
    const [hovered, hover] = useState(false)
    const [rnd] = useState(() => Math.random())
    const isActive = params?.id === title
    useCursor(hovered)
    useFrame((state, dt) => {
        image.current.material.zoom = 2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2
        easing.damp3(image.current.scale, [0.85 * (!isActive && hovered ? 0.95 : 1), 0.9 * (!isActive && hovered ? 0.97 : 1), 1], 0.1, dt)
    })
    return (
        <group {...props} ratio={ratio} landscape={landscape}>
            <mesh
                name={title}
                onPointerOver={(e) => (e.stopPropagation(), hover(true))}
                onPointerOut={() => hover(false)}
                scale={landscape ? [ratio, 1, 0.05] :  [1, ratio, 0.05]}
                position={landscape ? [0, 0.5, 0] : [0, ratio / 2, 0]}>
                <boxGeometry />
                <meshStandardMaterial color="#151515" metalness={0.5} roughness={0.5} envMapIntensity={2} />
                <mesh ref={frame} raycast={() => null} scale={[0.9, 0.93, 0.9]} position={[0, 0, 0.2]}>
                    <boxGeometry />
                    <meshBasicMaterial toneMapped={false} fog={false} />
                </mesh>
                <Image raycast={() => null} ref={image} position={[0, 0, 0.7]} url={url} />
            </mesh>
            <Text maxWidth={0.1} anchorX="left" anchorY="top" position={landscape ? [ratio / 2 + 0.05, 1, 0] : [0.55, ratio, 0] } fontSize={0.025}>
                {title}
            </Text>
        </group>
    )
}
