uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uOffest;
uniform float uMultiplier;

varying vec2 vUv;

void main()
{
  float mixStrength = length(vUv - 0.5);
  mixStrength += uOffest;
  mixStrength *= uMultiplier;

  vec3 color = mix(uColorA, uColorB, mixStrength);
  gl_FragColor = vec4(color, 1.0);
}