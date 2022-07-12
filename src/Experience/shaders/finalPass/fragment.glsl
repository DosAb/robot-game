#define PI 3.1415926535897932384626433832795

uniform sampler2D tDiffuse;
uniform float redMultiplier;
uniform float greenMultiplier;
uniform float blueMultiplier;
varying vec2 vUv;

float random2d(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

void main()
{
    vec2 uv = vUv;
    float distanceToCenter = length(vUv -0.8);

    uv.x += random2d(vUv) * (distanceToCenter * distanceToCenter ) * 0.002;
    uv.y += random2d(vUv) * (distanceToCenter * distanceToCenter ) * 0.002;

    //RGB shift


    float red = texture2D(tDiffuse, uv + 0.002).r;
    float green = texture2D(tDiffuse, uv).g;
    float blue = texture2D(tDiffuse, uv - 0.002).b;
    
    // vec3 color = vec3(red * redMultiplier, green * greenMultiplier, blue * blueMultiplier);
    vec3 color = vec3(red, green, blue);
    gl_FragColor = vec4(color, 1.0);
}