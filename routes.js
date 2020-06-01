const express = require('express')
const routes = express.Router()
const principal = require('./public/controllers/principal')
const recipes = require('./public/controllers/recipes')

routes.get('/', principal.home)
routes.get('/about', principal.about)
routes.get('/receitas', principal.recipes )
routes.get("/receitas/:index", principal.recipePage)


routes.get("/admin/recipes", recipes.index)
routes.get("/admin/recipes/create", recipes.create)
routes.get("/admin/recipes/:id", recipes.show)
routes.get("/admin/recipes/:id/edit", recipes.edit)
routes.post("/admin/recipes", recipes.post)
routes.put("/admin/recipes", recipes.put)
routes.delete("/admin/recipes", recipes.delete)


routes.use(principal.error404);

module.exports = routes