// FIREBASE: módulo separado para no romper la app si falla la carga
try {
  const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js");
  const { getFirestore, doc, getDoc, setDoc, onSnapshot } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js");
  const { getAuth, signInWithEmailAndPassword, signOut } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js");

  const firebaseConfig = {
    apiKey: "AIzaSyBxgW2FTlicaMjhqKSW-lK0NzskQhcQejA",
    authDomain: "tiendas-mass-operaciones.firebaseapp.com",
    projectId: "tiendas-mass-operaciones",
    storageBucket: "tiendas-mass-operaciones.firebasestorage.app",
    messagingSenderId: "671707218913",
    appId: "1:671707218913:web:f4e542384f97ac6c45c8a0"
  };
  const fbApp = initializeApp(firebaseConfig);
  const fdb = getFirestore(fbApp);
  const fbAuth = getAuth(fbApp);

  let dbDocRef = null;
  let suppressUntil = 0;
  let unsubscribeWatch = null;
  const comunicadosDocRef = doc(fdb, "operaciones", "comunicados");
  let unsubscribeComunicados = null;

  window.__fb = {
    async login(email, pass){ return signInWithEmailAndPassword(fbAuth, email, pass); },
    async logout(){
      if(unsubscribeWatch){ unsubscribeWatch(); unsubscribeWatch = null; }
      if(unsubscribeComunicados){ unsubscribeComunicados(); unsubscribeComunicados = null; }
      dbDocRef = null;
      return signOut(fbAuth);
    },
    setTienda(tiendaId){
      dbDocRef = doc(fdb, "tiendas", tiendaId);
      if(unsubscribeComunicados) unsubscribeComunicados();
      unsubscribeComunicados = onSnapshot(comunicadosDocRef, (snap)=>{
        if(!snap.exists()) { if(window.onComunicadosUpdate) window.onComunicadosUpdate([]); return; }
        const data = snap.data();
        if(window.onComunicadosUpdate) window.onComunicadosUpdate(data.items || []);
      }, (e)=>{ console.warn('No se pudo escuchar comunicados:', e); });
    },
    async getData(){
      if(!dbDocRef) return null;
      const snap = await getDoc(dbDocRef);
      return snap.exists() ? snap.data() : null;
    },
    async setData(data){
      if(!dbDocRef) return;
      return setDoc(dbDocRef, data);
    },
    suppress(){ suppressUntil = Date.now() + 800; },
    watch(cb){
      if(!dbDocRef) return;
      if(unsubscribeWatch) unsubscribeWatch();
      unsubscribeWatch = onSnapshot(dbDocRef, (snap)=>{
        if(Date.now() < suppressUntil) return;
        if(!snap.exists()) return;
        cb(snap.data());
      });
    },
    // Herramienta de un solo uso para traer tu historial actual a tu nueva
    // cuenta de tienda. La usas una vez y ya, puedes dejarla ahí sin problema.
    async migrateFromMain(){
      const oldRef = doc(fdb, "operaciones", "main");
      const snap = await getDoc(oldRef);
      if(!snap.exists()){ console.warn('No existe operaciones/main'); return; }
      if(!dbDocRef){ console.warn('Primero inicia sesión con tu tienda'); return; }
      await setDoc(dbDocRef, snap.data());
      console.log('Migración completa ✅ — recarga la página.');
    }
  };
} catch(e){
  console.warn('Firebase no disponible:', e);
}