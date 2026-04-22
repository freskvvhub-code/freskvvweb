/* ═══════════════════════════════════════════════════
   FRESKVV HUB — Admin Dashboard Engine
   ═══════════════════════════════════════════════════ */

let currentUser = null;
let isAdminUser = false;
let unsubChat = null;
let unsubInbox = null;

/* ═══════ 1. AUTH SYSTEM ═══════ */
function initAuth() {
  const loginBtn = document.getElementById('auth-login-btn');
  const logoutBtn = document.getElementById('auth-logout-btn');
  const authModal = document.getElementById('auth-modal');
  const authClose = document.getElementById('auth-close-btn');
  const authForm = document.getElementById('auth-form');
  const authToggle = document.getElementById('auth-toggle');
  const authTitle = document.getElementById('auth-title');
  const authSubmitText = document.getElementById('auth-submit-text');
  const authError = document.getElementById('auth-error');
  let isSignUp = false;

  if (loginBtn) loginBtn.addEventListener('click', () => authModal.classList.remove('hidden'));
  if (authClose) authClose.addEventListener('click', () => authModal.classList.add('hidden'));
  if (authModal) authModal.addEventListener('click', e => { if (e.target === authModal) authModal.classList.add('hidden'); });

  if (authToggle) authToggle.addEventListener('click', () => {
    isSignUp = !isSignUp;
    authTitle.textContent = isSignUp ? 'Create Account' : 'Sign In';
    authSubmitText.textContent = isSignUp ? 'Sign Up' : 'Sign In';
    authToggle.textContent = isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up";
    authError.textContent = '';
  });

  if (authForm) authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    authError.textContent = '';
    const btn = authForm.querySelector('button[type="submit"]');
    btn.classList.add('btn-loading');
    const email = document.getElementById('auth-email').value;
    const pass = document.getElementById('auth-password').value;
    try {
      if (isSignUp) {
        const userCred = await auth.createUserWithEmailAndPassword(email, pass);
        await db.collection('users').doc(userCred.user.uid).set({ email, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
      } else {
        await auth.signInWithEmailAndPassword(email, pass);
      }
      authModal.classList.add('hidden');
      authForm.reset();
    } catch (err) {
      const msgs = { 'auth/email-already-in-use':'Email already registered', 'auth/wrong-password':'Wrong password',
        'auth/user-not-found':'No account found', 'auth/weak-password':'Password too weak (min 6 chars)',
        'auth/invalid-email':'Invalid email format' };
      authError.textContent = msgs[err.code] || err.message;
    } finally {
      btn.classList.remove('btn-loading');
    }
  });

  // Auth state listener
  auth.onAuthStateChanged(user => {
    currentUser = user;
    isAdminUser = isAdmin(user);
    if (loginBtn) loginBtn.style.display = user ? 'none' : 'flex';
    if (logoutBtn) logoutBtn.style.display = user ? 'flex' : 'none';
    const adminBtn = document.getElementById('admin-dash-btn');
    if (adminBtn) adminBtn.style.display = isAdminUser ? 'flex' : 'none';
    if (isAdminUser) loadAdminData();
    checkMaintenance();
  });

  if (logoutBtn) logoutBtn.addEventListener('click', () => {
    try { auth.signOut(); } catch(e) { console.error(e); }
  });
}

/* ═══════ 2. MAINTENANCE MODE ═══════ */
async function checkMaintenance() {
  try {
    const doc = await safeGet(db.collection('settings').doc('maintenance'));
    const maint = doc && doc.exists ? doc.data() : { enabled: false };
    const overlay = document.getElementById('maintenance-overlay');
    if (maint.enabled && !isAdminUser) {
      overlay.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    } else {
      overlay.classList.add('hidden');
      document.body.style.overflow = '';
    }
  } catch(e) { console.error('Maintenance check failed:', e); }
}

// ─── ADMIN BACKDOOR IN MAINTENANCE ───
let maintClicks = 0;
document.addEventListener('DOMContentLoaded', () => {
  const maintIcon = document.querySelector('.maintenance-icon');
  if (maintIcon) {
    maintIcon.addEventListener('click', () => {
      maintClicks++;
      if (maintClicks >= 3) {
        document.getElementById('auth-modal').classList.remove('hidden');
        document.getElementById('auth-modal').style.zIndex = '5000'; // Ensure it's above maintenance
        maintClicks = 0;
      }
    });
  }
});

async function toggleMaintenance(enabled) {
  await safeSet(db.collection('settings').doc('maintenance'), { enabled });
  updateMaintenanceUI(enabled);
}

function updateMaintenanceUI(enabled) {
  const dot = document.getElementById('maint-status-dot');
  const text = document.getElementById('maint-status-text');
  if (dot) dot.className = 'status-dot ' + (enabled ? 'active' : '');
  if (text) text.textContent = enabled ? 'ON' : 'OFF';
}

/* ═══════ 3. POPUP AD MANAGER ═══════ */
async function loadAdData() {
  try {
    const doc = await safeGet(db.collection('settings').doc('popup_ad'));
    if (doc && doc.exists) {
      const d = doc.data();
      document.getElementById('ad-image-url').value = d.imageUrl || '';
      document.getElementById('ad-text').value = d.text || '';
      document.getElementById('ad-link').value = d.link || '';
      document.getElementById('ad-toggle').checked = d.enabled || false;
    }
  } catch(e) { console.error(e); }
}

async function saveAdData() {
  const data = {
    imageUrl: document.getElementById('ad-image-url').value,
    text: document.getElementById('ad-text').value,
    link: document.getElementById('ad-link').value,
    enabled: document.getElementById('ad-toggle').checked,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  };
  const ok = await safeSet(db.collection('settings').doc('popup_ad'), data);
  showAdminToast(ok ? 'Ad saved!' : 'Save failed');
}

async function showPopupAd() {
  if (isAdminUser) return;
  try {
    const doc = await safeGet(db.collection('settings').doc('popup_ad'));
    if (doc && doc.exists && doc.data().enabled) {
      const d = doc.data();
      const el = document.getElementById('popup-ad');
      document.getElementById('popup-ad-img').src = d.imageUrl || '';
      document.getElementById('popup-ad-img').style.display = d.imageUrl ? 'block' : 'none';
      document.getElementById('popup-ad-text').textContent = d.text || '';
      document.getElementById('popup-ad-link').href = d.link || '#';
      document.getElementById('popup-ad-link').style.display = d.link ? 'inline-flex' : 'none';
      el.classList.remove('hidden');
    }
  } catch(e) { console.error(e); }
}

/* ═══════ 4. ORDERS MANAGER ═══════ */
let unsubOrders = null;
function loadOrders() {
  if (unsubOrders) unsubOrders();
  try {
    unsubOrders = db.collection('orders').orderBy('createdAt', 'desc').limit(50)
      .onSnapshot(snap => {
        const tbody = document.getElementById('orders-table-body');
        if (!tbody) return;
        tbody.innerHTML = '';
        if (snap.empty) { tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:40px;">No orders found.</td></tr>'; return; }
        
        snap.forEach(doc => {
          const d = doc.data();
          const date = d.createdAt ? new Date(d.createdAt.toDate()).toLocaleDateString() : 'N/A';
          tbody.innerHTML += `
            <tr>
              <td><strong>${d.name || 'Guest'}</strong><br><small>${d.email || ''}</small></td>
              <td>${d.service || 'N/A'}</td>
              <td>${d.phone || 'N/A'}</td>
              <td>${date}</td>
              <td>
                <select class="status-select" onchange="updateOrderStatus('${doc.id}', this.value)">
                  <option value="pending" ${d.status === 'pending' ? 'selected' : ''}>Pending</option>
                  <option value="completed" ${d.status === 'completed' ? 'selected' : ''}>Completed</option>
                  <option value="cancelled" ${d.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                </select>
                <span class="status-badge ${d.status || 'pending'}">${d.status || 'pending'}</span>
              </td>
            </tr>`;
        });
      });
  } catch(e) { console.error('Orders load error:', e); }
}

async function updateOrderStatus(id, status) {
  try {
    await db.collection('orders').doc(id).update({ status });
    showAdminToast(`Order ${status}`);
  } catch(e) { showAdminToast('Update failed'); }
}

function saveOrderToFirestore(data) {
  try {
    return db.collection('orders').add({
      ...data,
      status: 'pending',
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  } catch(e) { console.error('Order save error:', e); return Promise.resolve(); }
}

/* ═══════ 5. STATS & ANALYTICS ═══════ */
function loadStats() {
  // Real-time Users
  db.collection('users').onSnapshot(snap => {
    document.getElementById('stat-users').textContent = snap.size;
  });
  // Real-time Orders
  db.collection('orders').onSnapshot(snap => {
    document.getElementById('stat-orders').textContent = snap.size;
  });
  // Support Tickets (Unread inquiries or chats)
  db.collection('chat').where('isAdmin', '==', false).onSnapshot(snap => {
    document.getElementById('stat-tickets').textContent = snap.size;
  });
}

/* ═══════ 6. LIVE CHAT ═══════ */
function loadLiveChat() {
  if (unsubChat) unsubChat();
  try {
    unsubChat = db.collection('chat').orderBy('createdAt', 'asc').limit(100)
      .onSnapshot(snap => {
        const container = document.getElementById('admin-chat-messages');
        const userContainer = document.getElementById('user-chat-messages');
        if (!container && !userContainer) return;
        
        const myUid = currentUser ? currentUser.uid : 'anon';
        const myName = sessionStorage.getItem('guestName') || '';
        
        let html = '';
        snap.forEach(doc => {
          const d = doc.data();
          let isMe = false;
          
          if (isAdminUser) {
            isMe = d.isAdmin === true;
          } else {
            // Check if it's the user's own message
            isMe = (d.isAdmin === false) && (d.uid === myUid || (d.name === myName && d.uid === 'anon'));
          }
          
          html += `
            <div class="chat-msg ${isMe ? 'mine' : 'other'}">
              <span class="chat-msg-name">${d.name || 'Guest'}</span>
              <p>${d.text}</p>
            </div>`;
        });
        
        if (container) container.innerHTML = html;
        if (userContainer) userContainer.innerHTML = html;
        if (container) container.scrollTop = container.scrollHeight;
        if (userContainer) userContainer.scrollTop = userContainer.scrollHeight;
      }, err => console.error('Chat listen error:', err));
  } catch(e) { console.error(e); }
}

async function sendChatMessage(text) {
  if (!text.trim()) return;
  try {
    const name = isAdminUser ? '🛡️ Admin' : (currentUser ? (currentUser.displayName || currentUser.email.split('@')[0]) : (sessionStorage.getItem('guestName') || 'Guest'));
    await db.collection('chat').add({
      text: text.trim(),
      uid: currentUser ? currentUser.uid : 'anon',
      name: name,
      isAdmin: isAdminUser,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  } catch(e) { console.error('Chat send error:', e); }
}

/* ═══════ 7. ADMIN DASHBOARD UI ═══════ */
function initAdminDashboard() {
  const dashBtn = document.getElementById('admin-dash-btn');
  const dashPanel = document.getElementById('admin-dashboard');
  const dashClose = document.getElementById('admin-close-btn');

  if (dashBtn) dashBtn.addEventListener('click', () => {
    dashPanel.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  });
  if (dashClose) dashClose.addEventListener('click', () => {
    dashPanel.classList.add('hidden');
    document.body.style.overflow = '';
  });

  // Tab switching
  document.querySelectorAll('.admin-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(`tab-${btn.dataset.tab}`).classList.add('active');
    });
  });

  // Maintenance Toggle
  const maintBtn = document.getElementById('maint-toggle-btn');
  if (maintBtn) maintBtn.addEventListener('click', async () => {
    const doc = await safeGet(db.collection('settings').doc('maintenance'));
    const isCurrentlyOn = doc && doc.exists ? doc.data().enabled : false;
    await toggleMaintenance(!isCurrentlyOn);
  });

  // Asset Library Save
  const assetSave = document.getElementById('asset-save-btn');
  if (assetSave) assetSave.addEventListener('click', async () => {
    assetSave.classList.add('btn-loading');
    const data = {
      logoUrl: document.getElementById('asset-logo-url').value,
      heroUrl: document.getElementById('asset-hero-url').value,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    await safeSet(db.collection('settings').doc('asset_library'), data);
    showAdminToast('Asset library updated!');
    assetSave.classList.remove('btn-loading');
    // Refresh UI
    if (typeof loadContentOverrides === 'function') await loadContentOverrides();
  });

  // Marketing Hub Save (Popup + Announcement)
  const mktSave = document.getElementById('mkt-save-btn');
  if (mktSave) mktSave.addEventListener('click', async () => {
    mktSave.classList.add('btn-loading');
    const adData = {
      imageUrl: document.getElementById('mkt-ad-image').value,
      text: document.getElementById('mkt-ad-text').value,
      link: document.getElementById('mkt-ad-link').value,
      enabled: document.getElementById('mkt-ad-toggle').checked,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    const newsData = {
      text: document.getElementById('mkt-news-text').value,
      enabled: document.getElementById('mkt-news-toggle').checked
    };
    await safeSet(db.collection('settings').doc('popup_ad'), adData);
    await safeSet(db.collection('settings').doc('announcement'), newsData);
    showAdminToast('Marketing settings saved!');
    mktSave.classList.remove('btn-loading');
    if (typeof loadContentOverrides === 'function') await loadContentOverrides();
  });

  // System Settings Save (Social Links)
  const sysSave = document.getElementById('sys-save-btn');
  if (sysSave) sysSave.addEventListener('click', async () => {
    sysSave.classList.add('btn-loading');
    const links = {
      whatsapp: document.getElementById('sys-wa-link').value,
      instagram: document.getElementById('sys-ig-link').value,
      telegram: document.getElementById('sys-tg-link').value
    };
    await safeSet(db.collection('settings').doc('social_links'), links);
    showAdminToast('Global links updated!');
    sysSave.classList.remove('btn-loading');
    if (typeof loadContentOverrides === 'function') await loadContentOverrides();
  });

  // Content Editor Logic
  const serviceSelect = document.getElementById('editor-service-select');
  const editorSave = document.getElementById('editor-save-btn');
  
  if (serviceSelect && editorSave) {
    serviceSelect.addEventListener('change', async () => {
      const id = serviceSelect.value;
      const snap = await safeGet(db.collection('settings').doc('content_overrides'));
      let data = {};
      if (snap && snap.exists) data = snap.data();
      
      const svc_en = SERVICES_DATA.en.find(s=>s.id===id);
      const svc_ar = SERVICES_DATA.ar.find(s=>s.id===id);
      
      document.getElementById('editor-price-en').value = data[`${id}_price_en`] || '';
      document.getElementById('editor-price-ar').value = data[`${id}_price_ar`] || '';
      document.getElementById('editor-icon').value = data[`${id}_icon`] || svc_en?.icon || '';
      document.getElementById('editor-desc-en').value = data[`${id}_desc_en`] || svc_en?.desc || '';
      document.getElementById('editor-desc-ar').value = data[`${id}_desc_ar`] || svc_ar?.desc || '';
    });
    
    // Initial load
    serviceSelect.dispatchEvent(new Event('change'));

    editorSave.addEventListener('click', async () => {
      editorSave.classList.add('btn-loading');
      const id = serviceSelect.value;
      const data = {
        [`${id}_price_en`]: document.getElementById('editor-price-en').value,
        [`${id}_price_ar`]: document.getElementById('editor-price-ar').value,
        [`${id}_icon`]: document.getElementById('editor-icon').value,
        [`${id}_desc_en`]: document.getElementById('editor-desc-en').value,
        [`${id}_desc_ar`]: document.getElementById('editor-desc-ar').value
      };
      
      await db.collection('settings').doc('content_overrides').set(data, { merge: true });
      if (typeof loadContentOverrides === 'function') {
        await loadContentOverrides();
        if (typeof renderServices === 'function') renderServices();
      }
      showAdminToast('Asset library updated!');
      editorSave.classList.remove('btn-loading');
    });
  }

  // Orders Refresh
  document.getElementById('refresh-orders-btn')?.addEventListener('click', loadOrders);

  // Chat send
  const chatForm = document.getElementById('admin-chat-form');
  if (chatForm) chatForm.addEventListener('submit', async e => {
    e.preventDefault();
    const input = document.getElementById('admin-chat-input');
    await sendChatMessage(input.value);
    input.value = '';
  });

  // Popup ad close
  const popupClose = document.getElementById('popup-ad-close');
  if (popupClose) popupClose.addEventListener('click', () => document.getElementById('popup-ad').classList.add('hidden'));

  // Support btn → Choice Modal
  const supportBtn = document.getElementById('support-btn');
  const supportChoiceModal = document.getElementById('support-choice-modal');
  const supportWaModal = document.getElementById('support-wa-modal');
  const guestPromptModal = document.getElementById('guest-prompt-modal');
  const guestPromptForm = document.getElementById('guest-prompt-form');
  const guestPromptClose = document.getElementById('guest-prompt-close');

  if (supportBtn) {
    supportBtn.removeEventListener('click', supportBtn._handler);
    supportBtn._handler = () => {
      supportChoiceModal.classList.remove('hidden');
    };
    supportBtn.addEventListener('click', supportBtn._handler);
  }

  // Support Choice Actions
  document.getElementById('support-choice-close')?.addEventListener('click', () => supportChoiceModal.classList.add('hidden'));
  
  document.getElementById('btn-support-wa')?.addEventListener('click', async () => {
    supportChoiceModal.classList.add('hidden');
    supportWaModal.classList.remove('hidden');
    // Log click
    try {
      await db.collection('logs').add({
        type: 'whatsapp_click',
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        user: currentUser ? currentUser.email : 'Guest'
      });
    } catch(e) {}
  });

  document.getElementById('btn-support-chat')?.addEventListener('click', () => {
    supportChoiceModal.classList.add('hidden');
    if (!currentUser && !sessionStorage.getItem('guestName')) {
      guestPromptModal.classList.remove('hidden');
    } else {
      document.getElementById('live-chat-panel').classList.remove('hidden');
      loadLiveChat();
    }
  });

  // WhatsApp Support Form
  document.getElementById('support-wa-close')?.addEventListener('click', () => supportWaModal.classList.add('hidden'));
  document.getElementById('support-wa-form')?.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    btn.classList.add('btn-loading');
    const name = document.getElementById('wa-form-name').value;
    const phone = document.getElementById('wa-form-phone').value;
    const email = document.getElementById('wa-form-email').value;
    const comments = document.getElementById('wa-form-comments').value.trim();

    if (typeof saveInquiryToFirestore === 'function') {
      await saveInquiryToFirestore({ name, phone, email, type: 'Support Request', service: 'WhatsApp Support', comments });
    }

    const text = `SUPPORT: Request\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nDetails: ${comments}`;
    const waUrl = `https://wa.me/2001221640301?text=${encodeURIComponent(text)}`; // Hardcoded fallback just in case ASSETS isn't ready
    window.open(typeof FRESKVV_ASSETS !== 'undefined' ? `${FRESKVV_ASSETS.socials.whatsapp}?text=${encodeURIComponent(text)}` : waUrl, '_blank');
    supportWaModal.classList.add('hidden');
    e.target.reset();
    btn.classList.remove('btn-loading');
  });

  if (guestPromptClose) guestPromptClose.addEventListener('click', () => guestPromptModal.classList.add('hidden'));
  
  if (guestPromptForm) {
    guestPromptForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('guest-name-input').value.trim();
      if (name) {
        sessionStorage.setItem('guestName', name);
        guestPromptModal.classList.add('hidden');
        document.getElementById('live-chat-panel').classList.remove('hidden');
        loadLiveChat();
      }
    });
  }

  // User chat form
  const userChatForm = document.getElementById('user-chat-form');
  if (userChatForm) userChatForm.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = userChatForm.querySelector('button[type="submit"]');
    btn.classList.add('btn-loading');
    const input = document.getElementById('user-chat-input');
    await sendChatMessage(input.value);
    input.value = '';
    btn.classList.remove('btn-loading');
  });
  const chatClose = document.getElementById('chat-panel-close');
  if (chatClose) chatClose.addEventListener('click', () => document.getElementById('live-chat-panel').classList.add('hidden'));
}

async function loadAdminData() {
  loadOrders();
  loadLiveChat();
  loadStats();
  loadWALogs();
  
  // Load all settings for dashboard population
  try {
    // Maintenance
    const maintDoc = await safeGet(db.collection('settings').doc('maintenance'));
    if (maintDoc && maintDoc.exists) updateMaintenanceUI(maintDoc.data().enabled);

    // Assets
    const assetDoc = await safeGet(db.collection('settings').doc('asset_library'));
    if (assetDoc && assetDoc.exists) {
      const d = assetDoc.data();
      document.getElementById('asset-logo-url').value = d.logoUrl || '';
      document.getElementById('asset-hero-url').value = d.heroUrl || '';
    }

    // Marketing (Popup)
    const adDoc = await safeGet(db.collection('settings').doc('popup_ad'));
    if (adDoc && adDoc.exists) {
      const d = adDoc.data();
      document.getElementById('mkt-ad-image').value = d.imageUrl || '';
      document.getElementById('mkt-ad-text').value = d.text || '';
      document.getElementById('mkt-ad-link').value = d.link || '';
      document.getElementById('mkt-ad-toggle').checked = d.enabled || false;
    }

    // Marketing (Announcement)
    const newsDoc = await safeGet(db.collection('settings').doc('announcement'));
    if (newsDoc && newsDoc.exists) {
      const d = newsDoc.data();
      document.getElementById('mkt-news-text').value = d.text || '';
      document.getElementById('mkt-news-toggle').checked = d.enabled || false;
    }

    // System (Social Links)
    const linksDoc = await safeGet(db.collection('settings').doc('social_links'));
    if (linksDoc && linksDoc.exists) {
      const d = linksDoc.data();
      document.getElementById('sys-wa-link').value = d.whatsapp || '';
      document.getElementById('sys-ig-link').value = d.instagram || '';
      document.getElementById('sys-tg-link').value = d.telegram || '';
    }
  } catch(e) { console.error('Error loading admin data:', e); }
}

async function loadWALogs() {
  const container = document.getElementById('wa-clicks-log');
  if (!container) return;
  try {
    const snap = await db.collection('logs').where('type', '==', 'whatsapp_click').orderBy('timestamp', 'desc').limit(10).get();
    container.innerHTML = snap.docs.map(doc => {
      const d = doc.data();
      const date = d.timestamp ? d.timestamp.toDate().toLocaleString() : 'Just now';
      return `<div style="margin-bottom:8px; border-bottom:1px solid rgba(255,255,255,0.05); padding-bottom:4px;">
        <strong>${d.user}</strong> clicked WhatsApp at ${date}
      </div>`;
    }).join('') || 'No clicks recorded yet.';
  } catch(e) { console.error('Error loading logs:', e); }
}

function showAdminToast(msg) {
  const t = document.getElementById('admin-toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}


