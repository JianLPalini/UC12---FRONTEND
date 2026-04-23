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