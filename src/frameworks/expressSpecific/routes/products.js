const express = require('express');

const {
    productsController
 } = require('../../../controllers');


module.exports = dependencies => {
    const router = express.Router();
    const {
        addProductController,
        updateProductController,
        getProductByIdController,
        deleteProductController
     } = productsController(dependencies);

    router.route('/').post(addProductController).delete(deleteProductController).put(updateProductController);
    router.route('/:id').get(getProductByIdController);
    
    return router;
}