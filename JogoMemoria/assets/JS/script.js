const itens = [
    "Anel", "Gandalf", "Legolas", "Aragorn", "Gollum", "Mordor" 
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
    const tabuleiro = document.getElementById('tabuleiro');
    tabuleiro.innerHTML = '';
    
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