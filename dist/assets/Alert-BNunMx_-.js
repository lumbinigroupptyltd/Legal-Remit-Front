import{u as l,a as m}from"./ThemeProvider-BovkV_tw.js";import{r as d,j as o}from"./index-CZLZpOaH.js";import{u as E}from"./hook-BunR6YGu.js";import{u as L}from"./useEventCallback-BAoW58St.js";import{d as R}from"./divWithClassName-BYsY4_Vt.js";import{A as $}from"./Anchor-BcSSV2GN.js";import{F as N}from"./Fade-C3nPY4By.js";import{C as b}from"./CloseButton-BaMgJgcS.js";const x=R("h4");x.displayName="DivStyledAsH4";const C=d.forwardRef(({className:r,bsPrefix:e,as:a=x,...s},t)=>(e=l(e,"alert-heading"),o.jsx(a,{ref:t,className:m(r,e),...s})));C.displayName="AlertHeading";const j=d.forwardRef(({className:r,bsPrefix:e,as:a=$,...s},t)=>(e=l(e,"alert-link"),o.jsx(a,{ref:t,className:m(r,e),...s})));j.displayName="AlertLink";const v=d.forwardRef((r,e)=>{const{bsPrefix:a,show:s=!0,closeLabel:t="Close alert",closeVariant:y,className:k,children:g,variant:c="primary",onClose:f,dismissible:p,transition:u=N,...A}=E(r,{show:"onClose"}),n=l(a,"alert"),w=L(H=>{f&&f(!1,H)}),i=u===!0?N:u,h=o.jsxs("div",{role:"alert",...i?void 0:A,ref:e,className:m(k,n,c&&`${n}-${c}`,p&&`${n}-dismissible`),children:[p&&o.jsx(b,{onClick:w,"aria-label":t,variant:y}),g]});return i?o.jsx(i,{unmountOnExit:!0,...A,ref:void 0,in:s,children:h}):s?h:null});v.displayName="Alert";const W=Object.assign(v,{Link:j,Heading:C});export{W as A};
