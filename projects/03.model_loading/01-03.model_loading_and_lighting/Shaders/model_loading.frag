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

in vec3 FragPos;  
in vec3 Normal;  
in vec2 TexCoords;

out vec4 color;

uniform sampler2D texture_diffuse1;
uniform sampler2D texture_diffuse2;
uniform sampler2D texture_diffuse3;
uniform sampler2D texture_diffuse4;
uniform sampler2D texture_diffuse5;
uniform sampler2D texture_diffuse6;
uniform sampler2D texture_diffuse7;
uniform sampler2D texture_diffuse8;
uniform sampler2D texture_specular1;
uniform sampler2D texture_specular2;
uniform sampler2D texture_specular3;
uniform sampler2D texture_specular4;
uniform sampler2D texture_specular5;
uniform sampler2D texture_specular6;
uniform sampler2D texture_specular7;
uniform sampler2D texture_specular8;
uniform float material_shininess;

uniform vec3 viewPos;
uniform DirLight dirLight;

#define NR_POINT_LIGHTS 2
uniform PointLight pointLights[NR_POINT_LIGHTS];


vec3 CalcDirLight(DirLight light, vec3 normal, vec3 viewDir);
vec3 CalcPointLight(PointLight light, vec3 normal, vec3 fragPos, vec3 viewDir);

void main()
{
    // Properties
    vec3 norm = normalize(Normal);
    vec3 viewDir = normalize(viewPos - FragPos);

    // Phase 1: Directional lighting
    vec3 result = CalcDirLight(dirLight, norm, viewDir);

    // Phase 2: Point lights
    for(int i = 0; i < NR_POINT_LIGHTS; i++)
        result += CalcPointLight(pointLights[i], norm, FragPos, viewDir);

    //color = vec4(texture(texture_diffuse1, TexCoords));
    color = vec4(result, 1.0);
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
    vec3 ambient8  = light.ambient  * vec3(texture(texture_diffuse8, TexCoords));

    vec3 ambient = ambient1 + ambient2 + ambient3 + ambient4 + ambient5 + ambient6 + ambient7 + ambient8;

    vec3 diffuse1  = light.diffuse  * diff * vec3(texture(texture_diffuse1, TexCoords));
    vec3 diffuse2  = light.diffuse  * diff * vec3(texture(texture_diffuse2, TexCoords));
    vec3 diffuse3  = light.diffuse  * diff * vec3(texture(texture_diffuse3, TexCoords));
    vec3 diffuse4  = light.diffuse  * diff * vec3(texture(texture_diffuse4, TexCoords));
    vec3 diffuse5  = light.diffuse  * diff * vec3(texture(texture_diffuse5, TexCoords));
    vec3 diffuse6  = light.diffuse  * diff * vec3(texture(texture_diffuse6, TexCoords));
    vec3 diffuse7  = light.diffuse  * diff * vec3(texture(texture_diffuse7, TexCoords));
    vec3 diffuse8  = light.diffuse  * diff * vec3(texture(texture_diffuse8, TexCoords));

    vec3 diffuse = diffuse1 + diffuse2 + diffuse3 + diffuse4 + diffuse5 + diffuse6 + diffuse7 + diffuse8;

    vec3 specular1 = light.specular * spec * vec3(texture(texture_specular1, TexCoords));
    vec3 specular2 = light.specular * spec * vec3(texture(texture_specular2, TexCoords));
    vec3 specular3 = light.specular * spec * vec3(texture(texture_specular3, TexCoords));
    vec3 specular4 = light.specular * spec * vec3(texture(texture_specular4, TexCoords));
    vec3 specular5 = light.specular * spec * vec3(texture(texture_specular5, TexCoords));
    vec3 specular6 = light.specular * spec * vec3(texture(texture_specular6, TexCoords));
    vec3 specular7 = light.specular * spec * vec3(texture(texture_specular7, TexCoords));
    vec3 specular8 = light.specular * spec * vec3(texture(texture_specular8, TexCoords));

    vec3 specular = specular1 + specular2 + specular3 + specular4 + specular5 + specular6 + specular7 + specular8;

    return (ambient + diffuse + specular);
    //return (ambient + diffuse);
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
    vec3 ambient8  = light.ambient  * vec3(texture(texture_diffuse8, TexCoords));

    vec3 ambient = ambient1 + ambient2 + ambient3 + ambient4 + ambient5 + ambient6 + ambient7 + ambient8;

    vec3 diffuse1  = light.diffuse  * diff * vec3(texture(texture_diffuse1, TexCoords));
    vec3 diffuse2  = light.diffuse  * diff * vec3(texture(texture_diffuse2, TexCoords));
    vec3 diffuse3  = light.diffuse  * diff * vec3(texture(texture_diffuse3, TexCoords));
    vec3 diffuse4  = light.diffuse  * diff * vec3(texture(texture_diffuse4, TexCoords));
    vec3 diffuse5  = light.diffuse  * diff * vec3(texture(texture_diffuse5, TexCoords));
    vec3 diffuse6  = light.diffuse  * diff * vec3(texture(texture_diffuse6, TexCoords));
    vec3 diffuse7  = light.diffuse  * diff * vec3(texture(texture_diffuse7, TexCoords));
    vec3 diffuse8  = light.diffuse  * diff * vec3(texture(texture_diffuse8, TexCoords));

    vec3 diffuse = diffuse1 + diffuse2 + diffuse3 + diffuse4 + diffuse5 + diffuse6 + diffuse7 + diffuse8;

    vec3 specular1 = light.specular * spec * vec3(texture(texture_specular1, TexCoords));
    vec3 specular2 = light.specular * spec * vec3(texture(texture_specular2, TexCoords));
    vec3 specular3 = light.specular * spec * vec3(texture(texture_specular3, TexCoords));
    vec3 specular4 = light.specular * spec * vec3(texture(texture_specular4, TexCoords));
    vec3 specular5 = light.specular * spec * vec3(texture(texture_specular5, TexCoords));
    vec3 specular6 = light.specular * spec * vec3(texture(texture_specular6, TexCoords));
    vec3 specular7 = light.specular * spec * vec3(texture(texture_specular7, TexCoords));
    vec3 specular8 = light.specular * spec * vec3(texture(texture_specular8, TexCoords));

    vec3 specular = specular1 + specular2 + specular3 + specular4 + specular5 + specular6 + specular7 + specular8;

    return (ambient + diffuse + specular);
    //return (ambient + diffuse);
}