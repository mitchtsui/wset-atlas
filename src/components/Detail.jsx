import { useState } from "react";
import { GMAP, GUIDE } from "../data/guide.js";
import { SM, VD_SIMPLE } from "../data/maps.js";

function Tag({t,red}){return <span style={{display:"inline-block",padding:"2px 10px",margin:2,borderRadius:14,fontSize:11,fontWeight:600,background:red?"#f8e8e8":"#f0f0e0",color:red?"#904040":"#606020",border:`1px solid ${red?"#e0c0c0":"#d8d8b8"}`}}>{t}</span>}

function Info({color,label,text}){return <div style={{borderLeft:`3px solid ${color}`,padding:"10px 14px",marginBottom:12,background:color==="#d04040"?"#fdf6f6":"#fdfcf4",borderRadius:"0 6px 6px 0"}}>
  <div style={{fontSize:9,letterSpacing:2,color,textTransform:"uppercase",fontWeight:700,marginBottom:4}}>{label}</div>
  <p style={{margin:0,fontSize:13,lineHeight:"20px",color:"#444"}}>{text}</p>
</div>}


export function Quiz({q,a,n,onReveal}){const[s,setS]=useState(false);const doReveal=()=>{setS(true);if(onReveal)onReveal();};return <div style={{padding:"8px 12px",marginBottom:6,background:"#f8f6f0",borderRadius:6,border:"1px solid #e8e4d8"}}>
  <div style={{fontSize:12,color:"#444",marginBottom:4}}><b style={{color:"#888"}}>Q{n}:</b> {q}</div>
  {s?<div style={{fontSize:12,color:"#308040",fontWeight:600}}>✓ {a}</div>:<button onClick={doReveal} onKeyDown={(e)=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();doReveal();}}} aria-label={`Reveal answer for question ${n}`} style={{background:"#e8e4d8",border:"none",color:"#666",padding:"3px 12px",borderRadius:4,fontSize:11,cursor:"pointer"}}>Reveal</button>}
</div>}


export function MCQ({q,o,a,e,n,onAnswer}){const[sel,setSel]=useState(null);const[show,setShow]=useState(false);
const ai="abcd".indexOf(a);
const doAnswer=(i)=>{if(sel!==null)return;setSel(i);setShow(true);if(onAnswer)onAnswer(i===ai);};
return <div style={{padding:"8px 12px",marginBottom:6,background:"#f8f6f0",borderRadius:6,border:"1px solid #e8e4d8"}}>
  <div style={{fontSize:11.5,color:"#444",marginBottom:5}}><b style={{color:"#6898b8",fontFamily:"sans-serif",fontSize:9.5}}>MC{n}.</b> {q}</div>
  <div style={{display:"grid",gap:3}} role="radiogroup" aria-label={`Question ${n} options`}>
    {o.map((opt,i)=>{const letter="abcd"[i];const isAns=i===ai;const picked=sel===i;
      return <div key={i} role="radio" aria-checked={picked} tabIndex={0}
        onClick={()=>doAnswer(i)}
        onKeyDown={(ev)=>{if(ev.key==="Enter"||ev.key===" "){ev.preventDefault();doAnswer(i);}}}
        style={{padding:"4px 8px",borderRadius:4,fontSize:11,cursor:"pointer",outline:"none",
        border:show&&isAns?"2px solid #2E7D32":picked&&!isAns?"2px solid #c03030":"1px solid #ddd",
        background:show&&isAns?"#e8f5e8":picked&&!isAns?"#fde8e8":"#fff",
        color:show&&isAns?"#1B5E20":picked&&!isAns?"#b71c1c":"#555"
      }}><b>{letter})</b> {opt}</div>})}
  </div>
  {show&&e&&<div style={{marginTop:5,padding:"4px 8px",background:"#e8f4ff",borderRadius:4,fontSize:10.5,color:"#336",lineHeight:"16px"}}><b style={{color:"#4488aa"}}>✓ {a})</b> {e}</div>}
</div>}


function CartoMap({ sm, selV, onSelV }) {
  return (
    <svg viewBox={`-14 -16 ${sm.w+28} ${sm.h+32}`} role="img" aria-label={`Appellation map: ${sm.title}`} style={{width:"100%",height:"auto",maxHeight:460,display:"block",background:"#e8eddf",borderRadius:6,border:"1px solid #c8c4b0"}}>
      <defs><marker id="sma" markerWidth="5" markerHeight="4" refX="4" refY="2" orient="auto"><path d="M0,0 L5,2 L0,4" fill="#4488aa" opacity=".5"/></marker></defs>
      <text x={sm.w/2} y={-4} textAnchor="middle" fill="#333" fontSize={10} fontWeight={800} letterSpacing={2.5} style={{fontFamily:"sans-serif"}}>{sm.title}</text>
      {sm.river&&<><path d={sm.river.d} fill="none" stroke="#6CB4D8" strokeWidth={4} strokeLinecap="round" opacity={.5}/><path d={sm.river.d} fill="none" stroke="#90D0F0" strokeWidth={2} strokeLinecap="round" opacity={.55}/></>}
      {sm.river2&&<><path d={sm.river2.d} fill="none" stroke="#6CB4D8" strokeWidth={3} strokeLinecap="round" opacity={.45}/><path d={sm.river2.d} fill="none" stroke="#90D0F0" strokeWidth={1.5} strokeLinecap="round" opacity={.5}/></>}
      {sm.river3&&<path d={sm.river3.d} fill="none" stroke="#6CB4D8" strokeWidth={2.5} strokeLinecap="round" opacity={.4}/>}
      {sm.areas.map((a,i)=>{const isSel=selV===i;return(
        <g key={i} onClick={()=>onSelV(isSel?-1:i)} tabIndex={0} role="button" aria-label={a.n}
          onKeyDown={(e)=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();onSelV(isSel?-1:i);}}}
          style={{cursor:"pointer",outline:"none"}}>
          <path d={a.path} fill={a.col} fillOpacity={isSel?.78:.5} stroke={isSel?"#222":a.col} strokeWidth={isSel?2:.8} strokeOpacity={isSel?1:.35}/>
          <text x={a.lx} y={a.ly} fill={a.lcol||a.col} fontSize={isSel?8:7} fontWeight={700} letterSpacing={.3} style={{fontFamily:"sans-serif",textShadow:"0 0 2px #e8eddf,0 0 4px #e8eddf,0 0 8px #e8eddf"}}>{a.n.toUpperCase()}</text>
        </g>);})}
      {(sm.towns||[]).map((t,i)=>(
        <g key={i}><circle cx={t.x} cy={t.y} r={2.2} fill="#333"/>
          <line x1={t.x} y1={t.y} x2={t.lx} y2={t.ly} stroke="#777" strokeWidth={.4}/>
          <text x={t.lx+(t.align==="end"?-3:3)} y={t.ly+3} textAnchor={t.align||"start"} fill="#444" fontSize={5.8} fontWeight={500} style={{fontFamily:"sans-serif"}}>{t.n}</text>
        </g>))}
      {/* Region/country labels */}
      {(sm.labels||[]).map((lb,i)=>(
        <text key={i} x={lb.x} y={lb.y} textAnchor="middle" fill={lb.col||"#999"} fontSize={lb.fs||8} fontWeight={lb.it?400:300} fontStyle={lb.it?"italic":"normal"} letterSpacing={lb.fs?lb.fs*0.25:2} style={{fontFamily:"sans-serif"}}>{lb.t.includes("\n")?lb.t.split("\n").map((ln,j)=><tspan key={j} x={lb.x} dy={j?(lb.fs||8)*1.2:0}>{ln}</tspan>):lb.t}</text>
      ))}
      <g transform={`translate(${sm.w+8},${sm.h-22})`}><line x1={0} y1={14} x2={0} y2={2} stroke="#666" strokeWidth={1}/><polygon points="-2.5,4 0,0 2.5,4" fill="#666"/><text x={0} y={-2} textAnchor="middle" fill="#666" fontSize={5.5} fontWeight={700} style={{fontFamily:"sans-serif"}}>N</text></g>
    </svg>
  );
}


function SimpleSubMap({ villages, selV, onSelV }) {
  return (
    <svg viewBox="-5 -5 110 110" style={{width:"100%",height:"auto",display:"block",background:"#e8eddf",borderRadius:6,border:"1px solid #c8c4b0"}}>
      {villages.map((v,i)=>{const isSel=selV===i;const cx=v.x*100,cy=v.y*100;return(
        <g key={i} onClick={()=>onSelV(isSel?-1:i)} tabIndex={0} role="button" aria-label={v.n}
          onKeyDown={(e)=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();onSelV(isSel?-1:i);}}}
          style={{cursor:"pointer",outline:"none"}}>
          <circle cx={cx} cy={cy} r={isSel?9:6} fill={v.col} fillOpacity={isSel?.55:.25} stroke={isSel?"#333":v.col} strokeWidth={isSel?1.2:.5}/>
          <circle cx={cx} cy={cy} r={2} fill="#fff" stroke="#555" strokeWidth={.5}/>
          <text x={cx} y={cy-9} textAnchor="middle" fill={isSel?"#222":"#555"} fontSize={isSel?5.2:4.2} fontWeight={700} letterSpacing={.2} style={{fontFamily:"sans-serif"}}>{v.n}</text>
        </g>);})}
    </svg>
  );
}


function SubMap({ regionId, selVillage, onSelVillage }) {
  const sm = SM[regionId];
  if (sm) return <CartoMap sm={sm} selV={selVillage} onSelV={onSelVillage} />;
  const vd = VD_SIMPLE[regionId];
  if (vd) return <SimpleSubMap villages={vd} selV={selVillage} onSelV={onSelVillage} />;
  return null;
}

function VillageCard({ v }) {
  return (
    <div style={{background:"#fff",border:`1px solid ${v.col}40`,borderLeft:`4px solid ${v.col}`,borderRadius:"0 8px 8px 0",padding:"12px 14px",marginBottom:10,animation:"fi .2s ease-out"}}>
      <div style={{fontWeight:700,fontSize:15,color:"#333",marginBottom:6}}>{v.n}</div>
      {v.gr&&<Row label="Grapes" val={v.gr}/>}
      {v.cl&&<Row label="Classification" val={v.cl}/>}
      {v.style&&<Row label="Style" val={v.style}/>}
      {v.soil&&<Row label="Soil" val={v.soil}/>}
    </div>
  );
}

function Row({label,val}){return <div style={{fontSize:12,color:"#555",marginBottom:4,lineHeight:"18px"}}><span style={{color:"#999",fontSize:9.5,letterSpacing:1,textTransform:"uppercase",fontWeight:700,fontFamily:"sans-serif"}}>{label}: </span>{val}</div>}

function Sec({l,i,children}){return <div style={{marginBottom:14}}><div style={{fontSize:9,letterSpacing:2,color:"#999",textTransform:"uppercase",fontWeight:700,marginBottom:6}}>{i} {l}</div>{children}</div>}


function GermanSweetnessChart(){
  const levels=[
    {n:'Kabinett',must:'67-82°Oe',sweet:'Dry to off-dry',desc:'Lightest. Can be trocken (dry)',col:'#e8f5e8'},
    {n:'Spätlese',must:'76-90°Oe',sweet:'Dry to medium',desc:'Late harvest. MORE body. Can be trocken',col:'#d4ecd4'},
    {n:'Auslese',must:'83-100°Oe',sweet:'Medium to sweet',desc:'Selected bunches. Can be trocken but rare',col:'#f0e8c0'},
    {n:'Beerenauslese (BA)',must:'110-128°Oe',sweet:'ALWAYS sweet',desc:'Selected BERRIES. Botrytis. Rare, expensive',col:'#f0d090'},
    {n:'Trockenbeerenauslese (TBA)',must:'150-154°Oe',sweet:'ALWAYS sweet',desc:'Dried berries. Extreme botrytis. Rarest',col:'#e8b060'},
    {n:'Eiswein',must:'110-128°Oe (=BA)',sweet:'ALWAYS sweet',desc:'Frozen on vine at -7°C. NO botrytis. Same must as BA',col:'#d0e8f8'},
  ];
  return <div style={{border:'1px solid #e0dcd0',borderRadius:6,overflow:'hidden',marginBottom:10}}>
    <div style={{background:'#f8f6f0',padding:'6px 10px',borderBottom:'1px solid #e0dcd0'}}>
      <b style={{fontSize:10,color:'#333',letterSpacing:1}}>GERMAN PRÄDIKAT SWEETNESS LEVELS</b>
      <span style={{fontSize:9,color:'#999',marginLeft:8}}>(°Oe = must weight at harvest, NOT final sweetness)</span>
    </div>
    <div style={{display:'grid',gridTemplateColumns:'1fr',fontSize:10.5}}>
      <div style={{display:'grid',gridTemplateColumns:'120px 80px 90px 1fr',background:'#f0ece0',fontWeight:700,color:'#555',fontSize:9}}>
        {['Level','Must Weight','Sweetness','Notes'].map(h=><div key={h} style={{padding:'4px 8px',borderBottom:'1px solid #e0dcd0'}}>{h}</div>)}
      </div>
      {levels.map((l,i)=><div key={i} style={{display:'grid',gridTemplateColumns:'120px 80px 90px 1fr',borderBottom:i<5?'1px solid #eee':'none',background:l.col}}>
        <div style={{padding:'4px 8px',fontWeight:600,color:'#333'}}>{l.n}</div>
        <div style={{padding:'4px 8px',color:'#666'}}>{l.must}</div>
        <div style={{padding:'4px 8px',color:l.sweet.includes('ALWAYS')?'#b03030':'#555',fontWeight:l.sweet.includes('ALWAYS')?700:400}}>{l.sweet}</div>
        <div style={{padding:'4px 8px',color:'#666',fontSize:10}}>{l.desc}</div>
      </div>)}
    </div>
    <div style={{background:'#fdf6f6',padding:'5px 10px',borderTop:'1px solid #e0dcd0'}}>
      <b style={{color:'#b03030',fontSize:9}}>⚠ EXAM TRAP:</b> <span style={{fontSize:10,color:'#555'}}>Prädikat = ripeness at HARVEST, not sweetness. Kabinett/Spätlese/Auslese CAN be dry (trocken). Only BA, TBA & Eiswein are always sweet.</span>
    </div>
  </div>;
}

export default function Detail({r,c,onClose,onMC,onSQ}){
  const [selV, setSelV] = useState(-1);

  // Pull rich content from the study guide document
  const gNum = GMAP[r.id];
  const gd = gNum ? GUIDE[gNum] : null;
  const climate = gd?.climate || r.climate;
  const winemaking = gd?.winemaking || "";
  const soil = gd?.soil || "";
  const traps = gd?.traps || [];

  const takeaways = gd?.takeaways || [];
  const villages = (SM[r.id] ? SM[r.id].areas : VD_SIMPLE[r.id]) || null;

  return <div style={{animation:"sl .25s ease-out",display:"flex",flexDirection:"column",height:"100%"}}>
    {/* Header */}
    <div style={{padding:"16px 18px 12px",borderBottom:"1px solid #e0dcd0",background:"#faf8f4",flexShrink:0}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div>
          <div style={{fontSize:9,letterSpacing:2,color:c.color,textTransform:"uppercase",fontWeight:700,marginBottom:2}}>{c.name}{gd ? ` — Chapter ${gNum}` : ""}</div>
          <h2 style={{margin:0,fontSize:22,fontWeight:400,color:"#333"}}>{r.name}</h2>
        </div>
        <button onClick={onClose} aria-label="Close detail panel" style={{background:"#eee",border:"none",cursor:"pointer",width:26,height:26,borderRadius:"50%",fontSize:14,color:"#999"}}>×</button>
      </div>
    </div>
    {/* Scrollable content */}
    <div style={{padding:"14px 18px",overflowY:"auto",flex:1}}>

      {/* Region sub-map with villages */}
      {villages && <Sec l={`${r.name} — Appellations & Villages`} i="🗺">
        <SubMap regionId={r.id} selVillage={selV} onSelVillage={setSelV} />
        <div style={{fontSize:10,color:"#aaa",textAlign:"center",marginTop:4,marginBottom:6}}>Tap an area for details</div>
        {selV >= 0 && villages[selV] && <VillageCard v={villages[selV]} />}
        {selV < 0 && <div style={{display:"flex",flexWrap:"wrap",gap:3,marginBottom:6}}>
          {villages.map((v,i) => <button key={i} onClick={() => setSelV(i)} style={{fontSize:10,padding:"3px 8px",borderRadius:4,border:`1px solid ${v.col}44`,background:`${v.col}10`,color:"#555",cursor:"pointer",fontFamily:"sans-serif"}}>{v.n}</button>)}
        </div>}
      </Sec>}

      {/* Climate */}
      <Sec l="Climate & Conditions" i="☀">
        <div style={{fontSize:13,lineHeight:"21px",color:"#555"}}>{(climate||"").split(/(?:Key Influences:|Hazards:|Key Wines|Overview:)/).map((p,i)=>{
          if(!p.trim())return null;
          const boldTerms=/(\b(?:Maritime|Continental|Mediterranean|Cool|Warm|Hot|Frost|Hail|Drought|Mistral|Rain shadow|Fog|Altitude|Diurnal|Botrytis|Atlantic|Pacific|Humboldt|Benguela|Gulf Stream|Andes|Vosges|Ciron|Spring frost|Autumn rain|Cold winters|Phylloxera)\b)/gi;
          const parts=p.trim().split(boldTerms);
          return <p key={i} style={{margin:i>0?"8px 0 0":"0"}}>{i===1&&<b style={{color:"#888",fontSize:10}}>Key Influences: </b>}{i===2&&<b style={{color:"#888",fontSize:10}}>Hazards: </b>}{parts.map((s,j)=>j%2===1?<b key={j} style={{color:"#444"}}>{s}</b>:<span key={j}>{s}</span>)}</p>;
        })}</div>
      </Sec>

      {/* Key Grapes */}
      <Sec l="Key Grapes" i="🍇">
        <div style={{display:"flex",flexWrap:"wrap",gap:3}}>
          {r.grapes.r.map(g => <Tag key={g} t={g} red />)}
          {r.grapes.w.map(g => <Tag key={g} t={g} />)}
        </div>
      </Sec>

      {/* Sub-Regions */}
      {!villages && r.subs?.length > 0 && <Sec l="Sub-Regions & Key Villages" i="📍">
        <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
          {r.subs.map(s => <span key={s} style={{fontSize:11,color:"#666",background:"#f4f2ec",padding:"2px 9px",borderRadius:10,border:"1px solid #e0dcd0"}}>{s}</span>)}
        </div>
      </Sec>}

      {/* Winemaking */}
      {winemaking && <Sec l="Winemaking" i="🍷">
        <div style={{fontSize:13,lineHeight:"21px",color:"#555"}}>{(winemaking||"").split(/(?=Winemaking |Oak |Barrel |Stainless |Sweet wines|Dry whites|Red wines|White wines|Reds:|Whites:)/).map((p,i)=>{
          if(!p.trim())return null;
          const boldTerms=/(\b(?:Oak|Barrel|Stainless steel|Malolactic|Maceration|Carbonic|Fermentation|Lees|Batonnage|Autolysis|Botrytis|Chaptalization|Appassimento|Passerillage|Micro-oxygenation|Cold soak|Sur lie|Traditional method|Tank method|Fortif|Riddling|Disgorgement|Dosage|New oak|French oak|American oak|Foudres|Barriques|Botti)\b)/gi;
          const parts=p.trim().split(boldTerms);
          return <p key={i} style={{margin:i>0?"6px 0 0":"0"}}>{parts.map((s,j)=>j%2===1?<b key={j} style={{color:"#444"}}>{s}</b>:<span key={j}>{s}</span>)}</p>;
        })}</div>
      </Sec>}

      {/* Soil */}
      {soil && <Sec l="Soil Types" i="⛰">
        <div style={{fontSize:13,lineHeight:"21px",color:"#555"}}>{(soil||"").split(/\.\s+/).filter(s=>s.trim()).map((s,i)=>{
          const boldTerms=/(\b(?:Limestone|Chalk|Clay|Gravel|Slate|Granite|Schist|Sand|Volcanic|Alluvial|Loess|Marl|Terra rossa|Kimmeridgian|Albariza|Galets roulés|Iron|Tuffeau|Flysch|Ponca|Basalt|Quartz|Porphyry)\b)/gi;
          const parts=(s.trim()+'.').split(boldTerms);
          return <span key={i}>{parts.map((p,j)=>j%2===1?<b key={j} style={{color:"#444"}}>{p}</b>:<span key={j}>{p}</span>)}{' '}</span>;
        })}</div>
      </Sec>}

      {/* Key Fact */}
      <Info color="#b08020" label="Key Fact" text={r.keyFact} />

      {/* Exam Traps — all from guide */}
      {traps.length > 0 ? (
        <Sec l="Common Mistakes & Exam Traps" i="⚠">
          {traps.map((t,i) => <div key={i} style={{borderLeft:"3px solid #d04040",padding:"8px 14px",marginBottom:8,background:"#fdf6f6",borderRadius:"0 6px 6px 0"}}>
            <p style={{margin:0,fontSize:12.5,lineHeight:"20px",color:"#555"}}><b style={{color:"#c03030"}}>Trap {i+1}:</b> {t}</p>
          </div>)}
        </Sec>
      ) : (
        <Info color="#d04040" label="⚠ Exam Trap" text={r.trap} />
      )}

      {/* Key Exam Takeaways */}
      {takeaways.length > 0 && <Sec l="Key Exam Takeaways" i="✅">
        <div style={{background:"#f8f6ee",border:"1px solid #e8e4d0",borderRadius:8,padding:"10px 14px"}}>
          {takeaways.map((t,i) => <div key={i} style={{fontSize:12.5,lineHeight:"20px",color:"#555",padding:"4px 0",borderBottom:i<takeaways.length-1?"1px solid #eee":"none"}}>
            <span style={{color:"#b08020",fontWeight:700,marginRight:6}}>•</span>{t}
          </div>)}
        </div>
      </Sec>}



      {/* German Sweetness Chart */}
      {gd?.name?.includes("Germany") && <Sec l="Prädikat Sweetness Levels" i="📊"><GermanSweetnessChart/></Sec>}

      {/* Multiple Choice Questions */}
      {gd?.mc?.length > 0 && <Sec l="Multiple Choice Practice" i="📝">
        {gd.mc.map((q,i) => <MCQ key={i} q={q.q} o={q.o} a={q.a} e={q.e} n={i+1} onAnswer={onMC ? (correct) => onMC(gNum, i, correct) : undefined} />)}
      </Sec>}

      {/* Short Answer Questions */}
      {gd?.sq?.length > 0 && <Sec l="Short Answer Questions" i="✍️">
        {gd.sq.map((q,i) => <Quiz key={i} q={q.q} a={q.a} n={i+1} onReveal={onSQ ? () => onSQ(gNum, i) : undefined} />)}
      </Sec>}
    </div>
  </div>;
}

