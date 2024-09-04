const express = require('express');
const router = express.Router();
const {Article} = require('../../models')
const {Op} = require('sequelize')
const {NotFoundError, success} = require('../../utils/response')

// get ALL articles from database 
router.get('/', async function(req,res){
try{
    // added searching functionaility to query searches
    const query = req.query

    const currentPage = Math.abs(Number(query.currentPage)) || 1;

    const pageSize = Math.abs(Number(query.pageSize)) || 10;

    // calculate offset
    const offSet = (currentPage-1) * pageSize

    if(query.title){
        condition.where = {
            title: {
                [Op.like]: `%${query.title}%`
            }
        }
    }

    const condition = {
        order: [['id', 'DESC']],
        limit: pageSize,
        offset: offSet
    };

    const {count,rows} = await Article.findAndCountAll(condition);

    success(res,'sucessfully recieved data', {
            articles: rows,
            pagination: {
                total:count,
                currentPage,
                pageSize
            }
        })
        } 
        
catch(error){
    res.status(500).json({
        status: false,
        message: 'error',
        errors: [error.message]
    })
}
})

// search for specific article
router.get('/:id', async function(req,res){

    try{
        const article = await getArticle(req)

        success(res,'sucessfully recieved data',{article})
            
    }
    catch(error){
        res.status(500).json({
            status: false,
            message: 'error',
            errors: [error.message]
        })
    }


})

// add new article
router.post('/', async function(req, res){

    try{   
        const article = await Article.create(req.body)
        success(res,'created article',{article},201)
    }
    catch(error){

        if (error.name === 'SequelizeValidationError'){
            const errors = error.errors.map(e=>e.message)
    
        res.status(400).json({
            status: false,
            message: 'error',
            errors
        })
        }

        else{
            res.status(500).json({
                status: false,
                message: 'error',
                errors: [error.message]
            })
        }

    }
})

// deletion of records on database
router.delete('/:id', async function(req, res){

    try{   
        const article = await getArticle(req)

        await article.destroy()
        success(res, 'cSuccess deletion')
    }
    catch(error){
        res.status(500).json({
            status: false,
            message: 'error',
            errors: [error.message]
        })
    }
})

// change for specific article ENTIRELY
router.put('/:id', async function(req,res){

    try{
        const article = await getArticle(req)

        await article.update(req.body)

        success(res, 'Change is successful',{article})
            
    }
    catch(error){
        res.status(500).json({
            status: false,
            message: 'error',
            errors: [error.message]
        })
    }
})


async function getArticle(req){

    const {id} = req.params

    const article = await Article.findByPk(id)

    if(!article){
        throw new NotFoundError(`ID: ${id} article not found`)
    }

    return article

}


module.exports = router;