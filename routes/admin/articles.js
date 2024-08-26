const express = require('express');
const router = express.Router();
const {Article} = require('../../models')
const {Op} = require('sequelize')


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

    res.json({
        status : true,
        message: 'recieved data',
        data: {
            articles: rows,
            pagination: {
                total:count,
                currentPage,
                pageSize
            }
        }
    })

} catch(error){
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
        const {id} = req.params
        const article = await Article.findByPk(id)

        if (article){
            res.json(
            {
            status:true,
            messgae: 'success',    
            data: article
            }
            )}
            
        else{
            res.status(404).json({
                status: false, 
                message: 'document not found'
            })
        }
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
        res.status(201).json({
            status: true,
            message: 'created article',
            data: article
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

// deletion of records on database
router.delete('/:id', async function(req, res){

    try{   
        const {id} = req.params;

        const article = await Article.findByPk(id)

        if (article){
            await article.destroy()

            res.json({
                status:true,
                message: 'Success deletion'
            })
        }
        else {
            res.status(404).json({
                status:false,
                message: 'Deletion record not found'
            })
        }
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
        const {id} = req.params
        const article = await Article.findByPk(id)
        if (article){
            await article.update(req.body)
            res.json(
            {
            status:true,
            messgae: 'Change is successful',    
            data: article
            }
            )}
            
        else{
            res.status(404).json({
                status: false, 
                message: 'document not found, try to create record'
            })
        }
    }
    catch(error){
        res.status(500).json({
            status: false,
            message: 'error',
            errors: [error.message]
        })
    }
})




module.exports = router;
