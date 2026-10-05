const $ = s => document.querySelector(s);
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const heroVideo = $('#hero-video');
const gameVideo = $('#game-video');
const motionToggle = $('#motion-toggle');
let motionPaused = reducedMotion.matches;
function reflectMotion(){motionToggle.textContent=heroVideo.paused?'▶':'Ⅱ';motionToggle.setAttribute('aria-label',heroVideo.paused?'Play background video':'Pause background video');}
if(motionPaused)heroVideo.pause();
heroVideo.addEventListener('play',reflectMotion);heroVideo.addEventListener('pause',reflectMotion);
motionToggle.addEventListener('click',()=>{motionPaused=!heroVideo.paused;if(motionPaused)heroVideo.pause();else heroVideo.play().catch(()=>{});reflectMotion();});reflectMotion();
const games={meteor:{stamp:'DEFEND',description:'Move your hands to steer the shields and protect the city from falling meteors. One hand or two—it’s your call.',label:'Meteor Keeper demo'},cooking:{stamp:'COOK',description:'Chop your ingredients, drop them in the pot, and make a little imaginary soup. All with hand gestures.',label:'Cooking game demo'},physics:{stamp:'EXPLORE',description:'Close your hand to grab the ball, move it through the room, then open your hand to let gravity take over.',label:'Grab, drag, and release a ball demo'},drawing:{stamp:'CREATE',description:'Trace a line with your hand and turn the projected space into a canvas. Leave the wall paint exactly where it is.',label:'Drawing a heart with hand gestures demo'}};
const tabs=[...document.querySelectorAll('.game-tab')];
function selectGame(tab){const key=tab.dataset.game;const game=games[key];tabs.forEach(t=>{const selected=t===tab;t.classList.toggle('active',selected);t.setAttribute('aria-selected',String(selected));t.tabIndex=selected?0:-1;});$('#game-panel').setAttribute('aria-labelledby',tab.id);$('#game-description').textContent=game.description;$('#game-stamp').textContent=game.stamp;gameVideo.pause();gameVideo.src=`assets/${key}.mp4`;gameVideo.poster=`assets/${key}.jpg`;gameVideo.setAttribute('aria-label',game.label);gameVideo.load();if(!reducedMotion.matches)gameVideo.play().catch(()=>{});}
tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>selectGame(tab));tab.addEventListener('keydown',e=>{let next;if(e.key==='ArrowDown'||e.key==='ArrowRight')next=(i+1)%tabs.length;if(e.key==='ArrowUp'||e.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;if(next!==undefined){e.preventDefault();tabs[next].focus();selectGame(tabs[next]);}});});
const filmDialog=$('#film-dialog');const film=$('#full-film');let lastFilmTrigger;
document.querySelectorAll('[data-watch]').forEach(button=>button.addEventListener('click',()=>{lastFilmTrigger=button;heroVideo.pause();gameVideo.pause();filmDialog.showModal();document.body.style.overflow='hidden';film.play().catch(()=>{});}));
filmDialog.addEventListener('close',()=>{film.pause();document.body.style.overflow='';if(!motionPaused)heroVideo.play().catch(()=>{});lastFilmTrigger?.focus();});
const creditsDialog=$('#credits-dialog');$('#credits-open').addEventListener('click',()=>creditsDialog.showModal());
document.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});});
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)entry.target.pause();else if(!reducedMotion.matches&&!filmDialog.open){if(entry.target!==heroVideo||!motionPaused)entry.target.play().catch(()=>{});}}),{threshold:.2});observer.observe(heroVideo);observer.observe(gameVideo);}
