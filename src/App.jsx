import { useState } from "react";
import { DATA } from "./data/countries.js";
import Home from "./components/Home.jsx";
import Country from "./components/Country.jsx";
import SparklingPage from "./components/SparklingPage.jsx";
import FortifiedPage from "./components/FortifiedPage.jsx";

export default function App(){
  const[pg,setPg]=useState("home");
  const[sel,setSel]=useState(null);
  const c=pg!=="home"&&pg!=="sparkling"&&pg!=="fortified"?DATA[pg]:null;
  const pgT=pg==="sparkling"?"Sparkling Wines":pg==="fortified"?"Fortified Wines":null;
  return <div style={{fontFamily:"'Crimson Text','Georgia',serif",background:"#fdfcfa",color:"#444",minHeight:"100vh",display:"flex",flexDirection:"column"}}>
    <nav role="navigation" aria-label="Breadcrumb" style={{padding:"8px 12px",borderBottom:"1px solid #eee",display:"flex",alignItems:"center",gap:6,flexShrink:0,background:"#fff",flexWrap:"wrap"}}>
      <button onClick={()=>{setPg("home");setSel(null);}} style={{background:"none",border:"none",color:pg==="home"?"#333":"#999",cursor:"pointer",fontSize:14,fontFamily:"inherit",fontWeight:700,letterSpacing:1}}>WSET L3</button>
      {pgT&&<><span style={{color:"#ddd"}}>/</span><span style={{color:"#333",fontSize:13}}>{pgT}</span></>}
      {c&&<><span style={{color:"#ddd"}}>/</span><span style={{color:"#333",fontSize:13}}>{c.name}</span>{sel&&<><span style={{color:"#ddd"}}>/</span><span style={{color:c.color,fontSize:12,fontWeight:600,maxWidth:120,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",display:"inline-block",verticalAlign:"middle"}}>{sel.name}</span></>}</>}
      {pg!=="home"&&<button onClick={()=>{setPg("home");setSel(null);}} style={{marginLeft:"auto",background:"#f4f2ec",border:"1px solid #e8e4d8",color:"#888",padding:"4px 10px",borderRadius:4,fontSize:10,cursor:"pointer",fontFamily:"sans-serif"}} aria-label="Back to home">← Back</button>}
    </nav>
    <main style={{flex:1,overflowY:pg==="home"||pg==="sparkling"||pg==="fortified"?"auto":"hidden"}}>
      {pg==="home"?<Home onGo={k=>{setPg(k);setSel(null);}}/>:pg==="sparkling"?<SparklingPage/>:pg==="fortified"?<FortifiedPage/>:<Country ck={pg} c={c} sel={sel} onSel={setSel}/>}
    </main>
  </div>;
}

