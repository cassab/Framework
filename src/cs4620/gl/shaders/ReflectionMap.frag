#version 120

// You May Use The Following Functions As RenderMaterial Input
// vec4 getDiffuseColor(vec2 uv)
// vec4 getNormalColor(vec2 uv)
// vec4 getSpecularColor(vec2 uv)
// vec4 getEnvironmentColor(vec3 dir)

// Lighting Information

// Camera Information
uniform vec3 worldCam;
uniform float exposure;

varying vec2 fUV;
varying vec3 fN; // normal at the vertex
varying vec4 worldPos; // vertex position in world coordinates

void main() {
  // TODO A4
	vec3 N = normalize(fN);
	vec3 V = normalize(worldCam - worldPos.xyz);

	//R = -V + 2(V.N)N;
	vec3 R = -V + 2*(dot(V,N))*N;

	vec4 finalColor = vec4(0.0, 0.0, 0.0, 0.0);

	vec4 Iamb = getEnvironmentColor(R);

	gl_FragColor = (finalColor + Iamb)*exposure; 
}