function sendWhatsApp(e){
 e.preventDefault();
 const n=document.getElementById('name').value;
 const s=document.getElementById('school').value;
 const p=document.getElementById('phone').value;
 const t=document.getElementById('tour').value;
 const m=document.getElementById('message').value;
 const text=`KALP TOURS & TRAVELS\nનામ: ${n}\nશાળા: ${s}\nમોબાઇલ: ${p}\nપ્રવાસ: ${t}\nમાહિતી: ${m}`;
 window.open('https://wa.me/918980983123?text='+encodeURIComponent(text),'_blank');
}