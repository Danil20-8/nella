!function(e){var t={};function n(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(i,r,function(t){return e[t]}.bind(null,r));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t,n){"use strict";function i(e){if(e){if(e instanceof HTMLElement)return e;if(Array.isArray(e.element)){for(let t=0;t<e.element.length;++t){let n=i(e.element[t]);if(n)return n}return null}return i(e.element)}return null}function r(e){return e?e instanceof HTMLElement?e:Array.isArray(e.element)?r(e.__parent):r(e.element):null}function o(e,t){if(e){if(!t&&e instanceof HTMLElement)return e;{let n=t?e.__nextSibling:e;for(;n;){let e=i(n);if(e)return e;n=n.__nextSibling}if(Array.isArray(e.__parent.element)){return o(e.__parent.__nextSibling)}}}return null}function l(e,...t){t.forEach(t=>{t instanceof HTMLElement?r(e).append(t):Array.isArray(t.element)?t.element.forEach(t=>l(e,t)):t.element&&l(e,t.element)})}function c(e,t,n){t instanceof HTMLElement?r(e).insertBefore(t,o(n)):Array.isArray(t.element)?t.element.forEach(t=>c(e,t,n)):c(e,t.element,n)}function s(e){return e instanceof Function?e():e}function u(e,t){Object.keys(t).forEach(n=>{if(void 0!==e[n]){let i=n.startsWith("on")?t[n]:s(t[n]);e[n]!==i&&(e[n]=i)}})}function a(e,t,...n){let i=document.createElement(e);return u(i,t),l(i,...n),i}function f(e,t){e.update instanceof Function?e.update(t):e.element&&e.element.update instanceof Function&&e.element.update(t)}function h(e){e.remove instanceof Function?e.remove():e.element&&h(e.element)}n.d(t,"h",(function(){return s})),n.d(t,"c",(function(){return m})),n.d(t,"d",(function(){return p})),n.d(t,"e",(function(){return g})),n.d(t,"b",(function(){return y})),n.d(t,"a",(function(){return _})),n.d(t,"g",(function(){return v})),n.d(t,"f",(function(){return j}));class d{constructor(e,t,n){e?e instanceof HTMLElement?(this.element=e,l(this.element,...n)):this.element=a(e,t,...n):this.element=n,this.context=t,this.children=n;for(let e=0;e<n.length;++e){let t=n[e];t instanceof Object&&!(t instanceof HTMLElement)&&(t.__parent=this,t.__nextSibling=n[e+1])}}update(){this.element instanceof HTMLElement&&u(this.element,this.context),this.children.forEach(e=>f(e))}remove(){this.children.forEach(e=>h(e)),this.element instanceof HTMLElement&&h(this.element)}}function m(e,t,...n){return new d(e,t,n)}function p(e,...t){return m("div",e,...t)}function b(e,t){return m("input",Object.assign(e,{type:t}))}function g(e){return b(e,"text")}function y(e){return m("button",e)}function _(...e){return m(null,{},...e)}function v(e,t=1){return E({data:()=>s(e.items).filter(e=>s(e.active)).slice(0,t),createElement:e=>e.createElement()})}let x=0;class O{constructor(e,t){this.context=e,this.element=t,this.oldData=[],this.elements=[],this.element=this.elements,this.dict={}}update(){let e=s(this.context.data),t={},n={};for(let i=0;i<e.length;++i){let r=e[i],l=this.oldData[i],s=r instanceof Object;if(s&&r==l)continue;let u=s?r.__key||(r.__key=++x):r,a=this.dict[u];if(a){if(!s){let e=n[u];if(e&&e.length>=a.length){let e=this.context.createElement(r);a.push(e),a=e;let t=n[u];t?t.push(a):n[u]=[a]}else{let e=a.shift();a.push(e),a=e;let t=n[u];if(t?t.push(a):n[u]=[a],r==l)continue}}let e=t[u];e&&(s?delete t[u]:e.splice(e.indexOf(a),1)),s&&(n[u]=a)}else if(a=this.context.createElement(r),s)this.dict[u]=a;else{let e=this.dict[u];e?e.push(a):this.dict[u]=[a];let t=n[u];t?t.push(a):n[u]=[a]}let f=this.elements[i],h=i+1;for(;h<this.elements.length;++h){let e=this.oldData[h];if(s){if(n[e.__key])continue;break}{let t=n[e];if(t){let e=this.elements[h];if(t.indexOf(e)>-1)continue}break}}if(h<this.elements.length?c(this.__parent,a,this.elements[h]):c(this.__parent,a,o(this,!0)),f)if(s)n[l.__key]||(t[l.__key]=f);else{let e=n[l];if(!e||e.indexOf(f)<0){let e=t[l];e?e.push(f):t[l]=[f]}}this.elements[i]=a,this.oldData[i]=r}if(Object.keys(t).forEach(e=>{let n=t[e],i=this.dict[e];Array.isArray(n)?(n.forEach(e=>{h(e),i.splice(i.indexOf(a),1)}),0===i.length&&delete this.dict[e]):(h(n),delete this.dict[e])}),this.oldData.length>e.length){for(let t=e.length;t<this.oldData.length;++t){let e=this.elements[t],i=this.oldData[t],r=i instanceof Object,o=r?i.__key:i;if(!r||!n[i.__key]){{let t=n[i];if(t&&t.indexOf(e)>-1)continue}if(r)delete this.dict[o];else{let t=this.dict[o];t.splice(t.indexOf(e),1),0===t.length&&delete this.dict[o]}h(e)}}this.elements.splice(e.length,this.elements.length),this.oldData.splice(e.length,this.oldData.length)}this.elements.forEach(e=>f(e))}remove(){this.elements&&this.elements.forEach(e=>h(e))}}function E(e,t){return new O(e,t)}function j(e){return new O(e)}},,function(e,t,n){"use strict";n.r(t);var i=n(0);n(3);Object(i.c)(document.body,{},Object(i.d)({className:"editor"},Object(i.d)({className:"editor-top"}),Object(i.d)({className:"editor-side"}),Object(i.d)({className:"editor-sandbox"}))).update()},function(e,t,n){(t=n(4)(!1)).push([e.i,".editor{\n    position: fixed;\n    height: 100%;\n    width: 100%;\n}\n\n.editor-top{\n    position: absolute;\n    left: 0;\n    right: 0;\n    top: 0;\n    bottom: .2vm;\n\n    background-color: green;\n}\n.editor-side{\n    position: absolute;\n    left: .2vm;\n    right: 0;\n    top: 0;\n    bottom: 0;\n    background-color: yellow;\n}\n.editor-sandbox{\n    position: absolute;\n    left: 0;\n    right: .8vm;\n    top: .2vm;\n    bottom: 0;\n    background-color: lightgray;\n}",""]),e.exports=t},function(e,t,n){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=function(e,t){var n=e[1]||"",i=e[3];if(!i)return n;if(t&&"function"==typeof btoa){var r=(l=i,c=btoa(unescape(encodeURIComponent(JSON.stringify(l)))),s="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(c),"/*# ".concat(s," */")),o=i.sources.map((function(e){return"/*# sourceURL=".concat(i.sourceRoot||"").concat(e," */")}));return[n].concat(o).concat([r]).join("\n")}var l,c,s;return[n].join("\n")}(t,e);return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n})).join("")},t.i=function(e,n,i){"string"==typeof e&&(e=[[null,e,""]]);var r={};if(i)for(var o=0;o<this.length;o++){var l=this[o][0];null!=l&&(r[l]=!0)}for(var c=0;c<e.length;c++){var s=[].concat(e[c]);i&&r[s[0]]||(n&&(s[2]?s[2]="".concat(n," and ").concat(s[2]):s[2]=n),t.push(s))}},t}}]);