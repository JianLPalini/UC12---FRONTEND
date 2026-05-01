// Aqui são as imagens dos personagens do Senhor dos Anéis
// Peguei os links do Pinterest, cada um é um personagem diferente
const itens = [
    '<img src="https://i.pinimg.com/736x/5b/39/52/5b39523cd9a759f803d9a2f319648d9f.jpg" class="img-carta">',
    '<img src="https://i.pinimg.com/1200x/bb/ab/a4/bbaba4dd43f53151a17014ca0c2edce1.jpg" class="img-carta">',
    '<img src="https://i.pinimg.com/736x/50/32/f4/5032f45191aa0011caab6a3f0460f5b0.jpg" class="img-carta">',
    '<img src="https://i.pinimg.com/1200x/07/32/21/073221aca28ae883baf7c7fd4cf76ce8.jpg" class="img-carta">',
    '<img src="https://i.pinimg.com/1200x/fb/11/a9/fb11a91b01a7f378401b95d8d9b988be.jpg" class="img-carta">',
    '<img src="https://i.pinimg.com/1200x/20/96/e5/2096e548b7f7c851f691f5c7eb9bcc65.jpg" class="img-carta">',
    '<img src="https://i.pinimg.com/736x/2e/52/c9/2e52c98c5b9351800918c5806f96ec85.jpg" class="img-carta">',
    '<img src="https://i.pinimg.com/736x/58/64/31/58643121a0b5a22b5e8c15b3c2f0bee1.jpg" class="img-carta">',
    '<img src="https://i.pinimg.com/736x/de/52/d8/de52d8f2460d89b0b989ba00071c78e5.jpg" class="img-carta">',
    '<img src="https://i.pinimg.com/736x/60/02/74/600274465ceaf4586a91ac2e7bcfac82.jpg" class="img-carta">'
]

// totalPares é a quantidade de personagens diferentes (10)
// cada um vai ter um par, então no total serão 20 cartas
// isso ajuda na hora de ver se o jogo acabou
const totalPares = itens.length

// == PEGANDO OS ELEMENTOS DO HTML ==
// aqui eu pego cada coisa da tela pra poder mudar depois
// usei querySelector, mas é igual getElementById
const tabuleiro = document.querySelector("#tabuleiro")     // onde as cartas vão ficar
const pontosTexto = document.querySelector("#pontos")     // mostrador de pontos
const jogadasTexto = document.querySelector("#jogadas")   // mostrador de jogadas
const tempoTexto = document.querySelector("#tempo")       // mostrador de tempo
const btnReiniciar = document.querySelector("#btnReiniciar") // botão de reiniciar

// == VARIÁVEIS DO JOGO ==
// essas variáveis guardam o estado do jogo enquanto a pessoa joga
let carta1 = null          // primeira carta que a pessoa clicou
let carta2 = null          // segunda carta que a pessoa clicou
let bloqueado = false      // quando é true, não pode clicar (usado enquanto espera)
let pontos = 0             // quantos pontos o jogador tem
let jogadas = 0            // quantas tentativas (pares de clique) o jogador já fez
let paresAcertados = 0     // quantos pares já foram encontrados
let tempo = 0              // segundos desde que o jogo começou
let timer = null          // guarda o intervalo do relógio pra poder parar depois

// == FUNÇÃO PARA EMBARALHAR ==
// essa funçao bagunça as cartas misturando elas
// o sort com random faz cada carta ir pra um lugar diferente
function embaralhar(cartas) {
    return cartas.sort(() => Math.random() - 0.5)
}

// == FUNÇÃO QUE CRIA AS CARTAS ==
// essa é a função mais importante, ela coloca as cartas na tela
function criarCartas() {
    // limpa o tabuleiro pra não duplicar cartas quando reiniciar
    tabuleiro.innerHTML = ""

    // duplica os itens
    // os 3 pontinhos ... são pra copiar o array, se não copiar ele mexe no original
    let cartas = [...itens, ...itens]

    // embaralha as cartas pra não ficarem todas na ordem
    cartas = embaralhar(cartas)

    // pra cada carta na lista, cria um elemento div na tela
    cartas.forEach((conteudo, index) => {
        const carta = document.createElement("div")

        // adiciona a classe "carta" pro CSS estilizar
        carta.classList.add("carta")

        // guarda o conteudo (a imagem) dentro do setAttribute
        // é tipo um jeito de guardar informação dentro do elemento HTML
        carta.setAttribute("data-id", index)
        carta.setAttribute("data-conteudo", conteudo)

        // marca que a carta ainda não foi encontrada
        carta.setAttribute("data-encontrada", "false")

        // aqui dentro coloca o HTML da carta, frente
        carta.innerHTML = `
        <div class="frente">${conteudo}</div>
        <div class="verso"><img src="https://i.pinimg.com/1200x/7b/52/2a/7b522a5358f8658190e943db09509110.jpg" class="img-verso"></div>
`

        // quando clicar na carta, chama a função clicarCarta
        carta.addEventListener("click", () => clicarCarta(carta))

        // coloca a carta no tabuleiro
        tabuleiro.appendChild(carta)
    });
}

// == FUNÇÃO QUE EXECUTA QUANDO CLICA NA CARTA ==
// essa é a função mais importante pra jogar
function clicarCarta(carta) {
    // se o jogo tiver bloqueado esperando desvirar, não faz nada
    if (bloqueado) return

    // se a carta já foi encontrada, não pode clicar de novo
    if (carta.getAttribute("data-encontrada") === "true") return

    // se a carta já estiver virada, não pode clicar dnv
    if (carta.classList.contains("virada")) return

    // vira a carta adicionando a classe virada
    carta.classList.add("virada")

    // se não tem nenhuma carta selecionada ainda
    if (carta1 === null) {
        // guarda essa como primeira carta
        carta1 = carta
    }
    // se ja tem a primeira e ainda não tem a segunda, e não é a mesma carta
    else if (carta2 === null && carta !== carta1) {
        // guarda como segunda carta
        carta2 = carta

        // aumenta o contador de jogadas
        jogadas++
        // atualiza na tela
        jogadasTexto.textContent = jogadas

        // chama a função que compara as duas cartas
        compararCartas()
    }
    // se clicou na mesma carta duas vezes, não faz nada (o && carta !== carta1 já cuida disso)
}

// == FUNÇÃO QUE COMPARA SE AS CARTAS SÃO IGUAIS ==
// aqui acontece a mágica: descobre se acertou ou errou
function compararCartas() {
    // pega o conteudo (a imagem) das duas cartas
    const conteudo1 = carta1.getAttribute("data-conteudo")
    const conteudo2 = carta2.getAttribute("data-conteudo")

    // se as imagens são iguais, acertou o par!
    if (conteudo1 === conteudo2) {
        // aumenta ponto e contador de pares acertados
        pontos++
        paresAcertados++
        pontosTexto.textContent = pontos

        // marca as cartas como encontradas
        carta1.setAttribute("data-encontrada", "true")
        carta2.setAttribute("data-encontrada", "true")

        // adiciona a classe correta que deixa as cartas verdes e com brilho
        carta1.classList.add("correta")
        carta2.classList.add("correta")

        // limpa a seleção
        limparCartas()

        // se já acertou todos os pares, termina o jogo
        if (paresAcertados === totalPares) {
            fimDeJogo()
        }
    } else {
        // Errou perde 1 ponto
        pontos = Math.max(0, pontos - 1)
        pontosTexto.textContent = pontos

        // bloqueia o tabuleiro pra não clicar enquanto espera
        bloqueado = true

        // espera 1 segundoe desvira as cartas
        setTimeout(() => {
            // remove a classe viradadas duas cartas
            carta1.classList.remove("virada")
            carta2.classList.remove("virada")

            // limpa a seleção
            limparCartas()

            // desbloqueia o tabuleiro
            bloqueado = false
        }, 1000)
    }
}

// == FUNÇÃO QUE LIMPA AS CARTAS SELECIONADAS ==
// só reseta as variáveis carta1 e carta2 pra null
// precisa fazer isso depois de cada tentativa
function limparCartas() {
    carta1 = null
    carta2 = null
}

// == FUNÇÃO DO CRONÔMETRO ==
// começa a contar os segundos desde que o jogo iniciou
function iniciarTimer() {
    // se já tiver um timer rodando, para ele primeiro
    clearInterval(timer)

    // começa do zero
    tempo = 0
    tempoTexto.textContent = tempo

    // a cada 1 segundo, aumenta o tempo e atualiza na tela
    timer = setInterval(() => {
        tempo++;  // aumenta 1 segundo
        tempoTexto.textContent = tempo
    }, 1000);  // 1 segund
}

// == FUNÇÃO CHAMADA QUANDO O JOGO ACABA ==
// mostra uma mensagem com a pontuação, jogadas e tempo
function fimDeJogo() {
    // para o cronômetro
    clearInterval(timer)

    // espera um pouquinho pra não atrapalhar a animação
    setTimeout(() => {
        alert(`🏆 Você venceu! 🏆Pontos: ${pontos} Jogadas: ${jogadas} Tempo: ${tempo}s`)
    }, 300)
}

// == FUNÇÃO QUE REINICIA O JOGO ==
// quando clica no botão, tudo volta ao início
function reiniciarJogo() {
    // para o timer antigo
    clearInterval(timer)

    // reseta todas as variáveis pro estado inicial
    carta1 = null
    carta2 = null
    bloqueado = false
    pontos = 0
    jogadas = 0
    paresAcertados = 0

    // atualiza os números na tela
    pontosTexto.textContent = pontos
    jogadasTexto.textContent = jogadas

    // recria as cartas
    criarCartas()

    // começa o timer do zero
    iniciarTimer()
}

// == AQUI COMEÇA O JOGO DE VERDADE ==
// configura o botão de reiniciar
btnReiniciar.addEventListener("click", reiniciarJogo)

// cria as cartas pela primeira vez
criarCartas()

// começa o cronômetro
iniciarTimer()