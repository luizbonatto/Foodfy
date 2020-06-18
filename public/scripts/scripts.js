const recipe = document.querySelectorAll('.card-receitas');
const recipe_sections = document.querySelectorAll(".recipe__section");
const currentPage = location.pathname
const menuItem = document.querySelectorAll('header .navbar a')
const menuAdmin = document.querySelectorAll('header .admin-navbar a')


//Active Page Logic:

for (item of menuItem){
  if (currentPage.includes(item.getAttribute('href'))){
    item.classList.add('active')
  }
}

for (item of menuAdmin){
  if (currentPage.includes(item.getAttribute('href'))){
    item.classList.add('active_admin')
  }
}

//Expand Recipes Logic

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

//Pagination Logic

function paginate(selectedPage, totalPages) {

  let pages = [],
      oldPage

  for (let currentPage = 1; currentPage <= totalPages; currentPage++) {

      const firstAndLastPage = currentPage == 1 || currentPage == totalPages
      const pagesAfterSelectedPage = currentPage <= selectedPage + 2
      const pagesBeforeSelectedPage = currentPage >= selectedPage - 2

      if (firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage) {
          if (oldPage && currentPage - oldPage > 2) {
              pages.push("...")
          }

          if (oldPage && currentPage - oldPage == 2) {
              pages.push(oldPage + 1)
          }

          pages.push(currentPage)

          oldPage = currentPage
      }
  }

  return pages
}

function createPagination (pagination)  {
  const page = +pagination.dataset.page;
  const total = +pagination.dataset.total;  
  const pages = paginate(page, total)

  let elements = ''

  for(let page of pages){
      if(String(page).includes("...")){
          elements += `<span>${page}</span>`
      } else{
          elements += `<a href="?page=${page}">${page}</a>`
          }
              
      }  
  
  pagination.innerHTML = elements
}

const pagination = document.querySelector(".pagination")

if(pagination){
  createPagination(pagination)
} 




   