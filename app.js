
const products = [
 {id:1,name:"اسپرسو",cat:"قهوه گرم",price:85000,img:"https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=700&q=80",desc:"اسپرسوی غلیظ با دانه‌های تازه‌رُست."},
 {id:2,name:"آمریکانو",cat:"قهوه گرم",price:95000,img:"https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&w=700&q=80",desc:"قهوه‌ای متعادل و خوش‌عطر."},
 {id:3,name:"لاته",cat:"قهوه گرم",price:125000,img:"https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=700&q=80",desc:"اسپرسو، شیر بخار داده‌شده و فوم لطیف."},
 {id:4,name:"کاپوچینو",cat:"قهوه گرم",price:135000,img:"https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?auto=format&fit=crop&w=700&q=80",desc:"ترکیبی متعادل از اسپرسو، شیر و فوم."},
 {id:5,name:"موکا",cat:"قهوه گرم",price:145000,img:"https://images.unsplash.com/photo-1578374173704-1f5d0d6f4a1d?auto=format&fit=crop&w=700&q=80",desc:"قهوه، شکلات و شیر برای یک طعم خاص."},
 {id:6,name:"چای سیاه",cat:"چای",price:65000,img:"https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=700&q=80",desc:"چای خوش‌رنگ و خوش‌عطر."},
 {id:7,name:"آیس لاته",cat:"قهوه سرد",price:145000,img:"https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=700&q=80",desc:"لاته خنک با یخ و شیر تازه."},
 {id:8,name:"چیزکیک",cat:"دسر",price:180000,img:"https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=700&q=80",desc:"دسر خامه‌ای و تازه."}
];

let cart = JSON.parse(localStorage.getItem("coffeeCart") || "[]");

function toman(n){ return n.toLocaleString("fa-IR")+" تومان"; }

function addToCart(id){
 const p=products.find(x=>x.id===id);
 const item=cart.find(x=>x.id===id);
 if(item) item.qty++;
 else cart.push({...p,qty:1});
 saveCart();
 renderCart();
 alert(`${p.name} به سبد سفارش اضافه شد.`);
}
function removeFromCart(id){
 cart=cart.filter(x=>x.id!==id); saveCart(); renderCart();
}
function saveCart(){localStorage.setItem("coffeeCart",JSON.stringify(cart));}
function renderCart(){
 const box=document.querySelector("#cartItems");
 const total=document.querySelector("#cartTotal");
 if(!box)return;
 box.innerHTML="";
 let sum=0;
 cart.forEach(x=>{
   sum+=x.price*x.qty;
   box.innerHTML+=`<div class="cart-item"><div><b>${x.name}</b><div class="meta">${x.qty} عدد</div></div><div>${toman(x.price*x.qty)}<br><button class="btn btn-outline" style="padding:4px 9px;margin-top:5px" onclick="removeFromCart(${x.id})">حذف</button></div></div>`;
 });
 if(!cart.length) box.innerHTML='<p class="meta">سبد سفارش شما خالی است.</p>';
 if(total) total.textContent=toman(sum);
}
function renderProducts(target="#productGrid", filter="همه"){
 const el=document.querySelector(target); if(!el)return;
 const list=filter==="همه"?products:products.filter(x=>x.cat===filter);
 el.innerHTML=list.map(p=>`<article class="card"><img class="product-img" src="${p.img}" alt="${p.name}"><div class="product-body"><h3>${p.name}</h3><p>${p.desc}</p><div class="price-row"><span class="price">${toman(p.price)}</span><button class="icon-btn" onclick="addToCart(${p.id})">+</button></div></div></article>`).join("");
}
document.addEventListener("DOMContentLoaded",()=>{renderProducts();renderCart();});
