import { Image, Plane, Text, useCursor } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import { useRoute } from "wouter"
import * as THREE from 'three'
import { motion } from "framer-motion-3d"
import { easing } from 'maath'


export default function Frame({ url, title, landscape, ratio, c = new THREE.Color(), ...props }) {
    const image = useRef()
    const frame = useRef()
    const [, params] = useRoute('/:id')
    const [hovered, hover] = useState(false)
    const [rnd] = useState(() => Math.random())
    const titleUrl = encodeURIComponent(title)
    const isActive = params?.id === titleUrl
    const [isMobile, setIsMobile] = useState(null)
    useCursor(hovered)
    useEffect(() => {
        window.innerWidth <= 768 ? setIsMobile(true) : setIsMobile(false)
    }, [])
    useFrame((state, dt) => {
        image.current.material.zoom = 2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2
        easing.damp3(image.current.scale, [0.85 * (!isActive && hovered ? 0.95 : 1), 0.9 * (!isActive && hovered ? 0.97 : 1), 1], 0.1, dt)
    })
    const variants = {
        hidden: {
            x: isMobile ? -0.25 : 0,
            y: isMobile ? landscape ? 1 : ratio : landscape ? 1 : ratio,
        },
        visible: {
            x: isMobile ? -0.25 : landscape ? ratio / 2 + 0.05 : 0.55,
            y: isMobile ? landscape ? 1.45 : ratio + 0.45 : landscape ? 1 : ratio,
        },
    }
    return (
        <group {...props} ratio={ratio} landscape={landscape}>
            <mesh
                name={titleUrl}
                onPointerOver={(e) => (e.stopPropagation(), hover(true))}
                onPointerOut={() => hover(false)}
                scale={landscape ? [ratio, 1, 0.05] : [1, ratio, 0.05]}
                position={landscape ? [0, 0.5, 0] : [0, ratio / 2, 0]}>
                <boxGeometry />
                <meshStandardMaterial color="#151515" metalness={0.5} roughness={0.5} envMapIntensity={2} />
                <mesh ref={frame} raycast={() => null} scale={[0.9, 0.93, 0.9]} position={[0, 0, 0.2]}>
                    <boxGeometry />
                    <meshBasicMaterial toneMapped={false} fog={false} />
                </mesh>
                <Image raycast={() => null} ref={image} position={[0, 0, 0.7]} url={url} />
            </mesh>
            <motion.group
                initial="hidden"
                animate={isActive ? "visible" : 'hidden'}
                variants={variants}
                transition={{
                    duration: 1,
                    delay: 0.5,
                    ease: [0, 0.5, 0.2, 1.01]
                }}
            >
                <group position={[0.03, -0.03, 0.01]}>
                    <Text raycast={() => null} maxWidth={0.4} anchorX="left" anchorY="top" position={[0, 0, 0]} fontSize={0.035}>
                        {title}
                    </Text>
                    <Text raycast={() => null} maxWidth={0.4} anchorX="left" anchorY="top" position={[0, -0.06, 0]} fontSize={0.025} lineHeight={1.5}>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
                    </Text>
                </group>

                <mesh position={[0.25, -0.2, 0]} raycast={() => null} >
                    <planeGeometry args={[0.5, 0.4]} />
                    <motion.meshBasicMaterial color={'#151515'} />
                </mesh>

            </motion.group>
        </group>
    )
}
