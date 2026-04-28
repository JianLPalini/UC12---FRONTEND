const itens = [
    '<img src="https://i.pinimg.com/736x/5b/39/52/5b39523cd9a759f803d9a2f319648d9f.jpg" class="img-carta">',
    '<img src="https://i.pinimg.com/1200x/bb/ab/a4/bbaba4dd43f53151a17014ca0c2edce1.jpg" class="img-carta">',
    '<img src="https://i.pinimg.com/736x/50/32/f4/5032f45191aa0011caab6a3f0460f5b0.jpg" class="img-carta">',
    '<img src="https://i.pinimg.com/1200x/07/32/21/073221aca28ae883baf7c7fd4cf76ce8.jpg" class="img-carta">',
    '<img src="https://i.pinimg.com/1200x/fb/11/a9/fb11a91b01a7f378401b95d8d9b988be.jpg" class="img-carta">',
    '<img src="https://i.pinimg.com/1200x/20/96/e5/2096e548b7f7c851f691f5c7eb9bcc65.jpg" class="img-carta">'
]

const tabuleiro = document.querySelector("#tabuleiro")
const pontosTexto = document.querySelector("#pontos")
const jogadasTexto = document.querySelector("#jogadas")
const tempoTexto = document.querySelector("#tempo")
const btnReiniciar = document.querySelector("#btnReiniciar")

let carta1 = null
let carta2 = null
let bloqueado = false
let pontos = 0
let jogadas = 0
let paresAcertados = 0
let tempo = 0
let timer = null

function embaralhar(cartas) {
    return cartas.sort(() => Math.random() - 0.5)
}

function criarCartas() {
    tabuleiro.innerHTML = ""

    let cartas = [...itens, ...itens]
    cartas = embaralhar(cartas)

    cartas.forEach((conteudo) => {
        const carta = document.createElement("div")

        carta.classList.add("carta")
        carta.dataset.conteudo = conteudo
        carta.dataset.encontrada = "false"

        carta.innerHTML = `
            <div class="frente">${conteudo}</div>
            <div class="verso">?</div>
        `;

        carta.addEventListener("click", () => clicarCarta(carta))

        tabuleiro.appendChild(carta)
    });
}

function clicarCarta(carta) {
    if (bloqueado) return
    if (carta.dataset.encontrada === "true") return
    if (carta.classList.contains("virada")) return

    carta.classList.add("virada")

    if (carta1 === null) {
        carta1 = carta
    } else {
        carta2 = carta
        jogadas++
        jogadasTexto.textContent = jogadas

        compararCartas()
    }
}

function compararCartas() {
    const conteudo1 = carta1.dataset.conteudo
    const conteudo2 = carta2.dataset.conteudo

    if (conteudo1 === conteudo2) {
        pontos++
        paresAcertados++

        pontosTexto.textContent = pontos

        carta1.dataset.encontrada = "true"
        carta2.dataset.encontrada = "true"

        carta1.classList.add("correta")
        carta2.classList.add("correta")

        limparCartas();

        if (paresAcertados === itens.length) {
            fimDeJogo()
        }
    } else {
        bloqueado = true;

        setTimeout(() => {
            carta1.classList.remove("virada")
            carta2.classList.remove("virada")

            limparCartas()
            bloqueado = false
        }, 1000);
    }
}

function limparCartas() {
    carta1 = null
    carta2 = null
}

function iniciarTimer() {
    clearInterval(timer)

    tempo = 0
    tempoTexto.textContent = tempo

    timer = setInterval(() => {
        tempo++;
        tempoTexto.textContent = tempo
    }, 1000)
}

function fimDeJogo() {
    clearInterval(timer)

    setTimeout(() => {
        alert(`Você venceu!
Pontos: ${pontos}
Jogadas: ${jogadas}
Tempo: ${tempo}s`)
    }, 300);
}

function reiniciarJogo() {
    carta1 = null
    carta2 = null
    bloqueado = false
    pontos = 0
    jogadas = 0
    paresAcertados = 0

    pontosTexto.textContent = pontos
    jogadasTexto.textContent = jogadas

    criarCartas()
    iniciarTimer()
}

btnReiniciar.addEventListener("click", reiniciarJogo)

criarCartas()
iniciarTimer()