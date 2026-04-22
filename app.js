/* ═══════════════════════════════════════════════════
   FRESKVV HUB — Core Application Engine v2
   ═══════════════════════════════════════════════════ */

const FRESKVV_ASSETS = {
  images: {
    hero: '',
    popupAd: '',
    aboutAvatar: ''
  },
  icons: {
    nav_home: '<i class="fa-solid fa-house"></i>',
    nav_updates: '<i class="fa-solid fa-bolt"></i>',
    nav_services: '<i class="fa-solid fa-layer-group"></i>',
    nav_about: '<i class="fa-solid fa-circle-info"></i>',
    nav_contact: '<i class="fa-solid fa-envelope"></i>',
    
    internet: '<i class="fa-solid fa-globe"></i>',
    social: '<i class="fa-solid fa-hashtag"></i>',
    design: '<i class="fa-solid fa-swatchbook"></i>',
    
    web_design: '<i class="fa-solid fa-desktop"></i>',
    web_hosting: '<i class="fa-solid fa-server"></i>',
    pos_systems: '<i class="fa-solid fa-cash-register"></i>',
    followers: '<i class="fa-solid fa-arrow-trend-up"></i>',
    management: '<i class="fa-solid fa-users-gear"></i>',
    photoshop: '<i class="fa-brands fa-adobe"></i>',
    illustrator: '<i class="fa-solid fa-pen-nib"></i>',
    after_effects: '<i class="fa-solid fa-video"></i>',
    
    daily_offers: '<i class="fa-solid fa-star"></i>',
    support: '<i class="fa-solid fa-headset"></i>',
    theme: '<i class="fa-solid fa-palette"></i>',
    lang: '<i class="fa-solid fa-language"></i>',
    user: '<i class="fa-solid fa-user"></i>',
    logout: '<i class="fa-solid fa-arrow-right-from-bracket"></i>',
    admin: '<i class="fa-solid fa-shield-halved"></i>',
    
    social_wa: '<i class="fa-brands fa-whatsapp"></i>',
    social_ig: '<i class="fa-brands fa-instagram"></i>',
    social_fb: '<i class="fa-brands fa-facebook"></i>',
    social_x: '<i class="fa-brands fa-x-twitter"></i>',
    social_tg: '<i class="fa-brands fa-telegram"></i>'
  },
  socials: { 
    whatsapp: 'https://wa.me/2001221640301', 
    instagram: 'https://instagram.com/freskvvhub' 
  }
};

// ─── SERVICES DATA ───
const SERVICES_DATA = {
  en: [
    { id: 'internet', icon: FRESKVV_ASSETS.icons.internet, title: 'Internet Services', desc: 'Professional web solutions for your digital presence.',
      subs: [
        { id: 'web-design', name: 'Web Design', icon: FRESKVV_ASSETS.icons.web_design, desc: 'Custom, responsive, and high-performance websites.', longDesc: 'We build state-of-the-art websites using modern technologies. From e-commerce to corporate landing pages, we ensure a premium user experience.' },
        { id: 'web-hosting', name: 'Web Hosting', icon: FRESKVV_ASSETS.icons.web_hosting, desc: 'Ultra-fast and secure cloud hosting solutions.', longDesc: 'Our hosting services offer 99.9% uptime, SSD storage, and free SSL certificates. Your site will be fast, secure, and always online.' },
        { id: 'pos-systems', name: 'POS Systems', icon: FRESKVV_ASSETS.icons.pos_systems, desc: 'Smart management systems for your business.', longDesc: 'Integrated POS solutions with inventory tracking, sales reports, and cloud synchronization for restaurants and retail shops.' }
      ] 
    },
    { id: 'social', icon: FRESKVV_ASSETS.icons.social, title: 'Social Media', desc: 'Grow your brand with strategic social media solutions.',
      subs: [
        { id: 'followers', name: 'Followers Growth', icon: FRESKVV_ASSETS.icons.followers, desc: 'Organic and targeted growth for your accounts.', longDesc: 'Increase your reach and engagement across Instagram, Facebook, and X. We use data-driven strategies to find your ideal audience.' },
        { id: 'management', name: 'Account Management', icon: FRESKVV_ASSETS.icons.management, desc: 'Full-scale social media content and ads management.', longDesc: 'Daily posting, community engagement, and high-conversion ad campaigns designed to turn followers into loyal customers.' }
      ] 
    },
    { id: 'design', icon: FRESKVV_ASSETS.icons.design, title: 'Graphic Design', desc: 'Stunning visuals crafted with the full Adobe Creative Suite.',
      subs: [
        { id: 'photoshop', name: 'Photoshop Design', icon: FRESKVV_ASSETS.icons.photoshop, desc: 'Creative photo manipulation and branding.', longDesc: 'High-end photo editing, brand identity design, and social media post graphics that capture attention instantly.' },
        { id: 'illustrator', name: 'Illustrator Graphics', icon: FRESKVV_ASSETS.icons.illustrator, desc: 'Vector logos and scalable illustrations.', longDesc: 'Minimalist and professional vector logos that look perfect on everything from business cards to huge billboards.' },
        { id: 'after-effects', name: 'After Effects Motion', icon: FRESKVV_ASSETS.icons.after_effects, desc: 'Cinematic motion graphics and video editing.', longDesc: 'Breathtaking 2D/3D motion graphics, promotional videos, and cinematic transitions that bring your brand to life.' }
      ] 
    },
  ],
  ar: [
    { id: 'internet', icon: FRESKVV_ASSETS.icons.internet, title: 'خدمات الإنترنت', desc: 'حلول ويب احترافية لتواجدك الرقمي.',
      subs: [
        { id: 'web-design', name: 'تصميم مواقع', icon: FRESKVV_ASSETS.icons.web_design, desc: 'مواقع مخصصة وسريعة ومتوافقة مع الجوال.', longDesc: 'نقوم ببناء أحدث المواقع باستخدام تقنيات عصرية. من المتاجر الإلكترونية إلى المواقع التعريفية، نضمن لك تجربة مستخدم متميزة.' },
        { id: 'web-hosting', name: 'استضافة مواقع', icon: FRESKVV_ASSETS.icons.web_hosting, desc: 'استضافة سحابية فائقة السرعة والأمان.', longDesc: 'خدمات الاستضافة لدينا توفر سرعة عالية، تخزين SSD، وشهادات SSL مجانية. موقعك سيكون دائماً متاحاً وآمناً.' },
        { id: 'pos-systems', name: 'أنظمة نقاط البيع', icon: FRESKVV_ASSETS.icons.pos_systems, desc: 'أنظمة ذكية لإدارة أعمالك التجارية.', longDesc: 'حلول نقاط بيع متكاملة مع تتبع المخزون، تقارير المبيعات، والمزامنة السحابية للمطاعم والمحلات التجارية.' }
      ] 
    },
    { id: 'social', icon: FRESKVV_ASSETS.icons.social, title: 'وسائل التواصل', desc: 'نمّي علامتك التجارية مع حلول تواصل اجتماعي استراتيجية.',
      subs: [
        { id: 'followers', name: 'زيادة المتابعين', icon: FRESKVV_ASSETS.icons.followers, desc: 'زيادة مستهدفة وحقيقية لحساباتك.', longDesc: 'زد من وصولك وتفاعلك على إنستجرام وفيسبوك وإكس. نستخدم استراتيجيات مبنية على البيانات للوصول لجمهورك المثالي.' },
        { id: 'management', name: 'إدارة الحسابات', icon: FRESKVV_ASSETS.icons.management, desc: 'إدارة كاملة للمحتوى والإعلانات.', longDesc: 'نشر يومي، تفاعل مع المجتمع، وحملات إعلانية عالية التحويل مصممة لتحويل المتابعين إلى عملاء دائمين.' }
      ] 
    },
    { id: 'design', icon: FRESKVV_ASSETS.icons.design, title: 'تصميم جرافيك', desc: 'تصاميم مذهلة باستخدام حزمة أدوبي الكاملة.',
      subs: [
        { id: 'photoshop', name: 'تصميم فوتوشوب', icon: FRESKVV_ASSETS.icons.photoshop, desc: 'معالجة صور إبداعية وتصميم هوية بصرية.', longDesc: 'تعديل صور احترافي، تصميم هوية العلامة التجارية، ورسومات تواصل اجتماعي تجذب الانتباه فوراً.' },
        { id: 'illustrator', name: 'رسومات إليستريتور', icon: FRESKVV_ASSETS.icons.illustrator, desc: 'شعارات فيكتور ورسومات قابلة للتطوير.', longDesc: 'شعارات فيكتور احترافية وبسيطة تظهر بشكل مثالي على كل شيء من بطاقات العمل إلى اللوحات الإعلانية الضخمة.' },
        { id: 'after-effects', name: 'موشن أفتر إفكتس', icon: FRESKVV_ASSETS.icons.after_effects, desc: 'رسومات متحركة سينمائية وتحرير فيديو.', longDesc: 'رسومات متحركة 2D/3D مذهلة، فيديوهات ترويجية، وانتقالات سينمائية تبعث الحياة في علامتك التجارية.' }
      ] 
    },
  ]
};

// ─── I18N ───
const I18N = {
  en: {
    nav_home:'Home', nav_updates:'Updates', nav_services:'Services', nav_about:'About', nav_contact:'Contact',
    hero_badge:'✦ Digital Innovation Studio', hero_title_1:'Welcome to',
    hero_subtitle:"We craft premium digital experiences that push boundaries and redefine what's possible.",
    hero_cta1:'Explore Updates', hero_cta2:'Get in Touch',
    updates_title:'Latest Updates', updates_subtitle:'Stay up to date with our newest releases and announcements.',
    daily_offers:'Daily Offers', support_chat:'Support', theme_title:'Accent Color', theme_custom:'Custom',
    upd1_tag:'NEW', upd1_title:'Platform V2 Launched',
    upd1_body:'Our entirely redesigned platform is live — featuring a new 3D interface, faster performance, and premium design language.',
    upd2_tag:'ANNOUNCEMENT', upd2_title:'New Services Available',
    upd2_body:'We now offer advanced AI integration, motion graphics, and full-stack development packages for businesses of all sizes.',
    upd3_tag:'UPDATE', upd3_title:'Community Milestone',
    upd3_body:"We've reached 10,000+ satisfied clients worldwide. Thank you for being part of our journey!",
    svc_title:'Our Services', svc_subtitle:'Premium digital solutions tailored for your success.',
    about_title:'About Fares',
    about_bio:'Founder & Creative Director of Freskvv Hub. A passionate digital innovator specializing in web development, graphic design, and social media strategy. Building premium digital experiences that elevate brands and drive results.',
    about_age_text:'years old — Born June 17, 2006',
    stat_projects:'Projects', stat_clients:'Clients', stat_age:'Years Old',
    cs_title:'Coming Soon', cs_subtitle:"Exciting new platforms we're building for you.",
    cs_games:'Games Charging Store', cs_games_desc:'Top up your favorite games instantly with the best prices.',
    cs_apps:'App Store', cs_apps_desc:'Discover curated premium apps and tools for creators.',
    cs_edu:'Educational Platform', cs_edu_desc:'Learn digital skills from industry experts, step by step.',
    cs_badge:'Coming Soon',
    contact_title:'Get in Touch', contact_subtitle:'Ready to start your project? Reach out to us anytime.',
    contact_wa:'Chat on WhatsApp',
    footer_tagline:'Crafting Digital Excellence', footer_rights:'All rights reserved.',
    order_title:'Order Now', form_name:'Full Name', form_phone:'Phone Number',
    form_email:'Email', form_type:'Type', form_inquiry:'Inquiry', form_purchase:'Purchase',
    form_submit:'Send via WhatsApp', modal_order_btn:'Order Now',
  },
  ar: {
    nav_home:'الرئيسية', nav_updates:'التحديثات', nav_services:'الخدمات', nav_about:'من نحن', nav_contact:'تواصل معنا',
    hero_badge:'✦ استوديو الابتكار الرقمي', hero_title_1:'مرحبًا بك في',
    hero_subtitle:'نصنع تجارب رقمية فاخرة تتخطى الحدود وتعيد تعريف الممكن.',
    hero_cta1:'استكشف التحديثات', hero_cta2:'تواصل معنا',
    updates_title:'آخر التحديثات', updates_subtitle:'ابقَ على اطلاع بأحدث إصداراتنا وإعلاناتنا.',
    daily_offers:'عروض يومية', support_chat:'الدعم', theme_title:'لون التمييز', theme_custom:'مخصص',
    upd1_tag:'جديد', upd1_title:'إطلاق المنصة V2',
    upd1_body:'منصتنا المعاد تصميمها بالكامل أصبحت متاحة الآن — بواجهة ثلاثية الأبعاد وأداء أسرع وتصميم فاخر.',
    upd2_tag:'إعلان', upd2_title:'خدمات جديدة متاحة',
    upd2_body:'نقدم الآن تكامل الذكاء الاصطناعي المتقدم والرسوم المتحركة وحزم التطوير الشاملة للأعمال بجميع أحجامها.',
    upd3_tag:'تحديث', upd3_title:'إنجاز مجتمعي',
    upd3_body:'وصلنا إلى أكثر من 10,000 عميل راضٍ حول العالم. شكرًا لكونكم جزءًا من رحلتنا!',
    svc_title:'خدماتنا', svc_subtitle:'حلول رقمية فاخرة مصممة لنجاحك.',
    about_title:'عن فارس',
    about_bio:'المؤسس والمدير الإبداعي لـ Freskvv Hub. مبتكر رقمي شغوف متخصص في تطوير الويب والتصميم الجرافيكي واستراتيجية وسائل التواصل الاجتماعي. يبني تجارب رقمية فاخرة ترتقي بالعلامات التجارية وتحقق النتائج.',
    about_age_text:'سنة — مواليد 17 يونيو 2006',
    stat_projects:'مشروع', stat_clients:'عميل', stat_age:'سنة',
    cs_title:'قريبًا', cs_subtitle:'منصات جديدة ومثيرة نبنيها لأجلك.',
    cs_games:'متجر شحن الألعاب', cs_games_desc:'اشحن ألعابك المفضلة فورًا بأفضل الأسعار.',
    cs_apps:'متجر التطبيقات', cs_apps_desc:'اكتشف تطبيقات وأدوات مميزة للمبدعين.',
    cs_edu:'منصة تعليمية', cs_edu_desc:'تعلم المهارات الرقمية من خبراء المجال، خطوة بخطوة.',
    cs_badge:'قريبًا',
    contact_title:'تواصل معنا', contact_subtitle:'مستعد لبدء مشروعك؟ تواصل معنا في أي وقت.',
    contact_wa:'تحدث عبر واتساب',
    footer_tagline:'نصنع التميز الرقمي', footer_rights:'جميع الحقوق محفوظة.',
    order_title:'اطلب الآن', form_name:'الاسم الكامل', form_phone:'رقم الهاتف',
    form_email:'البريد الإلكتروني', form_type:'النوع', form_inquiry:'استفسار', form_purchase:'شراء',
    form_submit:'إرسال عبر واتساب', modal_order_btn:'اطلب الآن',
  }
};

let currentLang = localStorage.getItem('fh_lang') || 'en';
let currentAccent = localStorage.getItem('fh_accent') || '#00d4ff';
let currentOrderService = '';

/* ═══════ 1. THREE.JS ═══════ */
function initThreeScene() {
  const canvas = document.getElementById('three-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  const PC = 1200;
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(PC * 3), col = new Float32Array(PC * 3);
  for (let i = 0; i < PC; i++) {
    pos[i*3]=(Math.random()-0.5)*14; pos[i*3+1]=(Math.random()-0.5)*14; pos[i*3+2]=(Math.random()-0.5)*10;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const mat = new THREE.PointsMaterial({ size:0.04, vertexColors:true, transparent:true, opacity:0.7, blending:THREE.AdditiveBlending, depthWrite:false, sizeAttenuation:true });
  const particles = new THREE.Points(geo, mat);
  scene.add(particles);

  const logoMat = new THREE.MeshBasicMaterial({ color: currentAccent, wireframe: true, transparent: true, opacity: 0.2 });
  const logoMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(1.1, 1), logoMat);
  scene.add(logoMesh);
  const logoInnerMat = new THREE.MeshBasicMaterial({ color: currentAccent, wireframe: true, transparent: true, opacity: 0.35 });
  const logoInner = new THREE.Mesh(new THREE.IcosahedronGeometry(0.6, 0), logoInnerMat);
  scene.add(logoInner);

  const mouse = { x: 0, y: 0 };
  window.addEventListener('mousemove', e => { mouse.x=(e.clientX/window.innerWidth-0.5)*2; mouse.y=-(e.clientY/window.innerHeight-0.5)*2; });
  window.addEventListener('resize', () => { camera.aspect=window.innerWidth/window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); });

  function updateParticleColors(hex) {
    const c = new THREE.Color(hex);
    const a = geo.attributes.color.array;
    for (let i = 0; i < PC; i++) { const m=0.4+Math.random()*0.6; a[i*3]=c.r*m; a[i*3+1]=c.g*m; a[i*3+2]=c.b*m; }
    geo.attributes.color.needsUpdate = true;
    logoMat.color.set(hex); logoInnerMat.color.set(hex);
  }
  updateParticleColors(currentAccent);

  (function animate() {
    requestAnimationFrame(animate);
    const t = performance.now() * 0.001;
    particles.rotation.y += 0.0004; particles.rotation.x += 0.0002;
    logoMesh.rotation.y = t*0.3+mouse.x*0.3; logoMesh.rotation.x = t*0.15+mouse.y*0.2;
    logoInner.rotation.y = -t*0.5+mouse.x*0.2; logoInner.rotation.x = -t*0.25+mouse.y*0.15;
    camera.position.x += (mouse.x*0.4-camera.position.x)*0.02;
    camera.position.y += (mouse.y*0.3-camera.position.y)*0.02;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  })();

  return { updateParticleColors };
}

/* ═══════ 2. THEME ENGINE ═══════ */
function hexToRgb(h) { return `${parseInt(h.slice(1,3),16)}, ${parseInt(h.slice(3,5),16)}, ${parseInt(h.slice(5,7),16)}`; }

function applyAccent(hex, api) {
  currentAccent = hex;
  localStorage.setItem('fh_accent', hex);
  document.documentElement.style.setProperty('--accent', hex);
  document.documentElement.style.setProperty('--accent-rgb', hexToRgb(hex));
  if (api) api.updateParticleColors(hex);
  document.querySelectorAll('.color-dot').forEach(d => d.classList.toggle('active', d.dataset.color === hex));
  document.getElementById('custom-color-input').value = hex;
  generateFavicon(hex);
}

function generateFavicon(colorHex) {
  const canvas = document.createElement('canvas');
  canvas.width = 64; canvas.height = 64;
  const ctx = canvas.getContext('2d');
  
  ctx.fillStyle = '#05060f';
  ctx.beginPath(); ctx.roundRect(0,0,64,64,16); ctx.fill();
  
  ctx.strokeStyle = colorHex; ctx.lineWidth = 4;
  ctx.beginPath();
  for (let i=0; i<6; i++) {
    const angle = Math.PI/3 * i - Math.PI/6;
    const x = 32 + 24 * Math.cos(angle);
    const y = 32 + 24 * Math.sin(angle);
    if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
  }
  ctx.closePath(); ctx.stroke();
  
  ctx.fillStyle = colorHex;
  ctx.font = 'bold 32px Inter, sans-serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('F', 32, 36);
  
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.href = canvas.toDataURL();
}

function initThemePanel(api) {
  const panel = document.getElementById('theme-panel'), btn = document.getElementById('theme-picker-btn');
  btn.addEventListener('click', e => { e.stopPropagation(); panel.classList.toggle('hidden'); });
  document.addEventListener('click', e => { if (!panel.contains(e.target) && e.target !== btn) panel.classList.add('hidden'); });
  document.querySelectorAll('.color-dot').forEach(d => d.addEventListener('click', () => applyAccent(d.dataset.color, api)));
  document.getElementById('custom-color-input').addEventListener('input', e => applyAccent(e.target.value, api));
  applyAccent(currentAccent, api);
}

/* ═══════ 3. LANGUAGE ENGINE ═══════ */
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('fh_lang', lang);
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  const dict = I18N[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => { if (dict[el.dataset.i18n]) el.textContent = dict[el.dataset.i18n]; });
  document.getElementById('lang-toggle-btn').textContent = lang === 'ar' ? 'AR' : 'EN';
  renderUpdates();
  renderServices();
  updateAge();
}

function initLangToggle() {
  document.getElementById('lang-toggle-btn').addEventListener('click', () => setLanguage(currentLang === 'en' ? 'ar' : 'en'));
  setLanguage(currentLang);
}

/* ═══════ 4. AGE CALCULATOR ═══════ */
function calcAge() {
  const bd = new Date(2006, 5, 17); // June 17, 2006
  const now = new Date();
  let age = now.getFullYear() - bd.getFullYear();
  if (now.getMonth() < bd.getMonth() || (now.getMonth() === bd.getMonth() && now.getDate() < bd.getDate())) age--;
  return age;
}

function updateAge() {
  const age = calcAge();
  const el = document.getElementById('about-age');
  const numEl = document.getElementById('about-age-num');
  if (el) el.textContent = `${age} ${I18N[currentLang].about_age_text}`;
  if (numEl) numEl.textContent = age;
}

/* ═══════ 5. UPDATES FEED ═══════ */
function renderUpdates() {
  const d = I18N[currentLang], feed = document.getElementById('updates-feed');
  const cards = [
    { tag:d.upd1_tag, title:d.upd1_title, body:d.upd1_body, date:'2026-04-21' },
    { tag:d.upd2_tag, title:d.upd2_title, body:d.upd2_body, date:'2026-04-18' },
    { tag:d.upd3_tag, title:d.upd3_title, body:d.upd3_body, date:'2026-04-15' },
  ];
  feed.innerHTML = cards.map((c,i) => `
    <div class="update-card" style="animation-delay:${i*0.12}s">
      <div class="update-card-header">
        <div class="update-avatar">FH</div>
        <div class="update-meta"><div class="update-author">Freskvv Hub</div><div class="update-date">${c.date}</div></div>
        <span class="update-tag">${c.tag}</span>
      </div>
      <div class="update-card-body"><h3>${c.title}</h3><p>${c.body}</p></div>
    </div>`).join('');
}

/* ═══════ 6. MULTI-LAYER SERVICES ═══════ */
function renderServices() {
  const grid = document.getElementById('services-grid');
  const svcs = SERVICES_DATA[currentLang];
  grid.innerHTML = svcs.map(s => `
    <div class="service-card" data-svc-id="${s.id}">
      <div class="service-card-icon">${s.icon}</div>
      <h3>${s.title}</h3>
      <p>${s.desc}</p>
      ${s.price ? `<div class="service-price" style="margin-top:12px; color:var(--accent); font-weight:700; font-size:14px;">${s.price}</div>` : ''}
      <button class="btn-apple btn-secondary" style="margin-top:20px;width:100%;font-size:14px;padding:10px;">${currentLang === 'ar' ? 'معرفة المزيد' : 'Learn More'}</button>
    </div>`).join('');

  grid.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => openCategoryOverlay(card.dataset.svcId));
  });
}

function openCategoryOverlay(id) {
  const cat = SERVICES_DATA[currentLang].find(c => c.id === id);
  if (!cat) return;
  
  const content = document.getElementById('category-content');
  content.innerHTML = `
    <div class="sub-page-hero">
      <div class="sub-page-icon">${cat.icon}</div>
      <h2 class="sub-page-title">${cat.title}</h2>
      <p class="sub-page-desc">${cat.desc}</p>
    </div>
    <div class="sub-page-features">
      ${cat.subs.map(sub => `
        <div class="feature-card glass-panel" onclick="openSubServiceDetail('${id}', '${sub.id}')">
          <div class="feature-icon">${sub.icon}</div>
          <h3 class="feature-title">${sub.name}</h3>
          <p style="font-size:12px; color:var(--text-secondary); margin-top:8px;">${sub.desc}</p>
          <button class="btn-apple btn-secondary" style="margin-top:16px; padding:6px 12px; font-size:12px;">${currentLang === 'ar' ? 'معرفة المزيد' : 'Learn More'}</button>
        </div>
      `).join('')}
    </div>
  `;
  
  document.getElementById('category-overlay').classList.remove('hidden');
}

function openSubServiceDetail(catId, subId) {
  const cat = SERVICES_DATA[currentLang].find(c => c.id === catId);
  const sub = cat.subs.find(s => s.id === subId);
  if (!sub) return;

  const content = document.getElementById('sub-detail-content');
  content.innerHTML = `
    <div class="sub-detail-hero fade-up">
      <div class="neon-icon-wrap" style="font-size: 48px; color: var(--accent); margin-bottom: 24px; text-shadow: 0 0 20px var(--accent);">
        ${sub.icon}
      </div>
      <h2 style="font-size: 24px; font-weight: 800; margin-bottom: 16px;">${sub.name}</h2>
      <p style="font-size: 15px; color: var(--text-secondary); line-height: 1.8; margin-bottom: 24px;">${sub.longDesc}</p>
      <div class="sub-detail-action" style="margin-top: 32px; display: flex; gap: 16px;">
        <button class="btn-apple btn-secondary" onclick="closeModal('sub-detail-modal')" style="flex: 1;">${currentLang === 'ar' ? 'رجوع' : 'Back'}</button>
        <button class="btn-apple btn-primary" style="flex: 2;" onclick="openOrderForm('${cat.title} — ${sub.name}')">${currentLang === 'ar' ? 'اطلب الآن' : 'Order Now'}</button>
      </div>
    </div>
  `;
  
  document.getElementById('sub-detail-modal').classList.remove('hidden');
}

function openOrderForm(serviceName) {
  currentOrderService = serviceName;
  document.getElementById('order-service-name').textContent = serviceName;
  document.getElementById('order-form').reset();
  document.getElementById('order-modal').classList.remove('hidden');
}

function closeModal(id) { 
  const el = document.getElementById(id);
  if (el.classList.contains('service-sub-page')) {
    el.classList.remove('active');
    setTimeout(() => { el.classList.add('hidden'); document.body.style.overflow = ''; }, 600);
  } else {
    el.classList.add('hidden'); 
  }
}

function initModals() {
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', e => {
      const modal = e.target.closest('.modal-overlay');
      if (modal) closeModal(modal.id);
    });
  });

  ['category-overlay', 'sub-detail-modal', 'order-modal', 'support-choice-modal', 'support-wa-modal'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', e => { if (e.target === el) closeModal(id); });
  });

  document.getElementById('order-form').addEventListener('submit', async e => {
    e.preventDefault();
    const btn = document.querySelector('#order-form button[type="submit"]');
    btn.classList.add('btn-loading');
    const name = document.getElementById('form-name').value;
    const phone = document.getElementById('form-phone').value;
    const email = document.getElementById('form-email').value;
    const type = document.getElementById('form-type').value;
    const comments = document.getElementById('form-comments').value.trim();
    const typeLabel = type === 'inquiry' ? (currentLang==='ar'?'استفسار':'Inquiry') : (currentLang==='ar'?'شراء':'Purchase');

    let msg = currentLang === 'ar'
      ? `🔹 *طلب جديد — Freskvv Hub*\n\n👤 الاسم: ${name}\n📞 الهاتف: ${phone}\n📧 الإيميل: ${email}\n📋 النوع: ${typeLabel}\n🛒 الخدمة: ${currentOrderService}`
      : `🔹 *New Order — Freskvv Hub*\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n📧 Email: ${email}\n📋 Type: ${typeLabel}\n🛒 Service: ${currentOrderService}`;
    
    if (comments) {
      msg += currentLang === 'ar' ? `\n📝 تعليق: ${comments}` : `\n📝 Comments: ${comments}`;
    }

    // Save to Firestore orders collection
    if (typeof saveOrderToFirestore === 'function') {
      await saveOrderToFirestore({ name, phone, email, type: typeLabel, service: currentOrderService, comments });
    }

    const waUrl = typeof FRESKVV_ASSETS !== 'undefined' ? `${FRESKVV_ASSETS.socials.whatsapp}?text=${encodeURIComponent(msg)}` : `https://wa.me/2001221640301?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
    
    closeModal('order-modal');
    e.target.reset();
    btn.classList.remove('btn-loading');
  });
}

/* ═══════ 7. NAV ACTIVE ═══════ */
function initNavActiveState() {
  const links = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    let cur = '';
    document.querySelectorAll('section[id]').forEach(s => { if (window.scrollY >= s.offsetTop - 200) cur = s.id; });
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${cur}`));
  });
}

/* ═══════ 8. FIXED BUTTONS ═══════ */
function initFixedButtons() {
  document.getElementById('daily-offers-btn').addEventListener('click', () => {
    alert(currentLang === 'ar' ? '🌟 ترقبوا عروضنا اليومية قريبًا!' : '🌟 Daily offers coming soon!');
  });
  // Support button now handled by admin.js for live chat
}

function injectIcons() {
  // Replace data-icon placeholders with actual icons from FRESKVV_ASSETS
  document.querySelectorAll('[data-icon]').forEach(el => {
    const iconKey = el.getAttribute('data-icon');
    if (FRESKVV_ASSETS.icons[iconKey]) {
      el.innerHTML = FRESKVV_ASSETS.icons[iconKey] + (el.innerHTML ? ' ' + el.innerHTML : '');
      el.removeAttribute('data-icon');
    }
  });
}

/* ═══════ 9. PRELOADER ═══════ */
function initPreloader() {
  const done = () => setTimeout(() => { const p = document.getElementById('preloader'); if(p) p.classList.add('done'); }, 2200);
  if (document.readyState === 'complete') {
    done();
  } else {
    window.addEventListener('load', done);
  }
}

/* ═══════ BOOT ═══════ */
/* ═══════ 10. CONTENT & TRACKING ═══════ */
async function loadContentOverrides() {
  if (typeof db === 'undefined') return;
  try {
    const snap = await db.collection('settings').doc('content_overrides').get();
    if (snap.exists) {
      const data = snap.data();
      ['internet', 'social', 'design'].forEach(id => {
        const s_en = SERVICES_DATA.en.find(s=>s.id===id);
        const s_ar = SERVICES_DATA.ar.find(s=>s.id===id);
        if (s_en) {
          if (data[`${id}_desc_en`]) s_en.desc = data[`${id}_desc_en`];
          if (data[`${id}_price_en`]) s_en.price = data[`${id}_price_en`];
          if (data[`${id}_icon`]) s_en.icon = data[`${id}_icon`];
        }
        if (s_ar) {
          if (data[`${id}_desc_ar`]) s_ar.desc = data[`${id}_desc_ar`];
          if (data[`${id}_price_ar`]) s_ar.price = data[`${id}_price_ar`];
          if (data[`${id}_icon`]) s_ar.icon = data[`${id}_icon`];
        }
      });
    }

    // Announcement Ticker
    const newsSnap = await db.collection('settings').doc('announcement').get();
    if (newsSnap.exists) {
      const d = newsSnap.data();
      const bar = document.getElementById('announcement-bar');
      const text = document.getElementById('announcement-text');
      if (bar && text) {
        text.textContent = d.text || '';
        if (d.enabled) bar.classList.remove('hidden');
        else bar.classList.add('hidden');
      }
    }

    // Asset Library
    const assetSnap = await db.collection('settings').doc('asset_library').get();
    if (assetSnap.exists) {
      const d = assetSnap.data();
      if (d.logoUrl) {
        const logos = document.querySelectorAll('.nav-logo img');
        logos.forEach(el => { el.src = d.logoUrl; });
      }
      if (d.heroUrl) {
        const hero = document.querySelector('.hero-section'); // or wherever hero bg is
        if (hero) hero.style.backgroundImage = `url(${d.heroUrl})`;
      }
    }

    // Social Links
    const socialSnap = await db.collection('settings').doc('social_links').get();
    if (socialSnap.exists) {
      const d = socialSnap.data();
      if (d.whatsapp) {
        FRESKVV_ASSETS.socials.whatsapp = `https://wa.me/${d.whatsapp.replace(/\+/g,'')}`;
        const waLinks = document.querySelectorAll('a[title="WhatsApp"]');
        waLinks.forEach(l => l.href = FRESKVV_ASSETS.socials.whatsapp);
      }
      if (d.instagram) {
        FRESKVV_ASSETS.socials.instagram = d.instagram;
        const igLinks = document.querySelectorAll('a[title="Instagram"]');
        igLinks.forEach(l => l.href = d.instagram);
      }
    }
  } catch(e) { console.error('Override error:', e); }
}

async function trackTodayVisit() {
  if (typeof db === 'undefined') return;
  const today = new Date().toISOString().split('T')[0];
  if (!sessionStorage.getItem(`visited_${today}`)) {
    sessionStorage.setItem(`visited_${today}`, 'true');
    try {
      await db.collection('settings').doc('stats').set({
        [`visits_${today}`]: firebase.firestore.FieldValue.increment(1)
      }, { merge: true });
    } catch(e) {}
  }
}

// ─── INITIALIZATION BOOT SEQUENCE ───
(async function initBootSequence() {
  try {
    initPreloader();
    document.documentElement.style.setProperty('--accent', currentAccent);
    document.documentElement.style.setProperty('--accent-rgb', hexToRgb(currentAccent));
    const api = initThreeScene();
    initThemePanel(api);
    initLangToggle();
    initNavActiveState();
    initFixedButtons();
    initModals();
    injectIcons();

    // Wait for Firebase to load content overrides before rendering
    setTimeout(async () => {
      try {
        if (typeof db !== 'undefined') {
          await loadContentOverrides();
          await trackTodayVisit();
        }
      } catch(e){}
      
      // Phase 2 requires load state first
      setLanguage(currentLang); // force re-render after content overrides load
    }, 200);

    // Phase 3: Auth + Admin + Popup Ad (deferred to let Firebase load)
    setTimeout(() => {
      try {
        if (typeof initAuth === 'function') initAuth();
        if (typeof initAdminDashboard === 'function') initAdminDashboard();
        if (typeof showPopupAd === 'function') showPopupAd();
      } catch(e) { console.warn('Admin init deferred:', e); }
    }, 500);
  } catch(e) {
    console.error('Boot error:', e);
    document.getElementById('preloader')?.classList.add('done');
  }
})();
