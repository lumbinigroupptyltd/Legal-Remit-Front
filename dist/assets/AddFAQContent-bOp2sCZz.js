import{r as o,y as B,j as e,b as l}from"./index-CZLZpOaH.js";import"./PageHeader-6CScOhCz.js";import{D as d,r as T}from"./react-draft-wysiwyg-DGDLocOJ.js";import{C as c}from"./common.constants-BAKO8LyS.js";import{M as j}from"./ModalComponent-Can9sfzz.js";import{L as O}from"./Loader-BUXOLHKX.js";import{F as a}from"./Form-ExWjSL5Y.js";import"./DashbordData-n50t2wKP.js";import"./Modal-CsKgPfCY.js";import"./ThemeProvider-BovkV_tw.js";import"./listen-DOhMskc_.js";import"./useWindow-BRfE8g8U.js";import"./useEventCallback-BAoW58St.js";import"./useMergedRefs-CC2NoeT3.js";import"./useWillUnmount-B2faAFH4.js";import"./TransitionWrapper-hzIxZzZF.js";import"./Transition-yovTjeQN.js";import"./TransitionGroupContext-QmIPOmoK.js";import"./useMounted-_Ax2eNue.js";import"./usePrevious-DSHR52O9.js";import"./DataKey-COGXBUcQ.js";import"./ImperativeTransition-r3w4KPGy.js";import"./useIsomorphicEffect-Dy1EPX0O.js";import"./NoopTransition-DCT8I71y.js";import"./removeClass-loOrDRrx.js";import"./hasClass-D5ZjVvBY.js";import"./Fade-C3nPY4By.js";import"./CloseButton-BaMgJgcS.js";import"./index-tz1zYP65.js";import"./divWithClassName-BYsY4_Vt.js";import"./ElementChildren-DV238mrs.js";import"./Col-BflThe67.js";const H={options:["inline","blockType","list","textAlign","history","fontFamily","colorPicker","emoji"],inline:{inDropdown:!1,options:["bold","italic","underline","strikethrough"]},colorPicker:{className:void 0,component:void 0,popupClassName:void 0,colors:["rgb(97,189,109)","rgb(26,188,156)","rgb(84,172,210)","rgb(44,130,201)","rgb(147,101,184)","rgb(71,85,119)","rgb(204,204,204)","rgb(65,168,95)","rgb(0,168,133)","rgb(61,142,185)","rgb(41,105,176)","rgb(85,57,130)","rgb(40,50,78)","rgb(0,0,0)","rgb(247,218,100)","rgb(251,160,38)","rgb(235,107,86)","rgb(226,80,65)","rgb(163,143,132)","rgb(239,239,239)","rgb(255,255,255)","rgb(250,197,28)","rgb(243,121,52)","rgb(209,72,65)","rgb(184,49,47)","rgb(124,112,107)","rgb(209,213,216)"]},emoji:{className:void 0,component:void 0,popupClassName:void 0,emojis:["😀","😁","😂","😃","😉","😋","😎","😍","😗","🤗","🤔","😣","😫","😴","😌","🤓","😛","😜","😠","😇","😷","😈","👻","😺","😸","😹","😻","😼","😽","🙀","🙈","🙉","🙊","👼","👮","🕵","💂","👳","🎅","👸","👰","👲","🙍","🙇","🚶","🏃","💃","⛷","🏂","🏌","🏄","🚣","🏊","⛹","🏋","🚴","👫","💪","👈","👉","👉","👆","🖕","👇","🖖","🤘","🖐","👌","👍","👎","✊","👊","👏","🙌","🙏","🐵","🐶","🐇","🐥","🐸","🐌","🐛","🐜","🐝","🍉","🍄","🍔","🍤","🍨","🍪","🎂","🍰","🍾","🍷","🍸","🍺","🌍","🚑","⏰","🌙","🌝","🌞","⭐","🌟","🌠","🌨","🌩","⛄","🔥","🎄","🎈","🎉","🎊","🎁","🎗","🏀","🏈","🎲","🔇","🔈","📣","🔔","🎵","🎷","💰","🖊","📅","✅","❎","💯"]},list:{inDropdown:!0,options:["unordered","ordered"]},fontFamily:{options:["Arial","Georgia","Impact","Tahoma","Times New Roman","Verdana"],className:void 0,component:void 0,dropdownClassName:void 0},textAlign:{inDropdown:!0,options:["left","center","right","justify"]},link:{inDropdown:!1,showOpenOptionOnHover:!1,defaultTargetOption:"_blank"},history:{inDropdown:!1,options:["undo","redo"]}};function xe(b){const[i,m]=o.useState(""),[s,R]=o.useState(b.location.state),[M,N]=o.useState(null),[S,y]=o.useState(!1),[E,A]=o.useState(!1),[k,P]=o.useState(!1),[n,f]=o.useState(""),[h,x]=o.useState(d.EditorState.createEmpty()),[v,w]=o.useState(!1),[p,C]=o.useState(0);o.useRef("");const u=B(),L=t=>{x(t),f(t.getCurrentContent().getPlainText())},q=async()=>{try{const t=await l.post(c.BASE_URL+"/getfaqbyid",{id:s});if(t.data.status==!0){const r=t.data.data;m(r.question),x(d.EditorState.createWithContent(d.ContentState.createFromBlockArray(d.convertFromHTML(r.answer))))}}catch(t){console.log(t)}},D=()=>{if(s){const t=h.getCurrentContent().getPlainText();if(!i||!(n||t))w(!0);else{const r={id:s,question:i,answer:n||t,sortorderNumber:p};l.post(c.BASE_URL+"/editfaqbyid",r).then(g=>{g.data.status==!0&&u("/faq-content")}).catch(g=>console.log(g))}}else if(!i||!n)w(!0);else{const t={question:i,answer:n,sortorderNumber:p};l.post(c.BASE_URL+"/savefaq",t).then(r=>{r.data.status==!0&&(f(""),m(""),u("/faq-content"))}).catch(r=>console.log(r))}},F=async()=>{const t=await l.get(c.BASE_URL+"/getmaxsortorderfaq");t.data.status==!0&&C(t.data.data)};return o.useEffect(()=>{N(b.location.state),s&&q(),F()},[s]),e.jsx("div",{children:e.jsx("div",{children:e.jsxs("div",{className:"container-fluid",onClick:()=>{document.body.classList.remove("offcanvas-active")},children:[k==!0?e.jsx(O,{}):"",e.jsx("div",{className:"mainBoxService mt-5",children:e.jsxs("div",{className:"serviceHeader bg-white text-black rounded-2",children:[e.jsxs("h3",{className:"text-black px-4 mx-2  normal  border-bottom  pt-4 pb-3 pb-2 responsiveFontLargeMedium ",children:[s?"Update":"Add"," FAQ"]}),e.jsxs("div",{className:"mainBoxService-Body bg-white text-black pe-4 ps-4 py-4",children:[e.jsxs(a,{id:"notificationCheck",children:[e.jsxs(a.Group,{className:"mb-3",controlId:"formBasicEmail",children:[e.jsx(a.Label,{children:"Question"}),e.jsx(a.Control,{type:"text",placeholder:"Enter your Question",value:i,onChange:t=>m(t.target.value),className:"required"}),v&&!i&&e.jsx("small",{className:"responsiveFontLarge  text-danger",children:"Please Enter Question"})]}),e.jsxs(a.Group,{children:[e.jsx(a.Label,{children:"Answer"}),e.jsx(T.Editor,{editorState:h,wrapperClassName:"email-editor-wrapper",editorClassName:"email-editor-content",onEditorStateChange:L,toolbar:H}),v&&!n&&e.jsx("small",{className:"responsiveFontLarge  text-danger error_message ms-2 error",children:"Please Enter Answer"})]}),e.jsxs(a.Group,{className:"mb-3 mt-3",controlId:"formBasicEmail",children:[e.jsx(a.Label,{children:"Sort Order"}),e.jsx(a.Control,{type:"tel",maxLength:"11",minLength:"6",name:"phoneNumber",placeholder:"Sort Order",value:p,onChange:t=>{const r=t.target.value.replace(/\D/g,"");C(r)},className:"required"})]}),e.jsxs("div",{className:"row d-flex ms-auto mt-3",children:[e.jsx("a",{style:{background:"#AA2AE1"},className:"w-auto px-3 rounded btn text-white bolder",onClick:D,children:s?"Update":"Create"}),e.jsx("a",{className:"w-auto px-3 btn btn-default ms-3 text-black bolder border 2",onClick:()=>u("/faq-content"),children:" Cancel"})]})]}),e.jsx(j,{show:E,title1:"Notification Template updated successfully",onHide:()=>A(!1)}),e.jsx(j,{show:S,title11:"Notification Template added successfully",onHide:()=>y(!1)})]})]})})]})})})}export{xe as default};
