import{r as o,y as k,b as l,j as e}from"./index-CZLZpOaH.js";import{C as d}from"./common.constants-BAKO8LyS.js";import{C as p}from"./Container-D9at3elR.js";import{R as r}from"./Row-q1SNRrbp.js";import{F as s}from"./Form-ExWjSL5Y.js";import{C as i}from"./Col-BflThe67.js";import"./ThemeProvider-BovkV_tw.js";import"./index-tz1zYP65.js";import"./ElementChildren-DV238mrs.js";function A(c){o.useState(!0),k();const[m,x]=o.useState([]),[f,j]=o.useState(""),[n,h]=o.useState(!1),[b,y]=o.useState(null);o.useState([]),o.useEffect(()=>{N(),g()},[]);const g=async()=>{try{const t={id:c.location.state},a=await l.post(d.BASE_URL+"/getpaymentmethodbyid",t);a.data.status===!0?(j(a.data.data),h(a.data.data.enabled)):a.data.status}catch{}},v=async()=>{const t=require("form-data");let a=new t;a.append("data",`{
      "id":${c.location.state},
      "name":"${document.getElementById("PaymentName").value}",
      "enabled":${n}
    }`),a.append("logo",b);let S={method:"post",maxBodyLength:1/0,url:d.BASE_URL+"/updatepaymentmethod",headers:{"Content-Type":"multipart/form-data"},data:a};l.request(S).then(I=>{}).catch(I=>{})},C=t=>{y(t.target.files[0])},N=async t=>{try{const a=await l.get(d.BASE_URL+"/getallcountries");a.data.status===!0?x(a.data.data):a.data.status}catch{}},u=t=>{h(t.target.value==="enable")};return e.jsx(e.Fragment,{children:e.jsx("section",{onClick:()=>{document.body.classList.remove("offcanvas-active")},children:e.jsx(p,{children:e.jsx("div",{className:"mainBoxService mt-5",children:e.jsxs("div",{className:"serviceHeader purpleBackground text-white rounded-2",children:[e.jsx("h3",{className:"text-white ms-5 bolder pt-4 pb-3 pb-2 pe-4",children:"Payment Methods"}),e.jsx("div",{className:"mainBoxService-Body bg-white text-black pe-4 ps-4 py-4",children:e.jsxs(p,{className:"",children:[e.jsx(r,{className:"mb-4",children:e.jsxs(s.Group,{as:i,controlId:"formGridCity",children:[e.jsx(s.Label,{children:" Name"}),e.jsx(s.Control,{id:"PaymentName",defaultValue:f.name,disabled:!0})]})}),e.jsx(r,{className:"mb-4",children:e.jsxs(s.Group,{as:i,controlId:"formGridCity",className:"border-0",children:[e.jsx(s.Label,{children:"Logo"}),e.jsx(s.Control,{type:"file",id:"PaymentLogo",className:"rounded-0 border-0",onChange:C})]})}),e.jsx(r,{className:"mb-4",children:e.jsxs(s.Group,{as:i,controlId:"formGridState",children:[e.jsx(s.Label,{children:"Country"}),e.jsxs(s.Select,{defaultValue:"Choose...",children:[e.jsx("option",{children:"Select Country"}),m&&m.map((t,a)=>e.jsxs("option",{value:t.id,children:[t.emoji,"  ",t.name]}))]})]})}),e.jsxs(r,{className:"mb-4",children:[e.jsxs("div",{className:"d-flex ",children:[e.jsx("input",{type:"radio",id:"vehicle1",name:"vehicle5",value:"enable",className:"main-radio",checked:n,onChange:u}),e.jsx("label",{for:"vehicle5",className:"ms-2",children:"Enabled"})]}),e.jsxs("div",{className:"d-flex",children:[e.jsx("input",{type:"radio",id:"vehicle2",name:"vehicle5",value:"disable",className:"main-radio",checked:!n,onChange:u}),e.jsx("label",{for:"vehicle5",className:"ms-2",children:"Disabled"})]})]}),e.jsx("div",{className:"row d-flex m-auto mt-3",children:e.jsx("div",{className:"col-lg-2 pb-4 ps-0",children:e.jsx("a",{className:"purpleBackground btn btn-default text-white bolder d-block",onClick:v,children:" Update"})})})]})})]})})})})})}export{A as default};
