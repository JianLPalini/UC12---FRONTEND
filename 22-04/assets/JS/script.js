const perguntas = [
    {
        texto: "Qual é o nome da espada usada pelos caçadores de demônios?",
        respostas: ["Katana comum", "Nichirin Blade", "Wakizashi", "Arco e flecha", "Machado de batalha"],
        correta: "Nichirin Blade"
    },
    {
        texto: "Qual é o nome da primeira respiração que Tanjiro Kamado aprendeu?",
        respostas: ["Respiração do Sol", "Respiração da Água", "Respiração do Vento", "Respiração da Lua", "Respiração do Trovão"],
        correta: "Respiração da Água"
    },
    {
    texto: "Qual é o nome da irmã de Tanjiro que se transforma em demônio?",
    respostas: ["Shinobu Kocho", "Kanao Tsuyuri", "Nezuko Kamado", "Mitsuri Kanroji", "Aoi Kanzaki"],
    correta: "Nezuko Kamado"
    },
    {
    texto: "Qual Hashira utiliza a Respiração do Fogo?",
    respostas: ["Giyu Tomioka", "Sanemi Shinazugawa", "Kyojuro Rengoku", "Obanai Iguro", "Gyomei Himejima"],
    correta: "Kyojuro Rengoku"
    },
    {
    texto: "Qual é o nome do principal vilão de Demon Slayer?",
    respostas: ["Kokushibo", "Akaza", "Muzan Kibutsuji", "Douma", "Gyutaro"],
    correta: "Muzan Kibutsuji"
    }
];

let estado = {
    perguntaAtual: 0,
    pontuacao: 0,
    podeResponder: true
};

const elementos = {
    container: document.querySelector('.quiz-container'),
    pergunta: document.querySelector('.pergunta'),
    botoesContainer: document.querySelector('.botoes-resposta'),
    resultado: document.querySelector('.resultado'),
    reiniciarBtn: document.querySelector('.btn-reiniciar')
};

function carregarPergunta() {
    estado.podeResponder = true;
    const pergunta = perguntas[estado.perguntaAtual];
    
    elementos.pergunta.textContent = pergunta.texto;
    
    elementos.botoesContainer.innerHTML = '';
    pergunta.respostas.forEach(resposta => {
        const botao = document.createElement('button');
        botao.textContent = resposta;
        botao.classList.add('btn-resposta');
        botao.addEventListener('click', () => verificarResposta(resposta, botao));
        elementos.botoesContainer.appendChild(botao);
    });
    
    elementos.resultado.innerHTML = `Pontuação: ${estado.pontuacao}/${perguntas.length}`;
    elementos.resultado.style.color = "#ffb347";
}

function verificarResposta(respostaSelecionada, botaoClicado) {
    if (!estado.podeResponder) return;
    
    const pergunta = perguntas[estado.perguntaAtual];
    const todosBotoes = document.querySelectorAll('.btn-resposta');
    const acertou = (respostaSelecionada === pergunta.correta);
    
    if (acertou) {
        estado.pontuacao += 10;
        elementos.resultado.innerHTML = ` Acertou Mizeravel! <br> Pontuação: ${estado.pontuacao}/${perguntas.length*10}`;
        elementos.resultado.style.color = "#a5d6a5";
    } else {
        elementos.resultado.innerHTML = ` Errado! Seu burro. A resposta correta é: ${pergunta.correta}<br> Pontuação: ${estado.pontuacao}/${perguntas.length}`;
        elementos.resultado.style.color = "#ffaaaa";
    }
    
    todosBotoes.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === pergunta.correta) {
            btn.style.backgroundColor = "#2e7d32";
            btn.style.border = "2px solid gold";
        } else if (btn === botaoClicado && !acertou) {
            btn.style.backgroundColor = "#8b0000";
        }
    });
    
    estado.podeResponder = false;
    
    setTimeout(() => {
        if (estado.perguntaAtual + 1 < perguntas.length) {
            estado.perguntaAtual++;
            carregarPergunta();
        } else {
            finalizarQuiz();
        }
    }, 1500);
}

function finalizarQuiz() {
    elementos.resultado.innerHTML = ` QUIZ FINALIZADO COM SUCESSO! <br> Você fez ${estado.pontuacao} de ${perguntas.length} perguntas!`;
    elementos.resultado.style.color = "#ffd966";
    elementos.reiniciarBtn.style.display = "inline-block";
    estado.podeResponder = false;
}

function reiniciarQuiz() {
    estado = {
        perguntaAtual: 0,
        pontuacao: 0,
        podeResponder: true
    };
    
    elementos.reiniciarBtn.style.display = "none";
    carregarPergunta();
}

elementos.reiniciarBtn.addEventListener('click', reiniciarQuiz);

carregarPergunta();