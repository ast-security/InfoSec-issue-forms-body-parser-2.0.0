import{unified as e}from"unified";import t from"remark-parse";import n from"remark-gfm";import r from"@sindresorhus/slugify";import i from"remark-stringify";import o from"strip-final-newline";import{isMatch as s,parse as l}from"date-fns";import{zonedTimeToUtc as a,formatInTimeZone as c}from"date-fns-tz/esm";const m=["yyyy-MM-dd","dd/MM/yyyy","dd/MM/yy","dd-MM-yyyy","dd-MM-yy","dd.MM.yyyy","dd.MM.yy"],f=["HH:mm","HH.mm","hh:mm a","hh:mm A"],p=function(e){const t=m.map(t=>s(e,t));return t.indexOf(!0)>-1?a(l(e,m[t.indexOf(!0)],new Date),"UTC").toJSON().split("T")[0]:null},d=function(e){const t=f.map(t=>s(e,t));if(t.indexOf(!0)>-1){const n=a(l(e,f[t.indexOf(!0)],new Date),"UTC");return c(n,"UTC","HH:mm")}return null},u=function(e){let t=!1;const n={hours:0,minutes:0},r=new RegExp(/([0-9]+)h([0-9]+)m/),i=new RegExp(/([0-9]+)h/);if(e.match(r)){t=!0;const[,i,o]=e.match(r);n.hours=parseInt(i),n.minutes=parseInt(o)}else if(e.match(i)){t=!0;const[,r]=e.match(i);n.hours=parseInt(r),n.minutes=0}return t?n:null},h=function e(t){return t.children.map(n=>{const r={};return"list"===n.type?e(t):"listItem"===n.type?(r.checked=n.checked,n.children.map(e=>{if("paragraph"===e.type)return r.text=e.children.map(e=>"link"===e.type?e.children[0].value:e.value).filter(e=>!!e).join(""),r}).filter(e=>!!e)):void 0}).filter(e=>!!e)};async function y(s){const l=await e().use(t).use(n).parse(s);if(!l)return[];const a={};let c=null;for(const t of l.children){const s=await e().use(n).use(i).stringify(t);let l=o(s);if(l.indexOf("\\_")>-1&&(l=l.replace(/\\_/g,"_")),"heading"===t.type&&3===t.depth)c=r(t.children[0].value),a[c]={title:t.children[0].value,content:[]};else if("paragraph"===t.type&&c){const e=a[c],t=p(l),n=d(l),r=u(l);t&&(e.date=t),n&&(e.time=n),r&&(e.duration=r),e.content.push(l)}else if("list"===t.type){const e=a[c];e.text=l,e.list=h(t).flat()}else if("html"===t.type)a[c].content.push(t.html);else if("code"===t.type){const e=a[c];e.lang=t.lang,e.text=l}else"heading"===t.type&&t.depth>3?a[c].content.push(t.children[0].value):process.env.DEBUG&&(console.log("unhandled token type"),console.log(t))}for(const e in a){const t=a[e],n=t.content.filter(Boolean);n&&n.length>0&&(1===n.length&&(t.text=n[0]),t.text=n.join("\n\n")),t.content=n}return a}export{y as default};
//# sourceMappingURL=parse.modern.js.map