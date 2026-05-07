const div = document.querySelector("div")
const btn = document.querySelector("button")

let numero = 0
let numeroDeItens = 0
btn.addEventListener("click", () => {
    if(numeroDeItens == 0){
        numero = numeroDeItens
    }
    const box = document.createElement("div")
    box.classList.add("box")
    numero += 1
    numeroDeItens ++
    box.textContent = numero
    div.appendChild(box)

    box.addEventListener("click", () => {
        box.remove()
        numeroDeItens--
    })
    div.appendChild(box)
})
