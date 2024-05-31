import{y as z,r as o,R as l,j as e,b as C}from"./index-CZLZpOaH.js";import{P as U}from"./PageHeader-6CScOhCz.js";import{C as m}from"./common.constants-BAKO8LyS.js";import{h as N}from"./moment-CAEcp8GN.js";import{M as $}from"./ModalComponent-Can9sfzz.js";import{L as G}from"./Loader-BUXOLHKX.js";import{M as O}from"./ModalComponentPopup-D_u4dGYC.js";import{N as V}from"./NoRecordWithAddBtn-DmeiGlWH.js";import{N as W}from"./NoRecord-YEWFTOK2.js";import{F as f}from"./Form-ExWjSL5Y.js";import{C as X}from"./Col-BflThe67.js";import{P as J}from"./Pagination-DBwceeB_.js";import"./DashbordData-n50t2wKP.js";import"./Modal-CsKgPfCY.js";import"./ThemeProvider-BovkV_tw.js";import"./listen-DOhMskc_.js";import"./useWindow-BRfE8g8U.js";import"./useEventCallback-BAoW58St.js";import"./useMergedRefs-CC2NoeT3.js";import"./useWillUnmount-B2faAFH4.js";import"./TransitionWrapper-hzIxZzZF.js";import"./Transition-yovTjeQN.js";import"./TransitionGroupContext-QmIPOmoK.js";import"./useMounted-_Ax2eNue.js";import"./usePrevious-DSHR52O9.js";import"./DataKey-COGXBUcQ.js";import"./ImperativeTransition-r3w4KPGy.js";import"./useIsomorphicEffect-Dy1EPX0O.js";import"./NoopTransition-DCT8I71y.js";import"./removeClass-loOrDRrx.js";import"./hasClass-D5ZjVvBY.js";import"./Fade-C3nPY4By.js";import"./CloseButton-BaMgJgcS.js";import"./index-tz1zYP65.js";import"./divWithClassName-BYsY4_Vt.js";import"./ElementChildren-DV238mrs.js";import"./createSvgIcon-CvFBLNCx.js";import"./emotion-react.browser.esm-CGVHAuF1.js";import"./hoist-non-react-statics.cjs-B8tJyPPZ.js";import"./emotion-is-prop-valid.esm-BquxX9m-.js";import"./useControlled-CSwFU9cf.js";import"./ButtonBase-Dp3TaUiU.js";import"./useIsFocusVisible-CYy9vjXn.js";import"./assertThisInitialized-B9jnkVVz.js";function ze(){window.scrollTo(0,0);const w=z(),y=()=>{w({pathname:"/exchange-rate-form",state:!0})},[s,P]=o.useState([]),[R,j]=o.useState(!1),[i,D]=l.useState(m.DefaultPageSize),[g,K]=l.useState(""),[n,h]=l.useState(1),[E,M]=l.useState(0),[k,c]=o.useState(!1),[p,A]=l.useState(0),[F,x]=o.useState(!1),[Y,_]=o.useState(0);o.useState(!1);const[d,L]=o.useState(""),B=t=>{const a=t.target.value,r=N(a).format("YYYY-MM-DD");L(r)},S=async()=>{c(g==="");const t={pageindex:n,pagesize:i,searchdata:d=="Invalid date"?"":d,sortparam:"created_at",sortorder:"DESC"};C({url:m.BASE_URL+"/getallexchangerates",method:"POST",data:t}).then(r=>{P(r.data.data),M(r.data.totalPageCount),c(!1),A(r.data.recordCount)})},H=()=>{x(!1)},I=async t=>{x(!0),_(t)},T=(t,a)=>{a==n,h(a)},v=t=>{D(Number(t.target.value)),h(1)},q=async()=>{c(!0),x(!1),await C.post(`${m.BASE_URL}/deleteexchangeratebyid`,{id:Y}).then(t=>{t.data.statuscode==200&&j(!0),S(),c(!1)}).catch(t=>{c(!1)})};return o.useEffect(()=>{S()},[n,i,g,d]),e.jsx("div",{onClick:()=>{document.body.classList.remove("offcanvas-active")},children:e.jsx("div",{children:e.jsxs("div",{className:"container-fluid",children:[k==!0?e.jsx(G,{}):"",e.jsx(U,{HeaderText:"Exchange Rate",Breadcrumb:[{name:"Dashboard",navigate:""},{name:"IoT Dashboard",navigate:""}]}),e.jsx("div",{className:"row clearfix",children:e.jsx("div",{className:"col-lg-12 col-md-12",children:e.jsx("div",{className:"card",children:e.jsx("div",{className:"body project_report",children:e.jsxs("div",{className:"table-responsive",children:[e.jsx("div",{className:"row d-flex g-0",children:e.jsx("div",{className:" justify-content-end d-flex"})}),e.jsxs("div",{className:"d-flex justify-content-between align-items-center respoChildFooter ",children:[s&&s.length>0&&e.jsxs("div",{className:"filter-row mb-2 ",children:["Show Entries    ",e.jsx("div",{className:"d-flex align-items-center pbSt",children:e.jsx(f.Select,{name:"tbl_meeting_length",onChange:v,value:i,"aria-controls":"tbl_meeting",className:"form-control-sm py-2 h-auto  ps-3 mt-1",children:m.show_rows.map(t=>e.jsx("option",{value:t,children:t}))})})]}),e.jsxs("div",{className:"form-group d-flex align-items-center mb-0 respoChildFooter",children:[e.jsx(f.Group,{as:X,className:" input-container required pb-0 ps-0 pe-0 pbSt",children:e.jsx(f.Control,{type:"date",required:!0,placeholder:"From date",name:"Referal",className:" reflink link py-2 pbSt",value:d,onChange:B})}),"   ",e.jsxs("a",{className:"pbSt purpleBackground btn btn-default text-white bolder",onClick:()=>{y()},children:[e.jsx("i",{className:"text-white fa fa-plus bolder"})," Add New"]})]})]}),s&&s.length>0?e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{className:"table m-b-0 ",children:[e.jsx("thead",{className:"thead-light",children:e.jsxs("tr",{children:[e.jsx("th",{children:"From"}),e.jsx("th",{children:"To"}),e.jsx("th",{children:"Deal Rate"}),e.jsx("th",{children:"Rate"}),e.jsx("th",{children:"Custom Rate"}),e.jsx("th",{children:"Valid From"}),e.jsx("th",{children:"Actions"})]})}),s==null?void 0:s.map(t=>{var a,r,u,b;return e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:t==null?void 0:t.fromCountryName}),e.jsx("td",{children:t==null?void 0:t.toCountryName}),e.jsx("td",{className:"project-title",children:e.jsxs("h6",{children:[" ",e.jsxs("a",{children:[" ",t==null?void 0:t.dealRate]})," "]})}),e.jsx("td",{children:Number((r=(a=t==null?void 0:t.publishedRate)==null?void 0:a.toString())==null?void 0:r.match(/^\d+(?:\.\d{0,4})?/))}),e.jsx("td",{children:Number((b=(u=t==null?void 0:t.customPublishedRate)==null?void 0:u.toString())==null?void 0:b.match(/^\d+(?:\.\d{0,4})?/))}),e.jsx("td",{children:N(t==null?void 0:t.createdAt).format("MM/DD/YYYY HH:MM:SS")}),e.jsx("td",{children:e.jsx("a",{onClick:()=>{I(t.id)},className:"bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black",children:e.jsx("i",{className:"fa fa-trash",style:{color:"red"},title:"Delete"})})})]})})})]})}):d===""?e.jsx(W,{}):e.jsx(V,{}),s&&s.length>0?e.jsxs("div",{className:"d-flex paginationBetween pt-4 respoChildFooter",children:[e.jsxs("div",{className:"filter-row pt-2",children:["Showing ",(n-1)*i+1," to ",n*i>p?p:n*i," of ",p," entries"]}),e.jsx(J,{count:E,className:"pbDowSt pbSt",page:n,onChange:T})]}):"",e.jsx($,{show:R,title11:"Exchange Rate deleted successfully",onHide:()=>j(!1)}),e.jsx(O,{show:F,title1:"Are you sure want to delete this record ?",cancle:t=>H(),SavePr:()=>q()})]})})})})})]})})})}export{ze as default};
