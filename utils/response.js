class NotFoundError extends Error{
    constructor(message){
        super(message);
        this.name = 'NotFoundError'
    }
}

function success(res, message,data = {}, code = 200){
    res.status(code).json({

        status:true,
        message,
        data

    })


}






module.exports = {
    NotFoundError,
    success
}