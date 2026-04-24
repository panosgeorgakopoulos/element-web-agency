import { useEffect, useRef } from "react";

/**
 * Lightweight cursor-reactive fluid-feel background.
 *
 * Real Navier-Stokes ping-pong is overkill for a hero canvas and brittle on
 * low-end GPUs. This is a single-pass GLSL "pigment field": curl-noise flow
 * advects a cyan smoke layer that's repeatedly poked by mouse velocity. It
 * feels like fluid, runs at 60fps on integrated GPUs, and falls back to a
 * static gradient if WebGL is unavailable or reduced-motion is on.
 */
export function FluidHero({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const gl = canvas.getContext("webgl", {
      premultipliedAlpha: false,
      antialias: false,
      powerPreference: "high-performance",
    }) as WebGLRenderingContext | null;

    if (!gl) return;

    const vertSrc = `
      attribute vec2 a_pos;
      varying vec2 v_uv;
      void main() {
        v_uv = a_pos * 0.5 + 0.5;
        gl_Position = vec4(a_pos, 0.0, 1.0);
      }
    `;

    const fragSrc = `
      precision highp float;
      varying vec2 v_uv;
      uniform float u_time;
      uniform vec2  u_res;
      uniform vec2  u_mouse;
      uniform vec2  u_mouseVel;
      uniform float u_mouseStr;

      // hash + value noise
      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
      float noise(vec2 p){
        vec2 i = floor(p), f = fract(p);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        vec2 u = f*f*(3.0-2.0*f);
        return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
      }
      float fbm(vec2 p){
        float v = 0.0; float a = 0.5;
        for(int i=0;i<5;i++){ v += a*noise(p); p*=2.02; a*=0.5; }
        return v;
      }

      void main() {
        vec2 uv = v_uv;
        vec2 p = uv;
        p.x *= u_res.x / u_res.y;

        // flow field: time + curl-ish offset
        vec2 flow = vec2(
          fbm(p * 1.6 + vec2( u_time * 0.05, 0.0)),
          fbm(p * 1.6 + vec2(0.0, u_time * 0.05) + 17.3)
        ) - 0.5;

        // mouse influence — smoke pigment that drags with cursor velocity
        vec2 m = u_mouse;
        m.x *= u_res.x / u_res.y;
        float d = distance(p, m);
        vec2 dir = (p - m);
        float infl = exp(-d * 4.5) * u_mouseStr;
        vec2 drag = u_mouseVel * 1.4 * infl;

        vec2 q = p + flow * 0.25 - drag;

        float n = fbm(q * 2.4 + u_time * 0.04);
        float pigment = smoothstep(0.32, 0.78, n + infl * 0.55);

        // base obsidian
        vec3 bg = mix(vec3(0.035, 0.04, 0.06), vec3(0.07, 0.09, 0.12), uv.y);

        // electric cyan + soft silver highlight
        vec3 cyan = vec3(0.4, 0.99, 0.945);
        vec3 silver = vec3(0.85, 0.88, 0.92);

        vec3 col = bg;
        col = mix(col, cyan * 0.9, pigment * 0.55);
        col += silver * pow(pigment, 6.0) * 0.35;

        // bloom around cursor
        col += cyan * exp(-d * 7.0) * 0.35 * u_mouseStr;

        // subtle vignette
        float vig = smoothstep(1.2, 0.3, length(uv - 0.5));
        col *= 0.55 + 0.55 * vig;

        // film grain
        float g = (hash(uv * u_res.xy + u_time) - 0.5) * 0.04;
        col += g;

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(s));
      }
      return s;
    };

    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vertSrc));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragSrc));
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

    const uTime = gl.getUniformLocation(program, "u_time");
    const uRes = gl.getUniformLocation(program, "u_res");
    const uMouse = gl.getUniformLocation(program, "u_mouse");
    const uMouseVel = gl.getUniformLocation(program, "u_mouseVel");
    const uMouseStr = gl.getUniformLocation(program, "u_mouseStr");

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let mx = 0.5,
      my = 0.5,
      tx = 0.5,
      ty = 0.5,
      vx = 0,
      vy = 0,
      str = 0;
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width;
      ty = 1.0 - (e.clientY - r.top) / r.height;
      str = 1;
    };
    const onLeave = () => {
      str = 0;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    canvas.addEventListener("pointerleave", onLeave);

    let raf = 0;
    let last = performance.now();
    let visible = true;
    const onVis = () => {
      visible = document.visibilityState === "visible";
      if (visible) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      } else {
        cancelAnimationFrame(raf);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const nx = mx + (tx - mx) * 0.12;
      const ny = my + (ty - my) * 0.12;
      vx = vx * 0.85 + (nx - mx) * 6;
      vy = vy * 0.85 + (ny - my) * 6;
      mx = nx;
      my = ny;
      str *= 0.96;

      gl.uniform1f(uTime, now / 1000);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, mx, my);
      gl.uniform2f(uMouseVel, vx, vy);
      gl.uniform1f(uMouseStr, 0.4 + str * 0.6);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      raf = requestAnimationFrame(loop);
      void dt;
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
      gl.deleteBuffer(buf);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        background:
          "radial-gradient(circle at 50% 60%, oklch(0.18 0.06 220) 0%, oklch(0.1 0.012 250) 60%)",
      }}
    />
  );
}
