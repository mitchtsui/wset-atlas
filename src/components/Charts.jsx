// Sparkling & Fortified production flow charts (SVG)
// All text uses Crimson Text to match app typography.

const F="'Crimson Text',Georgia,serif";

export function MethodChart(){
  const proc=(x,y,w,h,lines)=><g key={"p"+x+","+y}>
    <rect x={x} y={y} width={w} height={h} rx={4} fill="#eef2f0" stroke="#a0b0a8" strokeWidth={.6}/>
    {lines.map((l,i)=><text key={i} x={x+w/2} y={y+h/2+(i-(lines.length-1)/2)*10} textAnchor="middle" dominantBaseline="central" fill="#333" fontSize={5.5} style={{fontFamily:F}}>{l}</text>)}
  </g>;
  const io=(x,y,w,h,lines,accent)=><g key={"i"+x+","+y}>
    <rect x={x} y={y} width={w} height={h} rx={h/2} fill={accent?"#fceabb":"#fdf6d8"} stroke={accent?"#bfa030":"#d0c880"} strokeWidth={accent?.8:.5}/>
    {lines.map((l,i)=><text key={i} x={x+w/2} y={y+h/2+(i-(lines.length-1)/2)*10} textAnchor="middle" dominantBaseline="central" fill="#333" fontSize={5.5} fontWeight={accent?600:400} style={{fontFamily:F}}>{l}</text>)}
  </g>;
  const fin=(x,y,w,h,lines,col)=><g key={"f"+x+","+y}>
    <rect x={x} y={y} width={w} height={h} rx={6} fill={col+"22"} stroke={col} strokeWidth={.8}/>
    {lines.map((l,i)=><text key={i} x={x+w/2} y={y+h/2+(i-(lines.length-1)/2)*9} textAnchor="middle" dominantBaseline="central" fill="#333" fontSize={5} fontWeight={i===0?700:400} style={{fontFamily:F}}>{l}</text>)}
  </g>;
  const ar=(x1,y1,x2,y2)=><line key={"a"+x1+","+y1+"-"+x2+","+y2} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#888" strokeWidth={.6} markerEnd="url(#sm)"/>;
  const bend=(id,d)=><path key={id} d={d} fill="none" stroke="#888" strokeWidth={.6} markerEnd="url(#sm)"/>;

  /* Layout: 6 columns, generous spacing */
  const W=580, CX=190;
  const C1=42,C2=128,C3=218,C4=308,C5=400,C6=490;
  const BW=80, BH=22, GAP=10;

  return <svg viewBox={`0 0 ${W} 580`} style={{width:"100%",display:"block",background:"#f8fafc",borderRadius:6,border:"1px solid #e0e4e8"}}>
    <defs><marker id="sm" viewBox="0 0 6 6" refX={5} refY={3} markerWidth={4} markerHeight={4} orient="auto"><path d="M0,0 L6,3 L0,6Z" fill="#888"/></marker></defs>

    <text x={W/2} y={18} textAnchor="middle" fill="#333" fontSize={9} fontWeight={600} letterSpacing={2} style={{fontFamily:F}}>MAKING SPARKLING WINE</text>

    {/* Legend */}
    <rect x={W-90} y={10} width={10} height={8} rx={2} fill="#eef2f0" stroke="#a0b0a8" strokeWidth={.4}/>
    <text x={W-77} y={16} fill="#999" fontSize={4.5} style={{fontFamily:F}}>process</text>
    <rect x={W-90} y={22} width={10} height={8} rx={4} fill="#fdf6d8" stroke="#d0c880" strokeWidth={.4}/>
    <text x={W-77} y={28} fill="#999" fontSize={4.5} style={{fontFamily:F}}>input / output</text>

    {/* ═══ SHARED TOP ═══ */}
    {io(CX-50,38,100,18,["grapes"],true)}
    {ar(CX,56,CX,64)}
    {proc(CX-65,64,130,24,["press the grapes","and clarify the juice"])}
    {ar(CX,88,CX,96)}
    {io(CX-40,96,80,18,["juice"])}
    {ar(CX,114,CX,122)}

    {/* Main: 1st fermentation → base wine → blending */}
    {proc(CX-55,122,110,BH,["first fermentation"])}
    {ar(CX,144,CX,152)}
    {io(CX-45,152,90,18,["base wine"])}
    {ar(CX,170,CX,178)}
    {proc(CX-45,178,90,BH,["blending"])}

    {/* ═══ RIGHT BRANCH from juice: Asti + Carbonated ═══ */}
    {bend("jCh",`M${CX+40},105 L345,105 L345,122`)}
    {proc(310,122,70,BH,["chill juice"])}
    {ar(345,144,345,152)}
    {io(310,152,70,18,["store juice"])}
    {ar(345,170,345,178)}
    {proc(310,178,70,BH,["partial","fermentation"])}
    {ar(345,200,345,216)}

    {/* Asti branch */}
    {bend("jAs",`M${CX+40},105 L460,105 L460,122`)}
    {proc(420,122,80,BH,["partial","fermentation"])}
    {ar(460,144,460,152)}
    {io(418,152,84,18,["partially fermented","juice bottled"])}
    {ar(460,170,460,192)}

    {/* Ancestral branch (from partially fermented juice) */}
    {bend("jAnc",`M460,170 L${C6},170 L${C6},192`)}

    {/* ═══ liqueur de tirage ═══ */}
    {io(CX-5,204,110,16,["liqueur de tirage"],false)}

    {/* ═══ TRADITIONAL (C1) ═══ */}
    {bend("bTr",`M${CX-45},189 L${C1},189 L${C1},218`)}
    {proc(C1-BW/2,218,BW,BH,["bottle"])}
    {ar(C1,240,C1,250)}
    {proc(C1-BW/2-10,250,BW+20,24,["second fermentation","in bottle"])}
    {ar(C1,274,C1,284)}
    {proc(C1-BW/2-10,284,BW+20,24,["store wine","on the lees"])}
    {ar(C1,308,C1,318)}
    {proc(C1-35,318,70,BH,["riddle"])}
    {ar(C1,340,C1,350)}
    {proc(C1-35,350,70,BH,["disgorge"])}
    {/* l'expédition */}
    {io(C1+42,344,68,14,["liqueur d'expédition"],false)}
    {bend("leTr",`M${C1+42},351 L${C1+35},351`)}
    {ar(C1,372,C1,382)}
    {proc(C1-30,382,60,BH,["cork"])}
    {ar(C1,404,C1,420)}

    {/* ═══ TRANSFER (C2) ═══ */}
    {bend("bTf",`M${CX-45},189 L${C2},189 L${C2},218`)}
    {proc(C2-BW/2,218,BW,BH,["bottle"])}
    {ar(C2,240,C2,250)}
    {proc(C2-BW/2-10,250,BW+20,24,["second fermentation","in bottle"])}
    {ar(C2,274,C2,284)}
    {proc(C2-BW/2-10,284,BW+20,24,["store wine","on the lees"])}
    {ar(C2,308,C2,318)}
    {proc(C2-BW/2-10,318,BW+20,24,["transfer wine","into tanks"])}
    {ar(C2,342,C2,352)}
    {proc(C2-30,352,60,BH,["filter"])}
    {/* l'expédition */}
    {io(C2+38,346,68,14,["liqueur d'expédition"],false)}
    {bend("leTf",`M${C2+38},353 L${C2+30},353`)}
    {ar(C2,374,C2,384)}
    {proc(C2-30,384,60,BH,["bottle"])}
    {ar(C2,406,C2,420)}

    {/* ═══ TANK (C3) ═══ */}
    {bend("bTk",`M${CX+45},189 L${C3},189 L${C3},218`)}
    {proc(C3-BW/2-10,218,BW+20,24,["second fermentation","in tanks"])}
    {ar(C3,242,C3,254)}
    {proc(C3-30,254,60,BH,["filter"])}
    {/* l'expédition */}
    {io(C3+38,248,68,14,["liqueur d'expédition"],false)}
    {bend("leTk",`M${C3+38},255 L${C3+30},255`)}
    {ar(C3,276,C3,288)}
    {proc(C3-30,288,60,BH,["bottle"])}
    {ar(C3,310,C3,420)}

    {/* ═══ CARBONATED (C4) ═══ */}
    {proc(C4-40,218,80,BH,["inject CO₂"])}
    {bend("cbAr",`M345,216 L${C4},216 L${C4},218`)}
    {ar(C4,240,C4,252)}
    {proc(C4-30,252,60,BH,["filter"])}
    {ar(C4,274,C4,288)}
    {proc(C4-30,288,60,BH,["bottle"])}
    {ar(C4,310,C4,420)}

    {/* ═══ ASTI (C5) ═══ */}
    {proc(C5-30,218,60,BH,["chill"])}
    {bend("asAr",`M345,216 L${C5},216 L${C5},218`)}
    {ar(C5,240,C5,252)}
    {proc(C5-30,252,60,BH,["filter"])}
    {ar(C5,274,C5,288)}
    {proc(C5-30,288,60,BH,["bottle"])}
    {ar(C5,310,C5,420)}

    {/* ═══ ANCESTRAL (C6) ═══ */}
    {proc(C6-50,192,100,24,["fermentation","continues in bottle"])}
    {ar(C6,216,C6,228)}
    {proc(C6-50,228,100,24,["riddle & disgorge","(optional)"])}
    {ar(C6,252,C6,420)}

    {/* ═══ FINAL OUTPUTS ═══ */}
    {fin(C1-38,422,76,32,["Traditional","method","sparkling wine"],"#4682B4")}
    {fin(C2-38,422,76,32,["Transfer","method","sparkling wine"],"#B8860B")}
    {fin(C3-38,422,76,32,["Tank method","sparkling","wine"],"#2E8B57")}
    {fin(C4-38,422,76,32,["Carbonated","sparkling","wine"],"#999")}
    {fin(C5-38,422,76,32,["Asti method","sparkling","wine"],"#D4A017")}
    {fin(C6-38,422,76,32,["Ancestral","method","sparkling wine"],"#9B59B6")}

    {/* ═══ NOTES ═══ */}
    <text x={W/2} y={472} textAnchor="middle" fill="#444" fontSize={5.5} fontWeight={600} style={{fontFamily:F}}>AUTOLYSIS = yeast breakdown on lees → biscuit, brioche, toast (Traditional & Transfer only)</text>
    <text x={W/2} y={486} textAnchor="middle" fill="#444" fontSize={5.5} fontWeight={600} style={{fontFamily:F}}>Asti = ONE fermentation only, stopped early → low alcohol, sweet</text>
    <text x={W/2} y={500} textAnchor="middle" fill="#444" fontSize={5.5} fontWeight={600} style={{fontFamily:F}}>Ancestral = Pét-Nat: single fermentation finished in bottle, unfiltered, cloudy</text>
  </svg>;
}

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

export function SherryChart(){
  /* ── Helpers with larger sizes ── */
  const proc=(x,y,w,h,lines)=><g key={"p"+x+","+y}>
    <rect x={x} y={y} width={w} height={h} rx={4} fill="#eef2f7" stroke="#a0aab8" strokeWidth={.6}/>
    {lines.map((l,i)=><text key={i} x={x+w/2} y={y+h/2+(i-(lines.length-1)/2)*10} textAnchor="middle" dominantBaseline="central" fill="#333" fontSize={5.2} style={{fontFamily:F}}>{l}</text>)}
  </g>;
  const io=(x,y,w,h,lines,accent)=><g key={"i"+x+","+y}>
    <rect x={x} y={y} width={w} height={h} rx={h/2} fill={accent?"#fceabb":"#fdf6d8"} stroke={accent?"#bfa030":"#d0c880"} strokeWidth={accent?.8:.5}/>
    {lines.map((l,i)=><text key={i} x={x+w/2} y={y+h/2+(i-(lines.length-1)/2)*10} textAnchor="middle" dominantBaseline="central" fill="#333" fontSize={5.2} fontWeight={accent?600:400} style={{fontFamily:F}}>{l}</text>)}
  </g>;
  const fin=(x,y,w,h,lines,col)=><g key={"f"+x+","+y}>
    <rect x={x} y={y} width={w} height={h} rx={h/2.5} fill={col+"22"} stroke={col} strokeWidth={.8}/>
    {lines.map((l,i)=><text key={i} x={x+w/2} y={y+h/2+(i-(lines.length-1)/2)*9} textAnchor="middle" dominantBaseline="central" fill="#333" fontSize={5} fontWeight={i===0?700:400} style={{fontFamily:F}}>{l}</text>)}
  </g>;
  const ar=(x1,y1,x2,y2)=><line key={"a"+x1+","+y1+"-"+x2+","+y2} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#888" strokeWidth={.6} markerEnd="url(#sh2)"/>;
  const bend=(id,pts)=><path key={id} d={pts} fill="none" stroke="#888" strokeWidth={.6} markerEnd="url(#sh2)"/>;

  const W=560, CX=280;
  const PXC=80, PALC=395, OLOC=178, FINC=415;

  return <svg viewBox={`0 0 ${W} 680`} style={{width:"100%",display:"block",background:"#f8f6f4",borderRadius:6,border:"1px solid #e0dcd0"}}>
    <defs><marker id="sh2" viewBox="0 0 6 6" refX={5} refY={3} markerWidth={4} markerHeight={4} orient="auto"><path d="M0,0 L6,3 L0,6Z" fill="#888"/></marker></defs>

    {/* ═══ TITLE ═══ */}
    <text x={CX} y={18} textAnchor="middle" fill="#333" fontSize={9} fontWeight={600} letterSpacing={2} style={{fontFamily:F}}>MAKING SHERRY</text>
    <text x={CX} y={30} textAnchor="middle" fill="#999" fontSize={5} style={{fontFamily:F}}>Jerez Triangle · Albariza chalk soil · Poniente wind (cooling Atlantic)</text>

    {/* Legend */}
    <rect x={W-90} y={10} width={10} height={8} rx={2} fill="#eef2f7" stroke="#a0aab8" strokeWidth={.4}/>
    <text x={W-77} y={16} fill="#999" fontSize={4.5} style={{fontFamily:F}}>process</text>
    <rect x={W-90} y={22} width={10} height={8} rx={4} fill="#fdf6d8" stroke="#d0c880" strokeWidth={.4}/>
    <text x={W-77} y={28} fill="#999" fontSize={4.5} style={{fontFamily:F}}>input / output</text>

    {/* ═══════════════════════════════════════════════════ */}
    {/*  SECTION 1: TWO INPUT COLUMNS (y 40–160)           */}
    {/* ═══════════════════════════════════════════════════ */}

    {/* PX Column (left) */}
    {io(PXC-55,44,110,20,["sun-dried PX grapes"],true)}
    {ar(PXC,64,PXC,72)}
    {proc(PXC-50,72,100,18,["destem and crush"])}
    {ar(PXC,90,PXC,98)}
    {proc(PXC-35,98,70,18,["press"])}
    {ar(PXC,116,PXC,124)}
    {proc(PXC-60,124,120,18,["partial fermentation"])}
    {ar(PXC,142,PXC,150)}
    {proc(PXC-65,150,130,18,["fortification to 17% abv"])}
    {ar(PXC,168,PXC,178)}

    {/* Palomino Column (right) */}
    {io(PALC-55,44,110,20,["Palomino grapes"],true)}
    {ar(PALC,64,PALC,72)}
    {proc(PALC-50,72,100,18,["destem and crush"])}
    {ar(PALC,90,PALC,98)}
    {proc(PALC-35,98,70,18,["press"])}
    {ar(PALC,116,PALC,124)}
    {proc(PALC-60,124,120,18,["alcoholic fermentation"])}
    {ar(PALC,142,PALC,155)}

    {/* ═══════════════════════════════════════════════════ */}
    {/*  SECTION 2: CENTRAL NODE (y 155–210)                */}
    {/* ═══════════════════════════════════════════════════ */}

    {io(CX-55,155,110,22,["dry white wine"],true)}
    {ar(CX,177,CX,186)}
    {proc(CX-55,186,110,20,["first classification"])}

    {/* Split arrows */}
    {bend("spL",`M${CX-30},206 L${CX-30},218 L${OLOC},218 L${OLOC},230`)}
    <text x={CX-70} y={216} textAnchor="middle" fill="#8B4513" fontSize={6.5} fontWeight={700} style={{fontFamily:F}}>← Oloroso</text>

    {bend("spR",`M${CX+30},206 L${CX+30},218 L${FINC},218 L${FINC},230`)}
    <text x={CX+80} y={216} textAnchor="middle" fill="#DAA520" fontSize={6.5} fontWeight={700} style={{fontFamily:F}}>Fino →</text>

    {/* ═══════════════════════════════════════════════════ */}
    {/*  SECTION 3: THREE PROCESS COLUMNS (y 178–330)       */}
    {/* ═══════════════════════════════════════════════════ */}

    {/* PX: oxidative ageing */}
    {proc(PXC-65,178,130,22,["oxidative ageing","in solera system"])}
    {ar(PXC,200,PXC,212)}

    {/* Oloroso pathway */}
    {proc(OLOC-60,230,120,18,["fortification to 17% abv"])}
    {ar(OLOC,248,OLOC,258)}
    {io(OLOC-45,258,90,18,["sobretabla"])}
    {ar(OLOC,276,OLOC,286)}
    {proc(OLOC-60,286,120,24,["oxidative ageing","in solera system"])}
    {ar(OLOC,310,OLOC,324)}

    {/* Fino pathway */}
    {proc(FINC-60,230,120,18,["fortification to 15% abv"])}
    {ar(FINC,248,FINC,258)}
    {io(FINC-45,258,90,18,["sobretabla"])}
    {ar(FINC,276,FINC,286)}
    {proc(FINC-60,286,120,24,["biological ageing","in solera system"])}
    {ar(FINC,310,FINC,324)}

    {/* Solera labels */}
    <text x={OLOC-68} y={302} textAnchor="end" fill="#8B4513" fontSize={5} fontStyle="italic" style={{fontFamily:F}}>Solera ←</text>
    <text x={FINC+68} y={302} textAnchor="start" fill="#DAA520" fontSize={5} fontStyle="italic" style={{fontFamily:F}}>→ Solera</text>

    {/* ═══════════════════════════════════════════════════ */}
    {/*  BRANCHING TO SWEETENED/BRIDGED STYLES (y 324–420)  */}
    {/* ═══════════════════════════════════════════════════ */}

    {/* Oloroso → Cream (add PX, branch left) */}
    {bend("oCr",`M${OLOC-20},324 L${OLOC-20},342 L${105},342 L${105},360`)}
    <text x={OLOC-45} y={338} textAnchor="middle" fill="#777" fontSize={4.5} style={{fontFamily:F}}>+ add PX</text>

    {/* Oloroso → straight down */}
    {ar(OLOC,324,OLOC,360)}

    {/* Oloroso → Medium (add PX, branch right) */}
    {bend("oMd",`M${OLOC+25},324 L${OLOC+25},342 L${255},342 L${255},360`)}
    <text x={OLOC+55} y={338} textAnchor="middle" fill="#777" fontSize={4.5} style={{fontFamily:F}}>+ add PX</text>

    {/* Amontillado bridge: bio → flor dies → oxidative */}
    {bend("amo",`M${FINC-15},324 L${FINC-15},342 L${318},342 L${318},356`)}
    <text x={FINC-50} y={334} textAnchor="middle" fill="#777" fontSize={4.5} style={{fontFamily:F}}>allow flor</text>
    <text x={FINC-50} y={342} textAnchor="middle" fill="#777" fontSize={4.5} style={{fontFamily:F}}>to die out</text>

    {/* Amontillado refortification + oxidative */}
    {proc(290,356,56,20,["refortification","to 17% abv"])}
    {ar(318,376,318,386)}
    {proc(286,386,64,24,["oxidative ageing","in solera system"])}
    {ar(318,410,318,424)}

    {/* Fino straight down */}
    {ar(FINC,324,FINC,360)}

    {/* Fino → Pale Cream (add RCGM) */}
    {bend("fPc",`M${FINC+20},324 L${FINC+20},342 L${500},342 L${500},360`)}
    <text x={FINC+55} y={338} textAnchor="middle" fill="#777" fontSize={4.5} style={{fontFamily:F}}>+ add RCGM</text>

    {/* ═══════════════════════════════════════════════════ */}
    {/*  FINAL STYLE OUTPUTS (y 360–460)                    */}
    {/* ═══════════════════════════════════════════════════ */}

    {/* Group 1: Oxidatively aged (left) */}
    <rect x={8} y={208} width={160} height={244} rx={6} fill="#fdf8e0" fillOpacity={.4} stroke="#d0c880" strokeWidth={.5}/>
    <text x={88} y={448} textAnchor="middle" fill="#8B4513" fontSize={5.5} fontWeight={700} style={{fontFamily:F}}>Oxidatively aged wines</text>

    {fin(18,214,56,24,["PX","(sweet)"],"#3B1F00")}
    <text x={46} y={246} textAnchor="middle" fill="#802020" fontSize={5} fontWeight={700} style={{fontFamily:F}}>SWEET</text>

    {fin(16,362,82,28,["Cream*","Oloroso + PX"],"#8B7355")}
    {fin(102,362,60,28,["Oloroso","(dry)"],"#8B4513")}

    {/* Group 2: Both bio + oxi (centre) */}
    <rect x={218} y={356} width={128} height={100} rx={6} fill="#fff" stroke="#c0a840" strokeWidth={.5}/>
    <text x={282} y={448} textAnchor="middle" fill="#8B6914" fontSize={5} fontWeight={600} style={{fontFamily:F}}>Wines aged biologically</text>
    <text x={282} y={457} textAnchor="middle" fill="#8B6914" fontSize={5} fontWeight={600} style={{fontFamily:F}}>and oxidatively</text>

    {fin(226,362,60,28,["Medium*","(sweet)"],"#B8860B")}
    {fin(294,426,44,24,["Amontillado"],"#DAA520")}

    {/* Group 3: Biologically aged (right) */}
    <rect x={365} y={356} width={186} height={100} rx={6} fill="#fdf8e0" fillOpacity={.4} stroke="#d0c880" strokeWidth={.5}/>
    <text x={458} y={448} textAnchor="middle" fill="#DAA520" fontSize={5.5} fontWeight={700} style={{fontFamily:F}}>Biologically aged wines</text>

    {fin(375,362,76,28,["Fino /","Manzanilla"],"#DAA520")}
    {fin(465,362,76,28,["Pale Cream","(sweet)"],"#E8D088")}

    {/* ═══════════════════════════════════════════════════ */}
    {/*  NOTES & EXAM POINTS (y 465–680)                    */}
    {/* ═══════════════════════════════════════════════════ */}

    <text x={CX} y={478} textAnchor="middle" fill="#aaa" fontSize={4.2} fontStyle="italic" style={{fontFamily:F}}>* New legislation planned: Medium wines may no longer need both ageing types; Cream need not show purely oxidative characteristics.</text>

    {/* Solera bar */}
    <rect x={10} y={492} width={540} height={30} rx={4} fill="#f8f6f0" stroke="#e0dcd0" strokeWidth={.4}/>
    <text x={CX} y={504} textAnchor="middle" fill="#333" fontSize={6.5} fontWeight={600} style={{fontFamily:F}}>SOLERA SYSTEM — applies to all Sherry styles</text>
    <text x={CX} y={516} textAnchor="middle" fill="#777" fontSize={5} style={{fontFamily:F}}>Sobretabla (new wine) → Criadera (younger) → … → Solera (oldest for bottling). Fractional blending. Never fully emptied.</text>

    {/* Key exam points */}
    <rect x={10} y={530} width={540} height={100} rx={4} fill="#fde8e8"/>
    <text x={CX} y={545} textAnchor="middle" fill="#802020" fontSize={6.5} fontWeight={700} style={{fontFamily:F}}>⚠ KEY EXAM POINTS</text>
    <text x={CX} y={560} textAnchor="middle" fill="#555" fontSize={5} style={{fontFamily:F}}>ALL Sherry starts DRY. Spirit added AFTER fermentation. Palomino = dry styles. PX & Muscat of Alexandria = sweet.</text>
    <text x={CX} y={573} textAnchor="middle" fill="#555" fontSize={5} style={{fontFamily:F}}>Oloroso is NATURALLY DRY despite dark colour. Cream = Oloroso + sweetening (PX). Not all dark Sherries are sweet!</text>
    <text x={CX} y={586} textAnchor="middle" fill="#555" fontSize={5} style={{fontFamily:F}}>Amontillado = BOTH ageing types (biological → flor dies → oxidative). Manzanilla = Fino from Sanlúcar de Barrameda ONLY.</text>
    <text x={CX} y={599} textAnchor="middle" fill="#555" fontSize={5} style={{fontFamily:F}}>Fortification level determines pathway: ~15% → flor grows (biological). ~17% → flor cannot survive (oxidative).</text>
    <text x={CX} y={612} textAnchor="middle" fill="#555" fontSize={5} style={{fontFamily:F}}>Sweetened commercial styles: Cream (Oloroso + PX), Pale Cream (Fino + RCGM), Medium (bio+oxi + PX).</text>
  </svg>;
}
