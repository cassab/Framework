#version 120

// You May Use The Following Functions As RenderMaterial Input
// vec4 getDiffuseColor(vec2 uv)
// vec4 getNormalColor(vec2 uv)
// vec4 getSpecularColor(vec2 uv)

// Lighting Information

// Camera Information

// Shading Information
// 0 : smooth, 1: rough

void main() {
  // TODO A4
	gl_FragColor = vec4(1,1,1,1);

	// Variables needed:
		// F = Fresnel Term
		// D = Microfacet Distribution
		// G = Geometric Attenuation
		// N = normal vector of surface
		// V = viewing direction
		// L = light direction
		// I = light intensity
		// r = shaded distance from the light source
		// Ia = ambient light intensity
		// Ks = specular reflectance
		// Kd = diffuse reflectance
		// Beta = angle between viewing direction and half vector
		// Thetah = angle between the normal and half vector

	// calculate Fresnel Term
	// calculate Microfacet Distribution
	// calculate Geometric Attenuation

	// calculate the color using Cook-Torrance Formula

}