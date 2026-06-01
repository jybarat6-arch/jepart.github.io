let cart = JSON.parse(localStorage.getItem('gc_cart')||'[]');
function saveCart(){localStorage.setItem('gc_cart',JSON.stringify(cart));}
function cartCount(){return cart.reduce((a,i)=>a+i.qty,0);}
function addToCart(id,name,price){
  const idx=cart.findIndex(i=>i.id===id);
  if(idx>-1)cart[idx].qty++;else cart.push({id,name,price,qty:1});
  saveCart();updateCartUI();
  toast('✓ تمت الإضافة للسلة — '+name);
}
function updateCartUI(){document.querySelectorAll('.cart-count').forEach(el=>el.textContent=cartCount()||'0');}
function toast(msg){
  let t=document.getElementById('toast');
  if(!t){t=document.createElement('div');t.id='toast';t.className='toast';document.body.appendChild(t);}
  t.textContent=msg;t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),2500);
}

const PAGES=[
  {href:'index.html',label:'الرئيسية'},
  {href:'products.html',label:'قطع المحرك'},
  {href:'products.html',label:'نظام الفرامل'},
  {href:'products.html',label:'التعليق والإدارة'},
  {href:'products.html',label:'الكهرباء والإشارة'},
  {href:'products.html',label:'الزيوت والفلتر'},
  {href:'offers.html',label:'عروض خاصة'},
];

const PRODUCTS=[
  {id:'p1',name:'شمعة إشعال بوجي عالي الأداء',brand:'NGK',price:25,oldPrice:35,icon:'⚡',cat:'engine',disc:'-29%',compat:'تويوتا، نيسان، هوندا',stars:5,reviews:214},
  {id:'p2',name:'أقراص فرامل متميزة',brand:'BREMBO',price:199,oldPrice:260,icon:'🔴',cat:'brakes',disc:'-23%',compat:'BMW، مرسيدس، أودي',stars:4,reviews:89},
  {id:'p3',name:'بطارية سيارة 12V 60Ah',brand:'VARTA',price:299,oldPrice:399,icon:'🔋',cat:'electric',disc:'-25%',compat:'معظم الموديلات',stars:5,reviews:317},
  {id:'p4',name:'فلتر زيت محرك أصلي',brand:'MANN',price:35,oldPrice:45,icon:'🔧',cat:'filter',disc:'-20%',compat:'فولكس، أودي، سكودا',stars:5,reviews:540},
  {id:'p5',name:'مصابيح LED أمامية H7',brand:'PHILIPS',price:240,oldPrice:null,icon:'💡',cat:'electric',disc:null,compat:'متوافق مع معظم الموديلات',stars:5,reviews:201},
  {id:'p6',name:'فلتر هواء عالي الأداء',brand:'K&N',price:145,oldPrice:180,icon:'💨',cat:'filter',disc:'-19%',compat:'هوندا، مازدا، سوبارو',stars:4,reviews:73},
  {id:'p7',name:'تيل فرامل أمامية + بطانة',brand:'BOSCH',price:320,oldPrice:400,icon:'🛑',cat:'brakes',disc:'-20%',compat:'BMW سلسلة 3 و5',stars:4,reviews:89},
  {id:'p8',name:'حزام توقيت كامل',brand:'GATES',price:420,oldPrice:null,icon:'⚙️',cat:'engine',disc:null,compat:'نيسان، هيونداي، كيا',stars:5,reviews:128},
  {id:'p9',name:'زيت محرك 5W-30 4L',brand:'MOBIL',price:89,oldPrice:110,icon:'🛢️',cat:'oil',disc:'-19%',compat:'جميع السيارات',stars:5,reviews:892},
  {id:'p10',name:'صدام أمامي يوروبار',brand:'KYB',price:185,oldPrice:230,icon:'🔩',cat:'suspension',disc:'-20%',compat:'تويوتا كامري 2018-2024',stars:4,reviews:156},
];

function renderNav(active){
  return`
  <div class="topbar">
    <ul class="topbar-links">
      <li><a href="track.html"><i class="ti ti-truck-delivery" style="font-size:12px;vertical-align:-1px;"></i> تتبع الطلب</a></li>
      <li><a href="contact.html"><i class="ti ti-headset" style="font-size:12px;vertical-align:-1px;"></i> مساعدة</a></li>
      <li><a href="contact.html">اتصل بنا</a></li>
    </ul>
    <div class="topbar-right">
      <a href="#"><i class="ti ti-brand-whatsapp"></i> واتساب</a>
      <a href="#"><i class="ti ti-phone"></i> 920-000-1234</a>
    </div>
  </div>
  <nav>
    <a href="index.html" class="nav-logo">
      <div class="nav-logo-ic"><i class="ti ti-settings"></i></div>
      <div class="nav-logo-txt"><h1>المتمتع</h1><p>لقطع غيار السيارات</p></div>
    </a>
    <ul class="nav-links">
      ${PAGES.map(p=>`<li><a href="${p.href}" class="${p.label===active?'active':''}">${p.label}</a></li>`).join('')}
    </ul>
    <div class="nav-actions">
      <div class="nav-search-wrap">
        <button class="nav-search-btn"><i class="ti ti-search"></i></button>
        <input class="nav-search" type="text" placeholder="ابحث عن قطعة أو رقم قطعة أو اسم سيارة..." onkeydown="if(event.key==='Enter')window.location='products.html?q='+this.value">
      </div>
      <a href="cart.html"><div class="nav-icon-btn"><i class="ti ti-shopping-cart"></i><div class="nav-badge cart-count">0</div></div></a>
      <a href="#"><div class="nav-icon-btn"><i class="ti ti-heart"></i></div></a>
      <a href="#" class="nav-account"><i class="ti ti-user-circle"></i><span>حسابي</span></a>
    </div>
  </nav>`;
}

function renderCarSearch(){
  return`
  <div class="car-search">
    <div class="cs-label">
      <i class="ti ti-car"></i>
      <div><h3>ابحث حسب سيارتك</h3><p>اختر سيارتك لعرض القطع المناسبة</p></div>
    </div>
    <div class="cs-divider"></div>
    <div class="cs-select-wrap"><i class="ti ti-brand-sketchfab"></i><select><option value="">اختر الماركة</option><option>تويوتا</option><option>نيسان</option><option>BMW</option><option>مرسيدس</option><option>هيونداي</option><option>كيا</option></select></div>
    <div class="cs-select-wrap"><i class="ti ti-car"></i><select><option value="">اختر الموديل</option><option>كامري</option><option>كورولا</option><option>التيما</option><option>باترول</option></select></div>
    <div class="cs-select-wrap"><i class="ti ti-calendar"></i><select><option value="">اختر سنة الصنع</option>${Array.from({length:15},(_,i)=>2024-i).map(y=>`<option>${y}</option>`).join('')}</select></div>
    <button class="cs-btn" onclick="toast('🔍 جاري البحث...')"><i class="ti ti-search"></i> بحث عن قطع</button>
  </div>`;
}

function renderCats(){
  const cats=[
    {icon:'ti-engine',nm:'قطع المحرك'},{icon:'ti-brake',nm:'نظام الفرامل'},
    {icon:'ti-bolt',nm:'الكهرباء والإشارة'},{icon:'ti-droplet',nm:'الزيوت والفلتر'},
    {icon:'ti-wind',nm:'التبريد والتكييف'},{icon:'ti-car',nm:'هيكل السيارة'},
    {icon:'ti-settings',nm:'التعليق والإدارة'},{icon:'ti-dots"},nm:'المزيد'},
  ];
  return`<div class="cats-strip"><div class="cats-inner">${cats.map((c,i)=>`<div class="cat-item${i===0?' active':''}" onclick="document.querySelectorAll('.cat-item').forEach(x=>x.classList.remove('active'));this.classList.add('active');"><div class="cat-ic"><i class="ti ${c.icon}"></i></div><div class="cat-nm">${c.nm}</div></div>`).join('')}</div></div>`;
}

function renderTrust(){
  return`
  <div class="trust-bar">
    <div class="trust-item"><div class="trust-ic"><i class="ti ti-truck-delivery"></i></div><div class="trust-txt"><h4>شحن سريع</h4><p>توصيل لجميع مناطق المملكة</p></div></div>
    <div class="trust-item"><div class="trust-ic"><i class="ti ti-shield-check"></i></div><div class="trust-txt"><h4>ضمان جودة</h4><p>منتجات أصلية %100</p></div></div>
    <div class="trust-item"><div class="trust-ic"><i class="ti ti-credit-card"></i></div><div class="trust-txt"><h4>دفع آمن</h4><p>خيارات دفع معتمدة وآمنة</p></div></div>
    <div class="trust-item"><div class="trust-ic"><i class="ti ti-headset"></i></div><div class="trust-txt"><h4>دعم فني</h4><p>مساعدة في اختيار القطعة المناسبة</p></div></div>
  </div>`;
}

function renderProductCard(p){
  return`
  <div class="product-card" onclick="window.location='product.html?id=${p.id}'">
    <div class="pc-img">
      ${p.icon}
      ${p.disc?`<div class="pc-disc">${p.disc}</div>`:''}
      <div class="pc-fav" onclick="event.stopPropagation();toast('❤️ أضيف للمفضلة')"><i class="ti ti-heart"></i></div>
    </div>
    <div class="pc-body">
      <div class="pc-brand">${p.brand}</div>
      <div class="pc-name">${p.name}</div>
      <div class="pc-compat"><i class="ti ti-car" style="font-size:11px;"></i> ${p.compat}</div>
      <div class="pc-stars">${'★'.repeat(p.stars)}${'☆'.repeat(5-p.stars)} <span style="color:var(--hint);font-size:10px;">(${p.reviews})</span></div>
      <div class="pc-footer">
        <div><div class="pc-price"><span class="curr">ر.س</span> ${p.price}</div>${p.oldPrice?`<div class="pc-old">ر.س ${p.oldPrice}</div>`:''}</div>
        <button class="pc-cart" onclick="event.stopPropagation();addToCart('${p.id}','${p.name}',${p.price})"><i class="ti ti-shopping-cart-plus"></i></button>
      </div>
    </div>
  </div>`;
}

function renderFooter(){
  return`
  <footer>
    <div class="footer-grid">
      <div class="footer-brand">
        <div style="display:flex;align-items:center;gap:9px;">
          <div style="width:36px;height:36px;background:var(--pr);border-radius:9px;display:flex;align-items:center;justify-content:center;"><i class="ti ti-settings" style="color:#fff;font-size:18px;"></i></div>
          <div><div style="font-size:18px;font-weight:900;color:#fff;">المتمتع</div><div style="font-size:10px;color:#666;">لقطع غيار السيارات</div></div>
        </div>
        <p style="margin-top:14px;">متجرك الأول لقطع غيار السيارات الأصلية. نوصل لجميع مناطق المملكة بضمان الجودة وأسرع توصيل.</p>
      </div>
      <div class="footer-col"><h4>الفئات</h4><ul>
        <li><a href="products.html">قطع المحرك</a></li><li><a href="products.html">نظام الفرامل</a></li>
        <li><a href="products.html">الكهرباء والإشارة</a></li><li><a href="products.html">الزيوت والفلتر</a></li>
      </ul></div>
      <div class="footer-col"><h4>خدمة العملاء</h4><ul>
        <li><a href="track.html">تتبع الطلب</a></li><li><a href="contact.html">سياسة الإرجاع</a></li>
        <li><a href="contact.html">الضمان</a></li><li><a href="contact.html">الأسئلة الشائعة</a></li>
      </ul></div>
      <div class="footer-col"><h4>تواصل معنا</h4><ul>
        <li><a href="tel:9200001234"><i class="ti ti-phone" style="font-size:12px;vertical-align:-1px;"></i> 920-000-1234</a></li>
        <li><a href="#"><i class="ti ti-brand-whatsapp" style="font-size:12px;vertical-align:-1px;"></i> واتساب</a></li>
        <li><a href="mailto:info@almotmee.sa"><i class="ti ti-mail" style="font-size:12px;vertical-align:-1px;"></i> info@almotmee.sa</a></li>
      </ul></div>
    </div>
    <div class="footer-bottom">
      <div>© 2026 المتمتع لقطع غيار السيارات — جميع الحقوق محفوظة</div>
      <div class="footer-links"><a href="#">سياسة الخصوصية</a><a href="#">الشروط والأحكام</a></div>
    </div>
  </footer>`;
}
