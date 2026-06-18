"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Curtains, Plane } from "curtainsjs";

// GLSL Shaders for the WebGL Warp Effect
const vertexShader = `
  precision mediump float;

  attribute vec3 aVertexPosition;
  attribute vec2 aTextureCoord;

  uniform mat4 uModelViewMatrix;
  uniform mat4 uProjectionMatrix;

  // Custom uniforms
  uniform float uScrollSpeed;
  
  varying vec2 vTextureCoord;
  varying float vScrollSpeed;

  void main() {
    vec3 vertexPosition = aVertexPosition;
    
    // Get the model view position
    vec4 modelViewPosition = uModelViewMatrix * vec4(vertexPosition, 1.0);
    
    // We warp the vertices based on their horizontal coordinate on the screen.
    // The further they are from the center (x = 0), the more they warp.
    float xPos = modelViewPosition.x;
    
    // Push the z-coordinate backward to create a cylindrical lens curvature on the edges
    modelViewPosition.z += abs(xPos) * abs(uScrollSpeed) * 0.05;
    
    // Apply horizontal distortion to mimic the system.studio warp
    modelViewPosition.x += sin(modelViewPosition.y * 0.005) * uScrollSpeed * 0.15;
    
    gl_Position = uProjectionMatrix * modelViewPosition;
    
    vTextureCoord = aTextureCoord;
    vScrollSpeed = uScrollSpeed;
  }
`;

const fragmentShader = `
  precision mediump float;

  varying vec2 vTextureCoord;
  varying float vScrollSpeed;

  uniform sampler2D uSampler0;

  void main() {
    vec2 uv = vTextureCoord;
    
    // Chromatic aberration (RGB shift) based on scroll speed
    float shift = vScrollSpeed * 0.003;
    
    vec4 r = texture2D(uSampler0, vec2(uv.x + shift, uv.y));
    vec4 g = texture2D(uSampler0, uv);
    vec4 b = texture2D(uSampler0, vec2(uv.x - shift, uv.y));
    
    gl_FragColor = vec4(r.r, g.g, b.b, g.a);
  }
`;

export default function TestPage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const curtainsRef = useRef<any>(null);
  const planesRef = useRef<any[]>([]);

  useEffect(() => {
    // 1. Initialize Curtains.js
    const curtains = new Curtains({
      container: "canvas-container",
      pixelRatio: Math.min(1.5, window.devicePixelRatio), // Cap pixel ratio for performance
    });
    curtainsRef.current = curtains;

    // 2. Locate all elements with the 'warp-plane' class
    const planeElements = document.querySelectorAll(".warp-plane");
    
    // 3. Define curtains plane parameters
    const params = {
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      widthSegments: 20, // Add segments so the plane can bend smoothly
      heightSegments: 20,
      uniforms: {
        scrollSpeed: {
          name: "uScrollSpeed",
          type: "1f",
          value: 0,
        },
      },
    };
    // 4. Create WebGL Planes for each DOM element
    planeElements.forEach((el) => {
      const plane = new Plane(curtains, el, params);
      planesRef.current.push(plane);
    });

    // 5. Scroll tracking variables
    let lastScroll = 0;
    let scrollSpeed = 0;
    let targetScrollSpeed = 0;
    let animationFrameId: number;

    const updateScrollSpeed = () => {
      let currentScroll = 0;
      
      if (window.innerWidth >= 768 && scrollContainerRef.current) {
        // Desktop: horizontal scroll speed
        currentScroll = scrollContainerRef.current.scrollLeft;
      } else {
        // Mobile: vertical scroll speed
        currentScroll = window.scrollY;
      }

      targetScrollSpeed = currentScroll - lastScroll;
      lastScroll = currentScroll;

      // Smooth out scroll speed decay (lerp)
      scrollSpeed += (targetScrollSpeed - scrollSpeed) * 0.1;
      
      // Cap the speed to avoid extreme distortions
      const cappedSpeed = Math.max(-15, Math.min(15, scrollSpeed));

      // Pass the updated scroll speed uniform to all planes
      planesRef.current.forEach((plane) => {
        plane.uniforms.scrollSpeed.value = cappedSpeed;
      });

      animationFrameId = requestAnimationFrame(updateScrollSpeed);
    };

    // Start loop
    animationFrameId = requestAnimationFrame(updateScrollSpeed);

    // Re-layout WebGL planes on window resize
    const handleResize = () => {
      curtains.resize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      // Clean up curtains and loop
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      curtains.dispose();
    };
  }, []);

  return (
    <main className="min-h-screen bg-white text-black font-sans selection:bg-neutral-200 relative">
      {/* WebGL Canvas Container for curtains.js */}
      <div 
        id="canvas-container" 
        className="fixed inset-0 pointer-events-none z-10 w-screen h-screen"
      />

      {/* Back to Home Button */}
      <div className="fixed top-6 left-6 z-50">
        <Link 
          href="/" 
          className="flex items-center gap-2 px-3 py-2 bg-neutral-100/80 hover:bg-neutral-200/80 text-[12px] font-mono rounded-full backdrop-blur-md border border-neutral-200 transition-all pointer-events-auto"
        >
          <ArrowLeft size={14} />
          <span>BACK TO HOME</span>
        </Link>
      </div>

      <div className="w-full p-[8px] text-[13px] leading-[1.4] text-neutral-800 md:p-0">
        {/* Header section matching system.studio */}
        <header className="flex flex-col gap-12 pb-12 md:fixed md:inset-x-0 md:top-0 md:z-20 md:min-h-[200px] md:flex-row md:gap-4 md:bg-white md:px-6 md:pt-6 md:pb-0">
          <div className="md:flex-1">
            <span className="font-space text-lg font-bold tracking-tight text-neutral-900">
              system.studio / work / patch
            </span>
          </div>
          <div className="hidden lg:block lg:flex-1"></div>
          <div className="flex w-[288px] flex-col gap-4 md:w-auto md:flex-1">
            <h1 className="font-bold text-neutral-900 text-lg uppercase font-space tracking-wider">Patch</h1>
            <p className="text-neutral-500 md:hidden">
              Patch is an app blocker with a body. A silicone object you tap your phone against to lock your apps. We designed the product, brand, app and how it shows up in the world.
            </p>
            <div className="flex flex-col text-neutral-400 md:hidden font-mono text-[11px] tracking-wider uppercase gap-0.5">
              <span>Product design</span>
              <span>Industrial design</span>
              <span>Branding</span>
            </div>
            <div className="hidden flex-col text-neutral-400 md:flex font-mono text-[11px] tracking-wider uppercase gap-0.5">
              <span>Product design</span>
              <span>Industrial design</span>
              <span>Branding</span>
            </div>
          </div>
          <div className="hidden md:flex md:flex-1 md:flex-col">
            <p className="max-w-[288px] text-neutral-500">
              Patch is an app blocker with a body. A silicone object you tap your phone against to lock your apps. We designed the product, brand, app and how it shows up in the world.
            </p>
          </div>
        </header>

        {/* Gallery container */}
        <article 
          style={{ "--bh": "min(70vh, calc(100vh - 200px))" } as React.CSSProperties}
          className="pt-12 md:pt-[220px]"
        >
          <section className="md:relative md:overscroll-y-none">
            <div className="md:sticky md:top-0 md:flex md:h-screen md:flex-col md:justify-end md:overflow-hidden md:pb-6">
              <div 
                ref={scrollContainerRef}
                className="md:overflow-x-auto scrollbar-hide"
              >
                <div className="flex flex-col gap-8 md:h-[var(--bh)] md:flex-row md:items-start md:pl-6 md:pr-12 md:gap-6">
                  
                  {/* Item 1: Lockup Image */}
                  <div className="warp-plane relative overflow-hidden shrink-0 w-full aspect-square md:h-[var(--bh)] md:w-auto bg-neutral-50">
                    <img 
                      src="https://system.studio/work/patch/patch-lockup.png" 
                      alt="Patch lockup" 
                      draggable="false" 
                      crossOrigin="anonymous"
                      className="absolute inset-0 size-full object-cover rounded-none opacity-0"
                    />
                  </div>

                  {/* Item 2: Logo Mark Figure */}
                  <figure className="flex w-full shrink-0 flex-col items-center gap-4 pb-4 md:w-auto md:pb-0 justify-center">
                    <div className="warp-plane relative overflow-hidden w-full aspect-square md:h-[calc(var(--bh)*0.665)] md:w-auto bg-neutral-50">
                      <img 
                        src="https://system.studio/work/patch/patch-mark.png" 
                        alt="The Patch logo mark" 
                        draggable="false" 
                        crossOrigin="anonymous"
                        className="absolute inset-0 size-full object-cover rounded-none opacity-0"
                      />
                    </div>
                    <figcaption className="w-full max-w-[280px] text-center text-[12px] leading-[1.3] text-neutral-400">
                      The logo mark is built up of sixteen circles, set four by four and fused into one. The bulges where they meet echo the device's scalloped edges.
                    </figcaption>
                  </figure>

                  {/* Item 3: Hero Image */}
                  <div className="warp-plane relative overflow-hidden shrink-0 w-full aspect-[16/9] md:h-[var(--bh)] md:w-auto bg-neutral-50">
                    <img 
                      src="https://system.studio/work/patch/patch-hero.png" 
                      alt="Patch" 
                      draggable="false" 
                      crossOrigin="anonymous"
                      className="absolute inset-0 size-full object-cover rounded-none opacity-0"
                    />
                  </div>

                  {/* Item 4: Product Text block (HTML text, does not need warp plane but occupies space) */}
                  <div className="flex w-full md:w-[var(--bh)] shrink-0 flex-col items-start pb-4 pt-12 md:items-start md:justify-center md:pb-0 md:pt-0 md:pr-8">
                    <div className="flex max-w-[280px] flex-col gap-3 text-left">
                      <h2 className="font-space font-bold uppercase tracking-wider text-neutral-900 text-sm">Product</h2>
                      <div className="flex flex-col gap-2 text-[12px] text-neutral-500 leading-relaxed font-light">
                        <p>Patch is moulded from soft silicone with an NFC chip and magnet baked inside.</p>
                        <p>Tap your phone to lock your apps, tap again to unlock. It's designed to help people focus without noise.</p>
                        <p>We wanted the shape to be small, fun, grippable and hard to forget.</p>
                      </div>
                    </div>
                  </div>

                  {/* Item 5: Render Video */}
                  <div className="warp-plane relative overflow-hidden shrink-0 w-full aspect-square md:h-[var(--bh)] md:w-auto bg-neutral-50">
                    <video 
                      className="absolute inset-0 size-full object-cover opacity-0" 
                      muted 
                      loop 
                      playsInline 
                      autoPlay
                      crossOrigin="anonymous"
                    >
                      <source src="https://system.studio/work/patch/patch-render.mp4" type="video/mp4" />
                    </video>
                  </div>

                  {/* Item 6: Words Video */}
                  <div className="warp-plane relative overflow-hidden shrink-0 w-full aspect-square md:h-[var(--bh)] md:w-auto bg-neutral-50">
                    <video 
                      className="absolute inset-0 size-full object-cover opacity-0" 
                      muted 
                      loop 
                      playsInline 
                      autoPlay
                      crossOrigin="anonymous"
                    >
                      <source src="https://system.studio/work/patch/patch-words.mp4" type="video/mp4" />
                    </video>
                  </div>

                  {/* Item 7: Still Image */}
                  <div className="warp-plane relative overflow-hidden shrink-0 w-full aspect-[16/9] md:h-[var(--bh)] md:w-auto bg-neutral-50">
                    <img 
                      src="https://system.studio/work/patch/patch-still.png" 
                      alt="Patch" 
                      draggable="false" 
                      crossOrigin="anonymous"
                      className="absolute inset-0 size-full object-cover rounded-none opacity-0"
                    />
                  </div>

                  {/* Item 8: Construction Diagram */}
                  <figure className="flex w-full shrink-0 flex-col items-center gap-4 pb-4 md:w-auto md:pb-0 justify-center">
                    <div className="warp-plane relative overflow-hidden w-full aspect-square md:h-[calc(var(--bh)*0.665)] md:w-auto bg-neutral-50">
                      <img 
                        src="https://system.studio/work/patch/patch-diagram.png" 
                        alt="Patch construction diagram" 
                        draggable="false" 
                        crossOrigin="anonymous"
                        className="absolute inset-0 size-full object-cover rounded-none opacity-0"
                      />
                    </div>
                    <figcaption className="w-full max-w-[280px] text-center text-[12px] leading-[1.3] text-neutral-400">
                      Patch is built from a moulded silicone body, 50 by 50 mm. A passive NFC antenna sits at the centre with a magnet seated in its core.
                    </figcaption>
                  </figure>

                  {/* Item 9: Photography Text */}
                  <div className="flex w-full md:w-[var(--bh)] shrink-0 flex-col items-start pb-4 pt-12 md:items-start md:justify-center md:pb-0 md:pt-0 md:pr-8">
                    <div className="flex max-w-[280px] flex-col gap-3 text-left">
                      <h2 className="font-space font-bold uppercase tracking-wider text-neutral-900 text-sm">Photography</h2>
                      <div className="flex flex-col gap-2 text-[12px] text-neutral-500 leading-relaxed font-light">
                        <p>The photography style splits between real life and play. Patch is shot in everyday contexts, in hand, on bedside tables, and out in the world.</p>
                        <p>Alongside that, we leaned into fun, fisheye-distorted treatments that stretch and warp the object.</p>
                      </div>
                    </div>
                  </div>

                  {/* Item 10: Bedside Table */}
                  <div className="warp-plane relative overflow-hidden shrink-0 w-full aspect-square md:h-[var(--bh)] md:w-auto bg-neutral-50">
                    <img 
                      src="https://system.studio/work/patch/patch-bedside-table.png" 
                      alt="Patch packaging" 
                      draggable="false" 
                      crossOrigin="anonymous"
                      className="absolute inset-0 size-full object-cover rounded-none opacity-0"
                    />
                  </div>

                  {/* Item 11: Sky */}
                  <div className="warp-plane relative overflow-hidden shrink-0 w-full aspect-square md:h-[var(--bh)] md:w-auto bg-neutral-50">
                    <img 
                      src="https://system.studio/work/patch/patch-sky.png" 
                      alt="Patch colourways" 
                      draggable="false" 
                      crossOrigin="anonymous"
                      className="absolute inset-0 size-full object-cover rounded-none opacity-0"
                    />
                  </div>

                  {/* Item 12: Model 1 */}
                  <div className="warp-plane relative overflow-hidden shrink-0 w-full aspect-[2/3] md:h-[var(--bh)] md:w-auto bg-neutral-50">
                    <img 
                      src="https://system.studio/work/patch/patch-model-1.png" 
                      alt="Patch in hand" 
                      draggable="false" 
                      crossOrigin="anonymous"
                      className="absolute inset-0 size-full object-cover rounded-none opacity-0"
                    />
                  </div>

                </div>
              </div>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
