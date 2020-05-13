const express = require('express')
const nunjucks = require('nunjucks')
const receitas = require('./data')

const server = express()

server.set('view engine','njk')
server.use(express.static('public'))

nunjucks.configure("views", {
express:server,
autoescape: false,
noCache: true,
})

server.get('/', function(req, res){
    return res.render('home', {item: receitas})
})

server.get('/about', function(req, res){
    return res.render('about')
})

server.get('/receitas', function(req, res){
    return res.render('receitas', {item: receitas})
})

server.get("/receitas/:index", function(req, res){
    const recipeIndex = req.params.index;
    if (receitas[recipeIndex] == undefined){
        return res.render('not-found')
    } else{
        return res.render('recipepage', {item: receitas[recipeIndex]})
        }   
})

server.use(function(req, res) {
    res.status(404).render("not-found");
  });

server.listen(5000, function(){
    return console.log('Server is running')
})