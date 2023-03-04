import { MeshBasicMaterial, MeshBasicMaterialParameters, Shader, Vector3, Vector4 } from "three";

export class BackgroundMaterial extends MeshBasicMaterial {
  private shader: Shader | undefined;

  borderRadius = new Vector4(0, 0, 0, 0);
  borderColor = new Vector3(0, 0, 0);
  borderSize = new Vector4(0, 0, 0, 0);
  public _borderOpacity = 1;
  public _ratio = 1;

  set borderOpacity(value: number) {
    this._borderOpacity = value;
    if (this.shader != null) {
      this.shader.uniforms.borderOpacity.value = value;
    }
  }

  get borderOpacity(): number {
    return this._borderOpacity;
  }
  set ratio(value: number) {
    this._ratio = value;
    if (this.shader != null) {
      this.shader.uniforms.ratio.value = value;
    }
  }

  get ratio(): number {
    return this._ratio;
  }

  constructor(params: MeshBasicMaterialParameters | undefined) {
    super(params);

    this.onBeforeCompile = (shader) => {
      this.shader = shader;
      shader.uniforms.borderRadius = { value: this.borderRadius }; //top-left, top-right, bottom-right, bottom-left
      shader.uniforms.borderColor = { value: this.borderColor };
      shader.uniforms.borderOpacity = { value: this.borderOpacity };
      shader.uniforms.borderSize = { value: this.borderSize }; //top, right, bottom, left
      shader.uniforms.ratio = { value: this.ratio };

      shader.vertexShader = `#define USE_UV\n` + shader.vertexShader;
      shader.fragmentShader =
        `#define USE_UV
                uniform float ratio;
                uniform float borderOpacity;
                uniform vec3 borderColor;
                uniform vec4 borderSize;
            uniform vec4 borderRadius;
            float min4 (vec4 v) {
                return min(min(min(v.x,v.y),v.z),v.w);
            }
            vec2 radiusDistance(float radius, vec2 outside, vec2 border) {
                vec2 radiusXX = vec2(radius, radius);
                return vec2(
                    radius - distance(outside, radiusXX),
                    radius - distance(border, radiusXX)
                );
            }
            ` + shader.fragmentShader;
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <clipping_planes_fragment>",
        `vec4 v_outsideDistance = vec4(1.0 - vUv.y, (1.0 - vUv.x) * ratio, vUv.y, vUv.x * ratio);
                vec4 v_borderDistance = v_outsideDistance - borderSize;

                vec2 dist = vec2(min4(v_outsideDistance), min4(v_borderDistance));

                if(all(lessThan(v_outsideDistance.xw, borderRadius.xx))) {
                    dist = radiusDistance(borderRadius.x, v_outsideDistance.xw, v_borderDistance.xw);

                } else if(all(lessThan(v_outsideDistance.xy, borderRadius.yy))) {
                    dist = radiusDistance(borderRadius.y, v_outsideDistance.xy, v_borderDistance.xy);

                } else if(all(lessThan(v_outsideDistance.zy, borderRadius.zz))) {
                    dist = radiusDistance(borderRadius.z, v_outsideDistance.zy, v_borderDistance.zy);

                } else if(all(lessThan(v_outsideDistance.zw, borderRadius.ww))) {
                    dist = radiusDistance(borderRadius.w, v_outsideDistance.zw, v_borderDistance.zw);
                }

                if(dist.x < 0.0) {
                    discard;
                }

                #include <clipping_planes_fragment>`,
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <color_fragment>",
        `#include <color_fragment>
                
                if(dist.y < 0.0) {
                    diffuseColor.rgb = borderColor;
                    diffuseColor.a = borderOpacity;
                }
                
                if(diffuseColor.a <= 0.0001) {
                    discard;
                }
            `,
      );
    };
  }
}
