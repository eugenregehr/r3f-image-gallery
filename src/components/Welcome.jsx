import { Text } from "@react-three/drei";
import * as THREE from 'three'

export default function Welcome() {
    return (
        <Text color={'#eeeeee'} maxWidth={5} anchorX="center" anchorY="center" position={[0, 0.16, 4.7]} fontSize={0.2}>
            ART GALLERY
        </Text> 
    )
}