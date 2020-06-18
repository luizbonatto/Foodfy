const db = require('../../config/db')
const {date} = require('../lib/utils')

module.exports = {
    
    all(callback){
        db.query(`
        SELECT recipes.*, chefs.name AS author
        FROM recipes
        LEFT JOIN chefs ON(recipes.chef_id = chefs.id)
        ORDER BY recipes.id`, function(err, results){
            if(err) throw `Database Error: ${err}`

            callback(results.rows)
        })
    },

    homePage(callback){
        db.query(`
        SELECT recipes.*, chefs.name AS author
        FROM recipes
        LEFT JOIN chefs ON(recipes.chef_id = chefs.id)
        ORDER BY id ASC
        LIMIT 6 OFFSET 0`, function(err, results){
            if(err) throw `Database Error: ${err}`

            callback(results.rows)
        })
    },

    create(data, callback){

        const query = `
            INSERT INTO recipes(
                chef_id,
                image, 
                title,
                ingredients,
                preparation,
                information, 
                created_at
            ) VALUES($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
            `         

        const values = [
            data.chef,
            data.image,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            date(Date.now()).iso
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Database Error: ${err}`

            callback(results.rows[0])
        })
    },

    chefSelectOptions(callback){
        db.query(`SELECT name, id FROM chefs`, function(err, results){
            if(err) throw `Database Error: ${err}`

            callback(results.rows)
        })
    },

    find(id, callback){
        db.query(`
        SELECT recipes.*, chefs.name AS author
        FROM recipes                
        LEFT JOIN chefs ON(recipes.chef_id = chefs.id)
        WHERE recipes.id = $1`, [id], function(err, results){
            if(err) throw `Database Error: ${err}`

            callback(results.rows[0])
        })
    },
    
    findBy(filter, callback){
        db.query(`
        SELECT recipes.*, chefs.name AS author
        FROM recipes                
        LEFT JOIN chefs ON(recipes.chef_id = chefs.id)
        WHERE recipes.title ILIKE '%${filter}%'
        ORDER BY recipes.title ASC`,function(err, results){
            if(err) throw `Database Error: ${err}`

            callback(results.rows)
        })
    },

    update(data, callback){

        const query = `
        UPDATE recipes SET
        chef_id = ($1),
        title = ($2),
        image = ($3),
        ingredients = ($4),
        preparation = ($5),
        information = ($6)
        WHERE id = $7`

        const values = [
            data.chef,
            data.title,
            data.image,
            data.ingredients,
            data.preparation,
            data.information,
            data.id
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Database Error: ${err}`
            
            callback()
        })
    },

    delete(id, callback){
        db.query(`DELETE FROM recipes WHERE id = $1`, [id], function(err, results){
            if(err) throw `Database Error: ${err}`

            callback()
        })
    },
    
    paginate(params){
        const { limit, offset, callback} = params

        query = `
        SELECT recipes.*, 
        (SELECT count (*) FROM recipes) AS total,
        chefs.name AS author
        FROM recipes    
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        ORDER BY recipes.id ASC
        LIMIT $1 OFFSET $2`

        db.query(query, [limit, offset], function(err, results){
            if(err) throw `Database Error: ${err}`

            callback(results.rows)
        })
    }
}


