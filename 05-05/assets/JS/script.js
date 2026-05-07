const div = document.getElementById("conteiner")
const btn = document.getElementById("btn")

// Criar novos elementos e faze-los aparecer no HTML
btn,addEventListener("click", () =>{

const item = document.createElement("p")

item.textContent = "Texto criado com sucesso"

// Depois de criado o elemento, precisamos dizer onde ele irá ser posicionado

div.appendChild(item)
})