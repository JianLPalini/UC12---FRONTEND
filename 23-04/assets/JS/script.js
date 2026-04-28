const title = document.querySelector("h3");
const input = document.querySelector("input");
const link = document.getElementById('link');

const img = document.getElementById('imagem')
const btn = document.getElementById('btn')

input.addEventListener("input", (event) => {
    title.innerHTML = `Nome: <span style="color: blue;">${event.target.value}</span>`;
});

link.setAttribute('href , https://www.youtube.com/')

console.log(link.getAttribute('href'))
console.log(link.getAttribute('id'))


btn.addEventListener('click' , () =>{
img.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/pt/9/95/Charizard.png')
img.setAttribute('alt', 'Charizard')
})


const imagens = [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmlHdAQdwHtiDpyPlIN16T6p5YLHV5fjdsMg&s",
            "https://upload.wikimedia.org/wikipedia/pt/9/95/Charizard.png",

        ];

 let indice = 0;

 botao.addEventListener("click", function() {
            indice = indice + 1;
            
            if (indice >= imagens.length) {
                indice = 0;  
            }
            imagem.src = imagens[indice];
        });