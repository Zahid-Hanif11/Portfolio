(function(){
 var root=document.documentElement,links=document.getElementById('links'),RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
 document.getElementById('menu').onclick=function(){links.classList.toggle('open')};
 links.addEventListener('click',function(e){if(e.target.tagName==='A')links.classList.remove('open')});
 document.getElementById('theme').onclick=function(){root.setAttribute('data-theme',root.getAttribute('data-theme')==='dark'?'light':'dark');cols()};
 var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('on');io.unobserve(x.target)}})},{threshold:.12});
 document.querySelectorAll('.rv').forEach(function(el){io.observe(el)});
 document.getElementById('form').addEventListener('submit',function(e){
  e.preventDefault();
  var g=function(i){return document.getElementById(i).value};
  location.href='mailto:zahidhanif017@gmail.com?subject='+encodeURIComponent(g('s'))+'&body='+encodeURIComponent('Name: '+g('n')+'\nEmail: '+g('e')+'\n\n'+g('m'));
 });
 /* typewriter */
 var roles=['Computer Science Student','Cybersecurity Enthusiast','Python, C & C++ Developer','Network Defense Learner'],ri=0,ci=0,del=false,el=document.getElementById('role');
 if(RM){el.textContent=roles[0]}else(function tick(){
  var w=roles[ri];ci+=del?-1:1;el.textContent=w.slice(0,ci);
  var d=del?35:75;
  if(!del&&ci===w.length){del=true;d=1400}else if(del&&ci===0){del=false;ri=(ri+1)%roles.length;d=300}
  setTimeout(tick,d);
 })();
 /* network globe */
 var c=document.getElementById('globe'),x=c.getContext('2d'),W=0,S=1,A1='#8b6dff',A2='#2cc4ff',pts=[],ed=[],pu=[],ry=0,rx=.35,tx=.35,dr=false,lx=0,ly=0,vis=true,N=120,i,j;
 function cols(){var s=getComputedStyle(root);A1=s.getPropertyValue('--a1').trim()||A1;A2=s.getPropertyValue('--a2').trim()||A2}
 cols();
 for(i=0;i<N;i++){var y=1-i/(N-1)*2,r=Math.sqrt(1-y*y),t=i*2.399963;pts.push([Math.cos(t)*r,y,Math.sin(t)*r])}
 for(i=0;i<N;i++)for(j=i+1;j<N;j++){var a=pts[i],b=pts[j],d=Math.hypot(a[0]-b[0],a[1]-b[1],a[2]-b[2]);if(d<.52)ed.push([i,j])}
 function size(){var d=window.devicePixelRatio||1,w=c.clientWidth;if(!w)return;W=w;S=d;c.width=w*d;c.height=w*d}
 addEventListener('resize',size);size();
 function rot(p){var cy=Math.cos(ry),sy=Math.sin(ry),cx=Math.cos(rx),sx=Math.sin(rx),X=p[0]*cy+p[2]*sy,Z=-p[0]*sy+p[2]*cy,Y=p[1]*cx-Z*sx;Z=p[1]*sx+Z*cx;var k=3/(3.2-Z);return[W/2+X*k*W*.36,W/2+Y*k*W*.36,Z,k]}
 function draw(){
  if(!W){size()}
  x.setTransform(S,0,0,S,0,0);x.clearRect(0,0,W,W);
  var g=x.createRadialGradient(W/2,W/2,W*.05,W/2,W/2,W*.46);g.addColorStop(0,'transparent');g.addColorStop(.85,'transparent');g.addColorStop(1,A1);
  x.globalAlpha=.16;x.fillStyle=g;x.beginPath();x.arc(W/2,W/2,W*.46,0,6.2832);x.fill();
  var P=pts.map(rot),k;
  x.lineWidth=1;x.strokeStyle=A2;
  for(k=0;k<ed.length;k++){var p=P[ed[k][0]],q=P[ed[k][1]],z=(p[2]+q[2])/2;x.globalAlpha=Math.max(.04,.1+.3*(z+1)/2);x.beginPath();x.moveTo(p[0],p[1]);x.lineTo(q[0],q[1]);x.stroke()}
  for(k=0;k<N;k++){var n=P[k],f=(n[2]+1)/2;x.globalAlpha=.25+.75*f;x.fillStyle=f>.55?A2:A1;x.beginPath();x.arc(n[0],n[1],(1.2+2.2*f)*n[3]*W/520+.6,0,6.2832);x.fill()}
  if(!RM){
   if(pu.length<7&&Math.random()<.06)pu.push([ed[Math.random()*ed.length|0],0]);
   for(k=pu.length-1;k>=0;k--){var u=pu[k],p2=P[u[0][0]],q2=P[u[0][1]];u[1]+=.025;if(u[1]>1){pu.splice(k,1);continue}
    var px=p2[0]+(q2[0]-p2[0])*u[1],py=p2[1]+(q2[1]-p2[1])*u[1];x.globalAlpha=.9;x.fillStyle='#fff';x.shadowColor=A2;x.shadowBlur=12;x.beginPath();x.arc(px,py,2.4,0,6.2832);x.fill();x.shadowBlur=0}
  }
  x.globalAlpha=1;
 }
 function loop(){
  if(vis){if(!dr&&!RM)ry+=.004;rx+=(tx-rx)*.06;draw()}
  requestAnimationFrame(loop)
 }
 c.addEventListener('pointerdown',function(e){dr=true;lx=e.clientX;ly=e.clientY;c.setPointerCapture(e.pointerId)});
 c.addEventListener('pointermove',function(e){if(dr){ry+=(e.clientX-lx)*.008;tx=Math.max(-1,Math.min(1,tx+(e.clientY-ly)*.006));lx=e.clientX;ly=e.clientY}});
 ['pointerup','pointercancel'].forEach(function(t){c.addEventListener(t,function(){dr=false;tx=.35})});
 new IntersectionObserver(function(es){vis=es[0].isIntersecting}).observe(c);
 matchMedia('(prefers-color-scheme: dark)').addEventListener('change',cols);
 if(RM)draw();else loop();
})();
