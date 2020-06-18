const express = require('express')
const routes = express.Router()
const principal = require('./app/controllers/principal')
const admin = require('./app/controllers/admin')

routes.get('/', principal.home)
routes.get('/about', principal.about)
routes.get('/receitas', principal.recipes )
routes.get("/receitas/find", principal.recipesFind)
routes.get("/receitas/:id", principal.recipePage)
routes.get("/chefs", principal.chefs)


routes.get("/admin/recipes", admin.index)
routes.get("/admin/recipes/create", admin.create)
routes.get("/admin/recipes/:id", admin.show)
routes.get("/admin/recipes/:id/edit", admin.edit)
routes.post("/admin/recipes", admin.post)
routes.put("/admin/recipes", admin.put)
routes.delete("/admin/recipes", admin.delete)


routes.get("/admin/chefs", admin.chefsIndex)
routes.get("/admin/chefs/create", admin.chefsCreate)
routes.get("/admin/chefs/:id", admin.chefsShow)
routes.get("/admin/chefs/:id/edit", admin.chefsEdit)
routes.post("/admin/chefs", admin.chefsPost)
routes.put("/admin/chefs", admin.chefsUpdate)
routes.delete("/admin/chefs", admin.chefsDelete)



routes.use(principal.error404);

module.exports = routes