import{y as Q,r as a,j as e,b as p}from"./index-CZLZpOaH.js";import{P as V}from"./PageHeader-6CScOhCz.js";import{C as x}from"./common.constants-BAKO8LyS.js";import{L as W}from"./Loader-BUXOLHKX.js";import{M as Y}from"./ModalComponent-Can9sfzz.js";import{M as Z}from"./ModalComponentPopup-D_u4dGYC.js";import{P as b}from"./Pagination-DBwceeB_.js";import"./DashbordData-n50t2wKP.js";import"./Modal-CsKgPfCY.js";import"./ThemeProvider-BovkV_tw.js";import"./listen-DOhMskc_.js";import"./useWindow-BRfE8g8U.js";import"./useEventCallback-BAoW58St.js";import"./useMergedRefs-CC2NoeT3.js";import"./useWillUnmount-B2faAFH4.js";import"./TransitionWrapper-hzIxZzZF.js";import"./Transition-yovTjeQN.js";import"./TransitionGroupContext-QmIPOmoK.js";import"./useMounted-_Ax2eNue.js";import"./usePrevious-DSHR52O9.js";import"./DataKey-COGXBUcQ.js";import"./ImperativeTransition-r3w4KPGy.js";import"./useIsomorphicEffect-Dy1EPX0O.js";import"./NoopTransition-DCT8I71y.js";import"./removeClass-loOrDRrx.js";import"./hasClass-D5ZjVvBY.js";import"./Fade-C3nPY4By.js";import"./CloseButton-BaMgJgcS.js";import"./index-tz1zYP65.js";import"./divWithClassName-BYsY4_Vt.js";import"./createSvgIcon-CvFBLNCx.js";import"./emotion-react.browser.esm-CGVHAuF1.js";import"./hoist-non-react-statics.cjs-B8tJyPPZ.js";import"./emotion-is-prop-valid.esm-BquxX9m-.js";import"./useControlled-CSwFU9cf.js";import"./ButtonBase-Dp3TaUiU.js";import"./useIsFocusVisible-CYy9vjXn.js";import"./assertThisInitialized-B9jnkVVz.js";function Te(){const N=Q(),[R,o]=a.useState(!1),[r,v]=a.useState(1);a.useState(1),a.useState(1);const[n,ee]=a.useState(10),[i,se]=a.useState(""),[y,D]=a.useState([]),[L,F]=a.useState([]),[P,M]=a.useState([]),[c,A]=a.useState(0),[l,I]=a.useState(0),[m,$]=a.useState(0),[E,_]=a.useState(0),[H,B]=a.useState(0),[T,U]=a.useState(0),[z,k]=a.useState(!1),[X,j]=a.useState(!1),[q,G]=a.useState(0),g=async s=>{j(!0),G(s)},J=()=>{j(!1)},u=s=>{N({pathname:"/create-risk-management",state:s})},K=async()=>{o(!0),j(!1),await p.post(`${x.BASE_URL}/deleterisksetting`,{id:q}).then(s=>{s.data.statuscode&&k(!0),S(),w(),C(),o(!1)}).catch(s=>{o(!1)})},f=(s,t)=>{t==r,v(t),console.log("newpage",t)},S=()=>{o(!0),o(i==="");const s={pageindex:r,categoryId:1,pagesize:n,searchdata:i===""?"%%":i,sortparam:"create_at",sortorder:"ASC"};p.post(x.BASE_URL+"/getallrisksettings",s).then(async t=>{var d;const h=await t.data.data;t.data.status===!0&&(D(h),_((d=t.data)==null?void 0:d.totalPageCount),A(t.data.recordCount))}).catch(t=>{console.log(t)}),o(!1)},w=()=>{o(!0),o(i==="");const s={pageindex:r,categoryId:2,pagesize:n,searchdata:i===""?"%%":i,sortparam:"create_at",sortorder:"ASC"};p.post(x.BASE_URL+"/getallrisksettings",s).then(async t=>{var d;const h=await t.data.data;t.data.status===!0&&(F(h),B((d=t.data)==null?void 0:d.totalPageCount),I(t.data.recordCount))}).catch(t=>{console.log(t)}),o(!1)},C=()=>{o(!0),o(i==="");const s={pageindex:r,categoryId:3,pagesize:n,searchdata:i===""?"%%":i,sortparam:"create_at",sortorder:"ASC"};p.post(x.BASE_URL+"/getallrisksettings",s).then(async t=>{var d;const h=await t.data.data;t.data.status===!0&&(M(h),U((d=t.data)==null?void 0:d.totalPageCount),$(t.data.recordCount))}).catch(t=>{console.log(t)}),o(!1)},O=()=>{N("/create-risk-management")};return a.useEffect(s=>{S(),w(),C()},[i,r,n]),e.jsxs(e.Fragment,{children:[R==!0?e.jsx(W,{}):"",e.jsx("div",{children:e.jsx("div",{children:e.jsxs("div",{className:"container-fluid",onClick:()=>{document.body.classList.remove("offcanvas-active")},children:[e.jsx(V,{HeaderText:"Risk Management",Breadcrumb:[{name:"Dashboard",navigate:""},{name:"IoT Dashboard",navigate:""}]}),e.jsx("div",{className:"row clearfix",children:e.jsx("div",{className:"col-lg-12 col-md-12",children:e.jsx("div",{className:"card",children:e.jsx("div",{className:"body project_report",children:e.jsxs("div",{className:"table-responsive1",children:[e.jsx("div",{className:"row"}),e.jsxs("div",{className:"filter-row d-flex justify-content-between align-items-center mb-3",children:[e.jsx("p",{className:"font-weight-normal responsiveFontLarge mb-0",children:"Amount Threshold  "}),e.jsx("div",{className:"row d-flex g-0",children:e.jsx("div",{className:" justify-content-end d-flex  responsiveFontLarge",children:e.jsxs("a",{className:"btn btn-default purpleBackground text-white bolder responsiveFontLarge",onClick:()=>{O()},children:[e.jsx("i",{className:"text-white fa fa-plus bolder"})," Add New"]})})})]}),e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{className:"table m-b-0 ",children:[e.jsx("thead",{className:"thead-light responsiveFontLarge",children:e.jsxs("tr",{children:[e.jsx("th",{className:"responsiveFontLarge",children:"Duration/Days"}),e.jsx("th",{className:"responsiveFontLarge",children:"Low Risk"}),e.jsx("th",{className:"responsiveFontLarge",children:"Medium Risk"}),e.jsx("th",{className:"responsiveFontLarge",children:"High Risk"}),e.jsx("th",{className:"responsiveFontLarge",children:"Actions"})]})}),y&&y.sort((s,t)=>s.days-t.days).map(s=>e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsxs("td",{children:[s.days," ",s.days==1?"Day":"Days"]}),e.jsx("td",{className:"project-title",children:e.jsx("h6",{children:e.jsxs("a",{children:[s.categoryId==1?"$":"",s.lowRisk]})})}),e.jsxs("td",{children:[s.categoryId==1?"$":"",s.mediumRisk]}),e.jsxs("td",{children:[s.categoryId==1?"$":"",s.highRisk," + "]}),e.jsxs("td",{className:"project-actions",children:[e.jsx("a",{className:"bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black",onClick:t=>u(s.id),children:e.jsx("i",{className:"fa fa-edit ",title:"Edit"})})," "," ",e.jsx("a",{className:"bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black",onClick:()=>{g(s.id)},children:e.jsx("i",{className:"fa fa-trash",title:"Delete",style:{color:"red"}})})]})]},s.id)}))]})}),c>10?e.jsxs("div",{className:"d-flex justify-content-between pt-4 mr-4 mr-4",children:[e.jsx("div",{className:"filter-row pt-2",children:c>0?`Showing ${(r-1)*n+1} to ${r*n>c?c:r*n} of ${c} entries`:"No records Available"}),e.jsx(b,{count:E,className:"pbDowSt pbSt",page:r,onChange:f,color:"secondary",shape:"rounded"})]}):"",e.jsx("br",{}),e.jsx("br",{}),e.jsx("div",{className:"filter-row pb-2",children:e.jsx("p",{className:"font-weight-normal responsiveFontLarge",children:"Number of Transaction"})}),e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{className:"table m-b-0 ",children:[e.jsx("thead",{className:"thead-light",children:e.jsxs("tr",{children:[e.jsx("th",{className:"responsiveFontLarge",children:"Duration/Days"}),e.jsx("th",{className:"responsiveFontLarge",children:"Low Risk"}),e.jsx("th",{className:"responsiveFontLarge",children:"Medium Risk"}),e.jsx("th",{className:"responsiveFontLarge",children:"High Risk"}),e.jsx("th",{className:"responsiveFontLarge",children:"Actions"})]})}),L.sort((s,t)=>s.days-t.days).map(s=>e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsxs("td",{children:[s.days," ",s.days==1?"Day":"Days"]}),e.jsx("td",{className:"project-title",children:e.jsx("h6",{children:e.jsx("a",{children:s.lowRisk})})}),e.jsx("td",{children:s.mediumRisk}),e.jsxs("td",{children:[s.highRisk," + "]}),e.jsxs("td",{className:"project-actions",children:[e.jsx("a",{className:"bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black",onClick:t=>u(s.id),children:e.jsx("i",{className:"fa fa-edit ",title:"Edit"})})," "," ",e.jsx("a",{className:"bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black",onClick:()=>{g(s.id)},children:e.jsx("i",{className:"fa fa-trash",title:"Delete",style:{color:"red"}})})]})]},s.id)}))]})}),l>10?e.jsxs("div",{className:"d-flex justify-content-between pt-4 mr-4 mr-4",children:[e.jsx("div",{className:"filter-row pt-2",children:l>0?`Showing ${(r-1)*n+1} to ${r*n>l?l:r*n} of ${l} entries`:"No records Available"}),e.jsx(b,{count:H,className:"pbDowSt pbSt",page:r,onChange:f,color:"secondary",shape:"rounded"})]}):"",e.jsx("br",{}),e.jsx("br",{}),e.jsx("div",{className:"filter-row pb-2",children:e.jsx("p",{className:"font-weight-normal responsiveFontLarge",children:"Number of Active Recipients"})}),e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{className:"table m-b-0 ",children:[e.jsx("thead",{className:"thead-light",children:e.jsxs("tr",{children:[e.jsx("th",{className:"responsiveFontLarge",children:"Duration/Days"}),e.jsx("th",{className:"responsiveFontLarge",children:"Low Risk"}),e.jsx("th",{className:"responsiveFontLarge",children:"Medium Risk"}),e.jsx("th",{className:"responsiveFontLarge",children:"High Risk"}),e.jsx("th",{className:"responsiveFontLarge",children:"Actions"})]})}),P.sort((s,t)=>s.days-t.days).map(s=>e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsxs("td",{children:[s.days," ",s.days==1?"Day":"Days"]}),e.jsx("td",{className:"project-title",children:e.jsx("h6",{children:e.jsx("a",{children:s.lowRisk})})}),e.jsx("td",{children:s.mediumRisk}),e.jsxs("td",{children:[s.highRisk," + "]}),e.jsxs("td",{className:"project-actions",children:[e.jsx("a",{className:"bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black",onClick:t=>u(s.id),children:e.jsx("i",{className:"fa fa-edit",title:"Edit"})})," "," ",e.jsx("a",{className:"bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black",onClick:()=>{g(s.id)},children:e.jsx("i",{className:"fa fa-trash",title:"Delete",style:{color:"red"}})})]})]},s.id)}))]})}),m>10?e.jsxs("div",{className:"d-flex justify-content-between pt-4 mr-4 mr-4",children:[e.jsx("div",{className:"filter-row pt-2",children:m>0?`Showing ${(r-1)*n+1} to ${r*n>m?m:r*n} of ${m} entries`:"No records Available"}),e.jsx(b,{count:T,className:"pbDowSt pbSt",page:r,onChange:f,color:"secondary",shape:"rounded"})]}):"",e.jsx(Y,{show:z,title11:"Deleted Successfully",onHide:()=>k(!1)}),e.jsx(Z,{show:X,title1:"Are you sure want to delete this record ?",cancle:s=>J(),SavePr:()=>K()})]})})})})})]})})})]})}export{Te as default};
