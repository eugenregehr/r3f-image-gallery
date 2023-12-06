import { Text } from "@react-three/drei";
import { useEffect, useState } from "react";

export default function Welcome() {
    const [isMobile, setIsMobile] = useState(null)
    useEffect(() => {
        window.innerWidth <= 768 ? setIsMobile(true) : setIsMobile(false)
    }, [])
    return (
        <Text color={'#eeeeee'} maxWidth={5} anchorX="center" anchorY="center" position={[0, isMobile ? 1.5 : 0.16, isMobile ? 4.3 : 4.7]} fontSize={isMobile ? 0.14 : 0.2}>
            ART GALLERY
        </Text>
    )
}