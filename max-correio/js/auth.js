
// Importa do Firebase via CDN (ESM)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Configuração Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDD4aLDzCiFeJ5ikZO892PILK426GN6Hcg",
  authDomain: "max-correio.firebaseapp.com",
  projectId: "max-correio",
  storageBucket: "max-correio.firebasestorage.app",
  messagingSenderId: "393510160991",
  appId: "1:393510160991:web:91d9ca358cc71cd9f1e9ea",
  measurementId: "G-HWMC9TCL1E"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Valida domínio do e-mail corporativo
function emailCorporativoValido(email) {
  return email.endsWith("@maxiconsystems.com.br");
}

// Cadastro com 3 etapas
const formEnviaCodigo = document.getElementById("form-envia-codigo");
const formConfirmaCodigo = document.getElementById("form-confirma-codigo");
const formCriaSenha = document.getElementById("form-cria-senha");

let emailValidado = "";
let codigoGerado = "";

formEnviaCodigo?.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email-cadastro").value.trim();

  if (!emailCorporativoValido(email)) {
    alert("Use um e-mail @maxiconsystems.com.br");
    return;
  }

  emailValidado = email;
  codigoGerado = Math.floor(100000 + Math.random() * 900000).toString();
  alert("Código de verificação: " + codigoGerado + " (simulado)");

  formEnviaCodigo.style.display = "none";
  formConfirmaCodigo.style.display = "block";
});

formConfirmaCodigo?.addEventListener("submit", (e) => {
  e.preventDefault();
  const codigo = document.getElementById("codigo").value.trim();

  if (codigo === codigoGerado) {
    formConfirmaCodigo.style.display = "none";
    formCriaSenha.style.display = "block";
  } else {
    alert("Código incorreto.");
  }
});

formCriaSenha?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const senha = document.getElementById("senha").value;
  const confirmaSenha = document.getElementById("confirma-senha").value;

  if (senha !== confirmaSenha) {
    alert("As senhas não coincidem.");
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, emailValidado, senha);
    alert("Cadastro realizado com sucesso!");
    window.location.href = "index.html";
  } catch (error) {
    alert("Erro ao cadastrar: " + error.message);
  }
});

// Login (index.html)
document.getElementById("login-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value;

  if (!emailCorporativoValido(email)) {
    alert("Use um e-mail @maxiconsystems.com.br");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, senha);
    window.location.href = "home.html";
  } catch (error) {
    alert("Erro ao fazer login: " + error.message);
  }
});
