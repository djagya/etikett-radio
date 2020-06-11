import React, { Suspense } from 'react';
import { Color } from 'three';
import { Canvas } from 'react-three-fiber';
import Effects from './Effects/Effect';



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

        </Canvas>

    );

}
