"use strict";(globalThis.webpackChunkgigachat_frontend=globalThis.webpackChunkgigachat_frontend||[]).push([[939],{939(e,o,r){r.r(o),r.d(o,{default:()=>G});var t=r(43),a=r(403),n=r(579);const i=a.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`,l=a.Ay.div`
  display: flex;
  justify-content: space-between;
  color: var(--color-text-primary);
  font-size: 14px;
`,s=a.Ay.span``,c=a.Ay.span`
  color: var(--color-text-secondary);
`,d=a.Ay.input`
  width: 100%;
  height: 4px;
  background: var(--color-border);
  border-radius: 2px;
  appearance: none;
  
  &::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    background: #007bff;
    border-radius: 50%;
    cursor: pointer;
    
    &:hover {
      transform: scale(1.1);
    }
  }
`,p=e=>{let{min:o,max:r,step:t=.1,value:a,onChange:p,label:x}=e;return(0,n.jsxs)(i,{children:[x&&(0,n.jsxs)(l,{children:[(0,n.jsx)(s,{children:x}),(0,n.jsx)(c,{children:a.toFixed(1)})]}),(0,n.jsx)(d,{type:"range",min:o,max:r,step:t,value:a,onChange:e=>p(parseFloat(e.target.value))})]})},x=a.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,h=a.Ay.span`
  color: var(--color-text-primary);
  font-size: 14px;
`,g=a.Ay.button`
  width: 48px;
  height: 24px;
  background-color: ${e=>e.isOn?"#007bff":"var(--color-border)"};
  border: none;
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${e=>e.isOn?"26px":"2px"};
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    transition: left 0.3s;
  }
  
  &:hover {
    opacity: 0.9;
  }
`,u=e=>{let{isOn:o,onToggle:r,label:t}=e;return console.log("Toggle rendered:",{isOn:o,label:t}),(0,n.jsxs)(x,{children:[t&&(0,n.jsx)(h,{children:t}),(0,n.jsx)(g,{isOn:o,onClick:r})]})};var m=r(388);const b=a.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${e=>e.isOpen?"flex":"none"};
  justify-content: flex-end;
  z-index: 2000;
`,v=a.Ay.div`
  width: 400px;
  max-width: 100%;
  height: 100%;
  background-color: var(--color-bg-primary);
  border-left: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
`,y=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid var(--color-border);
`,f=a.Ay.h2`
  font-size: 18px;
  font-weight: 500;
  color: var(--color-text-primary);
  margin: 0;
`,j=a.Ay.button`
  background: none;
  border: none;
  color: var(--color-text-secondary);
  font-size: 24px;
  cursor: pointer;
  
  &:hover {
    color: var(--color-text-primary);
  }
`,k=a.Ay.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`,A=a.Ay.div`
  margin-bottom: 24px;
`,C=a.Ay.h3`
  font-size: 16px;
  font-weight: 500;
  color: var(--color-text-primary);
  margin-bottom: 16px;
`,w=a.Ay.select`
  width: 100%;
  padding: 10px;
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  color: var(--color-text-primary);
  font-size: 14px;
  margin-bottom: 16px;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`,S=a.Ay.textarea`
  width: 100%;
  padding: 10px;
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  color: var(--color-text-primary);
  font-size: 14px;
  min-height: 100px;
  resize: vertical;
  margin-bottom: 16px;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`,T=a.Ay.input`
  width: 100%;
  padding: 10px;
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  color: var(--color-text-primary);
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`,z=a.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`,G=e=>{let{isOpen:o,onClose:r}=e;const[a,i]=(0,t.useState)("GigaChat"),[l,s]=(0,t.useState)(.7),[c,d]=(0,t.useState)(.9),[x,h]=(0,t.useState)(2048),[g,G]=(0,t.useState)("\u0422\u044b \u043f\u043e\u043b\u0435\u0437\u043d\u044b\u0439 \u0430\u0441\u0441\u0438\u0441\u0442\u0435\u043d\u0442"),[O,P]=(0,t.useState)(!1);(0,t.useEffect)(()=>{const e=localStorage.getItem("theme");console.log("Saved theme:",e),"light"===e?(P(!1),document.documentElement.setAttribute("data-theme","light")):(P(!0),document.documentElement.setAttribute("data-theme","dark"))},[]);return(0,n.jsx)(b,{isOpen:o,onClick:r,children:(0,n.jsxs)(v,{onClick:e=>e.stopPropagation(),children:[(0,n.jsxs)(y,{children:[(0,n.jsx)(f,{children:"\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438"}),(0,n.jsx)(j,{onClick:r,children:"\xd7"})]}),(0,n.jsxs)(k,{children:[(0,n.jsxs)(A,{children:[(0,n.jsx)(C,{children:"\u041c\u043e\u0434\u0435\u043b\u044c"}),(0,n.jsxs)(w,{value:a,onChange:e=>i(e.target.value),children:[(0,n.jsx)("option",{value:"GigaChat",children:"GigaChat"}),(0,n.jsx)("option",{value:"GigaChat-Plus",children:"GigaChat-Plus"}),(0,n.jsx)("option",{value:"GigaChat-Pro",children:"GigaChat-Pro"}),(0,n.jsx)("option",{value:"GigaChat-Max",children:"GigaChat-Max"})]})]}),(0,n.jsxs)(A,{children:[(0,n.jsx)(C,{children:"\u041f\u0430\u0440\u0430\u043c\u0435\u0442\u0440\u044b \u0433\u0435\u043d\u0435\u0440\u0430\u0446\u0438\u0438"}),(0,n.jsx)(p,{min:0,max:2,step:.1,value:l,onChange:s,label:"Temperature"}),(0,n.jsx)(p,{min:0,max:1,step:.1,value:c,onChange:d,label:"Top P"})]}),(0,n.jsxs)(A,{children:[(0,n.jsx)(C,{children:"Max Tokens"}),(0,n.jsx)(T,{type:"number",value:x,onChange:e=>h(parseInt(e.target.value)),min:1,max:4096})]}),(0,n.jsxs)(A,{children:[(0,n.jsx)(C,{children:"System Prompt"}),(0,n.jsx)(S,{value:g,onChange:e=>G(e.target.value),placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u0438\u0441\u0442\u0435\u043c\u043d\u044b\u0439 \u043f\u0440\u043e\u043c\u043f\u0442..."})]}),(0,n.jsxs)(A,{children:[(0,n.jsx)(C,{children:"\u0422\u0435\u043c\u0430"}),(0,n.jsx)(u,{isOn:O,onToggle:()=>{console.log("Toggle clicked, current:",O);const e=!O;P(e),e?(console.log("Switching to dark theme"),document.documentElement.setAttribute("data-theme","dark"),localStorage.setItem("theme","dark")):(console.log("Switching to light theme"),document.documentElement.setAttribute("data-theme","light"),localStorage.setItem("theme","light"))},label:"\u0422\u0435\u043c\u043d\u0430\u044f \u0442\u0435\u043c\u0430"})]}),(0,n.jsxs)(z,{children:[(0,n.jsx)(m.A,{variant:"primary",onClick:()=>{console.log("Save settings:",{model:a,temperature:l,topP:c,maxTokens:x,systemPrompt:g,isDarkTheme:O}),r()},children:"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c"}),(0,n.jsx)(m.A,{variant:"secondary",onClick:()=>{i("GigaChat"),s(.7),d(.9),h(2048),G("\u0422\u044b \u043f\u043e\u043b\u0435\u0437\u043d\u044b\u0439 \u0430\u0441\u0441\u0438\u0441\u0442\u0435\u043d\u0442"),P(!1),document.documentElement.setAttribute("data-theme","light"),localStorage.setItem("theme","light")},children:"\u0421\u0431\u0440\u043e\u0441\u0438\u0442\u044c"})]})]})]})})}}}]);
//# sourceMappingURL=939.e73350cd.chunk.js.map