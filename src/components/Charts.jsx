// Sparkling & Fortified production flow charts (SVG)
// Font matches app: Crimson Text / Georgia serif for headings & descriptions,
// sans-serif only for tiny box labels where serif would be unreadable.

const SF="'Crimson Text',Georgia,serif";
const LF="sans-serif"; // label font for small box text

export function MethodChart(){
  const B="#4682B4",G="#2E8B57",Y="#B8860B";
  const bx=(x,y,w,h,lines,f,s,sw)=><g key={lines.join("")+x}>
    <rect x={x} y={y} width={w} height={h} rx={3} fill={f} stroke={s} strokeWidth={sw||.5}/>
    {lines.map((l,i)=><text key={i} x={x+w/2} y={y+h/2+(i-(lines.length-1)/2)*8} textAnchor="middle" dominantBaseline="central" fill="#333" fontSize={5} style={{fontFamily:LF}}>{l}</text>)}
  </g>;
  const ar=(x1,y1,x2,y2)=><line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ccc" strokeWidth={.6} markerEnd="url(#sa)"/>;
  const H=26;
  return <svg viewBox="0 0 360 210" style={{width:"100%",display:"block",background:"#f8fafc",borderRadius:6,border:"1px solid #e0e4e8"}}>
    <defs><marker id="sa" viewBox="0 0 6 6" refX={5} refY={3} markerWidth={4} markerHeight={4} orient="auto"><path d="M0,0 L6,3 L0,6Z" fill="#ccc"/></marker></defs>
    <text x={180} y={12} textAnchor="middle" fill="#333" fontSize={7} fontWeight={600} letterSpacing={1.5} style={{fontFamily:SF}}>SPARKLING METHODS COMPARED</text>

    {/* Traditional */}
    <rect x={0} y={18} width={360} height={54} fill="#fff"/>
    <text x={6} y={29} fill={B} fontSize={6} fontWeight={700} style={{fontFamily:SF}}>TRADITIONAL</text>
    <text x={6} y={37} fill="#999" fontSize={4.2} style={{fontFamily:SF}}>Champagne, Cava, Crémant, Franciacorta</text>
    {bx(6,41,40,H,["Base","wine"],"#fff","#ccc")}{ar(47,54,52,54)}
    {bx(54,41,40,H,["+Yeast","+Sugar"],"#fff","#ccc")}{ar(95,54,100,54)}
    {bx(102,41,50,H,["2nd ferm","IN BOTTLE"],"#dde8f8",B,1)}{ar(153,54,158,54)}
    {bx(160,41,50,H,["Lees ageing","AUTOLYSIS"],"#e8f0ff",B,.8)}{ar(211,54,216,54)}
    {bx(218,41,38,H,["Riddling"],"#fff","#ccc")}{ar(257,54,262,54)}
    {bx(264,41,40,H,["Disgorge"],"#fff","#ccc")}{ar(305,54,310,54)}
    {bx(312,41,40,H,["Dosage"],"#fff","#ccc")}

    {/* Tank */}
    <rect x={0} y={74} width={360} height={54} fill="#f4f8f4"/>
    <text x={6} y={85} fill={G} fontSize={6} fontWeight={700} style={{fontFamily:SF}}>TANK / CHARMAT</text>
    <text x={6} y={93} fill="#999" fontSize={4.2} style={{fontFamily:SF}}>Prosecco, Asti, most Sekt</text>
    {bx(6,97,40,H,["Base","wine"],"#fff","#ccc")}{ar(47,110,52,110)}
    {bx(54,97,40,H,["+Yeast","+Sugar"],"#fff","#ccc")}{ar(95,110,100,110)}
    {bx(102,97,50,H,["2nd ferm","IN TANK"],"#e4f4e8",G,1)}{ar(153,110,158,110)}
    {bx(160,97,50,H,["Filtered","under pressure"],"#fff","#ccc")}{ar(211,110,216,110)}
    {bx(218,97,50,H,["Bottled","directly"],"#fff","#ccc")}
    <text x={286} y={106} fill="#999" fontSize={4.5} fontStyle="italic" style={{fontFamily:SF}}>No autolysis</text>
    <text x={286} y={115} fill={G} fontSize={4.5} fontWeight={600} style={{fontFamily:SF}}>= Fruity, fresh</text>

    {/* Transfer */}
    <rect x={0} y={130} width={360} height={52} fill="#fff"/>
    <text x={6} y={141} fill={Y} fontSize={6} fontWeight={700} style={{fontFamily:SF}}>TRANSFER</text>
    <text x={6} y={149} fill="#999" fontSize={4.2} style={{fontFamily:SF}}>Some New World, commercial</text>
    {bx(6,153,46,H,["Base wine"],"#fff","#ccc")}{ar(53,166,58,166)}
    {bx(60,153,56,H,["2nd ferm","IN BOTTLE"],"#f8f0e0",Y,.8)}{ar(117,166,122,166)}
    {bx(124,153,52,H,["Empty","to tank"],"#fff","#ccc")}{ar(177,166,182,166)}
    {bx(184,153,56,H,["Filter +","re-bottle"],"#fff","#ccc")}
    <text x={262} y={166} fill="#999" fontSize={4.5} fontStyle="italic" style={{fontFamily:SF}}>Bottle quality, no riddling</text>

    {/* Legend */}
    <rect x={6} y={188} width={348} height={15} rx={3} fill="#f0f2f5"/>
    <rect x={10} y={191} width={8} height={8} rx={2} fill="#dde8f8" stroke={B} strokeWidth={.6}/>
    <text x={21} y={197} fill="#666" fontSize={4.2} style={{fontFamily:SF}}>Bottle fermentation (key distinction!)</text>
    <rect x={142} y={191} width={8} height={8} rx={2} fill="#e4f4e8" stroke={G} strokeWidth={.6}/>
    <text x={153} y={197} fill="#666" fontSize={4.2} style={{fontFamily:SF}}>Tank fermentation</text>
    <text x={228} y={197} fill="#555" fontSize={4} fontWeight={600} style={{fontFamily:SF}}>AUTOLYSIS = yeast breakdown → toasty, biscuit</text>
  </svg>;
}

export function PortChart(){
  const bx=(x,y,w,h,lines,f,s,sw)=><g key={lines.join("")+x}>
    <rect x={x} y={y} width={w} height={h} rx={3} fill={f} stroke={s} strokeWidth={sw||.5}/>
    {lines.map((l,i)=><text key={i} x={x+w/2} y={y+h/2+(i-(lines.length-1)/2)*7.5} textAnchor="middle" dominantBaseline="central" fill="#333" fontSize={4.5} style={{fontFamily:LF}}>{l}</text>)}
  </g>;
  const ar=(x1,y1,x2,y2)=><line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ccc" strokeWidth={.6} markerEnd="url(#pa)"/>;
  const BH=20, RH=20;
  return <svg viewBox="0 0 360 268" style={{width:"100%",display:"block",background:"#f8f6f4",borderRadius:6,border:"1px solid #e0dcd0"}}>
    <defs><marker id="pa" viewBox="0 0 6 6" refX={5} refY={3} markerWidth={4} markerHeight={4} orient="auto"><path d="M0,0 L6,3 L0,6Z" fill="#ccc"/></marker></defs>
    <text x={180} y={12} textAnchor="middle" fill="#333" fontSize={7} fontWeight={600} letterSpacing={1.5} style={{fontFamily:SF}}>PORT PRODUCTION & STYLES</text>

    {/* Shared base */}
    <rect x={0} y={18} width={360} height={40} fill="#fff"/>
    <text x={8} y={29} fill="#8B0000" fontSize={6} fontWeight={700} style={{fontFamily:SF}}>ALL PORT</text>
    <text x={8} y={37} fill="#999" fontSize={4.2} style={{fontFamily:SF}}>Douro Valley · Touriga Nacional, Touriga Franca, Tinta Roriz</text>
    {bx(8,41,52,BH,["Crush &","ferment"],"#fff","#ccc")}
    {ar(61,51,66,51)}
    {bx(68,41,62,BH,["Add SPIRIT","at ~7% ABV"],"#ffe8e0","#C03030",.8)}
    {ar(131,51,136,51)}
    {bx(138,41,62,BH,["Fermentation","STOPS → sweet"],"#fde8e8","#C03030",.6)}

    {/* Split */}
    <rect x={0} y={60} width={180} height={100} fill="#fdf4f4"/>
    <rect x={180} y={60} width={180} height={100} fill="#fdf8f0"/>

    {/* Ruby */}
    <text x={90} y={72} textAnchor="middle" fill="#C03030" fontSize={6} fontWeight={700} style={{fontFamily:SF}}>RUBY PATHWAY</text>
    <text x={90} y={80} textAnchor="middle" fill="#999" fontSize={4} style={{fontFamily:SF}}>Reductive ageing (large vessels → preserve fruit)</text>

    {bx(8,85,52,RH,["Large","vats/tanks"],"#fff","#C03030",.5)}
    {ar(61,95,66,95)}
    {bx(68,85,52,RH,["Ruby","(basic, fruity)"],"#C0303018","#C03030",.6)}

    {bx(8,111,52,RH,["4-6 yr","large vessels"],"#fff","#802020",.5)}
    {ar(61,121,66,121)}
    {bx(68,111,52,RH,["LBV","(single vintage)"],"#80202018","#802020",.6)}

    {bx(126,85,50,RH,["DECLARED yr","→ bottle decades"],"#fff","#501818",.5)}
    {ar(151,105,151,109)}
    {bx(126,111,50,RH,["Vintage Port","(must DECANT)"],"#50181818","#501818",.8)}
    <text x={151} y={141} textAnchor="middle" fill="#501818" fontSize={3.8} fontWeight={600} style={{fontFamily:SF}}>↑ Finest & most expensive</text>

    {/* Tawny */}
    <text x={270} y={72} textAnchor="middle" fill="#C08040" fontSize={6} fontWeight={700} style={{fontFamily:SF}}>TAWNY PATHWAY</text>
    <text x={270} y={80} textAnchor="middle" fill="#999" fontSize={4} style={{fontFamily:SF}}>Oxidative ageing (small pipes → develop nutty)</text>

    {bx(188,85,56,RH,["Small barrels","(550L pipes)"],"#fff","#C08040",.5)}
    {ar(245,95,250,95)}
    {bx(252,85,56,RH,["Amber colour","Nutty, caramel"],"#C0804018","#C08040",.6)}

    {bx(188,111,56,RH,["10/20/30/40yr","Age = AVERAGE"],"#C0804010","#C08040",.6)}
    {ar(245,121,250,121)}
    {bx(252,111,56,RH,["Tawny","(indicated age)"],"#C0804018","#C08040",.6)}

    {bx(220,137,76,RH,["Colheita","= single vintage tawny"],"#A0703010","#A07030",.6)}

    {/* Key exam points */}
    <rect x={0} y={162} width={360} height={42} fill="#fff"/>
    <text x={180} y={174} textAnchor="middle" fill="#333" fontSize={5.5} fontWeight={600} style={{fontFamily:SF}}>KEY EXAM DISTINCTIONS</text>
    <rect x={8} y={178} width={168} height={22} rx={3} fill="#fdf4f4" stroke="#C03030" strokeWidth={.4}/>
    <text x={92} y={187} textAnchor="middle" fill="#802020" fontSize={4.5} style={{fontFamily:SF}}>Ruby = REDUCTIVE (fruit preserved)</text>
    <text x={92} y={195} textAnchor="middle" fill="#802020" fontSize={4.5} style={{fontFamily:SF}}>Colour stays deep red/purple</text>
    <rect x={184} y={178} width={168} height={22} rx={3} fill="#fdf8f0" stroke="#C08040" strokeWidth={.4}/>
    <text x={268} y={187} textAnchor="middle" fill="#8B6830" fontSize={4.5} style={{fontFamily:SF}}>Tawny = OXIDATIVE (nutty, dried fruit)</text>
    <text x={268} y={195} textAnchor="middle" fill="#8B6830" fontSize={4.5} style={{fontFamily:SF}}>Colour fades to amber/tawny</text>

    <rect x={8} y={208} width={344} height={13} rx={3} fill="#fde8e8"/>
    <text x={180} y={217} textAnchor="middle" fill="#802020" fontSize={4.5} fontWeight={600} style={{fontFamily:SF}}>⚠ Spirit added DURING fermentation at ~7% ABV → kills yeast → wine remains SWEET</text>

    <rect x={8} y={225} width={344} height={38} rx={3} fill="#f8f6f0"/>
    <text x={180} y={237} textAnchor="middle" fill="#777" fontSize={4.2} style={{fontFamily:SF}}>Vintage Port: DECLARED only in exceptional years (3-4/decade). Needs decades of ageing. Must DECANT.</text>
    <text x={180} y={246} textAnchor="middle" fill="#777" fontSize={4.2} style={{fontFamily:SF}}>LBV: Single vintage, 4-6yr in vessel. Ready to drink on release. Usually filtered (no decanting).</text>
    <text x={180} y={255} textAnchor="middle" fill="#777" fontSize={4.2} style={{fontFamily:SF}}>Indicated age on Tawny (10/20/30/40) = AVERAGE age of blend, NOT a minimum.</text>
  </svg>;
}

export function SherryChart(){
  const bx=(x,y,w,h,lines,f,s,sw)=><g key={lines.join("")+x}>
    <rect x={x} y={y} width={w} height={h} rx={3} fill={f} stroke={s} strokeWidth={sw||.5}/>
    {lines.map((l,i)=><text key={i} x={x+w/2} y={y+h/2+(i-(lines.length-1)/2)*7.5} textAnchor="middle" dominantBaseline="central" fill="#333" fontSize={4.5} style={{fontFamily:LF}}>{l}</text>)}
  </g>;
  const ar=(x1,y1,x2,y2)=><line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ccc" strokeWidth={.6} markerEnd="url(#sha)"/>;
  const BH=20, PH=20;
  return <svg viewBox="0 0 360 282" style={{width:"100%",display:"block",background:"#f8f6f4",borderRadius:6,border:"1px solid #e0dcd0"}}>
    <defs><marker id="sha" viewBox="0 0 6 6" refX={5} refY={3} markerWidth={4} markerHeight={4} orient="auto"><path d="M0,0 L6,3 L0,6Z" fill="#ccc"/></marker></defs>
    <text x={180} y={12} textAnchor="middle" fill="#333" fontSize={7} fontWeight={600} letterSpacing={1.5} style={{fontFamily:SF}}>SHERRY PRODUCTION & STYLES</text>

    {/* Base wine */}
    <rect x={0} y={18} width={360} height={38} fill="#fff"/>
    <text x={8} y={29} fill="#8B4513" fontSize={6} fontWeight={700} style={{fontFamily:SF}}>ALL SHERRY</text>
    <text x={8} y={37} fill="#999" fontSize={4.2} style={{fontFamily:SF}}>Palomino grape · Albariza chalk soil · Jerez Triangle</text>
    {bx(8,41,52,BH,["Ferment","to DRY"],"#fff","#ccc")}
    {ar(61,51,66,51)}
    {bx(68,41,60,BH,["All base wine","is DRY"],"#f8f0e0","#8B4513",.6)}
    {ar(129,51,134,51)}
    {bx(136,41,60,BH,["Spirit added","AFTER ferment"],"#f8f0e0","#8B4513",.8)}

    {/* Split */}
    <text x={180} y={67} textAnchor="middle" fill="#444" fontSize={5} fontWeight={600} style={{fontFamily:SF}}>Then fortified to different levels → determines ageing pathway:</text>

    <rect x={0} y={73} width={180} height={100} fill="#fdfcf0"/>
    <rect x={180} y={73} width={180} height={100} fill="#f8f4f0"/>

    {/* Biological */}
    <text x={90} y={85} textAnchor="middle" fill="#DAA520" fontSize={6} fontWeight={700} style={{fontFamily:SF}}>BIOLOGICAL AGEING</text>
    <text x={90} y={93} textAnchor="middle" fill="#999" fontSize={4} style={{fontFamily:SF}}>Fortified to ~15% → FLOR grows on surface</text>

    {bx(8,98,62,PH,["FLOR (yeast film)","protects from O₂"],"#fdf8e0","#DAA520",.8)}
    {ar(71,108,76,108)}
    {bx(78,98,46,PH,["Pale","light, fresh"],"#F5DEB318","#DAA520",.5)}

    {bx(8,124,52,PH,["FINO","Almond, yeasty"],"#F5DEB330","#DAA520",.6)}
    {bx(66,124,58,PH,["MANZANILLA","Sanlúcar ONLY"],"#EEE8AA30","#DAA520",.6)}
    <text x={90} y={152} textAnchor="middle" fill="#DAA520" fontSize={3.8} style={{fontFamily:SF}}>↑ Both DRY. Serve chilled. Drink soon after opening.</text>

    {/* Oxidative */}
    <text x={270} y={85} textAnchor="middle" fill="#8B4513" fontSize={6} fontWeight={700} style={{fontFamily:SF}}>OXIDATIVE AGEING</text>
    <text x={270} y={93} textAnchor="middle" fill="#999" fontSize={4} style={{fontFamily:SF}}>Fortified to ~17% → NO flor can grow</text>

    {bx(188,98,62,PH,["Exposed to AIR","in partial barrels"],"#f0e8e0","#8B4513",.8)}
    {ar(251,108,256,108)}
    {bx(258,98,46,PH,["Dark","rich, nutty"],"#8B451318","#8B4513",.5)}

    {bx(188,124,72,PH,["OLOROSO","Walnut, NATURALLY DRY"],"#8B451318","#8B4513",.6)}
    <text x={270} y={152} textAnchor="middle" fill="#8B4513" fontSize={3.8} style={{fontFamily:SF}}>↑ DRY despite dark colour. Not sweet!</text>

    {/* Amontillado bridge */}
    <rect x={124} y={156} width={112} height={22} rx={4} fill="#DAA52018" stroke="#DAA520" strokeWidth={.8}/>
    <text x={180} y={165} textAnchor="middle" fill="#8B6914" fontSize={5} fontWeight={700} style={{fontFamily:SF}}>AMONTILLADO</text>
    <text x={180} y={173} textAnchor="middle" fill="#8B6914" fontSize={4} style={{fontFamily:SF}}>Starts flor → flor DIES → oxidative. BOTH types. DRY.</text>
    <line x1={124} y1={167} x2={90} y2={152} stroke="#DAA520" strokeWidth={.4} strokeDasharray="2"/>
    <line x1={236} y1={167} x2={270} y2={152} stroke="#8B4513" strokeWidth={.4} strokeDasharray="2"/>

    {/* Sweetened versions */}
    <rect x={0} y={182} width={360} height={42} fill="#fff"/>
    <text x={180} y={193} textAnchor="middle" fill="#333" fontSize={5.5} fontWeight={600} style={{fontFamily:SF}}>SWEETENED STYLES (sweetness added AFTER ageing)</text>
    {bx(8,198,64,22,["Pedro Ximénez","Sun-dried grapes","Extremely sweet"],"#3B1F0018","#3B1F00",.6)}
    <text x={84} y={210} fill="#999" fontSize={5.5} style={{fontFamily:SF}}>+</text>
    {bx(94,199,60,PH,["Oloroso + PX","= CREAM Sherry"],"#8B735518","#8B7355",.6)}
    <text x={166} y={210} fill="#999" fontSize={5.5} style={{fontFamily:SF}}>+</text>
    {bx(176,199,60,PH,["Fino + sweet","= PALE Cream"],"#F5DEB318","#DAA520",.5)}
    <text x={258} y={210} fill="#999" fontSize={4} fontStyle="italic" style={{fontFamily:SF}}>Commercial styles</text>

    {/* Solera */}
    <rect x={0} y={226} width={360} height={22} fill="#f8f6f0"/>
    <text x={180} y={236} textAnchor="middle" fill="#333" fontSize={5.5} fontWeight={600} style={{fontFamily:SF}}>SOLERA SYSTEM (all Sherry)</text>
    <text x={180} y={245} textAnchor="middle" fill="#777" fontSize={4} style={{fontFamily:SF}}>Fractional blending: oldest (solera) at bottom → youngest (criaderas) at top → consistent style, no vintages</text>

    {/* Key points */}
    <rect x={8} y={252} width={344} height={25} rx={3} fill="#fde8e8"/>
    <text x={180} y={263} textAnchor="middle" fill="#802020" fontSize={4.5} fontWeight={600} style={{fontFamily:SF}}>⚠ ALL Sherry starts DRY. Spirit added AFTER fermentation. Sweetness added separately later.</text>
    <text x={180} y={273} textAnchor="middle" fill="#802020" fontSize={4.5} fontWeight={600} style={{fontFamily:SF}}>⚠ Oloroso = NATURALLY DRY. Manzanilla = Sanlúcar ONLY. Amontillado = BOTH ageing types.</text>
  </svg>;
}
