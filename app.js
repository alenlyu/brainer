'use strict';
const $=s=>document.querySelector(s),R=n=>Math.floor(Math.random()*n),P=a=>a[R(a.length)],
SH=a=>a.map(x=>[Math.random(),x]).sort((p,q)=>p[0]-q[0]).map(x=>x[1]),U=(a,n)=>SH(a).slice(0,n),W=s=>s.split(' '),
CATS={mem:'Memory',foc:'Focus',log:'Logic',dec:'Decisions',cre:'Creativity'},
mc=(q,c,w,why='',show)=>{const o=SH([...new Set([c,...w].map(String))]);return{q,o,a:o.indexOf(String(c)),why,show}},
dg=n=>Array.from({length:n},()=>R(10)).join(''),
tw=s=>{const a=[...s],i=R(a.length);a[i]=(+a[i]+1+R(9))%10;return a.join('')},
rd=(c,n)=>`<span class=m>${Array.from({length:n},(_,r)=>Array.from({length:n},(_,i)=>c.includes(r*n+i)?'■':'□').join('')).join('<br>')}</span>`,
cnt=sy=>lv=>{const n=8+lv*4,t=P(sy),s=Array.from({length:n},()=>P(sy)),c=s.filter(x=>x==t).length;return mc(`<div class=big style="font-size:1.5rem;line-height:1.7;letter-spacing:.25em">${s.join('')}</div>How many “${t}” are there?`,c,[c+1,c+2,Math.max(1,c-1)],'Scan systematically, row by row.')},
BIG=(h,ms)=>({h:`<div class=big>${h}</div>`,ms}),
WORDS=W('apple river chair lamp cloud stone piano ocean tiger spoon bridge candle mirror garden window pencil forest ladder basket violin'),
RAT=[['cream skate water','ice'],['sleeping bean trash','bag'],['falling actor dust','star'],['cookie sixteen heart','sweet'],['blue cake cottage','cheese'],['fish mine rush','gold'],['dew comb bee','honey'],['fur rack tail','coat']],
CH=W('tiger rabbit tomato orange engine eagle ladder rocket table ocean night'),
BIAS=[['You keep a failing project because you already spent months on it.','Sunk cost'],['The first price you saw makes every later price seem cheap.','Anchoring'],['You only read articles that agree with your view.','Confirmation bias'],['You fear flying after seeing plane-crash news.','Availability'],['“90% survive” sounds better to you than “10% die”.','Framing'],['You refuse a fair trade because losing hurts more than gaining pleases.','Loss aversion']],
TS=[['Phone charges slowly. A new cable changed nothing. Best next step?','Test a different charger and outlet','Buy a new phone','Reinstall all apps'],['A site loads for you but not a friend. Most useful first check?','Compare network, device and browser','Rebuild the site','Clear only your cache'],['Code worked yesterday and fails today; you changed nothing. First step?','Check what changed (dependencies, data, environment)','Rewrite the function','Restart and hope'],['A plant wilts despite daily watering. Best first check?','Drainage and root rot','Water twice as much','Move it somewhere darker'],['Wi-Fi drops in only one room. Most likely cause?','Weak signal or interference there','ISP outage','Router software bug']],
AN=[['Finger : hand :: leaf : ?','tree','forest','green','autumn'],['Pilot : plane :: captain : ?','ship','sea','crew','port'],['Hot : cold :: tall : ?','short','large','high','wide'],['Book : read :: song : ?','listen','sing','write','buy'],['Seed : plant :: egg : ?','bird','nest','shell','yolk']],
GEN={
mem:[
lv=>{const s=dg(2+lv);return mc('Which sequence did you see?',s,[tw(s),tw(s),tw(s)],'',BIG(s,1200+s.length*500))},
lv=>{const s=dg(2+lv);return mc('Pick the sequence in REVERSE order.',[...s].reverse().join(''),[s,tw(s),tw(s)],'Reversing exercises working-memory manipulation.',BIG(s,1500+s.length*500))},
lv=>{const s=U(WORDS,3+lv),m=P(WORDS.filter(w=>!s.includes(w)));return mc('Which word was NOT in the list?',m,U(s,3),'',BIG(s.join(' · '),1500+s.length*900))},
lv=>{const n=lv<3?3:4,g=()=>U([...Array(n*n).keys()],2+lv),c=g();return mc('Which pattern was shown?',rd(c,n),[rd(g(),n),rd(g(),n),rd(g(),n)],'',BIG(rd(c,n),1800+lv*400))},
lv=>{const s=U(WORDS,2+lv).map(w=>[w,10+R(90)]),t=P(s);return mc(`Which number went with “${t[0]}”?`,t[1],[...s.filter(x=>x!==t).map(x=>x[1]),10+R(90)],'Linking items into pairs strengthens associative memory.',BIG(s.map(x=>x.join(' – ')).join('<br>'),1500+s.length*1100))},
lv=>{const s=U('BCDFGHKLMNPRSTVZ'.split(''),4+lv),i=R(s.length);return mc(`What was letter #${i+1}?`,s[i],s.filter((_,j)=>j!=i).slice(0,3),'',BIG(s.join(' '),1500+s.length*600))},
lv=>{const A=W('🍎 🌙 🔑 🎈 🐟 🎵 🌵 ⚽ 🚲 🍋 🎩 🍄'),s=U(A,4+lv),m=P(s),r=s.filter(x=>x!==m);return mc(`Which item disappeared?<div class=big>${SH(r).join(' ')}</div>`,m,U(A.filter(x=>!s.includes(x)),3),'',BIG(s.join(' '),2000+lv*500))},
lv=>{const L=U('ABCDEF'.split(''),3),s=Array.from({length:4+lv*2},()=>P(L)),t=P(L),c=s.filter(x=>x==t).length;return mc(`How many times did ${t} appear?`,c,[c+1,c+2,Math.max(0,c-1)],'',BIG(s.join(' '),2000+lv*600))}],
foc:[
lv=>{const C={red:'#c0605a',blue:'#5a7fc0',green:'#5aa37a',yellow:'#c9a73f'},k=Object.keys(C),w=P(k),i=lv>1?P(k.filter(x=>x!=w)):w;return mc(`<div class=big style="color:${C[i]}">${w.toUpperCase()}</div>Which INK colour is this?`,i,k,'Ignoring the word trains inhibitory control (Stroop).')},
cnt(['▲','●','■']),cnt('bdpq'.split('')),
lv=>{const d=P(['←','→']),o=d=='←'?'→':'←',f=lv>1?o:d,n=1+lv;return mc(`<div class=big>${f.repeat(n)}${d}${f.repeat(n)}</div>Which way does the CENTRE arrow point?`,d,[o],'Flanker task: filter out distracting neighbours.')},
lv=>{const a=10+R(80),b=a+1+R(26-lv*5);return mc(`<div class=big>${SH([[a,3],[b,1]]).map(x=>`<span style="font-size:${x[1]}rem"> ${x[0]} </span>`).join('')}</div>Which NUMBER is larger?`,b,[a],'Size and value compete; focus on value.')},
lv=>{const n=5+lv*2,a=dg(n),i=R(n),b=a.slice(0,i)+((+a[i]+1+R(9))%10)+a.slice(i+1);return mc(`<div class=big>${a}<br>${b}</div>Which position differs? (1 = leftmost)`,i+1,U([...Array(n).keys()].map(x=>x+1).filter(x=>x!=i+1),3),'Compare in chunks of 2–3 digits.')},
lv=>{const L=U('123456789'.split(''),4),m=L[0],s=SH([...Array(3+lv).fill(m),...L.slice(1).flatMap(x=>Array(1+R(2)).fill(x))]);return mc(`<div class=big>${s.join(' ')}</div>Which digit appears most often?`,m,L.slice(1))},
lv=>{const d=[3,4,6,7,8][lv-1],n=2+lv,s=100+R(50),r=s-n*d;return mc(`Start at ${s} and subtract ${d}, ${n} times. What do you get?`,r,[r+d,r-d,r+1],'Serial subtraction loads sustained attention.')}],
log:[
lv=>{const a=R(9)+1,d=R(4)+2,e=lv>2?lv-2:0,f=i=>a+d*i+e*i*(i-1)/2;return mc(`${[0,1,2,3,4].map(f).join(', ')}, ?`,f(5),[f(5)+1,f(5)-1,f(5)+d],'Find the rule: a constant step, or a step that grows.')},
lv=>{const a=1+R(lv+2),b=1+R(lv+2),x=R(9),y=20+R(9),g=i=>i%2?y-b*(i>>1):x+a*(i>>1);return mc(`${[0,1,2,3,4,5].map(g).join(', ')}, ?`,g(6),[g(6)+a,g(6)-1,g(7)],'Two interleaved sequences: track each separately.')},
lv=>{const [A,B,C]=U(W('cats birds robots poets trees rivers'),3),v=P([[`All ${B} are ${C}. Must all ${A} be ${C}?`,'Yes'],[`Rex is one of the ${B}. Must Rex be one of the ${A}?`,'Cannot tell'],[`Rex is not one of the ${B}. Can Rex be one of the ${A}?`,'No']]);return mc(`All ${A} are ${B}. ${v[0]}`,v[1],['Yes','No','Cannot tell'],'Belonging to a bigger group tells you nothing about the smaller one.')},
lv=>{const t=P(TS);return mc(t[0],t[1],t.slice(2),'Change one variable at a time and isolate before fixing.')},
lv=>{const N=U(W('Ana Ben Cy Dee Eli Fay Gus'),2+lv),t=R(2),r=t?N[0]:N.at(-1);return mc(SH(N.slice(1).map((n,i)=>`${N[i]} is taller than ${n}`)).join('. ')+`. Who is the ${t?'tallest':'shortest'}?`,r,N.filter(x=>x!=r).slice(0,3),'Build the chain, then read off its ends.')},
lv=>{const t=P(AN);return mc(t[0],t[1],t.slice(2),'Name the relationship first, then apply it.')},
lv=>{const x=R(9)+2,a=R(9)+2,b=lv>2?R(4)+2:1;return mc(`${b>1?b:''}x + ${a} = ${b*x+a}. What is x?`,x,[x+1,x-1,x+2],'Undo operations in reverse order.')},
lv=>{const k=2+R(4)+(lv>3?3:0),L=Array.from({length:4},()=>k*(1+R(9))),o=k*(1+R(9))+1+R(k-1);return mc('Four of these share a rule. Which does not belong?',o,L,'Look for a shared multiple.')}],
dec:[
lv=>{const p=P([10,20,25,40,50,60,75]),n=2+R(9),ev=p*n,s=Math.round(ev*(R(2)?.8:1.25));return mc(`A: ${p}% chance of $${n*100}. B: guaranteed $${s}. Which has the higher average payoff?`,ev>s?'A':'B',['A','B'],`A averages $${ev}.`)},
lv=>{const n=P([10,20,50]),f=P([5,10]),c=Math.round(100*n/(n+(1000-n)*f/100));return mc(`${n} in 1,000 people have a condition. A test flags every real case plus ${f}% of healthy people. You test positive. Chance you really have it?`,c+'%',['100%',(100-f)+'%',Math.min(99,c+30)+'%'],'Picture 1,000 people: count true vs false positives.')},
lv=>{const t=P(BIAS);return mc(t[0]+' Which bias?',t[1],U(BIAS.map(x=>x[1]).filter(x=>x!=t[1]),3),'Naming a bias makes it easier to catch.')},
lv=>{const q=P([250,500]),a=3+R(3),b=2*a+P([-1,1]);return mc(`A: ${q} g for $${a}. B: ${q*2} g for $${b}. Better deal per gram?`,b<2*a?'B':'A',['A','B'],'Compare unit price, not total price.')},
lv=>{const m=P([5,10,15,20,30]),d=5+R(25);return mc(`Automating a task takes ${m*d} minutes and saves ${m} minutes per day. After how many days does it pay off?`,d,[d+5,d-2,d*2],'Opportunity cost: setup time vs cumulative savings.')},
lv=>{const w=[3,2,1],Z=()=>w.map(()=>1+R(9)),a=Z(),b=Z(),t=x=>x.reduce((s,v,i)=>s+v*w[i],0);if(t(a)==t(b))b[0]++;return mc(`Scores for cost / quality / speed (weights 3 / 2 / 1). A: ${a.join(' / ')}. B: ${b.join(' / ')}. Which wins on weighted score?`,t(a)>t(b)?'A':'B',['A','B'],`A = ${t(a)}, B = ${t(b)}.`)},
lv=>{const p=P([50,80,200]),a=P([10,20,25,30]),b=P([10,15,20]),f=x=>'$'+x.toFixed(2);return mc(`A $${p} item is ${a}% off, then a further ${b}% off the new price. Final price?`,f(p*(1-a/100)*(1-b/100)),[f(p*(1-(a+b)/100)),f(p*(1-a/100)),f(p*(1-b/100))],'Successive discounts multiply; they do not add.')},
lv=>{const n=3+R(3);return R(2)?mc(`A fair coin landed heads ${n} times in a row. Chance the next flip is heads?`,'50%',['Less than 50%','More than 50%','Cannot tell'],'Flips are independent; believing otherwise is the gambler’s fallacy.'):mc(`Chance of ${n} heads in a row with a fair coin?`,'1 in '+2**n,['1 in '+2*n,'1 in '+2**(n+1),'1 in '+2**(n-1)],'Multiply: ½ × ½ × …')}],
cre:[
lv=>{const t=P(RAT);return mc(`Which word links all three: ${t[0].replace(/ /g,' · ')}?`,t[1],U(RAT.filter(x=>x!=t).map(x=>x[1]),3),'Remote-association tasks link distant concepts.')},
lv=>{const w=P(W('planet garden bridge silver monkey orange pencil window rocket forest candle puzzle'));let s;do{s=SH([...w]).join('')}while(s==w);return mc(`Unscramble: ${s.toUpperCase()}`,w,U(W('planet garden bridge silver monkey orange pencil window rocket forest candle puzzle').filter(x=>x!=w),3),'Breaking a fixed pattern builds flexibility.')},
lv=>{const C=[W('apple pear plum grape'),W('lion tiger zebra wolf'),W('hammer saw drill wrench'),W('violin piano flute drum'),W('rose tulip daisy lily'),W('Paris Rome Cairo Oslo')],[a,b]=U(C,2),o=P(b);return mc('Which word does not belong?',o,U(a,3),'Re-categorising items trains cognitive flexibility.')},
lv=>{const x=2+R(5),a=2+R(4),m=2+R(2),k=1+(lv>2)+(lv>4);let r=x;for(let i=0;i<k;i++)r=(r+a)*m;return mc(`Start at ${x}. Repeat ${k} time${k>1?'s':''}: add ${a}, then multiply by ${m}. Result?`,r,[r+m,r-a,r+a],'Alternating rules trains set-shifting.')},
lv=>{const w=P(CH),l=w.at(-1);return mc(`Pick the word that starts with the LAST letter of “${w}”.`,P(CH.filter(x=>x[0]==l&&x!=w)),U(CH.filter(x=>x[0]!=l),3),'Word chains encourage fast, flexible retrieval.')},
()=>({open:1,q:`Unusual uses: how many different uses can you find for a ${P(W('brick paperclip towel bottle spoon umbrella'))}? Aim for 6 or more.`}),
()=>{const [a,b]=U(W('lighthouse violin glacier bakery compass robot orchard'),2);return{open:1,q:`Write one surprising sentence linking “${a}” and “${b}”.`}},
()=>({open:1,q:P(['Redesign your commute if it were 10× longer.','Explain your job to a 7-year-old in two sentences.','Design a better alarm clock: add one new feature.','Name 3 radically different ways to approach your biggest problem today.'])})]};
let S={lv:{mem:1,foc:1,log:1,dec:1,cre:1},streak:0,last:'',total:0,hist:{}},c,cur,queue,i,T;const run={},app=$('#app'),td=()=>new Date().toLocaleDateString('sv'),yd=()=>new Date(Date.now()-864e5).toLocaleDateString('sv');
try{Object.assign(S,JSON.parse(localStorage.bt))}catch{}
const save=()=>{try{localStorage.bt=JSON.stringify(S)}catch{}};
function tally(){const t=td();S.hist[t]=(S.hist[t]||0)+1;S.total++;if(S.hist[t]>=5&&S.last!=t){S.streak=S.last==yd()?S.streak+1:1;S.last=t}save()}
function home(){clearTimeout(T);const t=td(),n=S.hist[t]||0,st=S.last==t||S.last==yd()?S.streak:0;app.innerHTML=`<h1>Good morning 🌿</h1><p class=mu>A few calm minutes. No timers, no penalties.</p><div class=card><b>${st}-day streak</b><p class=mu>Today: ${Math.min(n,5)}/5 exercises toward your streak</p><div class=bar><i style="width:${Math.min(100,n*20)}%"></i></div><button class=p id=s>Start daily session · 10 mixed exercises</button></div><div class=card><b>Train one skill</b>${Object.entries(CATS).map(([k,v])=>`<button data-k=${k}>${v} <span class=mu>· level ${S.lv[k]}</span></button>`).join('')}</div><p class=mu>${S.total} exercises completed. Difficulty adapts to keep you in the “challenging but doable” zone.</p>`}
function start(k){queue=k?Array(10).fill(k):SH(Object.keys(CATS).flatMap(x=>[x,x]));i=0;next()}
function next(){if(i>=queue.length){app.innerHTML=`<h1>Session complete 🌱</h1><div class=card><p>You finished ${queue.length} exercises. Regular short practice builds lasting connections. See you tomorrow.</p><button class=p id=x>Back home</button></div>`;return}const k=queue[i];cur=P(GEN[k])(S.lv[k]);cur.k=k;draw()}
function draw(){clearTimeout(T);const e=cur;app.innerHTML=`<p class=mu>${CATS[e.k]} · level ${S.lv[e.k]} · ${i+1}/${queue.length}</p><div class=bar><i style="width:${i/queue.length*100}%"></i></div><div class=card id=c></div><button id=x class=mu style="background:none">End session</button>`;c=$('#c');
const q=()=>{c.innerHTML=`<div>${e.q}</div>`+(e.open?'<textarea aria-label="Your ideas"></textarea><button class=p id=d>Done</button>':`<div class=g>${e.o.map((o,j)=>`<button data-j=${j}>${o}</button>`).join('')}</div>`)};
e.show?(c.innerHTML=e.show.h+'<p class=mu style="text-align:center">Memorise…</p>',T=setTimeout(q,e.show.ms)):q()}
function ans(j){if(cur.d)return;cur.d=1;const b=c.querySelectorAll('.g button'),ok=j==cur.a;b[j].className=ok?'ok':'no';b[cur.a].className='ok';c.insertAdjacentHTML('beforeend',`<p class=mu>${ok?'Nice.':'Not quite, the answer is highlighted.'} ${cur.why}</p><button class=p id=n>Next</button>`);tally();const k=cur.k,r=run[k]=run[k]||{u:0,w:0};if(ok){r.w=0;if(++r.u>=3){S.lv[k]=Math.min(5,S.lv[k]+1);r.u=0}}else{r.u=0;if(++r.w>=2){S.lv[k]=Math.max(1,S.lv[k]-1);r.w=0}}save()}
app.onclick=e=>{const b=e.target.closest('button');if(!b)return;const{k,j}=b.dataset;if(b.id=='s')start();else if(k)start(k);else if(j!==undefined)ans(+j);else if(b.id=='n'){i++;next()}else if(b.id=='d'){tally();i++;next()}else if(b.id=='x')home()};
home();
if('serviceWorker'in navigator)addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
