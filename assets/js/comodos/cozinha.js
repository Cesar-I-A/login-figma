
const botaoDark = document.getElementById("lampada");

if (botaoDark) {
    botaoDark.addEventListener("click", () => {

        document.body.classList.toggle("dark-theme");

        const modoEscuroAtivo =
            document.body.classList.contains("dark-theme");

        localStorage.setItem(
            "tema",
            modoEscuroAtivo ? "escuro" : "claro"
        );
    });
}



if (localStorage.getItem("tema") === "escuro") {
    document.body.classList.add("dark-theme");
}



const dadosAparelhos = {

    cafeteira: {
        nome: "Cafeteira Smart",

        usuarios: [
            {
                nome: "Felipe",
                consumo: 0.2
            },
            {
                nome: "João",
                consumo: 0.3
            },
            {
                nome: "Maria",
                consumo: 0.5
            }
        ],

        diario: [2, 3, 2, 4, 5, 3, 4],

        horario: [1, 4, 2, 6, 3, 5, 2]
    },


    

    panela: {
        nome: "Panela Elétrica",

        usuarios: [
            {
                nome: "Felipe",
                consumo: 30
            },
            {
                nome: "João",
                consumo: 35
            },
            {
                nome: "Maria",
                consumo: 40
            }
        ],

        diario: [8, 9, 10, 11, 12, 10, 9],

        horario: [3, 5, 8, 10, 7, 4, 2]
    },


    ar: {
        nome: "AirFryer",

        usuarios: [
            {
                nome: "Felipe",
                consumo: 2
            },
            {
                nome: "João",
                consumo: 3
            },
            {
                nome: "Maria",
                consumo: 2
            }
        ],

        diario: [1, 1, 2, 1, 2, 1, 1],

        horario: [1, 2, 3, 2, 1, 1, 2]
    },


    


    


   

};




const botoes = document.querySelectorAll(".aparelho");

botoes.forEach(botao => {

    botao.addEventListener("click", () => {

        
        botoes.forEach(b => {
            b.classList.remove("selecionado");
        });


        
        botao.classList.add("selecionado");


        // Pega o aparelho
        const id = botao.dataset.aparelho;

        const dados = dadosAparelhos[id];


        // Mostra os gráficos
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




    const nomes = aparelho.usuarios.map(
        usuario => usuario.nome
    );

    const consumos = aparelho.usuarios.map(
        usuario => usuario.consumo
    );



   

    const cores = [
        "#3BFF00",
        "#E5CD19",
        "#149FB8",
        "#4bc0c0",
        "#9966ff",
        "#ff9f40"
    ];

    const coresUsuarios = aparelho.usuarios.map(
        (_, index) => cores[index % cores.length]
    );



    // =================================
    // GRÁFICO DE CONSUMO
    // =================================

    graficoConsumo = new Chart(
        document.getElementById("graficoConsumo"),
        {

            type: "pie",

            data: {

                labels: nomes,

                datasets: [{

                    data: consumos,

                    backgroundColor: coresUsuarios

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



    // =================================
    // GRÁFICO DIÁRIO
    // =================================

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



    // =================================
    // GRÁFICO HORÁRIO
    // =================================

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