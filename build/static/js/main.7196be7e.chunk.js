(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,n,t){"use strict";t.r(n);var a=t(0),c=t.n(a),l=t(4),r=t.n(l),u=t(2),o=t.n(u);var i={TodoApp:c.a.lazy(function(){return t.e(4).then(t.bind(null,17))}),Counter:c.a.lazy(function(){return t.e(3).then(t.bind(null,16))})};r.a.render(c.a.createElement(function(){var e,n=Object(u.useCostate)({value:""});e=function(){o()(n).value=window.location.hash.slice(1)},Object(a.useEffect)(function(){return window.addEventListener("hashchange",e,!1),function(){window.removeEventListener("hashchange",e,!1)}},[e]),Object(a.useEffect)(function(){var e=window.location.hash.slice(1);e&&(o()(n).value=e)},[]);var t=i[n.value]||null;return c.a.createElement(c.a.Fragment,null,c.a.createElement("h1",null,c.a.createElement("a",{href:"#"},"Index")),!!t&&c.a.createElement(a.Suspense,{fallback:"loading..."},c.a.createElement(t,null)),!t&&Object.keys(i).map(function(e){return c.a.createElement("div",{key:e},c.a.createElement("a",{href:"#".concat(e)},e))}))},null),document.getElementById("root"))},5:function(e,n,t){e.exports=t(14)}},[[5,1,2]]]);
//# sourceMappingURL=main.7196be7e.chunk.js.map