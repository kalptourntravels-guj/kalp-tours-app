const KEY="kalp_packages_v2";
const defaults=[
 {id:1,name:"દિલ્હી શૈક્ષણિક પ્રવાસ",days:"3 દિવસ / 2 રાત્રિ",price:"5999",places:"લાલ કિલ્લો • સંસદ ભવન • રાષ્ટ્રપતિ ભવન • અક્ષરધામ • કુતુબમિનાર • લોટસ ટેમ્પલ",details:"પ્રાથમિક શાળાના બાળકો માટે શૈક્ષણિક પ્રવાસ."},
 {id:2,name:"નેપાળ પ્રવાસ",days:"5 દિવસ / 4 રાત્રિ",price:"7999",places:"કાઠમંડુ • પોખરા • લુંબીની • પશુપતિનાથ • સોનૌલી",details:"દેશ બહારનો યાદગાર શૈક્ષણિક પ્રવાસ."},
 {id:3,name:"ગોવા પ્રવાસ",days:"3 દિવસ / 2 રાત્રિ",price:"6999",places:"નોર્થ ગોવા • સાઉથ ગોવા • બીચ • લોકલ સાઇટસીઇંગ",details:"શાળા અને પરિવાર માટે ખાસ પ્રવાસ."}
];
function getPackages(){try{const x=JSON.parse(localStorage.getItem(KEY));return Array.isArray(x)?x:defaults}catch(e){return defaults}}
function saveAll(x){localStorage.setItem(KEY,JSON.stringify(x))}
function render(){
 const list=document.getElementById("packageList"), data=getPackages();
 list.innerHTML="";
 if(!data.length){list.innerHTML='<div class="empty">હાલ કોઈ પેકેજ નથી.<br>＋ નવું પેકેજ ઉમેરો.</div>';return}
 data.forEach(p=>{
  const c=document.createElement("article");c.className="card";
  c.innerHTML=`<h3>${esc(p.name)}</h3><div class="tag">📅 ${esc(p.days||"માહિતી ઉપલબ્ધ નથી")}</div>${p.price?`<div class="price">₹${esc(p.price)}</div>`:""}<p><b>📍 સ્થળો:</b><br>${esc(p.places||"")}</p><p>${esc(p.details||"")}</p><div class="actions"><button class="btn" onclick="whatsapp('${encodeURIComponent(p.name)}')">💬 WhatsApp</button><button class="edit" onclick="editPackage(${p.id})">✏️ Edit</button><button class="delete" onclick="deletePackage(${p.id})">🗑️ Delete</button></div>`;
  list.appendChild(c);
 })
}
function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function openForm(id=null){
 document.getElementById("modal").classList.remove("hidden");
 document.getElementById("packageForm").reset();
 document.getElementById("editId").value="";
 document.getElementById("formTitle").textContent="નવું પેકેજ";
 if(id!==null){const p=getPackages().find(x=>x.id===id);if(!p)return;document.getElementById("formTitle").textContent="પેકેજમાં ફેરફાર";document.getElementById("editId").value=p.id;document.getElementById("name").value=p.name;document.getElementById("days").value=p.days;document.getElementById("price").value=p.price;document.getElementById("places").value=p.places;document.getElementById("details").value=p.details}
}
function closeForm(){document.getElementById("modal").classList.add("hidden")}
function savePackage(e){e.preventDefault();let data=getPackages();const id=document.getElementById("editId").value;const p={id:id?Number(id):Date.now(),name:document.getElementById("name").value.trim(),days:document.getElementById("days").value.trim(),price:document.getElementById("price").value.trim(),places:document.getElementById("places").value.trim(),details:document.getElementById("details").value.trim()};if(id)data=data.map(x=>x.id===Number(id)?p:x);else data.unshift(p);saveAll(data);closeForm();render();document.getElementById("packages").scrollIntoView()}
function editPackage(id){openForm(id)}
function deletePackage(id){if(confirm("આ પેકેજ કાઢી નાખવું છે?")){saveAll(getPackages().filter(x=>x.id!==id));render()}}
function resetPackages(){if(confirm("મૂળ પેકેજ પાછા લાવવા? તમારા ઉમેરેલા ફેરફારો દૂર થશે.")){saveAll(defaults);render()}}
function whatsapp(name){const text=decodeURIComponent(name)+" વિશે માહિતી જોઈએ છે.";window.open("https://wa.me/918980983123?text="+encodeURIComponent(text),"_blank")}
render();
if("serviceWorker"in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js"));