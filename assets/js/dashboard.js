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
    let minutos = date.getMinutes();
    let hora = date.getHours() ;
    let bem_vindo = document.getElementById("mensagem_entrada");
    bem_vindo.textContent = `Olá, ${usuario} ${sobrenome}!  ${diasDaSemana[date.getDay()]}, ${date.toLocaleDateString()} - ${hora}:${minutos} (-${fusoHorario}:00)`;
    
}, 1000);
