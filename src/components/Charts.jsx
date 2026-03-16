// Sparkling & Fortified production flow charts (SVG)

export function MethodChart(){
  const B="#4682B4",G="#2E8B57",Y="#B8860B";
  const bx=(x,y,w,h,t,f,s,sw)=><g key={t}><rect x={x} y={y} width={w} height={h} rx={3} fill={f} stroke={s} strokeWidth={sw||.6}/>{t.split("\n").map((l,i)=><text key={i} x={x+w/2} y={y+h/2-3+(i*8)} textAnchor="middle" fill="#333" fontSize={5.5} style={{fontFamily:"sans-serif"}}>{l}</text>)}</g>;
  const ar=(x1,y1,x2,y2)=><line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#bbb" strokeWidth={.7} markerEnd="url(#sa)"/>;
  return <svg viewBox="0 0 340 210" style={{width:"100%",display:"block",background:"#f8fafc",borderRadius:6,border:"1px solid #e0e4e8"}}>
    <defs><marker id="sa" viewBox="0 0 6 6" refX={5} refY={3} markerWidth={4} markerHeight={4} orient="auto"><path d="M0,0 L6,3 L0,6Z" fill="#bbb"/></marker></defs>
    <text x={170} y={12} textAnchor="middle" fill="#333" fontSize={8} fontWeight={700} letterSpacing={2} style={{fontFamily:"sans-serif"}}>SPARKLING METHODS COMPARED</text>
    {/* Traditional */}
    <rect x={0} y={18} width={340} height={58} fill="#fff"/>
    <text x={6} y={30} fill={B} fontSize={7} fontWeight={700} style={{fontFamily:"sans-serif"}}>TRADITIONAL</text>
    <text x={6} y={39} fill="#888" fontSize={5} style={{fontFamily:"sans-serif"}}>Champagne, Cava, Crémant, Franciacorta</text>
    {bx(6,43,42,28,"Base\nwine","#fff","#ccc")}{ar(49,57,54,57)}{bx(56,43,42,28,"+Yeast\n+Sugar","#fff","#ccc")}{ar(99,57,104,57)}{bx(106,43,48,28,"2nd ferm\nIN BOTTLE","#dde8f8",B,1.2)}{ar(155,57,160,57)}{bx(162,43,48,28,"Lees ageing\nAUTOLYSIS","#e8f0ff",B,1)}{ar(211,57,216,57)}{bx(218,43,38,28,"Riddling","#fff","#ccc")}{ar(257,57,262,57)}{bx(264,43,38,28,"Disgorge","#fff","#ccc")}{ar(303,57,308,57)}{bx(310,43,26,28,"Dosage","#fff","#ccc")}
    {/* Tank */}
    <rect x={0} y={78} width={340} height={58} fill="#f4f8f4"/>
    <text x={6} y={90} fill={G} fontSize={7} fontWeight={700} style={{fontFamily:"sans-serif"}}>TANK / CHARMAT</text>
    <text x={6} y={99} fill="#888" fontSize={5} style={{fontFamily:"sans-serif"}}>Prosecco, Asti, most Sekt</text>
    {bx(6,103,42,28,"Base\nwine","#fff","#ccc")}{ar(49,117,54,117)}{bx(56,103,42,28,"+Yeast\n+Sugar","#fff","#ccc")}{ar(99,117,104,117)}{bx(106,103,48,28,"2nd ferm\nIN TANK","#e4f4e8",G,1.2)}{ar(155,117,160,117)}{bx(162,103,48,28,"Filtered\nunder pressure","#fff","#ccc")}{ar(211,117,216,117)}{bx(218,103,50,28,"Bottled\ndirectly","#fff","#ccc")}
    <text x={290} y={115} fill="#888" fontSize={6} style={{fontFamily:"sans-serif",fontStyle:"italic"}}>No autolysis</text>
    <text x={290} y={123} fill={G} fontSize={5.5} fontWeight={600} style={{fontFamily:"sans-serif"}}>= Fruity, fresh</text>
    {/* Transfer */}
    <rect x={0} y={138} width={340} height={48} fill="#fff"/>
    <text x={6} y={150} fill={Y} fontSize={7} fontWeight={700} style={{fontFamily:"sans-serif"}}>TRANSFER</text>
    <text x={6} y={159} fill="#888" fontSize={5} style={{fontFamily:"sans-serif"}}>Some NW, commercial</text>
    {bx(6,163,42,18,"Base wine","#fff","#ccc")}{ar(49,172,54,172)}{bx(56,163,48,18,"2nd ferm IN BOTTLE","#f8f0e0",Y,.8)}{ar(105,172,110,172)}{bx(112,163,52,18,"Empty to tank","#fff","#ccc")}{ar(165,172,170,172)}{bx(172,163,52,18,"Filter + re-bottle","#fff","#ccc")}
    <text x={242} y={174} fill="#888" fontSize={5.5} style={{fontFamily:"sans-serif",fontStyle:"italic"}}>Bottle quality, no riddling</text>
    {/* Legend */}
    <rect x={6} y={192} width={328} height={14} rx={3} fill="#f0f2f5"/>
    <rect x={10} y={195} width={8} height={8} rx={1.5} fill="#dde8f8" stroke={B} strokeWidth={.8}/><text x={21} y={201} fill="#555" fontSize={5} style={{fontFamily:"sans-serif"}}>Bottle fermentation (key distinction!)</text>
    <rect x={140} y={195} width={8} height={8} rx={1.5} fill="#e4f4e8" stroke={G} strokeWidth={.8}/><text x={151} y={201} fill="#555" fontSize={5} style={{fontFamily:"sans-serif"}}>Tank fermentation</text>
    <text x={232} y={201} fill="#444" fontSize={5} fontWeight={600} style={{fontFamily:"sans-serif"}}>AUTOLYSIS = yeast breakdown → toasty, biscuit (Traditional only)</text>
  </svg>;
}

export function PortChart(){
  const bx=(x,y,w,h,t,f,s,sw)=><g key={t+x}><rect x={x} y={y} width={w} height={h} rx={3} fill={f} stroke={s} strokeWidth={sw||.6}/>{t.split("\n").map((l,i)=><text key={i} x={x+w/2} y={y+h/2-3+(i*7)} textAnchor="middle" fill="#333" fontSize={5} style={{fontFamily:"sans-serif"}}>{l}</text>)}</g>;
  const ar=(x1,y1,x2,y2)=><line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#bbb" strokeWidth={.7} markerEnd="url(#pa)"/>;
  return <svg viewBox="0 0 340 260" style={{width:"100%",display:"block",background:"#f8f6f4",borderRadius:6,border:"1px solid #e0dcd0"}}>
    <defs><marker id="pa" viewBox="0 0 6 6" refX={5} refY={3} markerWidth={4} markerHeight={4} orient="auto"><path d="M0,0 L6,3 L0,6Z" fill="#bbb"/></marker></defs>
    <text x={170} y={12} textAnchor="middle" fill="#333" fontSize={8} fontWeight={700} letterSpacing={2} style={{fontFamily:"sans-serif"}}>PORT PRODUCTION & STYLES</text>

    {/* Shared base */}
    <rect x={0} y={18} width={340} height={38} fill="#fff"/>
    <text x={6} y={30} fill="#8B0000" fontSize={6.5} fontWeight={700} style={{fontFamily:"sans-serif"}}>ALL PORT</text>
    <text x={6} y={38} fill="#888" fontSize={4.5} style={{fontFamily:"sans-serif"}}>Douro Valley grapes: Touriga Nacional, Touriga Franca, Tinta Roriz</text>
    {bx(6,42,45,12,"Crush &\nferment","#fff","#ccc")}{ar(52,48,57,48)}{bx(59,42,55,12,"Add SPIRIT\nat ~7% ABV","#ffe8e0","#C03030",1)}{ar(115,48,120,48)}{bx(122,42,50,12,"Fermentation\nSTOPS → sweet","#fde8e8","#C03030",.8)}

    {/* Split into Ruby vs Tawny */}
    <rect x={0} y={58} width={170} height={98} fill="#fdf4f4"/>
    <rect x={170} y={58} width={170} height={98} fill="#fdf8f0"/>

    <text x={85} y={70} textAnchor="middle" fill="#C03030" fontSize={7} fontWeight={700} style={{fontFamily:"sans-serif"}}>RUBY PATHWAY</text>
    <text x={85} y={78} textAnchor="middle" fill="#888" fontSize={4.5} style={{fontFamily:"sans-serif"}}>Reductive ageing (large vessels → preserve fruit)</text>
    {bx(8,82,46,18,"Large\nvats/tanks","#fff","#C03030",.6)}{ar(55,91,60,91)}
    {bx(62,82,46,18,"Ruby\n(basic, fruity)","#C0303020","#C03030",.8)}
    {bx(8,106,46,18,"4-6 yr\nlarge vessels","#fff","#802020",.6)}{ar(55,115,60,115)}
    {bx(62,106,46,18,"LBV\n(single vintage)","#80202020","#802020",.8)}
    {bx(110,82,54,18,"DECLARED yr\n→ bottle decades","#fff","#501818",.6)}{ar(110,105,110,108)}
    {bx(110,108,54,18,"Vintage Port\n(must DECANT)","#50181820","#501818",1)}
    <text x={140} y={145} textAnchor="middle" fill="#501818" fontSize={4} fontWeight={700} style={{fontFamily:"sans-serif"}}>↑ Finest & most expensive</text>

    <text x={255} y={70} textAnchor="middle" fill="#C08040" fontSize={7} fontWeight={700} style={{fontFamily:"sans-serif"}}>TAWNY PATHWAY</text>
    <text x={255} y={78} textAnchor="middle" fill="#888" fontSize={4.5} style={{fontFamily:"sans-serif"}}>Oxidative ageing (small pipes → develop nutty)</text>
    {bx(178,82,52,18,"Small barrels\n(550L pipes)","#fff","#C08040",.6)}{ar(231,91,236,91)}
    {bx(238,82,50,18,"Amber colour\nNutty, caramel","#C0804020","#C08040",.8)}
    {bx(178,106,52,18,"10/20/30/40yr\nAge = AVERAGE","#C0804018","#C08040",.8)}{ar(231,115,236,115)}
    {bx(238,106,50,18,"Tawny\n(indicated age)","#C0804020","#C08040",.8)}
    {bx(205,130,70,18,"Colheita\n= single vintage tawny","#A0703018","#A07030",.8)}

    {/* Key exam points */}
    <rect x={0} y={158} width={340} height={42} fill="#fff"/>
    <text x={170} y={170} textAnchor="middle" fill="#333" fontSize={6} fontWeight={700} style={{fontFamily:"sans-serif"}}>KEY EXAM DISTINCTIONS</text>
    <rect x={6} y={175} width={158} height={20} rx={3} fill="#fdf4f4" stroke="#C03030" strokeWidth={.5}/>
    <text x={85} y={184} textAnchor="middle" fill="#802020" fontSize={5} style={{fontFamily:"sans-serif"}}>Ruby = REDUCTIVE (fruit preserved)</text>
    <text x={85} y={191} textAnchor="middle" fill="#802020" fontSize={5} style={{fontFamily:"sans-serif"}}>Colour stays deep red/purple</text>
    <rect x={176} y={175} width={158} height={20} rx={3} fill="#fdf8f0" stroke="#C08040" strokeWidth={.5}/>
    <text x={255} y={184} textAnchor="middle" fill="#8B6830" fontSize={5} style={{fontFamily:"sans-serif"}}>Tawny = OXIDATIVE (nutty, dried fruit)</text>
    <text x={255} y={191} textAnchor="middle" fill="#8B6830" fontSize={5} style={{fontFamily:"sans-serif"}}>Colour fades to amber/tawny</text>

    <rect x={6} y={202} width={328} height={14} rx={3} fill="#fde8e8"/>
    <text x={170} y={211} textAnchor="middle" fill="#802020" fontSize={5.5} fontWeight={600} style={{fontFamily:"sans-serif"}}>⚠ Spirit added DURING fermentation at ~7% ABV → kills yeast → wine remains SWEET</text>

    <rect x={6} y={220} width={328} height={35} rx={3} fill="#f8f6f0"/>
    <text x={170} y={232} textAnchor="middle" fill="#666" fontSize={5} style={{fontFamily:"sans-serif"}}>Vintage Port: DECLARED only in exceptional years (3-4/decade). Needs decades of bottle ageing. Must DECANT.</text>
    <text x={170} y={240} textAnchor="middle" fill="#666" fontSize={5} style={{fontFamily:"sans-serif"}}>LBV: Single vintage, 4-6yr in vessel. Ready to drink on release. Usually filtered (no decanting).</text>
    <text x={170} y={248} textAnchor="middle" fill="#666" fontSize={5} style={{fontFamily:"sans-serif"}}>Indicated age on Tawny (10/20/30/40) = AVERAGE age of blend, NOT a minimum.</text>
  </svg>;
}

export function SherryChart(){
  const bx=(x,y,w,h,t,f,s,sw)=><g key={t+x}><rect x={x} y={y} width={w} height={h} rx={3} fill={f} stroke={s} strokeWidth={sw||.6}/>{t.split("\n").map((l,i)=><text key={i} x={x+w/2} y={y+h/2-3+(i*7)} textAnchor="middle" fill="#333" fontSize={5} style={{fontFamily:"sans-serif"}}>{l}</text>)}</g>;
  const ar=(x1,y1,x2,y2)=><line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#bbb" strokeWidth={.7} markerEnd="url(#sha)"/>;
  return <svg viewBox="0 0 340 275" style={{width:"100%",display:"block",background:"#f8f6f4",borderRadius:6,border:"1px solid #e0dcd0"}}>
    <defs><marker id="sha" viewBox="0 0 6 6" refX={5} refY={3} markerWidth={4} markerHeight={4} orient="auto"><path d="M0,0 L6,3 L0,6Z" fill="#bbb"/></marker></defs>
    <text x={170} y={12} textAnchor="middle" fill="#333" fontSize={8} fontWeight={700} letterSpacing={2} style={{fontFamily:"sans-serif"}}>SHERRY PRODUCTION & STYLES</text>

    {/* Base wine */}
    <rect x={0} y={18} width={340} height={32} fill="#fff"/>
    <text x={6} y={30} fill="#8B4513" fontSize={6.5} fontWeight={700} style={{fontFamily:"sans-serif"}}>ALL SHERRY</text>
    <text x={6} y={38} fill="#888" fontSize={4.5} style={{fontFamily:"sans-serif"}}>Palomino grape, Albariza chalk soil, Jerez Triangle</text>
    {bx(6,41,48,10,"Ferment\nto DRY","#fff","#ccc")}{ar(55,46,60,46)}{bx(62,41,55,10,"All base wine\nis DRY","#f8f0e0","#8B4513",.8)}{ar(118,46,123,46)}{bx(125,41,55,10,"Spirit added\nAFTER ferment","#f8f0e0","#8B4513",1)}

    {/* Split into Biological vs Oxidative */}
    <text x={170} y={62} textAnchor="middle" fill="#333" fontSize={6} fontWeight={700} style={{fontFamily:"sans-serif"}}>Then fortified to different levels → determines ageing pathway:</text>

    <rect x={0} y={68} width={170} height={110} fill="#fdfcf0"/>
    <rect x={170} y={68} width={170} height={110} fill="#f8f4f0"/>

    <text x={85} y={80} textAnchor="middle" fill="#DAA520" fontSize={7} fontWeight={700} style={{fontFamily:"sans-serif"}}>BIOLOGICAL AGEING</text>
    <text x={85} y={88} textAnchor="middle" fill="#888" fontSize={4.5} style={{fontFamily:"sans-serif"}}>Fortified to ~15% → FLOR grows on surface</text>
    {bx(8,92,60,22,"FLOR\n(yeast film)\nprotects from O₂","#fdf8e0","#DAA520",1)}
    {ar(69,103,74,103)}
    {bx(76,94,38,16,"Pale\nlight, fresh","#F5DEB318","#DAA520",.6)}
    {bx(8,120,48,16,"FINO\nAlmond, yeasty","#F5DEB330","#DAA520",.8)}
    {bx(62,120,52,16,"MANZANILLA\nSanlúcar ONLY","#EEE8AA30","#DAA520",.8)}
    <text x={85} y={146} textAnchor="middle" fill="#DAA520" fontSize={4} style={{fontFamily:"sans-serif"}}>↑ Both DRY. Serve chilled. Drink soon after opening.</text>

    {/* Amontillado bridge */}
    <rect x={118} y={150} width={104} height={24} rx={4} fill="#DAA52020" stroke="#DAA520" strokeWidth={1}/>
    <text x={170} y={159} textAnchor="middle" fill="#8B6914" fontSize={5.5} fontWeight={700} style={{fontFamily:"sans-serif"}}>AMONTILLADO</text>
    <text x={170} y={167} textAnchor="middle" fill="#8B6914" fontSize={4.5} style={{fontFamily:"sans-serif"}}>Starts flor → flor DIES → oxidative. BOTH types. DRY.</text>
    <line x1={118} y1={162} x2={85} y2={145} stroke="#DAA520" strokeWidth={.5} strokeDasharray="2"/>
    <line x1={222} y1={162} x2={255} y2={145} stroke="#8B4513" strokeWidth={.5} strokeDasharray="2"/>

    <text x={255} y={80} textAnchor="middle" fill="#8B4513" fontSize={7} fontWeight={700} style={{fontFamily:"sans-serif"}}>OXIDATIVE AGEING</text>
    <text x={255} y={88} textAnchor="middle" fill="#888" fontSize={4.5} style={{fontFamily:"sans-serif"}}>Fortified to ~17% → NO flor can grow</text>
    {bx(178,92,60,22,"Exposed to AIR\nin partially-filled\nbarrels","#f0e8e0","#8B4513",1)}
    {ar(239,103,244,103)}
    {bx(246,94,38,16,"Dark\nrich, nutty","#8B451318","#8B4513",.6)}
    {bx(178,120,65,16,"OLOROSO\nWalnut, NATURALLY DRY","#8B451320","#8B4513",.8)}
    <text x={255} y={146} textAnchor="middle" fill="#8B4513" fontSize={4} style={{fontFamily:"sans-serif"}}>↑ DRY despite dark colour. Not sweet!</text>

    {/* Sweetened versions */}
    <rect x={0} y={178} width={340} height={42} fill="#fff"/>
    <text x={170} y={190} textAnchor="middle" fill="#333" fontSize={6} fontWeight={700} style={{fontFamily:"sans-serif"}}>SWEETENED STYLES (sweetness added AFTER ageing)</text>
    {bx(6,194,60,20,"Pedro Ximénez\nSun-dried grapes\nExtremely sweet","#3B1F0020","#3B1F00",.8)}
    <text x={85} y={206} fill="#888" fontSize={5} style={{fontFamily:"sans-serif"}}>+</text>
    {bx(95,196,55,16,"Oloroso + PX\n= CREAM Sherry","#8B735520","#8B7355",.8)}
    <text x={170} y={206} fill="#888" fontSize={5} style={{fontFamily:"sans-serif"}}>+</text>
    {bx(180,196,55,16,"Fino + sweet\n= PALE Cream","#F5DEB320","#DAA520",.6)}
    <text x={300} y={206} fill="#888" fontSize={4.5} fontStyle="italic" style={{fontFamily:"sans-serif"}}>Commercial styles</text>

    {/* Solera */}
    <rect x={0} y={222} width={340} height={22} fill="#f8f6f0"/>
    <text x={170} y={233} textAnchor="middle" fill="#333" fontSize={6} fontWeight={700} style={{fontFamily:"sans-serif"}}>SOLERA SYSTEM (all Sherry)</text>
    <text x={170} y={241} textAnchor="middle" fill="#666" fontSize={4.8} style={{fontFamily:"sans-serif"}}>Fractional blending: oldest wine (solera) at bottom → youngest (criaderas) at top → drawn from bottom, replenished above → consistent style, no vintages</text>

    {/* Key points */}
    <rect x={6} y={248} width={328} height={22} rx={3} fill="#fde8e8"/>
    <text x={170} y={258} textAnchor="middle" fill="#802020" fontSize={5} fontWeight={600} style={{fontFamily:"sans-serif"}}>⚠ ALL Sherry starts DRY. Spirit added AFTER fermentation. Sweetness (if any) added separately later.</text>
    <text x={170} y={266} textAnchor="middle" fill="#802020" fontSize={5} fontWeight={600} style={{fontFamily:"sans-serif"}}>⚠ Oloroso is NATURALLY DRY. Manzanilla = Sanlúcar ONLY. Amontillado = BOTH ageing types.</text>
  </svg>;
}