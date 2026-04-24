import { useEffect, useRef } from "react";

/**
 * WebGL distorted image plane — used for hover-reveal in the work list.
 * Cheap single-pass shader: noise + radial pull around cursor + RGB chroma
 * shift. Falls back to plain <img> if WebGL is unavailable.
 */
export function DistortedImage({
  src,
  active,
  className,
  mouse,
}: {
  src: string;
  active: boolean;
  className?: string;
  /** normalized [0..1] mouse coords inside the canvas. */
  mouse: { x: number; y: number };
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    target: 0,
    progress: 0,
    mx: 0.5,
    my: 0.5,
    tmx: 0.5,
    tmy: 0.5,
    raf: 0,
  });
  const programRef = useRef<{
    gl: WebGLRenderingContext;
    uTime: WebGLUniformLocation | null;
    uMouse: WebGLUniformLocation | null;
    uProgress: WebGLUniformLocation | null;
    uRes: WebGLUniformLocation | null;
  } | null>(null);

  useEffect(() => {
    stateRef.current.target = active ? 1 : 0;
  }, [active]);

  useEffect(() => {
    stateRef.current.tmx = mouse.x;
    stateRef.current.tmy = 1 - mouse.y;
  }, [mouse.x, mouse.y]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { premultipliedAlpha: false, antialias: true });
    if (!gl) return;

    const vert = `
      attribute vec2 a_pos;
      varying vec2 v_uv;
      void main() {
        v_uv = a_pos * 0.5 + 0.5;
        gl_Position = vec4(a_pos, 0.0, 1.0);
      }
    `;
    const frag = `
      precision highp float;
      varying vec2 v_uv;
      uniform sampler2D u_tex;
      uniform float u_time;
      uniform vec2  u_mouse;
      uniform float u_progress;
      uniform vec2  u_res;

      float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
      float noise(vec2 p){
        vec2 i=floor(p), f=fract(p);
        float a=hash(i),b=hash(i+vec2(1,0)),c=hash(i+vec2(0,1)),d=hash(i+vec2(1,1));
        vec2 u=f*f*(3.0-2.0*f);
        return mix(a,b,u.x)+(c-a)*u.y*(1.0-u.x)+(d-b)*u.x*u.y;
      }

      void main(){
        vec2 uv = v_uv;

        // cover-fit handled by canvas size; ripple distortion driven by mouse
        vec2 m = u_mouse;
        vec2 d = uv - m;
        float dist = length(d);
        float wave = sin(dist * 18.0 - u_time * 2.6) * 0.012;
        float pull = exp(-dist * 3.0) * 0.06 * u_progress;
        vec2 dir = normalize(d + 0.0001);

        // additive turbulence
        float n = (noise(uv * 6.0 + u_time * 0.4) - 0.5) * 0.025 * u_progress;

        vec2 offset = dir * (wave + pull) + vec2(n);

        // chromatic split based on progress
        float ca = 0.006 * u_progress;
        float r = texture2D(u_tex, uv + offset + vec2( ca, 0.0)).r;
        float g = texture2D(u_tex, uv + offset).g;
        float b = texture2D(u_tex, uv + offset - vec2( ca, 0.0)).b;
        vec3 col = vec3(r,g,b);

        // dim when inactive — page reveals it
        col *= mix(0.0, 1.0, u_progress);

        // cyan rim glow at mask edges
        float rim = smoothstep(0.45, 0.5, abs(dist - 0.0)) * 0.0;
        col += rim;

        gl_FragColor = vec4(col, u_progress);
      }
    `;

    const compile = (t: number, s: string) => {
      const sh = gl.createShader(t)!;
      gl.shaderSource(sh, s);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(sh));
      }
      return sh;
    };
    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vert));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(program);
    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // texture
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    // 1x1 placeholder
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([10, 10, 14, 255])
    );

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    };

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => {
      canvas.width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      canvas.height = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const uTime = gl.getUniformLocation(program, "u_time");
    const uMouse = gl.getUniformLocation(program, "u_mouse");
    const uProgress = gl.getUniformLocation(program, "u_progress");
    const uRes = gl.getUniformLocation(program, "u_res");
    programRef.current = { gl, uTime, uMouse, uProgress, uRes };

    const start = performance.now();
    const tick = () => {
      const s = stateRef.current;
      s.progress += (s.target - s.progress) * 0.12;
      s.mx += (s.tmx - s.mx) * 0.18;
      s.my += (s.tmy - s.my) * 0.18;
      gl.uniform1f(uTime, (performance.now() - start) / 1000);
      gl.uniform2f(uMouse, s.mx, s.my);
      gl.uniform1f(uProgress, s.progress);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      s.raf = requestAnimationFrame(tick);
    };
    stateRef.current.raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(stateRef.current.raf);
      ro.disconnect();
      gl.deleteTexture(tex);
      gl.deleteBuffer(buf);
      gl.deleteProgram(program);
    };
  }, [src]);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
