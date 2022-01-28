
PIXI.filters.MyFilter = class extends PIXI.Filter {
    constructor() {
      var fragmentSrc = `
        precision mediump float;
        varying vec2 vTextureCoord;
        uniform sampler2D uSampler;
        varying vec4 vColor;
  
        uniform float time;
        
        #define R_LUMINANCE 0.298912
        #define G_LUMINANCE 0.586611
        #define B_LUMINANCE 0.114478
        const vec3 monochromeScale = vec3(R_LUMINANCE, G_LUMINANCE, B_LUMINANCE);
        #define DIVIDE_NUM 4.0

        void main(void) {
         vec2 uv = vTextureCoord;
         uv = floor(uv * 128.0) / 128.0;
         vec4 color = texture2D(uSampler, uv);
         float grayColor = dot(color.rgb, monochromeScale) * 0.9 + 0.1;
         grayColor = floor(grayColor * DIVIDE_NUM ) / DIVIDE_NUM;
         gl_FragColor = vec4(0.823 * grayColor, 0.843 * grayColor, 0.219 * grayColor, 1.0);
        }
      `;
  
      super(
        null, // vertex shader
        fragmentSrc, // fragment shader
        {} // uniforms
      );
    }
  };