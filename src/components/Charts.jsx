// Sparkling & Fortified production flow charts (SVG)

export function MethodChart(){
  const B="#4682B4",G="#2E8B57",Y="#B8860B";
  const F="sans-serif";
  const bx=(x,y,w,h,lines,f,s,sw)=><g key={lines.join("")+x}>
    <rect x={x} y={y} width={w} height={h} rx={3} fill={f} stroke={s} strokeWidth={sw||.6}/>
    {lines.map((l,i)=><text key={i} x={x+w/2} y={y+h/2+(i-(lines.length-1)/2)*9} textAnchor="middle" dominantBaseline="central" fill="#333" fontSize={5.8} style={{fontFamily:F}}>{l}</text>)}
  </g>;
  const ar=(x1,y1,x2,y2)=><line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#bbb" strokeWidth={.7} markerEnd="url(#sa)"/>;
  const H=28;
  return <svg viewBox="0 0 360 220" style={{width:"100%",display:"block",background:"#f8fafc",borderRadius:6,border:"1px solid #e0e4e8"}}>
    <defs><marker id="sa" viewBox="0 0 6 6" refX={5} refY={3} markerWidth={4} markerHeight={4} orient="auto"><path d="M0,0 L6,3 L0,6Z" fill="#bbb"/></marker></defs>
    <text x={180} y={13} textAnchor="middle" fill="#333" fontSize={8} fontWeight={700} letterSpacing={2} style={{fontFamily:F}}>SPARKLING METHODS COMPARED</text>

    {/* Traditional */}
    <rect x={0} y={19} width={360} height={58} fill="#fff"/>
    <text x={6} y={31} fill={B} fontSize={7} fontWeight={700} style={{fontFamily:F}}>TRADITIONAL</text>
    <text x={6} y={40} fill="#888" fontSize={4.8} style={{fontFamily:F}}>Champagne, Cava, Crémant, Franciacorta</text>
    {bx(6,44,40,H,["Base","wine"],"#fff","#ccc")}{ar(47,58,52,58)}
    {bx(54,44,40,H,["+Yeast","+Sugar"],"#fff","#ccc")}{ar(95,58,100,58)}
    {bx(102,44,50,H,["2nd ferm","IN BOTTLE"],"#dde8f8",B,1.2)}{ar(153,58,158,58)}
    {bx(160,44,50,H,["Lees ageing","AUTOLYSIS"],"#e8f0ff",B,1)}{ar(211,58,216,58)}
    {bx(218,44,38,H,["Riddling"],"#fff","#ccc")}{ar(257,58,262,58)}
    {bx(264,44,40,H,["Disgorge"],"#fff","#ccc")}{ar(305,58,310,58)}
    {bx(312,44,40,H,["Dosage"],"#fff","#ccc")}

    {/* Tank */}
    <rect x={0} y={79} width={360} height={58} fill="#f4f8f4"/>
    <text x={6} y={91} fill={G} fontSize={7} fontWeight={700} style={{fontFamily:F}}>TANK / CHARMAT</text>
    <text x={6} y={100} fill="#888" fontSize={4.8} style={{fontFamily:F}}>Prosecco, Asti, most Sekt</text>
    {bx(6,104,40,H,["Base","wine"],"#fff","#ccc")}{ar(47,118,52,118)}
    {bx(54,104,40,H,["+Yeast","+Sugar"],"#fff","#ccc")}{ar(95,118,100,118)}
    {bx(102,104,50,H,["2nd ferm","IN TANK"],"#e4f4e8",G,1.2)}{ar(153,118,158,118)}
    {bx(160,104,50,H,["Filtered","under pressure"],"#fff","#ccc")}{ar(211,118,216,118)}
    {bx(218,104,50,H,["Bottled","directly"],"#fff","#ccc")}
    <text x={286} y={114} fill="#888" fontSize={5.5} fontStyle="italic" style={{fontFamily:F}}>No autolysis</text>
    <text x={286} y={124} fill={G} fontSize={5.5} fontWeight={600} style={{fontFamily:F}}>= Fruity, fresh</text>

    {/* Transfer */}
    <rect x={0} y={139} width={360} height={55} fill="#fff"/>
    <text x={6} y={151} fill={Y} fontSize={7} fontWeight={700} style={{fontFamily:F}}>TRANSFER</text>
    <text x={6} y={160} fill="#888" fontSize={4.8} style={{fontFamily:F}}>Some New World, commercial</text>
    {bx(6,164,46,H,["Base wine"],"#fff","#ccc")}{ar(53,178,58,178)}
    {bx(60,164,56,H,["2nd ferm","IN BOTTLE"],"#f8f0e0",Y,.8)}{ar(117,178,122,178)}
    {bx(124,164,52,H,["Empty","to tank"],"#fff","#ccc")}{ar(177,178,182,178)}
    {bx(184,164,56,H,["Filter +","re-bottle"],"#fff","#ccc")}
    <text x={262} y={178} fill="#888" fontSize={5.5} fontStyle="italic" style={{fontFamily:F}}>Bottle quality, no riddling</text>

    {/* Legend */}
    <rect x={6} y={198} width={348} height={16} rx={3} fill="#f0f2f5"/>
    <rect x={10} y={201.5} width={9} height={9} rx={2} fill="#dde8f8" stroke={B} strokeWidth={.8}/>
    <text x={22} y={208} fill="#555" fontSize={4.8} style={{fontFamily:F}}>Bottle fermentation (key distinction!)</text>
    <rect x={142} y={201.5} width={9} height={9} rx={2} fill="#e4f4e8" stroke={G} strokeWidth={.8}/>
    <text x={154} y={208} fill="#555" fontSize={4.8} style={{fontFamily:F}}>Tank fermentation</text>
    <text x={228} y={208} fill="#444" fontSize={4.5} fontWeight={600} style={{fontFamily:F}}>AUTOLYSIS = yeast breakdown → toasty, biscuit</text>
  </svg>;
}

export function PortChart(){
  const F="sans-serif";
  const bx=(x,y,w,h,lines,f,s,sw)=><g key={lines.join("")+x}>
    <rect x={x} y={y} width={w} height={h} rx={3} fill={f} stroke={s} strokeWidth={sw||.6}/>
    {lines.map((l,i)=><text key={i} x={x+w/2} y={y+h/2+(i-(lines.length-1)/2)*8} textAnchor="middle" dominantBaseline="central" fill="#333" fontSize={5} style={{fontFamily:F}}>{l}</text>)}
  </g>;
  const ar=(x1,y1,x2,y2)=><line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#bbb" strokeWidth={.7} markerEnd="url(#pa)"/>;
  const BH=22, RH=22;
  return <svg viewBox="0 0 360 275" style={{width:"100%",display:"block",background:"#f8f6f4",borderRadius:6,border:"1px solid #e0dcd0"}}>
    <defs><marker id="pa" viewBox="0 0 6 6" refX={5} refY={3} markerWidth={4} markerHeight={4} orient="auto"><path d="M0,0 L6,3 L0,6Z" fill="#bbb"/></marker></defs>
    <text x={180} y={13} textAnchor="middle" fill="#333" fontSize={8} fontWeight={700} letterSpacing={2} style={{fontFamily:F}}>PORT PRODUCTION & STYLES</text>

    {/* Shared base */}
    <rect x={0} y={19} width={360} height={42} fill="#fff"/>
    <text x={8} y={31} fill="#8B0000" fontSize={7} fontWeight={700} style={{fontFamily:F}}>ALL PORT</text>
    <text x={8} y={40} fill="#888" fontSize={4.8} style={{fontFamily:F}}>Douro Valley · Touriga Nacional, Touriga Franca, Tinta Roriz</text>
    {bx(8,44,52,BH,["Crush &","ferment"],"#fff","#ccc")}
    {ar(61,55,66,55)}
    {bx(68,44,62,BH,["Add SPIRIT","at ~7% ABV"],"#ffe8e0","#C03030",1)}
    {ar(131,55,136,55)}
    {bx(138,44,62,BH,["Fermentation","STOPS → sweet"],"#fde8e8","#C03030",.8)}

    {/* Split */}
    <rect x={0} y={63} width={180} height={104} fill="#fdf4f4"/>
    <rect x={180} y={63} width={180} height={104} fill="#fdf8f0"/>

    {/* Ruby */}
    <text x={90} y={76} textAnchor="middle" fill="#C03030" fontSize={7} fontWeight={700} style={{fontFamily:F}}>RUBY PATHWAY</text>
    <text x={90} y={84} textAnchor="middle" fill="#888" fontSize={4.5} style={{fontFamily:F}}>Reductive ageing (large vessels → preserve fruit)</text>

    {bx(8,90,52,RH,["Large","vats/tanks"],"#fff","#C03030",.6)}
    {ar(61,101,66,101)}
    {bx(68,90,52,RH,["Ruby","(basic, fruity)"],"#C0303018","#C03030",.8)}

    {bx(8,118,52,RH,["4-6 yr","large vessels"],"#fff","#802020",.6)}
    {ar(61,129,66,129)}
    {bx(68,118,52,RH,["LBV","(single vintage)"],"#80202018","#802020",.8)}

    {bx(126,90,50,RH,["DECLARED yr","→ bottle decades"],"#fff","#501818",.6)}
    {ar(151,112,151,116)}
    {bx(126,118,50,RH,["Vintage Port","(must DECANT)"],"#50181818","#501818",1)}
    <text x={151} y={150} textAnchor="middle" fill="#501818" fontSize={4} fontWeight={700} style={{fontFamily:F}}>↑ Finest & most expensive</text>

    {/* Tawny */}
    <text x={270} y={76} textAnchor="middle" fill="#C08040" fontSize={7} fontWeight={700} style={{fontFamily:F}}>TAWNY PATHWAY</text>
    <text x={270} y={84} textAnchor="middle" fill="#888" fontSize={4.5} style={{fontFamily:F}}>Oxidative ageing (small pipes → develop nutty)</text>

    {bx(188,90,56,RH,["Small barrels","(550L pipes)"],"#fff","#C08040",.6)}
    {ar(245,101,250,101)}
    {bx(252,90,56,RH,["Amber colour","Nutty, caramel"],"#C0804018","#C08040",.8)}

    {bx(188,118,56,RH,["10/20/30/40yr","Age = AVERAGE"],"#C0804010","#C08040",.8)}
    {ar(245,129,250,129)}
    {bx(252,118,56,RH,["Tawny","(indicated age)"],"#C0804018","#C08040",.8)}

    {bx(220,146,76,RH,["Colheita","= single vintage tawny"],"#A0703010","#A07030",.8)}

    {/* Key exam points */}
    <rect x={0} y={170} width={360} height={44} fill="#fff"/>
    <text x={180} y={183} textAnchor="middle" fill="#333" fontSize={6} fontWeight={700} style={{fontFamily:F}}>KEY EXAM DISTINCTIONS</text>
    <rect x={8} y={188} width={168} height={22} rx={3} fill="#fdf4f4" stroke="#C03030" strokeWidth={.5}/>
    <text x={92} y={197} textAnchor="middle" fill="#802020" fontSize={5} style={{fontFamily:F}}>Ruby = REDUCTIVE (fruit preserved)</text>
    <text x={92} y={205} textAnchor="middle" fill="#802020" fontSize={5} style={{fontFamily:F}}>Colour stays deep red/purple</text>
    <rect x={184} y={188} width={168} height={22} rx={3} fill="#fdf8f0" stroke="#C08040" strokeWidth={.5}/>
    <text x={268} y={197} textAnchor="middle" fill="#8B6830" fontSize={5} style={{fontFamily:F}}>Tawny = OXIDATIVE (nutty, dried fruit)</text>
    <text x={268} y={205} textAnchor="middle" fill="#8B6830" fontSize={5} style={{fontFamily:F}}>Colour fades to amber/tawny</text>

    <rect x={8} y={216} width={344} height={14} rx={3} fill="#fde8e8"/>
    <text x={180} y={225} textAnchor="middle" fill="#802020" fontSize={5.5} fontWeight={600} style={{fontFamily:F}}>⚠ Spirit added DURING fermentation at ~7% ABV → kills yeast → wine remains SWEET</text>

    <rect x={8} y={234} width={344} height={36} rx={3} fill="#f8f6f0"/>
    <text x={180} y={246} textAnchor="middle" fill="#666" fontSize={4.8} style={{fontFamily:F}}>Vintage Port: DECLARED only in exceptional years (3-4/decade). Needs decades of ageing. Must DECANT.</text>
    <text x={180} y={255} textAnchor="middle" fill="#666" fontSize={4.8} style={{fontFamily:F}}>LBV: Single vintage, 4-6yr in vessel. Ready to drink on release. Usually filtered (no decanting).</text>
    <text x={180} y={264} textAnchor="middle" fill="#666" fontSize={4.8} style={{fontFamily:F}}>Indicated age on Tawny (10/20/30/40) = AVERAGE age of blend, NOT a minimum.</text>
  </svg>;
}

export function SherryChart(){
  const F="sans-serif";
  const bx=(x,y,w,h,lines,f,s,sw)=><g key={lines.join("")+x}>
    <rect x={x} y={y} width={w} height={h} rx={3} fill={f} stroke={s} strokeWidth={sw||.6}/>
    {lines.map((l,i)=><text key={i} x={x+w/2} y={y+h/2+(i-(lines.length-1)/2)*8} textAnchor="middle" dominantBaseline="central" fill="#333" fontSize={5} style={{fontFamily:F}}>{l}</text>)}
  </g>;
  const ar=(x1,y1,x2,y2)=><line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#bbb" strokeWidth={.7} markerEnd="url(#sha)"/>;
  const BH=20, PH=22;
  return <svg viewBox="0 0 360 290" style={{width:"100%",display:"block",background:"#f8f6f4",borderRadius:6,border:"1px solid #e0dcd0"}}>
    <defs><marker id="sha" viewBox="0 0 6 6" refX={5} refY={3} markerWidth={4} markerHeight={4} orient="auto"><path d="M0,0 L6,3 L0,6Z" fill="#bbb"/></marker></defs>
    <text x={180} y={13} textAnchor="middle" fill="#333" fontSize={8} fontWeight={700} letterSpacing={2} style={{fontFamily:F}}>SHERRY PRODUCTION & STYLES</text>

    {/* Base wine */}
    <rect x={0} y={19} width={360} height={38} fill="#fff"/>
    <text x={8} y={31} fill="#8B4513" fontSize={7} fontWeight={700} style={{fontFamily:F}}>ALL SHERRY</text>
    <text x={8} y={40} fill="#888" fontSize={4.8} style={{fontFamily:F}}>Palomino grape · Albariza chalk soil · Jerez Triangle</text>
    {bx(8,43,52,BH,["Ferment","to DRY"],"#fff","#ccc")}
    {ar(61,53,66,53)}
    {bx(68,43,60,BH,["All base wine","is DRY"],"#f8f0e0","#8B4513",.8)}
    {ar(129,53,134,53)}
    {bx(136,43,60,BH,["Spirit added","AFTER ferment"],"#f8f0e0","#8B4513",1)}

    {/* Split */}
    <text x={180} y={70} textAnchor="middle" fill="#333" fontSize={5.5} fontWeight={700} style={{fontFamily:F}}>Then fortified to different levels → determines ageing pathway:</text>

    <rect x={0} y={76} width={180} height={106} fill="#fdfcf0"/>
    <rect x={180} y={76} width={180} height={106} fill="#f8f4f0"/>

    {/* Biological */}
    <text x={90} y={89} textAnchor="middle" fill="#DAA520" fontSize={7} fontWeight={700} style={{fontFamily:F}}>BIOLOGICAL AGEING</text>
    <text x={90} y={97} textAnchor="middle" fill="#888" fontSize={4.5} style={{fontFamily:F}}>Fortified to ~15% → FLOR grows on surface</text>

    {bx(8,102,62,PH,["FLOR (yeast film)","protects from O₂"],"#fdf8e0","#DAA520",1)}
    {ar(71,113,76,113)}
    {bx(78,102,46,PH,["Pale","light, fresh"],"#F5DEB318","#DAA520",.6)}

    {bx(8,130,52,PH,["FINO","Almond, yeasty"],"#F5DEB330","#DAA520",.8)}
    {bx(66,130,58,PH,["MANZANILLA","Sanlúcar ONLY"],"#EEE8AA30","#DAA520",.8)}
    <text x={90} y={160} textAnchor="middle" fill="#DAA520" fontSize={4} style={{fontFamily:F}}>↑ Both DRY. Serve chilled. Drink soon after opening.</text>

    {/* Oxidative */}
    <text x={270} y={89} textAnchor="middle" fill="#8B4513" fontSize={7} fontWeight={700} style={{fontFamily:F}}>OXIDATIVE AGEING</text>
    <text x={270} y={97} textAnchor="middle" fill="#888" fontSize={4.5} style={{fontFamily:F}}>Fortified to ~17% → NO flor can grow</text>

    {bx(188,102,62,PH,["Exposed to AIR","in partial barrels"],"#f0e8e0","#8B4513",1)}
    {ar(251,113,256,113)}
    {bx(258,102,46,PH,["Dark","rich, nutty"],"#8B451318","#8B4513",.6)}

    {bx(188,130,72,PH,["OLOROSO","Walnut, NATURALLY DRY"],"#8B451318","#8B4513",.8)}
    <text x={270} y={160} textAnchor="middle" fill="#8B4513" fontSize={4} style={{fontFamily:F}}>↑ DRY despite dark colour. Not sweet!</text>

    {/* Amontillado bridge */}
    <rect x={124} y={164} width={112} height={24} rx={4} fill="#DAA52018" stroke="#DAA520" strokeWidth={1}/>
    <text x={180} y={174} textAnchor="middle" fill="#8B6914" fontSize={5.5} fontWeight={700} style={{fontFamily:F}}>AMONTILLADO</text>
    <text x={180} y={183} textAnchor="middle" fill="#8B6914" fontSize={4.5} style={{fontFamily:F}}>Starts flor → flor DIES → oxidative. BOTH types. DRY.</text>
    <line x1={124} y1={176} x2={90} y2={160} stroke="#DAA520" strokeWidth={.5} strokeDasharray="2"/>
    <line x1={236} y1={176} x2={270} y2={160} stroke="#8B4513" strokeWidth={.5} strokeDasharray="2"/>

    {/* Sweetened versions */}
    <rect x={0} y={192} width={360} height={44} fill="#fff"/>
    <text x={180} y={204} textAnchor="middle" fill="#333" fontSize={6} fontWeight={700} style={{fontFamily:F}}>SWEETENED STYLES (sweetness added AFTER ageing)</text>
    {bx(8,208,64,24,["Pedro Ximénez","Sun-dried grapes","Extremely sweet"],"#3B1F0018","#3B1F00",.8)}
    <text x={84} y={222} fill="#888" fontSize={6} style={{fontFamily:F}}>+</text>
    {bx(94,210,60,PH,["Oloroso + PX","= CREAM Sherry"],"#8B735518","#8B7355",.8)}
    <text x={166} y={222} fill="#888" fontSize={6} style={{fontFamily:F}}>+</text>
    {bx(176,210,60,PH,["Fino + sweet","= PALE Cream"],"#F5DEB318","#DAA520",.6)}
    <text x={258} y={222} fill="#888" fontSize={4.5} fontStyle="italic" style={{fontFamily:F}}>Commercial styles</text>

    {/* Solera */}
    <rect x={0} y={238} width={360} height={22} fill="#f8f6f0"/>
    <text x={180} y={248} textAnchor="middle" fill="#333" fontSize={6} fontWeight={700} style={{fontFamily:F}}>SOLERA SYSTEM (all Sherry)</text>
    <text x={180} y={257} textAnchor="middle" fill="#666" fontSize={4.5} style={{fontFamily:F}}>Fractional blending: oldest (solera) at bottom → youngest (criaderas) at top → consistent style, no vintages</text>

    {/* Key points */}
    <rect x={8} y={264} width={344} height={22} rx={3} fill="#fde8e8"/>
    <text x={180} y={274} textAnchor="middle" fill="#802020" fontSize={5} fontWeight={600} style={{fontFamily:F}}>⚠ ALL Sherry starts DRY. Spirit added AFTER fermentation. Sweetness added separately later.</text>
    <text x={180} y={283} textAnchor="middle" fill="#802020" fontSize={5} fontWeight={600} style={{fontFamily:F}}>⚠ Oloroso = NATURALLY DRY. Manzanilla = Sanlúcar ONLY. Amontillado = BOTH ageing types.</text>
  </svg>;
}
