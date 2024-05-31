import{r as l,n as $,_ as c,j as n,p as A,i as H}from"./index-CZLZpOaH.js";import{a as N,g as T,s as g,c as j}from"./createSvgIcon-CvFBLNCx.js";import{c as k}from"./Switch-DhwBSzVW.js";import{u as O}from"./useSlot-BwsY1ywl.js";import{P as z}from"./Grid-id85xLWy.js";import{u as F}from"./useControlled-CSwFU9cf.js";import{C as J}from"./Collapse-Bx7dZL13.js";import{B as K}from"./ButtonBase-Dp3TaUiU.js";import{r as Q}from"./createSvgIcon-BXb30exD.js";const D=l.createContext({});function X(o){return T("MuiAccordion",o)}const R=N("MuiAccordion",["root","rounded","expanded","disabled","gutters","region"]),Y=["children","className","defaultExpanded","disabled","disableGutters","expanded","onChange","square","slots","slotProps","TransitionComponent","TransitionProps"],Z=k(),oo=o=>{const{classes:s,square:e,expanded:r,disabled:t,disableGutters:i}=o;return j({root:["root",!e&&"rounded",r&&"expanded",t&&"disabled",!i&&"gutters"],region:["region"]},X,s)},so=g(z,{name:"MuiAccordion",slot:"Root",overridesResolver:(o,s)=>{const{ownerState:e}=o;return[{[`& .${R.region}`]:s.region},s.root,!e.square&&s.rounded,!e.disableGutters&&s.gutters]}})(({theme:o})=>{const s={duration:o.transitions.duration.shortest};return{position:"relative",transition:o.transitions.create(["margin"],s),overflowAnchor:"none","&::before":{position:"absolute",left:0,top:-1,right:0,height:1,content:'""',opacity:1,backgroundColor:(o.vars||o).palette.divider,transition:o.transitions.create(["opacity","background-color"],s)},"&:first-of-type":{"&::before":{display:"none"}},[`&.${R.expanded}`]:{"&::before":{opacity:0},"&:first-of-type":{marginTop:0},"&:last-of-type":{marginBottom:0},"& + &":{"&::before":{display:"none"}}},[`&.${R.disabled}`]:{backgroundColor:(o.vars||o).palette.action.disabledBackground}}},({theme:o})=>({variants:[{props:s=>!s.square,style:{borderRadius:0,"&:first-of-type":{borderTopLeftRadius:(o.vars||o).shape.borderRadius,borderTopRightRadius:(o.vars||o).shape.borderRadius},"&:last-of-type":{borderBottomLeftRadius:(o.vars||o).shape.borderRadius,borderBottomRightRadius:(o.vars||o).shape.borderRadius,"@supports (-ms-ime-align: auto)":{borderBottomLeftRadius:0,borderBottomRightRadius:0}}}},{props:s=>!s.disableGutters,style:{[`&.${R.expanded}`]:{margin:"16px 0"}}}]})),No=l.forwardRef(function(s,e){const r=Z({props:s,name:"MuiAccordion"}),{children:t,className:i,defaultExpanded:d=!1,disabled:p=!1,disableGutters:u=!1,expanded:h,onChange:m,square:y=!1,slots:v={},slotProps:C={},TransitionComponent:S,TransitionProps:f}=r,x=$(r,Y),[a,G]=F({controlled:h,default:d,name:"Accordion",state:"expanded"}),_=l.useCallback(L=>{G(!a),m&&m(L,!a)},[a,m,G]),[P,...E]=l.Children.toArray(t),B=l.useMemo(()=>({expanded:a,disabled:p,disableGutters:u,toggle:_}),[a,p,u,_]),M=c({},r,{square:y,disabled:p,disableGutters:u,expanded:a}),I=oo(M),U=c({transition:S},v),V=c({transition:f},C),[q,W]=O("transition",{elementType:J,externalForwardedProps:{slots:U,slotProps:V},ownerState:M});return n.jsxs(so,c({className:A(I.root,i),ref:e,ownerState:M,square:y},x,{children:[n.jsx(D.Provider,{value:B,children:P}),n.jsx(q,c({in:a,timeout:"auto"},W,{children:n.jsx("div",{"aria-labelledby":P.props.id,id:P.props["aria-controls"],role:"region",className:I.region,children:E})}))]}))});function eo(o){return T("MuiAccordionDetails",o)}N("MuiAccordionDetails",["root"]);const ro=["className"],to=k(),ao=o=>{const{classes:s}=o;return j({root:["root"]},eo,s)},no=g("div",{name:"MuiAccordionDetails",slot:"Root",overridesResolver:(o,s)=>s.root})(({theme:o})=>({padding:o.spacing(1,2,2)})),To=l.forwardRef(function(s,e){const r=to({props:s,name:"MuiAccordionDetails"}),{className:t}=r,i=$(r,ro),d=r,p=ao(d);return n.jsx(no,c({className:A(p.root,t),ref:e,ownerState:d},i))});function io(o){return T("MuiAccordionSummary",o)}const b=N("MuiAccordionSummary",["root","expanded","focusVisible","disabled","gutters","contentGutters","content","expandIconWrapper"]),co=["children","className","expandIcon","focusVisibleClassName","onClick"],lo=k(),po=o=>{const{classes:s,expanded:e,disabled:r,disableGutters:t}=o;return j({root:["root",e&&"expanded",r&&"disabled",!t&&"gutters"],focusVisible:["focusVisible"],content:["content",e&&"expanded",!t&&"contentGutters"],expandIconWrapper:["expandIconWrapper",e&&"expanded"]},io,s)},uo=g(K,{name:"MuiAccordionSummary",slot:"Root",overridesResolver:(o,s)=>s.root})(({theme:o})=>{const s={duration:o.transitions.duration.shortest};return{display:"flex",minHeight:48,padding:o.spacing(0,2),transition:o.transitions.create(["min-height","background-color"],s),[`&.${b.focusVisible}`]:{backgroundColor:(o.vars||o).palette.action.focus},[`&.${b.disabled}`]:{opacity:(o.vars||o).palette.action.disabledOpacity},[`&:hover:not(.${b.disabled})`]:{cursor:"pointer"},variants:[{props:e=>!e.disableGutters,style:{[`&.${b.expanded}`]:{minHeight:64}}}]}}),mo=g("div",{name:"MuiAccordionSummary",slot:"Content",overridesResolver:(o,s)=>s.content})(({theme:o})=>({display:"flex",flexGrow:1,margin:"12px 0",variants:[{props:s=>!s.disableGutters,style:{transition:o.transitions.create(["margin"],{duration:o.transitions.duration.shortest}),[`&.${b.expanded}`]:{margin:"20px 0"}}}]})),fo=g("div",{name:"MuiAccordionSummary",slot:"ExpandIconWrapper",overridesResolver:(o,s)=>s.expandIconWrapper})(({theme:o})=>({display:"flex",color:(o.vars||o).palette.action.active,transform:"rotate(0deg)",transition:o.transitions.create("transform",{duration:o.transitions.duration.shortest}),[`&.${b.expanded}`]:{transform:"rotate(180deg)"}})),jo=l.forwardRef(function(s,e){const r=lo({props:s,name:"MuiAccordionSummary"}),{children:t,className:i,expandIcon:d,focusVisibleClassName:p,onClick:u}=r,h=$(r,co),{disabled:m=!1,disableGutters:y,expanded:v,toggle:C}=l.useContext(D),S=a=>{C&&C(a),u&&u(a)},f=c({},r,{expanded:v,disabled:m,disableGutters:y}),x=po(f);return n.jsxs(uo,c({focusRipple:!1,disableRipple:!0,disabled:m,component:"div","aria-expanded":v,className:A(x.root,i),focusVisibleClassName:A(x.focusVisible,p),onClick:S,ref:e,ownerState:f},h,{children:[n.jsx(mo,{className:x.content,ownerState:f,children:t}),d&&n.jsx(fo,{className:x.expandIconWrapper,ownerState:f,children:d})]}))});var w={},xo=H;Object.defineProperty(w,"__esModule",{value:!0});var bo=w.default=void 0,go=xo(Q()),yo=n;bo=w.default=(0,go.default)((0,yo.jsx)("path",{d:"M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"}),"ExpandMore");export{No as A,jo as a,To as b,bo as d};
