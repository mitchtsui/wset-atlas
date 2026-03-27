// Sparkling & Fortified production flow charts (SVG)
const F="'Crimson Text',Georgia,serif";

/* ═══════════════════════════════════════════════════════════
   SPARKLING WINES — Horizontal lane approach
   Each method gets a clean row showing ONLY its unique steps.
   Shared base (grapes → press → juice → ferment → base wine)
   is shown once at top, then each lane branches from there.
   ═══════════════════════════════════════════════════════════ */

export function MethodChart(){
  /* Box helpers — generous sizing */
  const box=(x,y,w,h,lines,bg,stroke)=><g key={"b"+x+y}>
    <rect x={x} y={y} width={w} height={h} rx={4} fill={bg||"#f0f3f0"} stroke={stroke||"#b0b8b0"} strokeWidth={.6}/>
    {lines.map((l,i)=><text key={i} x={x+w/2} y={y+h/2+(i-(lines.length-1)/2)*11} textAnchor="middle" dominantBaseline="central" fill="#333" fontSize={6} style={{fontFamily:F}}>{l}</text>)}
  </g>;
  const pill=(x,y,w,h,lines,bg,stroke)=><g key={"p"+x+y}>
    <rect x={x} y={y} width={w} height={h} rx={h/2} fill={bg||"#fdf6d8"} stroke={stroke||"#d0c880"} strokeWidth={.6}/>
    {lines.map((l,i)=><text key={i} x={x+w/2} y={y+h/2+(i-(lines.length-1)/2)*11} textAnchor="middle" dominantBaseline="central" fill="#333" fontSize={6} fontWeight={600} style={{fontFamily:F}}>{l}</text>)}
  </g>;
  const ar=(x1,y1,x2,y2)=><line key={"a"+x1+y1+x2+y2} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#999" strokeWidth={.7} markerEnd="url(#sm)"/>;

  const W=520, MID=130; /* left edge for step boxes */

  return <svg viewBox={`0 0 ${W} 530`} style={{width:"100%",display:"block",background:"#f8fafc",borderRadius:8,border:"1px solid #e0e4e8"}}>
    <defs><marker id="sm" viewBox="0 0 6 6" refX={5} refY={3} markerWidth={4} markerHeight={4} orient="auto"><path d="M0,0 L6,3 L0,6Z" fill="#999"/></marker></defs>

    <text x={W/2} y={20} textAnchor="middle" fill="#333" fontSize={10} fontWeight={600} letterSpacing={2} style={{fontFamily:F}}>MAKING SPARKLING WINE</text>

    {/* ═══ SHARED BASE PATH ═══ */}
    <rect x={12} y={34} width={W-24} height={56} rx={6} fill="#fff" stroke="#dde0dd" strokeWidth={.5}/>
    <text x={22} y={50} fill="#6898b8" fontSize={7} fontWeight={700} style={{fontFamily:F}}>ALL METHODS START HERE</text>
    <text x={22} y={62} fill="#888" fontSize={5.5} style={{fontFamily:F}}>Grapes → press & clarify → juice → first fermentation → base wine → blending</text>
    <text x={22} y={76} fill="#aaa" fontSize={5} fontStyle="italic" style={{fontFamily:F}}>Exception: Asti & Ancestral branch earlier (from juice or partial ferment) — see below</text>

    {/* ═══ METHOD LANES ═══ */}
    {/* Each lane: coloured label on left, unique steps as connected boxes on right */}

    {/* ── 1. TRADITIONAL ── */}
    {(() => { const Y=104, C="#4682B4";
      return <g key="trad">
        <rect x={12} y={Y} width={W-24} height={58} rx={6} fill="#f6f9ff" stroke={C+"40"} strokeWidth={.5}/>
        <text x={22} y={Y+14} fill={C} fontSize={8} fontWeight={700} style={{fontFamily:F}}>TRADITIONAL</text>
        <text x={22} y={Y+26} fill="#999" fontSize={5} style={{fontFamily:F}}>Champagne, Cava, Crémant, Cap Classique</text>
        {box(MID,Y+32,80,20,["2nd ferm","in BOTTLE"],C+"15",C)}
        {ar(MID+80,Y+42,MID+88,Y+42)}
        {box(MID+90,Y+32,70,20,["lees ageing","(autolysis)"],C+"15",C)}
        {ar(MID+160,Y+42,MID+168,Y+42)}
        {box(MID+170,Y+32,50,20,["riddle"],"#f0f3f0")}
        {ar(MID+220,Y+42,MID+228,Y+42)}
        {box(MID+230,Y+32,58,20,["disgorge"],"#f0f3f0")}
        {ar(MID+288,Y+42,MID+296,Y+42)}
        {box(MID+298,Y+32,50,20,["dosage"],"#f0f3f0")}
        <text x={W-22} y={Y+46} textAnchor="end" fill={C} fontSize={5.5} fontWeight={600} style={{fontFamily:F}}>★★★</text>
      </g>;
    })()}

    {/* ── 2. TRANSFER ── */}
    {(() => { const Y=172, C="#B8860B";
      return <g key="transfer">
        <rect x={12} y={Y} width={W-24} height={58} rx={6} fill="#fdfaf4" stroke={C+"40"} strokeWidth={.5}/>
        <text x={22} y={Y+14} fill={C} fontSize={8} fontWeight={700} style={{fontFamily:F}}>TRANSFER</text>
        <text x={22} y={Y+26} fill="#999" fontSize={5} style={{fontFamily:F}}>Some New World, large-format bottles</text>
        {box(MID,Y+32,80,20,["2nd ferm","in BOTTLE"],C+"15",C)}
        {ar(MID+80,Y+42,MID+88,Y+42)}
        {box(MID+90,Y+32,70,20,["lees ageing"],"#f0f3f0")}
        {ar(MID+160,Y+42,MID+168,Y+42)}
        {box(MID+170,Y+32,72,20,["empty to TANK","& filter"],C+"15",C)}
        {ar(MID+242,Y+42,MID+250,Y+42)}
        {box(MID+252,Y+32,58,20,["re-bottle"],"#f0f3f0")}
        <text x={W-22} y={Y+46} textAnchor="end" fill={C} fontSize={5.5} fontWeight={600} style={{fontFamily:F}}>★★</text>
      </g>;
    })()}

    {/* ── 3. TANK / CHARMAT ── */}
    {(() => { const Y=240, C="#2E8B57";
      return <g key="tank">
        <rect x={12} y={Y} width={W-24} height={58} rx={6} fill="#f4f8f4" stroke={C+"40"} strokeWidth={.5}/>
        <text x={22} y={Y+14} fill={C} fontSize={8} fontWeight={700} style={{fontFamily:F}}>TANK / CHARMAT</text>
        <text x={22} y={Y+26} fill="#999" fontSize={5} style={{fontFamily:F}}>Prosecco, most Sekt</text>
        {box(MID,Y+32,80,20,["2nd ferm","in TANK"],C+"15",C)}
        {ar(MID+80,Y+42,MID+88,Y+42)}
        {box(MID+90,Y+32,52,20,["filter"],"#f0f3f0")}
        {ar(MID+142,Y+42,MID+150,Y+42)}
        {box(MID+152,Y+32,52,20,["bottle"],"#f0f3f0")}
        <text x={MID+230} y={Y+38} fill="#666" fontSize={5} style={{fontFamily:F}}>No lees ageing</text>
        <text x={MID+230} y={Y+48} fill="#666" fontSize={5} style={{fontFamily:F}}>→ fruity, fresh</text>
        <text x={W-22} y={Y+46} textAnchor="end" fill={C} fontSize={5.5} fontWeight={600} style={{fontFamily:F}}>★</text>
      </g>;
    })()}

    {/* ── 4. CARBONATED ── */}
    {(() => { const Y=308, C="#777";
      return <g key="carb">
        <rect x={12} y={Y} width={W-24} height={52} rx={6} fill="#f4f4f4" stroke="#aaa" strokeWidth={.5}/>
        <text x={22} y={Y+14} fill={C} fontSize={8} fontWeight={700} style={{fontFamily:F}}>CARBONATED</text>
        <text x={22} y={Y+26} fill="#999" fontSize={5} style={{fontFamily:F}}>Cheapest sparkling wines</text>
        {box(MID,Y+28,80,20,["inject CO₂","into wine"],C+"20",C)}
        {ar(MID+80,Y+38,MID+88,Y+38)}
        {box(MID+90,Y+28,52,20,["bottle"],"#f0f3f0")}
        <text x={MID+168} y={Y+34} fill="#666" fontSize={5} style={{fontFamily:F}}>No fermentation for fizz.</text>
        <text x={MID+168} y={Y+44} fill="#666" fontSize={5} style={{fontFamily:F}}>Coarse bubbles, dissipate fast.</text>
      </g>;
    })()}

    {/* ── 5. ASTI ── */}
    {(() => { const Y=370, C="#C89520";
      return <g key="asti">
        <rect x={12} y={Y} width={W-24} height={58} rx={6} fill="#fdf8ee" stroke={C+"40"} strokeWidth={.5}/>
        <text x={22} y={Y+14} fill={C} fontSize={8} fontWeight={700} style={{fontFamily:F}}>ASTI METHOD</text>
        <text x={22} y={Y+26} fill="#999" fontSize={5} style={{fontFamily:F}}>Asti, Moscato d'Asti — branches from juice (before base wine)</text>
        {box(MID,Y+32,110,20,["ONE fermentation in","sealed tank, STOPPED early"],C+"15",C)}
        {ar(MID+110,Y+42,MID+118,Y+42)}
        {box(MID+120,Y+32,52,20,["bottle"],"#f0f3f0")}
        <text x={MID+198} y={Y+38} fill="#666" fontSize={5} style={{fontFamily:F}}>Low alcohol (5-7%),</text>
        <text x={MID+198} y={Y+48} fill="#666" fontSize={5} style={{fontFamily:F}}>sweet, grapey, aromatic</text>
      </g>;
    })()}

    {/* ── 6. ANCESTRAL ── */}
    {(() => { const Y=438, C="#8B5BA0";
      return <g key="anc">
        <rect x={12} y={Y} width={W-24} height={58} rx={6} fill="#f8f4fc" stroke={C+"40"} strokeWidth={.5}/>
        <text x={22} y={Y+14} fill={C} fontSize={8} fontWeight={700} style={{fontFamily:F}}>ANCESTRAL (Pét-Nat)</text>
        <text x={22} y={Y+26} fill="#999" fontSize={5} style={{fontFamily:F}}>Natural wine producers — branches from partially fermented juice</text>
        {box(MID,Y+32,110,20,["fermentation FINISHES","in sealed bottle"],C+"15",C)}
        {ar(MID+110,Y+42,MID+118,Y+42)}
        {box(MID+120,Y+32,78,20,["riddle & disgorge","(optional)"],"#f0f3f0")}
        <text x={MID+224} y={Y+38} fill="#666" fontSize={5} style={{fontFamily:F}}>Often cloudy, funky.</text>
        <text x={MID+224} y={Y+48} fill="#666" fontSize={5} style={{fontFamily:F}}>No dosage.</text>
      </g>;
    })()}

    {/* ═══ KEY TAKEAWAY ═══ */}
    <rect x={12} y={504} width={W-24} height={20} rx={4} fill="#e8f0ff"/>
    <text x={W/2} y={517} textAnchor="middle" fill="#336" fontSize={6} fontWeight={600} style={{fontFamily:F}}>AUTOLYSIS = yeast breakdown on lees → biscuit, brioche, toast — only in Traditional & Transfer methods</text>
  </svg>;
}


/* ═══════════════════════════════════════════════════════════
   PORT PRODUCTION — unchanged from previous version
   ═══════════════════════════════════════════════════════════ */

export function PortChart(){
  const bx=(x,y,w,h,lines,f,s,sw)=><g key={lines.join("")+x}>
    <rect x={x} y={y} width={w} height={h} rx={3} fill={f} stroke={s} strokeWidth={sw||.5}/>
    {lines.map((l,i)=><text key={i} x={x+w/2} y={y+h/2+(i-(lines.length-1)/2)*7.5} textAnchor="middle" dominantBaseline="central" fill="#333" fontSize={4.5} style={{fontFamily:F}}>{l}</text>)}
  </g>;
  const ar=(x1,y1,x2,y2)=><line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ccc" strokeWidth={.6} markerEnd="url(#pa)"/>;
  const BH=20, RH=20;
  return <svg viewBox="0 0 360 275" style={{width:"100%",display:"block",background:"#f8f6f4",borderRadius:6,border:"1px solid #e0dcd0"}}>
    <defs><marker id="pa" viewBox="0 0 6 6" refX={5} refY={3} markerWidth={4} markerHeight={4} orient="auto"><path d="M0,0 L6,3 L0,6Z" fill="#ccc"/></marker></defs>
    <text x={180} y={12} textAnchor="middle" fill="#333" fontSize={7} fontWeight={600} letterSpacing={1.5} style={{fontFamily:F}}>PORT PRODUCTION & STYLES</text>
    <rect x={0} y={18} width={360} height={46} fill="#fff"/>
    <text x={8} y={29} fill="#8B0000" fontSize={6} fontWeight={700} style={{fontFamily:F}}>ALL PORT</text>
    <text x={8} y={37} fill="#999" fontSize={4.2} style={{fontFamily:F}}>Douro Valley · Touriga Nacional, Touriga Franca, Tinta Roriz</text>
    {bx(8,41,52,BH,["Crush &","ferment"],"#fff","#ccc")}
    {ar(61,51,66,51)}
    {bx(68,41,66,BH,["Ferment to","5-9% ABV only"],"#f8e0e0","#8B0000",.6)}
    {ar(135,51,140,51)}
    {bx(142,41,72,BH,["ADD SPIRIT","(aguardente ~77%)"],"#f8e0e0","#8B0000",.8)}
    {ar(215,51,220,51)}
    {bx(222,41,60,BH,["SWEET wine","~19-22% ABV"],"#fde8e8","#C03030",1)}
    {ar(283,51,290,51)}
    {bx(292,41,60,BH,["Ships to","V.N. de Gaia"],"#fff","#ccc")}
    <text x={180} y={74} textAnchor="middle" fill="#444" fontSize={5} fontWeight={600} style={{fontFamily:F}}>Then aged in one of two ways → determines style:</text>
    <rect x={0} y={80} width={180} height={110} fill="#fdf4f4"/>
    <text x={90} y={93} textAnchor="middle" fill="#C03030" fontSize={6} fontWeight={700} style={{fontFamily:F}}>RUBY PATHWAY (reductive)</text>
    <text x={90} y={101} textAnchor="middle" fill="#999" fontSize={4} style={{fontFamily:F}}>Large vats / bottles — minimal O₂ contact</text>
    {bx(8,107,72,RH,["Large vats / bottles","Preserves colour & fruit"],"#fde8e8","#C03030",.6)}
    {ar(81,117,86,117)}
    {bx(90,107,78,RH,["Deep red, fruity,","tannic, SWEET"],"#C0303018","#C03030",.5)}
    {bx(8,134,38,18,["Ruby"],"#C0303028","#C03030",.6)}
    {bx(50,134,44,18,["Reserve"],"#A0282828","#A02828",.6)}
    {bx(98,134,34,18,["LBV"],"#80202028","#802020",.6)}
    {bx(136,134,38,18,["Vintage"],"#50181828","#501818",.6)}
    <text x={27} y={158} textAnchor="middle" fill="#999" fontSize={3.5} style={{fontFamily:F}}>Basic</text>
    <text x={72} y={158} textAnchor="middle" fill="#999" fontSize={3.5} style={{fontFamily:F}}>Better ruby</text>
    <text x={115} y={158} textAnchor="middle" fill="#999" fontSize={3.5} style={{fontFamily:F}}>4-6yr</text>
    <text x={155} y={158} textAnchor="middle" fill="#999" fontSize={3.5} style={{fontFamily:F}}>DECLARED</text>
    <text x={90} y={168} textAnchor="middle" fill="#C03030" fontSize={3.8} style={{fontFamily:F}}>Ruby=young, fruity. Vintage Port needs DECADES of ageing in bottle. LBV ready to drink.</text>
    <rect x={180} y={80} width={180} height={110} fill="#fdf8f0"/>
    <text x={270} y={93} textAnchor="middle" fill="#C08040" fontSize={6} fontWeight={700} style={{fontFamily:F}}>TAWNY PATHWAY (oxidative)</text>
    <text x={270} y={101} textAnchor="middle" fill="#999" fontSize={4} style={{fontFamily:F}}>Small 550L barrels (pipes) — O₂ exposure</text>
    {bx(188,107,72,RH,["Small barrels (pipes)","Oxygen → amber colour"],"#f8f0e0","#C08040",.6)}
    {ar(261,117,266,117)}
    {bx(268,107,82,RH,["Amber, nutty, caramel,","dried fruit, SWEET"],"#C0804018","#C08040",.5)}
    {bx(188,134,38,18,["Tawny"],"#D0905028","#D09050",.6)}
    {bx(230,134,52,18,["10/20/30/40"],"#C0804028","#C08040",.6)}
    {bx(286,134,50,18,["Colheita"],"#A0703028","#A07030",.6)}
    <text x={207} y={158} textAnchor="middle" fill="#999" fontSize={3.5} style={{fontFamily:F}}>Basic</text>
    <text x={256} y={158} textAnchor="middle" fill="#999" fontSize={3.5} style={{fontFamily:F}}>Age=AVERAGE</text>
    <text x={311} y={158} textAnchor="middle" fill="#999" fontSize={3.5} style={{fontFamily:F}}>Single vintage</text>
    <text x={270} y={168} textAnchor="middle" fill="#C08040" fontSize={3.8} style={{fontFamily:F}}>Tawny age is AVERAGE of blend (solera-style), NOT minimum. Colour from oxidation, not blending.</text>
    <rect x={0} y={192} width={360} height={18} fill="#f8f6f0"/>
    <text x={180} y={202} textAnchor="middle" fill="#333" fontSize={4.5} fontWeight={600} style={{fontFamily:F}}>Aguardente (~77% ABV) = ~30% of final bottle. All Port is SWEET.</text>
    <rect x={8} y={214} width={344} height={54} rx={3} fill="#fde8e8"/>
    <text x={180} y={226} textAnchor="middle" fill="#802020" fontSize={5} fontWeight={700} style={{fontFamily:F}}>⚠ KEY EXAM POINTS</text>
    <text x={180} y={236} textAnchor="middle" fill="#777" fontSize={4.2} style={{fontFamily:F}}>Spirit added DURING fermentation → kills yeast → residual sugar → ALL Port is sweet.</text>
    <text x={180} y={245} textAnchor="middle" fill="#777" fontSize={4.2} style={{fontFamily:F}}>Vintage Port: DECLARED single vintage. Needs decades of ageing. Must DECANT.</text>
    <text x={180} y={254} textAnchor="middle" fill="#777" fontSize={4.2} style={{fontFamily:F}}>LBV: Single vintage, 4-6yr in vessel. Ready to drink on release. Usually filtered (no decanting).</text>
    <text x={180} y={263} textAnchor="middle" fill="#777" fontSize={4.2} style={{fontFamily:F}}>Indicated age on Tawny (10/20/30/40) = AVERAGE age of blend, NOT a minimum.</text>
  </svg>;
}


/* ═══════════════════════════════════════════════════════════
   SHERRY PRODUCTION — Clean vertical flow
   Focuses on the core story: classification → two pathways → styles.
   PX as a side callout. No exam points (they're in the accordion).
   ═══════════════════════════════════════════════════════════ */

export function SherryChart(){
  const box=(x,y,w,h,lines,bg,stroke)=><g key={"b"+x+y}>
    <rect x={x} y={y} width={w} height={h} rx={4} fill={bg||"#eef2f7"} stroke={stroke||"#a0aab8"} strokeWidth={.6}/>
    {lines.map((l,i)=><text key={i} x={x+w/2} y={y+h/2+(i-(lines.length-1)/2)*11} textAnchor="middle" dominantBaseline="central" fill="#333" fontSize={6} style={{fontFamily:F}}>{l}</text>)}
  </g>;
  const pill=(x,y,w,h,lines,bg,stroke,bold)=><g key={"p"+x+y}>
    <rect x={x} y={y} width={w} height={h} rx={h/2} fill={bg||"#fdf6d8"} stroke={stroke||"#d0c880"} strokeWidth={.6}/>
    {lines.map((l,i)=><text key={i} x={x+w/2} y={y+h/2+(i-(lines.length-1)/2)*10} textAnchor="middle" dominantBaseline="central" fill="#333" fontSize={6} fontWeight={bold||i===0?600:400} style={{fontFamily:F}}>{l}</text>)}
  </g>;
  const style=(x,y,w,h,lines,col)=><g key={"s"+x+y}>
    <rect x={x} y={y} width={w} height={h} rx={h/3} fill={col+"20"} stroke={col} strokeWidth={.8}/>
    {lines.map((l,i)=><text key={i} x={x+w/2} y={y+h/2+(i-(lines.length-1)/2)*10} textAnchor="middle" dominantBaseline="central" fill="#333" fontSize={5.5} fontWeight={i===0?700:400} style={{fontFamily:F}}>{l}</text>)}
  </g>;
  const ar=(x1,y1,x2,y2)=><line key={"a"+x1+y1+x2+y2} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#999" strokeWidth={.7} markerEnd="url(#sh2)"/>;
  const bend=(id,d)=><path key={id} d={d} fill="none" stroke="#999" strokeWidth={.7} markerEnd="url(#sh2)"/>;
  const dashbend=(id,d)=><path key={id} d={d} fill="none" stroke="#999" strokeWidth={.6} strokeDasharray="3,2" markerEnd="url(#sh2)"/>;

  const W=460, CX=230;
  const OLO=140, FIN=320; /* column centres for the two pathways */

  return <svg viewBox={`0 0 ${W} 600`} style={{width:"100%",display:"block",background:"#f8f6f4",borderRadius:8,border:"1px solid #e0dcd0"}}>
    <defs><marker id="sh2" viewBox="0 0 6 6" refX={5} refY={3} markerWidth={4} markerHeight={4} orient="auto"><path d="M0,0 L6,3 L0,6Z" fill="#999"/></marker></defs>

    {/* ═══ TITLE ═══ */}
    <text x={CX} y={20} textAnchor="middle" fill="#333" fontSize={10} fontWeight={600} letterSpacing={2} style={{fontFamily:F}}>MAKING SHERRY</text>
    <text x={CX} y={34} textAnchor="middle" fill="#999" fontSize={5.5} style={{fontFamily:F}}>Jerez Triangle · Albariza chalk · Poniente wind</text>

    {/* ═══ TOP: Palomino base wine ═══ */}
    {pill(CX-60,48,120,22,["Palomino grapes"],"#fceabb","#bfa030")}
    {ar(CX,70,CX,82)}
    {box(CX-70,82,140,24,["ferment to complete","dryness"])}
    {ar(CX,106,CX,118)}
    {pill(CX-55,118,110,24,["DRY white wine"],"#fceabb","#bfa030")}
    {ar(CX,142,CX,154)}
    {box(CX-60,154,120,22,["first classification"])}

    {/* ═══ PX SIDE CALLOUT ═══ */}
    <rect x={12} y={48} width={108} height={86} rx={6} fill="#fdf8e8" stroke="#d0c880" strokeWidth={.5}/>
    <text x={66} y={64} textAnchor="middle" fill="#3B1F00" fontSize={6.5} fontWeight={700} style={{fontFamily:F}}>PX (separate path)</text>
    <text x={66} y={78} textAnchor="middle" fill="#666" fontSize={5} style={{fontFamily:F}}>Sun-dried PX grapes</text>
    <text x={66} y={90} textAnchor="middle" fill="#666" fontSize={5} style={{fontFamily:F}}>→ partial ferment</text>
    <text x={66} y={102} textAnchor="middle" fill="#666" fontSize={5} style={{fontFamily:F}}>→ fortify to 17%</text>
    <text x={66} y={114} textAnchor="middle" fill="#666" fontSize={5} style={{fontFamily:F}}>→ oxidative solera</text>
    <text x={66} y={128} textAnchor="middle" fill="#802020" fontSize={5.5} fontWeight={700} style={{fontFamily:F}}>Extremely sweet</text>

    {/* ═══ THE SPLIT: fortification level determines pathway ═══ */}
    {bend("spL",`M${CX-30},176 L${CX-30},192 L${OLO},192 L${OLO},206`)}
    {bend("spR",`M${CX+30},176 L${CX+30},192 L${FIN},192 L${FIN},206`)}

    {/* ═══ LEFT: OXIDATIVE PATHWAY ═══ */}
    <rect x={36} y={196} width={208} height={190} rx={8} fill="#f8f0e8" fillOpacity={.5} stroke="#c8b090" strokeWidth={.5}/>
    <text x={OLO} y={216} textAnchor="middle" fill="#8B4513" fontSize={8} fontWeight={700} style={{fontFamily:F}}>OXIDATIVE</text>
    <text x={OLO} y={230} textAnchor="middle" fill="#999" fontSize={5.5} style={{fontFamily:F}}>Fortified to ~17% ABV → no flor</text>

    {box(OLO-60,240,120,22,["oxidative ageing","in solera"],"#f0e8e0","#8B4513")}
    {ar(OLO,262,OLO,278)}

    {/* Oloroso output */}
    {style(OLO-44,278,88,28,["OLOROSO","naturally DRY"],"#8B4513")}

    {/* → Cream (sweetened) */}
    {dashbend("crm",`M${OLO-20},306 L${OLO-20},320 L${72},320 L${72},334`)}
    <text x={OLO-44} y={318} fill="#777" fontSize={5.5} fontWeight={600} style={{fontFamily:F}}>+ PX =</text>
    {style(42,334,60,24,["Cream*","(sweet)"],"#8B7355")}

    {/* → Medium (sweetened, both types) */}
    {dashbend("med",`M${OLO+20},306 L${OLO+20},320 L${186},320 L${186},334`)}
    <text x={OLO+38} y={318} fill="#777" fontSize={5.5} fontWeight={600} style={{fontFamily:F}}>+ PX =</text>
    {style(152,334,68,24,["Medium*","(bio+oxi, sweet)"],"#B8860B")}

    <text x={OLO} y={375} textAnchor="middle" fill="#8B4513" fontSize={5.5} fontWeight={600} style={{fontFamily:F}}>Oxidatively aged wines</text>

    {/* ═══ RIGHT: BIOLOGICAL PATHWAY ═══ */}
    <rect x={216} y={196} width={208} height={190} rx={8} fill="#fdf8ee" fillOpacity={.5} stroke="#d0c880" strokeWidth={.5}/>
    <text x={FIN} y={216} textAnchor="middle" fill="#DAA520" fontSize={8} fontWeight={700} style={{fontFamily:F}}>BIOLOGICAL</text>
    <text x={FIN} y={230} textAnchor="middle" fill="#999" fontSize={5.5} style={{fontFamily:F}}>Fortified to ~15% ABV → flor grows</text>

    {box(FIN-60,240,120,22,["biological ageing","in solera (flor)"],"#fdf4e0","#DAA520")}
    {ar(FIN,262,FIN,278)}

    {/* Fino / Manzanilla output */}
    {style(FIN-54,278,108,28,["FINO / MANZANILLA","DRY, pale, yeasty"],"#DAA520")}

    {/* → Pale Cream (sweetened) */}
    {dashbend("pcr",`M${FIN+30},306 L${FIN+30},320 L${388},320 L${388},334`)}
    <text x={FIN+54} y={318} fill="#777" fontSize={5.5} fontWeight={600} style={{fontFamily:F}}>+ RCGM =</text>
    {style(355,334,66,24,["Pale Cream","(sweet)"],"#E8D088")}

    <text x={FIN} y={375} textAnchor="middle" fill="#DAA520" fontSize={5.5} fontWeight={600} style={{fontFamily:F}}>Biologically aged wines</text>

    {/* ═══ AMONTILLADO BRIDGE ═══ */}
    <rect x={154} y={394} width={152} height={50} rx={6} fill="#fff" stroke="#DAA520" strokeWidth={.7}/>
    {dashbend("amo1",`M${FIN-20},306 L${FIN-20},330 L${CX},330 L${CX},394`)}
    <text x={FIN-44} y={326} fill="#777" fontSize={6} fontWeight={600} style={{fontFamily:F}}>flor dies →</text>
    <text x={CX} y={410} textAnchor="middle" fill="#DAA520" fontSize={7} fontWeight={700} style={{fontFamily:F}}>AMONTILLADO</text>
    <text x={CX} y={424} textAnchor="middle" fill="#666" fontSize={5.5} style={{fontFamily:F}}>Starts biological → flor dies → refortify to 17%</text>
    <text x={CX} y={436} textAnchor="middle" fill="#666" fontSize={5.5} style={{fontFamily:F}}>→ oxidative ageing. BOTH types. DRY.</text>

    {/* ═══ SOLERA NOTE ═══ */}
    <rect x={16} y={458} width={W-32} height={30} rx={5} fill="#f8f6f0" stroke="#e0dcd0" strokeWidth={.4}/>
    <text x={CX} y={473} textAnchor="middle" fill="#333" fontSize={6.5} fontWeight={600} style={{fontFamily:F}}>SOLERA SYSTEM — all styles</text>
    <text x={CX} y={486} textAnchor="middle" fill="#777" fontSize={5} style={{fontFamily:F}}>Sobretabla → Criadera → Solera (oldest). Fractional blending. Never fully emptied.</text>

    {/* ═══ BOTTOM KEY ═══ */}
    <rect x={16} y={500} width={W-32} height={46} rx={5} fill="#fde8e8"/>
    <text x={CX} y={515} textAnchor="middle" fill="#802020" fontSize={6} fontWeight={700} style={{fontFamily:F}}>KEY: Fortification level = pathway</text>
    <text x={CX} y={529} textAnchor="middle" fill="#666" fontSize={5.5} style={{fontFamily:F}}>~15% → flor grows (biological) · ~17% → flor dies (oxidative) · ALL base wine is DRY</text>
    <text x={CX} y={542} textAnchor="middle" fill="#666" fontSize={5.5} style={{fontFamily:F}}>Dashed lines = sweetened commercial styles (PX, RCGM or sugar added after ageing)</text>

    <text x={CX} y={564} textAnchor="middle" fill="#bbb" fontSize={4} fontStyle="italic" style={{fontFamily:F}}>* Legislation may change requirements for Medium and Cream classifications</text>

  </svg>;
}
