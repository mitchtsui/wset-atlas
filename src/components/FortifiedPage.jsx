import { useState } from "react";
import { FORT } from "../data/thematic.js";
import { Quiz, MCQ } from "./Detail.jsx";
import { PortChart, SherryChart } from "./Charts.jsx";

export default function FortifiedPage(){const[tab,setTab]=useState("port");const[ss,setSs]=useState(-1);const F=FORT;const sec=F[tab];
return <div style={{animation:"fi .3s ease-out",overflowY:"auto",height:"calc(100vh - 44px)",padding:"0 0 30px"}}>
  <div style={{textAlign:"center",padding:"18px 16px 12px",background:"linear-gradient(180deg,#f8f0f0,#fdfcfa)"}}><div style={{fontSize:9,letterSpacing:4,color:"#b04040"}}>THEMATIC STUDY</div><h1 style={{fontSize:22,fontWeight:400,color:"#333",margin:"4px 0"}}>Fortified Wines</h1><p style={{fontSize:10.5,color:"#888",margin:"2px auto 0",maxWidth:400}}>{F.intro}</p></div>

  <div style={{padding:"14px 16px 10px"}}><div style={{fontSize:9,letterSpacing:3,color:"#b04040",fontWeight:700,marginBottom:6}}>KEY CONCEPTS</div>
    {F.concepts.map((c,i)=><div key={i} style={{borderLeft:"3px solid #c08040",padding:"5px 9px",marginBottom:5,background:"#fdfcf4",borderRadius:"0 5px 5px 0"}}><b style={{fontSize:10.5,color:"#333"}}>{c.n}:</b> <span style={{fontSize:10.5,color:"#555"}}>{c.d}</span></div>)}</div>

  <div style={{padding:"6px 16px 10px",display:"flex",gap:3,flexWrap:"wrap"}}>
    {["port","sherry","madeira","vdn"].map(k=><button key={k} onClick={()=>{setTab(k);setSs(-1);}} style={{padding:"4px 11px",borderRadius:5,border:tab===k?"2px solid #b04040":"1px solid #ddd",background:tab===k?"#fdf6f6":"#fff",color:tab===k?"#b04040":"#888",fontSize:10.5,fontWeight:tab===k?700:400,cursor:"pointer",fontFamily:"inherit",textTransform:"capitalize"}}>{k==="vdn"?"VDN":k.charAt(0).toUpperCase()+k.slice(1)}</button>)}</div>

  {sec&&<div style={{padding:"10px 16px"}} key={tab}>
    {tab==="port"&&<div style={{marginBottom:12}}><PortChart/></div>}
    {tab==="sherry"&&<div style={{marginBottom:12}}><SherryChart/></div>}
    <div style={{fontSize:10,color:"#999",marginBottom:8}}>{sec.r}</div>
    {sec.styles.map((s,i)=>{const o=ss===i;return <div key={i} style={{marginBottom:4,border:`1px solid ${s.c}40`,borderRadius:5}}>
      <div onClick={()=>setSs(o?-1:i)} style={{padding:"5px 9px",cursor:"pointer",display:"flex",alignItems:"center",gap:5,background:o?`${s.c}10`:"#fff",borderRadius:5}}>
        <div style={{width:11,height:11,borderRadius:2,background:s.c,flexShrink:0}}/><b style={{fontSize:11.5,color:"#333",flex:1}}>{s.n}</b><span style={{color:"#ccc",fontSize:12}}>{o?"▾":"▸"}</span></div>
      {o&&<div style={{padding:"5px 9px",borderTop:`1px solid ${s.c}25`}}><p style={{fontSize:11,lineHeight:"17px",color:"#555",margin:0}}>{s.d}</p></div>}</div>})}
    {sec.traps?.length>0&&<div style={{marginTop:10}}><div style={{fontSize:9,letterSpacing:2,color:"#d04040",fontWeight:700,marginBottom:4}}>TRAPS</div>{sec.traps.map((t,i)=><div key={i} style={{borderLeft:"2px solid #d04040",padding:"3px 7px",marginBottom:3,background:"#fdf6f6",borderRadius:"0 3px 3px 0",fontSize:10.5,color:"#555"}}>⚠ {t}</div>)}</div>}
    {sec.quiz?.length>0&&<div style={{marginTop:10}}><div style={{fontSize:9,letterSpacing:2,color:"#b04040",fontWeight:700,marginBottom:4}}>QUIZ</div>{sec.quiz.map((q,i)=><Quiz key={i} q={q.q} a={q.a} n={i+1}/>)}</div>}
  </div>}

  <div style={{padding:"14px 16px 10px"}}><div style={{fontSize:9,letterSpacing:3,color:"#b04040",fontWeight:700,marginBottom:6}}>MULTIPLE CHOICE</div>{F.mc.map((q,i)=><MCQ key={i} q={q.q} o={q.o} a={q.a} e={q.e} n={i+1}/>)}</div>

  <div style={{padding:"14px 16px 10px"}}><div style={{fontSize:9,letterSpacing:3,color:"#b04040",fontWeight:700,marginBottom:6}}>OVERALL QUIZ</div>{F.quiz.map((q,i)=><Quiz key={i} q={q.q} a={q.a} n={i+1}/>)}</div>
</div>}