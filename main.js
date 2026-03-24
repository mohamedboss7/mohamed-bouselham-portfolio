/* =================================================================
   PORTFOLIO — Mohamed Bouselham
   File    : main.js
   Lang    : Vanilla JavaScript ES6+  (zero libraries / zero deps)

   SECTIONS:
   00 — Hamburger Menu
   01 — Scroll Progress Bar
   02 — Smooth Lerp Cursor
   03 — Parallax Grid Canvas  (background)
   04 — 3D Tech Globe         (pure Canvas 2D)
   05 — Text Reveal on Scroll
   06 — Skill Bar Animations
   07 — 3D Card Tilt
   08 — Fade-in on Scroll
================================================================= */

/* ══════════════════════════════════════════════════════════
   Mohamed Bouselham — Portfolio
   File    : main.js
   Desc    : All interactivity — pure Vanilla JS, no libraries

   Sections:
     1. Scroll Progress Bar
     2. Smooth Lerp Cursor
     3. Parallax Grid Canvas
     4. 3D Tech Globe (Three-like, pure Canvas 2D)
     5. Text Reveal on Scroll
     6. Skill Bar Animations
     7. 3D Card Tilt
     8. Fade-in on Scroll
     9. PCB Canvas Engine
══════════════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════════
   PORTFOLIO — Mohamed Bouselham
   main.js — All interactivity
   ─ Scroll Progress Bar
   ─ Smooth Lerp Cursor
   ─ Parallax Grid Canvas (background)
   ─ 3D Tech Globe (hero section)
   ─ Text Reveal on scroll
   ─ Skill Bar animations
   ─ 3D Card Tilt
   ─ Fade-in on scroll
   ─ PCB Canvas Engine
══════════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════
   0. HAMBURGER MENU
══════════════════════════════════════════════════ */
(function(){
  var btn      = document.getElementById('hamburger');
  var nav      = document.getElementById('mobileNav');
  var overlay  = document.getElementById('mnOverlay');
  if(!btn) return;

  function openMenu(){
    btn.classList.add('open');
    nav.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow='hidden';
  }
  window.closeMenu = function(){
    btn.classList.remove('open');
    nav.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow='';
  };
  btn.addEventListener('click', function(){
    btn.classList.contains('open') ? closeMenu() : openMenu();
  });
  overlay.addEventListener('click', closeMenu);
  // close on ESC
  document.addEventListener('keydown', function(e){
    if(e.key==='Escape') closeMenu();
  });
})();

/* ══════════════════════════════════════════════════
   1. SCROLL PROGRESS BAR
══════════════════════════════════════════════════ */
(function(){
  const bar = document.getElementById('sp');
  window.addEventListener('scroll', function(){
    bar.style.width = (window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100) + '%';
  }, {passive:true});
})();

/* ══════════════════════════════════════════════════
   2. SMOOTH LERP CURSOR
══════════════════════════════════════════════════ */
(function(){
  // skip on touch devices — no cursor needed on mobile
  if(window.matchMedia('(hover:none)').matches) return;
  const dot  = document.getElementById('cdot');
  const ring = document.getElementById('cring');
  let mx=0, my=0, rx=0, ry=0;
  document.addEventListener('mousemove', function(e){ mx=e.clientX; my=e.clientY; });
  (function loop(){
    rx += (mx-rx)*0.095; ry += (my-ry)*0.095;
    dot.style.left  = mx + 'px'; dot.style.top  = my + 'px';
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(loop);
  })();
  document.querySelectorAll('a,button,.skc,.pcard,.cc').forEach(function(el){
    el.addEventListener('mouseenter', function(){ document.body.classList.add('hov'); });
    el.addEventListener('mouseleave', function(){ document.body.classList.remove('hov'); });
  });
})();

/* ══════════════════════════════════════════════════
   3. PARALLAX GRID CANVAS (background)
══════════════════════════════════════════════════ */
(function(){
  var canvas = document.getElementById('gc');
  var ctx    = canvas.getContext('2d');
  var W, H, tgx=0, tgy=0, cgx=0, cgy=0, mx=0, my=0;
  function resize(){ W = canvas.width = innerWidth; H = canvas.height = innerHeight; }
  resize();
  window.addEventListener('resize', resize);
  document.addEventListener('mousemove', function(e){
    mx=e.clientX; my=e.clientY;
    tgx=(e.clientX/W-.5)*44; tgy=(e.clientY/H-.5)*44;
  }, {passive:true});
  var gridActive = true;
  window.addEventListener('scroll', function(){
    gridActive = window.scrollY < window.innerHeight * 1.5;
  }, {passive:true});

  (function loop(){
    if(!gridActive){ ctx.clearRect(0,0,W,H); requestAnimationFrame(loop); return; }
    cgx += (tgx-cgx)*.038; cgy += (tgy-cgy)*.038;
    ctx.clearRect(0,0,W,H);
    var sp=68, cols=Math.ceil(W/sp)+4, rows=Math.ceil(H/sp)+4;
    var ox=((cgx%sp)+sp)%sp, oy=((cgy%sp)+sp)%sp;
    ctx.strokeStyle='rgba(0,207,255,0.032)'; ctx.lineWidth=1; ctx.beginPath();
    for(var c=0;c<cols;c++){var x=c*sp+ox-sp;ctx.moveTo(x,0);ctx.lineTo(x,H);}
    for(var r=0;r<rows;r++){var y=r*sp+oy-sp;ctx.moveTo(0,y);ctx.lineTo(W,y);}
    ctx.stroke();
    var sp2=sp*2, ox2=((cgx*1.6%sp2)+sp2)%sp2, oy2=((cgy*1.6%sp2)+sp2)%sp2;
    ctx.strokeStyle='rgba(0,207,255,0.05)'; ctx.lineWidth=1; ctx.beginPath();
    for(var c2=0;c2<Math.ceil(W/sp2)+3;c2++){var x2=c2*sp2+ox2-sp2;ctx.moveTo(x2,0);ctx.lineTo(x2,H);}
    for(var r2=0;r2<Math.ceil(H/sp2)+3;r2++){var y2=r2*sp2+oy2-sp2;ctx.moveTo(0,y2);ctx.lineTo(W,y2);}
    ctx.stroke();
    var gh=ctx.createRadialGradient(mx,my,0,mx,my,200);
    gh.addColorStop(0,'rgba(0,207,255,0.11)'); gh.addColorStop(1,'transparent');
    ctx.fillStyle=gh; ctx.fillRect(0,0,W,H);
    var cols2=Math.ceil(W/sp2)+3, rows2=Math.ceil(H/sp2)+3;
    for(var ci=-1;ci<cols2;ci++){
      for(var ri=-1;ri<rows2;ri++){
        var nx=ci*sp2+ox2-sp2, ny=ri*sp2+oy2-sp2;
        var d=Math.hypot(nx-mx,ny-my);
        if(d<220){
          var a=(1-d/220)*.55;
          ctx.fillStyle='rgba(255,106,0,'+a+')';
          ctx.beginPath(); ctx.arc(nx,ny,2.5,0,Math.PI*2); ctx.fill();
          if(d<100){
            ctx.strokeStyle='rgba(255,106,0,'+(1-d/100)*.25+')';
            ctx.lineWidth=1; ctx.beginPath();
            ctx.moveTo(nx-6,ny);ctx.lineTo(nx+6,ny);
            ctx.moveTo(nx,ny-6);ctx.lineTo(nx,ny+6);
            ctx.stroke();
          }
        }
      }
    }
    requestAnimationFrame(loop);
  })();
})();

/* ══════════════════════════════════════════════════
   4. 3D TECH GLOBE
══════════════════════════════════════════════════ */
(function(){
  var canvas = document.getElementById('globe-canvas');
  if(!canvas) return;
  var ctx = canvas.getContext('2d');

  /* ── Load profile photo ── */
  var profileImg = new Image();
  var imgLoaded = false;
  profileImg.onload = function(){ imgLoaded = true; };
  profileImg.src = 'photo.jpg';
  var DPR = Math.min(window.devicePixelRatio || 1, 2);
  var SIZE = canvas.offsetWidth || 480;
  var R = SIZE * 0.355;
  canvas.width  = SIZE * DPR;
  canvas.height = SIZE * DPR;
  ctx.scale(DPR, DPR);
  var CX = SIZE/2, CY = SIZE/2;
  
  // Resize observer to handle canvas size changes
  if(window.ResizeObserver){
    new ResizeObserver(function(){
      SIZE = canvas.offsetWidth || 480;
      R = SIZE * 0.355;
      canvas.width  = SIZE * DPR;
      canvas.height = SIZE * DPR;
      ctx.scale(DPR, DPR);
      CX = SIZE/2; CY = SIZE/2;
    }).observe(canvas);
  }

  /* icons config */
  var ICONS = [
    { name:'Python',   color:'#FFD43B', bg:'#3776AB', symbol:'PY'  },
    { name:'JavaScript',color:'#F7DF1E',bg:'#323330', symbol:'JS'  },
    { name:'C++',      color:'#00AEEF', bg:'#00427E', symbol:'C++' },
    { name:'C#',       color:'#9B4F96', bg:'#1e0a2e', symbol:'C#'  },
    { name:'PHP',      color:'#AEB2D5', bg:'#4F5B93', symbol:'PHP' },
    { name:'HTML5',    color:'#fff',    bg:'#E34F26', symbol:'HTML'},
    { name:'CSS3',     color:'#fff',    bg:'#1572B6', symbol:'CSS' },
    { name:'PyCharm',  color:'#21D789', bg:'#000',    symbol:'PC'  },
    { name:'React',    color:'#61DAFB', bg:'#20232a', symbol:'RE'  },
    { name:'GitHub',   color:'#fff',    bg:'#161b22', symbol:'GH'  },
    { name:'Node.js',  color:'#fff',    bg:'#339933', symbol:'NODE'},
    { name:'VS Code',  color:'#007ACC', bg:'#1e1e1e', symbol:'VS'  },
  ];

  /* Fibonacci sphere positions */
  var nodes = ICONS.map(function(icon, i){
    var phi   = Math.acos(1 - 2*(i+0.5)/ICONS.length);
    var theta = Math.PI * (1+Math.sqrt(5)) * i;
    return { icon:icon, phi:phi, baseTheta:theta, pulse:Math.random()*Math.PI*2 };
  });

  /* latitude grid dots */
  var dots = [];
  for(var lat=-80; lat<=80; lat+=15){
    var latR = lat*Math.PI/180;
    var count = Math.max(1, Math.round(Math.cos(latR)*24));
    for(var i=0;i<count;i++){
      dots.push({ lat:latR, lon:(i/count)*Math.PI*2 });
    }
  }

  var autoRot = 0;
  var tiltX = 0.25;
  var hovered = null;

  /* project 3D point to 2D */
  function project(phi, theta){
    var x = R*Math.sin(phi)*Math.cos(theta);
    var y = R*Math.cos(phi);
    var z = R*Math.sin(phi)*Math.sin(theta);
    var y2 = y*Math.cos(tiltX) - z*Math.sin(tiltX);
    var z2 = y*Math.sin(tiltX) + z*Math.cos(tiltX);
    return { x:CX+x, y:CY+y2, z:z2 };
  }

  /* mouse */
  canvas.style.pointerEvents = 'all';
  var mouseNear = false;
  var photoReveal = 0;

  /* ── Tech Rain Particles (binary + symbols) ── */
  var techChars = '01001011 10110100 01101001 0xFF 0x2A 10101010 NULL TRUE #!/usr/bin import def class return void int[]'.split(' ');
  var techSymbols = ['01','10','{}','[]','>>','<<','0x','//','&&','||','!=','==','++','--','**','Pi','AI','IO','Hz','Ω','λ','∑','≠','∞'];
  var rainDrops = [];
  for(var ri3=0; ri3<55; ri3++){
    var angle3 = Math.random()*Math.PI*2;
    var dist3  = Math.random()*R*0.92;
    rainDrops.push({
      // polar position inside sphere
      angle: angle3,
      dist:  dist3,
      x: CX + Math.cos(angle3)*dist3,
      y: CY + Math.sin(angle3)*dist3,
      // animation
      speed:  0.18 + Math.random()*0.55,
      char:   techSymbols[Math.floor(Math.random()*techSymbols.length)],
      timer:  Math.random()*3,
      changeEvery: 0.35 + Math.random()*0.8,
      fontSize: 8 + Math.floor(Math.random()*9),
      color:  Math.random() > 0.5 ? 'cyan' : (Math.random()>0.5?'orange':'lime'),
      alpha:  0.4 + Math.random()*0.6,
      // drift
      driftX: (Math.random()-0.5)*0.4,
      driftY: (Math.random()-0.5)*0.4,
    });
  }
  /* scan line */
  var scanY2 = 0;

  canvas.addEventListener('mousemove', function(e){
    var rect = canvas.getBoundingClientRect();
    var mx = (e.clientX - rect.left) * (SIZE / rect.width);
    var my = (e.clientY - rect.top)  * (SIZE / rect.height);
    var distToCenter = Math.hypot(mx-CX, my-CY);
    mouseNear = distToCenter < R;
    hovered = null;
    nodes.forEach(function(n){
      var p = project(n.phi, n.baseTheta + autoRot);
      if(p.z > -10){
        var d = Math.hypot(p.x-mx, p.y-my);
        if(d < 32) hovered = n;
      }
    });
  });
  canvas.addEventListener('mouseleave', function(){ hovered = null; mouseNear = false; });

  /* draw rounded rect */
  function rr(x,y,w,h,r){
    ctx.beginPath();
    ctx.moveTo(x+r,y);
    ctx.lineTo(x+w-r,y); ctx.arcTo(x+w,y,x+w,y+r,r);
    ctx.lineTo(x+w,y+h-r); ctx.arcTo(x+w,y+h,x+w-r,y+h,r);
    ctx.lineTo(x+r,y+h); ctx.arcTo(x,y+h,x,y+h-r,r);
    ctx.lineTo(x,y+r); ctx.arcTo(x,y,x+r,y,r);
    ctx.closePath();
  }

  /* draw one icon badge */
  function drawBadge(x, y, size, icon, isHov, alpha){
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x, y);
    var r = size/2;
    if(isHov){
      ctx.shadowColor = icon.color;
      ctx.shadowBlur  = 30;
    }
    /* badge circle */
    ctx.beginPath(); ctx.arc(0,0,r,0,Math.PI*2);
    ctx.fillStyle = icon.bg; ctx.fill();
    ctx.strokeStyle = icon.color;
    ctx.lineWidth = isHov ? 3 : 1.8;
    ctx.stroke();
    ctx.shadowBlur = 0;

    /* symbol text */
    var fs = size * 0.28;
    ctx.font = 'bold '+fs+'px Orbitron,monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = icon.color;
    ctx.fillText(icon.symbol, 0, 0);

    ctx.restore();
  }

  /* draw dashed orbit ellipse */
  function drawOrbit(tilt, phase, color){
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth   = 0.8;
    ctx.setLineDash([4,7]);
    ctx.globalAlpha = 0.3;
    ctx.beginPath();
    var first=true;
    for(var a=0; a<Math.PI*2; a+=0.04){
      var ex = R*1.22 * Math.cos(a);
      var ey = R*1.22 * Math.sin(a) * Math.abs(Math.sin(tilt));
      var ez = R*1.22 * Math.sin(a) * Math.cos(tilt);
      var ey2 = ey*Math.cos(tiltX+phase*0.1) - ez*Math.sin(tiltX+phase*0.1);
      if(first){ ctx.moveTo(CX+ex, CY+ey2); first=false; }
      else       ctx.lineTo(CX+ex, CY+ey2);
    }
    ctx.closePath(); ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  /* main loop */
  var lastTime=0, globeVisible=true;
  var globeObs = new IntersectionObserver(function(e){
    globeVisible = e[0].isIntersecting;
  }, {threshold:0});
  globeObs.observe(canvas);

  function frame(ts){
    if(!globeVisible){ requestAnimationFrame(frame); return; }
    if(ts - lastTime < 25){ requestAnimationFrame(frame); return; } // cap ~40fps
    var dt = Math.min((ts-lastTime)/1000, 0.05);
    lastTime = ts;
    autoRot += dt * 0.3;

    /* smooth tech overlay reveal */
    if(mouseNear && photoReveal < 1) photoReveal = Math.min(1, photoReveal + dt*2.5);
    else if(!mouseNear && photoReveal > 0) photoReveal = Math.max(0, photoReveal - dt*2.0);

    ctx.clearRect(0,0,SIZE,SIZE);

    /* ambient glow behind sphere */
    var ag = ctx.createRadialGradient(CX,CY,R*0.3,CX,CY,R*1.8);
    ag.addColorStop(0,'rgba(0,100,255,0.07)');
    ag.addColorStop(0.5,'rgba(255,80,0,0.03)');
    ag.addColorStop(1,'transparent');
    ctx.fillStyle=ag; ctx.fillRect(0,0,SIZE,SIZE);

    /* sphere body */
    var sg = ctx.createRadialGradient(CX-50,CY-50,5,CX,CY,R);
    sg.addColorStop(0,'rgba(0,50,100,0.92)');
    sg.addColorStop(0.6,'rgba(0,15,40,0.90)');
    sg.addColorStop(1,'rgba(0,5,15,0.88)');
    ctx.beginPath(); ctx.arc(CX,CY,R,0,Math.PI*2);
    ctx.fillStyle=sg; ctx.fill();

    /* ── Profile photo inside sphere ── */
    if(imgLoaded){
      ctx.save();
      // clip to sphere circle
      ctx.beginPath(); ctx.arc(CX,CY,R-2,0,Math.PI*2); ctx.clip();
      // subtle pulse scale
      var photoScale = 1 + 0.018*Math.sin(autoRot*0.7);
      var pw = R*2.1*photoScale, ph = R*2.1*photoScale;
      var px = CX - pw/2, py = CY - ph/2;
      // draw image dimmed + tinted
      // photo always visible
      ctx.globalAlpha = 0.55;
      ctx.drawImage(profileImg, px, py, pw, ph);

      // dark vignette overlay
      ctx.globalAlpha = 1;
      var tint = ctx.createRadialGradient(CX,CY,R*0.3,CX,CY,R);
      tint.addColorStop(0,'rgba(0,10,30,0.15)');
      tint.addColorStop(0.65,'rgba(0,8,25,0.45)');
      tint.addColorStop(1,'rgba(0,3,15,0.88)');
      ctx.fillStyle = tint;
      ctx.beginPath(); ctx.arc(CX,CY,R,0,Math.PI*2); ctx.fill();
      ctx.restore();
    }

    /* atmosphere rim glow */
    var rim = ctx.createRadialGradient(CX,CY,R-2,CX,CY,R+22);
    rim.addColorStop(0,'transparent');
    rim.addColorStop(0.5,'rgba(0,180,255,0.22)');
    rim.addColorStop(1,'transparent');
    ctx.beginPath(); ctx.arc(CX,CY,R+22,0,Math.PI*2);
    ctx.fillStyle=rim; ctx.fill();

    /* grid dots */
    var back=[], front=[];
    dots.forEach(function(d){
      var t = d.lon + autoRot;
      var x3 = R*Math.cos(d.lat)*Math.cos(t);
      var y3 = R*Math.sin(d.lat);
      var z3 = R*Math.cos(d.lat)*Math.sin(t);
      var y4 = y3*Math.cos(tiltX)-z3*Math.sin(tiltX);
      var z4 = y3*Math.sin(tiltX)+z3*Math.cos(tiltX);
      (z4>0?front:back).push({sx:CX+x3,sy:CY+y4,z:z4});
    });
    back.forEach(function(d){
      ctx.beginPath(); ctx.arc(d.sx,d.sy,0.9,0,Math.PI*2);
      ctx.fillStyle='rgba(0,130,220,0.07)'; ctx.fill();
    });
    front.forEach(function(d){
      var br = d.z/R;
      ctx.beginPath(); ctx.arc(d.sx,d.sy,1.3,0,Math.PI*2);
      ctx.fillStyle='rgba(0,200,255,'+(0.2+br*0.35)+')'; ctx.fill();
    });

    /* orbit rings */
    drawOrbit(0.5,  autoRot,     'rgba(255,106,0,0.9)');
    drawOrbit(-0.7, autoRot*0.7, 'rgba(0,207,255,0.9)');
    drawOrbit(1.2,  autoRot*1.4, 'rgba(0,255,180,0.7)');

    /* project + sort nodes */
    var proj = nodes.map(function(n){
      var t = n.baseTheta + autoRot;
      var p = project(n.phi, t);
      return { n:n, sx:p.x, sy:p.y, sz:p.z };
    }).sort(function(a,b){ return a.sz-b.sz; });

    /* back icons */
    proj.filter(function(p){ return p.sz<=0; }).forEach(function(p){
      var alpha = Math.max(0.05, (1+p.sz/R)*0.3);
      drawBadge(p.sx, p.sy, 22, p.n.icon, false, alpha);
    });

    /* sphere highlight shine */
    ctx.save();
    ctx.beginPath(); ctx.arc(CX,CY,R,0,Math.PI*2); ctx.clip();
    var sh = ctx.createRadialGradient(CX-60,CY-70,5,CX-20,CY-30,R);
    sh.addColorStop(0,'rgba(255,255,255,0.07)');
    sh.addColorStop(1,'transparent');
    ctx.fillStyle=sh; ctx.fillRect(0,0,SIZE,SIZE);
    ctx.restore();

    /* front icons */
    proj.filter(function(p){ return p.sz>0; }).forEach(function(p){
      var isH  = p.n===hovered;
      var depth= p.sz/R;
      var alpha= 0.55+depth*0.45;
      var size = 30+depth*18 + (isH?10:0);
      drawBadge(p.sx, p.sy, size, p.n.icon, isH, alpha);
      if(isH){
        ctx.save();
        ctx.globalAlpha=1;
        ctx.font='bold 11px "Share Tech Mono",monospace';
        ctx.textAlign='center'; ctx.textBaseline='top';
        ctx.shadowColor=p.n.icon.color; ctx.shadowBlur=12;
        ctx.fillStyle='#fff';
        ctx.fillText(p.n.icon.name, p.sx, p.sy+size/2+4);
        ctx.shadowBlur=0; ctx.restore();
      }
    });

    /* ── TECH RAIN EFFECT on hover ── */
    if(photoReveal > 0.01){
      ctx.save();
      ctx.beginPath(); ctx.arc(CX,CY,R-2,0,Math.PI*2); ctx.clip();

      // Horizontal scan line sweeping down
      scanY2 += dt * 90;
      if(scanY2 > CY+R) scanY2 = CY-R;
      var scanGr = ctx.createLinearGradient(0,scanY2-6,0,scanY2+6);
      scanGr.addColorStop(0,'transparent');
      scanGr.addColorStop(0.5,'rgba(0,255,200,'+(photoReveal*0.35)+')');
      scanGr.addColorStop(1,'transparent');
      ctx.fillStyle=scanGr; ctx.fillRect(CX-R,scanY2-6,R*2,12);

      // binary/symbol rain drops
      rainDrops.forEach(function(drop){
        drop.timer += dt;
        // drift slowly
        drop.x += drop.driftX;
        drop.y += drop.driftY;
        // bounce inside sphere
        var dx2=drop.x-CX, dy2=drop.y-CY;
        if(Math.hypot(dx2,dy2) > R*0.88){
          drop.driftX *= -1; drop.driftY *= -1;
          drop.x += drop.driftX*3; drop.y += drop.driftY*3;
        }
        // change char periodically
        if(drop.timer > drop.changeEvery){
          drop.char = techSymbols[Math.floor(Math.random()*techSymbols.length)];
          drop.timer = 0;
          drop.changeEvery = 0.3 + Math.random()*0.7;
        }
        // color mapping
        var col;
        if(drop.color==='cyan')   col='rgba(0,230,255,';
        else if(drop.color==='orange') col='rgba(255,120,0,';
        else col='rgba(0,255,120,';

        var finalAlpha = drop.alpha * photoReveal;
        ctx.font = 'bold '+drop.fontSize+'px "Share Tech Mono",monospace';
        ctx.textAlign='center';
        // glow
        ctx.shadowColor = drop.color==='cyan'?'#00e6ff':(drop.color==='orange'?'#ff7800':'#00ff78');
        ctx.shadowBlur  = 8 * photoReveal;
        ctx.fillStyle   = col + finalAlpha + ')';
        ctx.fillText(drop.char, drop.x, drop.y);
        ctx.shadowBlur  = 0;
      });

      // corner binary blocks (top-left / bottom-right inside sphere)
      var binaryLines = ['01001101','10110010','11001010','01110101','10001011'];
      ctx.font='bold 7px "Share Tech Mono",monospace';
      ctx.textAlign='left';
      binaryLines.forEach(function(line,i){
        ctx.fillStyle='rgba(0,255,120,'+(0.18*photoReveal)+')';
        ctx.fillText(line, CX-R+14, CY-R*0.6+i*13);
      });
      // right side hex values
      var hexLines=['0xFF3A','0x00CF','0x4E2B','0xA1D0','0x7F00'];
      ctx.textAlign='right';
      hexLines.forEach(function(line,i){
        ctx.fillStyle='rgba(255,120,0,'+(0.18*photoReveal)+')';
        ctx.fillText(line, CX+R-14, CY+R*0.2+i*13);
      });

      // circuit corner marks
      ctx.strokeStyle='rgba(0,207,255,'+(0.4*photoReveal)+')';
      ctx.lineWidth=1.5;
      // top-left corner bracket
      var bx2=CX-R*0.7, by2=CY-R*0.7;
      ctx.beginPath(); ctx.moveTo(bx2+12,by2); ctx.lineTo(bx2,by2); ctx.lineTo(bx2,by2+12); ctx.stroke();
      // top-right
      ctx.beginPath(); ctx.moveTo(CX+R*0.7-12,by2); ctx.lineTo(CX+R*0.7,by2); ctx.lineTo(CX+R*0.7,by2+12); ctx.stroke();
      // bottom-left
      ctx.beginPath(); ctx.moveTo(bx2+12,CY+R*0.7); ctx.lineTo(bx2,CY+R*0.7); ctx.lineTo(bx2,CY+R*0.7-12); ctx.stroke();
      // bottom-right
      ctx.beginPath(); ctx.moveTo(CX+R*0.7-12,CY+R*0.7); ctx.lineTo(CX+R*0.7,CY+R*0.7); ctx.lineTo(CX+R*0.7,CY+R*0.7-12); ctx.stroke();



      ctx.restore();
    }

    /* sphere border */
    ctx.beginPath(); ctx.arc(CX,CY,R,0,Math.PI*2);
    ctx.strokeStyle='rgba(0,200,255,0.18)'; ctx.lineWidth=1.5; ctx.stroke();

    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();

/* ══════════════════════════════════════════════════
   5. TEXT REVEAL
══════════════════════════════════════════════════ */
(function(){
  document.querySelectorAll('#hero .ri').forEach(function(el){
    var d = parseInt(el.dataset.d||0)+300;
    setTimeout(function(){ el.classList.add('on'); }, d);
  });
  var labObs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting) e.target.classList.add('on'); });
  },{threshold:.4});
  document.querySelectorAll('.slabel').forEach(function(l){ labObs.observe(l); });
  var rvObs = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.querySelectorAll('.ri:not(.on)').forEach(function(el,i){
          setTimeout(function(){ el.classList.add('on'); }, i*130);
        });
      }
    });
  },{threshold:.15});
  document.querySelectorAll('section:not(#hero)').forEach(function(s){ rvObs.observe(s); });
})();

/* ══════════════════════════════════════════════════
   6. SKILL BAR ANIMATION
══════════════════════════════════════════════════ */
(function(){
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        e.target.querySelectorAll('.skfill').forEach(function(b){
          setTimeout(function(){ b.style.width=b.dataset.w+'%'; },200);
        });
        obs.unobserve(e.target);
      }
    });
  },{threshold:.3});
  document.querySelectorAll('.skc').forEach(function(c){ obs.observe(c); });
})();

/* ══════════════════════════════════════════════════
   7. 3D CARD TILT
══════════════════════════════════════════════════ */
(function(){
  document.querySelectorAll('[data-tilt]').forEach(function(card){
    card.addEventListener('mouseenter', function(){ card.style.transition='none'; });
    card.addEventListener('mousemove', function(e){
      var r  = card.getBoundingClientRect();
      var dx = (e.clientX-r.left-r.width/2)/(r.width/2);
      var dy = (e.clientY-r.top-r.height/2)/(r.height/2);
      card.style.transform='perspective(800px) rotateX('+(-dy*9)+'deg) rotateY('+(dx*13)+'deg) scale(1.025) translateZ(12px)';
    });
    card.addEventListener('mouseleave', function(){
      card.style.transition='transform .55s cubic-bezier(.25,.46,.45,.94),border-color .3s,box-shadow .3s';
      card.style.transform='perspective(800px) rotateX(0) rotateY(0) scale(1) translateZ(0)';
      setTimeout(function(){ card.style.transition=''; },600);
    });
  });
})();

/* ══════════════════════════════════════════════════
   8. FADE-IN ON SCROLL
══════════════════════════════════════════════════ */
(function(){
  document.querySelectorAll('.term,.pcard').forEach(function(el){
    el.style.opacity='0';
    el.style.transform='translateY(30px)';
    el.style.transition='opacity .7s ease,transform .75s cubic-bezier(.16,1,.3,1)';
    var o=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ e.target.style.opacity='1'; e.target.style.transform='translateY(0)'; o.disconnect(); }
      });
    },{threshold:.1});
    o.observe(el);
  });
  document.querySelectorAll('.cc').forEach(function(card,i){
    card.style.opacity='0';
    card.style.transform='translateY(22px) scale(.97)';
    var o=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          setTimeout(function(){
            e.target.style.opacity='1';
            e.target.style.transform='translateY(0) scale(1)';
            e.target.style.transition='opacity .65s ease,transform .65s cubic-bezier(.16,1,.3,1),border-color .35s,box-shadow .35s';
          },i*80);
          o.disconnect();
        }
      });
    },{threshold:.08});
    o.observe(card);
  });
})();