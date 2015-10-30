package cs4620.common.texture;

import egl.math.Color;
import egl.math.Colord;
import egl.math.Vector2i;
import egl.math.Vector3;
import egl.math.Vector3d;

public class TexGenSphereNormalMap extends ACTextureGenerator {
	// 0.5f means that the discs are tangent to each other
	// For greater values discs intersect
	// For smaller values there is a "planar" area between the discs
	private float bumpRadius;
	public float counter = 0;
	// The number of rows and columns
	// There should be one disc in each row and column
	private int resolution;

	public TexGenSphereNormalMap() {
		this.bumpRadius = 0.5f;
		this.resolution = 10;
		this.setSize(new Vector2i(256));
	}

	public void setBumpRadius(float bumpRadius) {
		this.bumpRadius = bumpRadius;
	}

	public void setResolution(int resolution) {
		this.resolution = resolution;
	}

	@Override
	public void getColor(float u, float v, Color outColor) {
		// TODO A4 
		// I'm assuming that this is where we begin
		// this is the first todo comment that was found when 
		// 	performing the file search

		float uRES = u*resolution;
		float vRES = u*resolution;

		int uRound = Math.round(uRES);
		int vRound = Math.round(vRES);

		float uDiv = uRound/resolution;
		float vDiv = vRound/resolution;

		float r = (float) (Math.sin(v)*Math.cos(u));
		float g = (float) (Math.sin(v)*Math.sin(u));
		float b = (float) (Math.cos(v));
		Colord rgb = new Colord(r,g,b);

		counter = counter + 1f;
		if(counter%100 == 0){
			System.out.println("u : " + u + " , v : " + v);
			System.out.println("vector : " + (counter/100) + " = " + rgb);
		}

		//remap colors
		rgb.add(1);
		rgb.mul(.5f);
		outColor.set(rgb);
	}
}
