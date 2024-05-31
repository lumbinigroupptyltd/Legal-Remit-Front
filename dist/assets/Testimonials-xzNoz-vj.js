import{r as a,j as e,R as q,c as $}from"./index-CZLZpOaH.js";import{P as Ae}from"./PageHeader-6CScOhCz.js";import{a as G}from"./avatar1-CEnBhQCZ.js";import{a as E}from"./avatar2--WcZpazd.js";import{a as oe}from"./avatar3-D8r90XGE.js";import{a as de}from"./avatar4-RedQCuya.js";import{a as Pe,u as me}from"./useEventCallback-BAoW58St.js";import{u as Oe}from"./useTimeout-DJTRi4Dn.js";import{A as ue}from"./Anchor-BcSSV2GN.js";import{u as U,a as I,e as Fe}from"./ThemeProvider-BovkV_tw.js";import{u as He}from"./hook-BunR6YGu.js";import{f as We,m as he}from"./ElementChildren-DV238mrs.js";import{a as Be,T as _e,b as Ke}from"./TransitionWrapper-hzIxZzZF.js";import{d as Xe,e as Ge}from"./Pages-DrD4Fyje.js";import{a as Ue}from"./avatar5-BqZhWWkl.js";import"./DashbordData-n50t2wKP.js";import"./useMounted-_Ax2eNue.js";import"./useWillUnmount-B2faAFH4.js";import"./useIsomorphicEffect-Dy1EPX0O.js";import"./Button-wtvkehlk.js";import"./listen-DOhMskc_.js";import"./Transition-yovTjeQN.js";import"./TransitionGroupContext-QmIPOmoK.js";import"./useMergedRefs-CC2NoeT3.js";import"./space-ship-ry01zHey.js";import"./avatar7-D7_qMKWx.js";function Ve(l,r){const n=a.useRef(!0);a.useEffect(()=>{if(n.current){n.current=!1;return}return l()},r)}const xe=a.forwardRef(({className:l,bsPrefix:r,as:n="div",...b},y)=>(r=U(r,"carousel-caption"),e.jsx(n,{ref:y,className:I(l,r),...b})));xe.displayName="CarouselCaption";const pe=a.forwardRef(({as:l="div",bsPrefix:r,className:n,...b},y)=>{const x=I(n,U(r,"carousel-item"));return e.jsx(l,{ref:y,...b,className:x})});pe.displayName="CarouselItem";const Je=40;function Ze(l){if(!l||!l.style||!l.parentNode||!l.parentNode.style)return!1;const r=getComputedStyle(l);return r.display!=="none"&&r.visibility!=="hidden"&&getComputedStyle(l.parentNode).display!=="none"}const je=a.forwardRef(({defaultActiveIndex:l=0,...r},n)=>{const{as:b="div",bsPrefix:y,slide:x=!0,fade:fe=!1,controls:ve=!0,indicators:M=!0,indicatorLabels:A=[],activeIndex:u,onSelect:h,onSlide:C,onSlid:L,interval:w=5e3,keyboard:V=!0,onKeyDown:P,pause:f="hover",onMouseOver:O,onMouseOut:F,wrap:D=!0,touch:J=!0,onTouchStart:H,onTouchMove:W,onTouchEnd:B,prevIcon:Ne=e.jsx("span",{"aria-hidden":"true",className:"carousel-control-prev-icon"}),prevLabel:Z="Previous",nextIcon:ge=e.jsx("span",{"aria-hidden":"true",className:"carousel-control-next-icon"}),nextLabel:z="Next",variant:Q,className:be,children:_,...ye}=He({defaultActiveIndex:l,...r},{activeIndex:"onSelect"}),d=U(y,"carousel"),v=Fe(),N=a.useRef(null),[Y,ee]=a.useState("next"),[Ce,S]=a.useState(!1),[g,se]=a.useState(!1),[t,Le]=a.useState(u||0);a.useEffect(()=>{!g&&u!==t&&(N.current?ee(N.current):ee((u||0)>t?"next":"prev"),x&&se(!0),Le(u||0))},[u,g,t,x]),a.useEffect(()=>{N.current&&(N.current=null)});let p=0,ae;We(_,(s,i)=>{++p,i===u&&(ae=s.props.interval)});const ie=Pe(ae),c=a.useCallback(s=>{if(g)return;let i=t-1;if(i<0){if(!D)return;i=p-1}N.current="prev",h==null||h(i,s)},[g,t,h,D,p]),o=me(s=>{if(g)return;let i=t+1;if(i>=p){if(!D)return;i=0}N.current="next",h==null||h(i,s)}),K=a.useRef();a.useImperativeHandle(n,()=>({element:K.current,prev:c,next:o}));const le=me(()=>{!document.hidden&&Ze(K.current)&&(v?c():o())}),j=Y==="next"?"start":"end";Ve(()=>{x||(C==null||C(t,j),L==null||L(t,j))},[t]);const we=`${d}-item-${Y}`,De=`${d}-item-${j}`,Te=a.useCallback(s=>{Be(s),C==null||C(t,j)},[C,t,j]),Ie=a.useCallback(()=>{se(!1),L==null||L(t,j)},[L,t,j]),Se=a.useCallback(s=>{if(V&&!/input|textarea/i.test(s.target.tagName))switch(s.key){case"ArrowLeft":s.preventDefault(),v?o(s):c(s);return;case"ArrowRight":s.preventDefault(),v?c(s):o(s);return}P==null||P(s)},[V,P,c,o,v]),Re=a.useCallback(s=>{f==="hover"&&S(!0),O==null||O(s)},[f,O]),ke=a.useCallback(s=>{S(!1),F==null||F(s)},[F]),re=a.useRef(0),R=a.useRef(0),te=Oe(),Ee=a.useCallback(s=>{re.current=s.touches[0].clientX,R.current=0,f==="hover"&&S(!0),H==null||H(s)},[f,H]),qe=a.useCallback(s=>{s.touches&&s.touches.length>1?R.current=0:R.current=s.touches[0].clientX-re.current,W==null||W(s)},[W]),$e=a.useCallback(s=>{if(J){const i=R.current;Math.abs(i)>Je&&(i>0?c(s):o(s))}f==="hover"&&te.set(()=>{S(!1)},w||void 0),B==null||B(s)},[J,f,c,o,te,w,B]),ne=w!=null&&!Ce&&!g,X=a.useRef();a.useEffect(()=>{var s,i;if(!ne)return;const m=v?c:o;return X.current=window.setInterval(document.visibilityState?le:m,(s=(i=ie.current)!=null?i:w)!=null?s:void 0),()=>{X.current!==null&&clearInterval(X.current)}},[ne,c,o,ie,w,le,v]);const ce=a.useMemo(()=>M&&Array.from({length:p},(s,i)=>m=>{h==null||h(i,m)}),[M,p,h]);return e.jsxs(b,{ref:K,...ye,onKeyDown:Se,onMouseOver:Re,onMouseOut:ke,onTouchStart:Ee,onTouchMove:qe,onTouchEnd:$e,className:I(be,d,x&&"slide",fe&&`${d}-fade`,Q&&`${d}-${Q}`),children:[M&&e.jsx("div",{className:`${d}-indicators`,children:he(_,(s,i)=>e.jsx("button",{type:"button","data-bs-target":"","aria-label":A!=null&&A.length?A[i]:`Slide ${i+1}`,className:i===t?"active":void 0,onClick:ce?ce[i]:void 0,"aria-current":i===t},i))}),e.jsx("div",{className:`${d}-inner`,children:he(_,(s,i)=>{const m=i===t;return x?e.jsx(_e,{in:m,onEnter:m?Te:void 0,onEntered:m?Ie:void 0,addEndListener:Ke,children:(T,Me)=>a.cloneElement(s,{...Me,className:I(s.props.className,m&&T!=="entered"&&we,(T==="entered"||T==="exiting")&&"active",(T==="entering"||T==="exiting")&&De)})}):a.cloneElement(s,{className:I(s.props.className,m&&"active")})})}),ve&&e.jsxs(e.Fragment,{children:[(D||u!==0)&&e.jsxs(ue,{className:`${d}-control-prev`,onClick:c,children:[Ne,Z&&e.jsx("span",{className:"visually-hidden",children:Z})]}),(D||u!==p-1)&&e.jsxs(ue,{className:`${d}-control-next`,onClick:o,children:[ge,z&&e.jsx("span",{className:"visually-hidden",children:z})]})]})]})});je.displayName="Carousel";const k=Object.assign(je,{Caption:xe,Item:pe});class ze extends q.Component{render(){return e.jsx("div",{className:"col-lg-12",children:e.jsx("div",{className:"card",children:e.jsx("div",{className:"body",children:e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-lg-4 col-md-12",children:e.jsx("div",{className:"testimonial4",children:e.jsxs("div",{className:"active item",children:[e.jsx("blockquote",{className:"danger",children:e.jsx("p",{children:"Denim you probably haven't heard of. Lorem ipsum dolor met consectetur adipisicing sit amet, consectetur adipisicing elit, of them jean shorts sed magna aliqua. Lorem ipsum dolor met."})}),e.jsxs("div",{className:"carousel-info",children:[e.jsx("img",{alt:"",className:"rounded-circle float-left",src:G}),e.jsxs("div",{className:"float-left",children:[e.jsx("h6",{className:"mb-0 m-t-5",children:"Lina Mars"}),e.jsx("span",{children:"Web Designer"})]})]})]})})}),e.jsx("div",{className:"col-lg-4 col-md-12",children:e.jsx("div",{className:"testimonial4",children:e.jsxs("div",{className:"active item",children:[e.jsx("blockquote",{className:"primary",children:e.jsx("p",{children:"Denim you probably haven't heard of. Lorem ipsum dolor met consectetur adipisicing sit amet, consectetur adipisicing elit, of them jean shorts sed magna aliqua. Lorem ipsum dolor met."})}),e.jsxs("div",{className:"carousel-info",children:[e.jsx("img",{alt:"",className:"rounded-circle float-left",src:E}),e.jsxs("div",{className:"float-left",children:[e.jsx("h6",{className:"mb-0 m-t-5",children:"Hossein Shams"}),e.jsx("span",{children:"Commercial Director"})]})]})]})})}),e.jsx("div",{className:"col-lg-4 col-md-12",children:e.jsx("div",{className:"testimonial4",children:e.jsxs("div",{className:"active item",children:[e.jsx("blockquote",{className:"info",children:e.jsx("p",{children:"Denim you probably haven't heard of. Lorem ipsum dolor met consectetur adipisicing sit amet, consectetur adipisicing elit, of them jean shorts sed magna aliqua. Lorem ipsum dolor met."})}),e.jsxs("div",{className:"carousel-info",children:[e.jsx("img",{alt:"",className:"rounded-circle float-left",src:oe}),e.jsxs("div",{className:"float-left",children:[e.jsx("h6",{className:"mb-0 m-t-5",children:"Lina Mars"}),e.jsx("span",{children:"Front End Developer"})]})]})]})})}),e.jsx("div",{className:"col-lg-4 col-md-12",children:e.jsx("div",{className:"testimonial4",children:e.jsxs("div",{className:"active item",children:[e.jsx("blockquote",{className:"warning",children:e.jsx("p",{children:"Denim you probably haven't heard of. Lorem ipsum dolor met consectetur adipisicing sit amet, consectetur adipisicing elit, of them jean shorts sed magna aliqua. Lorem ipsum dolor met."})}),e.jsxs("div",{className:"carousel-info",children:[e.jsx("img",{alt:"",className:"rounded-circle float-left",src:de}),e.jsxs("div",{className:"float-left",children:[e.jsx("h6",{className:"mb-0 m-t-5",children:"John Smith"}),e.jsx("span",{children:"Commercial Director"})]})]})]})})}),e.jsx("div",{className:"col-lg-6 col-md-12",children:e.jsxs(k,{controls:!0,interval:2e5,children:[e.jsx(k.Item,{children:e.jsx("div",{className:"testimonial4",children:e.jsxs("div",{className:"active item",children:[e.jsx("blockquote",{className:"warning",children:e.jsx("p",{children:"Denim you probably haven't heard of. Lorem ipsum dolor met consectetur adipisicing sit amet, consectetur adipisicing elit, of them jean shorts sed magna aliqua. Lorem ipsum dolor met."})}),e.jsxs("div",{className:"carousel-info",children:[e.jsx("img",{alt:"",className:"rounded-circle float-left",src:de}),e.jsxs("div",{className:"float-left",children:[e.jsx("h6",{className:"mb-0 m-t-5",children:"John Smith"}),e.jsx("span",{children:"Commercial Director"})]})]})]})})}),e.jsx(k.Item,{children:e.jsx("div",{className:"testimonial4",children:e.jsxs("div",{className:"active item",children:[e.jsx("blockquote",{className:"info",children:e.jsx("p",{children:"Denim you probably haven't heard of. Lorem ipsum dolor met consectetur adipisicing sit amet, consectetur adipisicing elit, of them jean shorts sed magna aliqua. Lorem ipsum dolor met."})}),e.jsxs("div",{className:"carousel-info",children:[e.jsx("img",{alt:"",className:"rounded-circle float-left",src:oe}),e.jsxs("div",{className:"float-left",children:[e.jsx("h6",{className:"mb-0 m-t-5",children:"Lina Mars"}),e.jsx("span",{children:"Front End Developer"})]})]})]})})}),e.jsx(k.Item,{children:e.jsx("div",{className:"testimonial4",children:e.jsxs("div",{className:"active item",children:[e.jsx("blockquote",{className:"primary",children:e.jsx("p",{children:"Denim you probably haven't heard of. Lorem ipsum dolor met consectetur adipisicing sit amet, consectetur adipisicing elit, of them jean shorts sed magna aliqua. Lorem ipsum dolor met."})}),e.jsxs("div",{className:"carousel-info",children:[e.jsx("img",{alt:"",className:"rounded-circle float-left",src:E}),e.jsxs("div",{className:"float-left",children:[e.jsx("h6",{className:"mb-0 m-t-5",children:"Hossein Shams"}),e.jsx("span",{children:"Commercial Director"})]})]})]})})})]})})]})})})})}}const Qe=({mailInboxReducer:l})=>({}),Ye=$(Qe,{})(ze);class es extends q.Component{render(){const{name:r,image:n}=this.props;return e.jsx("div",{className:"col-lg-3 col-md-6",children:e.jsx("div",{className:"card testimonials",children:e.jsxs("div",{className:"body",children:[e.jsx("i",{className:"fa fa-quote-left"}),e.jsx("p",{children:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's took a galley of type and scrambled it to make a type specimen book."}),e.jsxs("div",{className:"m-t-30",children:[e.jsx("img",{alt:"",className:"media-object rounded-circle shadow",src:n}),e.jsx("h6",{className:"mb-0 m-t-10",children:r}),e.jsx("span",{children:"CEO, Apple inc"})]})]})})})}}const ss=({mailInboxReducer:l})=>({}),as=$(ss,{})(es);class is extends q.Component{render(){return e.jsx("div",{className:"col-lg-12",children:e.jsx("div",{className:"card",children:e.jsxs("div",{className:"body",children:[e.jsxs("div",{className:"row clearfix",children:[e.jsx("div",{className:"col-lg-6 col-md-12",children:e.jsxs("div",{className:"testimonial2 default",children:[e.jsxs("div",{className:"testimonial-section",children:[" ","Denim you probably haven't heard of. Lorem ipsum dolor met consectetur adipisicing sit amet, consectetur adipisicing elit, of them jean shorts sed magna aliqua. Lorem ipsum dolor met."]}),e.jsxs("div",{className:"testimonial-desc",children:[e.jsx("img",{alt:"",className:"media-object rounded-circle shadow",src:G}),e.jsxs("div",{className:"testimonial-writer",children:[e.jsx("h6",{children:"Zahed Kamal"}),e.jsx("span",{children:"Front End Developer"}),e.jsx("p",{children:e.jsx("a",{children:"Touch Base Inc"})})]})]})]})}),e.jsx("div",{className:"col-lg-6 col-md-12",children:e.jsxs("div",{className:"testimonial2 primary",children:[e.jsxs("div",{className:"testimonial-section",children:[" ","Denim you probably haven't heard of. Lorem ipsum dolor met consectetur adipisicing sit amet, consectetur adipisicing elit, of them jean shorts sed magna aliqua. Lorem ipsum dolor met."]}),e.jsxs("div",{className:"testimonial-desc",children:[e.jsx("img",{alt:"",className:"media-object rounded-circle shadow",src:E}),e.jsxs("div",{className:"testimonial-writer",children:[e.jsx("h6",{children:"Gary Camara"}),e.jsx("span",{children:"Web Designer"}),e.jsx("p",{children:e.jsx("a",{children:"Wraptech Inc"})})]})]})]})})]}),e.jsx("hr",{}),e.jsxs("div",{className:"row clearfix",children:[e.jsx("div",{className:"col-lg-6 col-md-12",children:e.jsxs("div",{className:"testimonial3 default",children:[e.jsxs("div",{className:"testimonial-section",children:[" ","Denim you probably haven't heard of. Lorem ipsum dolor met consectetur adipisicing sit amet, consectetur adipisicing elit, of them jean shorts sed magna aliqua. Lorem ipsum dolor met."]}),e.jsxs("div",{className:"testimonial-desc",children:[e.jsx("img",{alt:"",className:"media-object rounded-circle shadow",src:G}),e.jsxs("div",{className:"testimonial-writer",children:[e.jsx("h6",{children:"Zahed Kamal"}),e.jsx("span",{children:"Front End Developer"}),e.jsx("p",{children:e.jsx("a",{children:"Touch Base Inc"})})]})]})]})}),e.jsx("div",{className:"col-lg-6 col-md-12",children:e.jsxs("div",{className:"testimonial3 primary",children:[e.jsxs("div",{className:"testimonial-section",children:[" ","Denim you probably haven't heard of. Lorem ipsum dolor met consectetur adipisicing sit amet, consectetur adipisicing elit, of them jean shorts sed magna aliqua. Lorem ipsum dolor met."]}),e.jsxs("div",{className:"testimonial-desc",children:[e.jsx("img",{alt:"",className:"media-object rounded-circle shadow",src:E}),e.jsxs("div",{className:"testimonial-writer",children:[e.jsx("h6",{children:"Gary Camara"}),e.jsx("span",{children:"Web Designer"}),e.jsx("p",{children:e.jsx("a",{children:"Wraptech Inc"})})]})]})]})}),e.jsx("div",{className:"col-lg-6 col-md-12",children:e.jsxs("div",{className:"testimonial3 warning",children:[e.jsxs("div",{className:"testimonial-section",children:[" ","Denim you probably haven't heard of. Lorem ipsum dolor met consectetur adipisicing sit amet, consectetur adipisicing elit, of them jean shorts sed magna aliqua. Lorem ipsum dolor met."]}),e.jsxs("div",{className:"testimonial-desc",children:[e.jsx("img",{alt:"",className:"media-object rounded-circle shadow",src:Ue}),e.jsxs("div",{className:"testimonial-writer",children:[e.jsx("h6",{children:"Frank Camly"}),e.jsx("span",{children:"Angular Developer"}),e.jsx("p",{children:e.jsx("a",{children:"ABC Base Inc"})})]})]})]})}),e.jsx("div",{className:"col-lg-6 col-md-12",children:e.jsxs("div",{className:"testimonial3 danger",children:[e.jsxs("div",{className:"testimonial-section",children:[" ","Denim you probably haven't heard of. Lorem ipsum dolor met consectetur adipisicing sit amet, consectetur adipisicing elit, of them jean shorts sed magna aliqua. Lorem ipsum dolor met."]}),e.jsxs("div",{className:"testimonial-desc",children:[e.jsx("img",{alt:"",className:"media-object rounded-circle shadow",src:Xe}),e.jsxs("div",{className:"testimonial-writer",children:[e.jsx("h6",{children:"Gary Camara"}),e.jsx("span",{children:"ASP MVC"}),e.jsx("p",{children:e.jsx("a",{children:"ThemeTech Inc"})})]})]})]})})]})]})})})}}const ls=({mailInboxReducer:l})=>({}),rs=$(ls,{})(is);class ts extends q.Component{componentDidMount(){window.scrollTo(0,0)}render(){return e.jsx("div",{style:{flex:1},onClick:()=>{document.body.classList.remove("offcanvas-active")},children:e.jsx("div",{children:e.jsxs("div",{className:"container-fluid",children:[e.jsx(Ae,{HeaderText:"Testimonials",Breadcrumb:[{name:"Page",navigate:""},{name:"Testimonials",navigate:""}]}),e.jsx("div",{className:"row clearfix",children:e.jsx(Ye,{})}),e.jsx("div",{className:"row clearfix",children:Ge.map((r,n)=>e.jsx(as,{name:r.name,image:r.image},n))}),e.jsx("div",{className:"row clearfix",children:e.jsx(rs,{})})]})})})}}const ns=({ioTReducer:l})=>({isSecuritySystem:l.isSecuritySystem}),$s=$(ns,{})(ts);export{$s as default};
