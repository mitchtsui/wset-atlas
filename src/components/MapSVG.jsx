import { useState, useRef, useCallback, useEffect } from "react";
import { S, sc, pp, SM, VD_SIMPLE } from "../data/maps.js";
import { rc } from "../data/countries.js";

export default function MapSVG({ country, sel, onSel }) {
  const [vb, setVb] = useState({ x: -15, y: -15, w: S + 30, h: S + 30 });
  const [isDragging, setIsDragging] = useState(false);
  const svgRef = useRef(null);
  const dragRef = useRef(null);
  const vbRef = useRef(vb);
  useEffect(() => { vbRef.current = vb; }, [vb]);
  const initialVb = { x: -15, y: -15, w: S + 30, h: S + 30 };
  const zoom = initialVb.w / vb.w; // >1 = zoomed in

  const clampVb = useCallback((nx, ny, nw, nh) => {
    nw = Math.max(40, Math.min(S + 30, nw));
    nh = nw; // keep square
    nx = Math.max(-30, Math.min(S - nw + 30, nx));
    ny = Math.max(-30, Math.min(S - nh + 30, ny));
    return { x: nx, y: ny, w: nw, h: nh };
  }, []);

  const zoomBy = useCallback((factor, cx, cy) => {
    setVb(v => {
      const nw = v.w / factor;
      const nh = v.h / factor;
      const mx = cx !== undefined ? cx : v.x + v.w / 2;
      const my = cy !== undefined ? cy : v.y + v.h / 2;
      const nx = mx - (mx - v.x) / factor;
      const ny = my - (my - v.y) / factor;
      return clampVb(nx, ny, nw, nh);
    });
  }, [clampVb]);

  // Wheel zoom
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const handler = (e) => {
      e.preventDefault();
      const v = vbRef.current;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const svgX = v.x + px * v.w;
      const svgY = v.y + py * v.h;
      zoomBy(e.deltaY < 0 ? 1.25 : 0.8, svgX, svgY);
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [zoomBy]);


  // Item 16: Pinch-to-zoom for mobile
  const touchRef = useRef({ dist: 0, mid: null });
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const getDist = (t) => Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);
    const getMid = (t, rect) => ({
      x: ((t[0].clientX + t[1].clientX) / 2 - rect.left) / rect.width,
      y: ((t[0].clientY + t[1].clientY) / 2 - rect.top) / rect.height,
    });
    const onTS = (e) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        touchRef.current.dist = getDist(e.touches);
        touchRef.current.mid = getMid(e.touches, el.getBoundingClientRect());
      }
    };
    const onTM = (e) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const nd = getDist(e.touches);
        const scale = nd / touchRef.current.dist;
        if (Math.abs(scale - 1) > 0.02) {
          const v = vbRef.current;
          const mid = touchRef.current.mid;
          zoomBy(scale, v.x + mid.x * v.w, v.y + mid.y * v.h);
          touchRef.current.dist = nd;
        }
      }
    };
    el.addEventListener("touchstart", onTS, { passive: false });
    el.addEventListener("touchmove", onTM, { passive: false });
    return () => { el.removeEventListener("touchstart", onTS); el.removeEventListener("touchmove", onTM); };
  }, [zoomBy]);

  // Pointer drag
  const onDown = (e) => {
    if (e.target.closest("[data-clickable]")) return;
    const svg = svgRef.current;
    if (!svg) return;
    dragRef.current = { sx: e.clientX, sy: e.clientY, vx: vb.x, vy: vb.y };
    svg.setPointerCapture(e.pointerId);
    setIsDragging(true);
  };
  const onMove = (e) => {
    const d = dragRef.current;
    if (!d) return;
    const svg = svgRef.current;
    const rect = svg.getBoundingClientRect();
    const dx = (e.clientX - d.sx) / rect.width * vb.w;
    const dy = (e.clientY - d.sy) / rect.height * vb.h;
    setVb(v => clampVb(d.vx - dx, d.vy - dy, v.w, v.h));
  };
  const onUp = () => { dragRef.current = null; setIsDragging(false); };

  const resetZoom = () => setVb(initialVb);

  // Zoom to region
  const zoomToRegion = (r) => {
    // Parse the area path to get bounding box
    const nums = r.area.match(/\d+\.?\d*/g).map(Number);
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (let i = 0; i < nums.length; i += 2) {
      const x = nums[i] * S, y = nums[i + 1] * S;
      minX = Math.min(minX, x); minY = Math.min(minY, y);
      maxX = Math.max(maxX, x); maxY = Math.max(maxY, y);
    }
    const pad = 30;
    const rw = maxX - minX + pad * 2;
    const rh = maxY - minY + pad * 2;
    const sz = Math.max(rw, rh, 60);
    setVb(clampVb(minX - pad - (sz - rw) / 2, minY - pad - (sz - rh) / 2, sz, sz));
  };

  // Handle region click: select + zoom
  const handleRegionClick = (r) => {
    const isSel = sel?.id === r.id;
    if (isSel) {
      onSel(null);
      resetZoom();
    } else {
      onSel(r);
      zoomToRegion(r);
    }
  };

  // Scale factors for labels based on zoom
  const fs = Math.max(5, 9 / Math.max(zoom, 1));
  const fsSmall = Math.max(4, 7 / Math.max(zoom, 1));
  const dotR = Math.max(1.5, 3 / Math.max(zoom, 1));
  const strokeW = Math.max(0.3, 1.2 / Math.max(zoom, 1));

  return (
    <div style={{ position: "relative", width: "100%", background: "#f4f0e8", borderRadius: 6, overflow: "hidden" }}>
      <svg ref={svgRef} viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
        role="img" aria-label={`Wine map of ${country.name}`}
        style={{ width: "100%", height: "100%", display: "block", cursor: isDragging ? "grabbing" : "grab", touchAction: "none" }}
        onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <marker id="ma" markerWidth="5" markerHeight="4" refX="4" refY="2" orient="auto"><path d="M0,0 L5,2 L0,4" fill="#5588bb" opacity=".5"/></marker>
        </defs>
        <rect x={-30} y={-30} width={S + 60} height={S + 60} fill="#f4f0e8" />
        <path d={sc(country.border)} fill="#e8e4da" stroke="#aaa498" strokeWidth={strokeW} strokeDasharray={`${strokeW * 5} ${strokeW * 2.5}`} />

        {(country.neighbors || []).map((n, i) => (
          <text key={i} x={n.x * S} y={n.y * S} textAnchor="middle" fill="#c5c0b5" fontSize={fs * 1.1} fontWeight={300} letterSpacing={fs * 0.3} style={{ fontFamily: "sans-serif" }}>{n.name}</text>
        ))}
        {(country.oceans || []).map((o, i) => (
          <text key={i} x={o.x * S} y={o.y * S} textAnchor="middle" fill="#a8c4d8" fontSize={fs} fontWeight={300} fontStyle="italic" letterSpacing={fs * 0.2} style={{ fontFamily: "sans-serif" }}>
            {o.name.split("\n").map((l, j) => <tspan key={j} x={o.x * S} dy={j ? fs * 1.4 : 0}>{l}</tspan>)}
          </text>
        ))}
        {(country.rivers || []).map((r, i) => {
          const mid = r.pts[Math.floor(r.pts.length / 2)];
          return <g key={i}>
            <path d={pp(r.pts)} fill="none" stroke="#88b8d8" strokeWidth={strokeW * 1.5} strokeLinecap="round" opacity={.7} />
            <text x={mid[0] * S + fsSmall * 0.8} y={mid[1] * S - fsSmall * 0.5} fill="#6898b8" fontSize={fsSmall} fontStyle="italic" style={{ fontFamily: "sans-serif" }}>{r.name}</text>
          </g>;
        })}
        {(country.mountains || []).map((m, i) => {
          const mid = m.pts[Math.floor(m.pts.length / 2)];
          return <g key={i}>
            <path d={pp(m.pts)} fill="none" stroke="#b8a888" strokeWidth={strokeW * 1.8} strokeDasharray={`${strokeW * 2.5} ${strokeW * 1.5}`} opacity={.5} strokeLinecap="round" />
            <text x={mid[0] * S} y={mid[1] * S - fsSmall} textAnchor="middle" fill="#a89870" fontSize={fsSmall} fontWeight={600} fontStyle="italic" style={{ fontFamily: "sans-serif" }}>{m.name}</text>
          </g>;
        })}
        {(country.winds || []).map((w, i) => (
          <g key={i}>
            <line x1={w.from[0] * S} y1={w.from[1] * S} x2={w.to[0] * S} y2={w.to[1] * S} stroke="#78a8c8" strokeWidth={strokeW * 1.2} opacity={.4} markerEnd="url(#ma)" strokeDasharray={`${strokeW * 3} ${strokeW * 1.5}`} />
            <text x={(w.from[0] + w.to[0]) / 2 * S} y={(w.from[1] + w.to[1]) / 2 * S - fsSmall} textAnchor="middle" fill="#6898b8" fontSize={fsSmall} fontWeight={600} style={{ fontFamily: "sans-serif" }}>{w.name}</text>
          </g>
        ))}
        {(country.currents || []).map((cur, i) => {
          const mid = cur.pts[Math.floor(cur.pts.length / 2)];
          return <g key={i}>
            <path d={pp(cur.pts)} fill="none" stroke={cur.warm ? "#d07050" : "#5088b0"} strokeWidth={strokeW * 1.8} strokeDasharray={`${strokeW * 5} ${strokeW * 2.5}`} opacity={.4} markerEnd="url(#ma)" />
            <text x={mid[0] * S} y={mid[1] * S + fs * 1.5} fill={cur.warm ? "#c06040" : "#4878a0"} fontSize={fsSmall} fontWeight={600} style={{ fontFamily: "sans-serif" }}>{cur.name}</text>
          </g>;
        })}

        {/* Region areas */}
        {country.regions.map((r, i) => {
          const isSel = sel?.id === r.id;
          const col = rc(i);
          return (
            <g key={r.id} data-clickable="1" tabIndex={0} role="button" aria-label={`${r.name} wine region`}
              onClick={() => handleRegionClick(r)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleRegionClick(r); }}}
              style={{ cursor: "pointer", outline: "none" }}>
              <path d={sc(r.area)} fill={col} fillOpacity={isSel ? 0.55 : 0.35} stroke={isSel ? "#333" : col} strokeWidth={isSel ? strokeW * 2 : strokeW} strokeOpacity={isSel ? 1 : 0.6} />
              {/* Villages — show only if no dedicated sub-map exists */}
              {(isSel || zoom > 1.5) && !SM[r.id] && !VD_SIMPLE[r.id] && (r.villages || []).map((v, j) => (
                <g key={j}>
                  <circle cx={v.x * S} cy={v.y * S} r={dotR} fill="#fff" stroke="#555" strokeWidth={strokeW * 0.6} />
                  <text x={v.x * S + dotR * 1.8} y={v.y * S + fsSmall * 0.35} fill="#444" fontSize={fsSmall} fontWeight={500} style={{ fontFamily: "sans-serif" }}>{v.n}</text>
                </g>
              ))}
              <text x={r.cx * S} y={r.cy * S + (isSel || zoom > 1.5 ? -fs * 1.2 : fs * 0.1)} textAnchor="middle" fill={isSel ? "#222" : "#444"} fontSize={isSel ? fs * 1.15 : fs} fontWeight={isSel ? 700 : 600} letterSpacing={isSel ? fs * 0.08 : 0} style={{ fontFamily: "sans-serif", textShadow: "0 0 3px rgba(244,240,232,.9)" }}>{r.name}</text>
            </g>
          );
        })}

        {/* Cities */}
        {(country.cities || []).map((ct, i) => (
          <g key={i}>
            <circle cx={ct.x * S} cy={ct.y * S} r={dotR * 0.8} fill="none" stroke="#888" strokeWidth={strokeW * 0.6} />
            <text x={ct.x * S + dotR * 1.8} y={ct.y * S + fsSmall * 0.35} fill="#888" fontSize={fsSmall * 1.05} style={{ fontFamily: "sans-serif" }}>{ct.n}</text>
          </g>
        ))}
      </svg>

      {/* Zoom controls */}
      <div style={{ position: "absolute", bottom: 8, right: 8, display: "flex", flexDirection: "column", gap: 3 }}>
        <button onClick={() => zoomBy(1.5)} className="zbtn" aria-label="Zoom in">+</button>
        <button onClick={() => zoomBy(0.67)} className="zbtn" aria-label="Zoom out">−</button>
        <button onClick={resetZoom} className="zbtn" aria-label="Reset zoom" style={{ fontSize: 10 }}>⟲</button>
      </div>
      {zoom > 1.1 && <div style={{ position: "absolute", top: 6, left: 8, fontSize: 9, color: "#aaa", background: "rgba(244,240,232,.85)", padding: "2px 8px", borderRadius: 4 }}>{Math.round(zoom * 100)}% · Scroll to zoom · Drag to pan</div>}
    </div>
  );
}

/* ═══════════════════════════════════════════
   UI COMPONENTS — light, clean, educational

