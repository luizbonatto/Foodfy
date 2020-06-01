const receitas = require('../../data.json')

exports.home = function(req, res){
    return res.render('site/home', {item: receitas.recipes})
}

exports.about = function(req, res){
    return res.render('site/about')
}

exports.recipes = function(req, res){
    return res.render('site/receitas', {item: receitas.recipes})
}

exports.recipePage = function(req, res){
    const recipeIndex = req.params.index;

    const recipe = receitas.recipes

    if (recipe[recipeIndex] == undefined){
        return res.render('site/not-found')
    } else{
        return res.render('site/recipepage', {item: recipe[recipeIndex]})
        }   
}

exports.error404 = function(req, res) {
    res.status(404).render("site/not-found");
  }