#ifdef GL_ES
precision highp float;
#endif

vec3 rainbow_swirl_crinkle(vec2 pos) {
  vec3 color = vec3(0.0);

  float speed = 1.1;
  float zoom = 1.0;
  pos *= zoom;

  vec2 movement = vec2(iTime, 1.0);

  for (int i = 1; i < 3; i++) {
    pos.x += 0.5 / float(i) * tan(float(i) * 5.0 * pos.y + iTime / speed) + movement.x/ 20.00;
    pos.y -= 1.5 / float(i) * cos(float(i) * 15.5 * pos.x + iTime / speed) + movement.y / 30.0;
  }

  float g = cos(pos.y + pos.y + 1.0) * 0.5 + 0.5;
  float b = sin(pos.x + pos.x + 1.0) * 0.5 + 0.5;
  float r = (tan(pos.x * pos.y) + tan(pos.y + pos.x)) * 0.5 + 0.5;

  return vec3(g, b, r);
}


void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    
 	// Normalized pixel coordinates (from 0 to 1)
    vec2 pos = fragCoord/iResolution.xy;
    
    vec3 color = rainbow_swirl_crinkle(pos);
    fragColor = vec4(color, 1.0);
}
