const modalOverlay = document.querySelector(".modal-overlay");
const cards = document.querySelectorAll('.card-receitas');


for (let card of cards){
    card.addEventListener("click", function(){
        modalOverlay.classList.add('active');
        const img = card.querySelector("img").src
        const title = card.querySelector(".card-title").innerHTML
        const autor = card.querySelector(".card-subtitle").innerHTML
        modalOverlay.querySelector("img").src = img
        modalOverlay.querySelector("h1").innerHTML = title
        modalOverlay.querySelector(".modal-autor").innerHTML = autor
    });
}

document.querySelector('.close-modal').addEventListener('click', function(){
    modalOverlay.classList.remove('active')
})