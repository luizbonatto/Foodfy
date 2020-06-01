const recipe = document.querySelectorAll('.card-receitas');
const recipe_sections = document.querySelectorAll(".recipe__section");
const cardHome = document.querySelectorAll(".card-home")
const currentPage = location.pathname
const menuItem = document.querySelectorAll('header .navbar a')


for (item of menuItem){
  if (currentPage.includes(item.getAttribute('href'))){
    item.classList.add('active')
  }
}

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

const addIngredientButton = document.querySelector('.add-ingredient')
const addPreparationButton = document.querySelector('.add-preparation')


if(addIngredientButton || addPreparationButton){
  addIngredientButton.addEventListener("click", addIngredient)
  addPreparationButton.addEventListener('click', addPreparation)
}


function addIngredient() {
  const ingredients = document.querySelector("#ingredients");
  const fieldContainer = document.querySelectorAll(".ingredient");

  // Realiza um clone do último ingrediente adicionado
  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

  // Não adiciona um novo input se o último tem um valor vazio
  if (newField.children[0].value == "") return false;

  // Deixa o valor do input vazio
  newField.children[0].value = "";
  ingredients.appendChild(newField);
}

function addPreparation() {
  const preparations = document.querySelector("#preparations");
  const fieldContainer = document.querySelectorAll(".preparation");

  // Realiza um clone do último ingrediente adicionado
  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

  // Não adiciona um novo input se o último tem um valor vazio
  if (newField.children[0].value == "") return false;

  // Deixa o valor do input vazio
  newField.children[0].value = "";
  preparations.appendChild(newField);
}
