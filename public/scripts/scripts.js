const recipe = document.querySelectorAll('.card-receitas');
const recipe_sections = document.querySelectorAll(".recipe__section");
const cardHome = document.querySelectorAll(".card-home")


for (let i = 0; i < recipe.length; i++){
    recipe[i].addEventListener("click", function(){
    window.location.href = `/receitas/${i}`
    });
}

for (let i = 0; i < cardHome.length; i++){
  cardHome [i].addEventListener('click', function(){
    window.location.href = `receitas/${i}`
  })
}

for (let recipe_section of recipe_sections) {
    const section = recipe_section.querySelector(".recipe__description");
    recipe_section
      .querySelector(".recipe__expansion")
      .addEventListener("click", function() {
        if (section.classList.contains("active") === true) {
          section.classList.remove("active");
          recipe_section.querySelector(".recipe__expansion").innerHTML =
            "ESCONDER";
        } else {
          section.classList.add("active");
          recipe_section.querySelector(".recipe__expansion").innerHTML =
            "MOSTRAR";
        }
      });
  }