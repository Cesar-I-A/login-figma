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