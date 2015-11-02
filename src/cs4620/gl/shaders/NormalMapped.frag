#version 120

// You May Use The Following Functions As RenderMaterial Input
// vec4 getDiffuseColor(vec2 uv)
// vec4 getNormalColor(vec2 uv)
// vec4 getSpecularColor(vec2 uv)

// RenderObject Input
uniform mat3 mWorldIT;
uniform mat3 mWorld;

// Lighting Information
const int MAX_LIGHTS = 16;
uniform int numLights;
uniform vec3 lightIntensity[MAX_LIGHTS];
uniform vec3 lightPosition[MAX_LIGHTS];
uniform vec3 ambientLightIntensity;

// Camera Information
uniform vec3 worldCam;
uniform float exposure;

// Shading Information
uniform float shininess;

varying vec2 fUV;
varying vec3 fN; // normal at the vertex
varying vec4 worldPos; // vertex position in world coordinates

uniform vec3 vBitangent; 
uniform vec3 vTangent; 
uniform vec3 vNormal;



void main() {

    vec4 ncolor = getNormalColor(fUV);
	vec3 ncolor3 = ncolor.xyz;

	vec3 NewValue = (ncolor3 * 2) - 1;

	//convert normal from tangent space to world space
	mat3 BTN = mat3(vTangent, vBitangent, vNormal);
	mat3 BTNin = mWorldIT*BTN;

	vec3 normalW = NewValue*BTNin;

	// interpolating normals will change the length of the normal, so renormalize the normal.
	vec3 N = normalize(normalW);
	vec3 V = normalize(worldCam - worldPos.xyz);
	
	vec4 finalColor = vec4(0.0, 0.0, 0.0, 0.0);

	for (int i = 0; i < numLights; i++) {
	  float r = length(lightPosition[i] - worldPos.xyz);
	  vec3 L = normalize(lightPosition[i] - worldPos.xyz); 
	  vec3 H = normalize(L + V);

	  // calculate diffuse term
	  vec4 Idiff = getDiffuseColor(fUV) * max(dot(N, L), 0.0);

	  // calculate specular term
	  vec4 Ispec = getSpecularColor(fUV) * pow(max(dot(N, H), 0.0), shininess);

	  finalColor += vec4(lightIntensity[i], 0.0) * (Idiff + Ispec) / (r*r);
	}

	// calculate ambient term
	vec4 Iamb = getDiffuseColor(fUV);
	
	gl_FragColor = (finalColor + vec4(ambientLightIntensity, 0.0) * Iamb) * exposure; 

}