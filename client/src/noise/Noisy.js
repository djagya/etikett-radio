import React, { useMemo, Suspense, useRef } from 'react';
import { Color } from 'three';
import { Canvas, useThree, useFrame } from 'react-three-fiber';
import { useGesture } from "react-use-gesture"
import { useSpring, a } from "react-spring/three"
import Effects from './Effects/Effect';





function Dodecahedron() {

    const { size, viewport } = useThree()
    const aspect = size.width / viewport.width
    const [spring, set] = useSpring(() => ({
        scale: [15, 15, 15],
        position: [0, 0, 0],
        rotation: [5, 5, 5],
        config: { mass: 5, friction: 80, tension: 1000 }
    }))


    const bind = useGesture(
        {
            onDrag: ({ offset: [x, y], vxvy: [vx, vy], down, ...props }) => set({ position: [x / aspect, -y / aspect, 0], rotation: [y / aspect, x / aspect, 5] }),
            onHover: ({ hovering }) => set({ scale: hovering ? [5, 5, 5] : [10, 10, 10] })
        },
        {
            eventOptions: { pointer: true }
        }
    )
    return (
        <a.mesh {...spring} {...bind()} >
            <dodecahedronBufferGeometry attach="geometry" args={[4, 0]} />
            <meshNormalMaterial attach="material" />
        </a.mesh>
    )
}

export default function App() {
    return (


        <Canvas
            camera={{ fov: 80, far: 1000, position: [0, 0, 100] }}
            onCreated={({ gl }) => {
                gl.setClearColor(new Color('#050505'));
            }}
        >
            {
                <Suspense fallback={null}>
                    <Effects />
                </Suspense>
            }


            <mesh >
                <planeBufferGeometry attach="geometry" args={[500, 1500]} />
                <meshPhongMaterial attach="material" color="#272727" />
            </mesh>
            <Dodecahedron />

        </Canvas>

    );

}
