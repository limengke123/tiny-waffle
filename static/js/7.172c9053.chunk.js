(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{101:function(e,t,n){"use strict";function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,o)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach(function(t){o(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}n.d(t,"a",function(){return c})},109:function(e,t,n){"use strict";class o{static removeItemFromListByIndex(e,t){"number"!==typeof t&&(t=parseInt(t,10)),Array.isArray(e)&&t>=0&&t<e.length&&e.splice(t,1)}static getIndexFromListById(e,t,n="id"){return Array.isArray(e)?e.findIndex(e=>e[n]===t):-1}}class r{static get currentTime(){const e=new Date,t=[e.getFullYear(),r.padWithZero(e.getMonth()+1),r.padWithZero(e.getDate()),r.padWithZero(e.getHours()),r.padWithZero(e.getMinutes()),r.padWithZero(e.getSeconds())],n=t[1],o=t[2],c=t[3],a=t[4],i=t[5];return"".concat(t[0],"-").concat(n,"-").concat(o," ").concat(c,":").concat(a,":").concat(i)}static padWithZero(e){return("string"!==typeof e?e.toString():e).padStart(2,"0")}}const c=function(e){const t=document.createElement("textarea");t.style.position="fixed",t.style.top="0",t.style.left="0",t.style.width="2em",t.style.height="2em",t.style.padding="0",t.style.border="none",t.style.outline="none",t.style.boxShadow="none",t.style.background="transparent",t.value=e,document.body.appendChild(t),t.select();let n="",o=null;try{n=document.execCommand("copy")?"\u6210\u529f":"\u5931\u8d25"}catch(r){o=r}finally{document.body.removeChild(t)}return{error:o,msg:n}};n.d(t,"a",function(){return o}),n.d(t,"b",function(){return r}),n.d(t,"c",function(){return c})},209:function(e,t,n){e.exports={count:"count_count__1GzMq","sub-info":"count_sub-info__3ldWa"}},210:function(e,t,n){e.exports={home:"home_home__3S-ni"}},446:function(e,t,n){"use strict";n.r(t);var o=n(101),r=n(0),c=n.n(r);const a=c.a.memo(function({text:e,onClick:t}){return c.a.createElement("button",{type:"button",onClick:t},e)});var i=n(209),s=n.n(i);class u extends c.a.PureComponent{render(){const e=this.props.countInfo,t=e.number,n=e.modifyInfo,o=n.time,r=n.type,a=n.step;return c.a.createElement("div",null,c.a.createElement("div",{className:s.a.count},"number:",t),c.a.createElement("div",{className:s.a["sub-info"]},"time:",o),c.a.createElement("div",{className:s.a["sub-info"]},"type:",r),c.a.createElement("div",{className:s.a["sub-info"]},"step:",a))}}var m=n(210),l=n.n(m),d=n(109);t.default=class extends c.a.Component{constructor(...e){super(...e),this.state={count:{number:0,modifyInfo:{time:"",type:"",step:1}}},this.increase=(()=>{this.setState(e=>({count:{number:e.count.number+e.count.modifyInfo.step,modifyInfo:Object(o.a)({},e.count.modifyInfo,{time:d.b.currentTime,type:"Addition"})}}))}),this.decrease=(()=>{this.setState(e=>({count:{number:e.count.number-e.count.modifyInfo.step,modifyInfo:Object(o.a)({},e.count.modifyInfo,{time:d.b.currentTime,type:"Subtraction"})}}))}),this.changeStep=(()=>{this.setState(e=>({count:Object(o.a)({},e.count,{modifyInfo:Object(o.a)({},e.count.modifyInfo,{step:1+~~(10*Math.random())})})}))})}render(){const e=this.state.count;return c.a.createElement("div",{className:l.a.home},c.a.createElement(u,{countInfo:e}),c.a.createElement("div",null,c.a.createElement(a,{onClick:this.decrease,text:"-"}),c.a.createElement(a,{onClick:this.increase,text:"+"})),c.a.createElement(a,{onClick:this.changeStep,text:"\u4fee\u6539\u589e\u957f\u6b65\u957f"}))}}}}]);
//# sourceMappingURL=7.172c9053.chunk.js.map