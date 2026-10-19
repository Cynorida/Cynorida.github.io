"use client";

import { useEffect, useRef } from "react";

const vertexSource = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentSource = `
precision mediump float;
uniform vec2 resolution;
uniform float time;
uniform vec2 anchor;
uniform float spread;
uniform vec2 direction;
uniform float topFade;

vec3 ember = vec3(0.973, 0.584, 0.267);
vec3 gold = vec3(0.992, 0.812, 0.443);
vec3 rose = vec3(0.914, 0.345, 0.392);
vec3 tide = vec3(0.106, 0.427, 0.522);
vec3 deep = vec3(0.071, 0.137, 0.235);

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int octave = 0; octave < 4; octave++) {
    value += amplitude * noise(p);
    p = p * 2.03 + vec2(1.7, 9.2);
    amplitude *= 0.5;
  }
  return value;
}

vec3 ramp(float x) {
  x = clamp(x, 0.0, 1.0);
  if (x < 0.2) return mix(deep, tide, smoothstep(0.0, 0.2, x));
  if (x < 0.45) return mix(tide, rose, smoothstep(0.2, 0.45, x));
  if (x < 0.75) return mix(rose, ember, smoothstep(0.45, 0.75, x));
  return mix(ember, gold, smoothstep(0.75, 1.0, x));
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution;
  float aspect = resolution.x / resolution.y;
  vec2 p = (uv - anchor) * vec2(aspect, 1.0);
  float t = time * 0.035;

  vec2 warp = vec2(fbm(p * 1.3 + vec2(t, -t * 0.6)), fbm(p * 1.3 + vec2(-t * 0.8, t) + 4.7));
  vec2 q = p + (warp - 0.5) * 0.55;

  vec2 axis = normalize(direction);
  vec2 normal = vec2(-axis.y, axis.x);
  float along = dot(q, axis);
  float across = dot(q, normal) + 0.18 * sin(along * 2.2 + t * 6.0);

  float body = 1.0 - smoothstep(0.0, spread, abs(across));
  float fold = 0.5 + 0.5 * sin(across * 9.0 + along * 1.5 + t * 4.0);
  float threads = 0.5 + 0.5 * sin((across + warp.x * 0.08) * 160.0);

  vec3 color = ramp(0.5 + across / (spread * 2.0) * 0.9 + along * 0.18 + (warp.y - 0.5) * 0.3);
  color *= 0.78 + 0.32 * fold;
  color += vec3(1.0, 0.94, 0.86) * pow(fold, 22.0) * 0.22;
  color *= 0.9 + 0.1 * threads;

  float fadeTop = topFade < 0.999 ? 1.0 - smoothstep(topFade, 1.0, uv.y) : 1.0;
  float fadeEdge = smoothstep(0.0, 0.45, uv.x) * smoothstep(0.0, 0.22, uv.y) * fadeTop;
  float alpha = clamp(body * fadeEdge, 0.0, 1.0);
  color = clamp(color, 0.0, 1.0);
  gl_FragColor = vec4(color * alpha, alpha);
}
`;

type SignalFieldProps = {
  className?: string;
  anchorX?: number;
  anchorY?: number;
  spread?: number;
  directionX?: number;
  directionY?: number;
  topFade?: number;
};

export function SignalField({
  className,
  anchorX = 0.72,
  anchorY = 0.58,
  spread = 0.42,
  directionX = 0.62,
  directionY = 1,
  topFade = 1,
}: SignalFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { premultipliedAlpha: true, antialias: false, alpha: true });
    if (!gl) return;

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
    };

    const vertex = compile(gl.VERTEX_SHADER, vertexSource);
    const fragment = compile(gl.FRAGMENT_SHADER, fragmentSource);
    const program = gl.createProgram();
    if (!vertex || !fragment || !program) return;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const resolution = gl.getUniformLocation(program, "resolution");
    const time = gl.getUniformLocation(program, "time");
    gl.uniform2f(gl.getUniformLocation(program, "anchor"), anchorX, anchorY);
    gl.uniform1f(gl.getUniformLocation(program, "spread"), spread);
    gl.uniform2f(gl.getUniformLocation(program, "direction"), directionX, directionY);
    gl.uniform1f(gl.getUniformLocation(program, "topFade"), topFade);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const renderScale = Math.min(window.devicePixelRatio || 1, 2) * 0.5;
    let frame = 0;
    let visible = true;
    let elapsed = 18;
    let previous = 0;
    let lastDraw = 0;

    const resize = () => {
      const width = Math.max(1, Math.round(canvas.clientWidth * renderScale));
      const height = Math.max(1, Math.round(canvas.clientHeight * renderScale));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    const draw = () => {
      resize();
      gl.uniform2f(resolution, canvas.width, canvas.height);
      gl.uniform1f(time, elapsed);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const tick = (now: number) => {
      frame = 0;
      if (!visible || document.hidden || reducedMotion.matches) return;
      if (previous) elapsed += Math.min(now - previous, 64) / 1000;
      previous = now;
      if (now - lastDraw > 32) {
        draw();
        lastDraw = now;
      }
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (frame || reducedMotion.matches) return;
      previous = 0;
      frame = requestAnimationFrame(tick);
    };

    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    draw();
    canvas.dataset.ready = "true";

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    observer.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    const onMotionChange = () => (reducedMotion.matches ? (stop(), draw()) : start());
    const onResize = () => draw();
    document.addEventListener("visibilitychange", onVisibility);
    reducedMotion.addEventListener("change", onMotionChange);
    window.addEventListener("resize", onResize);
    start();

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      reducedMotion.removeEventListener("change", onMotionChange);
      window.removeEventListener("resize", onResize);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, [anchorX, anchorY, spread, directionX, directionY, topFade]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
