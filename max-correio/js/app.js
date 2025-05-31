// Array de usuários simulados
const usuarios = [
  'ana.silva',
  'bruno.costa',
  'carla.mendes',
  'daniel.santos',
  'elaine.rodrigues',
];

// Popula o <select> com os usuários
const selectUsuario = document.getElementById('usuario');
usuarios.forEach(user => {
  const option = document.createElement('option');
  option.value = user;
  option.textContent = user;
  selectUsuario.appendChild(option);
});

// Animação de corações subindo
const heartContainer = document.getElementById('heart-container');

function criaCoracao() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.textContent = '💖';

  // Posição absoluta para surgir no fundo da tela
  heart.style.position = 'absolute';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.bottom = '0px';
  heart.style.fontSize = (10 + Math.random() * 20) + 'px';
  heart.style.animationDuration = (4 + Math.random() * 3) + 's';

  heartContainer.appendChild(heart);

  setTimeout(() => heart.remove(), 7000);
}

setInterval(criaCoracao, 600);

// Lida com envio do formulário
document.getElementById('form-mensagem').addEventListener('submit', e => {
  e.preventDefault();

  const destinatario = selectUsuario.value;
  const apelido = document.getElementById('apelido').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();

  if (!destinatario || !mensagem) {
    alert('Por favor, selecione um usuário e escreva uma mensagem.');
    return;
  }

  alert(
    `Mensagem para ${destinatario} enviada! 💌\n` +
    `Apelido: ${apelido || '(nenhum)'}\n` +
    `Mensagem: ${mensagem}`
  );

  // Limpa os campos
  document.getElementById('apelido').value = '';
  document.getElementById('mensagem').value = '';
  selectUsuario.value = '';
});
