import { useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { useLocation, useRoute } from "wouter"
import Frame from "./Frame.jsx"
import { easing } from 'maath'
import * as THREE from 'three'



export default function Frames({ images, q = new THREE.Quaternion(), p = new THREE.Vector3() }) {
    const ref = useRef()
    const clicked = useRef()
    const [, params] = useRoute('/:id')
    const [, setLocation] = useLocation()
    useEffect(() => {
        clicked.current = ref.current.getObjectByName(params?.id)
        if (clicked.current) {
            console.log(clicked.current.parent.ratio)
            let ratio = clicked.current.parent.ratio
            clicked.current.parent.updateWorldMatrix(true, true)
            clicked.current.parent.localToWorld(p.set(0, ratio / 2, 1.25))
            clicked.current.parent.getWorldQuaternion(q)
        } else {
            p.set(0, 0, 6)
            q.identity()
        }
    })
    useFrame((state, dt) => {
        easing.damp3(state.camera.position, p, 0.4, dt)
        easing.dampQ(state.camera.quaternion, q, 0.4, dt)
    })
    return (
        <group
            ref={ref}
            onClick={(e) => (e.stopPropagation(), setLocation(clicked.current === e.object ? '/' : '/' + e.object.name))}
            onPointerMissed={() => setLocation('/')}>
            {images.map((props) => <Frame key={props.url} {...props} /> /* prettier-ignore */)}
        </group>
    )
}