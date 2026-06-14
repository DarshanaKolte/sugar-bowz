const phone='919876543210';
const menu=[
 {name:'Signature Celebration Cake',cat:'cakes',price:'Custom price',desc:'Elegant eggless cakes for birthdays, anniversaries and milestones.',icon:'Cake'},
 {name:'Chocolate Truffle Cake',cat:'cakes',price:'From ₹899',desc:'Rich chocolate layers with smooth premium finish.',icon:'Truffle'},
 {name:'Customized Logo Cookies',cat:'gifting',price:'From ₹60/pc',desc:'Perfect for corporate gifting, events and party favours.',icon:'Cookies'},
 {name:'Brownie Box',cat:'desserts',price:'From ₹499',desc:'Fudgy brownies packed beautifully for gifting and cravings.',icon:'Brownies'},
 {name:'Dessert Jars',cat:'desserts',price:'From ₹149',desc:'Layered eggless dessert jars in crowd-favourite flavours.',icon:'Jars'},
 {name:'Luxury Hamper',cat:'gifting',price:'Custom price',desc:'Curated festive and corporate hampers with premium packaging.',icon:'Hamper'}
];
let cart=[];
const grid=document.getElementById('menuGrid'), cartCount=document.getElementById('cartCount'), cartItems=document.getElementById('cartItems'), sendOrder=document.getElementById('sendOrder');
function render(items=menu){grid.innerHTML=items.map((i,idx)=>`<article class="product-card reveal show"><div class="product-img">${i.icon}</div><div class="product-info"><h3>${i.name}</h3><p>${i.desc}</p><div class="product-bottom"><span class="price">${i.price}</span><button class="add" onclick="addToCart(${idx})">Add to order</button></div></div></article>`).join('')}
function addToCart(idx){cart.push(menu[idx]);updateCart();document.getElementById('cartPanel').classList.add('open')}
function updateCart(){cartCount.textContent=cart.length;cartItems.innerHTML=cart.length?cart.map(i=>`<div class="cart-item"><strong>${i.name}</strong><br><span>${i.price}</span></div>`).join(''):'<p>Your cart is empty.</p>';let text='Hi SugarBowz, I want to order: '+cart.map(i=>i.name).join(', ');sendOrder.href=`https://wa.me/${phone}?text=${encodeURIComponent(text)}`}
document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{document.querySelector('.filter.active').classList.remove('active');btn.classList.add('active');let f=btn.dataset.filter;render(f==='all'?menu:menu.filter(i=>i.cat===f))}));
document.querySelector('.nav-toggle').onclick=()=>document.querySelector('.nav-links').classList.toggle('open');
document.getElementById('cartBtn').onclick=()=>document.getElementById('cartPanel').classList.add('open');document.getElementById('closeCart').onclick=()=>document.getElementById('cartPanel').classList.remove('open');
window.addEventListener('scroll',()=>document.querySelector('.site-header').classList.toggle('scrolled',scrollY>40));
const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.14});document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
document.addEventListener('mousemove',e=>{document.querySelector('.cursor-glow').style.left=e.clientX+'px';document.querySelector('.cursor-glow').style.top=e.clientY+'px'});
window.addEventListener('load',()=>{setTimeout(()=>document.getElementById('loader').classList.add('hide'),700)});document.getElementById('year').textContent=new Date().getFullYear();render();updateCart();
