'use strict';
(() => {
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)], C=CATALOG,L=LEARNING;
const ico=n=>`<svg aria-hidden="true"><use href="#${n}-icon"/></svg>`;
const sys=id=>C.systems.find(s=>s.id===id), planet=id=>C.planets.find(p=>p.id===id), home=s=>C.planets.find(p=>p.skills.includes(s));
let view={level:'galaxy',system:null,planet:null},activeMission=null,viewNodes=[],W=0,H=0,yaw=.10,pitch=.25,zoom=1,auto=false,dirty=true,last=0,lastDraw=0,stageTime=0;
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,canvas=$('#sky'),ctx=canvas.getContext('2d'),map=$('.map');
function systemSkills(id){return C.planets.filter(p=>p.system===id).flatMap(p=>p.skills)}
function aggregate(ids){return !ids.length?'planned':ids.some(s=>L.status(s)==='review')?'review':ids.some(s=>L.status(s)==='available')?'available':ids.every(L.done)?'complete':'locked'}
function systemState(id){return aggregate(systemSkills(id))}
function route(){return view.level==='galaxy'?'#physics':view.level==='system'?'#physics/'+view.system:'#physics/'+view.system+'/'+view.planet}
function historyWrite(replace=false){if(location.hash!==route())try{history[replace?'replaceState':'pushState'](null,'',route())}catch(e){}}
function changed(){yaw=.10;pitch=.25;zoom=1;auto=false;orbitUI();stageTime=performance.now();dirty=true;renderNavigation();renderNodes();historyWrite();}
function goGalaxy(){L.stop();view={level:'galaxy',system:null,planet:null};renderOverview();changed();}
function goSystem(id){if(!sys(id))return;L.stop();view={level:'system',system:id,planet:null};renderOverview();changed();}
function goPlanet(id,skill=null,scroll=false){const p=planet(id);if(!p)return;if(p.skills.length){const s=skill&&p.skills.includes(skill)?skill:p.skills.find(s=>L.status(s)==='review')||p.skills.find(s=>L.status(s)==='available')||p.skills[0];L.selectSkill(s,scroll);return;}L.stop();view={level:'planet',system:p.system,planet:p.id};renderOverview();changed();if(scroll)scrollPanel();}
function scrollPanel(){if(innerWidth<=760)$('#panel').scrollIntoView({behavior:reduced?'auto':'smooth',block:'start'});}
function addMissionBanner(){const prior=$('.mission-banner');if(prior)prior.remove();if(!activeMission)return;const m=C.missions.find(m=>m.id===activeMission),div=document.createElement('div');div.className='mission-banner';div.innerHTML=`${ico('mission')}<span>${m.name}</span><button aria-label="Leave mission">×</button>`;div.querySelector('button').onclick=()=>{activeMission=null;div.remove()};$('#panel-content').prepend(div);}
function renderNavigation(){const level=view.level;$('#breadcrumbs').innerHTML=`<button data-nav="galaxy" ${level==='galaxy'?'aria-current="page"':''}>Physics</button>${level!=='galaxy'?`<span>/</span><button data-nav="system" ${level==='system'?'aria-current="page"':''}>${sys(view.system).name}</button>`:''}${level==='planet'?`<span>/</span><button data-nav="planet" aria-current="page">${planet(view.planet).name}</button>`:''}`;$$('[data-nav]').forEach(b=>b.onclick=()=>{if(b.dataset.nav==='galaxy')goGalaxy();else if(b.dataset.nav==='system')goSystem(view.system)});
$('#map-kind').textContent=level==='galaxy'?'GALAXY':level==='system'?'STAR SYSTEM':'PLANET';$('#map-title').textContent=level==='galaxy'?'Physics':level==='system'?sys(view.system).name:planet(view.planet).name;
$('#scale-label').textContent=level==='galaxy'?'STAR SYSTEMS':level==='system'?'CONCEPTS':'CAPABILITIES · ACTIVITIES';$('#map-meta').textContent=level==='galaxy'?'06 SYSTEMS':level==='system'?String(C.planets.filter(p=>p.system===view.system).length).padStart(2,'0')+' PLANETS':planet(view.planet).shared?'SHARED FOUNDATION':'';
}
function navItem(id,title,state,type,sub=''){return `<button class="navitem" data-go="${type}:${id}" data-state="${state}" aria-label="${title}, ${state==='planned'?'not built':state}"><i class="node-mini"></i><span class="navtext">${title}${sub?`<small>${sub}</small>`:''}</span>${state==='locked'?ico('lock'):ico('arrow')}</button>`}
function connectNav(){ $$('[data-go]').forEach(b=>b.onclick=()=>{const [kind,id]=b.dataset.go.split(':');if(kind==='system')goSystem(id);else if(kind==='planet')goPlanet(id,null,true);else L.selectSkill(id,true);}); }
function chooseNext(ids){return ids.find(s=>L.status(s)==='review')||ids.find(s=>L.status(s)==='available')||null;}
function continueBlock(ids){const next=chooseNext(ids)||L.nextSkill();if(!next)return '';const p=home(next);return `<div class="continue-box"><span class="index">CONTINUE</span><button class="action" data-go="skill:${next}">${L.skills[next].name} ${ico('arrow')}</button><div class="minor-path">${sys(p.system).name} / ${p.name}</div></div>`;}
function miniDiagram(){return `<div class="mini-orbit"><svg viewBox="0 0 320 100" aria-hidden="true"><defs><radialGradient id="miniHalo"><stop stop-color="#c5f0d5" stop-opacity=".3"/><stop offset="1" stop-color="#b7e7cf" stop-opacity="0"/></radialGradient></defs><path d="M45 47H269" stroke="#425965" stroke-dasharray="2 5"/><circle cx="45" cy="47" r="34" fill="url(#miniHalo)"/><circle cx="45" cy="47" r="9" fill="#b9edcf"/><ellipse cx="153" cy="47" rx="30" ry="9" fill="none" stroke="#557b7d" transform="rotate(-25 153 47)"/><circle cx="153" cy="47" r="12" fill="#496d74" stroke="#8aa9b1"/><circle cx="268" cy="47" r="5" fill="#92aaa8"/><g fill="#879eab" font-size="9" font-family="system-ui" text-anchor="middle"><text x="45" y="88">SYSTEM</text><text x="153" y="88">CONCEPT</text><text x="268" y="88">CAPABILITY</text></g></svg></div>`;}
function renderOverview(){let content='';if(view.level==='galaxy'){
content=`<div class="index">GALAXY</div><h2>Physics</h2>${miniDiagram()}<div class="navlist" aria-label="Physics systems">${C.systems.map(s=>navItem(s.id,s.name,systemState(s.id),'system')).join('')}</div>${continueBlock(C.order)}`;
}else if(view.level==='system'){
const s=sys(view.system),ps=C.planets.filter(p=>p.system===s.id),skills=systemSkills(s.id);
content=`<div class="panel-top"><span class="index">STAR SYSTEM</span><button class="crumb" id="overview-back">Physics ↑</button></div><h2>${s.name}</h2><p class="intro">${s.description}</p><div class="navlist" aria-label="Concept planets">${ps.map(p=>navItem(p.id,p.name,L.domainState(p),'planet',p.shared?'Shared foundation':'')).join('')}</div>${!skills.length?'<div class="planned-note"><strong>Activities not built yet.</strong>This system is mapped, not gated by your progress.</div>':''}${continueBlock(skills)}`;
}else{
const p=planet(view.planet);content=`<div class="panel-top"><span class="index">PLANET</span><button class="crumb" id="overview-back">${sys(p.system).name} ↑</button></div><h2>${p.name}</h2><p class="intro">${p.description}</p><div class="planned-list">${(p.topics||[]).map(t=>`<div>${t}</div>`).join('')}</div><div class="planned-note"><strong>Activities not built yet.</strong>This outline does not require an unlock.</div>${continueBlock(C.order)}`;}
$('#panel-content').innerHTML=content;if($('#overview-back'))$('#overview-back').onclick=()=>view.level==='system'?goGalaxy():goSystem(view.system);connectNav();addMissionBanner();}
function topicPositions(n){if(W<600){const pos=[[-5.5,8,-1],[5.5,8,1],[-6,-.2,2],[6,0,-1],[-5.5,-8,-2],[5.5,-8,1]];return pos.slice(0,n);}return [[-9,4,1],[0,8,-2],[10,4,-1],[10,-5,2],[0,-8,3],[-10,-5,-1]].slice(0,n);}
function nodeState(n){if(n.type==='star')return systemState(n.id);if(n.type==='sun')return systemState(n.id);if(n.type==='planet')return L.domainState(planet(n.id));if(n.type==='moon')return n.skill?L.status(n.skill):'planned';if(n.type==='asteroid')return L.status(n.skill);return'planned';}
function setupNodes(){const mobile=W<600;if(view.level==='galaxy'){
const mobilePos=[[-5.7,8,1],[5.7,8,-1],[-5.7,0,-2],[5.7,0,2],[-5.7,-8,1],[5.7,-8,-2]];
return C.systems.map((s,i)=>({id:s.id,type:'star',name:s.name,p:mobile?mobilePos[i]:s.p,color:s.color,action:()=>goSystem(s.id)}));
}if(view.level==='system'){
const ps=C.planets.filter(p=>p.system===view.system),positions=topicPositions(ps.length),s=sys(view.system);
return [{id:s.id,type:'sun',name:'',p:[0,0,0],color:s.color,action:null},...ps.map((p,i)=>({id:p.id,type:'planet',name:p.name,p:positions[i],color:s.color,action:()=>goPlanet(p.id,null,true)}))];
}
const p=planet(view.planet),s=sys(p.system),snapshot=L.snapshot(),selected=snapshot.selected;
const children=p.skills.length?p.skills:(p.topics||[]),positions=children.length===1?[[mobile?4.6:8,3,1]]:children.length===2?[[-6,5,-1],[6,4,1]]:[[-6.8,5,0],[6.7,5,1],[7,-4,-1]];
const nodes=[{id:p.id,type:'planet',name:p.name,p:[0,0,0],color:s.color,central:true,action:null},...children.map((skill,i)=>({id:skill,type:'moon',name:p.skills.length?L.skills[skill].name:skill,skill:p.skills.length?skill:null,p:positions[i],color:s.color,action:p.skills.length?()=>L.selectSkill(skill,true):()=>{}}))];
if(p.skills.includes(selected)&&L.available(selected))nodes.push({id:'explore-asteroid',type:'asteroid',skill:selected,name:'Explore',p:[-4.5,-8,2],color:s.color,action:()=>{L.setMode('explore');scrollPanel();}}, {id:'apply-asteroid',type:'asteroid',skill:selected,name:'Apply',p:[3.4,-9,-1],color:s.color,action:()=>{L.setMode('apply');scrollPanel();}});
return nodes;
}
function renderNodes(){viewNodes=setupNodes();$('#map-nodes').innerHTML=viewNodes.filter(n=>n.name&&n.action).map(n=>`<button class="celestial" data-id="${n.id}" data-type="${n.type}" data-state="${nodeState(n)}" aria-label="${n.name}, ${nodeState(n)==='planned'?'not built':nodeState(n)}" ${n.skill?`aria-pressed="${n.type==='moon'?L.snapshot().selected===n.skill:L.snapshot().mode===n.name.toLowerCase()}"`:''}><span class="node-label">${n.name}${nodeState(n)==='locked'?ico('lock'):''}</span></button>`).join('');$$('.celestial').forEach(b=>b.onclick=()=>viewNodes.find(n=>n.id===b.dataset.id).action());dirty=true;}
function startMission(id){const m=C.missions.find(m=>m.id===id);if(!m)return;$('#missions-dialog').close();const need=m.requirements.find(s=>!L.done(s));if(need){activeMission=null;L.selectSkill(L.prerequisite(need),true);return;}activeMission=id;const next=m.skills.find(s=>!L.done(s))||m.skills[0];L.selectSkill(next,true);if(L.available(next))L.setMode('apply');addMissionBanner();}
function nextForMission(){if(!activeMission)return null;const m=C.missions.find(m=>m.id===activeMission),s=m.skills.find(s=>!L.done(s));if(!s){activeMission=null;return null;}return L.available(s)?s:L.prerequisite(s);}
function renderMissions(){$('#mission-cards').innerHTML=C.missions.map(m=>{const missing=m.requirements.find(s=>!L.done(s));return `<article class="mission-card"><span class="index">${m.systems.map(s=>sys(s).name).join(' → ')}</span><h3>${m.name}</h3><p>${m.description}</p><div class="mission-route">${m.skills.map(s=>`<span>${home(s).name} / ${L.skills[s].name}</span>`).join('<span>→</span>')}</div><button class="action ${missing?'secondary':''}" data-mission="${m.id}">${missing?L.skills[L.prerequisite(missing)].name:'Start mission'} ${ico(missing?'lock':'arrow')}</button></article>`}).join('');$$('[data-mission]').forEach(b=>b.onclick=()=>startMission(b.dataset.mission));$('#missions-dialog').showModal();}
document.addEventListener('skillselect',e=>{const p=home(e.detail.skill);view={level:'planet',system:p.system,planet:p.id};changed();addMissionBanner();if(e.detail.scroll)scrollPanel();});
document.addEventListener('modechange',()=>{renderNodes();addMissionBanner();});
document.addEventListener('evidencechange',()=>{renderNodes();if(view.level!=='planet')renderOverview();});
$('#about').onclick=()=>$('#info').showModal();$('#notes').onclick=L.recordOpen;$('#missions').onclick=renderMissions;
$$('[data-close]').forEach(b=>b.onclick=()=>$('#'+b.dataset.close).close());$$('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target!==d)return;const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}));
// Perspective-projected 3D scene. Canvas avoids fragile external graphics imports.
let seed=316;function rng(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296}
const far=Array.from({length:300},()=>({x:rng(),y:rng(),r:.25+rng()*.8,a:.1+rng()*.4}));
const dust=Array.from({length:1750},()=>{const r=2+Math.pow(rng(),.7)*36,a=r*.23+Math.floor(rng()*3)*Math.PI*2/3+(rng()-.5)*1.5;return{p:[Math.cos(a)*r,(rng()-.5)*2,Math.sin(a)*r],size:.2+rng()*.85,a:.08+rng()*.42};});
function project(a){const[x0,y0,z0]=a,cy=Math.cos(yaw),sy=Math.sin(yaw),cp=Math.cos(pitch),sp=Math.sin(pitch),x=x0*cy-z0*sy,z=x0*sy+z0*cy,y=y0*cp-z*sp,depth=y0*sp+z*cp,k=65/(65+depth),mobile=W<600;const base=Math.min(W/(mobile?24:33),H/(mobile?32:29))*zoom;return{x:W*.5+x*base*k,y:H*.51-y*base*k,k,depth,scale:base*k};}
function line3(points,stroke,width=1,dash=[]){ctx.beginPath();points.forEach((p,i)=>{const q=project(p);i?ctx.lineTo(q.x,q.y):ctx.moveTo(q.x,q.y);});ctx.strokeStyle=stroke;ctx.lineWidth=width;ctx.setLineDash(dash);ctx.stroke();ctx.setLineDash([]);}
function ring(p,r,tilt=.2){return Array.from({length:101},(_,i)=>{const t=i/100*Math.PI*2;return[p[0]+Math.cos(t)*r,p[1]+Math.sin(t)*r*Math.sin(tilt),p[2]+Math.sin(t)*r*Math.cos(tilt)];});}
function orbitThrough(p){const r=Math.hypot(...p),u=p.map(x=>x/r),normal=[0,.63,-.78],v=[normal[1]*u[2]-normal[2]*u[1],normal[2]*u[0]-normal[0]*u[2],normal[0]*u[1]-normal[1]*u[0]],norm=Math.hypot(...v)||1;return Array.from({length:101},(_,i)=>{const a=i/100*Math.PI*2;return p.map((x,j)=>x*Math.cos(a)+v[j]/norm*r*Math.sin(a));});}
function halo(x,y,r,color,a){const rr=parseInt(color.slice(1,3),16),gg=parseInt(color.slice(3,5),16),bb=parseInt(color.slice(5,7),16);const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,`rgba(${rr},${gg},${bb},${a})`);g.addColorStop(.15,`rgba(${rr},${gg},${bb},${a*.30})`);g.addColorStop(.45,`rgba(${rr},${gg},${bb},${a*.07})`);g.addColorStop(1,`rgba(${rr},${gg},${bb},0)`);ctx.fillStyle=g;ctx.fillRect(x-r,y-r,r*2,r*2);}
function sphere(x,y,r,color,state,variant=0){ctx.save();ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.clip();const g=ctx.createRadialGradient(x-r*.45,y-r*.4,r*.04,x+r*.32,y+r*.18,r*1.3);g.addColorStop(0,state==='available'?color:state==='planned'?'#31414f':'#6c8d96');g.addColorStop(.45,state==='available'?'#4b797a':'#2d4757');g.addColorStop(1,'#0b1421');ctx.fillStyle=g;ctx.fillRect(x-r,y-r,2*r,2*r);ctx.globalAlpha=state==='available'?.16:.09;ctx.fillStyle='#c4e1e1';for(let i=0;i<6;i++){ctx.beginPath();ctx.ellipse(x-r*.1,y-r*.8+i*r*.33,r*1.07,r*.08+(i%2)*r*.04,-.28+variant*.09,0,Math.PI*2);ctx.fill();}ctx.globalAlpha=1;ctx.restore();ctx.strokeStyle=state==='planned'?'#637988':'#8aaca057';ctx.lineWidth=.8;ctx.setLineDash(state==='planned'?[2,5]:[]);ctx.beginPath();ctx.arc(x,y,r+3,0,Math.PI*2);ctx.stroke();ctx.setLineDash([]);}
function body(n,index,time){const q=project(n.p),st=nodeState(n),mobile=W<600,scale=Math.min(1.4,Math.max(.7,q.scale/24)),available=st==='available',color=st==='review'?'#dfb67d':n.color||'#b9edcf';let r=n.type==='star'?12:n.type==='sun'?21:n.central?45:n.type==='planet'?15:n.type==='moon'?7:5;r*=scale;if(n.central&&mobile)r*=.85;
if(available||st==='review'){const spread=n.type==='star'?115:n.type==='sun'?105:n.central?95:n.type==='asteroid'?30:57;halo(q.x,q.y,spread*scale,color,(n.type==='asteroid'?.46:.78)*(reduced?1:.95+Math.sin(time*.0016+index)*.05));}
if(n.type==='star'||n.type==='sun'){
 if(available||st==='review'){const gradient=ctx.createRadialGradient(q.x-r*.2,q.y-r*.2,0,q.x,q.y,r);gradient.addColorStop(0,'#f7ffed');gradient.addColorStop(.35,color);gradient.addColorStop(1,'#427c6d');ctx.fillStyle=gradient;}else ctx.fillStyle=st==='complete'?'#88b0a6':'#344c5a';
 ctx.beginPath();ctx.arc(q.x,q.y,r,0,Math.PI*2);ctx.fill();
 if(n.type==='star'){line3(ring(n.p,1.4,.65),available?'#98bfac77':'#51687788',.8,st==='planned'?[2,5]:[]);line3(ring(n.p,1.05,-.5),available?'#9acbb640':'#51687740',.6);}
}else if(n.type==='asteroid'){
 ctx.fillStyle=available?'#9fc5b5':'#657b82';ctx.strokeStyle=available?'#c7dfcf':'#6f8890';ctx.beginPath();for(let i=0;i<7;i++){const a=i/7*Math.PI*2,f=.75+(i%3)*.13,x=q.x+Math.cos(a)*r*f,y=q.y+Math.sin(a)*r*f;i?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.closePath();ctx.fill();ctx.stroke();
}else sphere(q.x,q.y,r,color,st,index);
if(st==='locked'){ctx.strokeStyle='#617a8c';ctx.lineWidth=.8;ctx.beginPath();ctx.arc(q.x,q.y,r+8*scale,0,Math.PI*2);ctx.stroke();}
const el=$(`[data-id="${n.id}"]`);if(el){el.style.left=q.x+'px';el.style.top=q.y+'px';el.style.zIndex=String(4+Math.round(50-q.depth));}
if(!n.action&&n.name&&n.central){ctx.font='12px system-ui';ctx.textAlign='center';ctx.fillStyle='#a9c1c9';ctx.fillText(n.name,q.x,q.y+r+24);}
}
function draw(time){if(!ctx||!W||!H)return;ctx.fillStyle='#090e16';ctx.fillRect(0,0,W,H);const bg=ctx.createRadialGradient(W*.5,H*.52,0,W*.5,H*.5,Math.max(W,H)*.66);bg.addColorStop(0,'#152b35');bg.addColorStop(.5,'#0d1b27');bg.addColorStop(1,'#090e16');ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
for(const p of far){ctx.fillStyle=`rgba(169,192,209,${p.a})`;ctx.beginPath();ctx.arc(W*p.x,H*p.y,p.r,0,Math.PI*2);ctx.fill();}
const galaxy=view.level==='galaxy';if(galaxy){halo(W*.5,H*.51,Math.min(W,H)*.29,'#7ea69f',.08);for(const p of dust){const q=project(p.p);if(q.x<0||q.x>W||q.y<0||q.y>H)continue;ctx.fillStyle=`rgba(156,190,199,${p.a})`;ctx.beginPath();ctx.arc(q.x,q.y,Math.min(1.5,p.size*q.k),0,Math.PI*2);ctx.fill();}for(const r of [19,26,33])line3(ring([0,-1,0],r,.03),'#6d879613',.5);}
else if(view.level==='system'){
 for(const n of viewNodes.filter(n=>n.type==='planet')){const r=Math.hypot(n.p[0],n.p[1],n.p[2]);line3(orbitThrough(n.p),'#63849126',.7);}
}else{
 for(const n of viewNodes.filter(n=>n.type==='moon')){const r=Math.hypot(...n.p);line3(orbitThrough(n.p),'#63849130',.7);}
 const current=viewNodes.find(n=>n.skill===L.snapshot().selected&&n.type==='moon');if(current){for(const a of viewNodes.filter(n=>n.type==='asteroid'))line3([current.p,a.p],'#9bbfa357',.7,[2,5]);}
}
[...viewNodes].sort((a,b)=>project(b.p).depth-project(a.p).depth).forEach((n,i)=>body(n,i,time));
document.body.dataset.renderer='ready';dirty=false;lastDraw=time;
}
function resize(){const r=map.getBoundingClientRect();W=r.width;H=r.height;const dpr=Math.min(devicePixelRatio||1,2);if(ctx){canvas.width=Math.round(W*dpr);canvas.height=Math.round(H*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);}renderNodes();draw(performance.now());}
function orbitUI(){$('#orbit').textContent=auto?'Ⅱ':'▷';$('#orbit').setAttribute('aria-pressed',String(auto));$('#orbit').setAttribute('aria-label',auto?'Pause orbit':'Start orbit');}
$('#orbit').onclick=()=>{auto=!auto;orbitUI();dirty=true};$('#reset-view').onclick=()=>{yaw=.1;pitch=.25;zoom=1;auto=false;orbitUI();dirty=true};$('#zoom-in').onclick=()=>{zoom=Math.min(1.7,zoom*1.12);dirty=true};$('#zoom-out').onclick=()=>{zoom=Math.max(.65,zoom/1.12);dirty=true};
const pointers=new Map();let pinch=0;canvas.addEventListener('pointerdown',e=>{canvas.setPointerCapture(e.pointerId);pointers.set(e.pointerId,[e.clientX,e.clientY]);pinch=0;auto=false;orbitUI()});
canvas.addEventListener('pointermove',e=>{if(!pointers.has(e.pointerId))return;const old=pointers.get(e.pointerId);pointers.set(e.pointerId,[e.clientX,e.clientY]);if(pointers.size===1){yaw+=(e.clientX-old[0])*.005;pitch=Math.min(1.1,Math.max(-1.1,pitch+(e.clientY-old[1])*.004));}else{const p=[...pointers.values()],d=Math.hypot(p[0][0]-p[1][0],p[0][1]-p[1][1]);if(pinch)zoom=Math.min(1.7,Math.max(.65,zoom*d/pinch));pinch=d;}dirty=true;});
for(const event of ['pointerup','pointercancel','lostpointercapture'])canvas.addEventListener(event,e=>{pointers.delete(e.pointerId);pinch=0});canvas.addEventListener('wheel',e=>{e.preventDefault();zoom=Math.max(.65,Math.min(1.7,zoom*Math.exp(-e.deltaY*.001)));dirty=true;},{passive:false});
function frame(time){const dt=Math.min(45,time-(last||time));last=time;if(!document.hidden&&!$$('dialog').some(d=>d.open)){if(auto){yaw+=dt*.00002;dirty=true;}if(dirty||(!reduced&&time-lastDraw>70))draw(time);}requestAnimationFrame(frame);}
function readRoute(){const parts=location.hash.slice(1).split('/');if(parts[0]==='physics'&&sys(parts[1])){if(planet(parts[2])?.system===parts[1])goPlanet(parts[2]);else goSystem(parts[1]);}else goGalaxy();}
window.GALAXY={goGalaxy,goSystem,goPlanet,nextForMission,startMission,snapshot:()=>({version:'3.0',view:{...view},mission:activeMission,systems:Object.fromEntries(C.systems.map(s=>[s.id,systemState(s.id)])),nodes:viewNodes.map(n=>({id:n.id,type:n.type,state:nodeState(n)})),camera:{yaw,pitch,zoom},renderer:document.body.dataset.renderer,...L.snapshot()})};
window.EMERGENCE={version:'3.0',snapshot:window.GALAXY.snapshot};
window.addEventListener('popstate',readRoute);window.addEventListener('resize',resize);document.addEventListener('visibilitychange',()=>{last=0;dirty=true});
readRoute();resize();orbitUI();if(ctx)requestAnimationFrame(frame);if(!L.snapshot().storage)$('#storage-note').textContent='Persistent storage is unavailable. Records stay only in this tab; use Export JSON before leaving.';
})();
