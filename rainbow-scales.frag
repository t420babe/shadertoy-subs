#ifdef GL_ES
precision highp float;
#endif


vec3 rainbow_scales(vec2 pos) {

  float speed = 0.5;
  float zoom = 4.0;
  pos *= zoom;
    
  // vec2 movement = u_mouse;
  float mod_time = mod(iTime, 400.0);
  vec2 movement = vec2(mod_time * 4.0, 500.0);

  for (int i = 1; i < 5; i++) {
    pos.x += 0.003 / float(i) * tan(float(i) * 3.0 * pos.y + iTime / speed) + movement.x/ 20.0;
    //pos.y += 0.3 / float(i) * cos(float(i) * 3.0 * pos.x + iTime * speed) + movement.y / 1000.0;
    pos.y += 0.003 / float(i) * tan(float(i) * 3.0 * pos.x + iTime / speed) + movement.y / 10.0;
  }

  float g = cos(pos.x + pos.y + 1.0) * 0.5 + 0.5;
  float b = sin(pos.x + pos.y + 1.0) * 0.5 + 0.5;
  float r = (tan(pos.x + pos.y) + tan(pos.x + pos.y)) * 0.5 + 0.5;

  return vec3(r, g, b);
}



void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    
 	// Normalized pixel coordinates (from 0 to 1)
    vec2 pos = fragCoord/iResolution.xy;
    
    vec3 color = rainbow_scales(pos);
    fragColor = vec4(color, 1.0);
}
