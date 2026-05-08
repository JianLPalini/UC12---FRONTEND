const div = document.querySelector("div")
const btn = document.querySelector("btn")
const btnRem = document.getElementById("btn-rem")

btn.addEventListener("click", () => {
    const box = document.createElement("div")
    box.classList.add("container")
    div.appendChild(box)
})

// elemento.children é um array que contém TODOS os filhos de um elemento
// remove() remove um elemento
btnRem.addEventListener("click", () =>{
    if(div.children.length > 0){
        div.children[0].remove()
    }
})