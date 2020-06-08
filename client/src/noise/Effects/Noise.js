import {
    ShaderMaterial,
    UniformsUtils
} from 'three';
import {
    Pass
} from 'three/examples/jsm/postprocessing/Pass';

var TestShader = {
    uniforms: {
        tDiffuse: {
            type: 't',
            value: null
        },
        time: {
            type: 'f',
            value: 0.0
        },
        amount: {
            type: 'f',
            value: 0.005
        },
        color: {
            value: 0.0
        },
    },

    vertexShader: `
    varying vec2 vUv;
    void main(){  
      vUv = uv; 
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }`,

    fragmentShader: `
    #include <common>
    uniform sampler2D tDiffuse;
    uniform float time;
    uniform float amount;
    uniform bool color;
    varying vec2 vUv;

    void main() {
      vec4 cTextureScreen = texture2D( tDiffuse, vUv );

      float timeLoop = mod( time, 0.80 );

      
      float r = clamp(rand( vUv + timeLoop + 1.0 ) / ( 0.80 / ( amount * 2.0 ) ) - amount, 0.0, 1.0 );
      float g = clamp(rand( vUv + timeLoop + 1.0 ) / ( 1.0 / ( amount * 2.0 ) ) - amount, 0.0, 1.0 );
      float b = clamp(rand( vUv + timeLoop + 0.80 ) / ( 6.0 / ( amount * 2.0 ) ) - amount, 0.0, 1.0 );

      vec3 cResult = vec3( 
        clamp( cTextureScreen.r + r, 0.0, 1.0), 
        clamp( cTextureScreen.g + r, 0.0, 2.0), 
        clamp( cTextureScreen.b + r, 0.0, 2.0)
      );

      if(color) {
        cResult = vec3( 
          clamp( cTextureScreen.r + r, 0.0, 1.0), 
          clamp( cTextureScreen.g + g, 0.0, 1.0), 
          clamp( cTextureScreen.b + b, 0.0, 1.0)
        );
      }

      gl_FragColor = vec4( cResult, cTextureScreen.a );
    }
    `,
};

var NoisePass = function (amount, color) {
    Pass.call(this);

    var shader = TestShader;

    this.uniforms = UniformsUtils.clone(shader.uniforms);

    this.material = new ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: shader.vertexShader,
        fragmentShader: shader.fragmentShader,
    });

    if (amount !== undefined) this.uniforms.amount.value = amount;
    if (color !== undefined) this.uniforms.color.value = color;

    this.fsQuad = new Pass.FullScreenQuad(this.material);
};

NoisePass.prototype = Object.assign(Object.create(Pass.prototype), {
    constructor: NoisePass,

    render: function (renderer, writeBuffer, readBuffer, deltaTime) {
        this.uniforms['tDiffuse'].value = readBuffer.texture;
        this.uniforms['time'].value += deltaTime;

        if (this.renderToScreen) {
            renderer.setRenderTarget(null);
            this.fsQuad.render(renderer);
        } else {
            renderer.setRenderTarget(writeBuffer);
            if (this.clear) renderer.clear();
            this.fsQuad.render(renderer);
        }
    },
});

export {
    NoisePass
};
