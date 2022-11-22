class e{setSelectedTab(e){for(var t=0;t<this.tabs.length;t+=1){var r=this.tabs[t];e===r?(r.setAttribute("aria-selected","true"),r.removeAttribute("tabindex"),this.tabpanels[t].classList.remove("is-hidden")):(r.setAttribute("aria-selected","false"),r.tabIndex=-1,this.tabpanels[t].classList.add("is-hidden"))}}moveFocusToTab(e){e.focus()}moveFocusToPreviousTab(e){var t;e===this.firstTab?this.moveFocusToTab(this.lastTab):(t=this.tabs.indexOf(e),this.moveFocusToTab(this.tabs[t-1]))}moveFocusToNextTab(e){var t;e===this.lastTab?this.moveFocusToTab(this.firstTab):(t=this.tabs.indexOf(e),this.moveFocusToTab(this.tabs[t+1]))}onKeydown(e){var t=e.currentTarget,r=!1;switch(e.key){case"ArrowLeft":this.moveFocusToPreviousTab(t),r=!0;break;case"ArrowRight":this.moveFocusToNextTab(t),r=!0;break;case"Home":this.moveFocusToTab(this.firstTab),r=!0;break;case"End":this.moveFocusToTab(this.lastTab),r=!0}r&&(e.stopPropagation(),e.preventDefault())}onClick(e){this.setSelectedTab(e.currentTarget)}constructor(e){this.tablistNode=e,this.tabs=[],this.firstTab=null,this.lastTab=null,this.tabs=Array.from(this.tablistNode.querySelectorAll("[role=tab]")),this.tabpanels=[];for(var t=0;t<this.tabs.length;t+=1){var r=this.tabs[t],i=document.getElementById(r.getAttribute("aria-controls"));r.tabIndex=-1,r.setAttribute("aria-selected","false"),this.tabpanels.push(i),r.addEventListener("keydown",this.onKeydown.bind(this)),r.addEventListener("click",this.onClick.bind(this)),this.firstTab||(this.firstTab=r),this.lastTab=r}this.setSelectedTab(this.firstTab)}}function t(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}
/*!
* tabbable 6.0.1
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/var r=["input","select","textarea","a[href]","button","[tabindex]:not(slot)","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])',"details>summary:first-of-type","details"],i=r.join(","),n="undefined"==typeof Element,o=n?function(){}:Element.prototype.matches||Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector,a=!n&&Element.prototype.getRootNode?function(e){return e.getRootNode()}:function(e){return e.ownerDocument},s=function(e,t,r){var n=Array.prototype.slice.apply(e.querySelectorAll(i));return t&&o.call(e,i)&&n.unshift(e),n=n.filter(r)},c=function e(t,r,n){for(var a=[],s=Array.from(t);s.length;){var c=s.shift();if("SLOT"===c.tagName){var u=c.assignedElements(),l=e(u.length?u:c.children,!0,n);n.flatten?a.push.apply(a,l):a.push({scopeParent:c,candidates:l})}else{o.call(c,i)&&n.filter(c)&&(r||!t.includes(c))&&a.push(c);var d=c.shadowRoot||"function"==typeof n.getShadowRoot&&n.getShadowRoot(c),h=!n.shadowRootFilter||n.shadowRootFilter(c);if(d&&h){var b=e(!0===d?c.children:d.children,!0,n);n.flatten?a.push.apply(a,b):a.push({scopeParent:c,candidates:b})}else s.unshift.apply(s,c.children)}}return a},u=function(e,t){return e.tabIndex<0&&(t||/^(AUDIO|VIDEO|DETAILS)$/.test(e.tagName)||e.isContentEditable)&&isNaN(parseInt(e.getAttribute("tabindex"),10))?0:e.tabIndex},l=function(e,t){return e.tabIndex===t.tabIndex?e.documentOrder-t.documentOrder:e.tabIndex-t.tabIndex},d=function(e){return"INPUT"===e.tagName},h=function(e){return function(e){return d(e)&&"radio"===e.type}(e)&&!function(e){if(!e.name)return!0;var t,r=e.form||a(e),i=function(e){return r.querySelectorAll('input[type="radio"][name="'+e+'"]')};if("undefined"!=typeof window&&void 0!==window.CSS&&"function"==typeof window.CSS.escape)t=i(window.CSS.escape(e.name));else try{t=i(e.name)}catch(e){return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s",e.message),!1}var n=function(e,t){for(var r=0;r<e.length;r++)if(e[r].checked&&e[r].form===t)return e[r]}(t,e.form);return!n||n===e}(e)},b=function(e){var t=e.getBoundingClientRect(),r=t.width,i=t.height;return 0===r&&0===i},f=function(e,t){var r=t.displayCheck,i=t.getShadowRoot;if("hidden"===getComputedStyle(e).visibility)return!0;var n=o.call(e,"details>summary:first-of-type")?e.parentElement:e;if(o.call(n,"details:not([open]) *"))return!0;if(r&&"full"!==r&&"legacy-full"!==r){if("non-zero-area"===r)return b(e)}else{if("function"==typeof i){for(var s=e;e;){var c=e.parentElement,u=a(e);if(c&&!c.shadowRoot&&!0===i(c))return b(e);e=e.assignedSlot?e.assignedSlot:c||u===e.ownerDocument?c:u.host}e=s}if(function(e){for(var t,r=a(e).host,i=!!(null!==(t=r)&&void 0!==t&&t.ownerDocument.contains(r)||e.ownerDocument.contains(e));!i&&r;){var n;i=!(null===(n=r=a(r).host)||void 0===n||!n.ownerDocument.contains(r))}return i}(e))return!e.getClientRects().length;if("legacy-full"!==r)return!0}return!1},p=function(e,t){return!(t.disabled||function(e){return d(e)&&"hidden"===e.type}(t)||f(t,e)||function(e){return"DETAILS"===e.tagName&&Array.prototype.slice.apply(e.children).some((function(e){return"SUMMARY"===e.tagName}))}(t)||function(e){if(/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(e.tagName))for(var t=e.parentElement;t;){if("FIELDSET"===t.tagName&&t.disabled){for(var r=0;r<t.children.length;r++){var i=t.children.item(r);if("LEGEND"===i.tagName)return!!o.call(t,"fieldset[disabled] *")||!i.contains(e)}return!0}t=t.parentElement}return!1}(t))},v=function(e,t){return!(h(t)||u(t)<0||!p(e,t))},m=function(e){var t=parseInt(e.getAttribute("tabindex"),10);return!!(isNaN(t)||t>=0)},y=function e(t){var r=[],i=[];return t.forEach((function(t,n){var o=!!t.scopeParent,a=o?t.scopeParent:t,s=u(a,o),c=o?e(t.candidates):a;0===s?o?r.push.apply(r,c):r.push(a):i.push({documentOrder:n,tabIndex:s,item:t,isScope:o,content:c})})),i.sort(l).reduce((function(e,t){return t.isScope?e.push.apply(e,t.content):e.push(t.content),e}),[]).concat(r)},g=function(e,t){var r;return r=(t=t||{}).getShadowRoot?c([e],t.includeContainer,{filter:v.bind(null,t),flatten:!1,getShadowRoot:t.getShadowRoot,shadowRootFilter:m}):s(e,t.includeContainer,v.bind(null,t)),y(r)},w=function(e,t){if(t=t||{},!e)throw new Error("No node provided");return!1!==o.call(e,i)&&v(t,e)},T=r.concat("iframe").join(","),S=function(e,t){if(t=t||{},!e)throw new Error("No node provided");return!1!==o.call(e,T)&&p(t,e)};function E(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,i)}return r}function A(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?E(Object(r),!0).forEach((function(t){x(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):E(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function x(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var C,O=(C=[],{activateTrap:function(e){if(C.length>0){var t=C[C.length-1];t!==e&&t.pause()}var r=C.indexOf(e);-1===r||C.splice(r,1),C.push(e)},deactivateTrap:function(e){var t=C.indexOf(e);-1!==t&&C.splice(t,1),C.length>0&&C[C.length-1].unpause()}}),L=function(e){return setTimeout(e,0)},k=function(e,t){var r=-1;return e.every((function(e,i){return!t(e)||(r=i,!1)})),r},N=function(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),i=1;i<t;i++)r[i-1]=arguments[i];return"function"==typeof e?e.apply(void 0,r):e},D=function(e){return e.target.shadowRoot&&"function"==typeof e.composedPath?e.composedPath()[0]:e.target},F=function(e,t){var r,i=(null==t?void 0:t.document)||document,n=A({returnFocusOnDeactivate:!0,escapeDeactivates:!0,delayInitialFocus:!0},t),o={containers:[],containerGroups:[],tabbableGroups:[],nodeFocusedBeforeActivation:null,mostRecentlyFocusedNode:null,active:!1,paused:!1,delayInitialFocusTimer:void 0},a=function(e,t,r){return e&&void 0!==e[t]?e[t]:n[r||t]},u=function(e){return o.containerGroups.findIndex((function(t){var r=t.container,i=t.tabbableNodes;return r.contains(e)||i.find((function(t){return t===e}))}))},l=function(e){var t=n[e];if("function"==typeof t){for(var r=arguments.length,o=new Array(r>1?r-1:0),a=1;a<r;a++)o[a-1]=arguments[a];t=t.apply(void 0,o)}if(!0===t&&(t=void 0),!t){if(void 0===t||!1===t)return t;throw new Error("`".concat(e,"` was specified but was not a node, or did not return a node"))}var s=t;if("string"==typeof t&&!(s=i.querySelector(t)))throw new Error("`".concat(e,"` as selector refers to no known node"));return s},d=function(){var e=l("initialFocus");if(!1===e)return!1;if(void 0===e)if(u(i.activeElement)>=0)e=i.activeElement;else{var t=o.tabbableGroups[0];e=t&&t.firstTabbableNode||l("fallbackFocus")}if(!e)throw new Error("Your focus-trap needs to have at least one focusable element");return e},h=function(){if(o.containerGroups=o.containers.map((function(e){var t,r,i=g(e,n.tabbableOptions),o=(t=e,(r=(r=n.tabbableOptions)||{}).getShadowRoot?c([t],r.includeContainer,{filter:p.bind(null,r),flatten:!0,getShadowRoot:r.getShadowRoot}):s(t,r.includeContainer,p.bind(null,r)));return{container:e,tabbableNodes:i,focusableNodes:o,firstTabbableNode:i.length>0?i[0]:null,lastTabbableNode:i.length>0?i[i.length-1]:null,nextTabbableNode:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],r=o.findIndex((function(t){return t===e}));if(!(r<0))return t?o.slice(r+1).find((function(e){return w(e,n.tabbableOptions)})):o.slice(0,r).reverse().find((function(e){return w(e,n.tabbableOptions)}))}}})),o.tabbableGroups=o.containerGroups.filter((function(e){return e.tabbableNodes.length>0})),o.tabbableGroups.length<=0&&!l("fallbackFocus"))throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times")},b=function e(t){!1!==t&&t!==i.activeElement&&(t&&t.focus?(t.focus({preventScroll:!!n.preventScroll}),o.mostRecentlyFocusedNode=t,function(e){return e.tagName&&"input"===e.tagName.toLowerCase()&&"function"==typeof e.select}(t)&&t.select()):e(d()))},f=function(e){var t=l("setReturnFocus",e);return t||!1!==t&&e},v=function(e){var t=D(e);u(t)>=0||(N(n.clickOutsideDeactivates,e)?r.deactivate({returnFocus:n.returnFocusOnDeactivate&&!S(t,n.tabbableOptions)}):N(n.allowOutsideClick,e)||e.preventDefault())},m=function(e){var t=D(e),r=u(t)>=0;r||t instanceof Document?r&&(o.mostRecentlyFocusedNode=t):(e.stopImmediatePropagation(),b(o.mostRecentlyFocusedNode||d()))},y=function(e){if(function(e){return"Escape"===e.key||"Esc"===e.key||27===e.keyCode}(e)&&!1!==N(n.escapeDeactivates,e))return e.preventDefault(),void r.deactivate();(function(e){return"Tab"===e.key||9===e.keyCode})(e)&&function(e){var t=D(e);h();var r=null;if(o.tabbableGroups.length>0){var i=u(t),a=i>=0?o.containerGroups[i]:void 0;if(i<0)r=e.shiftKey?o.tabbableGroups[o.tabbableGroups.length-1].lastTabbableNode:o.tabbableGroups[0].firstTabbableNode;else if(e.shiftKey){var s=k(o.tabbableGroups,(function(e){var r=e.firstTabbableNode;return t===r}));if(s<0&&(a.container===t||S(t,n.tabbableOptions)&&!w(t,n.tabbableOptions)&&!a.nextTabbableNode(t,!1))&&(s=i),s>=0){var c=0===s?o.tabbableGroups.length-1:s-1;r=o.tabbableGroups[c].lastTabbableNode}}else{var d=k(o.tabbableGroups,(function(e){var r=e.lastTabbableNode;return t===r}));if(d<0&&(a.container===t||S(t,n.tabbableOptions)&&!w(t,n.tabbableOptions)&&!a.nextTabbableNode(t))&&(d=i),d>=0){var f=d===o.tabbableGroups.length-1?0:d+1;r=o.tabbableGroups[f].firstTabbableNode}}}else r=l("fallbackFocus");r&&(e.preventDefault(),b(r))}(e)},T=function(e){var t=D(e);u(t)>=0||N(n.clickOutsideDeactivates,e)||N(n.allowOutsideClick,e)||(e.preventDefault(),e.stopImmediatePropagation())},E=function(){if(o.active)return O.activateTrap(r),o.delayInitialFocusTimer=n.delayInitialFocus?L((function(){b(d())})):b(d()),i.addEventListener("focusin",m,!0),i.addEventListener("mousedown",v,{capture:!0,passive:!1}),i.addEventListener("touchstart",v,{capture:!0,passive:!1}),i.addEventListener("click",T,{capture:!0,passive:!1}),i.addEventListener("keydown",y,{capture:!0,passive:!1}),r},x=function(){if(o.active)return i.removeEventListener("focusin",m,!0),i.removeEventListener("mousedown",v,!0),i.removeEventListener("touchstart",v,!0),i.removeEventListener("click",T,!0),i.removeEventListener("keydown",y,!0),r};return(r={get active(){return o.active},get paused(){return o.paused},activate:function(e){if(o.active)return this;var t=a(e,"onActivate"),r=a(e,"onPostActivate"),n=a(e,"checkCanFocusTrap");n||h(),o.active=!0,o.paused=!1,o.nodeFocusedBeforeActivation=i.activeElement,t&&t();var s=function(){n&&h(),E(),r&&r()};return n?(n(o.containers.concat()).then(s,s),this):(s(),this)},deactivate:function(e){if(!o.active)return this;var t=A({onDeactivate:n.onDeactivate,onPostDeactivate:n.onPostDeactivate,checkCanReturnFocus:n.checkCanReturnFocus},e);clearTimeout(o.delayInitialFocusTimer),o.delayInitialFocusTimer=void 0,x(),o.active=!1,o.paused=!1,O.deactivateTrap(r);var i=a(t,"onDeactivate"),s=a(t,"onPostDeactivate"),c=a(t,"checkCanReturnFocus"),u=a(t,"returnFocus","returnFocusOnDeactivate");i&&i();var l=function(){L((function(){u&&b(f(o.nodeFocusedBeforeActivation)),s&&s()}))};return u&&c?(c(f(o.nodeFocusedBeforeActivation)).then(l,l),this):(l(),this)},pause:function(){return o.paused||!o.active||(o.paused=!0,x()),this},unpause:function(){return o.paused&&o.active?(o.paused=!1,h(),E(),this):this},updateContainerElements:function(e){var t=[].concat(e).filter(Boolean);return o.containers=t.map((function(e){return"string"==typeof e?i.querySelector(e):e})),o.active&&h(),this}}).updateContainerElements(e),r};const I=e=>String(e).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);class q{reset(){this.hideMessage(this.successMessage)}constructor(){t(this,"showError",((e,t)=>{const{input:r,error:i}=this.fields[e];i.textContent=t,i.classList.add("is-visible"),i.removeAttribute("aria-hidden"),i.setAttribute("role","status"),i.setAttribute("aria-live","polite"),i.setAttribute("aria-label",t),r.setAttribute("aria-invalid","true"),r.parentNode.classList.add("invalid"),r.setAttribute("aria-describedby",i.id)})),t(this,"hideError",(e=>{const{input:t,error:r}=this.fields[e];t.setAttribute("aria-invalid","false"),t.parentNode.classList.remove("invalid"),t.removeAttribute("aria-describedby"),r.textContent="",r.classList.remove("is-visible"),r.setAttribute("aria-hidden","true"),r.removeAttribute("aria-live"),r.removeAttribute("role"),r.removeAttribute("aria-label")})),t(this,"validateName",(()=>{const e="Это поле обязательно для заполнения.",t="Введите имя И фамилию.",r=this.fields.name.input.value;return r?r.indexOf(" ")<2?(this.showError("name",t),!1):(this.hideError("name"),!0):(this.showError("name",e),!1)})),t(this,"validateEmail",(()=>{const e="Это поле обязательно для заполнения.",t="Введите корректный адрес почты",r=this.fields.email.input.value;return r?I(r)?(this.hideError("email"),!0):(this.showError("email",t),!1):(this.showError("email",e),!1)})),t(this,"validateAddress",(()=>{const e="Это поле обязательно для заполнения.";return this.fields.address.input.value?(this.hideError("address"),!0):(this.showError("address",e),!1)})),t(this,"showMessage",((e,t)=>{e.removeAttribute("hidden"),e.setAttribute("role","status"),e.setAttribute("aria-live","polite"),e.setAttribute("aria-label",t),e.textContent=t})),t(this,"hideMessage",(e=>{e.setAttribute("hidden","true"),e.removeAttribute("role","status"),e.removeAttribute("aria-live","polite"),e.removeAttribute("aria-label"),e.textContent=""})),t(this,"onSubmit",(e=>{e.preventDefault();let t=null;const r=Object.values(this.fields).map((({input:e,validate:r})=>{const i=r();return i||t||(t=e),i}));t&&t.focus(),console.log(r.every((e=>e))),r.every((e=>e))&&(console.log("true"),this.showMessage(this.successMessage,"Вы успешно оформили заказ!"))})),this.form=document.querySelector("#buy-form"),this.fields={name:{input:this.form.querySelector("#user-name"),error:this.form.querySelector("#user-name-error"),validate:this.validateName},email:{input:this.form.querySelector("#user-email"),error:this.form.querySelector("#user-email-error"),validate:this.validateEmail},address:{input:this.form.querySelector("#user-address"),error:this.form.querySelector("#user-address-error"),validate:this.validateAddress}},this.successMessage=this.form.querySelector("#buy_success"),this.form.addEventListener("submit",this.onSubmit),Object.entries(this.fields).forEach((([e,t])=>{const{input:r,validate:i}=t;r.value="",this.hideError(e),r.addEventListener("blur",(()=>{r.value&&i()}))}))}}class M{constructor(){t(this,"open",(e=>{this.title.textContent=e.currentTarget.dataset.productName,this.backdrop.classList.add("active"),document.body.classList.add("has-modal"),this.dialog.classList.remove("hidden"),this.focusTrap.activate(),this.form=new q})),t(this,"close",(()=>{this.form.reset(),this.focusTrap.deactivate()})),this.modal=document.querySelector(".dialogs"),this.title=this.modal.querySelector("#product-name"),this.backdrop=this.modal.querySelector(".js-backdrop"),this.dialog=this.modal.querySelector('[aria-modal="true"]'),this.closeBtn=this.modal.querySelector(".js-close"),this.form=null,this.focusTrap=F('[aria-modal="true"]',{initialFocus:".js-close",onDeactivate:()=>{this.backdrop.classList.remove("active"),document.body.classList.remove("has-modal"),this.dialog.classList.add("hidden")}}),this.closeBtn.addEventListener("click",this.close)}}function R(){const e=document.querySelector("#subscribe"),t=e.querySelector("input#email"),r=e.querySelector("#consent"),i=e.querySelector("#subscribe_success");e.querySelector("button").setAttribute("aria-describedby",i.id);const n={email:{field:t,error:e.querySelector("#email-error")},consent:{field:r,error:e.querySelector("#consent-error")}},o=()=>{const e="Введите адрес вашей электронной почты",r="Введите корректный адрес почты",i=t.value;return i?I(i)?(s("email"),!0):(a("email",r),!1):(a("email",e),!1)},a=(e,t)=>{const{field:r,error:i}=n[e];i.classList.add("is-visible"),i.removeAttribute("aria-hidden"),i.setAttribute("role","status"),i.setAttribute("aria-live","polite"),i.setAttribute("aria-label",t),i.textContent=t,r.setAttribute("aria-invalid","true"),r.setAttribute("aria-describedby",i.id)},s=e=>{const{field:t,error:r}=n[e];t.setAttribute("aria-invalid","false"),t.removeAttribute("aria-describedby"),r.textContent="",r.classList.remove("is-visible"),r.setAttribute("aria-hidden","true"),r.removeAttribute("aria-live"),r.removeAttribute("role"),r.removeAttribute("aria-label")};e.addEventListener("submit",(e=>{e.preventDefault();const n=o(),c=(r.checked?s("consent"):a("consent","Чтобы продолжить, Вам необходимо подтвердить согласие"),r.checked);n?c||r.focus():t.focus(),n&&c&&(i.setAttribute("aria-hidden","false"),i.setAttribute("role","alert"),i.setAttribute("aria-live","assertive"),i.setAttribute("aria-label","Вы успешно подписаны на нашу рассылку."),i.textContent="Вы успешно подписаны на нашу рассылку.")})),t.addEventListener("blur",(()=>{t.value&&o()})),r.addEventListener("change",(()=>{r.checked&&s("consent")}))}const P=0,j=1,G=2,B=3,H=4,K=5,U=6,$=7,V=8,z=10;function Y(e=[],t,r=[]){return e.filter((e=>0===e.toLowerCase().indexOf(t.toLowerCase())&&r.indexOf(e)<0))}function W(e){const t=e.getBoundingClientRect();return t.top>=0&&t.left>=0&&t.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&t.right<=(window.innerWidth||document.documentElement.clientWidth)}class Z{constructor(e,r){var i;t(this,"updateMenuState",((e,t=!0)=>{this.open=e,this.combobox.setAttribute("aria-expanded",`${e}`),e?this.el.classList.add("open"):this.el.classList.remove("open");const r=e?this.options[this.activeIndex].id:"";r?this.combobox.setAttribute("aria-activedescendant",r):this.combobox.removeAttribute("aria-activedescendant"),""!==r||W(this.combobox)||this.combobox.scrollIntoView({behavior:"smooth",block:"nearest"}),e||(this.onChangeCallback(this.options[this.activeIndex].id,this.options[this.activeIndex].textContent),this.combobox.removeAttribute("aria-activedescendant")),t&&this.combobox.focus()})),t(this,"selectOption",(e=>{this.activeIndex=e,this.combobox.innerHTML=this.options[e].textContent,[...this.options].forEach((e=>{e.setAttribute("aria-selected","false")})),this.options[e].setAttribute("aria-selected","true")})),t(this,"getSearchString",(e=>("number"==typeof this.searchTimeout&&window.clearTimeout(this.searchTimeout),this.searchTimeout=window.setTimeout((()=>{this.searchString=""}),500),this.searchString+=e,this.searchString))),t(this,"onComboClick",(()=>{this.updateMenuState(!this.open,!1)})),t(this,"onComboBlur",(()=>{this.ignoreBlur?this.ignoreBlur=!1:this.open&&(this.selectOption(this.activeIndex),this.updateMenuState(!1,!1))})),t(this,"onComboKeyDown",(e=>{const{key:t}=e,r=this.options.length-1,i=function(e,t){const{key:r,altKey:i,ctrlKey:n,metaKey:o}=e;if(!t&&["ArrowDown","ArrowUp","Enter"," "].includes(r))return K;if("Home"===r)return G;if("End"===r)return B;if("Backspace"===r||"Clear"===r||1===r.length&&" "!==r&&!i&&!n&&!o)return z;if(t){if("ArrowUp"===r&&i)return j;if("ArrowDown"===r&&!i)return H;if("ArrowUp"===r)return V;if("PageUp"===r)return $;if("PageDown"===r)return U;if("Escape"===r)return P;if("Enter"===r||" "===r)return j}}(e,this.open);switch(i){case B:case G:this.updateMenuState(!0);case H:case V:case $:case U:return e.preventDefault(),this.onOptionChange(function(e,t,r){switch(r){case G:return 0;case B:return t;case V:return Math.max(0,e-1);case H:return Math.min(t,e+1);case $:return Math.max(0,e-10);case U:return Math.min(t,e+10);default:return e}}(this.activeIndex,r,i));case j:e.preventDefault(),this.selectOption(this.activeIndex);case P:return e.preventDefault(),this.updateMenuState(!1);case z:return this.onComboType(t);case K:return e.preventDefault(),this.updateMenuState(!0)}})),t(this,"onComboType",(e=>{this.updateMenuState(!0);const t=this.getSearchString(e),r=function(e,t,r=0){const i=[...e.slice(r),...e.slice(0,r)],n=Y(i,t)[0];if(n)return e.indexOf(n);if((o=t.split("")).every((e=>e===o[0]))){const r=Y(i,t[0]);return e.indexOf(r[0])}return-1;var o}(this.optionsValues,t,this.activeIndex+1);r>=0?this.onOptionChange(r):(window.clearTimeout(this.searchTimeout),this.searchString="")})),t(this,"onOptionChange",(function(e){var t;this.activeIndex=e,this.combobox.setAttribute("aria-activedescendant",this.options[e].id),this.combobox.setAttribute("data-value",this.options[e].id),[...this.options].forEach((e=>{e.classList.remove("option-current")})),this.options[e].classList.add("option-current"),(t=this.listbox)&&t.clientHeight<t.scrollHeight&&function(e,t){const{offsetHeight:r,offsetTop:i}=e,{offsetHeight:n,scrollTop:o}=t,a=i+r>o+n;i<o?t.scrollTo(0,i):a&&t.scrollTo(0,i-n+r)}(this.options[e],this.listbox),W(this.options[e])||this.options[e].scrollIntoView({behavior:"smooth",block:"nearest"})})),t(this,"onOptionClick",(e=>{this.onOptionChange(e),this.selectOption(e),this.updateMenuState(!1)})),t(this,"onOptionMouseDown",(()=>{this.ignoreBlur=!0})),this.el=e,this.combobox=this.el.querySelector("[role=combobox]"),this.listbox=this.el.querySelector("[role=listbox]"),this.options=this.listbox.querySelectorAll('[role="option"]'),this.optionsValues=Array.from(this.options).map((e=>e.textContent)),this.onChangeCallback=r,this.activeIndex=(i=this.options,[...i].findIndex((e=>"true"===e.getAttribute("aria-selected")))),this.open=!1,this.searchString="",this.searchTimeout=null,this.el&&this.combobox&&this.listbox&&(this.combobox.addEventListener("blur",this.onComboBlur),this.combobox.addEventListener("click",this.onComboClick),this.combobox.addEventListener("keydown",this.onComboKeyDown)),this.options.forEach(((e,t)=>{e.addEventListener("click",(e=>{e.stopPropagation(),this.onOptionClick(t)})),e.addEventListener("mousedown",this.onOptionMouseDown)}))}}const _=(e,t)=>{switch(t){case"sorting-price-up":return[...e].sort(((e,t)=>e.dataset.price>t.dataset.price?1:-1));case"sorting-popular":return[...e].sort(((e,t)=>e.dataset.popular>t.dataset.popular?1:-1));case"sorting-price-down":return[...e].sort(((e,t)=>e.dataset.price<t.dataset.price?1:-1));default:return[...e].sort(((e,t)=>e.dataset.key>t.dataset.key?1:-1))}},X=()=>{const e=document.querySelector(".catalog"),t=document.querySelectorAll(".card"),r=document.querySelector("#filter-status"),i=document.querySelector("#sorting-status");let n=[...t],o="no-sorting",a="no-filter";const s=t=>{n.length?(t&&(e.innerHTML=""),n.forEach((t=>e.appendChild(t)))):e.innerHTML="Ничего не найдено. Попробуйте изменить параметры фильтра."};new Z(document.querySelector(".js-filter"),(e=>{var i,c;a!==e&&(a=e,"no-filter"===e?n=_([...t],o):(i=_([...t],o),c=e,n=i.filter((e=>e.dataset.category===c))),r.innerHTML=`Показано ${n.length} товаров из ${t.length}`,s(!0))})),new Z(document.querySelector(".js-sorting"),((e,t)=>{o!==e&&(n=_(n,e),o=e,i.innerHTML=`Применена сортировка: ${t}`,s())}))};document.addEventListener("DOMContentLoaded",(()=>{X();const t=new M;document.querySelectorAll(".js-buy-card").forEach((e=>{e.addEventListener("click",(e=>t.open(e)))}));document.querySelectorAll("[role=tablist]").forEach((t=>{new e(t)})),R()}));
//# sourceMappingURL=index.cab51c1c.js.map