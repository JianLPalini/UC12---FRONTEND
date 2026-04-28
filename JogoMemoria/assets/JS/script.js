const itens = [
    '<img src="https://i.pinimg.com/736x/5b/39/52/5b39523cd9a759f803d9a2f319648d9f.jpg" class="img-carta">',
    '<img src="https://i.pinimg.com/1200x/bb/ab/a4/bbaba4dd43f53151a17014ca0c2edce1.jpg" class="img-carta">',
    '<img src="https://i.pinimg.com/736x/50/32/f4/5032f45191aa0011caab6a3f0460f5b0.jpg="img-carta">',
    '<img src="https://i.pinimg.com/1200x/07/32/21/073221aca28ae883baf7c7fd4cf76ce8.jpg" class="img-carta">',
    '<img src="https://i.pinimg.com/1200x/fb/11/a9/fb11a91b01a7f378401b95d8d9b988be.jpg" class="img-carta">',
    '<img src="https://i.pinimg.com/1200x/20/96/e5/2096e548b7f7c851f691f5c7eb9bcc65.jpg" class="img-carta">'
]

const totalPares = itens.length;

let carta1 = null
let carta2 = null
let bloqueado = false
let pontos = 0
let jogadas = 0
let paresAcertados = 0 
let tempo = 0         
let timer = null         

function criarCartas() {
    const tabuleiro = document.getElementById('tabuleiro')
    tabuleiro.innerHTML = ''
    
    let cartas = [...itens, ...itens]
    

    cartas = embaralhar(cartas)
    
    cartas.forEach((conteudo, index) => {
        const carta = document.createElement('div')
        carta.className = 'carta'
        carta.setAttribute('data-id', index)
        carta.setAttribute('data-conteudo', conteudo)
        carta.setAttribute('data-encontrada', 'false')
        
        carta.innerHTML = `
            <div class="frente">${conteudo}</div>
            <div class="verso">?</div>
        `;
        
        carta.addEventListener('click', () => {
            cliqueCarta(carta)
        });
        
        tabuleiro.appendChild(carta)
    });
}

function embaralhar(array) {
    return array.sort(() => Math.random() - 0.5)
}

function cliqueCarta(carta) {
    console.log('Clicou na carta:', carta.getAttribute('data-conteudo'))
}

window.onload = () => {
    criarCartas()
};

function embaralhar(array) {

    return array.sort(() => Math.random() - 0.5)
}

function criarCartas() {
    const tabuleiro = document.getElementById('tabuleiro')
    tabuleiro.innerHTML = ''
    
    let cartas = [...itens, ...itens]
    
    cartas = embaralhar(cartas)
    
    cartas.forEach((conteudo, index) => {
        const carta = document.createElement('div')
        carta.className = 'carta'
        carta.setAttribute('data-id', index)
        carta.setAttribute('data-conteudo', conteudo)
        carta.setAttribute('data-encontrada', 'false')
        
        carta.innerHTML = `
            <div class="frente">${conteudo}</div>
            <div class="verso"></div>
        `
        
        carta.addEventListener('click', () => {
            cliqueCarta(carta)
        })
        
        tabuleiro.appendChild(carta)
    })
}

function virarCarta(carta) {
    carta.classList.add('virada')
}

function desvirarCarta(carta) {
    carta.classList.remove('virada')
}

function cliqueCarta(carta) {

    if (bloqueado) return
    if (carta.getAttribute('data-encontrada') === 'true') return
    if (carta.classList.contains('virada')) return
    
    if (carta1 === null) {
        carta1 = carta
        virarCarta(carta1)
    } else if (carta2 === null && carta !== carta1) {
        carta2 = carta
        virarCarta(carta2)

        jogadas++
        document.getElementById('jogadas').textContent = jogadas
        
    }
}

function compararCartas(){
    const conteudo1 = carta1.getAttribute('data-conteudo')
    const conteudo2 = carta2.getAttribute('data-conteudo')

    if (conteudo1 === conteudo2){
        pontos++
        paresAcertados++
        document.getElementById('pontos').textContent = pontos

        carta1.setAttribute('data-encontrada', 'true')
        carta2.setAttribute('data-encontrada', 'true')
        carta1.classLista.add('correta')
        carta2.classList.add('correta')

        limparSelecao()

        if (paresAcertados === totalPares){
            fimDeJogo()
        }
    } else{
        pontos = Math.max(0, pontos -1)
        document.getElementById('pontos').textContent = pontos

        bloqueado = true
        setTimeout(() => {
            desvirarCarta(carta1)
            desvirarCarta(carta2)
            bloqueado = false
            limparSelecao()
        }, 1000)
    }
}

function limparSelecao() {
    carta1 = null
    carta2 = null
}

function fimDeJogo() {
    if(timer){
        clearInterval(timer)
    }
    setTimeout(() =>{
        alert('🏆 Você venceu! 🏆\n Pontos: ${pontos}\n Jogadas: ${jogadas}\n Tempo: ${tempo}s')
    }, 100)
}

function cliqueCarta(carta){
    if(bloqueado) return
    if(carta.getAttribute('data-encontrada') === 'true') return
    if(carta.classList.contains('virada')) return

    if(carta1 === null){
        carta1 = carta
        virarCarta(carta2)

        jogadas++
        document.getElementById('jogadas').textContent = jogadas

        compararCartas()
    }
}

function iniciarTimer(){
    if(timer) {
        clearInterval(timer)
    }

    tempo = 0
    document.getElementById('tempo').textContent = tempo

    timer = setInterval(() => {
        tempo++
        document.getElementById('tempo').textContent = tempo
    }, 1000)
}

window.onload = () => {
    criarCartas()
    iniciarTimer
}

function reiniciarJogo(){
    if(timer){
        clearInterval(timer)
    }

    carta1 = null
    carta2 = null
    bloqueado = false
    pontos = 0
    jogadas = 0
    paresAcertados = 0

    document.getElementById('pontos').textContent = pontos
    document.getElementById('jogadas').textContent = jogadas

    criarCartas()

    iniciarTimer()
}

window.onload = () => {
    criarCartas()
    iniciarTimer

    const btnReiniciar = document.getElementById('btnReiniciar')
    btnReiniciar.addEventListener('click', reiniciarJogo)
}