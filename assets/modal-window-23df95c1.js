(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&c(r)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function c(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const l={navMenuBtn:document.querySelector(".nav-menu-btn"),backdropEl:document.querySelector(".backdrop"),mobMenuEl:document.querySelector(".mobile-menu"),navLinksElems:document.querySelectorAll(".nav-link"),menuLinksElems:document.querySelectorAll(".mobile-menu-link")};l.navMenuBtn.addEventListener("click",a);l.backdropEl.addEventListener("click",d);u();function a(t){i()}function d(t){t.target.classList.contains("backdrop")&&i()}function i(){l.backdropEl.classList.toggle("is-hidden-header"),l.mobMenuEl.classList.toggle("shown")}function u(){l.navLinksElems.forEach(t=>{t.getAttribute("href")==="."+window.location.pathname&&t.classList.add("active")}),l.menuLinksElems.forEach(t=>{t.getAttribute("href")==="."+window.location.pathname&&t.classList.add("active")})}console.log(window.location.pathname);(()=>{const t={openModalBtn:document.querySelector("[data-modal-open]"),closeModalBtn:document.querySelector("[data-modal-close]"),modal:document.querySelector("[data-modal]")};t.openModalBtn.addEventListener("click",n),t.closeModalBtn.addEventListener("click",n);function n(){t.modal.classList.toggle("is-hidden")}})();
