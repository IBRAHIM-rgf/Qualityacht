export const dynamic = 'force-dynamic';

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
  ['29. Saturate pulse', 'fx29'],
  ['30. Slow zoom + bright', 'fx30'],
];

const css = `
  .fxbox { position:relative; overflow:hidden; border-radius:0.75rem; border:1px solid #C0C0C0; background:#000; aspect-ratio:2/3; perspective:700px; }
  .fxbox img { width:100%; height:100%; object-fit:cover; display:block; transform-origin:center; }
  .fxbox img { animation-duration:5s; animation-iteration-count:infinite; animation-timing-function:ease; }

  .fx1  { animation-name:k1; }
  @keyframes k1 { 0%{opacity:0} 45%,100%{opacity:1} }
  .fx2  { animation-name:k2; }
  @keyframes k2 { 0%{opacity:0;transform:scale(1)} 45%{opacity:1;transform:scale(1.12)} 100%{opacity:1;transform:scale(1.12)} }
  .fx3  { animation-name:k3; }
  @keyframes k3 { 0%{opacity:0;transform:scale(1.35)} 45%,100%{opacity:1;transform:scale(1)} }
  .fx4  { animation-name:k4; }
  @keyframes k4 { 0%{opacity:0;transform:translateY(45px)} 45%,100%{opacity:1;transform:translateY(0)} }
  .fx5  { animation-name:k5; }
  @keyframes k5 { 0%{opacity:0;transform:translateY(-45px)} 45%,100%{opacity:1;transform:translateY(0)} }
  .fx6  { animation-name:k6; }
  @keyframes k6 { 0%{opacity:0;transform:translateX(45px)} 45%,100%{opacity:1;transform:translateX(0)} }
  .fx7  { animation-name:k7; }
  @keyframes k7 { 0%{opacity:0;transform:translateX(-45px)} 45%,100%{opacity:1;transform:translateX(0)} }
  .fx8  { animation-name:k8; }
  @keyframes k8 { 0%{opacity:0;transform:scale(0.6)} 45%,100%{opacity:1;transform:scale(1)} }
  .fx9  { animation-name:k9; }
  @keyframes k9 { 0%{opacity:0;transform:scale(1.5)} 45%,100%{opacity:1;transform:scale(1)} }
  .fx10 { animation-name:k10; }
  @keyframes k10 { 0%{opacity:0;transform:rotate(-10deg) scale(1.15)} 45%,100%{opacity:1;transform:rotate(0) scale(1)} }
  .fx11 { animation-name:k11; }
  @keyframes k11 { 0%{opacity:0;transform:skewX(14deg) scale(1.1)} 45%,100%{opacity:1;transform:skewX(0) scale(1)} }
  .fx12 { animation-name:k12; }
  @keyframes k12 { 0%{opacity:0;filter:blur(22px)} 45%,100%{opacity:1;filter:blur(0)} }
  .fx13 { animation-name:k13; }
  @keyframes k13 { 0%{filter:grayscale(1)} 45%,100%{filter:grayscale(0)} }
  .fx14 { animation-name:k14; }
  @keyframes k14 { 0%{filter:sepia(1)} 45%,100%{filter:sepia(0)} }
  .fx15 { animation-name:k15; }
  @keyframes k15 { 0%{filter:brightness(0.15)} 45%,100%{filter:brightness(1)} }
  .fx16 { animation-name:k16; }
  @keyframes k16 { 0%{clip-path:inset(0 100% 0 0)} 45%,100%{clip-path:inset(0 0 0 0)} }
  .fx17 { animation-name:k17; }
  @keyframes k17 { 0%{clip-path:inset(0 0 100% 0)} 45%,100%{clip-path:inset(0 0 0 0)} }
  .fx18 { animation-name:k18; }
  @keyframes k18 { 0%{clip-path:circle(0% at 50% 50%)} 45%,100%{clip-path:circle(75% at 50% 50%)} }
  .fx19 { animation-name:k19; }
  @keyframes k19 { 0%{opacity:0;transform:rotateX(90deg)} 45%,100%{opacity:1;transform:rotateX(0)} }
  .fx20 { animation-name:k20; }
  @keyframes k20 { 0%{opacity:0;transform:rotateY(90deg)} 45%,100%{opacity:1;transform:rotateY(0)} }
  .fx21 { animation-name:k21; }
  @keyframes k21 { 0%{transform:scale(1.25) translate(3%,3%)} 50%{transform:scale(1.25) translate(-3%,-3%)} 100%{transform:scale(1.25) translate(3%,3%)} }
  .fx22 { animation-name:k22; }
  @keyframes k22 { 0%{opacity:0;transform:scale(1.4) rotate(12deg)} 45%,100%{opacity:1;transform:scale(1) rotate(0)} }
  .fx23 { animation-name:k23; }
  @keyframes k23 { 0%{opacity:0;transform:translateY(60px)} 30%{opacity:1;transform:translateY(-12px)} 42%{transform:translateY(6px)} 52%,100%{transform:translateY(0)} }
  .fx24 { animation-name:k24; }
  @keyframes k24 { 0%{opacity:0;transform:rotate(-6deg)} 30%{opacity:1;transform:rotate(4deg)} 45%{transform:rotate(-2deg)} 55%,100%{transform:rotate(0)} }
  .fx25 { animation-name:k25; }
  @keyframes k25 { 0%{opacity:0;transform:translate(0,0)} 10%{opacity:1;transform:translate(-6px,3px)} 20%{transform:translate(6px,-3px)} 30%{transform:translate(-4px,0)} 40%,100%{transform:translate(0,0)} }
  .fx26 { animation-name:k26; }
  @keyframes k26 { 0%{opacity:0;filter:blur(14px);transform:scale(1.15)} 45%,100%{opacity:1;filter:blur(0);transform:scale(1)} }
  .fx27 { animation-name:k27; }
  @keyframes k27 { 0%{transform:scaleY(0);transform-origin:top} 45%,100%{transform:scaleY(1);transform-origin:top} }
  .fx28 { animation-name:k28; }
  @keyframes k28 { 0%{transform:scaleX(0);transform-origin:left} 45%,100%{transform:scaleX(1);transform-origin:left} }
  .fx29 { animation-name:k29; }
  @keyframes k29 { 0%{filter:saturate(0.4)} 50%{filter:saturate(1.8)} 100%{filter:saturate(0.4)} }
  .fx30 { animation-name:k30; }
  @keyframes k30 { 0%{transform:scale(1);filter:brightness(0.7)} 50%{transform:scale(1.1);filter:brightness(1.1)} 100%{transform:scale(1);filter:brightness(0.7)} }
`;

export default function Page() {
  return (
    <div className="min-h-screen bg-[#26272a] text-[#acb0cd] pt-24 pb-20 px-4">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <h1 className="trajan-regular font-bold text-2xl md:text-4xl text-center uppercase tracking-[0.15em] mb-3 text-[#C0C0C0]">
        Thank You — 30 Effects
      </h1>
      <p className="text-center text-[#acb0cd]/70 text-sm mb-12">
        Tous en CSS pur (boucle infinie). Dis-moi le numéro de celui que tu veux.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {EFFECTS.map(([name, cls]) => (
          <div key={cls}>
            <p className="text-[11px] uppercase tracking-[0.15em] text-[#acb0cd] mb-2">{name}</p>
            <div className="fxbox">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMG} alt={name} className={cls} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
