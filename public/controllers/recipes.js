const data = require('../../data.json')
const fs = require('fs')

exports.index = function(req, res){    
    return res.render('admin/index', {recipes: data.recipes})
}

exports.create = function(req, res){
    return res.render('admin/create')
}

exports.post = function(req, res){

    const keys = Object.keys(req.body)
    
         for(key of keys){
             if (req.body[key] == ""){
                 return res.send('Favor preencher todos os campos')
             }
    }

    let id = 1
    const lastRecipe = data.recipes[data.recipes.length - 1]

    if(lastRecipe){
        id = lastRecipe.id + 1
    }

    data.recipes.push({
        id,
        ...req.body
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if (err) return res.send('erro de escrita')

        return res.redirect('/admin/recipes')
    })  
}

exports.show = function(req, res){
    const {id} = req.params

    const foundRecipe = data.recipes.find(function(recipe){
        return recipe.id == id
    })

    return res.render('admin/show', {recipe: foundRecipe})
}

exports.edit = function(req, res){

    const {id} = req.params

    let index = 0

    const foundRecipe = data.recipes.find(function(recipe){
        return recipe.id == id
    })

    const recipe = ({
        ...foundRecipe,
    })

    res.render('admin/edit', {recipe})
}

exports.put = function(req, res){

    const {id} = req.body
    let index = 0

    const foundRecipe = data.recipes.find(function(recipe, foundIndex){
        if(recipe.id == id){
        index = foundIndex
        return true
        }
    })

    if(!foundRecipe) return res.send('Receita não encontrada')

    const recipe = ({
        ...foundRecipe,
        ...req.body
    })

    data.recipes[index] = recipe

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) {return res.send('erro na escrita')}

        return res.redirect(`/admin/recipes/${id}`)
    })

}

exports.delete = function(req, res){

    const {id} = req.body

    const filteredRecipes = data.recipes.filter(function(recipe){
        return recipe.id != id
    })

    if(!filteredRecipes) return res.send("Receita não encontrada")

    data.recipes = filteredRecipes

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) {return res.send('erro na escrita')}

        return res.redirect(`/admin/recipes`)
    })
    
}