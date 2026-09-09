const botaoDark = document.getElementById('lampada');
botaoDark.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const modoEscuroAtivo = document.body.classList.contains('dark-theme');
    localStorage.setItem('tema', modoEscuroAtivo ? 'escuro' : 'claro');
});

if (localStorage.getItem('tema') === 'escuro') {
    document.body.classList.add('dark-theme');
    if (lampada) {
        lampada.classList.add('dark-theme');
    }
}

const email = document.getElementById("email");
const senha = document.getElementById("senha");

const erroEmail = document.getElementById("erroEmail");
const erroSenha = document.getElementById("erroSenha");



function validarEmail(valor) {

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(valor);
}




function validarSenha(valor) {

    return valor.length >= 8;
}



function mostrarErro(input, mensagem, texto) {

    input.classList.remove("valido");
    input.classList.add("invalido");

    mensagem.textContent = texto;
}




function mostrarValido(input, mensagem) {

    input.classList.remove("invalido");
    input.classList.add("valido");

    mensagem.textContent = "";
}


document.addEventListener("submit", function(event) {

  
    event.preventDefault();

    let formularioValido = true;


    if (validarEmail(email.value.trim())) {

        mostrarValido(email, erroEmail);

    } else {

        mostrarErro(
            email,
            erroEmail,
            "Digite um e-mail válido."
        );

        formularioValido = false;
    }


    if (validarSenha(senha.value)) {

        mostrarValido(senha, erroSenha);

    } else {

        mostrarErro(
            senha,
            erroSenha,
            "A senha deve ter pelo menos 8 caracteres."
        );

        formularioValido = false;
    }

    if (formularioValido) {

        alert("Login válido!");

        // Agora pode ir para dashboard
        window.location.href = "dashboard.html";
    }

});