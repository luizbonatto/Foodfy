const Recipes = require('../models/Recipes')
const Chefs = require('../models/Chefs')

module.exports = {

    //Recipes Controller
    
    index(req, res){

        Recipes.all(function(recipes){
            return res.render('admin/recipes/index', {recipes})
        })

    },

    create(req, res){
        Recipes.chefSelectOptions(function(chefOptions){
            return res.render('admin/recipes/create', {chefs: chefOptions})
        })       
    },
    
    post(req, res){
        const keys = Object.keys(req.body)
    
         for(key of keys){
             if (req.body[key] == ""){
                 return res.send('Favor preencher todos os campos')
             }
        }
        
        Recipes.create(req.body, function(recipe){
            return res.redirect(`/admin/recipes/${recipe.id}`)
        })
    },
    
    show(req, res){
        
        Recipes.find(req.params.id, function(recipe){
            if(!recipe) return res.render('site/not-found')

            recipe.chef_id = 'Jorge Delato'

            return res.render('admin/recipes/show', {recipe})

        })
    },
    
    edit(req, res){
    
        Recipes.find(req.params.id, function(recipe){
            if(!recipe) return res.render("site/not-found")


        Recipes.chefSelectOptions(function(chefOptions){
            return res.render('admin/recipes/edit', {recipe, chefs: chefOptions})
        })       
    })  
        
    },
    
    put(req, res){
        const keys = Object.keys(req.body)
    
        for(key of keys){
            if (req.body[key] == ""){
                return res.send('Favor preencher todos os campos')
            }
       }

       Recipes.update(req.body, function(){
           return res.redirect(`/admin/recipes/${req.body.id}`)
       })    
    },
    
    delete(req, res){
        Recipes.delete(req.body.id, function(){
            return res.redirect(`/admin/recipes`)
        }) 
    },

    //Chefs Controller

    chefsIndex(req,res){
        Chefs.all(function(chefs){
            return res.render('admin/chefs/index', {chefs})
        })        
    },

    chefsCreate(req, res){
        return res.render('admin/chefs/create')
    },

    chefsPost(req, res){
        Chefs.create(req.body, function(chef){
            return res.redirect(`/admin/chefs/${chef.id}`)
        })
    },

    chefsShow(req, res){
        Chefs.find(req.params.id, function(chef){            

        Chefs.findRecipes(req.params.id, function(recipes){
            return res.render('admin/chefs/show', {chef, recipes})
        })
        })        
    },

    chefsEdit(req, res){
        Chefs.find(req.params.id, function(chef){
            return res.render("admin/chefs/edit", {chef})
        })
    },

    chefsUpdate(req, res){
        Chefs.update(req.body, function(){
            return res.redirect(`/admin/chefs/${req.body.id}`)
        })
    },

    chefsDelete(req, res){
        Chefs.find(req.body.id, function(chef){

            if(chef.total_recipes != 0){
                return res.send("Não é possivel excluir esse chef pois ele possui receitas cadastradas")

        }   else{
                Chefs.delete(req.body.id, function(){
                return res.redirect('/admin/chefs')
            })}
        })
    }
}

