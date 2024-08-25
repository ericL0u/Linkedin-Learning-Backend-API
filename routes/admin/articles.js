const express = require('express');
const router = express.Router();
const {Article} = require('../../models')


router.get('/', async function(req,res){
try{
    const condition = {
        order: [['id', 'DESC']]
    };

    const articles = await Article.findAll(condition);

    res.json({
        status : true,
        message: 'recieved data',
        data: {articles}
    })

} catch(error){
    res.status(500).json({
        status: false,
        message: 'error',
        errors: [error.message]
    })
}
})

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






module.exports = router;
