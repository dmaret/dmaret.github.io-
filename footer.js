// dmaret™ shared toolkit — © 2025–2026
// Ajouter <script src="https://dmaret.github.io/footer.js"></script> avant </body>
(function(){
  var isPortal=location.hostname==='dmaret.github.io'&&(location.pathname==='/'||location.pathname==='/index.html');

  // === STICKY HEADER ===
  var header=document.querySelector('header')||document.querySelector('.header')||document.querySelector('.toolbar');
  if(header){
    header.style.position='sticky';
    header.style.top='0';
    header.style.zIndex='100';
    if(!header.style.background&&!header.style.backgroundColor){
      var cs=window.getComputedStyle(header);
      if(!cs.backgroundColor||cs.backgroundColor==='rgba(0, 0, 0, 0)')header.style.background='#fff';
    }
  }

  // === BACK TO PORTAL BUTTON (not on portal itself) ===
  if(!isPortal){
    var btn=document.createElement('a');
    btn.href='https://dmaret.github.io/';
    btn.innerHTML='\u2190 Portail dmaret';
    btn.style.cssText='position:fixed;bottom:20px;left:20px;z-index:9999;background:#1a1a1a;color:#c4a870;padding:8px 16px;border-radius:20px;font-size:12px;font-family:system-ui,sans-serif;text-decoration:none;box-shadow:0 2px 12px rgba(0,0,0,.3);transition:all .2s;border:1px solid rgba(196,168,112,.3);';
    btn.onmouseover=function(){this.style.background='#2a2a2a';this.style.transform='scale(1.05)';};
    btn.onmouseout=function(){this.style.background='#1a1a1a';this.style.transform='scale(1)';};
    document.body.appendChild(btn);
  }

  // === DARK MODE TOGGLE (on all pages) ===
  var dm=document.createElement('button');
  dm.innerHTML='\u263e';
  dm.title='Mode sombre / clair';
  dm.style.cssText='position:fixed;bottom:20px;right:20px;z-index:9999;background:#1a1a1a;color:#c4a870;width:40px;height:40px;border-radius:50%;border:1px solid rgba(196,168,112,.3);font-size:18px;cursor:pointer;box-shadow:0 2px 12px rgba(0,0,0,.3);transition:all .2s;display:flex;align-items:center;justify-content:center;';
  dm.onmouseover=function(){this.style.transform='scale(1.1)';};
  dm.onmouseout=function(){this.style.transform='scale(1)';};
  var darkOn=localStorage.getItem('dmaret-dark')==='1';
  function applyDark(on){
    if(on){
      document.documentElement.style.filter='invert(0.88) hue-rotate(180deg)';
      var imgs=document.querySelectorAll('img,video,svg,.card-logo');
      for(var i=0;i<imgs.length;i++)imgs[i].style.filter='invert(1) hue-rotate(180deg)';
      dm.innerHTML='\u2600';
      localStorage.setItem('dmaret-dark','1');
    }else{
      document.documentElement.style.filter='';
      var imgs=document.querySelectorAll('img,video,svg,.card-logo');
      for(var i=0;i<imgs.length;i++)imgs[i].style.filter='';
      dm.innerHTML='\u263e';
      localStorage.setItem('dmaret-dark','0');
    }
    darkOn=on;
  }
  dm.onclick=function(){applyDark(!darkOn);};
  if(darkOn)applyDark(true);
  document.body.appendChild(dm);

  // === REMOVE EXISTING SHORT COPYRIGHT FOOTERS ===
  var allEls=document.querySelectorAll('div,p,.copyright-bar');
  for(var i=0;i<allEls.length;i++){
    var el=allEls[i];
    var txt=el.textContent||'';
    // Hide short copyright lines (not the full conditions block)
    if(txt.indexOf('MARET Davie')!==-1&&txt.indexOf('Tous droits')!==-1&&txt.indexOf('Conditions d')===-1&&txt.length<300){
      el.style.display='none';
    }
    if(el.classList&&el.classList.contains('copyright-bar'))el.style.display='none';
  }

  // === FOOTER LEGAL ===
  var d=document.createElement('div');
  d.style.cssText='text-align:center;padding:24px 20px;font-size:10px;color:#a89e90;line-height:1.6;border-top:0.5px solid #d4cfc5;margin-top:40px;background:#f5f2ec;';
  d.innerHTML='<strong style="color:#6b6356;">\u00a9 2025\u20132026 MARET Davie \u2014 Tous droits r\u00e9serv\u00e9s</strong><br><br>'+
    '<strong style="color:#6b6356;">Conditions d\u2019utilisation du code :</strong><br>'+
    '\u2022 Le code source de ces projets est fourni \u00e0 titre informatif et \u00e9ducatif<br>'+
    '\u2022 Toute reproduction, modification ou redistribution du code sans autorisation \u00e9crite est strictement interdite<br>'+
    '\u2022 Les designs, interfaces visuelles et contenus cr\u00e9atifs sont prot\u00e9g\u00e9s par le droit d\u2019auteur<br>'+
    '\u2022 Pour toute demande de r\u00e9utilisation ou de collaboration, contactez l\u2019auteur<br><br>'+
    '<strong style="color:#6b6356;">Attribution :</strong> Si vous utilisez ou vous inspirez de ces projets, veuillez citer la source : dmaret\u2122 \u00a9 2025\u20132026';
  document.body.appendChild(d);
})();
