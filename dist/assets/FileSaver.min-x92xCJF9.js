import{aZ as j}from"./index-CZLZpOaH.js";var h={exports:{}};(function(E,L){var c={};(function(p,i){i()})(j,function(){function p(e,t){return typeof t>"u"?t={autoBom:!1}:typeof t!="object"&&(console.warn("Deprecated: Expected third argument to be a object"),t={autoBom:!t}),t.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob(["\uFEFF",e],{type:e.type}):e}function i(e,t,r){var n=new XMLHttpRequest;n.open("GET",e),n.responseType="blob",n.onload=function(){u(n.response,t,r)},n.onerror=function(){console.error("could not download file")},n.send()}function v(e){var t=new XMLHttpRequest;t.open("HEAD",e,!1);try{t.send()}catch{}return 200<=t.status&&299>=t.status}function l(e){try{e.dispatchEvent(new MouseEvent("click"))}catch{var t=document.createEvent("MouseEvents");t.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),e.dispatchEvent(t)}}var a=typeof window=="object"&&window.window===window?window:typeof self=="object"&&self.self===self?self:typeof c=="object"&&c.global===c?c:void 0,w=a.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),u=a.saveAs||(typeof window!="object"||window!==a?function(){}:"download"in HTMLAnchorElement.prototype&&!w?function(e,t,r){var n=a.URL||a.webkitURL,o=document.createElement("a");t=t||e.name||"download",o.download=t,o.rel="noopener",typeof e=="string"?(o.href=e,o.origin===location.origin?l(o):v(o.href)?i(e,t,r):l(o,o.target="_blank")):(o.href=n.createObjectURL(e),setTimeout(function(){n.revokeObjectURL(o.href)},4e4),setTimeout(function(){l(o)},0))}:"msSaveOrOpenBlob"in navigator?function(e,t,r){if(t=t||e.name||"download",typeof e!="string")navigator.msSaveOrOpenBlob(p(e,r),t);else if(v(e))i(e,t,r);else{var n=document.createElement("a");n.href=e,n.target="_blank",setTimeout(function(){l(n)})}}:function(e,t,r,n){if(n=n||open("","_blank"),n&&(n.document.title=n.document.body.innerText="downloading..."),typeof e=="string")return i(e,t,r);var o=e.type==="application/octet-stream",b=/constructor/i.test(a.HTMLElement)||a.safari,m=/CriOS\/[\d]+/.test(navigator.userAgent);if((m||o&&b||w)&&typeof FileReader<"u"){var f=new FileReader;f.onloadend=function(){var s=f.result;s=m?s:s.replace(/^data:[^;]*;/,"data:attachment/file;"),n?n.location.href=s:location=s,n=null},f.readAsDataURL(e)}else{var y=a.URL||a.webkitURL,d=y.createObjectURL(e);n?n.location=d:location.href=d,n=null,setTimeout(function(){y.revokeObjectURL(d)},4e4)}});a.saveAs=u.saveAs=u,E.exports=u})})(h);var x=h.exports;export{x as F};
