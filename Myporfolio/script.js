/* ===== EDIT YOUR CONTENT HERE ===== */
var skills = [
  ["HTML / CSS",95],["JavaScript / jQuery",90],["WordPress",85],
  ["React / Next.js",80],["AI Automation",75],["TypeScript (Basic)",55]
];
var projects = [
  {icon:"🐶",title:"Little Haven Puppies",img:"images/screenshots/littlehaven.png",tags:["WordPress","Custom Theme","Responsive"],
   desc:"Cavoodle breeder website in Perth, Australia, with puppy pages, a puppy-guide sign-up pop-up, video sections, blog and podcast.",
   demo:"https://w23353.proweaversite23.com/"},
  {icon:"🏢",title:"Trans 1 Facility Management",img:"images/screenshots/transfacility.png",tags:["WordPress","Custom Theme","Gallery"],
   desc:"Facility services site for a Phoenix, AZ company, with a hero slider, service pages, a work gallery and a video section.",
   demo:"https://www.trans1facilitymanagement.com/"},
  {icon:"🧩",title:"NewPath Youth Services",img:"images/screenshots/newpath.png",tags:["WordPress","Forms","Responsive"],
   desc:"Residential therapeutic services site for a North Carolina provider, with service pages, a referral form, a consent-based contact form and a map.",
   demo:"https://www.newpathyouthservices.net/"},
  {icon:"🩺",title:"Precious Medical Center",img:"images/screenshots/precious.png",tags:["WordPress","Custom Theme","Carousel"],
   desc:"Concierge clinic website in Elizabeth, NJ, with a services grid, patient reviews slider, insurance logos and an appointment contact form.",
   demo:"https://w23376.proweaversite23.com/"},
  {icon:"🔐",title:"ElevaTec Solutions",img:"images/screenshots/elevatec.png",tags:["WordPress","Blog","SEO"],
   desc:"Cybersecurity and GRC consulting site, with service pages, FAQs, a blog, a newsletter sign-up and consultation booking.",
   demo:"https://www.elevatecsolutions.com/"}
];
/* =================================== */
$(function(){
  $('#yr').text(new Date().getFullYear());
  // Theme toggle
  var $root=$(document.documentElement),$btn=$('#theme');
  function paint(){var light=$root.attr('data-theme')==='light';
    $btn.text(light?'☾':'☀').attr('aria-label',light?'Switch to dark mode':'Switch to light mode');}
  paint();
  $btn.on('click',function(){
    var next=$root.attr('data-theme')==='light'?'dark':'light';
    $root.attr('data-theme',next);paint();
    try{localStorage.setItem('theme',next)}catch(e){}
  });
  // Smooth scroll for nav and in-page links
  $('a[href^="#"]').on('click',function(e){
    var id=this.getAttribute('href'),$t=$(id);
    if(!$t.length)return;
    e.preventDefault();
    $('html,body').stop().animate({scrollTop:id==='#top'?0:$t.offset().top-$('nav').outerHeight()},700,'swing');
    if(history.pushState)history.pushState(null,'',id);
  });
  $.each(skills,function(_,s){
    $('#skillList').append('<div class="skill"><div class="top"><span>'+s[0]+'</span><i>'+s[1]+'%</i></div><div class="bar"><b data-w="'+s[1]+'"></b></div></div>');
  });
  $.each(projects,function(_,p){
    var thumb=p.img?'<button type="button" class="thumb shot" data-full="'+p.img+'" data-title="'+p.title+'" aria-label="View full screenshot of '+p.title+'"><img src="'+p.img+'" alt="Screenshot of '+p.title+' website" loading="lazy"></button>':'<div class="thumb" aria-hidden="true">'+p.icon+'</div>';
    var chips=$.map(p.tags,function(t){return '<span>'+t+'</span>'}).join('');
    $('#projectList').append('<article class="proj">'+thumb+'<div class="body"><div class="chips">'+chips+'</div><h3>'+p.title+'</h3><div class="role">My part: '+(p.role||'Front-end development')+'</div><p>'+p.desc+'</p><div class="links"><a href="'+p.demo+'" target="_blank" rel="noopener">↗ Live Site</a>'+(p.repo?'<a href="'+p.repo+'" target="_blank" rel="noopener">⌥ GitHub</a>':'')+'</div></div></article>');
  });
  // Fill skill bars once when scrolled into view
  var io=new IntersectionObserver(function(es){es.forEach(function(e){
    if(e.isIntersecting){$(e.target).css('width',$(e.target).data('w')+'%');io.unobserve(e.target);}
  })},{threshold:.4});
  $('.bar b').each(function(){io.observe(this)});
  // Fade-up reveal for each section when it scrolls into view
  var rv=new IntersectionObserver(function(es){es.forEach(function(e){
    if(e.isIntersecting){$(e.target).addClass('in');rv.unobserve(e.target);}
  })},{threshold:.08});
  $('section .wrap').addClass('rv').each(function(){rv.observe(this)});
  // Screenshot lightbox
  var $lb=$('#lightbox'),$last=null;
  function closeLb(){$lb.attr('hidden',true);$('body').css('overflow','');if($last)$last.focus();}
  $('#projectList').on('click','.shot',function(){
    $last=$(this);
    $lb.find('img').attr({src:$last.data('full'),alt:'Full page screenshot of '+$last.data('title')});
    $lb.find('.lb-scroll').scrollTop(0);
    $lb.removeAttr('hidden');$('body').css('overflow','hidden');
    $lb.find('.lb-close').focus();
  });
  $lb.on('click',function(e){if(!$(e.target).closest('.lb-scroll').length)closeLb();});
  $(document).on('keydown',function(e){if(e.key==='Escape'&&!$lb.attr('hidden'))closeLb();});
  // Friendly placeholder if a top-performer image is missing
  $('.perf img').on('error',function(){
    this.src='data:image/svg+xml;utf8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect width="100%" height="100%" fill="#101a26"/><text x="50%" y="50%" fill="#6f7c8c" font-family="monospace" font-size="22" text-anchor="middle">Add top1.jpg to /images</text></svg>');
  });
});
