import{r as o,R as u}from"./index-CZLZpOaH.js";function k(t,e,n){const r=o.useRef(t!==void 0),[s,a]=o.useState(e),c=t!==void 0,l=r.current;return r.current=c,!c&&l&&s!==e&&a(e),[c?t:s,o.useCallback((...v)=>{const[$,...p]=v;let x=n==null?void 0:n($,...p);return a($),x},[n])]}const i={prefix:String(Math.round(Math.random()*1e10)),current:0},f=u.createContext(i),b=u.createContext(!1);let S=!!(typeof window<"u"&&window.document&&window.document.createElement),d=new WeakMap;function m(t=!1){let e=o.useContext(f),n=o.useRef(null);if(n.current===null&&!t){var r,s;let a=(s=u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)===null||s===void 0||(r=s.ReactCurrentOwner)===null||r===void 0?void 0:r.current;if(a){let c=d.get(a);c==null?d.set(a,{id:e.current,state:a.memoizedState}):a.memoizedState!==c.state&&(e.current=c.id,d.delete(a))}n.current=++e.current}return n.current}function w(t){let e=o.useContext(f);e===i&&!S&&console.warn("When server rendering, you must wrap your application in an <SSRProvider> to ensure consistent ids are generated between the client and server.");let n=m(!!t),r=`react-aria${e.prefix}`;return t||`${r}-${n}`}function g(t){let e=u.useId(),[n]=o.useState(M()),r=n?"react-aria":`react-aria${i.prefix}`;return t||`${r}-${e}`}const z=typeof u.useId=="function"?g:w;function y(){return!1}function C(){return!0}function h(t){return()=>{}}function M(){return typeof u.useSyncExternalStore=="function"?u.useSyncExternalStore(h,y,C):o.useContext(b)}export{z as $,k as u};
