(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{15:function(t,e,n){"use strict";n.d(e,"a",function(){return c});var r=n(0);function c(t){var e=t.key,n=t.getter,c=t.setter,u=Object(r.useRef)({key:e,getter:n,setter:c});Object(r.useEffect)(function(){var t=window.sessionStorage.getItem(e);return t&&u.current.setter(JSON.parse(t)),function(){var t=JSON.stringify(u.current.getter());window.sessionStorage.setItem(e,t)}},[]),Object(r.useEffect)(function(){u.current={key:e,getter:n,setter:c}},[e,n,c])}},16:function(t,e,n){"use strict";n.r(e),n.d(e,"default",function(){return i});var r=n(0),c=n.n(r),u=n(2),o=n.n(u),s=n(15);function i(){var t=Object(u.useCostate)({count:0});return Object(s.a)({key:"counter-json",getter:function(){return t},setter:function(e){return Object.assign(o()(t),e)}}),c.a.createElement("div",null,c.a.createElement("button",{onClick:function(){o()(t).count+=1}},"+1"),t.count,c.a.createElement("button",{onClick:function(){o()(t).count-=1}},"-1"))}}}]);
//# sourceMappingURL=3.041c49bd.chunk.js.map