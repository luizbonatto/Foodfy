const Recipes = require('../models/Recipes')
const Chefs = require('../models/Chefs')

module.exports = {

    home(req, res){
        Recipes.homePage(function(recipes){
            return res.render('site/index', {recipes})
        })
        
    },

    about(req, res){
        return res.render('site/about')
    },

    recipes(req, res){
        let {limit, page} = req.query

        page = page || 1
        limit = limit || 9
        let offset = limit * (page - 1)

        const params = {
            page,
            limit,
            offset, 
            callback(recipes){

                const pagination = {
                    page,
                    total: Math.ceil(recipes[0].total / limit)
                }

                return res.render('site/receitas', {recipes, pagination})
            }
        }

        Recipes.paginate(params)
                   
    },

    recipesFind(req, res){
        Recipes.findBy(req.query.filter, function(recipes){
            return res.render("site/recipesfind", {filter : req.query.filter, recipes})
        })
        
    },

    recipePage(req, res){
        Recipes.find(req.params.id, function(recipe){
            return res.render("site/recipepage", {recipe})
        }) 
    },

    chefs(req, res){
        Chefs.all(function(chefs){
            return res.render("site/chefs", {chefs})
        })
        
    },

    error404(req, res) {
        res.status(404).render("site/not-found");
    }

}









