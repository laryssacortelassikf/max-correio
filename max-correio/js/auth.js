// Importa Firebase via CDN (ESM)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Configuração Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDD4aLDzCiFeJ5ikZO892PILK426GN6Hcg",
  authDomain: "max-correio.firebaseapp.com",
  projectId: "max-correio",
  storageBucket: "max-correio.firebasestorage.app",
  messagingSenderId: "393510160991",
  appId: "1:393510160991:web:91d9ca358cc71cd9f1e9ea",
  measurementId: "G-HWMC9TCL1E",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Valida domínio do e-mail corporativo
function emailCorporativoValido(email) {
  return email.endsWith("@maxiconsystems.com.br");
}

// Função para cadastrar usuário
async function cadastrar(email, senha) {
  if (!emailCorporativoValido(email)) {
    alert("Use um e-mail @maxiconsystems.com.br");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    const user = userCredential.user;

    // Envia e-mail de verificação
    await sendEmailVerification(user);
    alert("Cadastro realizado! Verifique seu e-mail para confirmar sua conta.");

    // Opcional: fazer logout automático para o usuário confirmar o email antes
    await auth.signOut();

    // Redireciona para a página de login
    window.location.href = "index.html";
  } catch (error) {
    alert("Erro ao cadastrar: " + error.message);
  }
}

// Função para fazer login
async function login(email, senha) {
  if (!emailCorporativoValido(email)) {
    alert("Use um e-mail @maxiconsystems.com.br");
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, senha);
    const user = userCredential.user;

    if (user.emailVerified) {
      // Email confirmado, redireciona para a home
      window.location.href = "home.html";
    } else {
      alert("E-mail não verificado. Por favor, confirme seu e-mail antes de fazer login.");
      await auth.signOut();
    }
  } catch (error) {
    alert("Erro ao fazer login: " + error.message);
  }
}

// Lidando com o formulário de cadastro (register.html)
const formCadastro = document.getElementById("cadastro-form");
if (formCadastro) {
  formCadastro.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email-cadastro").value.trim();
    const senha = document.getElementById("senha-cadastro").value;
    const confirmaSenha = document.getElementById("confirma-senha").value;

    if (senha !== confirmaSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    cadastrar(email, senha);
  });
}

// Lidando com o formulário de login (index.html)
const formLogin = document.getElementById("login-form");
if (formLogin) {
  formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email-login").value.trim();
    const senha = document.getElementById("senha-login").value;

    login(email, senha);
  });
}
