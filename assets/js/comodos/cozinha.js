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
