import { useFrame } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import { useLocation, useRoute } from "wouter"
import Frame from "./Frame.jsx"
import { easing } from 'maath'
import * as THREE from 'three'



export default function Frames({ images, q = new THREE.Quaternion(), p = new THREE.Vector3() }) {
    const ref = useRef()
    const clicked = useRef()
    const [, params] = useRoute('/:id')
    const [, setLocation] = useLocation()
    const [zoom, setZoom] = useState(null)

    useEffect(() => {
        window.innerWidth <= 768 ? setZoom(2) : setZoom(1.25)
    }, [])

    useEffect(() => {
        clicked.current = ref.current.getObjectByName(params?.id)
        if (clicked.current) {
            let ratio = clicked.current.parent.ratio
            let landscape = clicked.current.parent.landscape
            clicked.current.parent.updateWorldMatrix(true, true)
            clicked.current.parent.localToWorld(p.set(0, landscape ? 0.5 : ratio / 2, zoom))
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
        // onPointerMissed={() => setLocation('/')}
        >
            {images.map((props) => <Frame key={props.url} {...props} /> /* prettier-ignore */)}
        </group>
    )
}
