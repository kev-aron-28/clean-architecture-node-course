const { isEmpty } = require("lodash");
const { ResponseError, ValidationError } = require('../../frameworks/common/Response');
const { Order } = require('../../entities');

module.exports = dependencies => {
    const { 
        ordersRepository,
        useCases: {
            user: {
                getUserByIdUseCase
            },
            product: {
                getByIdUseCase
            }
        } 
    } = dependencies;

    if(!ordersRepository) {
        throw new Error('You must specify dependencies');
    }

    if(!getUserByIdUseCase) {
        throw new Error('You must specify dependencies');
    }

    if(!getByIdUseCase) {
        throw new Error('You must specify dependencies');
    }

    const getUserById = getUserByIdUseCase(dependencies).execute;
    const getProductById = getByIdUseCase(dependencies).execute;

    const getValidationErrors = async ({ 
        order,
    }) => {
        const returnable = [];
        
        const { productsId = [], userId } = order;
        const products = await Promise.all(productsId.map(id => getProductById(id)));

        const notFoundIds = products.reduce((acc = [], product, i) => {
            if(!product) acc.push(productsId[i]);
        },[]);

        if(!isEmpty(notFoundIds)) {
            returnable.push(new ValidationError({
                fied: 'productsId',
                msg: 'No products found'
            }));
        }

        const user = await getUserById({ id: userId });
        if(!user){
            returnable.push(new ValidationError({
                fied: 'userId',
                msg: 'User not found'
            }))
        }

        return returnable;
    }

    const execute = async ({
        userId, 
        productsId, 
        date, 
        isPayed, 
        meta 
    }) => {
        const order = new Order({
            userId, 
            productsId, 
            date, 
            isPayed, 
            meta 
        });
        const validationsErrors = await getValidationErrors({ order });
        if(!isEmpty(validationsErrors)) {
            return Promise.reject(new ResponseError({
                status: 403,
                msg: 'Validation errors',
                reason: 'Somebody sent bad data',
                validationErrors: validationsErrors
            }))
        }        
        return ordersRepository.add(order);
    }

    return {
        execute
    }
}