#version 120

// Note: We multiply a vector with a matrix from the left side (M * v)!
// mProj * mView * mWorld * pos

// RenderCamera Input
uniform mat4 mViewProjection;

// RenderObject Input
uniform mat4 mWorld;
uniform mat3 mWorldIT;

// RenderMesh Input
attribute vec4 vPosition; // Sem (POSITION 0)
attribute vec3 vBitangent; 
attribute vec3 vTangent; 

//ADDED BY US
attribute vec3 vNormal; // Sem (NORMAL 0)
attribute vec2 vUV; // Sem (TEXCOORD 0)

varying vec2 fUV;
varying vec3 fN; // normal at the vertex
varying vec4 worldPos; // vertex position in world-space coordinates

varying vec3 bitangent; 
varying vec3 tangent; 
varying vec3 normal;

void main() {
  // TODO A4
  worldPos = mWorld * vPosition;
  gl_Position = mViewProjection * worldPos;

  fN = normalize((mWorldIT * vNormal).xyz);
  fUV = vUV;
  
  normal = vNormal;
  tangent = vTangent;
  bitangent = vBitangent; 
}