import{_ as e,r as p,u as f,n as w,j as x,p as F}from"./index-CZLZpOaH.js";import{g as d,a as C,s as G,c as y}from"./createSvgIcon-CvFBLNCx.js";import{u as R,f as g}from"./useFormControl-CzMDRFSC.js";function j(o){return d("MuiFormGroup",o)}C("MuiFormGroup",["root","row","error"]);const M=["className","row"],U=o=>{const{classes:r,row:t,error:s}=o;return y({root:["root",t&&"row",s&&"error"]},j,r)},_=G("div",{name:"MuiFormGroup",slot:"Root",overridesResolver:(o,r)=>{const{ownerState:t}=o;return[r.root,t.row&&r.row]}})(({ownerState:o})=>e({display:"flex",flexDirection:"column",flexWrap:"wrap"},o.row&&{flexDirection:"row"})),S=p.forwardRef(function(r,t){const s=f({props:r,name:"MuiFormGroup"}),{className:a,row:c=!1}=s,l=w(s,M),i=R(),u=g({props:s,muiFormControl:i,states:["error"]}),n=e({},s,{row:c,error:u.error}),m=U(n);return x.jsx(_,e({className:F(m.root,a),ownerState:n,ref:t},l))});export{S as F};
