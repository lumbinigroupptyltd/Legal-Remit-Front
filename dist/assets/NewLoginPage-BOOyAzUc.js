import{a as G,N as T,P as B,Q as P,S as I,I as q,y as v,T as M,J as j,r as o,j as e,F as b,w as N}from"./index-CZLZpOaH.js";import{d as _}from"./Lock-DzvnwpkA.js";import{e as F,g as V,d as W,R as Q}from"./Email-Dz6_QFAS.js";import{L as U,R as z}from"./LoginAvatar-CZf0WU2p.js";import{L as H}from"./Loader-BUXOLHKX.js";import{c as O,a as C,u as $}from"./object-Bayh73Pv.js";import{C as J}from"./CButton-lfoW378t.js";import{V as Z,a as K}from"./VisibilityOff-DzAPYV_A.js";import{G as n}from"./Grid-id85xLWy.js";import{B as g}from"./Box-Jn0s_-VR.js";import{T as l}from"./Typography-BcWyJy-x.js";import{M as X}from"./Modal-Cgbm8Po3.js";import{B as Y}from"./Button-CasUi-tz.js";import"./createSvgIcon-BXb30exD.js";import"./createSvgIcon-CvFBLNCx.js";import"./emotion-react.browser.esm-CGVHAuF1.js";import"./hoist-non-react-statics.cjs-B8tJyPPZ.js";import"./emotion-is-prop-valid.esm-BquxX9m-.js";import"./ownerWindow-B35kT-qP.js";import"./useId-BCOK0MJf.js";import"./useIsFocusVisible-CYy9vjXn.js";import"./useControlled-CSwFU9cf.js";import"./TextField-B0_iTAre.js";import"./useFormControl-CzMDRFSC.js";import"./Menu-CCA4zl2y.js";import"./Portal-BnZs0see.js";import"./isHostComponent-D6l1mxjA.js";import"./Tooltip-DYflzQT5.js";import"./createPopper-iTKh2FQm.js";import"./Transition-yovTjeQN.js";import"./TransitionGroupContext-QmIPOmoK.js";import"./List-DLO7RK4x.js";import"./Switch-DhwBSzVW.js";import"./FormControlLabel-ClmJ5AOu.js";import"./ButtonBase-Dp3TaUiU.js";import"./assertThisInitialized-B9jnkVVz.js";import"./styled-BOA1IAlI.js";import"./IconButton-BzGgG0Jk.js";import"./Chip-D__LQUMY.js";import"./useMediaQuery-DWBAZRDH.js";import"./index-tz1zYP65.js";import"./colorManipulator-qlAocAFq.js";import"./removeClass-loOrDRrx.js";import"./hasClass-D5ZjVvBY.js";import"./ListItem-BYnaDN6e.js";import"./FormGroup-DdH-ssQh.js";import"./useSlot-BwsY1ywl.js";const ee=async t=>await G.post("/user/login",t),te=(t,a)=>i=>{T(t),B(a);const c=P(t);i({type:I,payload:{token:t,refreshToken:a,role:c.role,verified:c.isSignupCompleted}})},oe=({onSuccess:t})=>{const a=q(),i=v(),c=M();return F(["addsignup"],s=>ee(s),{onSuccess:(s,m,d)=>{var f,x;j.success("Login successful"),t&&t(s,m,d);const p=(f=s==null?void 0:s.data)==null?void 0:f.token,h=(x=s==null?void 0:s.data)==null?void 0:x.refreshToken;c(te(p,h));const u=P(p);u!=null&&u.isSignupCompleted?i("/dashboard"):i("/profile"),a.invalidateQueries("")},onError:(s,m,d)=>{j.error(V(s))}})},se=O().shape({email:C().required("Email is required"),password:C().required("Password is required")}),re=()=>{const[t,a]=o.useState(!1),[i,c]=o.useState(!1),[s,m]=o.useState(!1),{mutate:d}=oe({}),p=$({initialValues:{email:"",password:""},validationSchema:se,enableReinitialize:!0,onSubmit:async r=>{a(!0),h(r)}}),h=async r=>{r={...r},d(r,{onSuccess:async()=>{}})};return{loading:t,formik:p,showPassword:i,showConfirmPassword:s,handleClickShowPassword:()=>{c(r=>!r)},handleClickShowConfirmPassword:()=>{m(r=>!r)},handleMouseDownPassword:r=>{r.preventDefault()}}},ae=[{name:"email",label:"Email",required:!0,type:"text",iconStart:e.jsx(W,{}),id:b(),md:12,sm:12},{name:"password",label:"Password",required:!0,type:"password",iconEnd1:e.jsx(Z,{}),iconEnd2:e.jsx(K,{}),iconStart:e.jsx(_,{}),id:b(),md:12,sm:12}],Ye=()=>{const t=N(),a=v();o.useState("");const[i,c]=o.useState(!1);o.useState(!1),o.useState(null),o.useState(null),o.useState(!1),o.useState(!1),o.useState(!1),o.useState(!1),o.useState(!1),o.useState(!1),o.useState(!1),o.useState(!1);const[s,m]=o.useState({error:"",showPopup:!1});o.useState(!1);const{formik:d,showPassword:p,showConfirmPassword:h,handleClickShowPassword:u,handleClickShowConfirmPassword:f,handleMouseDownPassword:x}=re(),r={showPassword:p,showConfirmPassword:h,handleClickShowPassword:u,handleClickShowConfirmPassword:f,handleMouseDownPassword:x};o.useEffect(()=>{},[i]);const k=()=>{S(""),a("/profile")},S=(w,A=!1)=>{m(E=>({...E,error:w,showPopup:A}))},[y,L]=o.useState(!1),D=w=>{w&&L(!0)},R=()=>{y&&d.handleSubmit()};return e.jsx(e.Fragment,{children:e.jsxs("section",{children:[i&&e.jsx(H,{}),e.jsxs(n,{container:!0,spacing:3,width:"90%",sx:{display:"flex",flexDirection:{lg:"row",md:"row",sm:"column",xs:"column"},justifyContent:"space-around",boxShadow:t.palette.boxShadow.default,margin:"2rem auto",alignItems:"center"},padding:"0rem 3rem",children:[e.jsx(n,{item:!0,xs:3,sm:4,md:5,lg:5,children:e.jsx(g,{sx:{width:{lg:"450px",md:"350px",sm:"280px",xs:"240px"}},children:e.jsx("img",{width:"100%",src:U,alt:"Login Avatar"})})}),e.jsxs(n,{item:!0,xs:8,sm:7,md:5,lg:5,sx:{display:"flex",flexDirection:"column"},children:[e.jsxs(g,{children:[e.jsx(l,{variant:"h6",align:"center",mb:2,sx:{width:"fit-content",borderRadius:"0 14px 14px 0",background:t.palette.button.primary,color:"#fff",padding:"0.5rem 1rem","&:hover":{background:t.palette.hover.primary}},children:"Welcome to LegalRemit"}),e.jsx(g,{sx:{textAlign:"center"},children:e.jsx(l,{variant:"p",sx:{color:t.palette.button.primary,fontWeight:"800",fontSize:"2rem"},children:"Login"})}),e.jsx(l,{variant:"body1",className:"fs-6 mb-3 simple",align:"center",children:"Enter your details to sign in into your account"})]}),e.jsx(Q,{inputField:ae,formik:d,passwordProps:r}),e.jsx(n,{align:"end",children:e.jsx(l,{variant:"p",sx:{color:t.palette.button.secondary},onClick:()=>a("/forgotpassword"),children:"Forgot Password?"})}),e.jsx(n,{mt:2,align:"center",children:e.jsx(z,{onChange:D,sitekey:"6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"})}),e.jsx(n,{mt:2,align:"center",children:e.jsxs(l,{variant:"body1",component:"p",children:["This site is protected by reCAPTCHA and the Google"," ",e.jsx("a",{style:{textDecoration:"underline",color:t.palette.button.primary,cursor:"pointer"},href:"https://policies.google.com/privacy?hl=en-GB",target:"_blank",rel:"noopener noreferrer",children:"Privacy Policy"})," ","and"," ",e.jsx("a",{style:{textDecoration:"underline",color:t.palette.button.primary,cursor:"pointer"},href:"https://policies.google.com/terms?hl=en-GB",target:"_blank",rel:"noopener noreferrer",children:"Terms of Service"})," ","apply."]})}),e.jsx(n,{mt:2,children:e.jsx(J,{buttonName:"Login",OnClick:R,variant:"contained",fullWidth:"fullWidth",Width:"-webkit-fill-available",BGColor:t.palette.button.primary,BGHover:`${t.palette.hover.primary}`,disabled:!y})}),e.jsx(n,{mb:2,sx:{display:"flex",justifyContent:"center"},children:e.jsxs(l,{variant:"p",children:["Don't have an account?"," ",e.jsx("span",{style:{fontWeight:"600",fontSize:"1rem",color:t.palette.button.primary,cursor:"pointer"},onClick:()=>a("/signup"),children:"Sign Up"})]})})]})]}),e.jsx(X,{open:s.showPopup,onClose:()=>S("",!1),"aria-labelledby":"modal-modal-title","aria-describedby":"modal-modal-description",children:e.jsxs(g,{className:"modal-container",children:[e.jsx(l,{id:"modal-modal-title",variant:"h6",component:"h2",children:"Signup Complete"}),e.jsx(l,{id:"modal-modal-description",sx:{mt:2},children:s.error}),e.jsx(Y,{onClick:k,children:"Go to Profile"})]})})]})})};export{Ye as default};
