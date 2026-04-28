let cartas = []
let primeiraCarta = null
let segundaCarta = null
let bloqueioTabuleiro = false
let pontuacaoAtual = 0
let jogadasAtuais = 0
let paresEncontrados = 0
let tempoAtual = 0
let timerInterval = null

const emojis = [
    "🐶", "🐱", "🐭", "🐹",
    "🐰", "🦊", "🐻", "🐼",
    "🐨", "🐸", "🐒", "🐔", 
    "🦁", "🐙", "🦄", "🐉"
]


const quantidadePares = 8


function criarCartas() {

    const tabuleiro = document.getElementById('tabuleiro');
    

    tabuleiro.innerHTML = ''
    

    const emojisSelecionados = emojis.slice(0, quantidadePares)
    

    let cartasEmbaralhadas = [...emojisSelecionados, ...emojisSelecionados]
    

    
    cartasEmbaralhadas.forEach((emoji, index) => {
        const carta = document.createElement('div')
        carta.className = 'carta'
        carta.setAttribute('data-id', index)
        carta.setAttribute('data-emoji', emoji)
        carta.setAttribute('data-encontrada', 'false')
    
        
        carta.addEventListener('click', () => {
            manipularClique(carta)
        });
        
        tabuleiro.appendChild(carta)
    });
}

function manipularClique(carta) {
    console.log('Clicou na carta!')
}


window.onload = () => {
    criarCartas()
}

function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        
        [array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

function criarCartas() {
    const tabuleiro = document.getElementById('tabuleiro')
    tabuleiro.innerHTML = ''
    
    const emojisSelecionados = emojis.slice(0, quantidadePares)
    
    let cartasEmbaralhadas = [...emojisSelecionados, ...emojisSelecionados]
    cartasEmbaralhadas = embaralhar(cartasEmbaralhadas)
    
    cartasEmbaralhadas.forEach((emoji, index) => {
        const carta = document.createElement('div')
        carta.className = 'carta'
        carta.setAttribute('data-id', index)
        carta.setAttribute('data-emoji', emoji)
        carta.setAttribute('data-encontrada', 'false')
        
        
        carta.addEventListener('click', () => {
            manipularClique(carta);
        })
        
        tabuleiro.appendChild(carta);
    })
}