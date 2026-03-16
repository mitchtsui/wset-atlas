import { CONTS, byC } from "../data/countries.js";

export default function Home({onGo}){return <div style={{animation:"fi .3s ease-out"}}>
  <div style={{textAlign:"center",padding:"28px 16px 22px",background:"linear-gradient(180deg,#f8f6f0,#fdfcfa)"}}>
    <div style={{fontSize:9,letterSpacing:4,color:"#aaa",marginBottom:6}}>WINE & SPIRIT EDUCATION TRUST</div>
    <h1 style={{fontSize:"clamp(22px,5vw,34px)",fontWeight:300,color:"#333",letterSpacing:2,marginBottom:6}}>Wine Regions of the World</h1>
    <p style={{fontSize:12,color:"#999",maxWidth:480,margin:"0 auto",padding:"0 8px"}}>Interactive study atlas with detailed maps, geographic features, village markers, and exam prep. Tap a country to explore.</p>
    <div style={{display:"flex",justifyContent:"center",gap:"clamp(12px,4vw,28px)",marginTop:16,flexWrap:"wrap"}}>
      {[{n:"15",l:"Countries"},{n:"70+",l:"Regions"},{n:"150+",l:"Villages"},{n:"230+",l:"Practice Q's"}].map(s=><div key={s.l}><div style={{fontSize:20,fontWeight:300,color:"#b08020"}}>{s.n}</div><div style={{fontSize:8,letterSpacing:2,color:"#bbb"}}>{s.l}</div></div>)}
    </div>
  </div>
  <div style={{padding:"14px 20px 6px"}}><h2 style={{fontSize:11,letterSpacing:4,color:"#b08020",fontWeight:600,marginBottom:10,paddingBottom:6,borderBottom:"1px solid #eee"}}>THEMATIC STUDY</h2>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(155px,1fr))",gap:8}}>
      <div className="cc" onClick={()=>onGo("sparkling")} style={{background:"linear-gradient(135deg,#f0f6ff,#fff)"}}><div style={{padding:"12px 14px 10px"}}><div style={{fontSize:18,marginBottom:2}}>🥂</div><b style={{fontSize:13,color:"#336"}}>Sparkling Wines</b><div style={{fontSize:9,color:"#8aa",marginTop:1}}>Methods · Champagne · Cava · Prosecco</div></div></div>
      <div className="cc" onClick={()=>onGo("fortified")} style={{background:"linear-gradient(135deg,#fff4f0,#fff)"}}><div style={{padding:"12px 14px 10px"}}><div style={{fontSize:18,marginBottom:2}}>🍷</div><b style={{fontSize:13,color:"#633"}}>Fortified Wines</b><div style={{fontSize:9,color:"#a88",marginTop:1}}>Port · Sherry · Madeira · VDN</div></div></div>
    </div></div>
  {CONTS.map(co=><div key={co} style={{padding:"18px 20px 10px"}}>
    <h2 style={{fontSize:11,letterSpacing:4,color:"#bbb",textTransform:"uppercase",fontWeight:600,marginBottom:12,paddingBottom:6,borderBottom:"1px solid #eee"}}>{co}</h2>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(155px,1fr))",gap:8}}>
      {byC[co].map(([k,c])=><div key={k} className="cc" onClick={()=>onGo(k)}>
        <div style={{padding:"12px 14px 8px"}}>
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
            <div style={{width:10,height:10,borderRadius:3,background:c.color}}/>
            <span style={{fontSize:15,fontWeight:500,color:"#333"}}>{c.name}</span>
          </div>
          <div style={{fontSize:10,color:"#aaa"}}>{c.regions.length} region{c.regions.length>1?"s":""}</div>
        </div>
        <div style={{padding:"4px 14px 10px",display:"flex",flexWrap:"wrap",gap:3}}>
          {c.regions.slice(0,3).map(r=><span key={r.id} style={{fontSize:9,color:"#888",background:"#f4f2ec",padding:"1px 6px",borderRadius:8}}>{r.name}</span>)}
          {c.regions.length>3&&<span style={{fontSize:9,color:"#ccc"}}>+{c.regions.length-3}</span>}
        </div>
      </div>)}
    </div>
  </div>)}
</div>}
