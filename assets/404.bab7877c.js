import{C as i}from"./Common.cac5d5b8.js";import{_ as d,f as p,u as h,g as f,r as g,o as v,h as x,w as _,a as e,t as o,d as B,e as C,i as F}from"./app.9a56070a.js";const k={class:"not-found-wrapper"},A={class:"emoji"},D=p({__name:"404",setup(L){var n,u;h();const t=f(),a=(n=t.value.notFound)!=null?n:["Not Found"],r=()=>a[Math.floor(Math.random()*a.length)],c=(u=t.value.backToHome)!=null?u:"$ cd /home/",s=["\\(o_o)/","(o^^)o","(\u02DA\u0394\u02DA)b","(^-^*)","(^_^)b","(\u256F\u2035\u25A1\u2032)\u256F","(='X'=)","(>_<)","\\(\xB0\u02CA\u0414\u02CB\xB0)/","\u311F(\u2594\u25BD\u2594)\u310F"],l=()=>s[Math.floor(Math.random()*s.length)];return(M,y)=>{const m=g("RouterLink");return v(),x(i,null,{page:_(()=>[e("div",k,[e("p",A,o(l()),1),e("h1",null,"404 - "+o(r()),1),B(m,{to:"/"},{default:_(()=>[C(o(F(c)),1)]),_:1})])]),_:1})}}});var b=d(D,[["__file","404.vue"]]);export{b as default};