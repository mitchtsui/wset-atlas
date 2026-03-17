import { useState } from "react";
import { SPARK } from "../data/thematic.js";
import { Quiz, MCQ } from "./Detail.jsx";
import { MethodChart } from "./Charts.jsx";

function Row({label,val}){return <div style={{fontSize:12,color:"#555",marginBottom:4,lineHeight:"18px"}}><span style={{color:"#999",fontSize:9.5,letterSpacing:1,textTransform:"uppercase",fontWeight:700,fontFamily:"sans-serif"}}>{label}: </span>{val}</div>}

export default function SparklingPage(){const[sw,setSw]=useState(-1);const[sm2,setSm2]=useState(-1);const S=SPARK;
return <div style={{animation:"fi .3s ease-out",overflowY:"auto",height:"calc(100vh - 44px)",padding:"0 0 30px"}}>
  <div style={{textAlign:"center",padding:"18px 16px 12px",background:"linear-gradient(180deg,#f0f4f8,#fdfcfa)"}}><div style={{fontSize:9,letterSpacing:4,color:"#6898b8"}}>THEMATIC STUDY</div><h1 style={{fontSize:22,fontWeight:400,color:"#333",margin:"4px 0"}}>Sparkling Wines</h1></div>

  <div style={{padding:"14px 16px 10px"}}><div style={{fontSize:9,letterSpacing:3,color:"#6898b8",fontWeight:700,marginBottom:8}}>METHOD COMPARISON</div>
    <MethodChart/>
  </div>

  <div style={{padding:"14px 16px 10px"}}>
    <div style={{border:"1px solid #e0e4e8",borderRadius:6,overflow:"hidden",fontSize:10.5}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",background:"#f0f4f8",fontWeight:700,color:"#336"}}>
        {["","Traditional","Tank","Transfer"].map((h,i)=><div key={i} style={{padding:"5px 6px",borderRight:i<3?"1px solid #e0e4e8":"none",fontSize:9,textAlign:"center"}}>{h}</div>)}
      </div>
      {[
        ["2nd Ferm.","In BOTTLE","In TANK","In bottle"],
        ["Lees ageing","Yes (autolysis)","No","Some"],
        ["Riddling","Yes","No","No"],
        ["Complexity","★★★ Highest","★ Freshest","★★ Middle"],
        ["Cost","$$$","$","$$"],
        ["Character","Biscuit, toast","Fruity, floral","Moderate"],
      ].map((row,ri)=><div key={ri} style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",borderTop:"1px solid #eee",background:ri%2?"#fafcff":"#fff"}}>
        {row.map((cell,ci)=><div key={ci} style={{padding:"4px 6px",borderRight:ci<3?"1px solid #f0f0f0":"none",color:ci===0?"#888":"#444",fontWeight:ci===0?600:400,fontSize:ci===0?9:10}}>{cell}</div>)}
      </div>)}
    </div>
  </div>

  <div style={{padding:"14px 16px 10px"}}><div style={{fontSize:9,letterSpacing:3,color:"#6898b8",fontWeight:700,marginBottom:8}}>METHODS (detail)</div>
    {S.methods.map((m,i)=>{const o=sm2===i;return <div key={i} style={{marginBottom:5,border:"1px solid #e0e4e8",borderRadius:7,background:o?"#f8fafc":"#fff"}}>
      <div onClick={()=>setSm2(o?-1:i)} style={{padding:"7px 11px",cursor:"pointer",display:"flex",justifyContent:"space-between"}}><div><b style={{fontSize:12.5,color:"#333"}}>{m.n}</b>{m.aka&&<span style={{fontSize:9.5,color:"#999",marginLeft:6}}>{m.aka}</span>}</div><span style={{color:"#ccc"}}>{o?"▾":"▸"}</span></div>
      {o&&<div style={{padding:"0 11px 8px",borderTop:"1px solid #eee"}}><p style={{fontSize:11,lineHeight:"17px",color:"#555",margin:"5px 0"}}>{m.d}</p><div style={{background:"#e8f4ff",borderRadius:4,padding:"5px 9px"}}><b style={{fontSize:8,color:"#4488aa"}}>KEY: </b><span style={{fontSize:10.5,color:"#336"}}>{m.k}</span></div></div>}</div>})}
  </div>

  <div style={{padding:"14px 16px 10px"}}><div style={{fontSize:9,letterSpacing:3,color:"#6898b8",fontWeight:700,marginBottom:6}}>DOSAGE (g/L)</div><p style={{fontSize:10.5,color:"#666",lineHeight:"17px",margin:0}}>{S.dosage}</p></div>

  <div style={{padding:"14px 16px 10px"}}><div style={{fontSize:9,letterSpacing:3,color:"#6898b8",fontWeight:700,marginBottom:8}}>WINES</div>
    {S.wines.map((w,i)=>{const o=sw===i;return <div key={i} style={{marginBottom:4,border:"1px solid #e0e4e8",borderRadius:7,background:o?"#fdfcf6":"#fff"}}>
      <div onClick={()=>setSw(o?-1:i)} style={{padding:"7px 11px",cursor:"pointer",display:"flex",justifyContent:"space-between"}}><div><b style={{fontSize:12.5,color:"#333"}}>{w.n}</b>{w.m&&<span style={{fontSize:9,padding:"1px 6px",marginLeft:6,borderRadius:10,background:w.m.includes("Traditional")?"#dde8f8":"#e4f4e8",color:w.m.includes("Traditional")?"#336":"#264",fontWeight:600}}>{w.m}</span>}</div><span style={{color:"#ccc"}}>{o?"▾":"▸"}</span></div>
      {o&&<div style={{padding:"0 11px 8px",borderTop:"1px solid #eee",marginTop:0}}><div style={{fontSize:11,color:"#555",marginTop:5}}><Row label="Grapes" val={w.g}/><Row label="Ageing" val={w.a}/><Row label="Style" val={w.s}/></div>
        {w.t&&<div style={{borderLeft:"3px solid #d04040",padding:"4px 8px",marginTop:5,background:"#fdf6f6",borderRadius:"0 4px 4px 0",fontSize:10.5,color:"#555"}}><b style={{color:"#c03030"}}>⚠</b> {w.t}</div>}</div>}</div>})}
  </div>

  <div style={{padding:"14px 16px 10px"}}><div style={{fontSize:9,letterSpacing:3,color:"#6898b8",fontWeight:700,marginBottom:6}}>MULTIPLE CHOICE</div>{S.mc.map((q,i)=><MCQ key={i} q={q.q} o={q.o} a={q.a} e={q.e} n={i+1}/>)}</div>

  <div style={{padding:"14px 16px 10px"}}><div style={{fontSize:9,letterSpacing:3,color:"#6898b8",fontWeight:700,marginBottom:6}}>QUIZ</div>{S.quiz.map((q,i)=><Quiz key={i} q={q.q} a={q.a} n={i+1}/>)}</div>
</div>}