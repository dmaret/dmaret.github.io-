// dmaret™ shared toolkit v3 — © 2025–2026
// Ajouter <script src="https://dmaret.github.io/footer.js"></script> avant </body>
(function(){
  var isPortal=location.hostname==='dmaret.github.io'&&(location.pathname==='/'||location.pathname==='/index.html');

  // === STICKY HEADER ===
  var header=document.querySelector('header')||document.querySelector('.header')||document.querySelector('.toolbar');
  if(header){
    // Check if there's a tabs bar right after the header
    var tabs=header.nextElementSibling;
    var hasTabs=tabs&&(tabs.classList.contains('tabs-wrapper')||tabs.classList.contains('tabs'));
    if(hasTabs){
      // Wrap header + tabs in a sticky container
      var wrap=document.createElement('div');
      wrap.style.cssText='position:sticky;top:0;z-index:100;';
      header.parentNode.insertBefore(wrap,header);
      wrap.appendChild(header);
      wrap.appendChild(tabs);
    }else{
      header.style.position='sticky';
      header.style.top='0';
      header.style.zIndex='100';
    }
    if(!header.style.background&&!header.style.backgroundColor){
      var cs=window.getComputedStyle(header);
      if(!cs.backgroundColor||cs.backgroundColor==='rgba(0, 0, 0, 0)')header.style.background='#fff';
    }
    // Fix parents with overflow that breaks sticky
    var stickyEl=hasTabs?wrap:header;
    var parent=stickyEl.parentElement;
    while(parent&&parent!==document.body&&parent!==document.documentElement){
      var ps=window.getComputedStyle(parent);
      if(ps.overflow==='hidden'||ps.overflow==='auto'||ps.overflow==='scroll'){
        parent.style.overflow='visible';
      }
      if(ps.overflowX==='hidden')parent.style.overflowX='visible';
      if(ps.overflowY==='hidden'||ps.overflowY==='auto'||ps.overflowY==='scroll'){
        parent.style.overflowY='visible';
      }
      parent=parent.parentElement;
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
  function cleanDuplicateFooters(){
    var footer=document.getElementById('dmaret-footer');
    var all=document.body.getElementsByTagName('*');
    for(var i=0;i<all.length;i++){
      var el=all[i];
      if(el.id==='dmaret-footer')continue;
      if(footer&&footer.contains(el))continue;
      if(el.children&&el.children.length>3)continue;
      var txt=el.textContent||'';
      var hasMaret=txt.indexOf('MARET')!==-1;
      var hasDroits=txt.indexOf('droits')!==-1||txt.indexOf('reproduction')!==-1;
      var hasConditions=txt.indexOf('Conditions')!==-1;
      var isShort=txt.length<300;
      if(hasMaret&&hasDroits&&!hasConditions&&isShort){
        el.style.display='none';
      }
    }
    var bars=document.querySelectorAll('.copyright-bar');
    for(var j=0;j<bars.length;j++)bars[j].style.display='none';
  }
  cleanDuplicateFooters();
  setTimeout(cleanDuplicateFooters,1000);
  setTimeout(cleanDuplicateFooters,3000);
  setTimeout(cleanDuplicateFooters,6000);

  // === FOOTER LEGAL ===
  var d=document.createElement('div');
  d.id='dmaret-footer';
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
