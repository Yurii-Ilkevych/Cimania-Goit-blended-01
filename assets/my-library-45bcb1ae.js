import"./developers-63309933.js";const i=e=>{try{const r=localStorage.getItem(e);return r===null?void 0:JSON.parse(r)}catch(r){console.error("Get state error: ",r.message)}};function n(e){return e.reduce((r,s)=>r+`<li><div class="card-poster">
	<img src="./img/img-mob.jpg" width="280px" alt="alt" />
	<div class="poster-info"><div><h3>${s.title}</h3><p class="info-about-post">genre | <span>2023</span></p></div></div></div></li>`,"")}const a=document.querySelector(".library-gallery");function o(e){a.innerHTML=e}const t=document.querySelector(".first-box-library"),c=document.querySelector(".select");l();function l(){const e=i("poster1");if(e===void 0||e.length===0){if(t.classList.contains("is-hidden")){t.classList.remove("is-hidden");return}return}else{t.classList.add("is-hidden"),c.classList.remove("is-hidden");const r=n(e);o(r)}}