const começar = document.querySelector(".btn-iniciar");
const botoes = document.querySelectorAll(".botao");
const tempo = document.querySelector(".tempo");
const btnFoco = document.querySelector("#foco");
const btnPausa = document.querySelector("#pausa");
const btnDescanso = document.querySelector("#descanso");
const nivelTxt = document.querySelector(".nivel");
const icone = document.querySelector(".icon");
const sobre = document.querySelector(".sobre");
const musica = document.querySelector(".music");
const musicaElemento = document.querySelector(".musica");
const bip = new Audio("../assets/sons/bip.mp3");
bip.volume = 0.25;

// define tempo default do contador
let tempoEmSegundos = 1500;
let intervaloId = null;
let estadoAtual = "foco";
let xp = 0;
let nivelDeHeroi = 2;

// remover classe de botoes
botoes.forEach((botao) => {
    botao.addEventListener("click", toggleClasse);
});

function toggleClasse() {
    botoes.forEach((botao) => {
        botao.classList.remove("active");
    });

    this.classList.add("active");
}

function removerClasse() {
    botoes.forEach((botao) => {
        botao.classList.remove("active");
    });
}

icone.addEventListener("click", () => {
    sobre.classList.toggle("hidden");
});
musica.addEventListener("click", () => {
    musicaElemento.classList.toggle("hidden");
});

// logica do contador
começar.addEventListener("click", iniciaOuPausa);

btnFoco.addEventListener("click", () => {
    tempoEmSegundos = 1500;
    estadoAtual = "foco";
    mostrarTempo();
    zerar();
    começar.textContent = "Iniciar";
});

btnPausa.addEventListener("click", () => {
    tempoEmSegundos = 300;
    estadoAtual = "pausa";
    mostrarTempo();
    zerar();
    começar.textContent = "Iniciar";
});

btnDescanso.addEventListener("click", () => {
    tempoEmSegundos = 900;
    estadoAtual = "descanso";
    mostrarTempo();
    zerar();
    começar.textContent = "Iniciar";
});

function iniciaOuPausa() {
    if (intervaloId) {
        começar.textContent = "Retomar";
        zerar();
        return;
    }

    intervaloId = setInterval(contagemRegressiva, 1000);
    começar.textContent = "Pausar";
}

function contagemRegressiva() {
    if (tempoEmSegundos > 0) {
        tempoEmSegundos -= 1;
        mostrarTempo();
    } else {
        verificaTempo();
    }
}

function mostrarTempo() {
    const time = new Date(tempoEmSegundos * 1000);
    const tempoFormatado = time.toLocaleTimeString("pt-BR", { minute: "2-digit", second: "2-digit" });
    tempo.innerHTML = `${tempoFormatado}`;
}

function zerar() {
    clearInterval(intervaloId);
    intervaloId = null;
}

function verificaTempo() {
    if (tempoEmSegundos === 0) {
        bip.play();
        alert("Tempo finalizado!");

        // Transição entre os estados
        if (estadoAtual === "foco") {
            removerClasse();
            tempoEmSegundos = 300;
            estadoAtual = "pausa";
            btnPausa.classList.add("active");
            xp += 1;
            verificaPontos();
        } else if (estadoAtual === "pausa") {
            removerClasse();
            tempoEmSegundos = 900;
            estadoAtual = "descanso";
            btnDescanso.classList.add("active");
            xp += 1;
            verificaPontos();
        } else if (estadoAtual === "descanso") {
            removerClasse();
            tempoEmSegundos = 1500;
            estadoAtual = "foco";
            btnFoco.classList.add("active");
            xp += 1;
            verificaPontos();
        }
        mostrarTempo();
        zerar();
        começar.textContent = "Iniciar";
    }
}

function verificaPontos() {
    if (xp % 3 == 0) {
        nivelDeHeroi += 1;
        console.log("Novo nível de herói:", nivelDeHeroi);
    }
    adicionaClasse();
}

function adicionaClasse() {
    switch (nivelDeHeroi) {
        case 3:
            nivelTxt.textContent = "lvl: Focado";
            break;
        case 4:
            nivelTxt.textContent = "lvl: Determinado";
            break;
        case 5:
            nivelTxt.textContent = "lvl: Disciplinado";
            break;
    }
}
