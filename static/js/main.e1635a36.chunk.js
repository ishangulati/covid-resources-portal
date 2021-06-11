(this["webpackJsonpcovid-resources-portal"]=this["webpackJsonpcovid-resources-portal"]||[]).push([[0],{115:function(e,t,o){},121:function(e,t,o){"use strict";o.r(t);var n=o(0),c=o.n(n),i=o(45),a=o.n(i),r=(o(115),o(75)),l=o(26),s=o(178),u=o(183),d=o(56),h=o(192),b=o(182),p=o(16),y=o(198),j=o(23),g=o(187),x=o(66),f=o(12),m=o(91),O=o(186),v=o(55),C=o(188),S=o(189),k=o(194),A=o(190),w=o(195);function I(e,t){var o=6e4,n=36e5,c=864e5,i=2592e6,a=31536e6,r=e-t;return r<o?Math.round(r/1e3)+" seconds ago":r<n?Math.round(r/o)+" minutes ago":r<c?Math.round(r/n)+" hours ago":r<i?Math.round(r/c)+" days ago":r<a?Math.round(r/i)+" months ago":Math.round(r/a)+" years ago"}function P(e){return e.replace(/\w\S*/g,(function(e){return e.charAt(0).toUpperCase()+e.substr(1).toLowerCase()}))}var B={medicine:{text:"Medicine",color:"black",logoIcon:"Hospital"},bloodgroup:{text:"Blood Group",color:"red",logoIcon:"Drop"},therapy:{text:"Therapy",color:"orange",logoIcon:"Health"},vaccine:{text:"Vaccine",color:"green",logoIcon:"ShieldSolid"},oxygen:{text:"Oxygen Supplies",color:"blue",logoIcon:"SpeedHigh"},bed:{text:"Beds",color:"black",logoIcon:"Hotel"},ambulance:{text:"Ambulance",color:"black",logoIcon:"ParkingLocationMirrored"},food:{text:"Food",color:"green",logoIcon:"Breakfast"}};function z(e){return Object.values(e).map((function(e){return{key:e,text:e}}))}var M,T,N,F,D,R,L,E,U,G,J=["medicine","bloodgroup","vaccine","therapy","oxygen","bed","ambulance","food"],q=o(5),H=function(e){var t,o,n,c=e.resource,i=(null===(t=c.leads)||void 0===t?void 0:t.map((function(e){return{name:e.sender,profileImageSrc:""}})))||[],a=function(e){var t=[],o=[];return e.medicine&&e.medicine.length&&(t.push(e.medicine.join(";")),o.push(B.medicine)),e.bloodgroup&&e.bloodgroup.length&&(t.push(e.bloodgroup.join(";")),o.push(B.bloodgroup)),e.therapy&&e.therapy.length&&(t.push(e.therapy.join(";")),o.push(B.therapy)),e.oxygen&&e.oxygen.length&&(t.push(e.oxygen.join(";")),o.push(B.oxygen)),e.bed&&e.bed.length&&(t.push(e.bed.join(";")),o.push(B.bed)),e.ambulance&&e.ambulance.length&&(t.push(e.ambulance.join(";")),o.push(B.ambulance)),e.food&&e.food.length&&(t.push(e.food.join(";")),o.push()),{text:t,icons:o}}(c);return Object(q.jsxs)(O.a,{onClick:function(e){Object(d.b)(!0)},type:v.a.compact,style:{height:160},children:[Object(q.jsxs)("div",{style:{position:"relative"},children:[Object(q.jsx)("a",{"data-is-focusable":!1,style:{fontSize:15,fontWeight:600,color:"rgb(0, 120, 212)",display:"inline-block",padding:"8px 16px",textDecoration:"none"},href:"tel://".concat(c.contactuid),children:c.contactuid}),Object(q.jsxs)("div",{style:{position:"absolute",margin:"0 20px"},children:[a.icons.map((function(e){return Object(q.jsx)(C.a,Object(m.a)({},{styles:{root:{fontSize:20,padding:5,display:"inline-block",color:(t=e).color}},logoIcon:t.logoIcon}));var t})),null===(o=c.location)||void 0===o?void 0:o.map((function(e){return Object(q.jsx)("div",{style:{fontSize:15},children:P(e)})}))]})]}),Object(q.jsxs)(S.a,{children:[Object(q.jsx)(k.a,{title:"".concat(c.type.toUpperCase(),": ").concat(a.text.map(P).join(", ")),shouldTruncate:!0,showAsSecondaryTitle:!0,styles:{root:{textTransform:"Capitalize",fontWeight:"bold"}}}),Object(q.jsx)(A.a,{statusIcon:"attach",status:"This contact was shared ".concat(null===(n=c.leads)||void 0===n?void 0:n.length," time(s)!")}),Object(q.jsx)(w.a,{activity:"Last shared: ".concat(I((new Date).getTime(),new Date(c.lastShared).getTime())),people:i})]})]})},W=o(177),K=o(89),V=o(179),X=o(184);!function(e){e.Availability="availability",e.Requirement="requirement"}(M||(M={})),function(e){e.WhatsApp="whatsapp",e.Twitter="twitter"}(T||(T={})),function(e){e.CovidMedicines="Covid Medicines",e.LiposomalAmphotericinB="Liposomal Amphotericin B",e.Tocilizumab="Tocilizumab",e.BaricitinibOlumiant="Baricitinib Olumiant",e.Fabiflu="Fabiflu",e.Favipivavir="Favipivavir",e.Xarelto="Xarelto",e.SodiumLactate="Sodium Lactate",e.SodiumChloride="Sodium Chloride",e.Doxycycline="Doxycycline",e.Pantoprazole="Pantoprazole",e.Anidulafungin="Anidulafungin",e.Meropenem="Meropenem",e.Deflazacort="Deflazacort",e.Zinc="Zinc",e.Azithromycin="Azithromycin",e.Bevacuzimab="Bevacuzimab",e.Enoxaparin="Enoxaparin",e.Posatral="Posatral",e.Medrol="Medrol",e.Remdesivir="Remdesivir",e.Cresemba="Cresemba",e.Alprazolam="Alprazolam"}(N||(N={})),function(e){e.Ambulance="Ambulance"}(F||(F={})),function(e){e.Food="Food",e.DryRation="Dry Ration"}(D||(D={})),function(e){e.OxygenCans="Oxygen Cans",e.OxygenCylinders="Oxygen Cylinders",e.OxygenConcentrators="Oxygen Concentrators",e.OxygenRefill="Oxygen Refill",e.OxygenRegulator="Oxygen Regulator",e.Oximeter="Oximeter",e.Respirometer="Respirometer"}(R||(R={})),function(e){e.HomeICU="Home ICU",e.OxygenBeds="Oxygen Beds",e.ICUBeds="ICU Beds",e.Ventilators="Ventilators"}(L||(L={})),function(e){e.ECMO="ECMO",e.Plasma="Plasma"}(E||(E={})),function(e){e.AnyGroup="Any Group",e.APOS="A+",e.ANEG="A-",e.BPOS="B+",e.BNEG="B-",e.ABPOS="AB+",e.ABNEG="AB-",e.OPOS="O+",e.ONEG="O-"}(U||(U={})),function(e){e.Covishield="Covishield",e.Covaxin="Covaxin",e.Moderna="Moderna",e.Pfizer="Pfizer",e.Sputnik="Sputnik",e.Johnson="Johnson & Johnson"}(G||(G={}));var Z=function(e){var t=e.type,o=e.category,c=e.subCategory,i=e.setCategory,a=e.setSubCategory,r=e.setType,s=n.createRef(),d=n.useState(_(o)),h=Object(l.a)(d,2),b=h[0],p=h[1];return Object(q.jsxs)(u.a,{tokens:{childrenGap:5},children:[Object(q.jsx)(X.a,{selectedKey:t,options:$,onChange:function(e,t){var o=(null===t||void 0===t?void 0:t.key)||"both";r(o)},label:"Show me"}),Object(q.jsx)(X.a,{label:"Pick one category",defaultSelectedKey:o,options:Y,onChange:function(e,t){var o=(null===t||void 0===t?void 0:t.key)||"all";p(_(o)),a([]),i(o),"all"!==o&&s.current.focus(!0)}}),Object(q.jsx)(V.a,{placeholder:"Select options",label:"Select subCategory you are looking for",selectedKeys:c,componentRef:s,onChange:function(e,t,o){t&&a(t.selected?[].concat(Object(K.a)(c),[t.key]):c.filter((function(e){return e!==t.key})))},multiSelect:!0,required:"all"!==o,disabled:"all"===o,options:b,styles:Q,onDismiss:function(){0===c.length&&"all"!==o&&a(b.map((function(e){return e.key})))}})]})},Q={dropdown:{width:300}},Y=[{key:"all",text:"All",iconProps:{iconName:"CheckList",style:{color:"gray"}}},{key:"medicine",text:B.medicine.text,iconProps:{iconName:B.medicine.logoIcon,style:{color:B.medicine.color}}},{key:"bloodgroup",text:B.bloodgroup.text,iconProps:{iconName:B.bloodgroup.logoIcon,style:{color:B.bloodgroup.color}}},{key:"therapy",text:B.therapy.text,iconProps:{iconName:B.therapy.logoIcon,style:{color:B.therapy.color}}},{key:"vaccine",text:B.vaccine.text,iconProps:{iconName:B.vaccine.logoIcon,style:{color:B.vaccine.color}}},{key:"oxygen",text:B.oxygen.text,iconProps:{iconName:B.oxygen.logoIcon,style:{color:B.oxygen.color}}},{key:"bed",text:B.bed.text,iconProps:{iconName:B.bed.logoIcon,style:{color:B.bed.color}}},{key:"ambulance",text:B.ambulance.text,iconProps:{iconName:B.ambulance.logoIcon,style:{color:B.ambulance.color}}},{key:"food",text:B.food.text,iconProps:{iconName:B.food.logoIcon,style:{color:B.food.color}}}],$=[{key:"both",text:"Both"},{key:"availability",text:"Availability"},{key:"requirement",text:"Requirement"}];function _(e){return"medicine"===e?z(N):"therapy"===e?z(E):"oxygen"===e?z(R):"bed"===e?z(L):"bloodgroup"===e?z(U):"ambulance"===e?z(F):"food"===e?z(D):"vaccine"===e?z(G):[]}var ee=o(180),te=o(2),oe=o(191),ne=o(90),ce=o(51);function ie(e){var t;return Object(q.jsxs)("div",{style:{width:"auto",position:"fixed",left:520},children:[Object(q.jsx)(ee.a,{showUnknownPersonaCoin:!0,text:e.contact.contactuid,secondaryText:e.contact.type.toUpperCase(),tertiaryText:"Unverified contact",size:te.c.size72}),Object(q.jsx)("hr",{}),Object(q.jsx)("div",{style:{display:"flex"},children:J.map((function(t){return Object(q.jsx)(ae,{category:t,contact:e.contact})}))}),Object(q.jsx)("hr",{}),Object(q.jsx)(oe.a,{title:"Resources:"}),null===(t=e.contact.leads)||void 0===t?void 0:t.map((function(e){return Object(q.jsx)(re,{lead:e})}))]})}function ae(e){var t,o=e.category,n=e.contact;return n[o].length>0?Object(q.jsxs)("div",{style:{width:200,padding:10},children:[Object(q.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[Object(q.jsx)(ne.a,{iconName:B[o].logoIcon,style:{fontSize:25,color:B[o].color}}),Object(q.jsx)("h3",{style:{display:"inline-block",margin:"0 5px"},children:B[o].text})]}),Object(q.jsx)("ul",{style:{paddingLeft:25},children:null===n||void 0===n||null===(t=n[o])||void 0===t?void 0:t.map((function(e){return Object(q.jsx)("li",{children:e})}))})]}):null}function re(e){return Object(q.jsxs)(q.Fragment,{children:[Object(q.jsx)(oe.a,{title:"Shared by: ".concat(e.lead.sender)}),Object(q.jsx)("pre",{style:{margin:10},children:JSON.stringify(e.lead,null,4)}),e.lead.link&&"whatsapp"===e.lead.source?Object(q.jsx)(ce.a,{src:"".concat(e.lead.link)}):JSON.parse(e.lead.rawdata||"{}").message]})}var le={childrenGap:10};function se(){return Object(q.jsx)(x.a,{children:Object(q.jsx)("div",{children:Object(q.jsxs)(f.c,{children:[Object(q.jsx)(f.a,{exact:!0,path:"/",children:Object(q.jsx)(ue,{})}),Object(q.jsx)(f.a,{path:"/search",component:de}),Object(q.jsx)(f.a,{path:"/details",children:Object(q.jsx)(he,{})})]})})})}function ue(){return Object(q.jsx)(u.a,{verticalAlign:"center",verticalFill:!0,styles:{root:{margin:"0 20px"}},tokens:le,children:Object(q.jsxs)("p",{children:["More options coming soon, reach out to +91-8882017983. Till then you can"," ",Object(q.jsx)(x.b,{to:"/search",children:"Search for Covid Resources"})]})})}Object(s.a)();var de=Object(f.f)((function(e){var t=c.a.useState(e.location.search),o=Object(l.a)(t,2),i=o[0],a=o[1],s=new URLSearchParams(i),x=function(e){var t,o=Object(r.a)(J);try{for(o.s();!(t=o.n()).done;){var n=t.value,c=e.getAll(n)||[];if(c.length>0)return{category:n,options:c}}}catch(i){o.e(i)}finally{o.f()}return{category:"all",options:[]}}(s),f=c.a.useState(x.category),m=Object(l.a)(f,2),O=m[0],v=m[1],C=c.a.useState(function(e){var t=e.getAll("type");return t&&0!==t.length&&2!==t.length?t[0]:"both"}(s)),S=Object(l.a)(C,2),k=S[0],A=S[1],w=c.a.useState(x.options),I=Object(l.a)(w,2),P=I[0],B=I[1],z=Object(n.useState)([]),M=Object(l.a)(z,2),T=M[0],N=M[1],F=Object(n.useState)(!0),D=Object(l.a)(F,2),R=D[0],L=D[1],E=function(e){a(e.search)};Object(n.useEffect)((function(){var t=e.history.listen(E),o=function(e){return"https://covidresourcesapi.azurewebsites.net/contacts?".concat(e.toString())}(new URLSearchParams(i));return fetch(o,{method:"GET"}).then((function(e){return e.json()})).then((function(e){N(e.rows),L(!1)})).catch((function(e){return console.log(e)})),function(){t()}}),[i,e.history]);var U=Object(W.a)(!1),G=Object(l.a)(U,2),K=G[0],V=G[1],X=V.setTrue,Q=V.setFalse,Y=function(t){e.history.push("/search?".concat(t)),a(t)};Object(d.b)(!0);var $=Object(n.useState)(0),_=Object(l.a)($,2),ee=_[0],te=_[1];return Object(q.jsxs)(u.a,{verticalAlign:"center",verticalFill:!0,styles:{root:{margin:"0 20px"}},tokens:le,children:[Object(q.jsx)("h2",{children:"Search"}),Object(q.jsx)(h.a,{text:"Open filters",onClick:X,style:{marginBottom:10,maxWidth:482}}),Object(q.jsx)("div",{children:Object(q.jsx)(b.a,{headerText:"Filters",isOpen:K,onDismiss:Q,isLightDismiss:!0,type:p.a.medium,closeButtonAriaLabel:"Close",children:Object(q.jsx)(Z,{category:O,subCategory:P,type:k,setCategory:function(e){e!==O&&("all"===e&&(J.forEach((function(e){s.delete(e)})),Y(s.toString())),v(e))},setSubCategory:function(e){s.delete(O),e.forEach((function(e){return s.append(O,e)})),Y(s.toString()),B(e)},setType:function(e){k!==e&&(s.delete("type"),"availability"!==e&&"requirement"!==e||s.append("type",e),Y(s.toString()),A(e))}})})}),R?Object(q.jsx)(q.Fragment,{}):Object(q.jsxs)(y.a,{direction:j.a.vertical,isCircularNavigation:!0,role:"grid",defaultTabbableElement:"div.ms-DocumentCard:first-child",shouldFocusOnMount:!0,style:{display:"flex",flexDirection:"row"},onFocus:function(e){if(T&&T.length>0){var t,o=e.target.closest(".ms-DocumentCard"),n=Array.prototype.slice.call(null===o||void 0===o||null===(t=o.parentNode)||void 0===t?void 0:t.childNodes);te(n.indexOf(o))}},children:[Object(q.jsx)(u.a,{tokens:le,wrap:!0,styles:{inner:{width:500}},children:T&&T.length?T.map((function(e){return Object(q.jsx)(H,{resource:e},e.contactuid)})):Object(q.jsxs)("p",{children:["No results to show yet, ",Object(q.jsx)(g.a,{onClick:X,children:"try using different filters."}),Object(q.jsx)("br",{}),"Meanwhile, we will work on getting more leads!",'"']})}),T&&T.length>0&&Object(q.jsx)(ie,{contact:T[ee]})]})]})}));function he(){return Object(q.jsx)("div",{children:Object(q.jsx)("h2",{children:"Details"})})}var be=function(e){e&&e instanceof Function&&o.e(3).then(o.bind(null,199)).then((function(t){var o=t.getCLS,n=t.getFID,c=t.getFCP,i=t.getLCP,a=t.getTTFB;o(e),n(e),c(e),i(e),a(e)}))};a.a.render(Object(q.jsx)(c.a.StrictMode,{children:Object(q.jsx)(se,{})}),document.getElementById("root")),be()}},[[121,1,2]]]);
//# sourceMappingURL=main.e1635a36.chunk.js.map