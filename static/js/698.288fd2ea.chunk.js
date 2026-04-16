"use strict";(globalThis.webpackChunkgigachat_frontend=globalThis.webpackChunkgigachat_frontend||[]).push([[698],{698(e,o,r){r.r(o),r.d(o,{default:()=>M});var t=r(43),i=r(403),n=r(579);const a=i.Ay.div`
  margin-bottom: 16px;
  width: 100%;
`,l=i.Ay.input`
  width: 100%;
  padding: 10px 12px;
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  color: var(--color-text-primary);
  font-size: 14px;
  box-sizing: border-box;
  
  &::placeholder {
    color: var(--color-text-secondary);
  }
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`,c=e=>{let{value:o,onChange:r}=e;return(0,n.jsx)(a,{children:(0,n.jsx)(l,{type:"text",placeholder:"\ud83d\udd0d \u041f\u043e\u0438\u0441\u043a \u043f\u043e \u0447\u0430\u0442\u0430\u043c...",value:o,onChange:e=>r(e.target.value)})})},d=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  margin: 4px 0;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${e=>e.$isActive?"var(--color-bg-secondary)":"transparent"};
  width: 100%;
  box-sizing: border-box;
  
  &:hover {
    background-color: var(--color-bg-secondary);
    
    .chat-actions {
      display: flex;
    }
  }
`,s=i.Ay.div`
  flex: 1;
  overflow: hidden;
  min-width: 0;
`,x=i.Ay.div`
  color: var(--color-text-primary);
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 4px;
`,p=i.Ay.div`
  color: var(--color-text-secondary);
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,g=i.Ay.div`
  color: var(--color-text-secondary);
  font-size: 11px;
  margin-top: 4px;
`,h=i.Ay.div`
  display: none;
  gap: 8px;
  flex-shrink: 0;
  margin-left: 8px;
`,u=i.Ay.button`
  background: none;
  border: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  padding: 4px;
  font-size: 14px;
  border-radius: 4px;
  
  &:hover {
    background-color: var(--color-border);
    color: var(--color-text-primary);
  }
`,b=i.Ay.input`
  width: 100%;
  padding: 4px 8px;
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  color: var(--color-text-primary);
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`,v=e=>{let{id:o,title:r,lastMessage:i,lastMessageDate:a,isActive:l,onSelect:c,onEdit:v,onDelete:y}=e;const[m,f]=(0,t.useState)(!1),[w,k]=(0,t.useState)(r),C=()=>{w.trim()&&v&&v(o,w.trim()),f(!1)};return(0,n.jsxs)(d,{$isActive:l,onClick:()=>{console.log("ChatItem clicked, id:",o,"isEditing:",m),c&&!m&&(console.log("Calling onSelect with id:",o),c(o))},children:[(0,n.jsx)(s,{children:m?(0,n.jsx)(b,{value:w,onChange:e=>k(e.target.value),onBlur:C,onKeyDown:e=>{"Enter"===e.key?C():"Escape"===e.key&&(f(!1),k(r))},autoFocus:!0}):(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(x,{children:r}),(0,n.jsx)(p,{children:i||"\u041d\u043e\u0432\u044b\u0439 \u0447\u0430\u0442"}),(0,n.jsx)(g,{children:(e=>{const o=new Date(e),r=new Date,t=Math.floor((r.getTime()-o.getTime())/864e5);return 0===t?o.toLocaleTimeString("ru-RU",{hour:"2-digit",minute:"2-digit"}):1===t?"\u0412\u0447\u0435\u0440\u0430":t<7?`${t} \u0434\u043d\u044f \u043d\u0430\u0437\u0430\u0434`:o.toLocaleDateString("ru-RU",{day:"numeric",month:"short"})})(a)})]})}),!m&&(0,n.jsxs)(h,{className:"chat-actions",children:[(0,n.jsx)(u,{onClick:e=>{e.stopPropagation(),f(!0),k(r)},title:"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c",children:"\u270e"}),(0,n.jsx)(u,{onClick:e=>{e.stopPropagation(),y&&y(o)},title:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c",children:"\ud83d\uddd1"})]})]})},y=t.memo(v),m=i.Ay.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 0 -16px;
  padding: 0 16px;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: var(--color-bg-sidebar);
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--color-border);
    border-radius: 3px;
  }
`,f=i.Ay.div`
  text-align: center;
  padding: 40px 20px;
  color: var(--color-text-secondary);
  font-size: 14px;
`,w=e=>{let{chats:o,activeChatId:r,onSelectChat:t,onEditChat:i,onDeleteChat:a}=e;return 0===o.length?(0,n.jsx)(m,{children:(0,n.jsxs)(f,{children:["\ud83e\udd14 \u041d\u0435\u0442 \u0447\u0430\u0442\u043e\u0432",(0,n.jsx)("br",{}),'\u041d\u0430\u0436\u043c\u0438\u0442\u0435 "\u041d\u043e\u0432\u044b\u0439 \u0447\u0430\u0442" \u0447\u0442\u043e\u0431\u044b \u043d\u0430\u0447\u0430\u0442\u044c']})}):(0,n.jsx)(m,{children:o.map(e=>{const o=e.messages.length>0?e.messages[e.messages.length-1].content:"",l=o.slice(0,50)+(o.length>50?"...":"");return(0,n.jsx)(y,{id:e.id,title:e.title,lastMessage:l,lastMessageDate:e.updatedAt,isActive:e.id===r,onSelect:t,onEdit:i,onDelete:a},e.id)})})};var k=r(722);const C=i.Ay.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px;
  overflow-x: hidden;
  width: 100%;
  box-sizing: border-box;
`,j=i.Ay.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  margin-bottom: 16px;
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  color: var(--color-text-primary);
  cursor: pointer;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
  
  &:hover {
    background-color: var(--color-bg-secondary);
  }
`,A=i.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`,z=i.Ay.div`
  background-color: var(--color-bg-primary);
  border-radius: 12px;
  padding: 24px;
  width: 320px;
  max-width: 90%;
  border: 1px solid var(--color-border);
`,S=i.Ay.h3`
  color: var(--color-text-primary);
  margin: 0 0 16px 0;
  font-size: 18px;
`,D=i.Ay.p`
  color: var(--color-text-secondary);
  margin: 0 0 24px 0;
  font-size: 14px;
`,E=i.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`,L=i.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  background-color: ${e=>"danger"===e.variant?"#dc3545":"var(--color-border)"};
  color: ${e=>"danger"===e.variant?"white":"var(--color-text-primary)"};
  
  &:hover {
    opacity: 0.9;
  }
`,M=e=>{let{activeChatId:o}=e;const{chats:r,createNewChat:i,setActiveChat:a,updateChatTitle:l,deleteChat:d}=(0,k.L)(),[s,x]=(0,t.useState)(""),[p,g]=(0,t.useState)(null),h=(0,t.useMemo)(()=>{if(!s.trim())return r;const e=s.toLowerCase().trim();return r.filter(o=>{if(o.title.toLowerCase().includes(e))return!0;const r=o.messages[o.messages.length-1];return!(!r||!r.content.toLowerCase().includes(e))})},[r,s]),u=(0,t.useCallback)(()=>{const e=i();console.log("New chat created:",e)},[i]),b=(0,t.useCallback)(e=>{console.log("Sidebar handleSelectChat called with:",e),a(e)},[a]),v=(0,t.useCallback)((e,o)=>{l(e,o)},[l]),y=(0,t.useCallback)(e=>{g(e)},[]),m=()=>{g(null)};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(C,{children:[(0,n.jsxs)(j,{onClick:u,children:[(0,n.jsx)("span",{children:"+"}),"\u041d\u043e\u0432\u044b\u0439 \u0447\u0430\u0442"]}),(0,n.jsx)(c,{value:s,onChange:x}),(0,n.jsx)(w,{chats:h,activeChatId:o||null,onSelectChat:b,onEditChat:v,onDeleteChat:y})]}),p&&(0,n.jsx)(A,{onClick:m,children:(0,n.jsxs)(z,{onClick:e=>e.stopPropagation(),children:[(0,n.jsx)(S,{children:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0447\u0430\u0442?"}),(0,n.jsx)(D,{children:"\u0412\u044b \u0443\u0432\u0435\u0440\u0435\u043d\u044b, \u0447\u0442\u043e \u0445\u043e\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043b\u0438\u0442\u044c \u044d\u0442\u043e\u0442 \u0447\u0430\u0442? \u042d\u0442\u043e \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u043d\u0435\u043b\u044c\u0437\u044f \u043e\u0442\u043c\u0435\u043d\u0438\u0442\u044c."}),(0,n.jsxs)(E,{children:[(0,n.jsx)(L,{onClick:m,children:"\u041e\u0442\u043c\u0435\u043d\u0430"}),(0,n.jsx)(L,{variant:"danger",onClick:()=>{p&&(d(p),g(null))},children:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c"})]})]})})]})}}}]);
//# sourceMappingURL=698.288fd2ea.chunk.js.map