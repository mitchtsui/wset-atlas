import { useState, useEffect } from "react";
import MapSVG from "./MapSVG.jsx";
import Detail from "./Detail.jsx";
import { rc } from "../data/countries.js";

export default function Country({ck,c,sel,onSel}){
  const [mobile, setMobile] = useState(false);
  const [tab, setTab] = useState("map"); // mobile tabs: map | list | detail

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 700);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // When selection changes on mobile, switch to detail tab
  useEffect(() => {
    if (sel && mobile) setTab("detail");
    if (!sel && mobile && tab === "detail") setTab("map");
  }, [sel, mobile]);

  if (mobile) {
    return <div style={{display:"flex",flexDirection:"column",height:"calc(100vh - 44px)",animation:"fi .25s ease-out"}}>
      {/* Mobile tab bar */}
      <div style={{display:"flex",borderBottom:"1px solid #e8e4d8",flexShrink:0,background:"#fff"}}>
        {["map","list",sel?"detail":null].filter(Boolean).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            flex:1,padding:"8px 0",border:"none",borderBottom:tab===t?"2px solid "+c.color:"2px solid transparent",
            background:"none",color:tab===t?"#333":"#aaa",fontSize:11,fontWeight:tab===t?700:400,
            cursor:"pointer",fontFamily:"sans-serif",textTransform:"capitalize",letterSpacing:1
          }}>{t === "detail" ? sel?.name || "Detail" : t}</button>
        ))}
      </div>
      {/* Tab content */}
      <div style={{flex:1,overflow:"hidden",display:"flex",flexDirection:"column"}}>
        {tab === "map" && (
          <div style={{flex:1,overflow:"auto",padding:6,background:"#fdfcfa"}}>
            <div style={{aspectRatio:"1",maxHeight:"60vh"}}>
              <MapSVG country={c} sel={sel} onSel={onSel} />
            </div>
            {/* Compact region buttons under map */}
            <div style={{display:"flex",flexWrap:"wrap",gap:4,padding:"8px 4px"}}>
              {c.regions.map((r,i) => {
                const is = sel?.id===r.id;
                return <button key={r.id} onClick={() => onSel(is?null:r)} style={{
                  padding:"5px 10px",borderRadius:6,border:`1px solid ${is?rc(i):"#e8e4d8"}`,
                  background:is?`${rc(i)}22`:"#fff",color:is?"#333":"#777",fontSize:11,
                  cursor:"pointer",fontFamily:"sans-serif",fontWeight:is?600:400
                }}>{r.name}</button>
              })}
            </div>
          </div>
        )}
        {tab === "list" && (
          <div style={{flex:1,overflowY:"auto",background:"#fdfcfa",padding:"4px 0"}}>
            {c.regions.map((r,i) => {
              const is = sel?.id===r.id;
              return <div key={r.id} onClick={() => {onSel(is?null:r);if(!is)setTab("detail");}} style={{
                margin:"0 6px 3px",padding:"10px 12px",borderRadius:6,cursor:"pointer",
                background:is?`${rc(i)}18`:"transparent",border:is?`1px solid ${rc(i)}55`:"1px solid transparent"
              }}>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <div style={{width:10,height:10,borderRadius:2,background:rc(i),opacity:is?1:0.5}} />
                  <span style={{fontSize:14,fontWeight:is?600:400,color:is?"#333":"#666"}}>{r.name}</span>
                </div>
                <div style={{fontSize:11,color:"#aaa",marginTop:2,marginLeft:16}}>{[...r.grapes.r.slice(0,2),...r.grapes.w.slice(0,1)].join(" · ")||"—"}</div>
              </div>
            })}
          </div>
        )}
        {tab === "detail" && sel && (
          <div style={{flex:1,overflow:"hidden",display:"flex",flexDirection:"column"}}>
            <Detail r={sel} c={c} onClose={() => {onSel(null);setTab("map");}} />
          </div>
        )}
      </div>
    </div>;
  }

  // Desktop layout
  return <div style={{display:"flex",height:"calc(100vh - 44px)",animation:"fi .25s ease-out"}}>
    <div style={{flex:sel?"0 0 55%":"1",display:"flex",flexDirection:"column",overflow:"hidden",borderRight:sel?"1px solid #e8e4d8":"none",transition:"flex .2s"}}>
      <div style={{flex:"1 1 60%",minHeight:0,padding:8,display:"flex",justifyContent:"center",background:"#fdfcfa",overflow:"hidden"}}>
        <MapSVG country={c} sel={sel} onSel={onSel} />
      </div>
      <div style={{borderTop:"1px solid #e8e4d8",flex:"0 1 40%",overflowY:"auto",background:"#fdfcfa"}}>
        <div style={{padding:"8px 12px 4px"}}><span style={{fontSize:9,letterSpacing:3,color:"#bbb",textTransform:"uppercase",fontWeight:700}}>Regions</span></div>
        {c.regions.map((r,i) => {const is=sel?.id===r.id; return <div key={r.id} onClick={() => onSel(is?null:r)} style={{margin:"0 6px 2px",padding:"8px 12px",borderRadius:6,cursor:"pointer",background:is?`${rc(i)}18`:"transparent",border:is?`1px solid ${rc(i)}55`:"1px solid transparent",transition:"all .15s"}}>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{width:10,height:10,borderRadius:2,background:rc(i),opacity:is?1:0.5}} />
            <span style={{fontSize:13,fontWeight:is?600:400,color:is?"#333":"#666"}}>{r.name}</span>
          </div>
          <div style={{fontSize:10,color:"#aaa",marginTop:1,marginLeft:16}}>{[...r.grapes.r.slice(0,2),...r.grapes.w.slice(0,1)].join(" · ")||"—"}</div>
        </div>})}
      </div>
    </div>
    {sel && <div style={{flex:"0 0 45%",display:"flex",flexDirection:"column",overflow:"hidden",background:"#fdfcfa"}}><Detail r={sel} c={c} onClose={() => onSel(null)} /></div>}
  </div>;
}
