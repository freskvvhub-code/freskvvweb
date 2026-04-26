/* ═══════════════════════════════════════════════════
   FRESKVV HUB — Firebase Configuration
   ═══════════════════════════════════════════════════
   ⚠️ PASTE YOUR FIREBASE CONFIG BELOW ⚠️
   ═══════════════════════════════════════════════════ */

const firebaseConfig = {
  apiKey: "AIzaSyD-3UNQYx_knBhDp-yhY7syFYc2ZijxYUA",
  authDomain: "freskvvhub-8b2e8.firebaseapp.com",
  projectId: "freskvvhub-8b2e8",
  storageBucket: "freskvvhub-8b2e8.firebasestorage.app",
  messagingSenderId: "293372635137",
  appId: "1:293372635137:web:811c41924523fcca213800",
  measurementId: "G-DK7YK2B894"
};
// ─── Initialize Firebase ───
try {
  firebase.initializeApp(firebaseConfig);
} catch (e) {
  console.warn('Firebase init skipped (already initialized or config missing):', e.message);
}

const auth = firebase.auth();
const db = firebase.firestore();

// ─── Admin email whitelist ───
const ADMIN_EMAILS = ['admin@freskvvhub.com', 'fares@freskvv.com'];

// ─── Rank Constants ───
const RANKS = {
  BRONZE: 'Bronze',
  SILVER: 'Silver',
  GOLD: 'Gold',
  PLATINUM: 'Platinum'
};

// ─── Helper: Check if current user is admin ───
function isAdmin(user) {
  return user && ADMIN_EMAILS.includes(user.email);
}

// ─── Helper: Get User Rank Style ───
function getRankStyle(rank) {
  const styles = {
    'Bronze': { color: '#cd7f32', icon: '🥉' },
    'Silver': { color: '#c0c0c0', icon: '🥈' },
    'Gold': { color: '#ffd700', icon: '🥇' },
    'Platinum': { color: '#e5e4e2', icon: '💎' }
  };
  return styles[rank] || styles['Bronze'];
}

// ─── Helper: Safe Firestore read ───
async function safeGet(ref) {
  try { return await ref.get(); } catch (e) { console.error('Firestore read error:', e); return null; }
}

// ─── Helper: Safe Firestore write ───
async function safeSet(ref, data, merge = true) {
  try { await ref.set(data, { merge }); return true; } catch (e) { console.error('Firestore write error:', e); return false; }
}

async function safeDel(ref) {
  try { await ref.delete(); return true; } catch (e) { console.error('Firestore delete error:', e); return false; }
}
