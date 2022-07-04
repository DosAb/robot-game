float uElevation = 2.0;
float uElevationValleyFrequency = 1.5;
float uElevationValley = 0.5;
float uElevationGeneral = 0.2;
float uElevationGeneralFrequency = 0.2;
float uElevationDetails = 0.2;
float uElevationDetailsFrequency = 2.012;

#pragma glslify: perlin2d = require('../partials/perlin2d.glsl')

float getElevation(vec2 _position)
{
    float elevation = 0.0;

    // Valley
    float valleyStrength = cos(_position.x * uElevationValleyFrequency + 3.1415) * 0.5 + 0.5;
    elevation += valleyStrength * uElevationValley;

    // General elevation
    elevation += perlin2d(_position * uElevationGeneralFrequency) * uElevationGeneral * (valleyStrength + 0.1);
    
    // Smaller details
    elevation += perlin2d(_position * uElevationDetailsFrequency + 123.0) * uElevationDetails * (valleyStrength + 0.1);

    elevation *= uElevation;

    return elevation;
}

#pragma glslify: export(getElevation)