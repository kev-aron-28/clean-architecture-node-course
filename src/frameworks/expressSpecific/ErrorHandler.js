const { Response, ResponseError } = require('../common');

module.exports = (err, req, res, next) => {
    const error = new ResponseError({ 
        status: err.status || 500,
        msg: err.message || err.msg || 'Something went wrong',
        reason: err.reason || err.stack || 'Something fail',
        url: req.originalUrl,
        ip: req.ip,
        validationErrors: err.validationErrors || []
     })

     res.status(error.status);
     res.json(new Response({ 
        status: false,
        error
     }))
}