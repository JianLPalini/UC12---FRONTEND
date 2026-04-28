let cartas = []
let primeiraCarta = null
let segundaCarta = null
let bloqueio = false
let pontuacao = 0
let jogadas = 0
let paresEncontrados = 0  
let tempo = 0        
let timerInterval = null  

// Lista de emojis (pares)
const emojis = [
    "🐶", "🐱", "🐭", "🐹",
    "🐰", "🦊", "🐻", "🐼", 
    "🐨", "🐸", "🐒", "🐔", 
    "🦁", "🐙", "🦄", "🐉"
]

const quantidadePares = 8;

function criarCartas() {
    const tabuleiro = document.getElementById('tabuleiro')
    
    tabuleiro.innerHTML = ''

    let cartasEmbaralhadas = [...emojisSelecionados, ...emojisSelecionados];

    
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