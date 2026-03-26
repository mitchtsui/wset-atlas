// Sparkling & Fortified production flow charts (SVG)
// All text uses Crimson Text to match app typography.

const F="'Crimson Text',Georgia,serif";

export function MethodChart(){
  const proc=(x,y,w,h,lines)=><g key={"p"+x+","+y}>
    <rect x={x} y={y} width={w} height={h} rx={3} fill="#eef2f0" stroke="#a0b0a8" strokeWidth={.5}/>
    {lines.map((l,i)=><text key={i} x={x+w/2} y={y+h/2+(i-(lines.length-1)/2)*7} textAnchor="middle" dominantBaseline="central" fill="#333" fontSize={3.8} style={{fontFamily:F}}>{l}</text>)}
  </g>;
  const io=(x,y,w,h,lines,accent)=><g key={"i"+x+","+y}>
    <rect x={x} y={y} width={w} height={h} rx={h/2} fill={accent?"#fceabb":"#fdf6d8"} stroke={accent?"#bfa030":"#d0c880"} strokeWidth={accent?.7:.4}/>
    {lines.map((l,i)=><text key={i} x={x+w/2} y={y+h/2+(i-(lines.length-1)/2)*7} textAnchor="middle" dominantBaseline="central" fill="#333" fontSize={3.8} fontWeight={accent?600:400} style={{fontFamily:F}}>{l}</text>)}
  </g>;
  const fin=(x,y,w,h,lines,col)=><g key={"f"+x+","+y}>
    <rect x={x} y={y} width={w} height={h} rx={h/2.5} fill={col+"22"} stroke={col} strokeWidth={.7}/>
    {lines.map((l,i)=><text key={i} x={x+w/2} y={y+h/2+(i-(lines.length-1)/2)*6.5} textAnchor="middle" dominantBaseline="central" fill="#333" fontSize={3.5} fontWeight={i===0?700:400} style={{fontFamily:F}}>{l}</text>)}
  </g>;
  const ar=(x1,y1,x2,y2)=><line key={"a"+x1+","+y1+"-"+x2+","+y2} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#888" strokeWidth={.45} markerEnd="url(#sm)"/>;
  const bend=(id,d)=><path key={id} d={d} fill="none" stroke="#888" strokeWidth={.45} markerEnd="url(#sm)"/>;

  const W=440, CX=160;
  /* 6 column centres for final outputs */
  const C1=32,C2=100,C3=175,C4=245,C5=325,C6=405;

  return <svg viewBox={`0 0 ${W} 540`} style={{width:"100%",display:"block",background:"#f8fafc",borderRadius:6,border:"1px solid #e0e4e8"}}>
    <defs><marker id="sm" viewBox="0 0 6 6" refX={5} refY={3} markerWidth={3.5} markerHeight={3.5} orient="auto"><path d="M0,0 L6,3 L0,6Z" fill="#888"/></marker></defs>

    <text x={CX} y={14} textAnchor="middle" fill="#333" fontSize={7} fontWeight={600} letterSpacing={1.5} style={{fontFamily:F}}>MAKING SPARKLING WINE</text>

    {/* Legend */}
    <rect x={330} y={8} width={8} height={6} rx={2} fill="#eef2f0" stroke="#a0b0a8" strokeWidth={.3}/>
    <text x={341} y={13} fill="#999" fontSize={3} style={{fontFamily:F}}>process</text>
    <rect x={330} y={17} width={8} height={6} rx={3} fill="#fdf6d8" stroke="#d0c880" strokeWidth={.3}/>
    <text x={341} y={22} fill="#999" fontSize={3} style={{fontFamily:F}}>input / output</text>

    {/* ══ SHARED TOP: Grapes → Press → Juice → 1st Ferm → Base Wine ══ */}
    {io(CX-40,28,80,14,["grapes"],true)}
    {ar(CX,42,CX,48)}
    {proc(CX-50,48,100,18,["press the grapes","and clarify the juice"])}
    {ar(CX,66,CX,72)}
    {io(CX-30,72,60,14,["juice"])}
    {ar(CX,86,CX,92)}

    {/* ── Juice splits: left to 1st fermentation, right branches to Asti paths ── */}
    {/* Main path: 1st fermentation → base wine */}
    {proc(CX-40,92,80,16,["first fermentation"])}
    {ar(CX,108,CX,114)}
    {io(CX-35,114,70,14,["base wine"])}
    {ar(CX,128,CX,136)}

    {/* Blending step */}
    {proc(CX-35,136,70,14,["blending"])}

    {/* ── Right branch from juice: Asti + Carbonated paths ── */}
    {/* Juice → chill juice (for carbonated) */}
    {bend("jCh",`M${CX+30},79 L280,79 L280,92`)}
    {proc(255,92,50,16,["chill juice"])}
    {ar(280,108,280,118)}
    {io(255,118,50,14,["store juice"])}
    {ar(280,132,280,140)}
    {proc(252,140,56,16,["partial","fermentation"])}
    {ar(280,156,280,168)}

    {/* Juice → partial fermentation (for Asti) */}
    {bend("jAs",`M${CX+30},79 L365,79 L365,92`)}
    {proc(335,92,60,16,["partial","fermentation"])}
    {ar(365,108,365,118)}
    {io(332,118,66,14,["partially fermented","juice bottled"])}
    {ar(365,132,365,148)}

    {/* ══ MIDDLE: Branch from base wine/blending to 4 paths ══ */}
    {/* liqueur de tirage label */}
    {io(CX-15,154,90,12,["liqueur de tirage"])}

    {/* Traditional: bottle → 2nd ferm in bottle */}
    {bend("bTr",`M${CX-35},143 L${C1},143 L${C1},170`)}
    {proc(C1-30,170,60,14,["bottle"])}
    {ar(C1,184,C1,190)}
    {proc(C1-38,190,76,16,["second fermentation","in bottle"])}
    {ar(C1,206,C1,214)}
    {proc(C1-38,214,76,16,["store wine on","the lees"])}
    {ar(C1,230,C1,240)}

    {/* Traditional → riddle */}
    {proc(C1-26,240,52,14,["riddle"])}
    {ar(C1,254,C1,262)}
    {proc(C1-26,262,52,14,["disgorge"])}
    {ar(C1,276,C1,282)}

    {/* liqueur d'expédition for Traditional */}
    {io(C1+30,272,52,10,["liqueur","d'expédition"])}
    {bend("leTr",`M${C1+30},277 L${C1+26},277`)}

    {proc(C1-20,282,40,14,["cork"])}
    {ar(C1,296,C1,306)}

    {/* Transfer: also starts from bottle */}
    {bend("bTf",`M${CX-35},143 L${C2},143 L${C2},170`)}
    {proc(C2-30,170,60,14,["bottle"])}
    {ar(C2,184,C2,190)}
    {proc(C2-38,190,76,16,["second fermentation","in bottle"])}
    {ar(C2,206,C2,214)}
    {proc(C2-38,214,76,16,["store wine on","the lees"])}
    {ar(C2,230,C2,240)}

    {/* Transfer → transfer to tanks */}
    {proc(C2-38,240,76,16,["transfer wine","into tanks"])}
    {ar(C2,256,C2,264)}
    {proc(C2-22,264,44,14,["filter"])}
    {ar(C2,278,C2,286)}

    {/* liqueur d'expédition for Transfer */}
    {io(C2+30,276,52,10,["liqueur","d'expédition"])}
    {bend("leTf",`M${C2+30},281 L${C2+22},281`)}

    {proc(C2-22,286,44,14,["bottle"])}
    {ar(C2,300,C2,306)}

    {/* Tank: 2nd fermentation in tanks */}
    {bend("bTk",`M${CX+35},143 L${C3},143 L${C3},170`)}
    {proc(C3-38,170,76,16,["second fermentation","in tanks"])}
    {ar(C3,186,C3,196)}
    {proc(C3-22,196,44,14,["filter"])}
    {ar(C3,210,C3,218)}

    {/* liqueur d'expédition for Tank */}
    {io(C3+28,210,52,10,["liqueur","d'expédition"])}
    {bend("leTk",`M${C3+28},215 L${C3+22},215`)}

    {proc(C3-22,218,44,14,["bottle"])}
    {ar(C3,232,C3,306)}

    {/* Carbonated: inject CO₂ */}
    {/* from stored juice → partial ferm → inject CO₂ */}
    {proc(C4-28,168,56,14,["inject CO₂"])}
    {bend("cbAr",`M280,168 L${C4},168`)}
    {ar(C4,182,C4,190)}
    {proc(C4-22,190,44,14,["filter"])}
    {ar(C4,204,C4,212)}
    {proc(C4-22,212,44,14,["bottle"])}
    {ar(C4,226,C4,306)}

    {/* Asti: chill → filter → bottle */}
    {proc(C5-22,168,44,14,["chill"])}
    {bend("asAr",`M280,168 L${C5},162 L${C5},168`)}
    {ar(C5,182,C5,190)}
    {proc(C5-22,190,44,14,["filter"])}
    {ar(C5,204,C5,212)}
    {proc(C5-22,212,44,14,["bottle"])}
    {ar(C5,226,C5,306)}

    {/* Ancestral: fermentation continues in bottle */}
    {proc(C6-38,148,76,16,["fermentation","continues in bottle"])}
    {ar(C6,164,C6,176)}
    {proc(C6-38,176,76,16,["riddle and disgorge","(optional)"])}
    {ar(C6,192,C6,306)}

    {/* ══ FINAL OUTPUT ROW ══ */}
    {fin(C1-30,308,60,26,["Traditional","method","sparkling wine"],"#4682B4")}
    {fin(C2-30,308,60,26,["Transfer","method","sparkling wine"],"#B8860B")}
    {fin(C3-30,308,60,26,["Tank method","sparkling","wine"],"#2E8B57")}
    {fin(C4-30,308,60,26,["Carbonated","sparkling","wine"],"#999")}
    {fin(C5-30,308,60,26,["Asti method","sparkling","wine"],"#D4A017")}
    {fin(C6-30,308,60,26,["Ancestral","method","sparkling wine"],"#9B59B6")}

    {/* ══ KEY NOTES ══ */}
    <text x={CX} y={350} textAnchor="middle" fill="#555" fontSize={4} fontWeight={600} style={{fontFamily:F}}>AUTOLYSIS = yeast breakdown on lees → biscuit, brioche, toast (Traditional & Transfer only)</text>
    <text x={CX} y={360} textAnchor="middle" fill="#555" fontSize={4} fontWeight={600} style={{fontFamily:F}}>Asti = ONE fermentation only, stopped early → low alcohol, sweet. Ancestral = Pét-Nat, single fermentation finished in bottle.</text>
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
  /* ── helpers ── */
  const proc=(x,y,w,h,lines)=><g key={"p"+x+","+y}>
    <rect x={x} y={y} width={w} height={h} rx={3} fill="#eef2f7" stroke="#a0aab8" strokeWidth={.5}/>
    {lines.map((l,i)=><text key={i} x={x+w/2} y={y+h/2+(i-(lines.length-1)/2)*7} textAnchor="middle" dominantBaseline="central" fill="#333" fontSize={3.8} style={{fontFamily:F}}>{l}</text>)}
  </g>;
  const io=(x,y,w,h,lines,accent)=><g key={"i"+x+","+y}>
    <rect x={x} y={y} width={w} height={h} rx={h/2} fill={accent?"#fceabb":"#fdf6d8"} stroke={accent?"#bfa030":"#d0c880"} strokeWidth={accent?.7:.4}/>
    {lines.map((l,i)=><text key={i} x={x+w/2} y={y+h/2+(i-(lines.length-1)/2)*7} textAnchor="middle" dominantBaseline="central" fill="#333" fontSize={3.8} fontWeight={accent?600:400} style={{fontFamily:F}}>{l}</text>)}
  </g>;
  const fin=(x,y,w,h,lines,col)=><g key={"f"+x+","+y}>
    <rect x={x} y={y} width={w} height={h} rx={h/2.5} fill={col+"22"} stroke={col} strokeWidth={.7}/>
    {lines.map((l,i)=><text key={i} x={x+w/2} y={y+h/2+(i-(lines.length-1)/2)*6.5} textAnchor="middle" dominantBaseline="central" fill="#333" fontSize={3.8} fontWeight={i===0?700:400} style={{fontFamily:F}}>{l}</text>)}
  </g>;
  const ar=(x1,y1,x2,y2)=><line key={"a"+x1+","+y1+"-"+x2+","+y2} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#888" strokeWidth={.45} markerEnd="url(#sh2)"/>;
  const bend=(id,pts)=><path key={id} d={pts} fill="none" stroke="#888" strokeWidth={.45} markerEnd="url(#sh2)"/>;

  const W=440, CX=220;
  const PXC=65, PALC=310, OLOC=140, FINC=330;

  return <svg viewBox={`0 0 ${W} 520`} style={{width:"100%",display:"block",background:"#f8f6f4",borderRadius:6,border:"1px solid #e0dcd0"}}>
    <defs><marker id="sh2" viewBox="0 0 6 6" refX={5} refY={3} markerWidth={3.5} markerHeight={3.5} orient="auto"><path d="M0,0 L6,3 L0,6Z" fill="#888"/></marker></defs>

    {/* ══ TITLE ══ */}
    <text x={CX} y={14} textAnchor="middle" fill="#333" fontSize={7} fontWeight={600} letterSpacing={1.5} style={{fontFamily:F}}>MAKING SHERRY</text>
    <text x={CX} y={23} textAnchor="middle" fill="#999" fontSize={3.8} style={{fontFamily:F}}>Jerez Triangle · Albariza chalk soil · Poniente wind (cooling Atlantic)</text>

    {/* Legend */}
    <rect x={372} y={8} width={8} height={6} rx={2} fill="#eef2f7" stroke="#a0aab8" strokeWidth={.3}/>
    <text x={383} y={13} fill="#999" fontSize={3} style={{fontFamily:F}}>process</text>
    <rect x={372} y={17} width={8} height={6} rx={3} fill="#fdf6d8" stroke="#d0c880" strokeWidth={.3}/>
    <text x={383} y={22} fill="#999" fontSize={3} style={{fontFamily:F}}>input / output</text>

    {/* ══════════════════════════════════════════════ */}
    {/*  SECTION 1: TWO INPUT COLUMNS (y 30–120)      */}
    {/* ══════════════════════════════════════════════ */}

    {/* PX Column (far left) */}
    {io(25,32,80,14,["sun-dried PX grapes"],true)}
    {ar(PXC,46,PXC,51)}
    {proc(28,51,74,13,["destem and crush"])}
    {ar(PXC,64,PXC,69)}
    {proc(38,69,54,13,["press"])}
    {ar(PXC,82,PXC,87)}
    {proc(22,87,86,13,["partial fermentation"])}
    {ar(PXC,100,PXC,105)}
    {proc(16,105,98,13,["fortification to 17% abv"])}
    {ar(PXC,118,PXC,123)}

    {/* Palomino Column (right) */}
    {io(270,32,80,14,["Palomino grapes"],true)}
    {ar(PALC,46,PALC,51)}
    {proc(273,51,74,13,["destem and crush"])}
    {ar(PALC,64,PALC,69)}
    {proc(283,69,54,13,["press"])}
    {ar(PALC,82,PALC,87)}
    {proc(265,87,90,13,["alcoholic fermentation"])}
    {ar(PALC,100,PALC,108)}

    {/* ══════════════════════════════════════════════ */}
    {/*  SECTION 2: CENTRAL NODE (y 108–160)           */}
    {/* ══════════════════════════════════════════════ */}

    {io(180,108,80,16,["dry white wine"],true)}
    {ar(CX,124,CX,132)}
    {proc(182,132,76,14,["first classification"])}

    {/* Split to Oloroso (left) */}
    {bend("spL","M200,146 L200,155 L"+OLOC+",155 L"+OLOC+",164")}
    <text x={166} y={153} textAnchor="middle" fill="#8B4513" fontSize={4.5} fontWeight={700} style={{fontFamily:F}}>← Oloroso</text>

    {/* Split to Fino (right) */}
    {bend("spR","M240,146 L240,155 L"+FINC+",155 L"+FINC+",164")}
    <text x={290} y={153} textAnchor="middle" fill="#DAA520" fontSize={4.5} fontWeight={700} style={{fontFamily:F}}>Fino →</text>

    {/* ══════════════════════════════════════════════ */}
    {/*  SECTION 3: THREE PROCESS COLUMNS (y 123–260)  */}
    {/* ══════════════════════════════════════════════ */}

    {/* ─── PX: oxidative ageing ─── */}
    {proc(16,123,98,18,["oxidative ageing","in solera system"])}
    {ar(PXC,141,PXC,150)}

    {/* ─── Oloroso pathway ─── */}
    {proc(96,164,88,13,["fortification to 17% abv"])}
    {ar(OLOC,177,OLOC,184)}
    {io(108,184,64,13,["sobretabla"])}
    {ar(OLOC,197,OLOC,204)}
    {proc(96,204,88,18,["oxidative ageing","in solera system"])}
    {ar(OLOC,222,OLOC,230)}

    {/* ─── Fino pathway ─── */}
    {proc(286,164,88,13,["fortification to 15% abv"])}
    {ar(FINC,177,FINC,184)}
    {io(298,184,64,13,["sobretabla"])}
    {ar(FINC,197,FINC,204)}
    {proc(286,204,88,18,["biological ageing","in solera system"])}
    {ar(FINC,222,FINC,230)}

    {/* Solera side-labels */}
    <text x={92} y={216} textAnchor="end" fill="#8B4513" fontSize={3.5} fontStyle="italic" style={{fontFamily:F}}>Solera ←</text>
    <text x={378} y={216} textAnchor="start" fill="#DAA520" fontSize={3.5} fontStyle="italic" style={{fontFamily:F}}>→ Solera</text>

    {/* ─── Branching arrows to sweetened / bridged styles ─── */}

    {/* Oloroso → Cream (add PX, branch left) */}
    {bend("oCr","M120,230 L120,244 L85,244 L85,258")}
    <text x={96} y={240} textAnchor="middle" fill="#777" fontSize={3.2} style={{fontFamily:F}}>+ add PX</text>

    {/* Oloroso → straight down to Oloroso output */}
    {ar(OLOC,230,OLOC,258)}

    {/* Oloroso → Medium (add PX, branch centre) */}
    {bend("oMd","M158,230 L158,244 L200,244 L200,258")}
    <text x={183} y={240} textAnchor="middle" fill="#777" fontSize={3.2} style={{fontFamily:F}}>+ add PX</text>

    {/* Amontillado bridge: bio → flor dies → oxidative */}
    {bend("amo","M315,230 L315,244 L255,244 L255,254")}
    <text x={282} y={238} textAnchor="middle" fill="#777" fontSize={3.2} style={{fontFamily:F}}>allow flor</text>
    <text x={282} y={244} textAnchor="middle" fill="#777" fontSize={3.2} style={{fontFamily:F}}>to die out</text>

    {/* Amontillado: refortification → oxidative ageing */}
    {proc(230,254,50,14,["refortification","to 17% abv"])}
    {ar(255,268,255,276)}
    {proc(226,276,58,18,["oxidative ageing","in solera system"])}
    {ar(255,294,255,306)}

    {/* Fino straight down to output */}
    {ar(FINC,230,FINC,258)}

    {/* Fino → Pale Cream (add RCGM, branch right) */}
    {bend("fPc","M348,230 L348,244 L400,244 L400,258")}
    <text x={380} y={240} textAnchor="middle" fill="#777" fontSize={3.2} style={{fontFamily:F}}>+ add RCGM</text>

    {/* ══════════════════════════════════════════════ */}
    {/*  SECTION 4: FINAL STYLE OUTPUTS (y 254–340)    */}
    {/* ══════════════════════════════════════════════ */}

    {/* ─── Group 1: Oxidatively aged (left) ─── */}
    <rect x={6} y={148} width={126} height={176} rx={5} fill="#fdf8e0" fillOpacity={.45} stroke="#d0c880" strokeWidth={.4}/>
    <text x={69} y={322} textAnchor="middle" fill="#8B4513" fontSize={4} fontWeight={700} style={{fontFamily:F}}>Oxidatively aged wines</text>

    {/* PX output */}
    {fin(18,152,42,18,["PX","(sweet)"],"#3B1F00")}
    <text x={39} y={176} textAnchor="middle" fill="#802020" fontSize={3.5} fontWeight={700} style={{fontFamily:F}}>SWEET</text>

    {/* Cream output */}
    {fin(14,260,64,22,["Cream*","Oloroso + PX"],"#8B7355")}

    {/* Oloroso output */}
    {fin(84,260,44,22,["Oloroso","(dry)"],"#8B4513")}

    {/* ─── Group 2: Both bio + oxi (centre) ─── */}
    <rect x={170} y={256} width={102} height={70} rx={5} fill="#fff" stroke="#c0a840" strokeWidth={.4}/>
    <text x={221} y={322} textAnchor="middle" fill="#8B6914" fontSize={3.8} fontWeight={600} style={{fontFamily:F}}>Wines aged biologically</text>
    <text x={221} y={328} textAnchor="middle" fill="#8B6914" fontSize={3.8} fontWeight={600} style={{fontFamily:F}}>and oxidatively</text>

    {/* Medium output */}
    {fin(176,262,48,20,["Medium*","(sweet)"],"#B8860B")}

    {/* Amontillado output */}
    {fin(228,308,38,18,["Amontillado"],"#DAA520")}

    {/* ─── Group 3: Biologically aged (right) ─── */}
    <rect x={286} y={254} width={148} height={72} rx={5} fill="#fdf8e0" fillOpacity={.45} stroke="#d0c880" strokeWidth={.4}/>
    <text x={360} y={322} textAnchor="middle" fill="#DAA520" fontSize={4} fontWeight={700} style={{fontFamily:F}}>Biologically aged wines</text>

    {/* Fino/Manzanilla output */}
    {fin(294,260,64,22,["Fino /","Manzanilla"],"#DAA520")}

    {/* Pale Cream output */}
    {fin(370,260,58,22,["Pale Cream","(sweet)"],"#E8D088")}

    {/* ══════════════════════════════════════════════ */}
    {/*  SECTION 5: NOTES & EXAM POINTS (y 335–520)    */}
    {/* ══════════════════════════════════════════════ */}

    <text x={CX} y={344} textAnchor="middle" fill="#aaa" fontSize={3} fontStyle="italic" style={{fontFamily:F}}>* New legislation planned: Medium wines may no longer need both ageing types; Cream need not show purely oxidative characteristics.</text>

    {/* Solera bar */}
    <rect x={8} y={354} width={424} height={22} rx={3} fill="#f8f6f0" stroke="#e0dcd0" strokeWidth={.3}/>
    <text x={CX} y={363} textAnchor="middle" fill="#333" fontSize={5} fontWeight={600} style={{fontFamily:F}}>SOLERA SYSTEM — applies to all Sherry styles</text>
    <text x={CX} y={372} textAnchor="middle" fill="#777" fontSize={3.8} style={{fontFamily:F}}>Sobretabla (new wine) → Criadera (younger) → … → Solera (oldest for bottling). Fractional blending. Never fully emptied.</text>

    {/* Key exam points */}
    <rect x={8} y={382} width={424} height={68} rx={3} fill="#fde8e8"/>
    <text x={CX} y={393} textAnchor="middle" fill="#802020" fontSize={5} fontWeight={700} style={{fontFamily:F}}>⚠ KEY EXAM POINTS</text>
    <text x={CX} y={403} textAnchor="middle" fill="#666" fontSize={3.8} style={{fontFamily:F}}>ALL Sherry starts DRY. Spirit added AFTER fermentation. Palomino = dry styles. PX & Muscat of Alexandria = sweet.</text>
    <text x={CX} y={412} textAnchor="middle" fill="#666" fontSize={3.8} style={{fontFamily:F}}>Oloroso is NATURALLY DRY despite dark colour. Cream = Oloroso + sweetening (PX). Not all dark Sherries are sweet!</text>
    <text x={CX} y={421} textAnchor="middle" fill="#666" fontSize={3.8} style={{fontFamily:F}}>Amontillado = BOTH ageing types (biological → flor dies → oxidative). Manzanilla = Fino from Sanlúcar de Barrameda ONLY.</text>
    <text x={CX} y={430} textAnchor="middle" fill="#666" fontSize={3.8} style={{fontFamily:F}}>Fortification level determines pathway: ~15% → flor grows (biological). ~17% → flor cannot survive (oxidative).</text>
    <text x={CX} y={439} textAnchor="middle" fill="#666" fontSize={3.8} style={{fontFamily:F}}>Sweetened commercial styles: Cream (Oloroso + PX), Pale Cream (Fino + RCGM), Medium (bio+oxi + PX).</text>
  </svg>;
}
