// Dados do quiz (perguntas e respostas)
const perguntas = [
    {
        texto: "Qual é o nome da espada usada pelos caçadores de demônios?",
        respostaCorreta: "Nichirin Blade"
    },
    {
        texto: "Qual é o nome da primeira respiração que Tanjiro Kamado aprendeu?",
        respostaCorreta: "Respiração da Água"
    }
];

let perguntaAtual = 0;      // qual pergunta está sendo exibida (0 ou 1)
let quizFinalizado = false; // se o quiz já acabou
let pontuacao = 0;          // pontuação do usuário

// Elementos do DOM
const perguntasEl = document.querySelectorAll(".pergunta");
const botoesContainerEl = document.querySelectorAll(".botoes-resposta");
const resultadoEl = document.getElementById("resultado");
const reiniciarBtn = document.getElementById("reiniciar");

// Inicializa mostrando apenas a primeira pergunta
function mostrarPergunta(index) {
    // Esconde todas as perguntas e botões
    perguntasEl.forEach((el, i) => {
        if (i === index) {
            el.classList.add("active");
        } else {
            el.classList.remove("active");
        }
    });
    
    botoesContainerEl.forEach((el, i) => {
        if (i === index) {
            el.classList.add("active");
        } else {
            el.classList.remove("active");
        }
    });
}

// Desabilita todos os botões da pergunta atual
function desabilitarBotoes() {
    const botoesAtivos = document.querySelectorAll(".botoes-resposta.active .btn-resposta");
    botoesAtivos.forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = "0.6";
        btn.style.cursor = "default";
    });
}

// Verifica a resposta do usuário
function verificarResposta(event) {
    if (quizFinalizado) return;
    
    const botaoClicado = event.currentTarget;
    const respostaUsuario = botaoClicado.textContent.trim();
    const respostaCorreta = perguntas[perguntaAtual].respostaCorreta;
    
    // Impede responder a mesma pergunta duas vezes
    const botoesAtivos = document.querySelectorAll(".botoes-resposta.active .btn-resposta");
    const jaRespondeu = botoesAtivos[0].disabled === true;
    if (jaRespondeu) return;
    
    // Verifica se acertou
    if (respostaUsuario === respostaCorreta) {
        pontuacao++;
        resultadoEl.innerHTML = `✅ Correto! Você acertou! 🎉<br> Pontuação: ${pontuacao}/${perguntas.length}`;
        resultadoEl.style.color = "#a5d6a5";
    } else {
        resultadoEl.innerHTML = `❌ Errado! A resposta correta é: <strong>${respostaCorreta}</strong><br> Pontuação: ${pontuacao}/${perguntas.length}`;
        resultadoEl.style.color = "#ffaaaa";
    }
    
    // Destaca visualmente os botões
    botoesAtivos.forEach(btn => {
        const textoBtn = btn.textContent.trim();
        if (textoBtn === respostaCorreta) {
            btn.style.backgroundColor = "#2e7d32";
            btn.style.border = "2px solid gold";
        } else if (btn === botaoClicado && textoBtn !== respostaCorreta) {
            btn.style.backgroundColor = "#8b0000";
        }
    });
    
    desabilitarBotoes();
    
    // Avança para próxima pergunta ou finaliza o quiz
    if (perguntaAtual + 1 < perguntas.length) {
        // Tem próxima pergunta
        setTimeout(() => {
            perguntaAtual++;
            mostrarPergunta(perguntaAtual);
            resultadoEl.innerHTML = ""; // limpa resultado anterior
            resultadoEl.style.color = "#ffb347";
        }, 1500);
    } else {
        // Fim do quiz
        quizFinalizado = true;
        setTimeout(() => {
            resultadoEl.innerHTML = `🏆 QUIZ FINALIZADO! 🏆<br> Você acertou ${pontuacao} de ${perguntas.length} perguntas!`;
            resultadoEl.style.color = "#ffd966";
            reiniciarBtn.style.display = "inline-block";
        }, 500);
    }
}

// Adiciona eventos de clique aos botões
function iniciarEventos() {
    const todosBotoes = document.querySelectorAll(".btn-resposta");
    todosBotoes.forEach(btn => {
        btn.removeEventListener("click", verificarResposta);
        btn.addEventListener("click", verificarResposta);
    });
}

// Reinicia completamente o quiz
function reiniciarQuiz() {
    perguntaAtual = 0;
    quizFinalizado = false;
    pontuacao = 0;
    
    // Mostra primeira pergunta
    mostrarPergunta(0);
    
    // Limpa resultado
    resultadoEl.innerHTML = "";
    resultadoEl.style.color = "#ffb347";
    
    // Reseta todos os botões
    const todosBotoes = document.querySelectorAll(".btn-resposta");
    todosBotoes.forEach(btn => {
        btn.disabled = false;
        btn.style.opacity = "1";
        btn.style.backgroundColor = "#6b2e2e";
        btn.style.border = "none";
        btn.style.cursor = "pointer";
    });
    
    // Esconde botão reiniciar
    reiniciarBtn.style.display = "none";
    
    // Recria eventos
    iniciarEventos();
}

// Configura evento do botão reiniciar
reiniciarBtn.addEventListener("click", reiniciarQuiz);

// Inicia o quiz
mostrarPergunta(0);
iniciarEventos();