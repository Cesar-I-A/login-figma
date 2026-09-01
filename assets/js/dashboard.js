
const botaoDark = document.getElementById('lampada');
const lampada = document.getElementByClass('lampada');
// Altera o tema ao clicar na lâmpada
botaoDark.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    document.lampada.classList.toggle('dark-theme');
    // Salva a preferência do usuário
    const modoEscuroAtivo = document.body.classList.contains('dark-theme');
    localStorage.setItem('tema', modoEscuroAtivo ? 'escuro' : 'claro');
});

// Mantém o tema escolhido ao recarregar a página
if (localStorage.getItem('tema') === 'escuro') {
    document.body.classList.add('dark-theme');
}

let usuario = prompt("Digite seu nome de usuário:");
let sobrenome = prompt("Digite seu sobrenome de usuário:");
let date = new Date();
let dia = date.getDate();
let mes = date.getMonth();
let hora = date.getHours();
let minutos = date.getMinutes();
const diasDaSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

setInterval(function() {
   
    let date = new Date();
    const fusoHorario = date.getTimezoneOffset() / 60;
    let minutos = date.getMinutes().toString().padStart(2, '0');
    let hora = date.getHours().toString().padStart(2, '0');
    let bem_vindo = document.getElementById("mensagem_entrada");
    bem_vindo.textContent = `Bem vindo\n ${usuario} ${sobrenome}!  ${diasDaSemana[date.getDay()]}, ${date.toLocaleDateString()} - ${hora}:${minutos} (-${fusoHorario}:00)`;
    
}, 1000);
