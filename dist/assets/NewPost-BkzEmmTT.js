import{R as o,j as e,c as s}from"./index-CZLZpOaH.js";import{P as n}from"./PageHeader-6CScOhCz.js";import{J as a}from"./jodit-react-DkS4Tuh2.js";import"./DashbordData-n50t2wKP.js";class r extends o.Component{render(){return e.jsx("div",{className:"card",children:e.jsxs("div",{className:"body",children:[e.jsx("div",{className:"form-group",children:e.jsx("input",{type:"text",className:"form-control",placeholder:"Enter Blog title"})}),e.jsxs("select",{className:"form-control show-tick",children:[e.jsx("option",{children:"Select Category"}),e.jsx("option",{children:"Web Design"}),e.jsx("option",{children:"Photography"}),e.jsx("option",{children:"Technology"}),e.jsx("option",{children:"Lifestyle"}),e.jsx("option",{children:"Sports"})]}),e.jsxs("div",{className:"form-group m-t-20 m-b-20",children:[e.jsx("input",{type:"file",className:"form-control-file",id:"exampleInputFile","aria-describedby":"fileHelp"}),e.jsx("small",{id:"fileHelp",className:"form-text text-muted",children:"This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps to a new line."})]}),e.jsx(a,{value:"Hi,<br /><p>we are Wrraptheme. </p>",config:{readonly:!1},tabIndex:1,onBlur:l=>{},onChange:l=>{}}),e.jsx("button",{type:"button",className:"btn btn-block btn-primary   m-t-20",children:"Post"})]})})}}const i=({mailInboxReducer:t})=>({isEventModal:t.isEventModal}),c=s(i,{})(r);class d extends o.Component{componentDidMount(){window.scrollTo(0,0)}render(){return e.jsx("div",{style:{flex:1},onClick:()=>{document.body.classList.remove("offcanvas-active")},children:e.jsx("div",{children:e.jsxs("div",{className:"container-fluid",children:[e.jsx(n,{HeaderText:"Blog Post",Breadcrumb:[{name:"Blog",navigate:""},{name:"Blog Post",navigate:""}]}),e.jsx("div",{className:"row clearfix",children:e.jsx("div",{className:"col-lg-12",children:e.jsx(c,{})})})]})})})}}const m=({ioTReducer:t})=>({isSecuritySystem:t.isSecuritySystem}),f=s(m,{})(d);export{f as default};
