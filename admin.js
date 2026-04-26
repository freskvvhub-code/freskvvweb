/* ═══════════════════════════════════════════════════
   FRESKVV HUB — Admin Module v11 (Promo Codes)
   ═══════════════════════════════════════════════════ */

window._aChatUnsub = null;
window._aActiveUid = null;
var _ADMIN_OK = ['admin@freskvvhub.com', 'fares@freskvv.com'];

/* ─── Admin Guard ─── */
function adminGuard() {
  var u = firebase.auth().currentUser;
  if (!u || _ADMIN_OK.indexOf(u.email) === -1) { alert('Permission denied.'); return false; }
  return true;
}

/* ─── Auto-Icon Map ─── */
function autoIcon(name) {
  var n = (name || '').toLowerCase();
  var map = [
    [['ai','artificial','machine','bot','robot'], 'fa-solid fa-robot'],
    [['web','website','html','frontend'], 'fa-solid fa-code'],
    [['design','graphic','ui','ux','paint','art'], 'fa-solid fa-pen-nib'],
    [['social','marketing','seo','media'], 'fa-solid fa-share-nodes'],
    [['internet','network','wifi','cloud'], 'fa-solid fa-globe'],
    [['mobile','app','phone','android','ios'], 'fa-solid fa-mobile-screen-button'],
    [['video','film','motion','animation'], 'fa-solid fa-video'],
    [['photo','camera','image'], 'fa-solid fa-camera'],
    [['music','audio','sound'], 'fa-solid fa-music'],
    [['seo','search','marketing'], 'fa-solid fa-chart-line'],
    [['security','cyber','hack','protect'], 'fa-solid fa-shield-halved'],
    [['data','database','analytics'], 'fa-solid fa-database'],
    [['game','gaming','play'], 'fa-solid fa-gamepad'],
    [['social','media','facebook','instagram','tiktok'], 'fa-solid fa-share-nodes'],
    [['server','hosting','devops'], 'fa-solid fa-server'],
    [['writing','content','blog','copy'], 'fa-solid fa-pen-nib'],
    [['shop','store','ecommerce','cart'], 'fa-solid fa-cart-shopping'],
    [['education','course','learn','training'], 'fa-solid fa-graduation-cap'],
    [['3d','render','model'], 'fa-solid fa-cube']
  ];
  for (var i = 0; i < map.length; i++) {
    for (var j = 0; j < map[i][0].length; j++) {
      if (n.indexOf(map[i][0][j]) !== -1) return map[i][1];
    }
  }
  return 'fa-solid fa-cubes';
}

function initAdmin() {
  try { loadStats(); } catch(e) {}
  try { loadSysSettings(); } catch(e) {}
  try { listenUnread(); } catch(e) {}
  try { loadAdminCategories(); } catch(e) {}
  var logout = document.getElementById('admin-logout-btn');
  if (logout) logout.addEventListener('click', function() {
    firebase.auth().signOut().then(function() { localStorage.clear(); window.location.href = 'index.html'; });
  });
  var chatForm = document.getElementById('wa-chat-form');
  if (chatForm) chatForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if (!window._aActiveUid) return;
    var inp = document.getElementById('wa-chat-input'); if (!inp) return;
    var t = inp.value.trim(); if (!t) return;
    db.collection('chats').doc(window._aActiveUid).collection('messages').add({ text: t, sender: 'admin', timestamp: firebase.firestore.FieldValue.serverTimestamp() });
    inp.value = '';
  });
}

/* ═══════ STATS ═══════ */
async function loadStats() {
  try {
    var u = await db.collection('users').get();
    var o = await db.collection('orders').get();
    var p = await db.collection('packages').get();
    var el = function(id) { return document.getElementById(id); };
    if (el('stat-users')) el('stat-users').textContent = u.size;
    if (el('stat-orders')) el('stat-orders').textContent = o.size;
    if (el('stat-packages')) el('stat-packages').textContent = p.size;
  } catch(e) { console.error('Stats:', e); }
}

/* ═══════ UNREAD ═══════ */
function listenUnread() {
  db.collection('chats').onSnapshot(function(snap) {
    var badge = document.getElementById('unread-badge');
    if (badge) { badge.textContent = snap.size; badge.classList.toggle('show', snap.size > 0); }
  });
}

/* ═══════ HIERARCHY CRUD ═══════ */
var _catUnsub = null;
function loadAdminCategories() {
  var list = document.getElementById('cat-admin-list');
  var sel = document.getElementById('srv-cat-select');
  if (!list) return;
  // Use onSnapshot for real-time updates so dropdown always stays current
  if (_catUnsub) _catUnsub();
  _catUnsub = db.collection('categories').onSnapshot(function(snap) {
    if (snap.empty) {
      list.innerHTML = '<p style="opacity:.4;font-size:12px;">No categories yet. Add one above.</p>';
      if(sel) sel.innerHTML = '<option value="">Create a category first</option>';
      return;
    }
    var opts = '<option value="">Select Category...</option>';
    list.innerHTML = snap.docs.map(function(doc) {
      var c = doc.data();
      opts += '<option value="' + doc.id + '">' + c.name + '</option>';
      return '<div class="pkg-admin-item" style="display:flex;justify-content:space-between;align-items:center;padding:10px;"><div><i class="' + autoIcon(c.name) + '" style="color:var(--accent);margin-right:8px;"></i><strong>' + c.name + '</strong></div><button class="abtn danger" style="padding:6px 12px;font-size:10px;" onclick="delCategory(\'' + doc.id + '\')"><i class="fa-solid fa-trash"></i></button></div>';
    }).join('');
    if(sel) {
      var prev = sel.value;
      sel.innerHTML = opts;
      sel.onchange = function() { loadAdminServices(this.value); };
      // Restore previous selection if still valid
      if (prev) { sel.value = prev; }
    }
  }, function(e) { console.error('Categories listener:', e); });
}

window.saveCategory = async function() {
  if (!adminGuard()) return;
  var name = document.getElementById('cat-name'); var desc = document.getElementById('cat-desc');
  if (!name || !name.value) return alert('Name required');
  try { var id = name.value.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    await db.collection('categories').doc(id).set({ name: name.value, description: desc ? desc.value : '' });
    name.value = ''; if(desc) desc.value = '';
    // No need to call loadAdminCategories — onSnapshot handles it automatically
  } catch(e) { alert(e.message); }
};
window.delCategory = async function(id) { if (!adminGuard()) return; if(!confirm('Delete category?')) return; try { await db.collection('categories').doc(id).delete(); } catch(e) { alert(e.message); } };

async function loadAdminServices(catId) {
  var list = document.getElementById('srv-admin-list'); var sel = document.getElementById('pkg-srv-select');
  if (!list) return;
  if (!catId) { list.innerHTML = ''; if(sel) sel.innerHTML = '<option value="">Select Service First</option>'; return; }
  try {
    var snap = await db.collection('services').where('categoryID', '==', catId).get();
    if (snap.empty) { list.innerHTML = '<p style="opacity:.4;font-size:12px;">No services.</p>'; if(sel) sel.innerHTML = '<option value="">Create a service first</option>'; return; }
    var opts = '<option value="">Select Service...</option>';
    list.innerHTML = snap.docs.map(function(doc) {
      var s = doc.data(); opts += '<option value="' + doc.id + '">' + s.name + '</option>';
      return '<div class="pkg-admin-item" style="display:flex;justify-content:space-between;align-items:center;padding:10px;"><div><strong><i class="' + s.icon + '"></i> ' + s.name + '</strong></div><button class="abtn danger" style="padding:6px 12px;font-size:10px;" onclick="delService(\'' + doc.id + '\',\'' + catId + '\')"><i class="fa-solid fa-trash"></i></button></div>';
    }).join('');
    if(sel) { sel.innerHTML = opts; sel.onchange = function() { loadAdminPackages(this.value); }; }
  } catch(e) { console.error('Services:', e); }
}
window.saveService = async function() { if (!adminGuard()) return; var catId = document.getElementById('srv-cat-select').value; var name = document.getElementById('srv-name'); var icon = document.getElementById('srv-icon'); if (!catId || !name.value) return alert('Category and Name required'); var iconVal = (icon && icon.value.trim()) ? icon.value.trim() : autoIcon(name.value); try { await db.collection('services').add({ categoryID: catId, name: name.value, icon: iconVal }); name.value = ''; if(icon) icon.value = ''; loadAdminServices(catId); } catch(e) { alert(e.message); } };
window.delService = async function(id, catId) { if (!adminGuard()) return; if(!confirm('Delete service?')) return; try { await db.collection('services').doc(id).delete(); loadAdminServices(catId); } catch(e) { alert(e.message); } };

async function loadAdminPackages(serId) {
  var list = document.getElementById('pkg-admin-list');
  if (!list) return; if (!serId) { list.innerHTML = ''; return; }
  try {
    var snap = await db.collection('packages').where('serviceID', '==', serId).get();
    if (snap.empty) { list.innerHTML = '<p style="opacity:.4;font-size:12px;">No packages.</p>'; return; }
    list.innerHTML = snap.docs.map(function(doc) { var p = doc.data();
      return '<div class="pkg-admin-item" style="display:flex;justify-content:space-between;align-items:center;padding:10px;"><div><strong>' + p.name + '</strong> <span style="color:var(--accent);margin-left:8px;">$' + p.price + '</span></div><button class="abtn danger" style="padding:6px 12px;font-size:10px;" onclick="delAdminPackage(\'' + doc.id + '\',\'' + serId + '\')"><i class="fa-solid fa-trash"></i></button></div>';
    }).join('');
  } catch(e) { console.error('Packages:', e); }
}
window.saveAdminPackage = async function() { if (!adminGuard()) return; var serId = document.getElementById('pkg-srv-select').value; var name = document.getElementById('pkg-name'); var price = document.getElementById('pkg-price'); var feats = document.getElementById('pkg-features'); if (!serId || !name.value || !price.value) return alert('Service, Name, Price required'); try { var fl = feats && feats.value ? feats.value.split('\n').filter(function(f){return f.trim();}) : []; await db.collection('packages').add({ serviceID: serId, name: name.value, price: parseFloat(price.value) || 0, features: fl }); name.value=''; price.value=''; if(feats) feats.value=''; loadAdminPackages(serId); } catch(e) { alert(e.message); } };
window.delAdminPackage = async function(id, serId) { if (!adminGuard()) return; if(!confirm('Delete package?')) return; try { await db.collection('packages').doc(id).delete(); loadAdminPackages(serId); } catch(e) { alert(e.message); } };

/* ═══════ PROJECTS CRUD ═══════ */
async function loadProjectsAdmin() {
  var grid = document.getElementById('proj-admin-list'); if (!grid) return;
  try { var snap = await db.collection('projects').orderBy('createdAt','desc').get();
    if (snap.empty) { grid.innerHTML = '<p style="opacity:.4">No projects.</p>'; return; }
    grid.innerHTML = snap.docs.map(function(doc) { var p = doc.data(); return '<div class="pkg-admin-item"><img src="' + p.image + '" style="width:100%;height:80px;object-fit:cover;border-radius:8px;margin-bottom:8px;"><h4>' + p.title + '</h4><button class="abtn danger" style="margin-top:8px;" onclick="delProj(\'' + doc.id + '\')"><i class="fa-solid fa-trash"></i> Delete</button></div>'; }).join('');
  } catch(e) { console.error('Projects:', e); }
}
window.saveProject = async function() { var t = document.getElementById('proj-title'); var i = document.getElementById('proj-img'); if (!t||!t.value||!i||!i.value) return alert('Fill all fields'); try { await db.collection('projects').add({ title: t.value, image: i.value, createdAt: firebase.firestore.FieldValue.serverTimestamp() }); t.value=''; i.value=''; loadProjectsAdmin(); } catch(e) { alert(e.message); } };
window.delProj = async function(id) { if(!confirm('Delete?')) return; try { await db.collection('projects').doc(id).delete(); loadProjectsAdmin(); } catch(e) { alert(e.message); } };

/* ═══════ USER MANAGEMENT ═══════ */
async function loadUsersAdmin() {
  var tbody = document.getElementById('users-tbody'); if (!tbody) return;
  try {
    var snap = await db.collection('users').orderBy('createdAt','desc').get();
    if (snap.empty) { tbody.innerHTML = '<tr><td colspan="5" style="opacity:.3;padding:16px;">No users.</td></tr>'; return; }
    tbody.innerHTML = snap.docs.map(function(doc) {
      var u = doc.data(); var date = u.createdAt ? new Date(u.createdAt.toDate()).toLocaleDateString() : 'Unknown'; var blocked = u.blocked || false;
      var phoneStr = (u.phone || 'N/A') + (u.phoneVerified ? ' <i class="fa-solid fa-check-circle" style="color:#22c55e;font-size:12px;" title="Verified"></i>' : '');
      return '<tr><td><strong>' + (u.email||'N/A') + '</strong><div style="font-size:10px;opacity:.4;margin-top:4px;">UID: ' + doc.id + '</div></td><td>' + phoneStr + '</td><td>' + date + '</td><td><span style="background:' + (blocked?'#f43f5e':'#22c55e') + '20;color:' + (blocked?'#f43f5e':'#22c55e') + ';padding:4px 12px;border-radius:20px;font-size:10px;font-weight:800;">' + (blocked?'BLOCKED':'ACTIVE') + '</span></td><td><button class="abtn" style="padding:6px 10px;font-size:10px;margin-right:5px;background:' + (blocked?'#22c55e':'#f43f5e') + '20;color:' + (blocked?'#22c55e':'#f43f5e') + ';" onclick="toggleUserBlock(\'' + doc.id + '\',' + blocked + ')">' + (blocked?'Unblock':'Block') + '</button><button class="abtn danger" style="padding:6px 10px;font-size:10px;" onclick="delUserAdmin(\'' + doc.id + '\')"><i class="fa-solid fa-trash"></i></button></td></tr>';
    }).join('');
  } catch(e) { console.error('Users:', e); }
}
window.toggleUserBlock = async function(id, cur) { if (!adminGuard()) return; if(!confirm(cur?'Unblock this user?':'Block this user?')) return; try { await db.collection('users').doc(id).update({ blocked: !cur }); loadUsersAdmin(); } catch(e) { alert(e.message); } };
window.delUserAdmin = async function(id) {
  if (!adminGuard()) return;
  if(!confirm('WARNING: This wipes user profile + chat history. Proceed?')) return;
  try { await db.collection('users').doc(id).delete();
    var chatSnap = await db.collection('chats').doc(id).collection('messages').get();
    var batch = db.batch(); chatSnap.docs.forEach(function(d){ batch.delete(d.ref); }); await batch.commit();
    await db.collection('chats').doc(id).delete(); loadUsersAdmin();
  } catch(e) { alert(e.message); }
};

/* ═══════ OFFERS MANAGER ═══════ */
async function loadOffersAdmin() {
  var grid = document.getElementById('offers-admin-list'); if (!grid) return;
  try { var snap = await db.collection('offers').orderBy('createdAt','desc').get();
    if (snap.empty) { grid.innerHTML = '<p style="opacity:.4">No offers.</p>'; return; }
    grid.innerHTML = snap.docs.map(function(doc) { var o = doc.data(); return '<div class="pkg-admin-item"><img src="' + o.image + '" style="width:100%;height:80px;object-fit:cover;border-radius:8px;margin-bottom:8px;"><h4>' + o.title + '</h4><div class="price" style="color:#f59e0b;">' + o.price + '</div><div style="font-size:11px;opacity:.5;margin-bottom:8px;">Expires: ' + o.timerHours + 'h</div><button class="abtn danger" style="margin-top:8px;" onclick="delOffer(\'' + doc.id + '\')"><i class="fa-solid fa-trash"></i> Delete</button></div>'; }).join('');
  } catch(e) { console.error('Offers:', e); }
}
window.saveOffer = async function() { var t=document.getElementById('off-title'),i=document.getElementById('off-img'),p=document.getElementById('off-price'),tm=document.getElementById('off-timer'); if(!t||!t.value||!i||!i.value||!p||!p.value) return alert('Fill required fields'); try { await db.collection('offers').add({ title:t.value,image:i.value,price:p.value,timerHours:tm?parseInt(tm.value)||24:24,createdAt:firebase.firestore.FieldValue.serverTimestamp() }); t.value='';i.value='';p.value='';if(tm)tm.value=''; loadOffersAdmin(); } catch(e) { alert(e.message); } };
window.delOffer = async function(id) { if(!confirm('Delete offer?')) return; try { await db.collection('offers').doc(id).delete(); loadOffersAdmin(); } catch(e) { alert(e.message); } };

/* ═══════ PROMO CODE GENERATION ═══════ */
async function loadPromoServices() {
  var sel = document.getElementById('promo-srv-select'); if(!sel) return;
  try {
    var snap = await db.collection('services').get();
    sel.innerHTML = '<option value="">Select Service...</option>';
    snap.docs.forEach(function(doc) { var s = doc.data(); sel.innerHTML += '<option value="' + doc.id + '">' + s.name + '</option>'; });
  } catch(e) { console.error('Promo services:', e); }
}

async function loadPromoCodes() {
  var list = document.getElementById('promo-codes-list'); if(!list) return;
  try {
    var snap = await db.collection('promoCodes').orderBy('createdAt','desc').limit(50).get();
    if(snap.empty) { list.innerHTML = '<p style="opacity:.4">No promo codes.</p>'; return; }
    list.innerHTML = '<table class="otable" style="margin-top:16px;"><thead><tr><th>Code</th><th>Type</th><th>Value</th><th>Status</th><th>Action</th></tr></thead><tbody>' +
      snap.docs.map(function(doc) {
        var p = doc.data();
        var statusColor = p.used ? '#f43f5e' : '#22c55e';
        return '<tr><td style="font-family:monospace;font-weight:800;letter-spacing:1px;">' + p.code + '</td><td>' + (p.discountType === 'percent' ? '%' : 'EGP') + '</td><td>' + p.discountValue + '</td><td><span style="background:' + statusColor + '20;color:' + statusColor + ';padding:3px 10px;border-radius:20px;font-size:10px;font-weight:800;">' + (p.used ? 'USED' : 'ACTIVE') + '</span></td><td><button class="abtn danger" style="padding:4px 10px;font-size:10px;" onclick="delPromoCode(\'' + doc.id + '\')"><i class="fa-solid fa-trash"></i></button></td></tr>';
      }).join('') + '</tbody></table>';
  } catch(e) { console.error('Promo codes:', e); }
}

function generateRandomCode(len) {
  var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  var result = '';
  for(var i = 0; i < (len || 8); i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
  return result;
}

window.generatePromoCodes = async function() {
  var serId = document.getElementById('promo-srv-select').value;
  var qty = parseInt(document.getElementById('promo-qty').value) || 1;
  var type = document.getElementById('promo-type').value;
  var value = parseFloat(document.getElementById('promo-value').value);
  if(!value || value <= 0) return alert('Enter a valid discount value.');
  if(qty < 1 || qty > 100) return alert('Quantity must be 1-100.');
  try {
    var batch = db.batch();
    for(var i = 0; i < qty; i++) {
      var ref = db.collection('promoCodes').doc();
      batch.set(ref, {
        code: generateRandomCode(8),
        serviceID: serId || null,
        discountType: type,
        discountValue: value,
        used: false,
        usedBy: null,
        usedAt: null,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    }
    await batch.commit();
    alert(qty + ' promo code(s) generated!');
    loadPromoCodes();
  } catch(e) { alert('Error: ' + e.message); }
};

window.delPromoCode = async function(id) {
  if(!confirm('Delete this promo code?')) return;
  try { await db.collection('promoCodes').doc(id).delete(); loadPromoCodes(); } catch(e) { alert(e.message); }
};

/* ═══════ ORDERS ═══════ */
function loadOrders() {
  var tbody = document.getElementById('orders-tbody'); if (!tbody) return;
  db.collection('orders').orderBy('createdAt','desc').onSnapshot(function(snap) {
    if (snap.empty) { tbody.innerHTML = '<tr><td colspan="5" style="opacity:.3;padding:16px;">No orders.</td></tr>'; return; }
    tbody.innerHTML = snap.docs.map(function(doc) {
      var o = doc.data(); var st = o.status||'Pending'; var c = '#f59e0b';
      if(st==='In Progress') c='#3b82f6'; if(st==='Completed') c='#22c55e'; if(st==='Cancelled') c='#f43f5e';
      return '<tr><td><strong>' + (o.serviceName||'N/A') + '</strong><div style="font-size:10px;opacity:.4;margin-top:4px;">' + (o.userEmail||'Guest') + '</div></td><td><div style="color:var(--accent);font-weight:700;">' + (o.senderNumber||'N/A') + '</div><div style="font-size:11px;opacity:.8;">' + (o.senderName||'N/A') + '</div></td><td>' + (o.promoCode ? '<span style="font-family:monospace;color:#f59e0b;">' + o.promoCode + '</span>' : '-') + '</td><td><span style="background:' + c + '20;color:' + c + ';padding:4px 12px;border-radius:20px;font-size:10px;font-weight:800;border:1px solid ' + c + '40;">' + st + '</span></td><td><select onchange="updOrder(\'' + doc.id + '\',this.value)"><option value="Pending"' + (st==='Pending'?' selected':'') + '>Pending</option><option value="In Progress"' + (st==='In Progress'?' selected':'') + '>In Progress</option><option value="Completed"' + (st==='Completed'?' selected':'') + '>Completed</option><option value="Cancelled"' + (st==='Cancelled'?' selected':'') + '>Cancelled</option></select></td></tr>';
    }).join('');
  });
}
window.updOrder = async function(id,st) { try { await db.collection('orders').doc(id).update({ status: st }); } catch(e) { alert(e.message); } };

/* ═══════ CHAT ═══════ */
async function loadChatUsers() {
  var list = document.getElementById('chat-users'); if (!list) return;
  try {
    var snap = await db.collection('chats').get(); var rooms = [];
    for (var i=0;i<snap.docs.length;i++) { var d=snap.docs[i]; var u=await db.collection('users').doc(d.id).get(); rooms.push({ uid:d.id, name: u.exists?(u.data().fullName||'Guest'):'Guest', email: u.exists?(u.data().email||''):''}); }
    if(!rooms.length) { list.innerHTML='<p style="padding:20px;opacity:.4;text-align:center;">No conversations.</p>'; return; }
    list.innerHTML = rooms.map(function(r) { var ac=window._aActiveUid===r.uid; return '<div class="wa-user'+(ac?' active':'')+'" style="position:relative;">'+'<div style="flex:1;display:flex;align-items:center;gap:10px;cursor:pointer;" onclick="openChat(\''+r.uid+'\',\''+r.name.replace(/'/g,"\\'")+'\')">'+
      '<div class="wa-avatar">'+r.name.charAt(0).toUpperCase()+'</div>'+'<div class="wa-meta"><strong>'+r.name+'</strong><span>'+r.email+'</span></div>'+(ac?'':'<div class="wa-dot"></div>')+'</div>'+
      '<button onclick="event.stopPropagation();deleteChat(\''+r.uid+'\');" style="background:rgba(244,63,94,0.1);color:#f43f5e;border:none;border-radius:8px;padding:4px 8px;font-size:10px;cursor:pointer;margin-left:6px;" title="Delete Chat"><i class="fa-solid fa-trash"></i></button></div>'; }).join('');
  } catch(e) { console.error('Chat users:',e); }
}

window.deleteChat = async function(uid) {
  if (!adminGuard()) return;
  if (!confirm('Delete entire chat history with this user?')) return;
  try {
    var msgSnap = await db.collection('chats').doc(uid).collection('messages').get();
    var batch = db.batch();
    msgSnap.docs.forEach(function(d) { batch.delete(d.ref); });
    await batch.commit();
    await db.collection('chats').doc(uid).delete();
    window._aActiveUid = null;
    document.getElementById('wa-chat-msgs').innerHTML = '<div style="text-align:center;margin-top:80px;opacity:.2;"><i class="fa-solid fa-comments" style="font-size:48px;"></i><p style="margin-top:12px;">No conversation selected</p></div>';
    document.getElementById('wa-chat-header').textContent = 'Select a conversation';
    loadChatUsers();
  } catch(e) { alert(e.message); }
};

window.openChat = function(uid,name) {
  window._aActiveUid=uid; var header=document.getElementById('wa-chat-header'); if(header) header.textContent=name;
  if(window._aChatUnsub) window._aChatUnsub(); var box=document.getElementById('wa-chat-msgs'); if(!box) return;
  window._aChatUnsub = db.collection('chats').doc(uid).collection('messages').orderBy('timestamp','asc').onSnapshot(function(snap) {
    box.innerHTML = snap.docs.map(function(d) { var m=d.data(); var me=m.sender==='admin'; var time=m.timestamp?new Date(m.timestamp.toDate()).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}):''; return '<div class="wa-msg '+(me?'me':'them')+'">'+m.text+'<div class="time">'+time+'</div></div>'; }).join('');
    box.scrollTop=box.scrollHeight;
  });
  loadChatUsers();
};

/* ═══════ SYSTEM ═══════ */
async function loadSysSettings() {
  try { var doc=await db.collection('settings').doc('core').get();
    if(doc.exists) { var s=doc.data(); var mt=document.getElementById('maint-toggle'),an=document.getElementById('sys-announce'),ti=document.getElementById('sys-title'),ba=document.getElementById('sys-banner'),bl=document.getElementById('sys-banner-link');
      if(mt) mt.checked=s.maintenanceMode||false; if(an) an.value=s.announcement||''; if(ti) ti.value=s.siteTitle||''; if(ba) ba.value=s.homeBanner||''; if(bl) bl.value=s.homeBannerLink||''; }
  } catch(e) { console.error('Sys:',e); }
}
window.toggleMaint = async function() { try { var v=document.getElementById('maint-toggle').checked; await db.collection('settings').doc('core').set({ maintenanceMode: v },{ merge:true }); } catch(e) { alert(e.message); } };
window.saveSysSettings = async function() { try { var an=document.getElementById('sys-announce'),ti=document.getElementById('sys-title'),ba=document.getElementById('sys-banner'),bl=document.getElementById('sys-banner-link'); await db.collection('settings').doc('core').set({ announcement:an?an.value:'',siteTitle:ti?ti.value:'',homeBanner:ba?ba.value:'',homeBannerLink:bl?bl.value:'' },{ merge:true }); alert('Saved!'); } catch(e) { alert(e.message); } };
