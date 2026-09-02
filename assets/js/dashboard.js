
const botaoDark = document.getElementById('lampada');




let usuario = prompt("Digite seu nome de usuário:");
let sobrenome = prompt("Digite seu sobrenome de usuário:");
let date = new Date();
let dia = date.getDate();
let mes = date.getMonth();
let hora = date.getHours();
let minutos = date.getMinutes();
const diasDaSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

//FUNÇÃO PARA APARECER DATA E HORA NA TELA DE DASHBOARD
setInterval(function() {
   
    let date = new Date();
    const fusoHorario = date.getTimezoneOffset() / 60;
    let minutos = date.getMinutes().toString().padStart(2, '0');
    let hora = date.getHours().toString().padStart(2, '0');
    let bem_vindo = document.getElementById("mensagem_entrada");
    bem_vindo.textContent = `Bem vindo\n ${usuario} ${sobrenome}!  ${diasDaSemana[date.getDay()]}, ${date.toLocaleDateString()} - ${hora}:${minutos} (-${fusoHorario}:00)`;
    
}, 1000);

//FUNÇÃO PARA MUDAR O TEMA DA PÁGINA(MODO ESCURO)

botaoDark.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    document.lampada.classList.toggle('dark-theme');
    const modoEscuroAtivo = document.body.classList.contains('dark-theme');
    localStorage.setItem('tema', modoEscuroAtivo ? 'escuro' : 'claro');
});

if (localStorage.getItem('tema') === 'escuro') {
    document.body.classList.add('dark-theme');
    if (lampada) {
        lampada.classList.add('dark-theme');
    }
}

const campoPesquisa = document.getElementById('pesquisa');
const linhasTabela = document.querySelectorAll('#tabela table tr:not(:has(th))');

campoPesquisa.addEventListener('input', () => {
    const termoBusca = campoPesquisa.value.toLowerCase();

    linhasTabela.forEach(linha => {
        const textoLinha = linha.textContent.toLowerCase();
        
        if (textoLinha.includes(termoBusca)) {
            linha.style.display = '';
        } else {
            linha.style.display = 'None';
        }
    });
});