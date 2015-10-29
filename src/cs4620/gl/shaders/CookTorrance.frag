#version 120

// You May Use The Following Functions As RenderMaterial Input
// vec4 getDiffuseColor(vec2 uv)
// vec4 getNormalColor(vec2 uv)
// vec4 getSpecularColor(vec2 uv)

//added a couple things at the top, outside of the "todo" section

// Lighting Information
const int MAX_LIGHTS = 16;
uniform int numLights;
uniform vec3 lightIntensity[MAX_LIGHTS];
uniform vec3 lightPosition[MAX_LIGHTS];
uniform vec3 ambientLightIntensity;  		// Ia = ambient light intensity

// Camera Information
uniform vec3 worldCam;
uniform float exposure;

// Shading Information
// 0 : smooth, 1: rough
uniform float roughness;

// Shading Information
uniform float shininess;

varying vec2 fUV;
varying vec3 fN; // normal at the vertex
varying vec4 worldPos; // vertex position in world coordinates

void main() {
  // TODO A4
	// Variables needed:

		// F0 = Fresnel Term (specular reflectance when light arrives perpendicular)
	float f0 = 0.04;

		// N = normal vector of surface
	vec3 N = normalize(fN);   //why is N capital? isn't that bad practice

		// V = viewing direction
	vec3 V = normalize(worldCam - worldPos.xyz):

		// L = light direction
	vec3 L = normalize(lightPosition[i] - worldPos.xyz); 

		// H = Half Vector
	vec3 H = normalize(L + V);

		// I = light intensity
	vec3 I = lightIntensity[i];

		// r = shaded distance from the light source
	float r = length(lightPosition[i] - worldPos.xyz);

		// Ks = specular reflectance
    vec4 Ks = getSpecularColor(vec2 uv)

		// Kd = diffuse reflectance
    vec4 Kd = getDiffuseColor(vec2 uv);
	
		// Beta = angle between viewing direction and half vector
	float beta = Math.acos(dot(V,H));

		// Thetah = angle between the normal and half vector
	float thetah = Math.acos(dot(N,H));

	// calculate Fresnel Term
	float fresnel = f0 + (1-f0)(1-(dot(V,H))^5);
	
	// calculate Microfacet Distribution
		// m = roughness
	float m = roughness;
		// e = constant
	float e = (float)Math.E;
		// D = Microfacet Distribution
	float D = (1/((m^2)((dot(N,H))^4))(e^((((dot(N,H))^2)-1)/(m^2)((dot(N,H))^2)))


	// calculate Geometric Attenuation
	float G1 = (2(dot(N,H))(dot(N,V)))/(dot(V,H));
	float G2 = (2(dot(N,H))(dot(N,L)))/(dot(V,H));

	float G = Math.min(Math.min(1,G1),G2);

	// calculate the color using Cook-Torrance Formula
	vec3 Ia = ambientLightIntensity;
	//color = (ks*(f(beta)/pi)*(d(thetah)*g)/(n.v)(n.l)))max(n.l,0)(i/r^2)+kd*ia;
	color = (Ks((fresnel)/(Math.pi))((D*thetah*G)/(dot(N,V))(dot(N,L)))+Kd)(Math.max((dot(N,L)),0))(I/(r^2))+Kd*Ia;

	gl_FragColor = vec4(rC, gC, bC, aC);
	gl_FragColor = vec4(1,1,1,1);

}
