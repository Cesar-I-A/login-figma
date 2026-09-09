const botaoDark = document.getElementById('lampada');
botaoDark.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const modoEscuroAtivo = document.body.classList.contains('dark-theme');
    localStorage.setItem('tema', modoEscuroAtivo ? 'escuro' : 'claro');
});

if (localStorage.getItem('tema') === 'escuro') {
    document.body.classList.add('dark-theme');
    if (localStorage.getItem('tema') === 'escuro') { 
        document.body.classList.add('dark-theme'); 
    }
}

const dadosAparelhos = {

    tv: {
        nome: "Smart TV Samsung",

        consumo: [0.2,0.3,0.5],

        diario: [2, 3, 2, 4, 5, 3, 4],

        horario: [1, 4, 2, 6, 3, 5, 2]
    },

   
        aspirador: {
    nome: "Robô aspirador de pó",

    usuarios: [
        {
            nome: "Felipe",
            consumo: 5
        },

        {
            nome: "João",
            consumo: 1
        },

        {
            nome: "Maria",
            consumo: 3
        }
    ],

    diario: [1, 2, 1, 3, 2, 4, 2],

    horario: [2, 5, 3, 6, 4, 2, 1]

    },

    ar: {
        nome: "Ar condicionado Electrolux",

        consumo: [30, 35, 40],

        diario: [8, 9, 10, 11, 12, 10, 9],

        horario: [3, 5, 8, 10, 7, 4, 2]
    },

    persiana: {
        nome: "Persiana elétrica motorizada",

        consumo: [2, 3, 2],

        diario: [1, 1, 2, 1, 2, 1, 1],

        horario: [1, 2, 3, 2, 1, 1, 2]
    },
    lampada: {
        nome: "Lâmpada SMART inteligente",
        consumo: [1, 2, 1],
        diario: [1, 9,5, 1, 2, 3, 1],
        horario: [1, 1, 1, 1, 1, 1, 1]
    },
    interruptor: {
        nome: "Interruptor inteligente",
        consumo: [0.5, 1, 0.8],
        diario: [1, 4, 2, 1, 3, 2, 1],
        horario: [1, 1, 1, 1, 1, 1, 1]
    },
    controle: {
        nome: "Controle remoto universal",
        consumo: [0.7,0.2,0.1],
        diario: [1, 3, 5, 6, 1, 2, 1],
        horario: [1, 2, 3, 4, 5, 6, 7]
    },
    poltrona: {
        nome: "Poltrona elétrica reclinável",
        consumo: [5, 6, 5],
        diario: [1, 2, 1, 3, 2, 1, 2],
        horario: [1, 2, 3, 4, 5, 6, 7]
    }

};
const botoes = document.querySelectorAll(".aparelho");

botoes.forEach(botao => {

    botao.addEventListener("click", () => {

        const id = botao.dataset.aparelho;

        const dados = dadosAparelhos[id];

        mostrarDados(dados);

    });

});
let graficoConsumo;
let graficoDiario;
let graficoHorario;

function mostrarDados(aparelho) {

    document.getElementById("tituloAparelho").textContent =
        `Dados de Uso - ${aparelho.nome}`;

    if (graficoConsumo) {
        graficoConsumo.destroy();
    }

    if (graficoDiario) {
        graficoDiario.destroy();
    }

    if (graficoHorario) {
        graficoHorario.destroy();
    }


    graficoConsumo = new Chart(
    document.getElementById("graficoConsumo"),
            {
                type: "pie",

                data: {
                    labels: nomes,

                    datasets: [{
                    data: consumos,

                    backgroundColor: [
                        "#ff6384",
                        "#36a2eb",
                        "#ffce56",
                        "#4bc0c0",
                        "#9966ff",
                        "#ff9f40"
                    ]
                    }]
                },

                options: {
                    responsive: true,
                    maintainAspectRatio: false,

                    plugins: {
                        legend: {
                            position: "bottom",
                            align: "center",

                            labels: {
                                color: "#000000",
                                padding: 10
                            }
                        }
                    }
                }
            }
        );


    graficoDiario = new Chart(
        document.getElementById("graficoDiario"),
        {
            type: "bar",

            data: {
                labels: [
                    "Seg",
                    "Ter",
                    "Qua",
                    "Qui",
                    "Sex",
                    "Sáb",
                    "Dom"
                ],

                datasets: [{
                    label: "Consumo",
                    data: aparelho.diario
                }]
            }
        }
    );


    graficoHorario = new Chart(
        document.getElementById("graficoHorario"),
        {
            type: "bar",

            data: {
                labels: [
                    "08h",
                    "10h",
                    "12h",
                    "14h",
                    "16h",
                    "18h",
                    "20h"
                ],

                datasets: [{
                    label: "Uso",
                    data: aparelho.horario
                }]
            }
        }
    );

}
