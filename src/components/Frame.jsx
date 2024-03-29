import { Image, Plane, Text, useCursor, useVideoTexture } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import React, { useEffect, useRef, useState } from "react"
import { useRoute } from "wouter"
import * as THREE from 'three'
import { motion } from "framer-motion-3d"
import { easing } from 'maath'


export default function Frame({ url, title, video, landscape, ratio, c = new THREE.Color(), ...props }) {
    const imageRef = useRef()
    const videoRef = useRef()
    const frame = useRef()
    const [, params] = useRoute('/:id')
    const [hovered, hover] = useState(false)
    const [rnd] = useState(() => Math.random())
    const titleUrl = encodeURIComponent(title)
    const isActive = params?.id === titleUrl
    const [isMobile, setIsMobile] = useState(null)
    const [animationState, setAnimationState] = useState('hidden');

    useCursor(hovered)
    useEffect(() => {
        window.innerWidth <= 768 ? setIsMobile(true) : setIsMobile(false)
    }, [])
    useFrame((state, dt) => {
        if (!video) {
            imageRef.current.material.zoom = 2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2
            easing.damp3(imageRef.current.scale, [0.85 * (!isActive && hovered ? 0.95 : 1), 0.9 * (!isActive && hovered ? 0.97 : 1), 1], 0.1, dt)
        } else {
            videoRef.current.material.zoom = 2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2
            easing.damp3(videoRef.current.scale, [0.88 * (!isActive && hovered ? 0.94 : 1), 0.9 * (!isActive && hovered ? 0.94 : 1), 1], 0.1, dt)
        }
    })

    useEffect(() => {
        isActive ? setAnimationState("visible") : setAnimationState('hidden')
    }, [isActive])

    const variants = {
        hidden: {
            x: isMobile ? -0.25 : 0,
            y: isMobile ? landscape ? 1 : ratio : landscape ? 1 : ratio,
            z: 0,
            transition: {
                duration: 1,
                delay: 0,
                ease: [0, 0.5, 0.2, 1.01]
            }
        },
        visible: {
            x: isMobile ? -0.25 : landscape ? ratio / 2 + 0.05 : 0.55,
            y: isMobile ? landscape ? 1.45 : ratio + 0.45 : landscape ? 1 : ratio,
            z: 0,
            transition: {
                duration: 1,
                delay: 0,
                ease: [0, 0.5, 0.2, 1.01]
            }
        },
        infront: {
            x: -0.25,
            y: landscape ? ratio / 2 : ratio - 0.75,
            z: 0.8,
            transition: {
                duration: 1,
                delay: 0,
                ease: [0, 0.5, 0.2, 1.01]
            }
        }
    }
    const handleClick = (e) => {
        e.stopPropagation()
        isMobile && setAnimationState(anim => anim == 'visible' ? 'infront' : 'visible')
    }
    return (
        <group {...props} ratio={ratio} landscape={landscape}>
            <mesh
                // visible={false}
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
                {video ?
                    <Video videoRef={videoRef} src={url} position={[0, 0, 0.7]} /> :
                    <Image raycast={() => null} ref={imageRef} position={[0, 0, 0.7]} url={url} />}
            </mesh>

            <motion.group
                initial="hidden"
                animate={animationState}
                variants={variants}
                onClick={handleClick}
            >
                <group position={[0.03, -0.03, 0.01]}>
                    <Text onClick={handleClick} maxWidth={0.4} anchorX="left" anchorY="top" position={[0, 0, 0]} fontSize={0.035}>
                        {title}
                    </Text>
                    <Text onClick={handleClick} maxWidth={0.4} anchorX="left" anchorY="top" position={[0, -0.06, 0]} fontSize={0.025} lineHeight={1.5}>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
                    </Text>
                </group>

                <mesh position={[0.25, -0.2, 0]} onClick={handleClick}>
                    <planeGeometry args={[0.5, 0.4]} />
                    <motion.meshBasicMaterial color={'#151515'} />
                </mesh>

            </motion.group>
        </group>
    )
}

const VideoMaterial = ({ src }) => {
    const texture = useVideoTexture(src)
    return <meshBasicMaterial map={texture} toneMapped={false} />
}

const Video = ({ position, src, scale, videoRef }) => {
    return (
        <mesh raycast={() => null} position={position} scale={scale} ref={videoRef}>
            <planeGeometry />
            <React.Suspense fallback={<meshBasicMaterial wireframe />}>
                <VideoMaterial src={src} />
            </React.Suspense>
        </mesh>
    )
}