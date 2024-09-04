const express = require('express');
const router = express.Router();
const {Category} = require('../../models')
const {Op} = require('sequelize')
const {NotFoundError, success} = require('../../utils/response')

// get ALL categories from database 
router.get('/', async function(req,res){
try{
    // added searching functionaility to query searches
    const query = req.query

    const currentPage = Math.abs(Number(query.currentPage)) || 1;

    const pageSize = Math.abs(Number(query.pageSize)) || 10;

    // calculate offset
    const offSet = (currentPage-1) * pageSize

    if(query.name){
        condition.where = {
            name: {
                [Op.like]: `%${query.name}%`
            }
        }
    }

    const condition = {
        order: [['rank', 'ASC']],
        limit: pageSize,
        offset: offSet
    };

    const {count, rows} = await Category.findAndCountAll(condition);

    success(res,'sucessfully recieved data', {
            categories: rows,
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

// search for specific category
router.get('/:id', async function(req,res){

    try{
        const category = await getCategory(req)
        success(res,'sucessfully recieved data',{category})
            
    }
    catch(error){
        res.status(500).json({
            status: false,
            message: 'error',
            errors: [error.message]
        })
    }


})

// add new category
router.post('/', async function(req, res){

    try{   
        const category = await Category.create(req.body)
        success(res,'created category',{category},201)
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
        const category = await getCategory(req)

        await category.destroy()
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

// change for specific category ENTIRELY
router.put('/:id', async function(req,res){

    try{
        const category = await getCategory(req)

        await category.update(req.body)

        success(res, 'Change is successful',{category})
            
    }
    catch(error){
        res.status(500).json({
            status: false,
            message: 'error',
            errors: [error.message]
        })
    }
})


async function getCategory(req){

    const {id} = req.params

    const category = await Category.findByPk(id)

    if(!category){
        throw new NotFoundError(`ID: ${id} category not found`)
    }

    return category

}


module.exports = router;