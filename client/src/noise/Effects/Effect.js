import React, { useRef, useEffect } from 'react';
import { useFrame, useThree, extend } from 'react-three-fiber';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { NoisePass } from './Noise';


extend({
    EffectComposer,
    RenderPass,
    NoisePass
});

export default function Effects() {
    const composer = useRef();
    const { scene, gl, size, camera } = useThree();
    // const aspect = useMemo(() => new Vector2(size.width, size.height), [size]);
    useEffect(() => void composer.current.setSize(size.width, size.height), [
        size,
    ]);
    useFrame(() => composer.current.render(), 1);


    return (
        <effectComposer ref={composer} args={[gl]}>
            <renderPass attachArray="passes" scene={scene} camera={camera} />
            <noisePass attachArray="passes" args={[0.08]} />
        </effectComposer>
    );
}
