const t={buttonStartRef:document.querySelector("button[data-start]"),buttonStopRef:document.querySelector("button[data-stop]")};let e=null;t.buttonStartRef.addEventListener("click",(function(){t.buttonStartRef.disabled=!0,e=setInterval((()=>{let t=`#${Math.floor(16777215*Math.random()).toString(16)}`;document.body.style.backgroundColor=t}),1e3)})),t.buttonStopRef.addEventListener("click",(function(){t.buttonStartRef.disabled=!1,clearInterval(e)}));
//# sourceMappingURL=01-color-switcher.6c6e0eb1.js.map
