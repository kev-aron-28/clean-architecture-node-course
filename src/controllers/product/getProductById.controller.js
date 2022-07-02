const { Response } = require('../../frameworks/common/Response');
module.exports = dependencies => {
    
    const { 
        useCases: { product: { 
            getByIdUseCase
        }}
    } = dependencies;
    
    return async (req, res, next) => {
        try {
           
            const { id } = req.params;
            
            const getProductById = getByIdUseCase(dependencies);

            const response = await getProductById.execute({ id });

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