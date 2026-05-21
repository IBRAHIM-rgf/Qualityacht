'use client';

import { useState } from 'react';

const IMG = '/images/pagesCaraibes/thankyou-sail.jpg';

const EFFECTS = [
  ['1. Fade', 'fx1'],
  ['2. Fade + Zoom in (Ken Burns)', 'fx2'],
  ['3. Fade + Zoom out', 'fx3'],
  ['4. Slide up', 'fx4'],
  ['5. Slide down', 'fx5'],
  ['6. Slide left', 'fx6'],
  ['7. Slide right', 'fx7'],
  ['8. Pop (scale up)', 'fx8'],
  ['9. Scale down', 'fx9'],
  ['10. Rotate in', 'fx10'],
  ['11. Skew in', 'fx11'],
  ['12. Blur in', 'fx12'],
  ['13. Grayscale → color', 'fx13'],
  ['14. Sepia → color', 'fx14'],
  ['15. Dark → bright', 'fx15'],
  ['16. Reveal left → right', 'fx16'],
  ['17. Reveal top → bottom', 'fx17'],
  ['18. Iris (circle reveal)', 'fx18'],
  ['19. Flip X', 'fx19'],
  ['20. Flip Y', 'fx20'],
  ['21. Ken Burns pan', 'fx21'],
  ['22. Zoom + rotate', 'fx22'],
  ['23. Bounce in', 'fx23'],
  ['24. Swing', 'fx24'],
  ['25. Glitch', 'fx25'],
  ['26. Fade + blur + scale', 'fx26'],
  ['27. Reveal vertical (scaleY)', 'fx27'],
  ['28. Reveal horizontal (scaleX)', 'fx28'],
  ['29. Desaturate → color', 'fx29'],
  ['30. Slow zoom + bright', 'fx30'],
];

const css = `
  .fxbox { position:relative; overflow:hidden; border-radius:0.75rem; border:1px solid #C0C0C0; background:#000; aspect-ratio:2/3; perspective:700px; cursor:pointer; }
  .fxbox .fxphoto { width:100%; height:100%; object-fit:cover; display:block; transform-origin:center;
    animation-duration:2.8s; animation-iteration-count:1; animation-fill-mode:both; animation-timing-function:ease; }

  .fx1{animation-name:k1}  @keyframes k1{0%{opacity:0}100%{opacity:1}}
  .fx2{animation-name:k2}  @keyframes k2{0%{opacity:0;transform:scale(1)}100%{opacity:1;transform:scale(1.12)}}
  .fx3{animation-name:k3}  @keyframes k3{0%{opacity:0;transform:scale(1.35)}100%{opacity:1;transform:scale(1)}}
  .fx4{animation-name:k4}  @keyframes k4{0%{opacity:0;transform:translateY(45px)}100%{opacity:1;transform:translateY(0)}}
  .fx5{animation-name:k5}  @keyframes k5{0%{opacity:0;transform:translateY(-45px)}100%{opacity:1;transform:translateY(0)}}
  .fx6{animation-name:k6}  @keyframes k6{0%{opacity:0;transform:translateX(45px)}100%{opacity:1;transform:translateX(0)}}
  .fx7{animation-name:k7}  @keyframes k7{0%{opacity:0;transform:translateX(-45px)}100%{opacity:1;transform:translateX(0)}}
  .fx8{animation-name:k8}  @keyframes k8{0%{opacity:0;transform:scale(0.6)}100%{opacity:1;transform:scale(1)}}
  .fx9{animation-name:k9}  @keyframes k9{0%{opacity:0;transform:scale(1.5)}100%{opacity:1;transform:scale(1)}}
  .fx10{animation-name:k10} @keyframes k10{0%{opacity:0;transform:rotate(-10deg) scale(1.15)}100%{opacity:1;transform:rotate(0) scale(1)}}
  .fx11{animation-name:k11} @keyframes k11{0%{opacity:0;transform:skewX(14deg) scale(1.1)}100%{opacity:1;transform:skewX(0) scale(1)}}
  .fx12{animation-name:k12} @keyframes k12{0%{opacity:0;filter:blur(22px)}100%{opacity:1;filter:blur(0)}}
  .fx13{animation-name:k13} @keyframes k13{0%{filter:grayscale(1)}100%{filter:grayscale(0)}}
  .fx14{animation-name:k14} @keyframes k14{0%{filter:sepia(1)}100%{filter:sepia(0)}}
  .fx15{animation-name:k15} @keyframes k15{0%{filter:brightness(0.15)}100%{filter:brightness(1)}}
  .fx16{animation-name:k16} @keyframes k16{0%{clip-path:inset(0 100% 0 0)}100%{clip-path:inset(0 0 0 0)}}
  .fx17{animation-name:k17} @keyframes k17{0%{clip-path:inset(0 0 100% 0)}100%{clip-path:inset(0 0 0 0)}}
  .fx18{animation-name:k18} @keyframes k18{0%{clip-path:circle(0% at 50% 50%)}100%{clip-path:circle(75% at 50% 50%)}}
  .fx19{animation-name:k19} @keyframes k19{0%{opacity:0;transform:rotateX(90deg)}100%{opacity:1;transform:rotateX(0)}}
  .fx20{animation-name:k20} @keyframes k20{0%{opacity:0;transform:rotateY(90deg)}100%{opacity:1;transform:rotateY(0)}}
  .fx21{animation-name:k21} @keyframes k21{0%{transform:scale(1.25) translate(4%,4%)}100%{transform:scale(1.25) translate(-4%,-4%)}}
  .fx22{animation-name:k22} @keyframes k22{0%{opacity:0;transform:scale(1.4) rotate(12deg)}100%{opacity:1;transform:scale(1) rotate(0)}}
  .fx23{animation-name:k23} @keyframes k23{0%{opacity:0;transform:translateY(60px)}55%{opacity:1;transform:translateY(-14px)}72%{transform:translateY(7px)}100%{transform:translateY(0)}}
  .fx24{animation-name:k24} @keyframes k24{0%{opacity:0;transform:rotate(-7deg)}50%{opacity:1;transform:rotate(5deg)}75%{transform:rotate(-2deg)}100%{transform:rotate(0)}}
  .fx25{animation-name:k25} @keyframes k25{0%{opacity:0;transform:translate(0,0)}15%{opacity:1;transform:translate(-7px,4px)}30%{transform:translate(7px,-4px)}45%{transform:translate(-5px,0)}60%{transform:translate(3px,0)}100%{transform:translate(0,0)}}
  .fx26{animation-name:k26} @keyframes k26{0%{opacity:0;filter:blur(14px);transform:scale(1.15)}100%{opacity:1;filter:blur(0);transform:scale(1)}}
  .fx27{animation-name:k27} @keyframes k27{0%{transform:scaleY(0);transform-origin:top}100%{transform:scaleY(1);transform-origin:top}}
  .fx28{animation-name:k28} @keyframes k28{0%{transform:scaleX(0);transform-origin:left}100%{transform:scaleX(1);transform-origin:left}}
  .fx29{animation-name:k29} @keyframes k29{0%{opacity:0;filter:saturate(0.3)}100%{opacity:1;filter:saturate(1)}}
  .fx30{animation-name:k30} @keyframes k30{0%{transform:scale(1);filter:brightness(0.6)}100%{transform:scale(1.08);filter:brightness(1)}}
`;

export default function Page() {
  const [allTick, setAllTick] = useState(0);
  const [ticks, setTicks] = useState({});

  const replay = (cls) => setTicks(t => ({ ...t, [cls]: (t[cls] || 0) + 1 }));
  const replayAll = () => { setAllTick(t => t + 1); setTicks({}); };

  return (
    <div className="min-h-screen bg-[#26272a] text-[#acb0cd] pt-24 pb-20 px-4">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <h1 className="trajan-regular font-bold text-2xl md:text-4xl text-center uppercase tracking-[0.15em] mb-3 text-[#C0C0C0]">
        Thank You — 30 Effects
      </h1>
      <p className="text-center text-[#acb0cd]/70 text-sm mb-6">
        CSS pur. Clique sur une image pour rejouer l&rsquo;effet. Dis-moi le numéro choisi.
      </p>
      <div className="flex justify-center mb-12">
        <button onClick={replayAll}
          className="border-2 border-[#C0C0C0] rounded-xl text-[#B03E00] text-sm uppercase tracking-[0.2em] font-medium px-8 py-3 transition-all hover:bg-[#B03E00]/10 shadow-[0_4px_15px_rgba(192,192,192,0.3)]">
          Restart all
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {EFFECTS.map(([name, cls]) => (
          <div key={cls}>
            <p className="text-[11px] uppercase tracking-[0.15em] text-[#acb0cd] mb-2">{name}</p>
            <div className="fxbox" onClick={() => replay(cls)} title="Cliquer pour rejouer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img key={`${cls}-${allTick}-${ticks[cls] || 0}`} src={IMG} alt={name} className={`fxphoto ${cls}`} />
              {/* Overlay texte Thank You par-dessus la photo */}
              <div className="absolute inset-0 bg-black/35 pointer-events-none" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/trans.png" alt="" className="absolute top-2 left-1/2 -translate-x-1/2 w-6 h-6 object-contain z-10 pointer-events-none" />
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-3 pointer-events-none">
                <h3 className="trajan-regular font-bold uppercase tracking-[0.12em] text-[#C0C0C0] text-sm md:text-base">Grateful</h3>
                <div className="w-8 h-px bg-[#c2622a] my-2" />
                <p className="text-[#acb0cd] text-[10px] leading-snug max-w-[85%]">
                  Your request has been received. One of our charter experts will contact you shortly.
                </p>
                <span className="mt-3 inline-block rounded-lg px-4 py-2 border border-[#C0C0C0] text-[#C0C0C0] text-[9px] uppercase tracking-[0.2em]">
                  Back to Caribbean
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
