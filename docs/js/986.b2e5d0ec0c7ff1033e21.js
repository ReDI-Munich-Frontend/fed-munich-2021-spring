deck.on("ready",(()=>{!function(){const e=document.querySelector("#event-object-slide"),t=e.querySelector("#event-object-slide-paragraph");let n=!0;deck.on("slidechanged",(t=>{n=t.currentSlide===e})),e.querySelector("#event-object-slide-input").addEventListener("keydown",(e=>{t.textContent="Caught keydown event with key "+e.key}))}()}));