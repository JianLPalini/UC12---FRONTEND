const botao1 = document.getElementById("btn1")
const img1 = document.getElementById("img1")

botao1.addEventListener("click", () => {


    img1.classList.toggle("esconde")
    if(botao1.textContent == "Esconder"){
        botao1.textContent = "Mostrar"
    } else {
        botao1.textContent = "Esconder"
    }

})

const botao2 = document.getElementById("btn2")
const img2 = document.getElementById("img2")

botao2.addEventListener("click", () => {


    img2.classList.toggle("esconde")
    if(botao2.textContent == "Esconder"){
        botao2.textContent = "Mostrar"
    } else {
        botao2.textContent = "Esconder"
    }

})

const botao3 = document.getElementById("btn3")
const img3 = document.getElementById("img3")

botao3.addEventListener("click", () => {


    img3.classList.toggle("esconde")
    if(botao3.textContent == "Esconder"){
        botao3.textContent = "Mostrar"
    } else {
        botao3.textContent = "Esconder"
    }

})

