const { Response } = require('../../frameworks/common/Response')
module.exports = dependencies => {
    
    const { 
        useCases: { product: { 
            addProductUseCase
        }}
    } = dependencies;
    
    return async (req, res, next) => {
        try {
            const { body = {} } = req;
            const { 
                name ,
                description,
                images,
                price,
                meta,
                color } = body;
            
            const addProduct = addProductUseCase(dependencies);
            const response = await addProduct.execute({
                name ,
                description,
                images,
                price,
                meta,
                color 
            });

            res.json(new Response({
                status: true,
                content: response
            }))

            next();

        } catch (error) {
            next(error);
        }
    }

}