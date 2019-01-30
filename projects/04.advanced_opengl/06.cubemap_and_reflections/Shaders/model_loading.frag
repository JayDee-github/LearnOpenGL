#version 330 core

struct DirLight {
    vec3 direction;
  
    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
};  

struct PointLight {
    vec3 position;

    float constant;
    float linear;
    float quadratic;

    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
};

in vec3 Normal;
in vec2 TexCoords;

in vec3 FragPos;
uniform vec3 cameraPos;

uniform samplerCube skybox;
uniform float material_shininess;

uniform DirLight dirLight;

#define NR_POINT_LIGHTS 2
uniform PointLight pointLights[NR_POINT_LIGHTS];

uniform sampler2D texture_reflection1;
uniform sampler2D texture_reflection2;
uniform sampler2D texture_reflection3;
uniform sampler2D texture_reflection4;
uniform sampler2D texture_reflection5;
uniform sampler2D texture_reflection6;

uniform sampler2D texture_diffuse1;
uniform sampler2D texture_diffuse2;
uniform sampler2D texture_diffuse3;
uniform sampler2D texture_diffuse4;
uniform sampler2D texture_diffuse5;
uniform sampler2D texture_diffuse6;
uniform sampler2D texture_diffuse7;

uniform sampler2D texture_specular1;

out vec4 color;

vec3 CalcDirLight(DirLight light, vec3 normal, vec3 viewDir);
vec3 CalcPointLight(PointLight light, vec3 normal, vec3 fragPos, vec3 viewDir);


void main()
{
    // Properties
    vec3 norm = normalize(Normal);
    vec3 viewDir = normalize(cameraPos - FragPos);

    // Phase 1: Directional lighting
    vec3 result = CalcDirLight(dirLight, norm, viewDir);

    // Phase 2: Point lights
    for(int i = 0; i < NR_POINT_LIGHTS; i++)
        result += CalcPointLight(pointLights[i], norm, cameraPos, viewDir);

    // Reflection
    vec3 camera_direction_vector = normalize(FragPos - cameraPos);
    vec3 reflection_vector = reflect(camera_direction_vector, normalize(Normal));

    vec4 reflection_texture = texture(texture_reflection1, TexCoords) + texture(texture_reflection2, TexCoords) +
                              texture(texture_reflection3, TexCoords) + texture(texture_reflection4, TexCoords) +
                              texture(texture_reflection5, TexCoords) + texture(texture_reflection6, TexCoords);

    float reflect_intensity = reflection_texture.r;

    vec4 reflect_color;
    if(reflect_intensity > 0.1) // Only sample reflections when above a certain treshold
        reflect_color = texture(skybox, reflection_vector) * reflect_intensity;

    color = vec4(result, 1.0) + reflect_color;
}


vec3 CalcDirLight(DirLight light, vec3 normal, vec3 viewDir)
{
    vec3 lightDir = normalize(-light.direction);

    // Diffuse shading
    float diff = max(dot(normal, lightDir), 0.0);

    // Specular shading
    vec3 reflectDir = reflect(-lightDir, normal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), material_shininess);

    // Combine results
    vec3 ambient1  = light.ambient  * vec3(texture(texture_diffuse1, TexCoords));
    vec3 ambient2  = light.ambient  * vec3(texture(texture_diffuse2, TexCoords));
    vec3 ambient3  = light.ambient  * vec3(texture(texture_diffuse3, TexCoords));
    vec3 ambient4  = light.ambient  * vec3(texture(texture_diffuse4, TexCoords));
    vec3 ambient5  = light.ambient  * vec3(texture(texture_diffuse5, TexCoords));
    vec3 ambient6  = light.ambient  * vec3(texture(texture_diffuse6, TexCoords));
    vec3 ambient7  = light.ambient  * vec3(texture(texture_diffuse7, TexCoords));

    vec3 ambient = ambient1 + ambient2 + ambient3 + ambient4 + ambient5 + ambient6 + ambient7;

    vec3 diffuse1  = light.diffuse  * diff * vec3(texture(texture_diffuse1, TexCoords));
    vec3 diffuse2  = light.diffuse  * diff * vec3(texture(texture_diffuse2, TexCoords));
    vec3 diffuse3  = light.diffuse  * diff * vec3(texture(texture_diffuse3, TexCoords));
    vec3 diffuse4  = light.diffuse  * diff * vec3(texture(texture_diffuse4, TexCoords));
    vec3 diffuse5  = light.diffuse  * diff * vec3(texture(texture_diffuse5, TexCoords));
    vec3 diffuse6  = light.diffuse  * diff * vec3(texture(texture_diffuse6, TexCoords));
    vec3 diffuse7  = light.diffuse  * diff * vec3(texture(texture_diffuse7, TexCoords));

    vec3 diffuse = diffuse1 + diffuse2 + diffuse3 + diffuse4 + diffuse5 + diffuse6 + diffuse7;

    vec3 specular1 = light.specular * spec * vec3(texture(texture_specular1, TexCoords));

    vec3 specular = specular1;

    return (ambient + diffuse + specular);
}


// Calculates the color when using a point light.
vec3 CalcPointLight(PointLight light, vec3 normal, vec3 fragPos, vec3 viewDir)
{
    vec3 lightDir = normalize(light.position - fragPos);

    // Diffuse shading
    float diff = max(dot(normal, lightDir), 0.0);

    // Specular shading
    vec3 reflectDir = reflect(-lightDir, normal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), material_shininess);

    // Attenuation
    float distance    = length(light.position - fragPos);
    float attenuation = 1.0f / (light.constant + light.linear * distance + light.quadratic * (distance * distance));

    // Combine results
    vec3 ambient1  = light.ambient  * vec3(texture(texture_diffuse1, TexCoords));
    vec3 ambient2  = light.ambient  * vec3(texture(texture_diffuse2, TexCoords));
    vec3 ambient3  = light.ambient  * vec3(texture(texture_diffuse3, TexCoords));
    vec3 ambient4  = light.ambient  * vec3(texture(texture_diffuse4, TexCoords));
    vec3 ambient5  = light.ambient  * vec3(texture(texture_diffuse5, TexCoords));
    vec3 ambient6  = light.ambient  * vec3(texture(texture_diffuse6, TexCoords));
    vec3 ambient7  = light.ambient  * vec3(texture(texture_diffuse7, TexCoords));

    vec3 ambient = ambient1 + ambient2 + ambient3 + ambient4 + ambient5 + ambient6 + ambient7;

    vec3 diffuse1  = light.diffuse  * diff * vec3(texture(texture_diffuse1, TexCoords));
    vec3 diffuse2  = light.diffuse  * diff * vec3(texture(texture_diffuse2, TexCoords));
    vec3 diffuse3  = light.diffuse  * diff * vec3(texture(texture_diffuse3, TexCoords));
    vec3 diffuse4  = light.diffuse  * diff * vec3(texture(texture_diffuse4, TexCoords));
    vec3 diffuse5  = light.diffuse  * diff * vec3(texture(texture_diffuse5, TexCoords));
    vec3 diffuse6  = light.diffuse  * diff * vec3(texture(texture_diffuse6, TexCoords));
    vec3 diffuse7  = light.diffuse  * diff * vec3(texture(texture_diffuse7, TexCoords));

    vec3 diffuse = diffuse1 + diffuse2 + diffuse3 + diffuse4 + diffuse5 + diffuse6 + diffuse7;

    vec3 specular1 = light.specular * spec * vec3(texture(texture_specular1, TexCoords));

    vec3 specular = specular1;

    return (ambient + diffuse + specular);
}