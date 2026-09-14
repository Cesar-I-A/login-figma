// ==========================================
// 1. TEMA ESCURO (Preservado do seu código)
// ==========================================
const botaoDark = document.getElementById("lampada");

if (botaoDark) {
    botaoDark.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
        const modoEscuroAtivo = document.body.classList.contains("dark-theme");
        localStorage.setItem("tema", modoEscuroAtivo ? "escuro" : "claro");
    });
}

if (localStorage.getItem("tema") === "escuro") {
    document.body.classList.add("dark-theme");
}

// ==========================================
// 2. ESTRUTURA DE DADOS E ESTATO INICIAL
// ==========================================
const dadosIniciaisAparelhos = {
    cafeteira: {
        nome: "Cafeteira Smart",
        comodoId: 1,
        usuarios: [
            { nome: "Felipe", consumo: 0.2 },
            { nome: "João", consumo: 0.3 },
            { nome: "Maria", consumo: 0.5 }
        ],
        diario: [2, 3, 2, 4, 5, 3, 4],
        horario: [1, 4, 2, 6, 3, 5, 2]
    },
    panela: {
        nome: "Panela Elétrica",
        comodoId: 2,
        usuarios: [
            { nome: "Felipe", consumo: 30 },
            { nome: "João", consumo: 35 },
            { nome: "Maria", consumo: 40 }
        ],
        diario: [8, 9, 10, 11, 12, 10, 9],
        horario: [3, 5, 8, 10, 7, 4, 2]
    }
};

const comodosIniciais = [
    { id: 1, nome: "Quarto Principal" },
    { id: 2, nome: "Cozinha" },
    { id: 3, nome: "Sala" }
];

// Carregar do LocalStorage ou usar dados iniciais
let comodos = JSON.parse(localStorage.getItem("comodos")) || comodosIniciais;
let dadosAparelhos = JSON.parse(localStorage.getItem("dadosAparelhos")) || dadosIniciaisAparelhos;

function salvarStorage() {
    localStorage.setItem("comodos", JSON.stringify(comodos));
    localStorage.setItem("dadosAparelhos", JSON.stringify(dadosAparelhos));
}

// ==========================================
// 3. GERENCIAMENTO DE CÔMODOS
// ==========================================
const formComodo = document.getElementById("form-comodo");
const inputNomeComodo = document.getElementById("nome-comodo");
const listaComodos = document.getElementById("lista-comodos");
const selectComodo = document.getElementById("select-comodo");

function renderizarComodos() {
    listaComodos.innerHTML = "";
    selectComodo.innerHTML = '<option value="">Selecione um Cômodo...</option>';

    comodos.forEach(comodo => {
        // Renderizar lista de comodos
        const li = document.createElement("li");
        li.className = "item-comodo";
        li.innerHTML = `
            <span>${comodo.nome}</span>
            <button class="btn btn-danger" onclick="removerComodo(${comodo.id})">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;
        listaComodos.appendChild(li);

        // Preencher o select de dispositivos
        const option = document.createElement("option");
        option.value = comodo.id;
        option.textContent = comodo.nome;
        selectComodo.appendChild(option);
    });
}

formComodo.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = inputNomeComodo.value.trim();
    if (nome) {
        const novoComodo = {
            id: Date.now(),
            nome: nome
        };
        comodos.push(novoComodo);
        salvarStorage();
        renderizarComodos();
        inputNomeComodo.value = "";
    }
});

function removerComodo(id) {
    comodos = comodos.filter(c => c.id !== id);
    // Remover dispositivos associados a esse cômodo
    Object.keys(dadosAparelhos).forEach(chave => {
        if (dadosAparelhos[chave].comodoId === id) {
            delete dadosAparelhos[chave];
        }
    });
    salvarStorage();
    renderizarComodos();
    renderizarDispositivos();
}

// ==========================================
// 4. GERENCIAMENTO DE DISPOSITIVOS
// ==========================================
const formDispositivo = document.getElementById("form-dispositivo");
const inputNomeDispositivo = document.getElementById("nome-dispositivo");
const containerDispositivos = document.getElementById("container-dispositivos");

function renderizarDispositivos() {
    containerDispositivos.innerHTML = "";

    Object.keys(dadosAparelhos).forEach(id => {
        const aparelho = dadosAparelhos[id];
        const btn = document.createElement("button");
        btn.className = "aparelho";
        btn.dataset.aparelho = id;
        btn.innerHTML = `
            ${aparelho.nome} 
            <i class="fa-solid fa-xmark" onclick="removerDispositivo(event, '${id}')" style="margin-left:8px; color:red;"></i>
        `;

        btn.addEventListener("click", (e) => {
            // Evita disparar se clicar no botão de deletar
            if(e.target.tagName === "I") return;

            document.querySelectorAll(".aparelho").forEach(b => b.classList.remove("selecionado"));
            btn.classList.add("selecionado");
            mostrarDados(aparelho);
        });

        containerDispositivos.appendChild(btn);
    });
}

formDispositivo.addEventListener("submit", (e) => {
    e.preventDefault();
    const comodoId = Number(selectComodo.value);
    const nome = inputNomeDispositivo.value.trim();

    if (comodoId && nome) {
        const idChave = "dev_" + Date.now();
        // Cria dispositivo com dados genéricos/mockados de consumo
        dadosAparelhos[idChave] = {
            nome: nome,
            comodoId: comodoId,
            usuarios: [
                { nome: "Felipe", consumo: Math.floor(Math.random() * 10) + 1 },
                { nome: "João", consumo: Math.floor(Math.random() * 10) + 1 },
                { nome: "Maria", consumo: Math.floor(Math.random() * 10) + 1 }
            ],
            diario: Array.from({length: 7}, () => Math.floor(Math.random() * 10) + 1),
            horario: Array.from({length: 7}, () => Math.floor(Math.random() * 10) + 1)
        };

        salvarStorage();
        renderizarDispositivos();
        inputNomeDispositivo.value = "";
    }
});

function removerDispositivo(event, id) {
    event.stopPropagation();
    delete dadosAparelhos[id];
    salvarStorage();
    renderizarDispositivos();
    document.getElementById("tituloAparelho").textContent = "Selecione um dispositivo para ver os dados";
    destruirGraficos();
}

// ==========================================
// 5. CHART.JS / RENDERING (Preservado)
// ==========================================
let graficoConsumo;
let graficoDiario;
let graficoHorario;

function destruirGraficos() {
    if (graficoConsumo) graficoConsumo.destroy();
    if (graficoDiario) graficoDiario.destroy();
    if (graficoHorario) graficoHorario.destroy();
}

function mostrarDados(aparelho) {
    document.getElementById("tituloAparelho").textContent = `Dados de Uso - ${aparelho.nome}`;

    destruirGraficos();

    const nomes = aparelho.usuarios.map(u => u.nome);
    const consumos = aparelho.usuarios.map(u => u.consumo);

    const cores = ["#3BFF00", "#E5CD19", "#149FB8", "#4bc0c0", "#9966ff", "#ff9f40"];
    const coresUsuarios = aparelho.usuarios.map((_, index) => cores[index % cores.length]);

    // GRÁFICO DE CONSUMO
    graficoConsumo = new Chart(document.getElementById("graficoConsumo"), {
        type: "pie",
        data: {
            labels: nomes,
            datasets: [{ data: consumos, backgroundColor: coresUsuarios }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: "bottom" } }
        }
    });

    // GRÁFICO DIÁRIO
    graficoDiario = new Chart(document.getElementById("graficoDiario"), {
        type: "bar",
        data: {
            labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
            datasets: [{ label: "Consumo", data: aparelho.diario, backgroundColor: "#149FB8" }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });

    // GRÁFICO HORÁRIO
    graficoHorario = new Chart(document.getElementById("graficoHorario"), {
        type: "bar",
        data: {
            labels: ["08h", "10h", "12h", "14h", "16h", "18h", "20h"],
            datasets: [{ label: "Uso", data: aparelho.horario, backgroundColor: "#E5CD19" }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

// Inicialização da Página
renderizarComodos();
renderizarDispositivos();