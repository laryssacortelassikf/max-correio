/*<!--
  auth-guard.js
  Protege o acesso à home.html. Redireciona caso o usuário não esteja autenticado ou não tenha verificado o e-mail.
-->*/
  import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

  const auth = getAuth();

  // Garante que o usuário está logado e com e-mail verificado
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      await user.reload();
      if (!user.emailVerified) {
        alert("Acesso negado: verifique seu e-mail antes de acessar.");
        auth.signOut();
        window.location.href = "index.html";
      }
    } else {
      alert("Você precisa estar logado para acessar esta página.");
      window.location.href = "index.html";
    }
  });