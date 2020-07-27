#ifdef GL_ES
precision highp float;
#endif

vec3 rainbow_warp(vec2 pos) {
  vec3 color = vec3(0.0);

  float speed = 1.0;
  float zoom = 1.25;
  pos *= zoom;

  float mod_time = mod(iTime, 30.0);
  vec2 denominator = vec2(2.0, 10.0);
    
   if (mod_time < 10.0) {
        denominator =vec2(20.0, 100.0);
   } else if(mod_time < 20.0) {
        denominator = vec2(1.0, 1.0);
   }
  vec2 movement = vec2(13.0, iTime);

  for (int i = 1; i < 3; i++) {
    pos.x += 0.03 / float(i) * tan(float(i) * 5.0 * pos.y + iTime / speed) + movement.x/ denominator.x;
    pos.y += 0.5 / float(i) * cos(float(i) * 3.0 * pos.x + iTime * speed) + movement.y / denominator.y;
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
    
    vec3 color = rainbow_warp(pos);
    fragColor = vec4(color, 1.0);
}
