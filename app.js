/* ═══════════════════════════════════════════════════
   FRESKVV HUB — Application Engine v11 (Promo Codes)
   STABLE — No duplicate vars, Firestore transactions
   ═══════════════════════════════════════════════════ */

/* ─── PRELOADER ─── */
window.addEventListener('load', function () {
  setTimeout(function () { var el = document.getElementById('preloader'); if (el) el.classList.add('done'); }, 2000);
});

/* ─── GLOBALS ─── */
var FH = { admins: ['freskvvtec@gmail.com'] }; // UPDATE YOUR ADMIN EMAIL HERE
var _signUpMode = false;
var _chatUnsub = null;
var _currentLang = 'en';
var _currentTheme = 'dark';
window._currentUser = null;
window._currentPkgPrice = 0;
window._appliedPromo = null;

/* ─── Auto-Icon Map ─── */
function autoIcon(name) {
  var n = (name || '').toLowerCase();
  var map = [
    [['ai', 'artificial', 'machine', 'bot', 'robot'], 'fa-solid fa-robot'],
    [['web', 'website', 'html', 'frontend'], 'fa-solid fa-code'],
    [['design', 'graphic', 'ui', 'ux', 'paint', 'art'], 'fa-solid fa-pen-nib'],
    [['social', 'marketing', 'seo', 'media'], 'fa-solid fa-share-nodes'],
    [['internet', 'network', 'wifi', 'cloud'], 'fa-solid fa-globe'],
    [['mobile', 'app', 'phone', 'android', 'ios'], 'fa-solid fa-mobile-screen-button'],
    [['video', 'film', 'motion', 'animation'], 'fa-solid fa-video'],
    [['photo', 'camera', 'image'], 'fa-solid fa-camera'],
    [['music', 'audio', 'sound'], 'fa-solid fa-music'],
    [['seo', 'search', 'marketing'], 'fa-solid fa-chart-line'],
    [['security', 'cyber', 'hack', 'protect'], 'fa-solid fa-shield-halved'],
    [['data', 'database', 'analytics'], 'fa-solid fa-database'],
    [['game', 'gaming', 'play'], 'fa-solid fa-gamepad'],
    [['social', 'media', 'facebook', 'instagram', 'tiktok'], 'fa-solid fa-share-nodes'],
    [['server', 'hosting', 'devops'], 'fa-solid fa-server'],
    [['writing', 'content', 'blog', 'copy'], 'fa-solid fa-pen-nib'],
    [['shop', 'store', 'ecommerce', 'cart'], 'fa-solid fa-cart-shopping'],
    [['education', 'course', 'learn', 'training'], 'fa-solid fa-graduation-cap'],
    [['3d', 'render', 'model'], 'fa-solid fa-cube']
  ];
  for (var i = 0; i < map.length; i++) {
    for (var j = 0; j < map[i][0].length; j++) {
      if (n.indexOf(map[i][0][j]) !== -1) return map[i][1];
    }
  }
  return 'fa-solid fa-cubes';
}

/* ─── BOOT ─── */
document.addEventListener('DOMContentLoaded', function () {
  try { initThreeBackground(); } catch (e) { }
  try { initAuthUI(); } catch (e) { }
  try { initModals(); } catch (e) { }
  try { initButtons(); } catch (e) { }
  try { initChat(); } catch (e) { }
  try { initSystemMonitor(); } catch (e) { }
  try { initLanguageToggle(); } catch (e) { }
  try { initThemeToggle(); } catch (e) { }
  try { initPromoCode(); } catch (e) { }
  try { initForgotPassword(); } catch (e) { }
  try { initProfileEdit(); } catch (e) { }
  renderOffers();
  renderCategories();
  renderProjects();
});

/* ═══════ THREE.JS ═══════ */
function initThreeBackground() {
  var canvas = document.getElementById('three-canvas');
  if (!canvas || typeof THREE === 'undefined') return;
  var isMobile = window.innerWidth < 768;
  var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: !isMobile });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2));
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;
  var mat = new THREE.MeshBasicMaterial({ color: '#b5179e', wireframe: true, transparent: true, opacity: 0.08 });
  var mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(1.5, 1), mat);
  scene.add(mesh);
  if (!isMobile) {
    var pts = new Float32Array(80 * 3);
    for (var i = 0; i < 80 * 3; i++) pts[i] = (Math.random() - 0.5) * 12;
    var pg = new THREE.BufferGeometry();
    pg.setAttribute('position', new THREE.BufferAttribute(pts, 3));
    scene.add(new THREE.Points(pg, new THREE.PointsMaterial({ color: '#b5179e', size: 0.03, transparent: true, opacity: 0.3 })));
  }
  (function animate() { requestAnimationFrame(animate); mesh.rotation.y += 0.003; mesh.rotation.x += 0.001; renderer.render(scene, camera); })();
  window.addEventListener('resize', function () { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); });
}

/* ═══════ AUTH & OTP ═══════ */
function translateAuthError(error) {
  var code = error.code || '';
  if (code === 'auth/email-already-in-use') return 'هذا البريد الإلكتروني مسجل بالفعل، جرب تسجيل الدخول.';
  if (code === 'auth/wrong-password') return 'كلمة المرور غير صحيحة، حاول مرة أخرى.';
  if (code === 'auth/user-not-found') return 'لا يوجد حساب بهذا البريد الإلكتروني.';
  if (code === 'auth/invalid-email') return 'برجاء إدخال بريد إلكتروني صحيح.';
  if (code === 'auth/weak-password') return 'كلمة المرور ضعيفة جداً.';
  if (code === 'auth/too-many-requests') return 'محاولات كثيرة جداً، يرجى المحاولة لاحقاً.';
  if (code === 'auth/network-request-failed') return 'مشكلة في الاتصال بالإنترنت، تأكد من الشبكة.';
  return error.message || 'حدث خطأ، يرجى المحاولة مرة أخرى.';
}

function initAuthUI() {
  var form = document.getElementById('auth-form');
  var toggle = document.getElementById('auth-toggle');
  var passBtn = document.getElementById('toggle-pass');

  if (passBtn) {
    passBtn.addEventListener('click', function () {
      var inp = document.getElementById('auth-password');
      var ico = document.getElementById('pass-eye');
      if (!inp || !ico) return;
      inp.type = inp.type === 'password' ? 'text' : 'password';
      ico.className = inp.type === 'password' ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash';
    });
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      _signUpMode = !_signUpMode;
      var t = document.getElementById('auth-title');
      var s = document.getElementById('auth-subtitle');
      var f = document.getElementById('signup-fields');
      var b = document.querySelector('#auth-submit-btn span');
      if (t) t.textContent = _signUpMode ? 'Create Account' : 'Sign In';
      if (s) s.textContent = _signUpMode ? 'Join the hub' : 'Access your account';
      if (f) f.classList.toggle('show', _signUpMode);
      if (b) b.textContent = _signUpMode ? 'Sign Up' : 'Sign In';
      toggle.innerHTML = _signUpMode ? 'Already have an account? <strong>Sign In</strong>' : 'Don\'t have an account? <strong>Sign Up</strong>';
    });
  }

  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      var email = document.getElementById('auth-email').value;
      var pass = document.getElementById('auth-password').value;
      var err = document.getElementById('auth-error-msg');
      var submitBtn = document.getElementById('auth-submit-btn');

      try {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Processing...</span>';
        err.classList.add('hidden');

        var cred;
        if (_signUpMode) {
          var phone = document.getElementById('auth-phone').value;

          cred = await firebase.auth().createUserWithEmailAndPassword(email, pass);
          var fn = document.getElementById('auth-fullname');
          var un = document.getElementById('auth-username');

          await db.collection('users').doc(cred.user.uid).set({
            fullName: fn ? fn.value : '', username: un ? un.value : '',
            email: email, phone: phone || '', phoneVerified: false,
            rank: 'Bronze', balance: 0, blocked: false,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          });

          await cred.user.sendEmailVerification();
          Swal.fire({
            icon: 'success',
            title: 'تم إنشاء الحساب',
            text: 'تم إرسال رابط التوثيق إلى بريدك الإلكتروني، يرجى تفعيله.',
            confirmButtonColor: '#b5179e'
          });
        } else {
          cred = await firebase.auth().signInWithEmailAndPassword(email, pass);
        }

        document.getElementById('auth-modal').classList.add('hidden');

      } catch (ex) {
        Swal.fire({ icon: 'error', title: 'تنبيه', text: translateAuthError(ex), confirmButtonColor: '#b5179e' });
        err.classList.add('hidden'); // using swal instead
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> <span>' + (_signUpMode ? 'Sign Up' : 'Sign In') + '</span>';
      }
    });
  }

  // Verification Shield Handlers
  var vCheck = document.getElementById('verify-check-btn');
  var vResend = document.getElementById('verify-resend-btn');
  var vLogout = document.getElementById('verify-logout-btn');

  if (vCheck) vCheck.addEventListener('click', async function () {
    if (firebase.auth().currentUser) {
      vCheck.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Checking...';
      try {
        await firebase.auth().currentUser.reload();
        if (firebase.auth().currentUser.emailVerified) {
          Swal.fire({
            icon: 'success',
            title: _currentLang === 'ar' ? 'تم التفعيل!' : 'Verified!',
            text: _currentLang === 'ar' ? 'جاري تحديث البيانات...' : 'Updating your account...',
            confirmButtonColor: '#b5179e',
            timer: 2000,
            target: 'body',
            didOpen: () => { document.querySelector('.swal2-container').style.zIndex = '9999999'; }
          }).then(() => {
            location.reload();
          });
        } else {
          vCheck.innerHTML = '<i class="fa-solid fa-rotate-right"></i> Check Again';
          Swal.fire({ icon: 'info', title: 'تنبيه', text: _currentLang === 'ar' ? 'لسه مفعلتش حسابك، شيك على الإيميل' : 'Email not verified yet. Please check your inbox.', confirmButtonColor: '#b5179e', target: 'body', didOpen: () => { document.querySelector('.swal2-container').style.zIndex = '9999999'; } });
        }
      } catch (ex) {
        vCheck.innerHTML = '<i class="fa-solid fa-rotate-right"></i> Check Again';
        Swal.fire({ icon: 'error', title: 'خطأ', text: translateAuthError(ex), confirmButtonColor: '#b5179e' });
      }
    }
  });

  if (vResend) vResend.addEventListener('click', async function () {
    if (firebase.auth().currentUser) {
      vResend.disabled = true;
      try {
        await firebase.auth().currentUser.sendEmailVerification();
        Swal.fire({ icon: 'success', title: 'تم', text: 'تم إرسال رابط جديد، تفقد البريد المزعج (Spam)', confirmButtonColor: '#b5179e' });
      } catch (ex) {
        Swal.fire({ icon: 'error', title: 'خطأ', text: translateAuthError(ex), confirmButtonColor: '#b5179e' });
      } finally {
        setTimeout(function () { vResend.disabled = false; }, 30000); // Prevent spam
      }
    }
  });

  if (vLogout) vLogout.addEventListener('click', async function () {
    await firebase.auth().signOut();
    location.reload();
  });

  // Google Authentication
  var googleBtn = document.getElementById('google-auth-btn');
  if (googleBtn) {
    googleBtn.addEventListener('click', async function () {
      var err = document.getElementById('auth-error-msg');
      var provider = new firebase.auth.GoogleAuthProvider();
      try {
        err.classList.add('hidden');
        window._isAuthenticating = true;
        var result = await firebase.auth().signInWithPopup(provider);
        var user = result.user;
        var doc = await db.collection('users').doc(user.uid).get();
        if (!doc.exists) {
          await db.collection('users').doc(user.uid).set({
            fullName: user.displayName || '',
            username: user.email ? user.email.split('@')[0] : '',
            email: user.email || '',
            phone: user.phoneNumber || '',
            phoneVerified: !!user.phoneNumber,
            rank: 'Bronze', balance: 0, blocked: false,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          });
        }
        document.getElementById('auth-modal').classList.add('hidden');
      } catch (ex) {
        Swal.fire({ icon: 'error', title: 'تنبيه', text: translateAuthError(ex), confirmButtonColor: '#b5179e' });
      }
    });
  }
}

/* ─── AUTH STATE ─── */
// Create and show spinner immediately
var authSpinner = document.createElement('div');
authSpinner.id = 'auth-check-spinner';
authSpinner.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:#05060f;z-index:999999;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;transition:opacity 0.3s ease;';
authSpinner.innerHTML = '<i class="fa-solid fa-spinner fa-spin" style="font-size:48px;color:var(--accent);margin-bottom:16px;"></i><h2 style="font-size:16px;">جاري التحقق من الحساب...</h2>';
document.body.appendChild(authSpinner);

firebase.auth().onAuthStateChanged(async function (user) {
  var btn = document.getElementById('auth-login-btn');
  window._currentUser = user;

  // Handle email verification action code
  const params = new URLSearchParams(window.location.search);
  const mode = params.get('mode');
  const oobCode = params.get('oobCode');

  if (mode === 'verifyEmail' && oobCode) {
    try {
      await firebase.auth().applyActionCode(oobCode);
      window.history.replaceState(null, null, window.location.pathname);
      Swal.fire({ icon: 'success', title: 'تم التفعيل', text: 'تم تفعيل بريدك الإلكتروني بنجاح!', confirmButtonColor: '#b5179e' });
      if (user) {
        await user.reload();
      }
    } catch (e) {
      window.history.replaceState(null, null, window.location.pathname);
      Swal.fire({ icon: 'error', title: 'خطأ', text: translateAuthError(e), confirmButtonColor: '#b5179e' });
    }
  }

  if (user) {
    // If the user just verified their email (or any reload context), force a token refresh
    try { await user.reload(); } catch (e) {}
    if (user.emailVerified) {
      try { await user.getIdToken(true); } catch (e) {}
    }

    if (!user.emailVerified) {
      document.getElementById('verify-shield-modal').classList.remove('hidden');
      if (authSpinner) { authSpinner.style.opacity = '0'; setTimeout(() => authSpinner.remove(), 300); }
      return; // Stop rendering the logged-in state
    } else {
      var vShield = document.getElementById('verify-shield-modal');
      if (vShield && !vShield.classList.contains('hidden')) {
        vShield.classList.add('hidden');
        location.reload(); // Auto-reload to update permissions
      }
      if (vShield) vShield.classList.add('hidden');
    }

    if (btn) btn.innerHTML = '<span style="font-size:10px;font-weight:900;color:var(--accent)">●</span>';
    try {
      var doc = await db.collection('users').doc(user.uid).get();
      if (!doc.exists) return;
      var d = doc.data();
      if (d.blocked) {
        Swal.fire({ icon: 'error', title: 'محظور', text: 'تم إيقاف حسابك بواسطة الإدارة.', confirmButtonColor: '#b5179e' });
        await firebase.auth().signOut();
        return;
      }
      var el = function (id) { return document.getElementById(id); };
      if (el('user-fullname')) el('user-fullname').textContent = d.fullName || 'User';
      if (el('user-display-username')) el('user-display-username').textContent = '@' + (d.username || 'user');
      if (el('user-display-email')) el('user-display-email').textContent = d.email || user.email;
      if (el('user-rank-name')) el('user-rank-name').textContent = (d.rank || 'Bronze') + ' Member';

      if (el('edit-fullname')) el('edit-fullname').value = d.fullName || '';
      if (el('edit-username')) el('edit-username').value = d.username || '';
      if (el('edit-email')) el('edit-email').value = d.email || user.email;
      if (el('edit-phone')) el('edit-phone').value = d.phone || '';
    } catch (e) { console.warn('Auth UI Error:', e); }

    if (FH.admins.indexOf(user.email) !== -1) {
      var c = document.getElementById('profile-admin-container');
      if (c && !document.getElementById('nav-admin-link')) {
        var ab = document.createElement('button');
        ab.id = 'nav-admin-link'; ab.className = 'btn-apple btn-primary';
        ab.style.cssText = 'width:100%;justify-content:center;margin-bottom:8px;';
        ab.innerHTML = '<i class="fa-solid fa-shield-halved"></i> Admin Panel';
        ab.addEventListener('click', function () { window.location.href = 'admin.html'; });
        c.appendChild(ab);
      }
    }
    loadUserOrders(user.uid);
  } else {
    if (btn) btn.innerHTML = '<i class="fa-solid fa-user-astronaut"></i>';
    var ab2 = document.getElementById('nav-admin-link'); if (ab2) ab2.remove();
  }

  // Remove spinner after auth state is resolved
  if (authSpinner && authSpinner.parentNode) {
    authSpinner.style.opacity = '0';
    setTimeout(() => { if (authSpinner.parentNode) authSpinner.remove(); }, 300);
  }
});

/* ═══════ HIERARCHY RENDERING ═══════ */
function renderCategories() {
  var grid = document.getElementById('hierarchy-grid');
  var title = document.getElementById('hierarchy-title');
  var sub = document.getElementById('hierarchy-subtitle');
  var bc = document.getElementById('hierarchy-breadcrumb');
  if (!grid) return;
  if (title) title.textContent = 'Select Category';
  if (sub) sub.textContent = 'Choose a category to explore our services.';
  if (bc) bc.style.display = 'none';
  try {
    db.collection('categories').get().then(function (snap) {
      if (snap.empty) { grid.innerHTML = '<p style="opacity:.4;text-align:center;grid-column:1/-1;">No categories available.</p>'; return; }
      grid.innerHTML = snap.docs.map(function (doc) {
        var c = doc.data();
        return '<div class="pkg-card glass-panel" style="cursor:pointer;" onclick="renderServices(\'' + doc.id + '\', \'' + c.name.replace(/'/g, "\\'") + '\')">' +
          '<div class="pkg-icon"><i class="' + autoIcon(c.name) + '"></i></div>' +
          '<h3 class="pkg-title">' + c.name + '</h3>' +
          '<p style="font-size:13px; color:var(--text-secondary); margin-top:10px;">' + (c.description || '') + '</p>' +
          '</div>';
      }).join('');
    });
  } catch (e) { console.warn('Categories:', e); }
}

window.renderServices = function (catId, catName) {
  var grid = document.getElementById('hierarchy-grid');
  var title = document.getElementById('hierarchy-title');
  var sub = document.getElementById('hierarchy-subtitle');
  var bc = document.getElementById('hierarchy-breadcrumb');
  if (title) title.textContent = catName;
  if (sub) sub.textContent = 'Select a service from this category.';
  if (bc) bc.style.display = 'flex';
  document.getElementById('bc-cat').onclick = renderCategories;
  document.getElementById('bc-sep1').classList.remove('hidden');
  document.getElementById('bc-ser').classList.add('hidden');
  try {
    db.collection('services').where('categoryID', '==', catId).get().then(function (snap) {
      if (snap.empty) { grid.innerHTML = '<p style="opacity:.4;text-align:center;grid-column:1/-1;">No services in this category.</p>'; return; }
      grid.innerHTML = snap.docs.map(function (doc) {
        var s = doc.data();
        var displayName = _currentLang === 'ar' ? (s.name_ar || s.name_en || s.name) : (s.name_en || s.name);
        return '<div class="pkg-card glass-panel" style="cursor:pointer;" onclick="renderPackages(\'' + doc.id + '\', \'' + displayName.replace(/'/g, "\\'") + '\', \'' + catName.replace(/'/g, "\\'") + '\')">' +
          '<div class="pkg-icon"><i class="' + (s.icon || 'fa-solid fa-briefcase') + '"></i></div>' +
          '<h3 class="pkg-title">' + displayName + '</h3></div>';
      }).join('');
    });
  } catch (e) { }
};

window.renderPackages = function (serId, serName, catName) {
  var grid = document.getElementById('hierarchy-grid');
  var title = document.getElementById('hierarchy-title');
  var sub = document.getElementById('hierarchy-subtitle');
  if (title) title.textContent = serName + ' Packages';
  if (sub) sub.textContent = 'Compare features and select the right plan.';
  document.getElementById('bc-ser').classList.remove('hidden');
  document.getElementById('bc-ser').textContent = serName;
  document.getElementById('bc-ser').style.color = 'var(--accent)';
  try {
    db.collection('packages').where('serviceID', '==', serId).get().then(function (snap) {
      if (snap.empty) { grid.innerHTML = '<p style="opacity:.4;text-align:center;grid-column:1/-1;">No packages yet.</p>'; return; }
      var docs = snap.docs.map(function (d) { var data = d.data(); data.id = d.id; return data; });
      docs.sort(function (a, b) { return (a.price || 0) - (b.price || 0); });
      grid.innerHTML = docs.map(function (p) {
        var features = (p.features || []).map(function (f) { return '<li><i class="fa-solid fa-check"></i> ' + f + '</li>'; }).join('');
        return '<div class="pkg-card glass-panel">' +
          '<h3 class="pkg-title">' + p.name + '</h3>' +
          '<div class="pkg-price">$' + (p.price || '0') + '</div>' +
          '<ul class="pkg-features">' + features + '</ul>' +
          '<button class="btn-apple btn-primary pkg-btn" onclick="window.selectPackage(\'' + (p.name + ' - ' + serName).replace(/'/g, "\\'") + '\', ' + (p.price || 0) + ', \'' + serId + '\')"><i class="fa-solid fa-rocket"></i> Select Plan</button>' +
          '</div>';
      }).join('');
    });
  } catch (e) { }
};

window.selectPackage = function (name, price, serviceId) {
  var user = firebase.auth().currentUser;
  if (!user) { document.getElementById('auth-modal').classList.remove('hidden'); return; }
  var el = document.getElementById('order-service-name');
  if (el) el.textContent = name;
  window._currentPkgPrice = price;
  window._appliedPromo = null;
  window._orderServiceId = serviceId || '';
  updatePriceDisplay(price);
  // Reset promo UI
  var fb = document.getElementById('promo-feedback');
  var pc = document.getElementById('order-promo-code');
  if (fb) { fb.style.display = 'none'; fb.textContent = ''; }
  if (pc) pc.value = '';
  document.getElementById('order-modal').classList.remove('hidden');
};

function updatePriceDisplay(finalPrice) {
  var dep = document.getElementById('deposit-amount');
  var tp = document.getElementById('order-total-price');
  var di = document.getElementById('order-discount-info');
  var deposit = (finalPrice * 0.3).toFixed(2);
  if (dep) dep.textContent = '$' + deposit + ' (30%)';
  if (tp) tp.textContent = '$' + finalPrice.toFixed(2);
  if (di && window._appliedPromo) {
    di.style.display = 'block';
    di.textContent = '✓ Promo applied: -' + (window._appliedPromo.type === 'percent' ? window._appliedPromo.value + '%' : '$' + window._appliedPromo.value);
  } else if (di) { di.style.display = 'none'; }
}

/* ═══════ PROMO CODE SYSTEM ═══════ */
function initPromoCode() {
  var btn = document.getElementById('apply-promo-btn');
  if (!btn) return;
  btn.addEventListener('click', async function () {
    var inp = document.getElementById('order-promo-code');
    var fb = document.getElementById('promo-feedback');
    if (!inp || !fb) return;
    var code = inp.value.trim().toUpperCase();
    if (!code) { fb.style.display = 'block'; fb.style.color = '#f43f5e'; fb.textContent = 'Enter a promo code.'; return; }
    fb.style.display = 'block'; fb.style.color = '#f59e0b'; fb.textContent = 'Validating...';
    try {
      var snap = await db.collection('promoCodes').where('code', '==', code).limit(1).get();
      if (snap.empty) { fb.style.color = '#f43f5e'; fb.textContent = 'Invalid promo code.'; return; }
      var promoDoc = snap.docs[0];
      var promo = promoDoc.data();
      if (promo.used) { fb.style.color = '#f43f5e'; fb.textContent = 'This code has already been used.'; return; }
      // Apply discount
      var originalPrice = window._currentPkgPrice;
      var discount = 0;
      if (promo.discountType === 'percent') { discount = originalPrice * (promo.discountValue / 100); }
      else { discount = promo.discountValue; }
      var finalPrice = Math.max(0, originalPrice - discount);
      window._appliedPromo = { id: promoDoc.id, code: code, type: promo.discountType, value: promo.discountValue };
      updatePriceDisplay(finalPrice);
      fb.style.color = '#22c55e';
      fb.textContent = '✓ Code applied! You save $' + discount.toFixed(2);
    } catch (e) { fb.style.color = '#f43f5e'; fb.textContent = 'Error: ' + e.message; }
  });
}

/* ═══════ OFFERS ═══════ */
function renderOffers() {
  var grid = document.getElementById('offers-grid');
  if (!grid) return;
  
  if (window._offersTimer) clearInterval(window._offersTimer);
  
  db.collection('offers').onSnapshot(function(snap) {
    if (snap.empty) { 
      grid.innerHTML = '<div class="offer-empty"><i class="fa-solid fa-hourglass-half fa-bounce"></i><h3>سيتم توفير العروض قريباً 🚀 ... نحن نجهز لك باقات حصرية ومفاجآت لا تُفوت!</h3></div>';
      return; 
    }
    
    var activeOffers = [];
    var now = new Date().getTime();
    
    snap.docs.forEach(function(doc) {
      var o = doc.data();
      var expTime = o.expirationDate ? new Date(o.expirationDate).getTime() : 0;
      if (expTime > now) {
        o.id = doc.id;
        o.expTime = expTime;
        activeOffers.push(o);
      }
    });
    
    if (activeOffers.length === 0) {
      grid.innerHTML = '<div class="offer-empty"><i class="fa-solid fa-hourglass-half fa-bounce"></i><h3>سيتم توفير العروض قريباً 🚀 ... نحن نجهز لك باقات حصرية ومفاجآت لا تُفوت!</h3></div>';
      return;
    }
    
    grid.innerHTML = activeOffers.map(function(o) {
      var displayTitle = _currentLang === 'ar' ? (o.title_ar || o.title_en || o.title) : (o.title_en || o.title);
      var displayDesc = _currentLang === 'ar' ? (o.description_ar || o.description_en || o.description || '') : (o.description_en || o.description || '');
      var btnText = _currentLang === 'ar' ? 'أطلب العرض الآن' : 'Claim Offer Now';
      
      return '<div class="offer-card" id="offer-' + o.id + '">' +
        '<h3 style="font-size:20px;font-weight:800;margin-bottom:8px;">' + displayTitle + '</h3>' +
        '<p style="font-size:13px;opacity:0.7;margin-bottom:16px;">' + displayDesc + '</p>' +
        '<div class="offer-price-container">' +
          '<span class="offer-original-price">$' + o.originalPrice + '</span>' +
          '<span class="offer-sale-price">$' + o.salePrice + '</span>' +
        '</div>' +
        '<div class="offer-timer" id="timer-' + o.id + '">--:--:--:--</div>' +
        '<button class="offer-claim-btn" onclick="window.selectPackage(\'' + displayTitle.replace(/'/g,"\\'") + ' (Offer)\', ' + o.salePrice + ', \'offer\')"><i class="fa-solid fa-bolt"></i> ' + btnText + '</button>' +
      '</div>';
    }).join('');
    
    // Start countdowns
    window._offersTimer = setInterval(function() {
      var currentTime = new Date().getTime();
      var anyExpired = false;
      
      activeOffers.forEach(function(o) {
        var el = document.getElementById('timer-' + o.id);
        if (!el) return;
        var diff = o.expTime - currentTime;
        
        if (diff <= 0) {
          el.textContent = 'EXPIRED';
          document.getElementById('offer-' + o.id).style.opacity = '0.4';
          document.getElementById('offer-' + o.id).style.pointerEvents = 'none';
          anyExpired = true;
        } else {
          var d = Math.floor(diff / (1000 * 60 * 60 * 24));
          var h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          var m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          var s = Math.floor((diff % (1000 * 60)) / 1000);
          el.textContent = (d < 10 ? '0'+d : d) + 'd ' + (h < 10 ? '0'+h : h) + 'h ' + (m < 10 ? '0'+m : m) + 'm ' + (s < 10 ? '0'+s : s) + 's';
        }
      });
      
      if (anyExpired) {
        // Optionally refresh list if needed
      }
    }, 1000);
    
  });
}

/* ═══════ PROJECTS ═══════ */
function renderProjects() {
  var feed = document.getElementById('projects-feed');
  if (!feed) return;
  try {
    db.collection('projects').orderBy('createdAt', 'desc').limit(6).get().then(function (snap) {
      if (snap.empty) { feed.innerHTML = '<p style="opacity:.4;text-align:center;grid-column:1/-1;">Coming soon.</p>'; return; }
      feed.innerHTML = snap.docs.map(function (doc) { var p = doc.data(); return '<div class="project-card"><img src="' + p.image + '" alt=""><h3>' + p.title + '</h3></div>'; }).join('');
    });
  } catch (e) { }
}

/* ═══════ ORDERS ═══════ */
function loadUserOrders(uid) {
  var list = document.getElementById('profile-orders-list');
  if (!list) return;
  try {
    db.collection('orders').where('uid', '==', uid).orderBy('createdAt', 'desc').limit(10).onSnapshot(function (snap) {
      if (snap.empty) { list.innerHTML = '<p style="opacity:.3;padding:10px;font-size:12px;">No orders yet.</p>'; return; }
      list.innerHTML = snap.docs.map(function (doc) {
        var o = doc.data(); var c = '#f59e0b';
        if (o.status === 'In Progress') c = '#3b82f6';
        if (o.status === 'Completed') c = '#22c55e';
        if (o.status === 'Cancelled') c = '#f43f5e';
        var date = o.createdAt ? new Date(o.createdAt.toDate()).toLocaleDateString() : '';
        return '<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 12px;border-bottom:1px solid rgba(255,255,255,0.04);font-size:12px;">' +
          '<div><strong style="font-size:13px;">' + (o.serviceName || 'N/A') + '</strong>' +
          '<div style="opacity:0.4;margin-top:2px;">' + date + '</div></div>' +
          '<span style="background:' + c + '20;color:' + c + ';padding:3px 12px;border-radius:20px;font-size:10px;font-weight:800;">' + (o.status || 'Pending') + '</span></div>';
      }).join('');
    });
  } catch (e) { console.warn('Orders:', e); }
}

/* ═══════ SYSTEM MONITOR ═══════ */
function initSystemMonitor() {
  db.collection('settings').doc('core').onSnapshot(function (doc) {
    if (!doc.exists) return; var s = doc.data();
    var ov = document.getElementById('maintenance-overlay');
    if (ov) {
      if (s.maintenanceMode) { var u = firebase.auth().currentUser; if (!u || FH.admins.indexOf(u.email) === -1) ov.classList.remove('hidden'); else ov.classList.add('hidden'); }
      else ov.classList.add('hidden');
    }
    if (s.announcement) { var a = document.getElementById('announcement-text'); var b = document.getElementById('announcement-bar'); if (a) a.textContent = s.announcement; if (b) b.classList.remove('hidden'); }
    if (s.siteTitle) document.title = s.siteTitle;
    var adBanner = document.getElementById('home-ads-banner');
    var adImg = document.getElementById('home-ads-img');
    if (s.homeBanner) {
      if (adImg) adImg.src = s.homeBanner;
      if (adBanner) { adBanner.href = s.homeBannerLink || '#'; adBanner.style.display = 'block'; }
    } else { if (adBanner) adBanner.style.display = 'none'; }
  });
}

/* ═══════ CHAT ═══════ */
function initChat() {
  var form = document.getElementById('user-chat-form');
  if (form) form.addEventListener('submit', function (e) { e.preventDefault(); sendMsg(); });
}
function loadLiveChat() {
  var user = firebase.auth().currentUser; var box = document.getElementById('user-chat-messages');
  if (!user || !box) return;
  if (_chatUnsub) _chatUnsub();
  _chatUnsub = db.collection('chats').doc(user.uid).collection('messages').orderBy('timestamp', 'asc').onSnapshot(function (snap) {
    box.innerHTML = snap.docs.map(function (d) {
      var m = d.data(); var me = m.sender === user.uid;
      return '<div class="chat-msg ' + (me ? 'msg-me' : 'msg-them') + '"><div class="msg-bubble">' + m.text + '</div></div>';
    }).join('');
    box.scrollTop = box.scrollHeight;
  });
}
function sendMsg() {
  var user = firebase.auth().currentUser; var inp = document.getElementById('user-chat-input');
  if (!user || !inp) return; var t = inp.value.trim(); if (!t) return;
  db.collection('chats').doc(user.uid).set({ lastUpdate: firebase.firestore.FieldValue.serverTimestamp(), userEmail: user.email }, { merge: true });
  db.collection('chats').doc(user.uid).collection('messages').add({ text: t, sender: user.uid, timestamp: firebase.firestore.FieldValue.serverTimestamp() });
  inp.value = '';
}

/* ═══════ MODALS & BUTTONS ═══════ */
function initModals() { document.querySelectorAll('.modal-close').forEach(function (b) { b.addEventListener('click', function () { var m = b.closest('.modal-overlay'); if (m) m.classList.add('hidden'); }); }); }
function initButtons() {
  var login = document.getElementById('auth-login-btn');
  if (login) login.addEventListener('click', function () { if (firebase.auth().currentUser) document.getElementById('profile-modal').classList.remove('hidden'); else document.getElementById('auth-modal').classList.remove('hidden'); });
  var logout = document.getElementById('auth-logout-btn');
  if (logout) logout.addEventListener('click', function () { firebase.auth().signOut().then(function () { localStorage.clear(); document.getElementById('profile-modal').classList.add('hidden'); }); });
  var support = document.getElementById('support-btn');
  if (support) support.addEventListener('click', function () { if (firebase.auth().currentUser) { document.getElementById('live-chat-panel').classList.remove('hidden'); loadLiveChat(); } else { document.getElementById('auth-modal').classList.remove('hidden'); } });
  var chatClose = document.getElementById('chat-panel-close');
  if (chatClose) chatClose.addEventListener('click', function () { document.getElementById('live-chat-panel').classList.add('hidden'); });

  var orderForm = document.getElementById('order-form');
  if (orderForm) orderForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    var user = firebase.auth().currentUser; if (!user) return;
    var sn = document.getElementById('order-service-name');
    var sNumber = document.getElementById('order-sender-number');
    var sName = document.getElementById('order-sender-name');
    var originalPrice = window._currentPkgPrice;
    var finalPrice = originalPrice;

    try {
      // If promo code applied, use Firestore transaction to mark it as used
      if (window._appliedPromo) {
        var promoRef = db.collection('promoCodes').doc(window._appliedPromo.id);
        await db.runTransaction(async function (transaction) {
          var promoSnap = await transaction.get(promoRef);
          if (!promoSnap.exists) throw new Error('Promo code not found.');
          if (promoSnap.data().used) throw new Error('Promo code already used.');
          transaction.update(promoRef, { used: true, usedBy: user.uid, usedAt: firebase.firestore.FieldValue.serverTimestamp() });
        });
        var discount = window._appliedPromo.type === 'percent' ? originalPrice * (window._appliedPromo.value / 100) : window._appliedPromo.value;
        finalPrice = Math.max(0, originalPrice - discount);
      }

      await db.collection('orders').add({
        uid: user.uid, userEmail: user.email,
        serviceName: sn ? sn.textContent : '',
        senderNumber: sNumber ? sNumber.value : '',
        senderName: sName ? sName.value : '',
        originalPrice: originalPrice, finalPrice: finalPrice,
        promoCode: window._appliedPromo ? window._appliedPromo.code : null,
        status: 'Pending',
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });

      // Auto message
      await db.collection('chats').doc(user.uid).set({ lastUpdate: firebase.firestore.FieldValue.serverTimestamp(), userEmail: user.email }, { merge: true });
      await db.collection('chats').doc(user.uid).collection('messages').add({
        text: 'Order received for ' + (sn ? sn.textContent : '') + '. Verification in progress (Response < 24h).',
        sender: 'admin', timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });

      if (sNumber) sNumber.value = '';
      if (sName) sName.value = '';
      window._appliedPromo = null;
      
      document.getElementById('order-modal').classList.add('hidden');
      
      Swal.fire({
        title: _currentLang === 'ar' ? 'جاري المعالجة... ⏳' : 'Processing... ⏳',
        html: _currentLang === 'ar' ? 'يرجى الانتظار بينما نقوم بتجهيز طلبك' : 'Please wait while we process your order',
        allowOutsideClick: false,
        didOpen: () => { Swal.showLoading(); }
      });
      
      setTimeout(() => {
        Swal.fire({
          icon: 'success',
          title: _currentLang === 'ar' ? 'تم بنجاح! 🎉' : 'Success! 🎉',
          text: _currentLang === 'ar' ? 'جاري تجهيز طلبك.. شكراً لثقتك في Freskvv Tec!' : 'Processing your order.. Thank you for choosing Freskvv Tec!',
          confirmButtonColor: '#22c55e',
          timer: 3000,
          timerProgressBar: true
        }).then(() => {
          document.getElementById('live-chat-panel').classList.remove('hidden');
          loadLiveChat();
        });
      }, 1500);
    } catch (ex) { alert('Error: ' + ex.message); }
  });
}

/* ═══════ THEME & LANG ═══════ */
function initLanguageToggle() {
  var btn = document.getElementById('lang-toggle-btn');
  if (!btn) return;
  
  var savedLang = localStorage.getItem('fh_lang') || 'en';
  _currentLang = savedLang;
  
  function applyLang() {
    btn.innerHTML = '<i class="fa-solid fa-globe"></i> ' + (_currentLang === 'en' ? 'عربية' : 'EN');
    document.documentElement.dir = _currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = _currentLang;
    document.querySelectorAll('[data-en]').forEach(function (el) { 
      var arText = el.getAttribute('data-ar');
      var enText = el.getAttribute('data-en');
      if (_currentLang === 'ar' && arText) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = arText;
        else el.innerHTML = arText;
      } else if (enText) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = enText;
        else el.innerHTML = enText;
      }
    });
  }
  
  applyLang();

  btn.addEventListener('click', function () {
    _currentLang = _currentLang === 'en' ? 'ar' : 'en';
    localStorage.setItem('fh_lang', _currentLang);
    applyLang();
    // Re-render dynamic content to reflect the new language
    if (typeof renderOffers === 'function') renderOffers();
    if (typeof renderCategories === 'function') renderCategories();
  });
}

function initThemeToggle() {
  var btn = document.getElementById('theme-toggle-btn');
  if (!btn) return;
  btn.addEventListener('click', function () {
    _currentTheme = _currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', _currentTheme);
    btn.innerHTML = _currentTheme === 'dark' ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
  });
}

/* ═══════ FORGOT PASSWORD ═══════ */
function initForgotPassword() {
  var btn = document.getElementById('forgot-pass-btn');
  if (!btn) return;
  btn.addEventListener('click', async function () {
    var email = document.getElementById('auth-email').value;
    if (!email) { alert('Enter your email address first.'); return; }
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      Swal.fire({ icon: 'success', title: 'تم الإرسال', text: 'تم إرسال رابط إعادة تعيين كلمة المرور إلى ' + email + '. تحقق من صندوق الوارد الخاص بك.', confirmButtonColor: '#b5179e' });
    } catch (e) { Swal.fire({ icon: 'error', title: 'خطأ', text: translateAuthError(e), confirmButtonColor: '#b5179e' }); }
  });
}

/* ═══════ EDIT PROFILE ═══════ */
function initProfileEdit() {
  var btn = document.getElementById('save-profile-btn');
  if (!btn) return;
  btn.addEventListener('click', async function () {
    var user = firebase.auth().currentUser;
    if (!user) return;

    var fn = document.getElementById('edit-fullname').value;
    var un = document.getElementById('edit-username').value;
    var em = document.getElementById('edit-email').value;
    var ph = document.getElementById('edit-phone').value;

    try {
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';
      var oldDoc = await db.collection('users').doc(user.uid).get();
      var oldData = oldDoc.data() || {};

      var updates = { fullName: fn, username: un };

      if (em && em !== user.email) {
        await user.updateEmail(em);
        updates.email = em;
      }

      if (ph && ph !== oldData.phone) {
        updates.phone = ph;
      }

      await db.collection('users').doc(user.uid).update(updates);

      var el = document.getElementById('user-fullname');
      if (el && fn) el.textContent = fn;
      var el2 = document.getElementById('user-display-username');
      if (el2 && un) el2.textContent = '@' + un;
      var el3 = document.getElementById('user-display-email');
      if (el3 && em) el3.textContent = em;
      
      Swal.fire({ icon: 'success', title: _currentLang === 'ar' ? 'تم' : 'Success', text: _currentLang === 'ar' ? 'تم تحديث الملف الشخصي بنجاح!' : 'Profile updated successfully!', confirmButtonColor: '#b5179e' });
    } catch (ex) {
      var msg = translateAuthError(ex);
      if (ex.code === 'auth/requires-recent-login') {
        msg = _currentLang === 'ar' ? 'يرجى تسجيل الخروج ثم الدخول مرة أخرى لتغيير البريد الإلكتروني.' : 'Please logout and login again to change your email.';
      }
      Swal.fire({ icon: 'error', title: 'خطأ', text: msg, confirmButtonColor: '#b5179e' });
    } finally {
      btn.innerHTML = '<i class="fa-solid fa-save"></i> ' + (_currentLang === 'ar' ? 'حفظ التعديلات' : 'Save Changes');
    }
  });
}
