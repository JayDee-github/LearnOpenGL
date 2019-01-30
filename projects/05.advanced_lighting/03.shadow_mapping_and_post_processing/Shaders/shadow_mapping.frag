#version 330 core
out vec4 FragColor;

in VS_OUT {
    vec3 FragPos;
    vec3 Normal;
    vec2 TexCoords;
    vec4 FragPosLightSpace;
} fs_in;

uniform sampler2D diffuseTexture;
uniform sampler2D depthMap;

uniform vec3 lightPos;
uniform vec3 viewPos;

uniform bool hasShadows;
uniform bool hasShadowBias;
uniform bool usePCF;

float ShadowCalculation(vec4 fragPosLightSpace, vec3 lightDir, vec3 normal)
{
    // perform perspective divide
    vec3 projCoords = fragPosLightSpace.xyz / fragPosLightSpace.w;
    // Transform to [0,1] range
    projCoords = projCoords * 0.5 + 0.5;
    // Get closest depth value from light's perspective (using [0,1] range fragPosLight as coords)
    float closestDepth = texture(depthMap, projCoords.xy).r; 
    // Get depth of current fragment from light's perspective
    float currentDepth = projCoords.z;
    // Check whether current frag pos is in shadow

    //float bias = max(0.05 * (1.0 - dot(normal, lightDir)), 0.005);  

    float bias = 0.05;


    float shadow = 0.0;
    if (hasShadows && hasShadowBias && !usePCF)
    {
        bias = 0.05;
        shadow = currentDepth - bias > closestDepth  ? 1.0 : 0.0;
    }
    else if (hasShadows && hasShadowBias && usePCF)
    {
        vec2 texelSize = 1.0 / textureSize(depthMap, 0);
        for(int x = -1; x <= 1; ++x)
        {
            for(int y = -1; y <= 1; ++y)
            {
                float pcfDepth = texture(depthMap, projCoords.xy + vec2(x, y) * texelSize).r; 
                shadow += currentDepth - bias > pcfDepth ? 1.0 : 0.0;
            }
        }
        shadow /= 9.0;
    }
    else if (hasShadows)
    {
        shadow = currentDepth > closestDepth  ? 1.0 : 0.0;
    }

    if(projCoords.z > 1.0)
        shadow = 0.0;

    return shadow;
}

void main()
{
    vec3 color = texture(diffuseTexture, fs_in.TexCoords).rgb;
    vec3 normal = normalize(fs_in.Normal);
    vec3 lightColor = vec3(1.0);

    // Ambient
    //vec3 ambient = 0.15 * color;
    vec3 ambient = 0.2 * color;

    // Diffuse
    vec3 lightDir = normalize(lightPos - fs_in.FragPos);
    float diff = max(dot(lightDir, normal), 0.0);
    vec3 diffuse = diff * lightColor;

    // Specular
    /*
    vec3 viewDir = normalize(viewPos - fs_in.FragPos);
    float spec = 0.0;
    vec3 halfwayDir = normalize(lightDir + viewDir);
    spec = pow(max(dot(normal, halfwayDir), 0.0), 64.0);
    vec3 specular = spec * lightColor;
    */

    // Calculate shadow
    float shadow = hasShadows ? ShadowCalculation(fs_in.FragPosLightSpace, lightDir, normal) : 0.0;
    shadow = min(shadow, 0.75); // reduce the shadow strenght to allow diffuse and specular light to show in shadowed areas

    // Final lighting calculation
    //vec3 lighting = (ambient + (1.0 - shadow) * (diffuse + specular)) * color;
    vec3 lighting = (ambient + (1.0 - shadow) * (diffuse)) * color;
    FragColor = vec4(lighting, 1.0f);
}