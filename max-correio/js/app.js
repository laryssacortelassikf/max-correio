/*<!--
  app.js
  Controla as animações de coração e o envio de mensagens anônimas.
-->*/
  import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
  const auth = getAuth();

  // Verifica se o usuário está logado e com e-mail verificado
  onAuthStateChanged(auth, (user) => {
    if (!user || !user.emailVerified) {
      window.location.href = "index.html";
    }
  });

  // Lista de usuários simulados (para testes)
  const usuarios = ['ana.silva', 'bruno.costa', 'carla.mendes', 'daniel.santos', 'elaine.rodrigues'];
  const selectUsuario = document.getElementById('usuario');
  usuarios.forEach(user => {
    const option = document.createElement('option');
    option.value = user;
    option.textContent = user;
    selectUsuario.appendChild(option);
  });

  // Animação de corações subindo na tela
  const heartContainer = document.getElementById('heart-container');
  function criaCoracao() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.textContent = '💖';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.bottom = '0px';
    heart.style.fontSize = (10 + Math.random() * 20) + 'px';
    heart.style.animationDuration = (4 + Math.random() * 3) + 's';
    heartContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 7000);
  }
  setInterval(criaCoracao, 600);

  // Envio de mensagem anônima
  document.getElementById('form-mensagem').addEventListener('submit', e => {
    e.preventDefault();
    const destinatario = selectUsuario.value;
    const apelido = document.getElementById('apelido').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    if (!destinatario || !mensagem) {
      alert('Por favor, selecione um usuário e escreva uma mensagem.');
      return;
    }

    alert(`Mensagem para ${destinatario} enviada! 💌\nApelido: ${apelido || '(nenhum)'}\nMensagem: ${mensagem}`);

    document.getElementById('apelido').value = '';
    document.getElementById('mensagem').value = '';
    selectUsuario.value = '';
  });
